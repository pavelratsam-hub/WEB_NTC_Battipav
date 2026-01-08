// ========== CAROUSEL FUNCTIONS ==========

// Load and display carousel slides
function loadCarouselSlides() {
    if (!currentConfig || !currentConfig.carousel) return;

    const slidesList = document.getElementById('slides-list');
    const carouselAutoplay = document.getElementById('carousel-autoplay');

    if (!slidesList) return;

    // Set autoplay delay
    if (carouselAutoplay && currentConfig.carousel.autoPlayDelay) {
        carouselAutoplay.value = currentConfig.carousel.autoPlayDelay;
    }

    slidesList.innerHTML = '';

    currentConfig.carousel.slides.forEach((slide, index) => {
        const slideDiv = createSlideElement(slide, index);
        slidesList.appendChild(slideDiv);
    });
}

// Create slide element
function createSlideElement(slide, index) {
    const div = document.createElement('div');
    div.className = 'category-item';
    div.innerHTML = `
        <div class="category-item__header">
            <h4>Slide ${index + 1}: ${slide.title.replace(/<br>/g, ' ')}</h4>
            <div>
                <button class="admin__btn admin__btn--secondary" onclick="moveSlideUp(${index})" ${index === 0 ? 'disabled' : ''}>↑</button>
                <button class="admin__btn admin__btn--secondary" onclick="moveSlideDown(${index})" ${index === currentConfig.carousel.slides.length - 1 ? 'disabled' : ''}>↓</button>
                <button class="admin__btn admin__btn--danger" onclick="removeSlide(${index})">Smazat</button>
            </div>
        </div>
        <div class="admin__form-group">
            <label>Badge (štítek):</label>
            <input type="text" value="${slide.badge}" onchange="updateSlide(${index}, 'badge', this.value)">
        </div>
        <div class="admin__form-group">
            <label>Nadpis (můžete použít &lt;br&gt; pro nový řádek):</label>
            <input type="text" value="${slide.title}" onchange="updateSlide(${index}, 'title', this.value)">
        </div>
        <div class="admin__form-group">
            <label>Podnadpis (můžete použít &lt;br&gt; pro nový řádek):</label>
            <textarea rows="2" onchange="updateSlide(${index}, 'subtitle', this.value)">${slide.subtitle}</textarea>
        </div>
        <div class="admin__form-group">
            <label>Text tlačítka:</label>
            <input type="text" value="${slide.ctaText}" onchange="updateSlide(${index}, 'ctaText', this.value)">
        </div>
        <div class="admin__form-group">
            <label>Odkaz tlačítka:</label>
            <input type="text" value="${slide.ctaLink}" onchange="updateSlide(${index}, 'ctaLink', this.value)">
        </div>
        <div class="admin__form-group">
            <label>Pozadí (cesta k obrázku):</label>
            <input type="text" value="${slide.background}" onchange="updateSlide(${index}, 'background', this.value)">
        </div>
        <div class="admin__form-group">
            <label>Gradient - začátek (rgba) - volitelné:</label>
            <input type="text" value="${slide.gradientStart || ''}" onchange="updateSlide(${index}, 'gradientStart', this.value)">
            <small style="color: var(--color-text-light);">Např: rgba(234, 91, 12, 0.85) nebo ponechte prázdné pro žádný gradient</small>
        </div>
        <div class="admin__form-group">
            <label>Gradient - konec (rgba) - volitelné:</label>
            <input type="text" value="${slide.gradientEnd || ''}" onchange="updateSlide(${index}, 'gradientEnd', this.value)">
            <small style="color: var(--color-text-light);">Např: rgba(76, 86, 92, 0.75) nebo ponechte prázdné pro žádný gradient</small>
        </div>
    `;
    return div;
}

// Update slide
function updateSlide(index, field, value) {
    if (currentConfig && currentConfig.carousel && currentConfig.carousel.slides[index]) {
        currentConfig.carousel.slides[index][field] = value;
    }
}

// Add new slide
function addSlide() {
    if (!currentConfig.carousel) {
        currentConfig.carousel = { slides: [], autoPlayDelay: 5000 };
    }
    if (!currentConfig.carousel.slides) {
        currentConfig.carousel.slides = [];
    }

    const newSlide = {
        id: `slide-${Date.now()}`,
        badge: "🎯 Nový slide",
        title: "Nadpis slidu",
        subtitle: "Podnadpis slidu",
        ctaText: "Klikněte zde",
        ctaLink: "products.html",
        background: "assets/images/battipav/slide1-bg.jpg",
        gradientStart: "rgba(234, 91, 12, 0.85)",
        gradientEnd: "rgba(76, 86, 92, 0.75)"
    };

    currentConfig.carousel.slides.push(newSlide);
    loadCarouselSlides();
}

// Remove slide
function removeSlide(index) {
    if (confirm('Opravdu chcete smazat tento slide?')) {
        currentConfig.carousel.slides.splice(index, 1);
        loadCarouselSlides();
    }
}

// Move slide up
function moveSlideUp(index) {
    if (index > 0) {
        const temp = currentConfig.carousel.slides[index];
        currentConfig.carousel.slides[index] = currentConfig.carousel.slides[index - 1];
        currentConfig.carousel.slides[index - 1] = temp;
        loadCarouselSlides();
    }
}

// Move slide down
function moveSlideDown(index) {
    if (index < currentConfig.carousel.slides.length - 1) {
        const temp = currentConfig.carousel.slides[index];
        currentConfig.carousel.slides[index] = currentConfig.carousel.slides[index + 1];
        currentConfig.carousel.slides[index + 1] = temp;
        loadCarouselSlides();
    }
}
