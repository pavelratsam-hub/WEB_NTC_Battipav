# Web BATTIPAV - NTC STAVEBNÍ TECHNIKA

Profesionální webová prezentace pro oficiálního dovozce italských strojů BATTIPAV do České republiky.

## 📋 Obsah

- [O projektu](#o-projektu)
- [Struktura projektu](#struktura-projektu)
- [Instalace a spuštění](#instalace-a-spuštění)
- [Správa obsahu](#správa-obsahu)
- [Duplikace pro novou značku](#duplikace-pro-novou-značku)
- [Customizace](#customizace)

## 🎯 O projektu

Tento web je šablonou pro prezentaci značek, které zastupuje NTC STAVEBNÍ TECHNIKA na českém trhu. Web je navržen tak, aby byl snadno duplikovatelný a přizpůsobitelný pro různé značky změnou konfiguračních souborů.

### Hlavní funkce

- ✅ Plně responzivní design (desktop, tablet, mobil)
- ✅ Konfigurovatelné barvy a logo přes JSON
- ✅ Dynamické načítání produktů
- ✅ Admin panel pro snadnou správu obsahu
- ✅ SEO optimalizované
- ✅ Rychlé - statické HTML/CSS/JS
- ✅ Snadná duplikace pro další značky

## 📁 Struktura projektu

```
WEB_BATTIPAV/
├── config/
│   ├── battipav.json          # Konfigurace značky Battipav
│   └── template.json           # Šablona pro nové značky
├── assets/
│   ├── css/
│   │   ├── variables.css       # CSS proměnné
│   │   ├── reset.css           # CSS reset
│   │   └── main.css            # Hlavní styly
│   ├── js/
│   │   ├── config-loader.js    # Načítání konfigurace
│   │   ├── main.js             # Hlavní JavaScript
│   │   └── products.js         # Produktová stránka
│   └── images/
│       └── battipav/           # Obrázky pro Battipav
├── admin/
│   ├── index.html              # Admin panel
│   ├── admin.css               # Styly admin panelu
│   └── admin.js                # JavaScript admin panelu
├── products/
│   └── products.json           # Databáze produktů
├── index.html                  # Hlavní stránka
├── products.html               # Stránka produktů
├── about.html                  # O společnosti
├── contact.html                # Kontakt
├── catalogue.html              # Katalog
└── README.md                   # Tato dokumentace
```

## 🚀 Instalace a spuštění

### Požadavky

- Webový server (doporučeno: Live Server pro VS Code, Python SimpleHTTPServer, nebo XAMPP)
- Moderní webový prohlížeč

### Spuštění lokálně

#### Varianta 1: VS Code Live Server (doporučeno)

1. Nainstalujte rozšíření "Live Server" ve VS Code
2. Otevřete projekt ve VS Code
3. Klikněte pravým tlačítkem na `index.html` → "Open with Live Server"
4. Web se otevře na `http://localhost:5500`

#### Varianta 2: Python

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

Otevřete prohlížeč na `http://localhost:8000`

#### Varianta 3: Node.js http-server

```bash
npx http-server -p 8000
```

### Přístup k admin panelu

Po spuštění webu přejděte na:
```
http://localhost:5500/admin/
```

## ⚙️ Správa obsahu

### Admin panel

Admin panel umožňuje upravovat:

1. **Značka & Distribuce** - Informace o značce a distributorovi
2. **Barvy & Design** - Barevné schema, logo, SEO
3. **Navigace** - Náhled navigační struktury
4. **Produkty** - Správa kategorií produktů
5. **Export/Import** - Stažení a nahrání konfigurací

### Jak upravit obsah

1. Otevřete admin panel (`/admin/`)
2. Upravte požadované údaje ve formuláři
3. Klikněte na "Stáhnout config/battipav.json" nebo "Stáhnout products/products.json"
4. Nahraďte původní soubory v projektu stažené soubory
5. Obnovte stránku webu

### Ruční úprava JSON souborů

Můžete také přímo upravovat JSON soubory:

#### config/battipav.json

```json
{
  "brand": {
    "name": "BATTIPAV",
    "fullName": "Battipav S.r.l.",
    "country": "Itálie",
    "description": "..."
  },
  "distributor": {
    "name": "NTC STAVEBNÍ TECHNIKA spol. s r.o.",
    "phone": "+420 xxx xxx xxx",
    "email": "info@ntc.cz",
    ...
  },
  "colors": {
    "primary": "#E31E24",
    ...
  }
}
```

#### products/products.json

```json
{
  "categories": [
    {
      "id": "manual-cutters",
      "name": "Ruční řezačky dlaždic",
      "products": [...]
    }
  ]
}
```

## 🔄 Duplikace pro novou značku

Pro vytvoření webu pro novou značku (např. "NOVA"):

### Krok 1: Příprava konfigurace

1. Otevřete admin panel
2. Upravte všechny údaje:
   - Název značky
   - Logo (vytvořte složku `assets/images/nova/`)
   - Barvy
   - Produkty
   - Kontaktní údaje distributora

### Krok 2: Export konfigurace

1. V admin panelu klikněte na "Stáhnout config/battipav.json"
2. Přejmenujte stažený soubor na `nova.json`
3. Zkopírujte do složky `config/`

### Krok 3: Úprava načítání konfigurace

V souboru `assets/js/config-loader.js` změňte řádek 8:

```javascript
// Před:
const configResponse = await fetch(`config/battipav.json`);

// Po:
const configResponse = await fetch(`config/nova.json`);
```

**Nebo ještě lepší** - vytvořte parametr v URL:

```javascript
const brandName = new URLSearchParams(window.location.search).get('brand') || 'battipav';
const configResponse = await fetch(`config/${brandName}.json`);
```

Pak můžete přepínat značky pomocí `?brand=nova`

### Krok 4: Přidání log a obrázků

1. Vytvořte složku `assets/images/nova/`
2. Přidejte:
   - `logo.svg` - hlavní logo
   - `logo-alt.png` - alternativní logo
   - `favicon.ico` - favicon

### Krok 5: Testování

1. Otevřete web
2. Zkontrolujte, že se načítají správné barvy a logo
3. Zkontrolujte produkty
4. Otestujte všechny stránky

## 🎨 Customizace

### Změna barev

Barvy se mění v admin panelu nebo v `config/[znacka].json`:

```json
"colors": {
  "primary": "#E31E24",        // Hlavní barva (tlačítka, odkazy)
  "primaryDark": "#B71820",    // Tmavší varianta
  "secondary": "#2C2C2C",      // Sekundární (header, footer)
  "accent": "#F5F5F5"          // Akcent (pozadí)
}
```

### Přidání nové stránky

1. Vytvořte nový HTML soubor (např. `references.html`)
2. Zkopírujte strukturu z existující stránky
3. Přidejte do navigace v `config/[znacka].json`:

```json
"navigation": [
  ...
  {
    "id": "references",
    "label": "Reference",
    "url": "references.html"
  }
]
```

### Úprava layoutu

Upravte `assets/css/main.css` pro změnu layoutu a stylů.

### Přidání produktu

V admin panelu nebo přímo v `products/products.json`:

```json
{
  "id": "product-id",
  "name": "Název produktu",
  "description": "Popis produktu",
  "features": [
    "Vlastnost 1",
    "Vlastnost 2"
  ],
  "image": "assets/images/products/product.jpg",
  "brochure": "assets/documents/product.pdf"
}
```

## 📱 Responsivní design

Web je plně responzivní s breakpointy:

- **Desktop**: > 992px
- **Tablet**: 768px - 992px
- **Mobil**: < 768px

## 🔧 Technické informace

### Použité technologie

- HTML5
- CSS3 (CSS Variables)
- Vanilla JavaScript (ES6+)
- JSON pro konfiguraci

### Kompatibilita prohlížečů

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### SEO

- Dynamické meta tagy
- Semantic HTML
- Open Graph ready (lze doplnit)
- Optimalizováno pro rychlost

## 📞 Podpora

Pro technickou podporu kontaktujte vývojáře nebo vytvořte issue v repozitáři.

## 📝 Poznámky

- Web je statický a nevyžaduje databázi
- Pro produkční nasazení doporučujeme použít HTTPS
- Formulář v kontaktu vyžaduje backend pro odesílání emailů
- Soubory katalogů je potřeba doplnit manuálně

## 🎯 Roadmap

- [ ] Backend pro kontaktní formulář
- [ ] Více jazykových verzí
- [ ] Fulltextové vyhledávání produktů
- [ ] Integrace s e-shopem
- [ ] Google Analytics integrace
- [ ] Doplnění produktových kategorií (CLASS, VIP, SUPREME série)
- [ ] Mobilní optimalizace hlavičky (scroll hide)

## 📝 Historie změn

### Verze 1.2 (Leden 2025)

#### Navigace
- ✅ **3-level menu** - rozbalitelné podmenu s podkategoriemi
- ✅ Rekurzivní generování menu libovolné hloubky
- ✅ Postupné rozbalování (jen při hoveru)
- ✅ Šipky (›) u položek s dalším submenu
- ✅ Responzivní pro desktop i mobil

#### Produkty
- ✅ **6 podkategorií Elektrických pil:**
  - Pily blokové, Pily portálové blokové, Pily portálové stavební
  - Pily portálové na obklady, Pily portálové na velkoformáty, Pily stolové
- ✅ **2 podkategorie Ručních řezaček:**
  - Řezání tlakem (PROFI EVO), Řezání tahem
- ✅ Přesunutí produktů do podkategorií v products.json

#### Kotvy a scroll
- ✅ ID kotvy pro všechny podkategorie
- ✅ Automatický scroll na správnou sekci při kliknutí v menu
- ✅ Scroll offset 175px pro správné odsazení pod hlavičkou

#### Technické
- ✅ SSH autentizace pro GitHub
- ✅ Aktualizace dokumentace (README.md, ToDo.md)

### Verze 1.1 (Leden 2025)

#### Hlavička
- ✅ Redesign hlavičky - odebrán šedý top bar
- ✅ Kompaktní hlavička: "Battipav Česká republika" + kontakty
- ✅ Zmenšení výšky hlavičky o 25%
- ✅ Scroll offset pro kotvy (165px)

#### O společnosti
- ✅ Přidáno rozbalovací menu: Battipav / NTC
- ✅ Nová NTC sekce s přidanou hodnotou a pilíři
- ✅ Banner "Oficiální zastoupení pro Českou republiku"
- ✅ Strukturované informace o distribuci

#### Carousel
- ✅ Odstranění gradientových overlayů
- ✅ Upravené šipky bez kolečka
- ✅ Tlačítka dole uprostřed
- ✅ 3. slide pouze s obrázkem a tlačítkem
- ✅ Opravy scroll/fade animací

#### Produkty
- ✅ Zúžení na kategorii "Elektrické stroje"
- ✅ Odstranění ostatních kategorií (ruční, míchačky, atd.)
- ✅ Cache buster pro načítání JSON
- ✅ Aktualizace patiček napříč stránkami

#### Technické
- ✅ Vypnuto automatické schovávání hlavičky (problémy s animací)
- ✅ Debug výpisy pro troubleshooting
- ✅ Optimalizace načítání konfigurace

### Verze 1.0 (Prosinec 2024)
- ✅ Základní struktura webu
- ✅ Admin panel
- ✅ Konfigurovatelný systém
- ✅ Responzivní design

## 🔧 Aktuální stav projektu

**Produkční stránky:** 5
- index.html (Domů + carousel)
- about.html (Battipav + NTC)
- products.html (Elektrické stroje)
- contact.html
- catalogue.html

**Produktové kategorie:** 2 aktivní
- Elektrické pily (6 podkategorií, 5 produktů)
  - Pily blokové: ELITE 80S
  - Pily portálové blokové: PRIME 700
  - Pily portálové na obklady: VIP 260, CLASS PLUS (3 varianty)
  - Pily portálové na velkoformáty: Extra Superlunga 3300S
- Ruční řezačky obkladů (2 podkategorie, 1 produkt)
  - Řezání tlakem: PROFI EVO (5 variant)

**Připraveno k rozšíření:**
- Doplnění produktů do prázdných podkategorií
- Doplnění produktů do kategorie "Řezání tahem"
- Kamenické pily
- Příslušenství

---

**Vytvořeno pro NTC STAVEBNÍ TECHNIKA spol. s r.o.**
**Oficiální web značky BATTIPAV pro Českou republiku**
