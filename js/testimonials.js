/**
 * ========================================
 * TACO TUESDAY - Testimonials Carousel
 * ========================================
 * Interactive carousel with touch support,
 * auto-play, and keyboard navigation
 * ======================================== */

(function() {
  'use strict';

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    const carousel = document.querySelector('.testimonials-carousel');
    if (!carousel) return;

    const track = carousel.querySelector('.testimonials-track');
    const cards = carousel.querySelectorAll('.testimonial-card');
    const prevBtn = carousel.querySelector('.carousel-prev');
    const nextBtn = carousel.querySelector('.carousel-next');

    if (!track || cards.length === 0) return;

    let currentIndex = 0;
    let autoPlayInterval;
    const autoPlayDelay = 5000; // 5 seconds
    let isDragging = false;
    let startX = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;

    // Get visible cards based on screen width
    function getVisibleCards() {
      if (window.innerWidth >= 768) {
        return 2;
      }
      return 1;
    }

    // Get max index
    function getMaxIndex() {
      return Math.max(0, cards.length - getVisibleCards());
    }

    // Update carousel position
    function updateCarousel() {
      const cardWidth = cards[0].offsetWidth;
      const gap = window.innerWidth >= 768 ? 32 : 24;
      const moveAmount = (cardWidth + gap) * currentIndex;
      
      gsap.to(track, {
        x: -moveAmount,
        duration: 0.5,
        ease: 'power3.out'
      });
      
      currentTranslate = -moveAmount;
      prevTranslate = -moveAmount;
    }

    // Go to previous slide
    function prevSlide() {
      if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
        resetAutoPlay();
      }
    }

    // Go to next slide
    function nextSlide() {
      const maxIndex = getMaxIndex();
      if (currentIndex < maxIndex) {
        currentIndex++;
        updateCarousel();
        resetAutoPlay();
      } else {
        // Loop back to start
        currentIndex = 0;
        updateCarousel();
        resetAutoPlay();
      }
    }

    // Reset auto-play timer
    function resetAutoPlay() {
      stopAutoPlay();
      startAutoPlay();
    }

    // Start auto-play
    function startAutoPlay() {
      autoPlayInterval = setInterval(() => {
        if (!isDragging) {
          nextSlide();
        }
      }, autoPlayDelay);
    }

    // Stop auto-play
    function stopAutoPlay() {
      if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
      }
    }

    // Button event listeners
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        prevSlide();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        nextSlide();
      });
    }

    // Keyboard navigation
    carousel.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
      }
    });

    // Touch events for swipe
    track.addEventListener('touchstart', touchStart, { passive: true });
    track.addEventListener('touchend', touchEnd, { passive: true });
    track.addEventListener('touchmove', touchMove, { passive: true });

    function touchStart(event) {
      isDragging = true;
      startX = event.touches[0].clientX;
      stopAutoPlay();
      
      gsap.killTweensOf(track);
    }

    function touchMove(event) {
      if (!isDragging) return;
      
      const currentX = event.touches[0].clientX;
      const diff = currentX - startX;
      const cardWidth = cards[0].offsetWidth;
      const gap = window.innerWidth >= 768 ? 32 : 24;
      
      currentTranslate = prevTranslate + diff;
      
      gsap.set(track, { x: currentTranslate });
    }

    function touchEnd() {
      isDragging = false;
      
      const cardWidth = cards[0].offsetWidth;
      const gap = window.innerWidth >= 768 ? 32 : 24;
      const movedBy = currentTranslate - prevTranslate;
      
      // If moved enough to trigger slide change
      if (movedBy < -100) {
        currentIndex = Math.min(currentIndex + 1, getMaxIndex());
      } else if (movedBy > 100) {
        currentIndex = Math.max(currentIndex - 1, 0);
      }
      
      updateCarousel();
      startAutoPlay();
    }

    // Pause on hover
    track.addEventListener('mouseenter', stopAutoPlay);
    track.addEventListener('mouseleave', startAutoPlay);

    // Handle resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        currentIndex = Math.min(currentIndex, getMaxIndex());
        updateCarousel();
      }, 250);
    });

    // Initialize
    updateCarousel();
    startAutoPlay();

    // Make carousel focusable for keyboard navigation
    carousel.setAttribute('tabindex', '0');
    carousel.setAttribute('role', 'region');
    carousel.setAttribute('aria-label', 'Customer testimonials');
  }
})();
