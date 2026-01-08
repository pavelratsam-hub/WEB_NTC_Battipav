# 🚀 Rychlý start

## Spuštění webu (5 minut)

### 1. Otevřete projekt ve VS Code
```bash
cd WEB_BATTIPAV
code .
```

### 2. Nainstalujte Live Server
- Otevřete Extensions (Ctrl+Shift+X)
- Vyhledejte "Live Server"
- Klikněte Install

### 3. Spusťte web
- Pravý klik na `index.html`
- Vyberte "Open with Live Server"
- Web se otevře v prohlížeči

### 4. Otevřete Admin Panel
V prohlížeči přejděte na:
```
http://localhost:5500/admin/
```

## Rychlá úprava obsahu

### Změna kontaktních údajů

1. Otevřete `admin/index.html` v prohlížeči
2. Vyplňte telefon a email distributora
3. Klikněte "Stáhnout config/battipav.json"
4. Nahraďte soubor `config/battipav.json`
5. Obnovte stránku (F5)

### Změna barev

1. V admin panelu přejděte na záložku "Barvy & Design"
2. Vyberte nové barvy pomocí color pickeru
3. Stáhněte config
4. Nahraďte soubor
5. Obnovte stránku

### Přidání produktu

1. Otevřete `products/products.json`
2. Najděte příslušnou kategorii
3. Přidejte nový produkt:

```json
{
  "id": "muj-produkt",
  "name": "Název produktu",
  "description": "Popis produktu",
  "features": [
    "Vlastnost 1",
    "Vlastnost 2"
  ],
  "image": "assets/images/products/muj-produkt.jpg",
  "brochure": ""
}
```

4. Uložte soubor
5. Obnovte stránku

## Vytvoření webu pro novou značku (10 minut)

### 1. Připravte podklady
- Logo ve formátu SVG nebo PNG
- Favicon (16x16px, 32x32px)
- Barvy značky (hex kódy)
- Fotky produktů
- Texty o značce

### 2. Vytvořte složku pro obrázky
```bash
mkdir assets/images/nova-znacka
```

### 3. Zkopírujte loga
Umístěte do `assets/images/nova-znacka/`:
- `logo.svg`
- `logo-alt.png`
- `favicon.ico`

### 4. Upravte konfiguraci v Admin panelu
- Otevřete `http://localhost:5500/admin/`
- Upravte název značky
- Změňte barvy
- Upravte cesty k logům
- Vyplňte kontakty
- Stáhněte config jako `nova-znacka.json`

### 5. Uložte do config složky
Umístěte stažený soubor do `config/nova-znacka.json`

### 6. Změňte načítání konfigurace
V `assets/js/config-loader.js` na řádku 8:
```javascript
await brandConfig.load('nova-znacka');
```

### 7. Hotovo!
Obnovte stránku a uvidíte nový web s novou značkou.

## Časté problémy

### Web se nenačítá
- Ujistěte se, že používáte lokální server (Live Server)
- Nemůžete otevřít index.html přímo souborem (file://)

### Změny se neprojevují
- Zkuste vymazat cache (Ctrl+Shift+R)
- Zkontrolujte konzoli prohlížeče (F12)

### Konfigurace se nenačítá
- Zkontrolujte, že JSON soubor je validní
- Použijte JSON validator online

## Potřebujete pomoc?

Přečtěte si kompletní dokumentaci v `README.md`
