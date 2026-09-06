<?php
header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('X-Robots-Tag: noindex, nofollow, noarchive');
header('Cache-Control: no-store, max-age=0');
header('Referrer-Policy: no-referrer');

date_default_timezone_set('Europe/Warsaw');

function respond($code, $message) {
    http_response_code($code);
    echo json_encode(['ok' => $code >= 200 && $code < 300, 'message' => $message], JSON_UNESCAPED_UNICODE);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(405, 'Method not allowed');
}

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin !== '') {
    $originHost = strtolower((string)parse_url($origin, PHP_URL_HOST));
    if (!in_array($originHost, ['acreworks.pl', 'www.acreworks.pl'], true)) {
        respond(403, 'Nieprawidłowe źródło żądania.');
    }
}

function enforce_rate_limit($maxRequests = 8, $windowSeconds = 600) {
    $ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
    $key = hash('sha256', $ip);
    $file = rtrim(sys_get_temp_dir(), DIRECTORY_SEPARATOR) . DIRECTORY_SEPARATOR . 'acre_quote_' . $key . '.json';
    $handle = @fopen($file, 'c+');
    if (!$handle) {
        return;
    }

    if (@flock($handle, LOCK_EX)) {
        rewind($handle);
        $raw = stream_get_contents($handle);
        $times = json_decode((string)$raw, true);
        if (!is_array($times)) {
            $times = [];
        }

        $now = time();
        $times = array_values(array_filter($times, function ($time) use ($now, $windowSeconds) {
            return is_numeric($time) && ((int)$time > $now - $windowSeconds);
        }));

        if (count($times) >= $maxRequests) {
            flock($handle, LOCK_UN);
            fclose($handle);
            respond(429, 'Wysłano zbyt wiele zapytań. Spróbuj ponownie za kilka minut.');
        }

        $times[] = $now;
        ftruncate($handle, 0);
        rewind($handle);
        fwrite($handle, json_encode($times));
        fflush($handle);
        flock($handle, LOCK_UN);
    }
    fclose($handle);
}

enforce_rate_limit();

function clean_text($value, $maxLength) {
    $value = is_string($value) ? trim(str_replace("\0", '', $value)) : '';
    if (function_exists('mb_substr')) {
        return mb_substr($value, 0, $maxLength, 'UTF-8');
    }
    return substr($value, 0, $maxLength);
}

function single_line($value) {
    return trim(preg_replace('/[\r\n]+/', ' ', (string)$value));
}

if (!empty($_POST['website'])) {
    respond(200, 'Dziękujemy.');
}

$formStarted = isset($_POST['form_started']) ? (int)$_POST['form_started'] : 0;
if ($formStarted > 0) {
    $elapsed = time() - $formStarted;
    if ($elapsed < 2 || $elapsed > 7200) {
        respond(400, 'Formularz został wysłany w nieprawidłowy sposób. Odśwież stronę i spróbuj ponownie.');
    }
}

$name = clean_text($_POST['name'] ?? '', 120);
$email = clean_text($_POST['email'] ?? '', 180);
$phone = clean_text($_POST['phone'] ?? '', 40);
$service = clean_text($_POST['service'] ?? '', 80);
$context = clean_text($_POST['context'] ?? '', 120);
$quantity = clean_text($_POST['quantity'] ?? '', 40);
$material = clean_text($_POST['material'] ?? '', 100);
$dimensions = clean_text($_POST['dimensions'] ?? '', 120);
$branding = clean_text($_POST['branding'] ?? '', 240);
$deadline = clean_text($_POST['deadline'] ?? '', 120);
$description = clean_text($_POST['description'] ?? '', 6000);

if ($name === '' || $description === '') {
    respond(422, 'Uzupełnij imię lub firmę oraz opis projektu.');
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL) || preg_match('/[\r\n]/', $email)) {
    respond(422, 'Podaj prawidłowy adres e-mail.');
}

$allowedServices = ['Druk 3D', 'Laser', 'Projekt CAD', 'Krótka seria / B2B'];
if (!in_array($service, $allowedServices, true)) {
    $service = 'Inne zapytanie';
}

$allowedContexts = ['', 'ACRE / ASTRO'];
if (!in_array($context, $allowedContexts, true)) {
    $context = '';
}

$attachments = [];
$totalSize = 0;
$maxTotalSize = 15 * 1024 * 1024;
$maxSingleSize = 12 * 1024 * 1024;
$maxFiles = 5;
$allowedExtensions = ['step','stp','stl','3mf','obj','svg','pdf','jpg','jpeg','png','dxf','dwg','zip'];
$blockedMimes = [
    'application/x-httpd-php', 'application/x-php', 'text/x-php',
    'application/x-executable', 'application/x-dosexec',
    'application/x-sh', 'text/x-shellscript'
];

if (isset($_FILES['files']) && is_array($_FILES['files']['name'])) {
    $fileCount = count($_FILES['files']['name']);
    if ($fileCount > $maxFiles) {
        respond(413, 'Możesz dodać maksymalnie 5 plików.');
    }

    for ($i = 0; $i < $fileCount; $i++) {
        $error = $_FILES['files']['error'][$i] ?? UPLOAD_ERR_NO_FILE;
        if ($error === UPLOAD_ERR_NO_FILE) {
            continue;
        }
        if ($error !== UPLOAD_ERR_OK) {
            respond(400, 'Nie udało się odebrać jednego z załączników.');
        }

        $tmp = $_FILES['files']['tmp_name'][$i] ?? '';
        $size = (int)($_FILES['files']['size'][$i] ?? 0);
        $originalName = basename((string)($_FILES['files']['name'][$i] ?? 'plik'));
        $originalName = single_line($originalName);
        $extension = strtolower(pathinfo($originalName, PATHINFO_EXTENSION));

        if (!in_array($extension, $allowedExtensions, true)) {
            respond(415, 'Niedozwolony format pliku: ' . $originalName);
        }
        if ($size <= 0 || !is_uploaded_file($tmp)) {
            respond(400, 'Nieprawidłowy załącznik: ' . $originalName);
        }
        if ($size > $maxSingleSize) {
            respond(413, 'Pojedynczy załącznik może mieć maksymalnie 12 MB.');
        }

        $totalSize += $size;
        if ($totalSize > $maxTotalSize) {
            respond(413, 'Załączniki mogą mieć łącznie maksymalnie 15 MB.');
        }

        $mime = 'application/octet-stream';
        if (function_exists('finfo_open')) {
            $finfo = finfo_open(FILEINFO_MIME_TYPE);
            if ($finfo) {
                $detected = finfo_file($finfo, $tmp);
                if (is_string($detected) && $detected !== '') {
                    $mime = strtolower($detected);
                }
                finfo_close($finfo);
            }
        }

        if (in_array($mime, $blockedMimes, true)) {
            respond(415, 'Załącznik ma niedozwolony typ zawartości: ' . $originalName);
        }

        $data = file_get_contents($tmp);
        if ($data === false) {
            respond(500, 'Nie udało się odczytać załącznika.');
        }

        $prefix = strtolower(substr(ltrim($data), 0, 64));
        if (strpos($prefix, '<?php') !== false || strpos($prefix, '#!/bin/sh') !== false || strpos($prefix, '#!/bin/bash') !== false) {
            respond(415, 'Załącznik zawiera niedozwoloną zawartość: ' . $originalName);
        }

        $safeName = preg_replace('/[^A-Za-z0-9._-]/', '_', $originalName);
        $attachments[] = [
            'name' => $safeName ?: ('zalacznik_' . ($i + 1) . '.' . $extension),
            'display_name' => $originalName,
            'size' => $size,
            'mime' => $mime,
            'data' => $data
        ];
    }
}

$attachmentLines = [];
if (count($attachments) === 0) {
    $attachmentLines[] = 'Brak';
} else {
    foreach ($attachments as $attachment) {
        $attachmentLines[] = '- ' . $attachment['display_name'] . ' (' . number_format($attachment['size'] / 1024, 0, ',', ' ') . ' KB)';
    }
}

$bodyLines = [
    'ACRE | NOWE ZAPYTANIE',
    '============================================================',
    'Data: ' . date('Y-m-d H:i'),
    '',
    'KLIENT',
    '------------------------------------------------------------',
    'Imię / firma: ' . $name,
    'E-mail: ' . $email,
    'Telefon: ' . ($phone !== '' ? $phone : '-'),
    '',
    'ZLECENIE',
    '------------------------------------------------------------',
    'Usługa: ' . $service,
    'Kontekst: ' . ($context !== '' ? $context : '-'),
    'Liczba sztuk: ' . ($quantity !== '' ? $quantity : '-'),
    'Preferowany materiał: ' . ($material !== '' ? $material : 'do ustalenia'),
    'Wymiary / gabaryt: ' . ($dimensions !== '' ? $dimensions : '-'),
    'Kolorystyka / branding: ' . ($branding !== '' ? $branding : 'do ustalenia'),
    'Termin: ' . ($deadline !== '' ? $deadline : 'bez konkretnego terminu'),
    '',
    'OPIS PROJEKTU',
    '------------------------------------------------------------',
    $description,
    '',
    'ZAŁĄCZNIKI',
    '------------------------------------------------------------',
    ...$attachmentLines,
    '',
    'LOGISTYKA',
    '------------------------------------------------------------',
    'Wysyłka: InPost / cała Polska'
];
$plainBody = implode("\r\n", $bodyLines);

$to = 'kontakt@acreworks.pl';
$subjectParts = ['ACRE', $service];
if ($context !== '') {
    $subjectParts[] = $context;
}
$subjectParts[] = $name;
if ($quantity !== '') {
    $subjectParts[] = $quantity . ' szt.';
}
$subjectText = implode(' | ', $subjectParts);
$subject = '=?UTF-8?B?' . base64_encode($subjectText) . '?=';
$boundary = 'acre_' . bin2hex(random_bytes(12));

$headers = [];
$headers[] = 'MIME-Version: 1.0';
$headers[] = 'From: ACRE formularz <kontakt@acreworks.pl>';
$headers[] = 'Reply-To: ' . $email;
$headers[] = 'Content-Type: multipart/mixed; boundary="' . $boundary . '"';
$headers[] = 'X-Mailer: ACRE Website';

$message = '--' . $boundary . "\r\n";
$message .= "Content-Type: text/plain; charset=UTF-8\r\n";
$message .= "Content-Transfer-Encoding: base64\r\n\r\n";
$message .= chunk_split(base64_encode($plainBody)) . "\r\n";

foreach ($attachments as $attachment) {
    $message .= '--' . $boundary . "\r\n";
    $message .= 'Content-Type: ' . $attachment['mime'] . '; name="' . $attachment['name'] . '"' . "\r\n";
    $message .= "Content-Transfer-Encoding: base64\r\n";
    $message .= 'Content-Disposition: attachment; filename="' . $attachment['name'] . '"' . "\r\n\r\n";
    $message .= chunk_split(base64_encode($attachment['data'])) . "\r\n";
}
$message .= '--' . $boundary . "--\r\n";

if (!function_exists('mail')) {
    respond(503, 'Serwer nie udostępnia funkcji wysyłania poczty.');
}

$sent = @mail($to, $subject, $message, implode("\r\n", $headers));
if (!$sent) {
    respond(503, 'Serwer nie przyjął wiadomości do wysłania.');
}

respond(200, 'Zapytanie zostało wysłane. Odpowiemy na podany adres e-mail.');
