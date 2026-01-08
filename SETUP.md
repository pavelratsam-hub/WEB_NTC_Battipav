# 🛠️ Setup vývojového prostředí - WEB BATTIPAV

Tento průvodce ti pomůže nastavit vývojové prostředí na novém počítači pro práci na projektu WEB BATTIPAV.

---

## 🎯 O projektu

**WEB BATTIPAV** je profesionální webová prezentace pro oficiálního dovozce italských strojů BATTIPAV do České republiky (NTC STAVEBNÍ TECHNIKA spol. s r.o.).

### **Technologie**

Projekt je postaven jako **statický web** na moderních webových technologiích:

- **HTML5** - Sémantická struktura stránek
- **CSS3** - Moderní styly s CSS Variables pro dynamické téma
- **Vanilla JavaScript (ES6+)** - Žádné frameworky, čistý JavaScript
- **JSON** - Konfigurace a databáze produktů

### **Proč statický web?**

✅ **Výhody:**
- **Rychlost** - Okamžité načítání, žádný server-side rendering
- **Bezpečnost** - Žádná databáze, žádné SQL injection
- **Jednoduchost** - Snadná údržba a hosting
- **Levný hosting** - GitHub Pages zdarma, nebo jakýkoliv webhosting
- **SEO friendly** - Vše je indexovatelné pro vyhledávače

❌ **Nevýhody:**
- Formulář vyžaduje externí službu (Formspree, Netlify Forms, atd.)
- Změny obsahu vyžadují úpravu JSON souborů a redeploy

### **Architektura projektu**

```
Statický web s dynamickým obsahem
├── HTML soubory (struktura stránek)
├── CSS (design a layout)
├── JavaScript (interaktivita)
└── JSON konfigurace
    ├── config/battipav.json (barvy, loga, kontakty)
    └── products/products.json (produkty, kategorie)
```

**Jak to funguje:**
1. HTML stránka se načte s výchozí strukturou
2. JavaScript načte konfiguraci z JSON souborů
3. Dynamicky vyplní obsah (produkty, barvy, kontakty)
4. CSS Variables zajistí jednotný design dle značky

### **Design Pattern**

Projekt používá **konfigurovatelný šablonový systém**:
- Jeden kód = více značek (Battipav, případně další)
- Změna značky = změna JSON souboru
- Žádné změny v HTML/CSS/JS kódu

### **Bez závislostí**

Projekt **nevyžaduje**:
- ❌ Node.js nebo npm (žádné dependencies)
- ❌ Build process nebo webpack
- ❌ React, Vue, Angular nebo jiný framework
- ❌ Databázi (MySQL, MongoDB, atd.)
- ❌ Backend server (PHP, Node.js, Python)

**Co potřebuješ:**
- ✅ Moderní prohlížeč (Chrome, Firefox, Safari, Edge)
- ✅ Lokální HTTP server pro vývoj (Python, VS Code Live Server)
- ✅ Textový editor (VS Code doporučeno)

### **Browser kompatibilita**

Web je testován a funguje na:
- ✅ Chrome 90+ (Windows, Mac, Android)
- ✅ Firefox 88+ (Windows, Mac, Linux)
- ✅ Safari 14+ (Mac, iOS)
- ✅ Edge 90+ (Windows)

**Použité moderní CSS/JS funkce:**
- CSS Variables (custom properties)
- CSS Grid & Flexbox
- Fetch API (načítání JSON)
- ES6+ (arrow functions, template literals, destructuring)
- Async/Await

---

## 📋 Co budeš potřebovat

### 1. **Git** (správa verzí)
- **Windows:** Stáhni z https://git-scm.com/download/win
- **Mac:** `brew install git` nebo stáhni z webu
- **Linux:** `sudo apt install git` nebo `sudo yum install git`

**Instalace:**
1. Spusť instalátor
2. Během instalace nech výchozí nastavení
3. Ověř instalaci: `git --version`

**První nastavení Gitu:**
```bash
git config --global user.name "Tvoje Jméno"
git config --global user.email "tvuj@email.cz"
```

---

### 2. **Python 3** (pro lokální web server)
- **Windows:** Stáhni z https://www.python.org/downloads/
  - ⚠️ **DŮLEŽITÉ:** Při instalaci zaškrtni "Add Python to PATH"
- **Mac:** Už je předinstalovaný, nebo `brew install python3`
- **Linux:** Obvykle předinstalovaný

**Ověření:**
```bash
python --version
# nebo
python3 --version
```

---

### 3. **VS Code** (editor - doporučeno)
- Stáhni z https://code.visualstudio.com/

**Doporučené rozšíření:**
- **Live Server** (ritwickdey.LiveServer) - pro okamžitý náhled změn
  - Instalace: Extensions (Ctrl+Shift+X) → vyhledej "Live Server" → Install

**Alternativně (volitelné):**
- **HTML CSS Support** - lepší autocomplete
- **Path Intellisense** - automatické dokončování cest k souborům
- **Prettier** - formátování kódu

---

## 🚀 Prvotní nastavení projektu

### Krok 1: Klonování repozitáře

```bash
# Přejdi do složky, kde chceš mít projekt (např. Documents)
cd C:\Users\[tvoje-jmeno]\Documents

# Naklonuj repozitář z GitHubu
git clone https://github.com/pavelratsam-hub/WEB_NTC_Battipav.git

# Přejdi do složky projektu
cd WEB_NTC_Battipav
```

---

### Krok 2: Otevři projekt ve VS Code

```bash
# Otevře projekt přímo ve VS Code
code .
```

**Nebo:**
- Spusť VS Code
- File → Open Folder
- Vyber složku `WEB_NTC_Battipav`

---

### Krok 3: Spuštění lokálního web serveru

#### **Varianta A: Python HTTP Server (doporučeno pro testování)**

**Windows PowerShell / CMD:**
```bash
python -m http.server 8000
```

**Windows Git Bash / Mac / Linux:**
```bash
python3 -m http.server 8000
```

Web bude dostupný na: `http://localhost:8000`

**Pro zastavení serveru:** Stiskni `Ctrl+C` v terminálu

---

#### **Varianta B: VS Code Live Server (doporučeno pro vývoj)**

1. Nainstaluj rozšíření "Live Server" (viz výše)
2. Otevři `index.html`
3. Klikni pravým tlačítkem → **"Open with Live Server"**
4. Web se otevře automaticky (obvykle na `http://localhost:5500`)

**Výhody:**
- Automatické obnovování stránky při změnách
- Rychlejší vývoj
- Lepší developer experience

---

## 🔗 Propojení s GitHub

Aby jsi mohl nahrávat změny na GitHub, musíš se autentizovat.

### **Varianta A: GitHub Desktop (nejjednodušší pro začátečníky)**

1. **Stáhni GitHub Desktop:** https://desktop.github.com/
2. Nainstaluj a přihlas se svým GitHub účtem
3. File → Clone Repository → vyhledej `WEB_NTC_Battipav`
4. Všechno ostatní GitHub Desktop dělá automaticky (pull, commit, push)

**Výhody:**
- ✅ Žádné příkazy v terminálu
- ✅ Vizuální rozhraní pro změny
- ✅ Automatická autentizace

---

### **Varianta B: Git přes příkazovou řádku (pro pokročilé)**

Pokud používáš Git v terminálu, potřebuješ nastavit autentizaci:

#### **1. GitHub Personal Access Token (doporučeno)**

**Vytvoření tokenu:**
1. Jdi na GitHub.com → přihlaš se
2. Klikni na svůj profilový obrázek (vpravo nahoře) → **Settings**
3. V levém menu scrolluj dolů → **Developer settings**
4. **Personal access tokens** → **Tokens (classic)**
5. **Generate new token** → **Generate new token (classic)**
6. Zadej název: "WEB_BATTIPAV Token"
7. Vyber scope: **repo** (zaškrtni celou sekci)
8. Klikni **Generate token**
9. **⚠️ DŮLEŽITÉ:** Zkopíruj token a ulož si ho (ukáže se jen jednou!)

**Použití tokenu při push:**
```bash
# Při prvním push tě Git požádá o přihlášení:
git push origin main

# Username: tvůj-github-username
# Password: ZDE VLOŽ TOKEN (ne heslo!)
```

**Windows:** Token se uloží do Windows Credential Manager - další pushování už bude automatické.

---

#### **2. SSH klíč (alternativa)**

**Windows - generování SSH klíče:**
```bash
# Otevři Git Bash
ssh-keygen -t ed25519 -C "tvuj@email.cz"

# Stiskni Enter 3x (výchozí umístění, žádné heslo)

# Zkopíruj veřejný klíč
cat ~/.ssh/id_ed25519.pub
```

**Přidání SSH klíče na GitHub:**
1. GitHub.com → Settings → **SSH and GPG keys**
2. **New SSH key**
3. Vlož zkopírovaný klíč
4. Klikni **Add SSH key**

**Změna URL repozitáře na SSH:**
```bash
git remote set-url origin git@github.com:pavelratsam-hub/WEB_NTC_Battipav.git
```

---

### **Ověření propojení**

```bash
# Zkontroluj, že jsi připojen k repozitáři
git remote -v

# Mělo by zobrazit:
# origin  https://github.com/pavelratsam-hub/WEB_NTC_Battipav.git (fetch)
# origin  https://github.com/pavelratsam-hub/WEB_NTC_Battipav.git (push)
```

---

## 🔄 Práce s Gitem

### Stažení nejnovější verze z GitHubu

```bash
# Ujisti se, že jsi v projektové složce
cd WEB_NTC_Battipav

# Stáhni nejnovější změny
git pull origin main
```

---

### Nahrání změn na GitHub

```bash
# 1. Zkontroluj, co se změnilo
git status

# 2. Přidej změněné soubory
git add .

# 3. Vytvoř commit s popisem
git commit -m "Popis změn, které jsi udělal"

# 4. Nahraj na GitHub
git push origin main
```

**Příklad workflow:**
```bash
# Upravil jsi CSS a obrázky
git status
git add .
git commit -m "Upravit barvy TOP produktů sekce"
git push origin main
```

---

## 📁 Struktura projektu

```
WEB_BATTIPAV/
├── index.html              # Hlavní stránka
├── products.html           # Stránka produktů
├── about.html              # O společnosti
├── contact.html            # Kontakt
├── catalogue.html          # Katalog
├── assets/
│   ├── css/                # Styly
│   │   ├── variables.css
│   │   ├── main.css
│   │   └── carousel.css
│   ├── js/                 # JavaScript
│   └── images/             # Obrázky
├── config/
│   └── battipav.json       # Konfigurace webu
├── products/
│   └── products.json       # Databáze produktů
├── admin/                  # Admin panel
└── README.md               # Dokumentace
```

---

## 🧪 Testování lokálně

### Web
- **Hlavní stránka:** http://localhost:8000/
- **Produkty:** http://localhost:8000/products.html
- **Elektrické pily:** http://localhost:8000/electric-saws.html
- **Admin panel:** http://localhost:8000/admin/

### Tip pro rychlé testování
Vždy obnov stránku s **Ctrl+Shift+R** (hard refresh) - vymaže cache.

---

## 🌐 Živý web na GitHubu

Po pushnutí změn na GitHub se automaticky nasadí na:
```
https://pavelratsam-hub.github.io/WEB_NTC_Battipav/
```

⏱️ **Počkej 1-2 minuty** na deployment (můžeš sledovat v záložce "Actions" na GitHubu).

---

## ⚙️ Úprava obsahu

### 1. **Přes Admin Panel** (nejjednodušší)
```
http://localhost:8000/admin/
```
- Uprav obsah ve formuláři
- Stáhni upravené JSON soubory
- Nahraď je v projektu
- Commitni a pushni na GitHub

### 2. **Přímá úprava JSON**
- `config/battipav.json` - barvy, loga, kontakty
- `products/products.json` - produkty a kategorie

---

## 🐛 Časté problémy a řešení

### Web se nenačítá
❌ **Problém:** Otevřel jsi soubor přímo (file://)
✅ **Řešení:** Musíš používat lokální server (Python nebo Live Server)

### Git push nefunguje
❌ **Problém:** "Permission denied" nebo "Authentication failed"
✅ **Řešení:**
1. Nastav GitHub autentizaci - viz sekce **"🔗 Propojení s GitHub"** výše
2. Zkontroluj, že máš správné přístupové práva k repozitáři
3. Nebo použij **GitHub Desktop** (nejjednodušší)

### Git clone vyžaduje heslo
❌ **Problém:** Při `git clone` se ptá na heslo, ale heslo nefunguje
✅ **Řešení:**
- GitHub už nepodporuje hesla pro Git operace
- Musíš použít **Personal Access Token** nebo **SSH klíč**
- Viz sekce **"🔗 Propojení s GitHub"** výše

### Token/heslo se pořád ptá
❌ **Problém:** Git se pořád ptá na přihlášení při každém push
✅ **Řešení:**
- **Windows:** Token se měl uložit do Credential Manager automaticky
- Zkontroluj: Control Panel → Credential Manager → Windows Credentials
- Případně smaž staré přihlášení a zadej znovu s tokenem

### Změny se neprojevují
❌ **Problém:** Prohlížeč cachuje staré soubory
✅ **Řešení:** Použij **Ctrl+Shift+R** (hard refresh)

### Python příkaz nefunguje
❌ **Problém:** `python` není rozpoznán
✅ **Řešení:**
- Zkus `python3` místo `python`
- Nebo reinstaluj Python s "Add to PATH"

---

## 📞 Další zdroje

- **README.md** - kompletní dokumentace projektu
- **QUICKSTART.md** - rychlý start pro editaci
- **CAROUSEL_README.md** - dokumentace k carousel

---

## ✅ Checklist před začátkem práce

- [ ] Git nainstalován a nakonfigurován
- [ ] Python 3 nainstalován
- [ ] VS Code nainstalován
- [ ] Live Server rozšíření nainstalováno
- [ ] Repozitář naklonován z GitHubu
- [ ] **GitHub autentizace nastavena** (Personal Access Token nebo GitHub Desktop)
- [ ] Lokální server běží
- [ ] Web se zobrazuje v prohlížeči
- [ ] Zkušební změna a commit funguje
- [ ] `git push` na GitHub funguje

---

**Nyní jsi připraven pracovat na projektu! 🎉**

Pokud narazíš na problém, zkontroluj sekci "Časté problémy" výše.
