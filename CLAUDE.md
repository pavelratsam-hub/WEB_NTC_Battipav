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
**Poslední relace: 2026-01-25**

### Struktura kategorií produktů
Web obsahuje 5 hlavních kategorií:
1. **Elektrické pily** (`electric-saws.html`) - 7 podkategorií, kompletní
2. **Ruční řezačky** (`manual-cutters.html`) - 2 podkategorie, kompletní
3. **Velkoformátové nástroje** (`large-format-tools.html`) - 7 produktů, **NOVÉ**
4. **Mixéry** (`mixers.html`) - 3 produkty, **NOVÉ**
5. **Čističky podlah** (`floor-cleaners.html`) - 5 produktů, **NOVÉ**

### Provedené změny v této relaci (2026-01-25)
- **Doplnění obrázků pro nové kategorie:**
  - Velkoformátové nástroje: 8 obrázků (lampo-cut-v2, multi-bench, agile-v2, agile-light-v2, perfect-jolly, vacuum-suction-cup, vacuum-suction-cup-agile, large-format-tools)
  - Mixéry: 4 obrázky (mixer-50-super, mixit, minimix, mixers)
  - Čističky podlah: 6 obrázků (master-linda, master-linda-tank, linda-veloce, linda-veloce-tank, linda, floor-cleaners)
- **Oprava v products.json:** přípony AGILE obrázků změněny z .jpg na .png

### Zdroje obrázků
| Zdroj | Produkty |
|-------|----------|
| ntcshop.cz | Většina velkoformátových nástrojů, MIXER 50 SUPER, MASTER LINDA |
| battipav.co.uk | MINIMIX |
| technoriunite.it | MIXIT |
| ebay.co.uk | Varianty LINDA (různé úhly) |

### Poznámky k obrázkům
- Kategoriové obrázky jsou kopie hlavních produktů (lampo-cut → large-format-tools, atd.)
- `vacuum-suction-cup-agile.jpg` je placeholder (originál na ntcshop.cz chybí)
- Obrázky LINDA variant jsou z galerie eBay (různé úhly MASTER LINDA)
- AGILE obrázky jsou ve formátu PNG (pozor při úpravách)

### Historické změny (předchozí relace)
- Elektrické pily: DYNAMIC 1200S, úprava CLASS PLUS
- Ruční řezačky: reorganizace podkategorií, nové produkty (SINTESI, PERFORMANTE, SUPER PRO EVO, LEGGERA, SUPER PRO)
- E-shop odkazy a technické listy z ntcshop.cz

## Soubory ke kontrole
- `products/products.json` - hlavní databáze produktů
- `config/battipav.json` - navigace a konfigurace
- `assets/images/products/` - obrázky produktů

## Nedokončené úkoly
- [ ] Získat originální obrázek vakuové přísavky pro AGILE (aktuálně placeholder)
- [ ] Získat specifické obrázky pro jednotlivé modely LINDA (aktuálně všechny používají varianty MASTER LINDA)
- [ ] Případně doplnit technické listy a e-shop odkazy pro nové kategorie (velkoformátové nástroje, mixéry, čističky)
