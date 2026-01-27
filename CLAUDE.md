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
**Poslední relace: 2026-01-27**

### Struktura kategorií produktů
Web obsahuje 6 hlavních kategorií:
1. **Elektrické pily** (`electric-saws.html`) - 7 podkategorií, kompletní
2. **Ruční řezačky** (`manual-cutters.html`) - 2 podkategorie, kompletní
3. **Velkoformátové nástroje** (`large-format-tools.html`) - 4 podkategorie, 17 produktů
4. **Mixéry** (`mixers.html`) - 3 produkty
5. **Čističky podlah** (`floor-cleaners.html`) - 1 produkt (MASTER LINDA)
6. **Vodní čerpadla** (`water-pumps.html`) - 4 produkty

### Provedené změny v této relaci (2026-01-27)

#### Stránka O společnosti - sekce Historie Battipav
- Přejmenována sekce "Historie a tradice" na "Tradice"
- Aktualizován text v sekci Tradice (nový popis o DNA značky)
- Přidána nová sekce "Historie" s vizuální timeline (cik-cak layout)
- Timeline obsahuje 5 milníků:
  1. **1970** - Založení společnosti (obrázek: tile-roller.jpg)
  2. **1980** - Strukturální expanze, pan Tondini (obrázek: mr-tondini.jpg)
  3. **1980–2000** - Rozšíření sortimentu, ponorná čerpadla (obrázek: pumps.jpg)
  4. **2018** - Made in Italy (obrázek: made-in-italy.jpg)
  5. **Dnes** - Globální lídr (obrázek: battipav-area.jpg)
- CSS styly pro timeline: cik-cak layout s kartami střídavě vlevo/vpravo
- Obrázky v kartách: pevná výška 200px, ořez v šířce, centrované, bílé pozadí
- Responzivní design - na mobilu vertikální layout

#### Přidané obrázky pro historii
- `assets/images/battipav/tile-roller.jpg`
- `assets/images/battipav/mr-tondini.jpg`
- `assets/images/battipav/pumps.jpg`
- `assets/images/battipav/made-in-italy.jpg`
- `assets/images/battipav/battipav-area.jpg`

#### Opravy
- Přejmenování obrázků na malá písmena (case-sensitive pro GitHub Pages)

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
- Vodní čerpadla: nová kategorie s 4 produkty (P3, P2, P1, P0)
- Čističky podlah: zredukováno na 1 produkt (MASTER LINDA)
- Velkoformátové nástroje: reorganizace do 4 podkategorií
- Elektrické pily: DYNAMIC 1200S, úprava CLASS PLUS
- Ruční řezačky: reorganizace podkategorií, nové produkty
- E-shop odkazy a technické listy z ntcshop.cz

## Soubory ke kontrole
- `products/products.json` - hlavní databáze produktů
- `config/battipav.json` - navigace a konfigurace
- `assets/images/products/` - obrázky produktů

## Nedokončené úkoly
- [ ] Stáhnout obrázky pro velkoformátové nástroje (viz tabulka výše)
- [ ] Doplnit technické listy a e-shop odkazy pro nové kategorie
- [ ] Získat originální obrázek vakuové přísavky pro AGILE (aktuálně placeholder)
