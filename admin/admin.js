// Admin Panel JavaScript

let currentConfig = null;
let currentProducts = null;

// Load config on page load
window.addEventListener('DOMContentLoaded', async () => {
    await loadConfigurations();
    populateForm();
    setupTabs();
    setupColorInputs();
});

// Load configurations from JSON files
async function loadConfigurations() {
    try {
        const configResponse = await fetch('../config/battipav.json');
        currentConfig = await configResponse.json();

        const productsResponse = await fetch('../products/products.json');
        currentProducts = await productsResponse.json();

        console.log('Konfigurace načteny');
    } catch (error) {
        console.error('Chyba při načítání konfigurace:', error);
        alert('Nepodařilo se načíst konfiguraci. Ujistěte se, že používáte lokální server.');
    }
}

// Populate form with current config
function populateForm() {
    if (!currentConfig) return;

    // Brand
    setValue('brand-name', currentConfig.brand.name);
    setValue('brand-fullName', currentConfig.brand.fullName);
    setValue('brand-country', currentConfig.brand.country);
    setValue('brand-description', currentConfig.brand.description);
    setValue('brand-website', currentConfig.brand.website);

    // Distributor
    setValue('distributor-name', currentConfig.distributor.name);
    setValue('distributor-role', currentConfig.distributor.role);
    setValue('distributor-country', currentConfig.distributor.country);
    setValue('distributor-phone', currentConfig.distributor.phone);
    setValue('distributor-email', currentConfig.distributor.email);
    setValue('distributor-address', currentConfig.distributor.address);
    setValue('distributor-ico', currentConfig.distributor.ico);
    setValue('distributor-dic', currentConfig.distributor.dic);

    // Colors
    setColorValue('color-primary', currentConfig.colors.primary);
    setColorValue('color-primaryDark', currentConfig.colors.primaryDark);
    setColorValue('color-secondary', currentConfig.colors.secondary);
    setColorValue('color-accent', currentConfig.colors.accent);

    // Logo
    setValue('logo-main', currentConfig.logo.main);
    setValue('logo-alt', currentConfig.logo.alt);
    setValue('logo-favicon', currentConfig.logo.favicon);

    // SEO
    setValue('seo-title', currentConfig.seo.title);
    setValue('seo-description', currentConfig.seo.description);
    setValue('seo-keywords', currentConfig.seo.keywords);

    // Load categories
    loadCategories();

    // Load carousel slides
    loadCarouselSlides();
}

// Helper function to set value
function setValue(id, value) {
    const element = document.getElementById(id);
    if (element) {
        element.value = value || '';
    }
}

// Helper function for color inputs
function setColorValue(id, value) {
    const colorInput = document.getElementById(id);
    const textInput = document.getElementById(id + '-text');

    if (colorInput) colorInput.value = value;
    if (textInput) textInput.value = value;
}

// Setup tabs
function setupTabs() {
    const tabs = document.querySelectorAll('.admin__tab');
    const contents = document.querySelectorAll('.admin__tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.dataset.tab;

            // Remove active class from all
            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));

            // Add active to clicked
            tab.classList.add('active');
            const targetContent = document.querySelector(`[data-content="${targetTab}"]`);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}

// Setup color inputs sync
function setupColorInputs() {
    const colorIds = ['color-primary', 'color-primaryDark', 'color-secondary', 'color-accent'];

    colorIds.forEach(id => {
        const colorInput = document.getElementById(id);
        const textInput = document.getElementById(id + '-text');

        if (colorInput && textInput) {
            colorInput.addEventListener('input', (e) => {
                textInput.value = e.target.value;
            });

            textInput.addEventListener('input', (e) => {
                if (/^#[0-9A-F]{6}$/i.test(e.target.value)) {
                    colorInput.value = e.target.value;
                }
            });
        }
    });
}

// Load and display categories
function loadCategories() {
    if (!currentProducts || !currentProducts.categories) return;

    const categoriesList = document.getElementById('categories-list');
    if (!categoriesList) return;

    categoriesList.innerHTML = '';

    currentProducts.categories.forEach((category, index) => {
        const categoryDiv = createCategoryElement(category, index);
        categoriesList.appendChild(categoryDiv);
    });
}

// Create category element
function createCategoryElement(category, index) {
    const div = document.createElement('div');
    div.className = 'category-item';

    let productsHTML = '';
    if (category.products && category.products.length > 0) {
        category.products.forEach((product, productIndex) => {
            // Build variants HTML
            let variantsHTML = '';
            if (product.variants && product.variants.length > 0) {
                product.variants.forEach((variant, variantIndex) => {
                    variantsHTML += `
                        <div class="variant-item" style="border: 1px solid #ccc; padding: 10px; margin: 8px 0; border-radius: 4px; background: #fff;">
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                                <strong style="color: #1976d2; font-size: 14px;">Varianta: ${variant.name || 'Varianta ' + (variantIndex + 1)}</strong>
                                <button class="admin__btn admin__btn--danger admin__btn--small" onclick="removeVariant(${index}, ${productIndex}, ${variantIndex})">Smazat variantu</button>
                            </div>
                            <div class="admin__form-group" style="margin-bottom: 8px;">
                                <label style="font-size: 13px;">ID varianty:</label>
                                <input type="text" value="${variant.id || ''}" onchange="updateVariant(${index}, ${productIndex}, ${variantIndex}, 'id', this.value)" style="font-size: 13px; padding: 6px;">
                            </div>
                            <div class="admin__form-group" style="margin-bottom: 8px;">
                                <label style="font-size: 13px;">Název varianty:</label>
                                <input type="text" value="${variant.name || ''}" onchange="updateVariant(${index}, ${productIndex}, ${variantIndex}, 'name', this.value)" style="font-size: 13px; padding: 6px;">
                            </div>
                            <div class="admin__form-group" style="margin-bottom: 8px;">
                                <label style="font-size: 13px;">Technický list (URL):</label>
                                <input type="url" value="${variant.technicalSheet || ''}" onchange="updateVariant(${index}, ${productIndex}, ${variantIndex}, 'technicalSheet', this.value)" placeholder="https://..." style="font-size: 13px; padding: 6px;">
                            </div>
                            <div class="admin__form-group" style="margin-bottom: 8px;">
                                <label style="font-size: 13px;">URL e-shopu:</label>
                                <input type="url" value="${variant.eshopUrl || ''}" onchange="updateVariant(${index}, ${productIndex}, ${variantIndex}, 'eshopUrl', this.value)" placeholder="https://..." style="font-size: 13px; padding: 6px;">
                            </div>
                            <div class="admin__form-group">
                                <label style="font-size: 13px;">Vlastnosti (každá na novém řádku):</label>
                                <textarea rows="3" onchange="updateVariantFeatures(${index}, ${productIndex}, ${variantIndex}, this.value)" style="font-size: 13px; padding: 6px;">${(variant.features || []).join('\n')}</textarea>
                            </div>
                        </div>
                    `;
                });
            }

            productsHTML += `
                <div class="product-item" style="border: 1px solid #ddd; padding: 15px; margin: 10px 0; border-radius: 4px; background: #f9f9f9;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                        <strong style="color: var(--color-primary);">${product.name || 'Produkt ' + (productIndex + 1)}</strong>
                        <button class="admin__btn admin__btn--danger admin__btn--small" onclick="removeProduct(${index}, ${productIndex})">Smazat produkt</button>
                    </div>
                    <div class="admin__form-group">
                        <label>ID:</label>
                        <input type="text" value="${product.id || ''}" onchange="updateProduct(${index}, ${productIndex}, 'id', this.value)">
                    </div>
                    <div class="admin__form-group">
                        <label>Název:</label>
                        <input type="text" value="${product.name || ''}" onchange="updateProduct(${index}, ${productIndex}, 'name', this.value)">
                    </div>
                    <div class="admin__form-group">
                        <label>Popis:</label>
                        <textarea rows="2" onchange="updateProduct(${index}, ${productIndex}, 'description', this.value)">${product.description || ''}</textarea>
                    </div>
                    <div class="admin__form-group">
                        <label>Obrázek (cesta):</label>
                        <input type="text" value="${product.image || ''}" onchange="updateProduct(${index}, ${productIndex}, 'image', this.value)">
                    </div>
                    <div class="admin__form-group">
                        <label>Prospekt (cesta k PDF):</label>
                        <input type="text" value="${product.brochure || ''}" onchange="updateProduct(${index}, ${productIndex}, 'brochure', this.value)">
                    </div>

                    ${!product.variants || product.variants.length === 0 ? `
                        <div class="admin__form-group">
                            <label>Technický list (URL):</label>
                            <input type="url" value="${product.technicalSheet || ''}" onchange="updateProduct(${index}, ${productIndex}, 'technicalSheet', this.value)" placeholder="https://...">
                        </div>
                        <div class="admin__form-group">
                            <label>URL e-shopu (nákup):</label>
                            <input type="url" value="${product.eshopUrl || ''}" onchange="updateProduct(${index}, ${productIndex}, 'eshopUrl', this.value)" placeholder="https://...">
                        </div>
                        <div class="admin__form-group">
                            <label>Vlastnosti (každá na novém řádku):</label>
                            <textarea rows="4" onchange="updateProductFeatures(${index}, ${productIndex}, this.value)">${(product.features || []).join('\n')}</textarea>
                        </div>
                    ` : ''}

                    <div style="margin-top: 15px; padding-top: 15px; border-top: 2px solid #ddd;">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                            <strong style="color: #1976d2;">🔧 Varianty produktu (${product.variants ? product.variants.length : 0})</strong>
                            <button class="admin__btn admin__btn--primary admin__btn--small" onclick="addVariant(${index}, ${productIndex})">+ Přidat variantu</button>
                        </div>
                        ${product.variants && product.variants.length > 0 ? variantsHTML : '<p style="color: #999; font-size: 13px; text-align: center; padding: 10px;">Tento produkt nemá varianty. Varianty umožňují různé verze produktu s jinými parametry.</p>'}
                        ${product.variants && product.variants.length > 0 ? '<p style="color: #666; font-size: 12px; margin-top: 10px;"><strong>Poznámka:</strong> Pokud má produkt varianty, technický list a URL e-shopu se zadávají u jednotlivých variant.</p>' : ''}
                    </div>
                </div>
            `;
        });
    }

    div.innerHTML = `
        <div class="category-item__header">
            <h4>${category.name}</h4>
            <button class="admin__btn admin__btn--danger" onclick="removeCategory(${index})">Smazat kategorii</button>
        </div>
        <div class="admin__form-group">
            <label>ID:</label>
            <input type="text" value="${category.id}" onchange="updateCategory(${index}, 'id', this.value)">
        </div>
        <div class="admin__form-group">
            <label>Název:</label>
            <input type="text" value="${category.name}" onchange="updateCategory(${index}, 'name', this.value)">
        </div>
        <div class="admin__form-group">
            <label>Popis:</label>
            <textarea rows="2" onchange="updateCategory(${index}, 'description', this.value)">${category.description}</textarea>
        </div>
        <div class="admin__form-group">
            <label>Obrázek:</label>
            <input type="text" value="${category.image}" onchange="updateCategory(${index}, 'image', this.value)">
        </div>
        <div style="margin-top: 20px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                <strong>Produkty (${category.products ? category.products.length : 0})</strong>
                <button class="admin__btn admin__btn--primary admin__btn--small" onclick="addProduct(${index})">+ Přidat produkt</button>
            </div>
            ${productsHTML || '<p style="color: #999; text-align: center; padding: 20px;">Zatím žádné produkty</p>'}
        </div>
    `;
    return div;
}

// Update category
function updateCategory(index, field, value) {
    if (currentProducts && currentProducts.categories[index]) {
        currentProducts.categories[index][field] = value;
    }
}

// Add new category
function addCategory() {
    if (!currentProducts) {
        currentProducts = { categories: [] };
    }
    if (!currentProducts.categories) {
        currentProducts.categories = [];
    }

    const newCategory = {
        id: 'nova-kategorie',
        name: 'Nová kategorie',
        description: 'Popis kategorie',
        image: 'assets/images/products/nova-kategorie.jpg',
        products: []
    };

    currentProducts.categories.push(newCategory);
    loadCategories();
}

// Remove category
function removeCategory(index) {
    if (confirm('Opravdu chcete smazat tuto kategorii?')) {
        currentProducts.categories.splice(index, 1);
        loadCategories();
    }
}

// Update product
function updateProduct(categoryIndex, productIndex, field, value) {
    if (currentProducts &&
        currentProducts.categories[categoryIndex] &&
        currentProducts.categories[categoryIndex].products[productIndex]) {
        currentProducts.categories[categoryIndex].products[productIndex][field] = value;
    }
}

// Update product features (convert from textarea to array)
function updateProductFeatures(categoryIndex, productIndex, value) {
    if (currentProducts &&
        currentProducts.categories[categoryIndex] &&
        currentProducts.categories[categoryIndex].products[productIndex]) {
        const features = value.split('\n').filter(f => f.trim() !== '');
        currentProducts.categories[categoryIndex].products[productIndex].features = features;
    }
}

// Add new product
function addProduct(categoryIndex) {
    if (!currentProducts || !currentProducts.categories[categoryIndex]) return;

    if (!currentProducts.categories[categoryIndex].products) {
        currentProducts.categories[categoryIndex].products = [];
    }

    const newProduct = {
        id: 'novy-produkt',
        name: 'Nový produkt',
        description: 'Popis produktu',
        image: '',
        brochure: '',
        features: [],
        technicalSheet: '',
        eshopUrl: ''
    };

    currentProducts.categories[categoryIndex].products.push(newProduct);
    loadCategories();
}

// Remove product
function removeProduct(categoryIndex, productIndex) {
    if (confirm('Opravdu chcete smazat tento produkt?')) {
        currentProducts.categories[categoryIndex].products.splice(productIndex, 1);
        loadCategories();
    }
}

// Add new variant
function addVariant(categoryIndex, productIndex) {
    if (!currentProducts || !currentProducts.categories[categoryIndex] ||
        !currentProducts.categories[categoryIndex].products[productIndex]) return;

    const product = currentProducts.categories[categoryIndex].products[productIndex];

    // Initialize variants array if it doesn't exist
    if (!product.variants) {
        product.variants = [];

        // Move existing product data to first variant if needed
        if (product.features || product.technicalSheet || product.eshopUrl) {
            product.variants.push({
                id: 'variant-1',
                name: 'Varianta 1',
                features: product.features || [],
                technicalSheet: product.technicalSheet || '',
                eshopUrl: product.eshopUrl || ''
            });

            // Remove old fields
            delete product.features;
            delete product.technicalSheet;
            delete product.eshopUrl;
        }
    }

    // Add new variant
    const newVariant = {
        id: 'nova-varianta',
        name: 'Nová varianta',
        features: [],
        technicalSheet: '',
        eshopUrl: ''
    };

    product.variants.push(newVariant);
    loadCategories();
}

// Remove variant
function removeVariant(categoryIndex, productIndex, variantIndex) {
    if (confirm('Opravdu chcete smazat tuto variantu?')) {
        const product = currentProducts.categories[categoryIndex].products[productIndex];
        product.variants.splice(variantIndex, 1);

        // If no variants left, remove variants array
        if (product.variants.length === 0) {
            delete product.variants;
        }

        loadCategories();
    }
}

// Update variant
function updateVariant(categoryIndex, productIndex, variantIndex, field, value) {
    if (currentProducts &&
        currentProducts.categories[categoryIndex] &&
        currentProducts.categories[categoryIndex].products[productIndex] &&
        currentProducts.categories[categoryIndex].products[productIndex].variants &&
        currentProducts.categories[categoryIndex].products[productIndex].variants[variantIndex]) {
        currentProducts.categories[categoryIndex].products[productIndex].variants[variantIndex][field] = value;
    }
}

// Update variant features (convert from textarea to array)
function updateVariantFeatures(categoryIndex, productIndex, variantIndex, value) {
    if (currentProducts &&
        currentProducts.categories[categoryIndex] &&
        currentProducts.categories[categoryIndex].products[productIndex] &&
        currentProducts.categories[categoryIndex].products[productIndex].variants &&
        currentProducts.categories[categoryIndex].products[productIndex].variants[variantIndex]) {
        const features = value.split('\n').filter(f => f.trim() !== '');
        currentProducts.categories[categoryIndex].products[productIndex].variants[variantIndex].features = features;
    }
}

// Collect form data and create config object
function collectConfig() {
    return {
        brand: {
            name: getValue('brand-name'),
            fullName: getValue('brand-fullName'),
            country: getValue('brand-country'),
            website: getValue('brand-website'),
            description: getValue('brand-description')
        },
        distributor: {
            name: getValue('distributor-name'),
            role: getValue('distributor-role'),
            country: getValue('distributor-country'),
            phone: getValue('distributor-phone'),
            email: getValue('distributor-email'),
            address: getValue('distributor-address'),
            ico: getValue('distributor-ico'),
            dic: getValue('distributor-dic')
        },
        colors: {
            primary: getValue('color-primary-text'),
            primaryDark: getValue('color-primaryDark-text'),
            secondary: getValue('color-secondary-text'),
            accent: getValue('color-accent-text'),
            text: currentConfig.colors.text,
            textLight: currentConfig.colors.textLight,
            background: currentConfig.colors.background,
            backgroundGray: currentConfig.colors.backgroundGray
        },
        typography: currentConfig.typography,
        logo: {
            main: getValue('logo-main'),
            alt: getValue('logo-alt'),
            favicon: getValue('logo-favicon')
        },
        navigation: currentConfig.navigation,
        social: currentConfig.social,
        seo: {
            title: getValue('seo-title'),
            description: getValue('seo-description'),
            keywords: getValue('seo-keywords')
        },
        carousel: {
            slides: currentConfig.carousel ? currentConfig.carousel.slides : [],
            autoPlayDelay: parseInt(getValue('carousel-autoplay')) || 5000
        }
    };
}

// Get value helper
function getValue(id) {
    const element = document.getElementById(id);
    return element ? element.value : '';
}

// Download config as JSON
function downloadConfig() {
    const config = collectConfig();
    const dataStr = JSON.stringify(config, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });

    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'battipav.json';
    link.click();

    URL.revokeObjectURL(url);
    alert('Konfigurace stažena! Nahraďte soubor config/battipav.json');
}

// Download products as JSON
function downloadProducts() {
    const dataStr = JSON.stringify(currentProducts, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });

    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'products.json';
    link.click();

    URL.revokeObjectURL(url);
    alert('Produkty staženy! Nahraďte soubor products/products.json');
}

// Import config
function importConfig() {
    const fileInput = document.getElementById('import-config');
    const file = fileInput.files[0];

    if (!file) {
        alert('Vyberte soubor k importu');
        return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            currentConfig = JSON.parse(e.target.result);
            populateForm();
            alert('Konfigurace načtena!');
        } catch (error) {
            alert('Chyba při načítání souboru: ' + error.message);
        }
    };
    reader.readAsText(file);
}

// Import products
function importProducts() {
    const fileInput = document.getElementById('import-products');
    const file = fileInput.files[0];

    if (!file) {
        alert('Vyberte soubor k importu');
        return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            currentProducts = JSON.parse(e.target.result);
            loadCategories();
            alert('Produkty načteny!');
        } catch (error) {
            alert('Chyba při načítání souboru: ' + error.message);
        }
    };
    reader.readAsText(file);
}
