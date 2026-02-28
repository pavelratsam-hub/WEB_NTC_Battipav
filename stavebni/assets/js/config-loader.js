// Config Loader - Načítání konfigurace značky
class BrandConfig {
    constructor() {
        this.config = null;
        this.products = null;
    }

    async load(brandName = 'battipav') {
        try {
            // Cache buster
            const cacheBuster = new Date().getTime();

            // Načtení konfigurace značky
            const configResponse = await fetch(`config/${brandName}.json?v=${cacheBuster}`);
            this.config = await configResponse.json();

            // Načtení produktů
            const productsResponse = await fetch(`products/products.json?v=${cacheBuster}`);
            this.products = await productsResponse.json();

            // Aplikování konfigurace
            this.applyConfig();

            return this.config;
        } catch (error) {
            console.error('Chyba při načítání konfigurace:', error);
            throw error;
        }
    }

    applyConfig() {
        if (!this.config) return;

        // Nastavení CSS proměnných
        const root = document.documentElement;
        const colors = this.config.colors;

        root.style.setProperty('--color-primary', colors.primary);
        root.style.setProperty('--color-primary-dark', colors.primaryDark);
        root.style.setProperty('--color-secondary', colors.secondary);
        root.style.setProperty('--color-accent', colors.accent);
        root.style.setProperty('--color-text', colors.text);
        root.style.setProperty('--color-text-light', colors.textLight);
        root.style.setProperty('--color-background', colors.background);
        root.style.setProperty('--color-background-gray', colors.backgroundGray);

        // Typografie
        const typography = this.config.typography;
        root.style.setProperty('--font-family', typography.fontFamily);
        root.style.setProperty('--font-heading', typography.headingFont);
        root.style.setProperty('--font-size-base', typography.fontSize.base);
        root.style.setProperty('--font-size-h1', typography.fontSize.h1);
        root.style.setProperty('--font-size-h2', typography.fontSize.h2);
        root.style.setProperty('--font-size-h3', typography.fontSize.h3);
        root.style.setProperty('--font-size-h4', typography.fontSize.h4);

        // SEO
        document.title = this.config.seo.title;
        this.setMetaTag('description', this.config.seo.description);
        this.setMetaTag('keywords', this.config.seo.keywords);

        // Favicon
        this.setFavicon(this.config.logo.favicon);
    }

    setMetaTag(name, content) {
        let meta = document.querySelector(`meta[name="${name}"]`);
        if (!meta) {
            meta = document.createElement('meta');
            meta.name = name;
            document.head.appendChild(meta);
        }
        meta.content = content;
    }

    setFavicon(href) {
        let link = document.querySelector('link[rel="icon"]');
        if (!link) {
            link = document.createElement('link');
            link.rel = 'icon';
            document.head.appendChild(link);
        }
        link.href = href;
    }

    // Helper metody pro práci s konfigurací
    getBrand() {
        return this.config.brand;
    }

    getDistributor() {
        return this.config.distributor;
    }

    getNavigation() {
        return this.config.navigation;
    }

    getColors() {
        return this.config.colors;
    }

    getProducts() {
        return this.products;
    }

    getProductsByCategory(categoryId) {
        const category = this.products.categories.find(cat => cat.id === categoryId);
        return category ? category.products : [];
    }
}

// Globální instance
const brandConfig = new BrandConfig();

// Automatické načtení při startu stránky
document.addEventListener('DOMContentLoaded', async () => {
    try {
        await brandConfig.load();
        // console.log('Konfigurace značky načtena:', brandConfig.getBrand().name);

        // Trigger custom event pro ostatní skripty
        document.dispatchEvent(new CustomEvent('brandConfigLoaded', {
            detail: brandConfig
        }));

        // Odstranit loading stav - zobrazit obsah
        document.body.classList.remove('config-loading');
    } catch (error) {
        console.error('Nepodařilo se načíst konfiguraci značky');
        // I při chybě odstranit loading stav
        document.body.classList.remove('config-loading');
    }
});
