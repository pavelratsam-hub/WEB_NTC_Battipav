# WEB_BATTIPAV - Instrukce pro Claude

## O projektu
- Statický HTML web pro značku BATTIPAV (řezačky dlažby)
- Distributor: NTC STAVEBNÍ TECHNIKA spol. s r.o.
- Konfigurovatelný přes JSON soubory v `/config/`
- Admin panel: `/admin/index.html`

## Spuštění lokálního serveru
```bash
python -m http.server 8000
```
Web běží na: http://localhost:8000

## Struktura projektu
- `index.html`, `about.html`, `products.html`, `contact.html` - hlavní stránky
- `assets/css/` - styly (variables.css, main.css, carousel.css)
- `assets/js/` - skripty (config-loader.js, carousel.js, main.js)
- `assets/images/battipav/` - loga, favicony, slide pozadí
- `assets/images/products/` - fotky produktů
- `config/` - JSON konfigurace značky
- `admin/` - admin panel pro úpravu konfigurace

## Pravidla
- Při úpravách HTML zachovávat strukturu s `id` atributy (používá je config-loader)
- CSS proměnné jsou v `variables.css`
- Nové obrázky dávat do příslušných složek v `assets/images/`

### Kategorie produktů - DŮLEŽITÉ
Kategorie a podkategorie produktů jsou definovány na **dvou místech**, která musí být synchronizovaná:
1. **`config/battipav.json`** → navigace (menu)
2. **`products/products.json`** → obsah stránky (názvy sekcí, popisy, produkty)

Při přidávání, přejmenovávání nebo mazání kategorií je nutné upravit **oba soubory**.

## Automatická aktualizace tohoto souboru
Když uživatel řekne "budeme končit", "konec relace", "končíme" nebo před push na GitHub:
1. Shrň, co se v relaci udělalo
2. Aktualizuj sekci "Aktuální stav" níže
3. Zapiš případné nedokončené úkoly

## Aktuální stav
**Poslední relace: 2026-01-19**

Provedené změny:
- Elektrické pily:
  - Přidán DYNAMIC 1200S do kategorie "Pily portálové na obklady" (4. pozice za VIP)
  - Upraven CLASS PLUS - přidán průměr kotouče, délka řezu v mm, hloubky řezu 90°/45°
- Ruční řezačky - reorganizace podkategorií:
  - "Řezání tlakem" → "S nastavitelnou výškou portálu"
  - "Řezání tahem" → "S fixním portálem"
- Nové ruční řezačky v kategorii "S nastavitelnou výškou portálu":
  - SINTESI (4 varianty: 183, 163, 133, 93)
  - PERFORMANTE (3 varianty: 130, 90, 65)
- Nové ruční řezačky v kategorii "S fixním portálem":
  - SUPER PRO EVO (3 varianty: 125, 90, 65)
  - LEGGERA (3 varianty: 137, 92, 67)
  - SUPER PRO (3 varianty: 900, 750, 600)
- PROFI EVO přesunut do "S fixním portálem", pořadí variant otočeno (od největšího)
- Doplněny e-shop odkazy a technické listy z ntcshop.cz pro všechny nové produkty
- Přidány obrázky pro nové produkty

## Nedokončené úkoly
_Žádné_
