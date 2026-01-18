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
**Poslední relace: 2026-01-18**

Provedené změny:
- Reorganizace kategorií elektrických pil:
  - "Pily blokové" → "Pily stolové blokové"
  - Nová kategorie "Pily stolové stavební"
  - "Pily stolové" → "Pily kompaktní na obklady"
- Přidány nové produkty:
  - EXPERT (6 variant: 700, 600S, 600, 500S, 500, 400S) do Pily stolové blokové
  - ELETTA, EGO PLUS do Pily stolové stavební
  - PRIME (5 variant: 200S, 150S, 120S, 100S, 85S) do Pily portálové stavební
  - VIP (4 varianty: 2125, 2110, 290, 260) do Pily portálové na obklady
- Přesunutí ELITE 80S z Pily stolové blokové do Pily stolové stavební
- Doplnění atributu "Podvozek: ANO" u produktů PRIME, SUPREME, CLASS PLUS, EXTRA SUPERLUNGA
- TOP pick změněn na SUPREME 120S
- Pořadí variant SUPREME a CLASS PLUS obráceno (od největšího po nejmenší)
- CSS: Tlačítka na kartách produktů vždy zarovnána na spodek karty (flexbox)

## Nedokončené úkoly
_Žádné_
