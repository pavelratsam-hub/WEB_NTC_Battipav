// Products Page JavaScript

document.addEventListener('brandConfigLoaded', (e) => {
    const config = e.detail;
    loadProductsPage(config);
});

function loadProductsPage(config) {
    const productsContent = document.getElementById('products-content');
    if (!productsContent) return;

    const products = config.getProducts();
    if (!products || !products.categories) return;

    productsContent.innerHTML = '';

    // Detekce, zda zobrazit jen konkrétní kategorii
    const currentPage = window.location.pathname.split('/').pop().replace('.html', '');
    let categoriesToShow = products.categories;

    // Pokud jsme na stránce konkrétní kategorie, zobrazíme jen tu
    if (currentPage !== 'products') {
        categoriesToShow = products.categories.filter(cat => cat.id === currentPage);
    }

    categoriesToShow.forEach(category => {
        // Category Section
        const categorySection = document.createElement('section');
        categorySection.id = category.id;
        categorySection.style.marginBottom = 'var(--spacing-xxl)';

        // Zobrazit nadpis kategorie pouze pokud zobrazujeme více kategorií
        if (categoriesToShow.length > 1) {
            const header = document.createElement('div');
            header.className = 'section__header section__header--highlighted';
            header.innerHTML = `
                <h2 class="section__title">${category.name}</h2>
            `;
            categorySection.appendChild(header);
        }

        // TOP Products Section (only on category-specific pages)
        if (currentPage !== 'products') {
            renderTopProductsSection(category, categorySection);
        }

        // Check if category has subcategories
        if (category.subcategories && category.subcategories.length > 0) {
            renderSubcategories(category, categorySection);
        } else if (category.products && category.products.length > 0) {
            // Legacy: direct products (for manual-cutters)
            const grid = document.createElement('div');
            grid.className = 'grid grid--3';

            category.products.forEach(product => {
                const productCard = createProductCard(product);
                grid.appendChild(productCard);
            });

            categorySection.appendChild(grid);
        } else {
            const emptyMessage = document.createElement('p');
            emptyMessage.style.textAlign = 'center';
            emptyMessage.style.color = 'var(--color-text-light)';
            emptyMessage.textContent = 'Produkty v této kategorii budou brzy doplněny.';
            categorySection.appendChild(emptyMessage);
        }

        productsContent.appendChild(categorySection);
    });

    // Scroll to category if hash in URL
    if (window.location.hash) {
        const targetId = window.location.hash.substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            setTimeout(() => {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }
    }
}

// Render subcategories with products
function renderSubcategories(category, container) {
    if (!category.subcategories) return;

    category.subcategories.forEach(subcategory => {
        // Subcategory header
        const subHeader = document.createElement('div');
        subHeader.className = 'subcategory-header';
        subHeader.id = subcategory.id; // ID pro kotvy
        subHeader.innerHTML = `
            <h3 class="subcategory-title">${subcategory.name}</h3>
            ${subcategory.description ? `<p class="subcategory-description">${subcategory.description}</p>` : ''}
        `;
        container.appendChild(subHeader);

        // Products grid for this subcategory
        if (subcategory.products && subcategory.products.length > 0) {
            const grid = document.createElement('div');
            grid.className = 'grid grid--3';
            grid.style.marginBottom = 'var(--spacing-xxl)';

            subcategory.products.forEach(product => {
                const productCard = createProductCard(product);
                grid.appendChild(productCard);
            });

            container.appendChild(grid);
        } else {
            // Empty subcategory message
            const emptyMsg = document.createElement('p');
            emptyMsg.className = 'subcategory-empty';
            emptyMsg.textContent = 'Produkty budou brzy doplněny.';
            container.appendChild(emptyMsg);
        }
    });
}

// Create product card
function createProductCard(product) {
    const productCard = document.createElement('div');
    productCard.className = 'card product-card';
    productCard.setAttribute('data-product-id', product.id);

    // Check if product has variants
    if (product.variants && product.variants.length > 0) {
        // Product with variants
        const firstVariant = product.variants[0];

        let variantsSelectHTML = '';
        if (product.variants.length > 1) {
            variantsSelectHTML = `
                <div class="product-card__variants">
                    <label class="product-card__variants-label">Vyberte variantu:</label>
                    <div class="product-card__variants-buttons" data-product-id="${product.id}">
                        ${product.variants.map((v, idx) => `
                            <button class="variant-btn ${idx === 0 ? 'active' : ''}"
                                    data-variant-index="${idx}"
                                    onclick="selectVariant('${product.id}', ${idx})">
                                ${v.name}
                            </button>
                        `).join('')}
                    </div>
                </div>
            `;
        }

        let featuresHTML = '';
        if (firstVariant.features && firstVariant.features.length > 0) {
            featuresHTML = '<ul class="product-card__features" id="features-' + product.id + '">';
            firstVariant.features.forEach(feature => {
                featuresHTML += `<li>${feature}</li>`;
            });
            featuresHTML += '</ul>';
        }

        let buttonsHTML = '';
        if (firstVariant.technicalSheet || firstVariant.eshopUrl || product.brochure) {
            buttonsHTML = '<div class="product-card__buttons" id="buttons-' + product.id + '">';
            if (firstVariant.technicalSheet) {
                buttonsHTML += `<a href="${firstVariant.technicalSheet}" class="btn btn--primary variant-tech-link" target="_blank" rel="noopener noreferrer">Technický list</a>`;
            }
            if (firstVariant.eshopUrl) {
                buttonsHTML += `<a href="${firstVariant.eshopUrl}" class="btn btn--primary variant-eshop-link" target="_blank" rel="noopener noreferrer">Koupit na e-shopu</a>`;
            }
            if (product.brochure) {
                buttonsHTML += `<a href="${product.brochure}" class="btn btn--outline" download>Stáhnout prospekt</a>`;
            }
            buttonsHTML += '</div>';
        }

        productCard.innerHTML = `
            ${product.image ? `<img src="${product.image}" alt="${product.name}" class="card__image">` : ''}
            <div class="card__content">
                <h3 class="card__title">${product.name}</h3>
                <p class="card__description">${product.description}</p>
                ${variantsSelectHTML}
                ${featuresHTML}
                ${buttonsHTML}
            </div>
        `;

        // Store variants data
        productCard.dataset.variants = JSON.stringify(product.variants);
    } else {
        // Product without variants (old structure)
        let featuresHTML = '';
        if (product.features && product.features.length > 0) {
            featuresHTML = '<ul class="product-card__features">';
            product.features.forEach(feature => {
                featuresHTML += `<li>${feature}</li>`;
            });
            featuresHTML += '</ul>';
        }

        let buttonsHTML = '';
        if (product.technicalSheet || product.eshopUrl || product.brochure) {
            buttonsHTML = '<div class="product-card__buttons">';
            if (product.technicalSheet) {
                buttonsHTML += `<a href="${product.technicalSheet}" class="btn btn--primary" target="_blank" rel="noopener noreferrer">Technický list</a>`;
            }
            if (product.eshopUrl) {
                buttonsHTML += `<a href="${product.eshopUrl}" class="btn btn--primary" target="_blank" rel="noopener noreferrer">Koupit na e-shopu</a>`;
            }
            if (product.brochure) {
                buttonsHTML += `<a href="${product.brochure}" class="btn btn--outline" download>Stáhnout prospekt</a>`;
            }
            buttonsHTML += '</div>';
        }

        productCard.innerHTML = `
            ${product.image ? `<img src="${product.image}" alt="${product.name}" class="card__image">` : ''}
            <div class="card__content">
                <h3 class="card__title">${product.name}</h3>
                <p class="card__description">${product.description}</p>
                ${featuresHTML}
                ${buttonsHTML}
            </div>
        `;
    }

    // Wrap in flip container if product has seriesDescription
    if (product.seriesDescription) {
        const flipContainer = document.createElement('div');
        flipContainer.className = 'card-flip-container';

        const flipInner = document.createElement('div');
        flipInner.className = 'card-flip-inner';

        // Add info button to front
        const flipBtnFront = document.createElement('button');
        flipBtnFront.className = 'card-flip-btn';
        flipBtnFront.title = 'Popis řady';
        flipBtnFront.textContent = 'ℹ';
        flipBtnFront.addEventListener('click', (e) => {
            e.stopPropagation();
            flipInner.classList.add('flipped');
        });

        // Front side
        productCard.classList.add('card-front');
        productCard.style.position = 'relative';
        productCard.prepend(flipBtnFront);

        // Back side
        const backSide = document.createElement('div');
        backSide.className = 'card-back card product-card';

        const flipBtnBack = document.createElement('button');
        flipBtnBack.className = 'card-flip-btn';
        flipBtnBack.title = 'Zpět';
        flipBtnBack.textContent = '✕';
        flipBtnBack.addEventListener('click', (e) => {
            e.stopPropagation();
            flipInner.classList.remove('flipped');
        });

        const backContent = document.createElement('div');
        backContent.className = 'card-back__content';
        backContent.innerHTML = `
            <h3>O řadě ${product.name}</h3>
            <p>${product.seriesDescription}</p>
        `;

        backSide.appendChild(flipBtnBack);
        backSide.appendChild(backContent);

        flipInner.appendChild(productCard);
        flipInner.appendChild(backSide);
        flipContainer.appendChild(flipInner);

        return flipContainer;
    }

    return productCard;
}

// Select variant function
function selectVariant(productId, variantIndex) {
    // Find the product card
    const productCard = document.querySelector(`[data-product-id="${productId}"]`)?.closest('.product-card');
    if (!productCard) return;

    // Get variants from data attribute
    const variants = JSON.parse(productCard.dataset.variants);
    const selectedVariant = variants[variantIndex];

    // Update active button
    const variantButtons = productCard.querySelectorAll('.variant-btn');
    variantButtons.forEach((btn, idx) => {
        if (idx === variantIndex) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // Update features
    const featuresElement = productCard.querySelector(`#features-${productId}`);
    if (featuresElement && selectedVariant.features) {
        let featuresHTML = '';
        selectedVariant.features.forEach(feature => {
            featuresHTML += `<li>${feature}</li>`;
        });
        featuresElement.innerHTML = featuresHTML;
    }

    // Update buttons URLs
    const buttonsContainer = productCard.querySelector(`#buttons-${productId}`);
    if (buttonsContainer) {
        const techLink = buttonsContainer.querySelector('.variant-tech-link');
        const eshopLink = buttonsContainer.querySelector('.variant-eshop-link');

        if (techLink && selectedVariant.technicalSheet) {
            techLink.href = selectedVariant.technicalSheet;
        }
        if (eshopLink && selectedVariant.eshopUrl) {
            eshopLink.href = selectedVariant.eshopUrl;
        }
    }
}

// Render TOP Products Section
function renderTopProductsSection(category, container) {
    let topProducts = [];

    // Aggregate TOP products from subcategories
    if (category.subcategories && category.subcategories.length > 0) {
        category.subcategories.forEach(sub => {
            if (sub.products) {
                const subTopProducts = sub.products.filter(p => p.topProduct === true);
                topProducts = topProducts.concat(subTopProducts);
            }
        });
    } else if (category.products) {
        // Legacy: direct products
        topProducts = category.products.filter(p => p.topProduct === true);
    }

    // Take only first 4
    topProducts = topProducts.slice(0, 4);

    if (topProducts.length === 0) return; // No TOP products, don't show section

    // Create TOP section
    const topSection = document.createElement('div');
    topSection.className = 'top-products';
    topSection.innerHTML = '<h2 class="top-products__title">TOP Produkty</h2>';

    // Create grid
    const topGrid = document.createElement('div');
    topGrid.className = 'top-products__grid';

    topProducts.forEach(product => {
        const topCard = document.createElement('div');
        topCard.className = 'top-product-card';

        // Get variant index to scroll to
        const variantIndex = product.topVariantIndex || 0;

        // Build product name with variant
        let productName = product.name;
        if (product.variants && product.variants.length > 0 && product.variants[variantIndex]) {
            productName += ' ' + product.variants[variantIndex].name;
        }

        topCard.innerHTML = `
            ${product.image ? `<img src="${product.image}" alt="${productName}">` : ''}
            <h3>${productName}</h3>
            <button class="btn btn--primary" onclick="scrollToProduct('${product.id}', ${variantIndex})">
                Na detail
            </button>
        `;

        topGrid.appendChild(topCard);
    });

    topSection.appendChild(topGrid);
    container.appendChild(topSection);
}

// Scroll to product with variant pre-selection
function scrollToProduct(productId, variantIndex = 0) {
    const productCard = document.querySelector(`[data-product-id="${productId}"]`);
    if (!productCard) return;

    // Scroll to product
    productCard.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // Pre-select variant after scroll completes
    setTimeout(() => {
        const variants = productCard.dataset.variants;
        if (variants) {
            selectVariant(productId, variantIndex);
        }
    }, 500);
}
