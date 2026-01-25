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
**Poslední relace: 2026-01-25 (večer)**

### Struktura kategorií produktů
Web obsahuje 6 hlavních kategorií:
1. **Elektrické pily** (`electric-saws.html`) - 7 podkategorií, kompletní
2. **Ruční řezačky** (`manual-cutters.html`) - 2 podkategorie, kompletní
3. **Velkoformátové nástroje** (`large-format-tools.html`) - 4 podkategorie, 17 produktů
4. **Mixéry** (`mixers.html`) - 3 produkty
5. **Čističky podlah** (`floor-cleaners.html`) - 1 produkt (MASTER LINDA)
6. **Vodní čerpadla** (`water-pumps.html`) - 4 produkty, **NOVÉ**

### Provedené změny v této relaci (2026-01-25 večer)

#### Čističky podlah
- Odstraněny 4 produkty: MASTER LINDA WITH TANK, LINDA VELOCE, LINDA VELOCE WITH TANK, LINDA
- Zůstal pouze MASTER LINDA

#### Velkoformátové nástroje - reorganizace do 4 podkategorií
1. **Manipulační systémy**: CARGO, CARICO!, COMPACT LIGHT PLUS, AGILE LIGHT PLUS, COMPACT LIGHT, AGILE SYSTEM LIGHT
2. **Pracovní stoly**: MULTI BENCH, MINI MULTI BENCH
3. **Řezací systémy**: LAMPO FLEX SYSTEM, LAMPO CUT EVO
4. **Nástroje**: PERFECT JOLLY, PULSE, SUCTION CUP

#### Vodní čerpadla - nová kategorie
- Přidána nová kategorie s 4 ponornými čerpadly: P3, P2, P1, P0
- Všechna označena jako TOP produkty
- Vytvořena stránka `water-pumps.html`
- Specifikace získány z battipav.com (přes vyhledávání)
- Přidán kategoriový obrázek `water-pumps.jpg` (kopie P3.jpg)

### Chybějící obrázky pro velkoformátové nástroje
| Soubor | Produkt |
|--------|---------|
| `cargo.jpg` | CARGO |
| `carico.jpg` | CARICO! |
| `compact-light-plus.jpg` | COMPACT LIGHT PLUS |
| `agile-light-plus.jpg` | AGILE LIGHT PLUS |
| `compact-light.jpg` | COMPACT LIGHT |
| `agile-system-light.jpg` | AGILE SYSTEM LIGHT |
| `mini-multi-bench.jpg` | MINI MULTI BENCH |
| `lampo-flex-system.jpg` | LAMPO FLEX SYSTEM |
| `lampo-cut-evo.jpg` | LAMPO CUT EVO |
| `pulse.jpg` | PULSE |
| `suction-cup.jpg` | SUCTION CUP |

Zdroj obrázků: https://battipav.com/en/product-category/large-format/

### Historické změny (předchozí relace)
- Elektrické pily: DYNAMIC 1200S, úprava CLASS PLUS
- Ruční řezačky: reorganizace podkategorií, nové produkty (SINTESI, PERFORMANTE, SUPER PRO EVO, LEGGERA, SUPER PRO)
- E-shop odkazy a technické listy z ntcshop.cz
- Doplnění obrázků pro mixéry a čističky

## Soubory ke kontrole
- `products/products.json` - hlavní databáze produktů
- `config/battipav.json` - navigace a konfigurace
- `assets/images/products/` - obrázky produktů

## Nedokončené úkoly
- [ ] Stáhnout obrázky pro velkoformátové nástroje (viz tabulka výše)
- [ ] Doplnit technické listy a e-shop odkazy pro nové kategorie
- [ ] Získat originální obrázek vakuové přísavky pro AGILE (aktuálně placeholder)
