<?php
header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

if (isset($_GET['health'])) {
    echo json_encode([
        'ok' => true,
        'message' => 'ACRE quote endpoint active',
        'mail_available' => function_exists('mail')
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'message' => 'Method not allowed'], JSON_UNESCAPED_UNICODE);
    exit;
}

function respond($code, $message) {
    http_response_code($code);
    echo json_encode(['ok' => $code >= 200 && $code < 300, 'message' => $message], JSON_UNESCAPED_UNICODE);
    exit;
}

function clean_text($value, $maxLength) {
    $value = is_string($value) ? trim(str_replace("\0", '', $value)) : '';
    if (function_exists('mb_substr')) {
        return mb_substr($value, 0, $maxLength, 'UTF-8');
    }
    return substr($value, 0, $maxLength);
}

// Honeypot. Boty zwykle wypełniają ukryte pole.
if (!empty($_POST['website'])) {
    respond(200, 'Dziękujemy.');
}

$name = clean_text($_POST['name'] ?? '', 120);
$email = clean_text($_POST['email'] ?? '', 180);
$phone = clean_text($_POST['phone'] ?? '', 40);
$service = clean_text($_POST['service'] ?? '', 80);
$quantity = clean_text($_POST['quantity'] ?? '', 40);
$material = clean_text($_POST['material'] ?? '', 100);
$dimensions = clean_text($_POST['dimensions'] ?? '', 120);
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

$attachments = [];
$totalSize = 0;
$maxTotalSize = 15 * 1024 * 1024;
$maxFiles = 5;
$allowedExtensions = ['step','stp','stl','3mf','obj','svg','pdf','jpg','jpeg','png','dxf','dwg','zip'];

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
        $extension = strtolower(pathinfo($originalName, PATHINFO_EXTENSION));

        if (!in_array($extension, $allowedExtensions, true)) {
            respond(415, 'Niedozwolony format pliku: ' . $originalName);
        }
        if ($size <= 0 || !is_uploaded_file($tmp)) {
            respond(400, 'Nieprawidłowy załącznik: ' . $originalName);
        }

        $totalSize += $size;
        if ($totalSize > $maxTotalSize) {
            respond(413, 'Załączniki mogą mieć łącznie maksymalnie 15 MB.');
        }

        $data = file_get_contents($tmp);
        if ($data === false) {
            respond(500, 'Nie udało się odczytać załącznika.');
        }

        $mime = 'application/octet-stream';
        if (function_exists('finfo_open')) {
            $finfo = finfo_open(FILEINFO_MIME_TYPE);
            if ($finfo) {
                $detected = finfo_file($finfo, $tmp);
                if (is_string($detected) && $detected !== '') {
                    $mime = $detected;
                }
                finfo_close($finfo);
            }
        }

        $safeName = preg_replace('/[^A-Za-z0-9._-]/', '_', $originalName);
        $attachments[] = [
            'name' => $safeName ?: ('zalacznik_' . ($i + 1) . '.' . $extension),
            'mime' => $mime,
            'data' => $data
        ];
    }
}

$bodyLines = [
    'Nowe zapytanie z acreworks.pl',
    '',
    'Imię / firma: ' . $name,
    'E-mail: ' . $email,
    'Telefon: ' . ($phone !== '' ? $phone : '-'),
    'Usługa: ' . $service,
    'Liczba sztuk: ' . ($quantity !== '' ? $quantity : '-'),
    'Preferowany materiał: ' . ($material !== '' ? $material : 'do ustalenia'),
    'Wymiary / gabaryt: ' . ($dimensions !== '' ? $dimensions : '-'),
    'Termin: ' . ($deadline !== '' ? $deadline : 'bez konkretnego terminu'),
    '',
    'Opis projektu:',
    $description,
    '',
    'Załączniki: ' . count($attachments),
    'Wysyłka: InPost / cała Polska'
];
$plainBody = implode("\r\n", $bodyLines);

$to = 'kontakt@acreworks.pl';
$subjectText = 'Wycena ACRE | ' . $service . ' | ' . $name;
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
