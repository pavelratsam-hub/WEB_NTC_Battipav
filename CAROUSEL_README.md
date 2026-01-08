# 🎠 Carousel - Dokumentace

## 📋 Úprava carousel slidů v Admin panelu

### Jak upravit carousel slidy:

1. **Otevřete Admin Panel**
   ```
   http://localhost:8000/admin/
   ```

2. **Přejděte na záložku "Carousel"**

3. **Upravte existující slide:**
   - Badge (štítek) - emoji a text
   - Nadpis - můžete použít `<br>` pro nový řádek
   - Podnadpis - popis
   - Text tlačítka - co má být na CTA tlačítku
   - Odkaz tlačítka - kam má tlačítko vést
   - Pozadí - cesta k obrázku na pozadí
   - Gradient start/end - barvy overlay

4. **Přidat nový slide:**
   - Klikněte na "➕ Přidat slide"
   - Vyplňte všechny údaje

5. **Smazat slide:**
   - Klikněte na "Smazat" u konkrétního slidu

6. **Změnit pořadí slidů:**
   - Použijte šipky ↑ ↓ pro přesunutí

7. **Změnit rychlost přepínání:**
   - Upravte hodnotu "Rychlost automatického přepínání"
   - 5000 ms = 5 sekund (doporučeno)

8. **Uložit změny:**
   - Přejděte na záložku "Export/Import"
   - Klikněte "📥 Stáhnout config/battipav.json"
   - Nahraďte soubor `config/battipav.json`
   - Obnovte web (F5)

## 🎨 Struktura carousel slidu v JSON:

```json
{
  "id": "slide-1",
  "badge": "🇮🇹 Made in Italy",
  "title": "BATTIPAV",
  "subtitle": "Profesionální řezací stroje a nářadí<br>pro zpracování keramiky, kamene a betonu",
  "ctaText": "Zobrazit produkty",
  "ctaLink": "products.html",
  "background": "assets/images/battipav/slide1-bg.jpg",
  "gradientStart": "rgba(234, 91, 12, 0.85)",
  "gradientEnd": "rgba(76, 86, 92, 0.75)"
}
```

## 📁 Přidání vlastního obrázku na pozadí:

1. Nahrajte obrázek do `assets/images/battipav/`
2. Doporučená velikost: 1920x1080px nebo větší
3. Formát: JPG nebo PNG
4. V admin panelu zadejte cestu: `assets/images/battipav/muj-obrazek.jpg`

## 🎨 Nastavení barev gradientu:

Gradient overlay zajišťuje čitelnost textu na obrázku.

**Formát:** `rgba(červená, zelená, modrá, průhlednost)`

**Hodnoty:**
- Červená, Zelená, Modrá: 0-255
- Průhlednost: 0.0 (průhledné) až 1.0 (neprůhledné)

**Příklady:**
```css
rgba(234, 91, 12, 0.85)   /* Oranžová 85% neprůhledná */
rgba(76, 86, 92, 0.75)    /* Tmavě šedá 75% neprůhledná */
rgba(255, 255, 255, 0.5)  /* Bílá 50% neprůhledná */
rgba(0, 0, 0, 0.9)        /* Černá 90% neprůhledná */
```

**Tip:** Čím tmavší obrázek, tím menší průhlednost gradientu potřebujete.

## 🔧 Technické detaily:

### Soubory:
- **Konfigurace:** `config/battipav.json` - carousel sekce
- **HTML struktura:** `index.html` - carousel sekce
- **CSS styly:** `assets/css/carousel.css`
- **JavaScript logika:** `assets/js/carousel.js`
- **Načítání z config:** `assets/js/carousel-loader.js`
- **Admin panel:** `admin/admin-carousel.js`

### Funkce:
- ✅ Automatické přepínání slidů
- ✅ Ruční ovládání šipkami
- ✅ Navigace pomocí teček
- ✅ Klávesnice (← →)
- ✅ Touch/swipe na mobilu
- ✅ Pauza při najetí myší
- ✅ Plně responzivní

## 💡 Tipy a triky:

### Dobrý slide:
- **Krátký nadpis** - max 2 řádky
- **Stručný popis** - max 3 řádky
- **Jasné CTA** - specifické, ne "Klikněte zde"
- **Kvalitní obrázek** - sharp, dobře osvětlený
- **Čitelný text** - správný kontrast s pozadím

### Špatný slide:
- ❌ Dlouhý text (nikdo to nečte)
- ❌ Příliš světlý gradient (text nejde číst)
- ❌ Rozmazaný nebo malý obrázek
- ❌ Obecné CTA "Více informací"

### Optimální počet slidů:
- **3-5 slidů** je ideální
- Méně než 3 = málo obsahu
- Více než 5 = uživatelé neviděli všechny

### Rychlost přepínání:
- **4-6 sekund** (4000-6000 ms) je optimální
- Méně než 3s = příliš rychlé, uživatelé nestihnou číst
- Více než 8s = příliš pomalé, uživatelé odejdou

## 🚀 Quick Start:

```bash
# 1. Otevřete admin panel
http://localhost:8000/admin/

# 2. Klikněte na "Carousel"

# 3. Upravte slide

# 4. Stáhněte config (Export/Import)

# 5. Nahraďte config/battipav.json

# 6. Obnovte web (F5)
```

## 🎯 Příklad použití:

**Slide 1 - Brand:**
- Badge: 🇮🇹 Made in Italy
- Nadpis: BATTIPAV
- CTA: Zobrazit produkty

**Slide 2 - Produkt:**
- Badge: ⚡ Výkonné a přesné
- Nadpis: Elektrické řezačky CLASS & VIP série
- CTA: Elektrické stroje

**Slide 3 - USP:**
- Badge: 🏆 Profesionální kvalita
- Nadpis: Ruční řezačky SUPER PRO & PROFI série
- CTA: Ruční řezačky

---

**Potřebujete pomoc?** Otevřete issues nebo kontaktujte vývojáře.
