/**
 * ========================================
 * TACO TUESDAY - Parallax Effects
 * ========================================
 * Optimized scroll-based parallax with
 * debouncing and reduced motion support
 * ======================================== */

(function() {
  'use strict';

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const parallaxWrappers = document.querySelectorAll('.about-image-wrapper[data-parallax]');
    
    parallaxWrappers.forEach(wrapper => {
      initParallax(wrapper);
    });
  }

  // Debounce helper for performance
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  function initParallax(wrapper) {
    const speed = wrapper.dataset.parallax === 'fast' ? 0.15 : 0.08;
    const image = wrapper.querySelector('img');
    
    if (!image) return;

    // Use GSAP with proper configuration
    if (typeof gsap !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
      
      // Set initial state
      gsap.set(image, { 
        willChange: 'transform',
        scale: 1.1 
      });

      // Create parallax animation
      gsap.to(image, {
        scrollTrigger: {
          trigger: wrapper,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
          invalidateOnRefresh: true
        },
        y: 100 * speed,
        ease: 'none'
      });
    } else {
      // Fallback - debounced scroll handler
      const handleScroll = debounce(() => {
        const rect = wrapper.getBoundingClientRect();
        const scrollProgress = Math.max(0, Math.min(1, 1 - (rect.top / window.innerHeight)));
        const yPos = scrollProgress * 100 * speed;
        image.style.transform = `translateY(${yPos}px) scale(1.05)`;
      }, 10);

      window.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll(); // Initial call
    }
  }
})();
