/**
 * ========================================
 * TACO TUESDAY - Main Animations
 * ========================================
 * GSAP ScrollTrigger animations for
 * scroll-based reveal effects
 * ======================================== */

(function() {
  'use strict';

  // Wait for DOM and GSAP to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    // Check if GSAP is loaded
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
      console.warn('GSAP or ScrollTrigger not loaded. Using fallback animations.');
      initFallback();
      return;
    }

    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Hero section animations
    initHeroAnimations();

    // Menu section animations
    initMenuAnimations();

    // About section animations
    initAboutAnimations();

    // Testimonials section animations
    initTestimonialsAnimations();

    // Location section animations
    initLocationAnimations();

    // Footer animations
    initFooterAnimations();

    // Parallax effects
    initParallaxEffects();
  }

  function initHeroAnimations() {
    const heroTitle = document.querySelector('.hero-title');
    const heroDescription = document.querySelector('.hero-description');
    const heroCta = document.querySelector('.hero-cta');

    if (heroTitle) {
      gsap.from(heroTitle, {
        scrollTrigger: {
          trigger: heroTitle,
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      });
    }

    if (heroDescription) {
      gsap.from(heroDescription, {
        scrollTrigger: {
          trigger: heroDescription,
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.2
      });
    }

    if (heroCta) {
      gsap.from(heroCta, {
        scrollTrigger: {
          trigger: heroCta,
          start: 'top 90%',
          toggleActions: 'play none none none'
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.4
      });
    }
  }

  function initMenuAnimations() {
    const menuCards = document.querySelectorAll('.menu-grid .card');

    menuCards.forEach((card, index) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: index * 0.1
      });
    });

    // Section header animation
    const menuHeader = document.querySelector('#menu .section-header');
    if (menuHeader) {
      gsap.from(menuHeader.querySelectorAll('*'), {
        scrollTrigger: {
          trigger: menuHeader,
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.1
      });
    }
  }

  function initAboutAnimations() {
    const aboutImages = document.querySelectorAll('.about-image-wrapper');
    const aboutContent = document.querySelector('.about-content');

    // Image animations
    aboutImages.forEach((wrapper, index) => {
      gsap.from(wrapper, {
        scrollTrigger: {
          trigger: wrapper,
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        scale: 0.9,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: index * 0.2
      });
    });

    // Content animations
    if (aboutContent) {
      gsap.from(aboutContent.querySelectorAll('h2, p, .about-feature'), {
        scrollTrigger: {
          trigger: aboutContent,
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        x: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.1
      });
    }
  }

  function initTestimonialsAnimations() {
    const testimonialsHeader = document.querySelector('#testimonials .section-header');

    if (testimonialsHeader) {
      gsap.from(testimonialsHeader.querySelectorAll('*'), {
        scrollTrigger: {
          trigger: testimonialsHeader,
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.1
      });
    }

    const testimonialCards = document.querySelectorAll('.testimonial-card');

    testimonialCards.forEach((card, index) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: index * 0.15
      });
    });
  }

  function initLocationAnimations() {
    const mapWrapper = document.querySelector('.map-wrapper');
    const locationInfo = document.querySelector('.location-info');

    if (mapWrapper) {
      gsap.from(mapWrapper, {
        scrollTrigger: {
          trigger: mapWrapper,
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        scale: 0.95,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      });
    }

    if (locationInfo) {
      gsap.from(locationInfo.querySelectorAll('.info-block, h2, .btn'), {
        scrollTrigger: {
          trigger: locationInfo,
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        x: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.1
      });
    }
  }

  function initFooterAnimations() {
    const footer = document.querySelector('.footer');

    if (footer) {
      gsap.from(footer.querySelectorAll('.footer-content > div'), {
        scrollTrigger: {
          trigger: footer,
          start: 'top 90%',
          toggleActions: 'play none none none'
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.1
      });
    }
  }

  function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');

    parallaxElements.forEach(element => {
      const speed = element.dataset.parallax === 'fast' ? 0.15 : 0.05;

      gsap.to(element, {
        scrollTrigger: {
          trigger: element,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        },
        y: (i, target) => ScrollTrigger.maxScroll(window) * speed * (target.dataset.parallax === 'fast' ? 1 : 0.5),
        ease: 'none'
      });
    });
  }

  // Fallback animations for when GSAP is not available
  function initFallback() {
    const animatedElements = document.querySelectorAll('[data-aos], .fade-in-up, .scale-in, .slide-in-left, .slide-in-right');

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0) scale(1)';
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    animatedElements.forEach(element => {
      element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
      element.style.opacity = '0';
      
      if (element.classList.contains('fade-in-up')) {
        element.style.transform = 'translateY(30px)';
      } else if (element.classList.contains('scale-in')) {
        element.style.transform = 'scale(0.9)';
      } else if (element.classList.contains('slide-in-left')) {
        element.style.transform = 'translateX(-50px)';
      } else if (element.classList.contains('slide-in-right')) {
        element.style.transform = 'translateX(50px)';
      }
      
      observer.observe(element);
    });
  }
})();
