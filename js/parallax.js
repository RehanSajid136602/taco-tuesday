/**
 * ========================================
 * TACO TUESDAY - Parallax Effects
 * ========================================
 * Simple, reliable scroll-based parallax
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
      // Fallback - no parallax, just show image
      image.style.transform = 'scale(1.05)';
    }
  }
})();
