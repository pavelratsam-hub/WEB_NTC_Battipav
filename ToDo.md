# 📋 ToDo List - WEB BATTIPAV

Tento dokument obsahuje aktuální stav projektu a plánované úkoly.

---

## 📊 Aktuální stav projektu

### ✅ Co je hotovo:

- ✅ Základní struktura webu (5 stránek: Domů, O společnosti, Produkty, Kontakt, Katalog)
- ✅ Responzivní design (desktop, tablet, mobil)
- ✅ Admin panel pro správu obsahu
- ✅ Konfigurovatelný systém přes JSON
- ✅ Carousel na hlavní stránce (3 slidy)
- ✅ Dynamické načítání produktů z JSON
- ✅ TOP produkty sekce s filtrem
- ✅ Varianty produktů s přepínačem
- ✅ GitHub repozitář a GitHub Pages hosting
- ✅ Živý web: https://pavelratsam-hub.github.io/WEB_NTC_Battipav/
- ✅ **Vylepšené styly TOP produktů a kategorií** (oranžové pozadí, rámečky)
- ✅ **3-level menu navigace** (rozbalitelné podmenu s podkategoriemi)
- ✅ **Kotvy pro scroll na podkategorie** (funkční proklik z menu)

### 📁 Struktura obsahu:

**Produktové kategorie:**
- Elektrické pily
  - Podkategorie: Pily blokové, Pily portálové blokové, Pily portálové stavební, Pily portálové na obklady, Pily portálové na velkoformáty, Pily stolové
  - Produkty: ELITE 80S, PRIME 700, CLASS PLUS, VIP 260, Extra Superlunga 3300S
- Ruční řezačky obkladů
  - Podkategorie: Řezání tlakem, Řezání tahem
  - Produkty: PROFI EVO (5 variant: 63, 88, 103, 133, 163)

---

## 🎯 Priority a plánované úkoly

### ✅ **PRIORITA 1: Rozbalitelné podmenu Produkty** - HOTOVO

**Požadavek:**
- Při najetí na menu **"Produkty"** → pak na podmenu **"Elektrické pily"**
- Vpravo se má rozbalit **další úroveň podmenu** s podkategoriemi

**Implementace:**
- [x] Rozšířit strukturu navigace v `config/battipav.json` o třetí úroveň menu
- [x] Upravit `assets/js/main.js` pro načítání víceúrovňového menu (rekurzivní funkce)
- [x] Přidat CSS pro 3-level dropdown (šipky doprava, rozbalení vpravo)
- [x] Otestovat na desktop i mobilní verzi
- [x] Zajistit správné odkazy na produktové podkategorie
- [x] Přidat ID kotvy k podkategoriím pro scroll
- [x] Nastavit scroll-margin-top pro správné odsazení (175px)

**Upravené soubory:**
- `config/battipav.json` - přidáno submenu 3. úrovně
- `assets/js/main.js` - rekurzivní createMenuItem() funkce
- `assets/css/main.css` - 3-level dropdown styly, scroll-margin
- `assets/js/products.js` - ID kotvy pro podkategorie
- `products/products.json` - přidány podkategorie pro Ruční řezačky

---

### 🟡 **PRIORITA 2: Mobilní menu - vylepšení UX**

**Problémy k řešení:**

#### 2.1 Schovávání menu při scrollování
- [ ] **Varianta A:** Auto-hide menu při scrollu dolů (ukázat při scrollu nahoru)
- [ ] **Varianta B:** Tlačítko pro manuální sbalení hlavičky
- [ ] Implementovat vybranou variantu
- [ ] Otestovat na mobilních zařízeních

**Technické detaily:**
- Detekce směru scrollování
- Animace schovávání/zobrazování (smooth transition)
- Zachovat sticky pozici po zobrazení

#### 2.2 Scrollovatelné menu na mobilu
- [ ] Když se menu nevejde na obrazovku (výška), umožnit scroll uvnitř menu
- [ ] CSS: `max-height`, `overflow-y: auto`
- [ ] Zajistit, že scrollbar je stylovaný nebo skrytý (dle designu)

**Soubory k úpravě:**
- `assets/css/main.css` - mobilní media queries (max-width: 768px)
- `assets/js/main.js` - scroll detection (pokud varianta A)

#### 2.3 Podmenu automaticky sbalená
- [ ] Podmenu u "O společnosti" a "Produkty" **nesmí být** automaticky rozbalená
- [ ] Rozbalení pouze po kliknutí na šipku nebo položku
- [ ] Zavření ostatních podmenu při otevření nového (accordion style)

**Implementace:**
- Upravit mobilní menu logiku v `main.js`
- Přidat toggle funkci pro podmenu
- CSS pro animaci rozbalování/sbalování

---

### 🟠 **PRIORITA 3: Fix FOUC (Flash of Unstyled Content)**

**Problém:**
Při načtení stránky nebo refreshi se na krátkou chvíli zobrazí:
- ❌ Chybějící logo Battipav v hlavičce (prázdné místo)
- ❌ Původní carousel obrázky místo aktuálních z configu
- ❌ Chybějící telefon a email v hlavičce (info@ntc.cz)
- ❌ Obecné "přeskakování" obsahu

**Příčina:**
- HTML se načte první s defaultními hodnotami
- JavaScript pak asynchronně načítá config z JSON
- Až po načtení configu se přepíše DOM → viditelné blikání

**Řešení:**

#### 3.1 Skeleton/Loading state
- [ ] Přidat CSS třídu `.loading` na `<body>` při načítání
- [ ] Skrýt nebo zobrazit placeholder pro:
  - Logo
  - Kontakty v hlavičce
  - Carousel
- [ ] Odstranit `.loading` třídu po načtení configu

#### 3.2 Optimalizace načítání
- [ ] Použít `defer` nebo `async` u skriptů správně
- [ ] Preload důležitých assetů (logo, carousel obrázky)
- [ ] Inline kritické CSS přímo do HTML (fonts, layout)

#### 3.3 Default hodnoty v HTML
- [ ] Vložit defaultní logo přímo do HTML
- [ ] Vložit defaultní kontakty do HTML
- [ ] JavaScript pak jen updatene, pokud config existuje

**Soubory k úpravě:**
- `index.html` (a ostatní HTML) - přidat default hodnoty, loading state
- `assets/css/main.css` - loading state styly
- `assets/js/config-loader.js` - přidat/odebrat loading třídu

**Testování:**
- Otestovat na pomalém 3G připojení (Chrome DevTools → Network → Slow 3G)
- Zkontrolovat, že při refreshi není vidět blikání

---

## 📝 Další úkoly (nižší priorita)

### Backend a funkcionality

#### **Kontaktní formulář** - backend pro odesílání emailů

**Aktuální stav:** Formulář v `contact.html` je připravený, ale nefunguje (chybí backend).

**Požadavky:**
- Odesílání emailů na info@ntc.cz
- Ochrana proti spamu (captcha/honeypot)
- Potvrzovací zpráva uživateli po odeslání
- Validace polí (jméno, email, zpráva)

---

##### **Varianta 1: Formspree (doporučeno pro začátek)**

**Popis:** Nejjednodušší služba pro statické weby - stačí změnit `action` ve formuláři.

**Výhody:**
- ✅ **Nejrychlejší implementace** (5 minut)
- ✅ Zdarma 50 odeslaní/měsíc
- ✅ Spam ochrana zabudovaná
- ✅ Email notifikace
- ✅ Žádný vlastní backend potřeba

**Nevýhody:**
- ❌ Limit 50 emailů/měsíc na free plánu
- ❌ Formspree branding v emailu (free plán)
- ❌ Placená verze od $10/měsíc (1000 odeslaní)

**Implementace:**
1. Registrace na https://formspree.io
2. Vytvoř nový formulář pro WEB_BATTIPAV
3. Zkopíruj endpoint (např. `https://formspree.io/f/xyzabc123`)
4. Uprav `contact.html`:
   ```html
   <form action="https://formspree.io/f/xyzabc123" method="POST">
   ```
5. Hotovo! 🎉

**Soubory k úpravě:**
- [ ] `contact.html` - změnit action formuláře

---

##### **Varianta 2: EmailJS**

**Popis:** JavaScript knihovna pro odesílání emailů přímo z prohlížeče.

**Výhody:**
- ✅ Zdarma 200 emailů/měsíc
- ✅ Více funkcí (auto-reply, templaty)
- ✅ Funguje na jakémkoliv hostingu
- ✅ Vlastní email provider (Gmail, Outlook, SendGrid)

**Nevýhody:**
- ❌ Složitější implementace než Formspree
- ❌ Vyžaduje JavaScript knihovnu
- ❌ API klíče viditelné v kódu (teoretické bezpečnostní riziko)

**Implementace:**
1. Registrace na https://www.emailjs.com/
2. Nastav email service (Gmail, Outlook, atd.)
3. Vytvoř email template
4. Přidej EmailJS script do `contact.html`:
   ```html
   <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
   ```
5. Přidej JavaScript pro odeslání:
   ```javascript
   emailjs.sendForm('service_id', 'template_id', form)
   ```

**Soubory k úpravě:**
- [ ] `contact.html` - přidat EmailJS script
- [ ] `assets/js/contact.js` - nový soubor pro logiku formuláře

---

##### **Varianta 3: Netlify Forms**

**Popis:** Pokud by web běžel na Netlify (místo GitHub Pages), formulář funguje automaticky.

**Výhody:**
- ✅ **Nejjednodušší** - přidáš jen `netlify` atribut
- ✅ Zdarma 100 odeslaní/měsíc
- ✅ Admin panel pro správu zpráv
- ✅ Spam ochrana zabudovaná (Akismet)
- ✅ Notifikace přes email nebo Slack

**Nevýhody:**
- ❌ Vyžaduje hosting na Netlify (ne GitHub Pages)
- ❌ Migrace z GitHub Pages na Netlify

**Implementace (pokud přejdeme na Netlify):**
1. Přidej do formuláře atribut `netlify`:
   ```html
   <form name="contact" method="POST" netlify>
   ```
2. Deploy na Netlify
3. Hotovo! 🎉

**Kroky:**
- [ ] Zvážit migraci z GitHub Pages na Netlify
- [ ] `contact.html` - přidat `netlify` atribut

---

##### **Varianta 4: Vlastní PHP backend (na webhostingu)**

**Popis:** Klasický přístup - PHP skript na serveru odešle email.

**Výhody:**
- ✅ Plná kontrola nad funkcionalitou
- ✅ Žádné limity na počet emailů
- ✅ Žádné externí služby
- ✅ Funguje na běžném webhostingu

**Nevýhody:**
- ❌ Vyžaduje webhosting s PHP (ne GitHub Pages)
- ❌ Musíš naprogramovat spam ochranu
- ❌ Údržba vlastního kódu
- ❌ Potenciální bezpečnostní rizika (PHP injection)

**Implementace:**
1. Vytvoř `send-email.php` na serveru:
   ```php
   <?php
   if ($_SERVER["REQUEST_METHOD"] == "POST") {
       $name = htmlspecialchars($_POST['name']);
       $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
       $message = htmlspecialchars($_POST['message']);

       $to = "info@ntc.cz";
       $subject = "Nová zpráva z webu BATTIPAV";
       $body = "Jméno: $name\nEmail: $email\n\nZpráva:\n$message";

       mail($to, $subject, $body);
       header("Location: /thank-you.html");
   }
   ?>
   ```
2. Uprav `contact.html`:
   ```html
   <form action="send-email.php" method="POST">
   ```

**Soubory k vytvořit:**
- [ ] `send-email.php` - backend logika
- [ ] `thank-you.html` - děkovací stránka

---

##### **Varianta 5: Google Forms (nejjednodušší, ale méně profesionální)**

**Popis:** Embed Google Form do stránky.

**Výhody:**
- ✅ **Nejrychlejší** (10 minut)
- ✅ Zcela zdarma, bez limitů
- ✅ Odpovědi v Google Sheets
- ✅ Email notifikace přes Google Script

**Nevýhody:**
- ❌ Méně profesionální vzhled
- ❌ Google branding
- ❌ Obtížné stylování

**Implementace:**
1. Vytvoř Google Form na https://forms.google.com
2. Nastav notifikace emailem
3. Získej embed kód
4. Vlož do `contact.html`

---

##### **Doporučení:**

🥇 **Pro rychlé spuštění:** **Formspree** (Varianta 1)
- 5 minut implementace
- Funguje hned
- 50 emailů/měsíc určitě stačí pro začátek

🥈 **Pokud chceš víc funkcí:** **EmailJS** (Varianta 2)
- 200 emailů/měsíc
- Auto-reply možnosti
- Více kontroly

🥉 **Pokud migruješ hosting:** **Netlify Forms** (Varianta 3)
- Nejlepší řešení long-term
- Zároveň můžeš využít Netlify edge functions, atd.

---

- [ ] **Google Analytics** - sledování návštěvnosti
  - Přidat tracking kód do všech stránek

- [ ] **Cookie consent** - GDPR compliance
  - Banner s informací o cookies

### Obsah

- [ ] **Doplnění produktů:**
  - CLASS série (více modelů)
  - VIP série (více modelů)
  - SUPREME série
  - Kamenické pily
  - Příslušenství

- [ ] **Katalogy PDF:**
  - Nahrát produktové katalogy
  - Propojit tlačítka "Stáhnout katalog"

- [ ] **Obrázky produktů:**
  - Vysoké rozlišení pro všechny produkty
  - Optimalizace velikosti (WebP formát?)

### SEO a optimalizace

- [ ] **Meta tagy:**
  - Unikátní description pro každou stránku
  - Open Graph tagy (Facebook, LinkedIn sdílení)
  - Twitter Card tagy

- [ ] **Structured data** (schema.org)
  - Organization markup
  - Product markup
  - BreadcrumbList

- [ ] **Sitemap.xml** - pro lepší indexaci Google

- [ ] **Performance optimalizace:**
  - Lazy loading obrázků
  - Minifikace CSS/JS (build process)
  - CDN pro rychlejší načítání

### Design vylepšení

- [ ] **Animace:**
  - Smooth scroll mezi sekcemi
  - Fade-in efekty při scrollování
  - Hover efekty na produktové kartičky

- [ ] **Breadcrumbs** - navigační drobečková navigace
  - Na všech stránkách kromě homepage

- [ ] **Testimonials/Reference** - sekce se zákaznickými recenzemi

- [ ] **FAQ sekce** - často kladené otázky

### Vícejazyčnost (budoucnost)

- [ ] **Anglická verze webu**
  - Struktura pro přepínání jazyků
  - Překlad všech textů
  - Language switcher v hlavičce

- [ ] **Slovenská verze** - pokud NTC působí i na SK trhu

---

## 🔧 Technický dluh

- [ ] **Accessibility (A11y) audit:**
  - Aria labels pro interaktivní elementy
  - Keyboard navigation (Tab, Enter)
  - Screen reader kompatibilita

- [ ] **Cross-browser testing:**
  - Safari (Mac, iOS)
  - Firefox
  - Edge

- [ ] **Refactoring:**
  - Modulární JavaScript (ES6 modules)
  - CSS organizace (možná SCSS/SASS?)
  - Odstranění duplicitního kódu

- [ ] **Documentation:**
  - Inline komentáře v JS/CSS
  - API dokumentace pro config strukturu

---

## 📅 Timeline (orientační)

### Týden 1-2:
- ✅ Priorita 1: Rozbalitelné podmenu
- ✅ Priorita 3: Fix FOUC problému

### Týden 3:
- ✅ Priorita 2: Mobilní menu vylepšení

### Týden 4+:
- Backend pro kontaktní formulář
- Doplnění obsahu (produkty, obrázky)
- SEO optimalizace

---

## 📞 Poznámky

- Všechny změny testovat **lokálně** před pushem na GitHub
- Po dokončení každého úkolu aktualizovat tento dokument
- Prioritní je funkčnost před designem
- Mobile-first přístup při všech úpravách

---

## 🔄 Historie změn

### 2025-01-13
- ✅ **Implementace 3-level menu navigace**
  - Rekurzivní generování menu libovolné hloubky
  - Postupné rozbalování submenu (jen při hoveru)
  - Šipky (›) u položek s dalším submenu
  - Responzivní design (desktop + mobil)
- ✅ **Přidány podkategorie k "Elektrické pily"** (6 podkategorií)
  - Pily blokové, Pily portálové blokové, Pily portálové stavební
  - Pily portálové na obklady, Pily portálové na velkoformáty, Pily stolové
- ✅ **Přidány podkategorie k "Ruční řezačky"** (2 podkategorie)
  - Řezání tlakem (s produktem PROFI EVO)
  - Řezání tahem
- ✅ **Implementace kotev pro scroll na podkategorie**
  - Automatický scroll na správnou sekci při kliknutí v menu
  - Nastavení scroll-margin-top: 175px pro správné odsazení
- ✅ **Nastavení SSH autentizace na GitHubu**
- 📝 Aktualizace dokumentace (ToDo.md, README.md)

### 2025-01-08
- ✅ Vylepšení stylů TOP produktů (oranžové pozadí, rámečky)
- ✅ Vylepšení stylů kategorií (padding, line-height, margins)
- ✅ Vytvoření SETUP.md (průvodce nastavením prostředí)
- 📝 Vytvoření ToDo.md (tento dokument)

### 2025-01-07
- ✅ Oprava carousel obrázků pro GitHub Pages
- ✅ Aktivace GitHub Pages
- ✅ První nasazení webu

### 2025-01-06
- ✅ Inicializace Git repozitáře
- ✅ První commit projektu

---

**Poslední aktualizace:** 2025-01-13
**Autor:** Pavel Ratšam + Claude Sonnet 4.5
