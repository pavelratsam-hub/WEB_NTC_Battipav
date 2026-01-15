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
        const li = createMenuItem(item);
        navList.appendChild(li);
    });
}

// Rekurzivní vytvoření menu položky
function createMenuItem(item, level = 1) {
    const li = document.createElement('li');
    li.className = level === 1 ? 'nav__item' : '';

    const link = document.createElement('a');
    link.href = item.url;
    link.className = level === 1 ? 'nav__link' : 'nav__submenu-link';
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

    // Pokud má submenu, vytvoř wrapper s toggle buttonem (pro mobil)
    if (item.submenu && item.submenu.length > 0) {
        const wrapper = document.createElement('div');
        wrapper.className = 'nav__link-wrapper';
        wrapper.appendChild(link);

        // Toggle button pro rozbalení
        const toggleBtn = document.createElement('span');
        toggleBtn.className = 'nav__toggle-btn';
        wrapper.appendChild(toggleBtn);

        li.appendChild(wrapper);

        // Submenu - rekurzivně
        const submenu = document.createElement('ul');
        submenu.className = level === 1 ? 'nav__submenu' : 'nav__submenu nav__submenu--level' + (level + 1);

        item.submenu.forEach(subitem => {
            const subLi = createMenuItem(subitem, level + 1);
            submenu.appendChild(subLi);
        });

        li.appendChild(submenu);
    } else {
        li.appendChild(link);
    }

    return li;
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

    // Mobile submenu toggle s accordion chováním
    document.addEventListener('click', (e) => {
        if (window.innerWidth > 768) return;

        const toggleBtn = e.target.closest('.nav__toggle-btn');
        if (!toggleBtn) return;

        e.preventDefault();
        e.stopPropagation();

        const wrapper = toggleBtn.closest('.nav__link-wrapper');
        const parent = wrapper.parentElement;
        const submenu = parent.querySelector(':scope > .nav__submenu');
        const isOpening = !submenu.classList.contains('open');

        // Accordion: zavřít ostatní na stejné úrovni
        if (isOpening) {
            const siblingItems = parent.parentElement.children;
            for (const sibling of siblingItems) {
                if (sibling !== parent) {
                    const sibToggle = sibling.querySelector(':scope > .nav__link-wrapper > .nav__toggle-btn');
                    const sibSubmenu = sibling.querySelector(':scope > .nav__submenu');
                    if (sibToggle) sibToggle.classList.remove('open');
                    if (sibSubmenu) sibSubmenu.classList.remove('open');
                }
            }
        }

        toggleBtn.classList.toggle('open');
        submenu.classList.toggle('open');
    });

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
