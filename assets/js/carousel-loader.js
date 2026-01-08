// Carousel Loader - Načítání slidů z konfigurace

document.addEventListener('brandConfigLoaded', (e) => {
    const config = e.detail;
    loadCarouselFromConfig(config);
});

function loadCarouselFromConfig(config) {
    if (!config.config.carousel || !config.config.carousel.slides) return;

    const carousel = document.querySelector('.carousel');
    if (!carousel) return;

    const slides = config.config.carousel.slides;
    const autoPlayDelay = config.config.carousel.autoPlayDelay || 5000;

    // Vyčistit existující slides
    const existingSlides = carousel.querySelectorAll('.carousel__slide');
    existingSlides.forEach(slide => slide.remove());

    // Vyčistit existující dots
    const dotsContainer = carousel.querySelector('.carousel__dots');
    if (dotsContainer) {
        dotsContainer.innerHTML = '';
    }

    // Vytvořit nové slides
    slides.forEach((slideData, index) => {
        const slideEl = createSlideElement(slideData, index);

        // Vložit před navigation arrows
        const firstArrow = carousel.querySelector('.carousel__arrow');
        if (firstArrow) {
            carousel.insertBefore(slideEl, firstArrow);
        } else {
            carousel.appendChild(slideEl);
        }

        // Přidat dot
        if (dotsContainer) {
            const dot = document.createElement('button');
            dot.className = index === 0 ? 'carousel__dot carousel__dot--active' : 'carousel__dot';
            dot.dataset.slide = index;
            dot.setAttribute('aria-label', `Slide ${index + 1}`);
            dotsContainer.appendChild(dot);
        }
    });

    // Aktualizovat CSS pro background každého slidu
    updateCarouselStyles(slides);

    // Počkat na DOM update a pak reinicializovat carousel
    // Použít requestAnimationFrame pro zajištění, že DOM je ready
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            document.dispatchEvent(new CustomEvent('carouselReload', {
                detail: { autoPlayDelay }
            }));
        });
    });
}

function createSlideElement(slideData, index) {
    const slide = document.createElement('div');
    slide.className = index === 0 ? 'carousel__slide carousel__slide--active' : 'carousel__slide';
    slide.classList.add(`carousel__slide--${index + 1}`);

    // Vytvořit obsah pouze pokud existuje
    const badgeHTML = slideData.badge ? `<div class="carousel__badge">${slideData.badge}</div>` : '';
    const titleHTML = slideData.title ? `<h1 class="carousel__title">${slideData.title}</h1>` : '';
    const subtitleHTML = slideData.subtitle ? `<p class="carousel__subtitle">${slideData.subtitle}</p>` : '';
    const ctaHTML = slideData.ctaText ? `<a href="${slideData.ctaLink}" class="carousel__cta">${slideData.ctaText}</a>` : '';

    slide.innerHTML = `
        <div class="carousel__content">
            <div class="container">
                ${badgeHTML}
                ${titleHTML}
                ${subtitleHTML}
                ${ctaHTML}
            </div>
        </div>
    `;

    return slide;
}

function updateCarouselStyles(slides) {
    // Vytvořit dynamické CSS styly pro každý slide
    let styleEl = document.getElementById('carousel-dynamic-styles');
    if (!styleEl) {
        styleEl = document.createElement('style');
        styleEl.id = 'carousel-dynamic-styles';
        document.head.appendChild(styleEl);
    }

    let css = '';
    slides.forEach((slide, index) => {
        // Pokud jsou gradienty prázdné, použít jen obrázek
        const hasGradient = slide.gradientStart && slide.gradientEnd;

        if (hasGradient) {
            css += `
.carousel__slide--${index + 1} {
    background:
        linear-gradient(135deg, ${slide.gradientStart} 0%, ${slide.gradientEnd} 100%),
        url('${slide.background}') center center / cover no-repeat;
}
            `;
        } else {
            css += `
.carousel__slide--${index + 1} {
    background: url('${slide.background}') center center / cover no-repeat;
}
            `;
        }
    });

    styleEl.textContent = css;
}
