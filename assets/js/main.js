// Main JavaScript - Dynamické naplnění obsahu z konfigurace

// Čekání na načtení konfigurace
document.addEventListener('brandConfigLoaded', (e) => {
    const config = e.detail;
    populateContent(config);
    loadCategories(config);
});

// Naplnění obsahu stránky
function populateContent(config) {
    const brand = config.getBrand();
    const distributor = config.getDistributor();

    // Header
    const distributorRole = document.getElementById('distributor-role');
    if (distributorRole) {
        distributorRole.textContent = distributor.role;
    }

    const distributorName = document.getElementById('distributor-name');
    if (distributorName) {
        distributorName.textContent = distributor.name;
    }

    const brandCountry = document.getElementById('brand-country');
    if (brandCountry) {
        brandCountry.textContent = brand.country;
    }

    const headerPhone = document.getElementById('header-phone');
    if (headerPhone && distributor.phone) {
        headerPhone.href = `tel:${distributor.phone}`;
        headerPhone.textContent = distributor.phone;
    }

    const headerEmail = document.getElementById('header-email');
    if (headerEmail && distributor.email) {
        headerEmail.href = `mailto:${distributor.email}`;
        headerEmail.textContent = distributor.email;
    }

    // Logo
    const mainLogo = document.getElementById('main-logo');
    if (mainLogo) {
        mainLogo.src = config.config.logo.main;
        mainLogo.alt = brand.name + ' Logo';
    }

    // Hero
    const heroBrandName = document.getElementById('hero-brand-name');
    if (heroBrandName) {
        heroBrandName.textContent = brand.name;
    }

    // About
    const aboutBrandName = document.getElementById('about-brand-name');
    if (aboutBrandName) {
        aboutBrandName.textContent = brand.name;
    }

    const brandDescription = document.getElementById('brand-description');
    if (brandDescription) {
        brandDescription.textContent = brand.description;
    }

    const whyBrandName = document.getElementById('why-brand-name');
    if (whyBrandName) {
        whyBrandName.textContent = brand.name;
    }

    // Footer
    const footerBrandName = document.getElementById('footer-brand-name');
    if (footerBrandName) {
        footerBrandName.textContent = brand.name;
    }

    const footerBrandDescription = document.getElementById('footer-brand-description');
    if (footerBrandDescription) {
        footerBrandDescription.textContent = brand.description;
    }

    const footerDistributorName = document.getElementById('footer-distributor-name');
    if (footerDistributorName) {
        footerDistributorName.textContent = distributor.name;
    }

    const footerAddress = document.getElementById('footer-address');
    if (footerAddress && distributor.address) {
        footerAddress.textContent = distributor.address;
    }

    const footerPhone = document.getElementById('footer-phone');
    if (footerPhone && distributor.phone) {
        footerPhone.textContent = 'Tel: ' + distributor.phone;
    }

    const footerEmail = document.getElementById('footer-email');
    if (footerEmail && distributor.email) {
        footerEmail.textContent = 'Email: ' + distributor.email;
    }

    const footerCopyright = document.getElementById('footer-copyright');
    if (footerCopyright) {
        footerCopyright.textContent = distributor.name;
    }

    const currentYear = document.getElementById('current-year');
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    // Navigation
    loadNavigation(config);
}

// Načtení navigace
function loadNavigation(config) {
    const navList = document.getElementById('nav-list');
    if (!navList) return;

    const navigation = config.getNavigation();
    navList.innerHTML = '';

    navigation.forEach(item => {
        const li = document.createElement('li');
        li.className = 'nav__item';

        const link = document.createElement('a');
        link.href = item.url;
        link.className = 'nav__link';
        link.textContent = item.label;

        // Externí odkazy otevřít v nové záložce
        if (item.url.startsWith('http://') || item.url.startsWith('https://')) {
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
        }

        // Aktivní stránka
        if (window.location.pathname.includes(item.url) ||
            (item.url === 'index.html' && window.location.pathname === '/')) {
            link.classList.add('active');
        }

        li.appendChild(link);

        // Submenu
        if (item.submenu && item.submenu.length > 0) {
            const submenu = document.createElement('ul');
            submenu.className = 'nav__submenu';

            item.submenu.forEach(subitem => {
                const subLi = document.createElement('li');
                const subLink = document.createElement('a');
                subLink.href = subitem.url;
                subLink.className = 'nav__submenu-link';
                subLink.textContent = subitem.label;

                // Externí odkazy otevřít v nové záložce
                if (subitem.url.startsWith('http://') || subitem.url.startsWith('https://')) {
                    subLink.target = '_blank';
                    subLink.rel = 'noopener noreferrer';
                }

                subLi.appendChild(subLink);
                submenu.appendChild(subLi);
            });

            li.appendChild(submenu);
        }

        navList.appendChild(li);
    });
}

// Načtení kategorií na hlavní stránce
function loadCategories(config) {
    const categoriesGrid = document.getElementById('categories-grid');
    if (!categoriesGrid) return;

    const products = config.getProducts();
    if (!products || !products.categories) return;

    categoriesGrid.innerHTML = '';

    products.categories.forEach(category => {
        const card = document.createElement('div');
        card.className = 'card';

        card.innerHTML = `
            ${category.image ? `<img src="${category.image}" alt="${category.name}" class="card__image">` : ''}
            <div class="card__content">
                <h3 class="card__title">${category.name}</h3>
                <p class="card__description">${category.description}</p>
                <a href="products.html#${category.id}" class="card__link">Zobrazit produkty</a>
            </div>
        `;

        categoriesGrid.appendChild(card);
    });
}

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.getElementById('nav-toggle');
    const navList = document.getElementById('nav-list');

    if (navToggle && navList) {
        navToggle.addEventListener('click', () => {
            navList.classList.toggle('active');
        });
    }

    // Hide header on scroll - DISABLED for now due to issues
    // Můžeme to zapnout později až bude web hotový
});

// Smooth scroll pro kotvy
document.addEventListener('click', (e) => {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});
