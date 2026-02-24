/**
 * ========================================
 * TACO TUESDAY - Parallax Effects
 * ========================================
 * Scroll-based parallax for images
 * and background elements
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
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      disableParallax();
      return;
    }

    // Parallax images
    const parallaxImages = document.querySelectorAll('[data-parallax]');

    // Background circles in hero
    const bgCircles = document.querySelectorAll('.hero-bg-circle');

    // Initialize parallax images
    parallaxImages.forEach(element => {
      initElementParallax(element);
    });

    // Initialize background parallax
    bgCircles.forEach((circle, index) => {
      initBackgroundParallax(circle, index);
    });

    // Mouse-based parallax for hero
    initMouseParallax();
  }

  function disableParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax], .hero-bg-circle');
    parallaxElements.forEach(el => {
      el.style.transform = 'none';
      el.style.transition = 'none';
    });
  }

  function initElementParallax(element) {
    const speed = element.dataset.parallax === 'fast' ? 0.15 : 0.08;
    const image = element.querySelector('img');

    if (!image) return;

    // Add will-change for performance
    image.style.willChange = 'transform';

    // Use GSAP if available
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);

      // Create a more noticeable parallax effect
      gsap.to(image, {
        scrollTrigger: {
          trigger: element,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
          markers: false
        },
        y: 80 * speed * 10,
        ease: 'none',
        overwrite: 'auto'
      });
    } else {
      // Fallback vanilla JS parallax
      let ticking = false;

      function updateParallax() {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            const rect = element.getBoundingClientRect();
            const elementVisible = rect.top < window.innerHeight && rect.bottom > 0;

            if (elementVisible) {
              const scrollProgress = 1 - (rect.top / (window.innerHeight + rect.height));
              const yPos = scrollProgress * 100 * speed;
              image.style.transform = `translateY(${yPos}px) scale(1.05)`;
            }

            ticking = false;
          });
          ticking = true;
        }
      }

      window.addEventListener('scroll', updateParallax, { passive: true });
      updateParallax(); // Initial call
    }
  }

  function initBackgroundParallax(circle, index) {
    const speeds = [0.03, 0.05, 0.02];
    const speed = speeds[index] || 0.03;
    const directions = [1, -1, 1];
    const direction = directions[index] || 1;

    circle.style.willChange = 'transform';

    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);

      gsap.to(circle, {
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true
        },
        y: 150 * speed * direction,
        x: 50 * speed * direction * (index % 2 === 0 ? 1 : -1),
        ease: 'none'
      });
    }
  }

  function initMouseParallax() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    const heroContent = hero.querySelector('.hero-content');
    const heroVisual = hero.querySelector('.hero-visual');

    if (!heroContent || !heroVisual) return;

    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;

    // Mouse move handler
    document.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();

      // Only apply when mouse is over hero section
      if (e.clientY < rect.top || e.clientY > rect.bottom) return;

      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    // Animation loop for smooth interpolation
    function animateMouseParallax() {
      // Smooth interpolation
      currentX += (mouseX - currentX) * 0.05;
      currentY += (mouseY - currentY) * 0.05;

      if (typeof gsap !== 'undefined') {
        gsap.to(heroContent, {
          x: currentX * -20,
          y: currentY * -10,
          duration: 0.1,
          ease: 'power2.out',
          overwrite: 'auto'
        });

        gsap.to(heroVisual, {
          x: currentX * 30,
          y: currentY * 15,
          duration: 0.1,
          ease: 'power2.out',
          overwrite: 'auto'
        });
      } else {
        heroContent.style.transform = `translate(${currentX * -20}px, ${currentY * -10}px)`;
        heroVisual.style.transform = `translate(${currentX * 30}px, ${currentY * 15}px)`;
      }

      requestAnimationFrame(animateMouseParallax);
    }

    animateMouseParallax();

    // Reset on mouse leave
    hero.addEventListener('mouseleave', () => {
      mouseX = 0;
      mouseY = 0;
    });
  }

  // Smooth scroll-based parallax for any element with data-scroll-speed
  function initScrollSpeedParallax() {
    const scrollElements = document.querySelectorAll('[data-scroll-speed]');

    scrollElements.forEach(element => {
      const speed = parseFloat(element.dataset.scrollSpeed);

      element.style.willChange = 'transform';

      let ticking = false;

      function updateParallax() {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            const rect = element.getBoundingClientRect();
            const visible = rect.top < window.innerHeight && rect.bottom > 0;

            if (visible) {
              const yPos = -window.scrollY * speed;
              element.style.transform = `translateY(${yPos}px)`;
            }

            ticking = false;
          });
          ticking = true;
        }
      }

      window.addEventListener('scroll', updateParallax, { passive: true });
    });
  }

  // Initialize scroll speed parallax
  initScrollSpeedParallax();
})();
