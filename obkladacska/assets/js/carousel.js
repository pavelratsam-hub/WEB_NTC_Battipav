// Carousel functionality - Zjednodušeno

class Carousel {
    constructor() {
        this.currentSlide = 0;
        this.slides = document.querySelectorAll('.carousel__slide');
        this.dots = document.querySelectorAll('.carousel__dot');
        this.prevButton = document.querySelector('.carousel__arrow--prev');
        this.nextButton = document.querySelector('.carousel__arrow--next');
        this.autoPlayInterval = null;
        this.autoPlayDelay = 5000; // 5 sekund

        // Bind methods to preserve 'this' context
        this.handlePrevClick = this.prevSlide.bind(this);
        this.handleNextClick = this.nextSlide.bind(this);
        this.handleMouseEnter = this.stopAutoPlay.bind(this);
        this.handleMouseLeave = this.startAutoPlay.bind(this);

        this.init();
    }

    init() {
        // Odstranit staré event listenery
        this.cleanup();

        // Refresh element references
        this.slides = document.querySelectorAll('.carousel__slide');
        this.dots = document.querySelectorAll('.carousel__dot');
        this.prevButton = document.querySelector('.carousel__arrow--prev');
        this.nextButton = document.querySelector('.carousel__arrow--next');

        if (!this.slides.length) return;

        // Event listeners pro šipky
        if (this.prevButton) {
            this.prevButton.addEventListener('click', this.handlePrevClick);
        }

        if (this.nextButton) {
            this.nextButton.addEventListener('click', this.handleNextClick);
        }

        // Event listeners pro tečky
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSlide(index));
        });

        // Keyboard navigation (add only once)
        if (!this.keyboardListenerAdded) {
            this.handleKeyboard = (e) => {
                if (e.key === 'ArrowLeft') this.prevSlide();
                if (e.key === 'ArrowRight') this.nextSlide();
            };
            document.addEventListener('keydown', this.handleKeyboard);
            this.keyboardListenerAdded = true;
        }

        // Touch/swipe support
        this.setupTouchEvents();

        // Start autoplay
        this.startAutoPlay();

        // Pause autoplay on hover
        const carousel = document.querySelector('.carousel');
        if (carousel) {
            this.carousel = carousel;
            carousel.addEventListener('mouseenter', this.handleMouseEnter);
            carousel.addEventListener('mouseleave', this.handleMouseLeave);
        }
    }

    cleanup() {
        // Odstranit event listenery z tlačítek
        if (this.prevButton) {
            this.prevButton.removeEventListener('click', this.handlePrevClick);
        }
        if (this.nextButton) {
            this.nextButton.removeEventListener('click', this.handleNextClick);
        }

        // Odstranit hover listenery z carouselu
        if (this.carousel) {
            this.carousel.removeEventListener('mouseenter', this.handleMouseEnter);
            this.carousel.removeEventListener('mouseleave', this.handleMouseLeave);
        }

        // Zastavit autoplay
        this.stopAutoPlay();
    }

    goToSlide(index) {
        if (index === this.currentSlide) return;

        // Odstranit active ze všech slidů
        this.slides.forEach(slide => {
            slide.classList.remove('carousel__slide--active');
        });

        // Přidat active k novému slidu
        this.slides[index].classList.add('carousel__slide--active');

        // Update dots
        this.dots.forEach((dot, i) => {
            dot.classList.toggle('carousel__dot--active', i === index);
        });

        this.currentSlide = index;
    }

    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.slides.length;
        this.goToSlide(nextIndex);
        this.resetAutoPlay();
    }

    prevSlide() {
        const prevIndex = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.goToSlide(prevIndex);
        this.resetAutoPlay();
    }

    startAutoPlay() {
        this.stopAutoPlay();
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, this.autoPlayDelay);
    }

    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }

    resetAutoPlay() {
        this.stopAutoPlay();
        this.startAutoPlay();
    }

    setupTouchEvents() {
        const carousel = document.querySelector('.carousel');
        if (!carousel) return;

        let touchStartX = 0;
        let touchEndX = 0;

        carousel.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        carousel.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe();
        }, { passive: true });

        this.handleSwipe = () => {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;

            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    // Swipe left - next slide
                    this.nextSlide();
                } else {
                    // Swipe right - prev slide
                    this.prevSlide();
                }
            }
        };
    }
}

// Initialize carousel when DOM is ready
let carouselInstance = null;

document.addEventListener('DOMContentLoaded', () => {
    carouselInstance = new Carousel();
});

// Listen for carousel reload event
document.addEventListener('carouselReload', (e) => {
    if (carouselInstance) {
        carouselInstance.cleanup();
    }

    // Reinitialize carousel
    carouselInstance = new Carousel();
    if (e.detail && e.detail.autoPlayDelay) {
        carouselInstance.autoPlayDelay = e.detail.autoPlayDelay;
        carouselInstance.stopAutoPlay();
        carouselInstance.startAutoPlay();
    }
});
