# Edycja portfolio ACRE

Zmiany najpierw na main. Po sprawdzeniu wyglądu PR main → production publikuje stronę. Bez automatycznej publikacji z main.

## Nowa realizacja
1. W realizacje.html skopiuj pełny article.portfolio-card w portfolio-grid (komentarz NOWA REALIZACJA).
2. Zmień unikalne id, nagłówek, opis, etykiety kategorii (Druk 3D / Laser / CAD / ACRE ASTRO / B2B). Dodawaj wyłącznie znane fakty.
3. W dl.portfolio-specs dodaj div z dt (nazwa) i dd (wartość). Obsługiwane przez ten sam układ: materiał, technologia, czas wykonania, liczba sztuk, program CAD. Nieznane pola pomijaj.
4. W CTA ustaw właściwy service: druk3d, laser, cad, astro lub b2b.
5. Dodaj ListItem z kolejną position, nazwą i adresem #id do ItemList w JSON-LD. Zaktualizuj lastmod portfolio w sitemap.xml.
6. Trzy karty na index.html są edytowane osobno. Jeśli zmieniasz wybrane projekty lub zdjęcia, zaktualizuj też ten blok.

## Zdjęcia
Pliki: assets/images/realizacje/nazwa-projektu.webp (lub .jpg). Zalecany kadr 3:2, np. 960 × 640; skompresuj zdjęcie. W img podmień src, width, height oraz alt na opis prawdziwego zdjęcia. Usuń figcaption „Zdjęcie realizacji w przygotowaniu”. Zachowaj loading="lazy" i decoding="async". Można dodać kolejne figure; nie używaj zdjęć stockowych jako dokumentacji projektu.

## Timelapse
Pliki: assets/video/realizacje/nazwa-projektu.mp4; opcjonalnie .webm. Poster: assets/images/realizacje/nazwa-projektu-poster.webp.
Skopiuj zawartość template#timelapse-template do portfolio-body wybranej realizacji przed CTA. Podmień oba adresy MP4, poster, aria-label i podpis. Dodaj prawdziwy source WebM przed MP4 tylko gdy plik istnieje. Zachowaj controls, preload="none", playsinline i wymiary. Bez autoplay. Template pozostaje nieaktywny do czasu dodania filmu; obecnie nie ma żadnych opublikowanych filmów ani żądań MP4.

## VideoObject
Po dodaniu rzeczywistego filmu dodaj poniższy obiekt do @graph strony, zastępując WSZYSTKIE pola w nawiasach prawdziwymi danymi. Połącz CollectionPage przez video: {"@id":"https://acreworks.pl/realizacje.html#[id]-video"}. Nie publikuj szablonu ani fikcyjnej daty. Opcjonalne duration musi być rzeczywistym czasem ISO 8601 (np. PT30S tylko dla 30 sekund).

```json
{
  "@type": "VideoObject",
  "@id": "https://acreworks.pl/realizacje.html#[id]-video",
  "name": "[Tytuł timelapse]",
  "description": "[Opis tego, co widać na filmie]",
  "thumbnailUrl": "https://acreworks.pl/assets/images/realizacje/[poster].webp",
  "contentUrl": "https://acreworks.pl/assets/video/realizacje/[film].mp4",
  "uploadDate": "[Rzeczywista data publikacji ISO 8601 z czasem i strefą]",
  "inLanguage": "pl-PL"
}
```

Przed publikacją sprawdź mobile, menu, linki, JSON-LD i brak pobierania filmu przed odtworzeniem. Dokumentacja jest w .github, aby nie trafiała na hosting.
