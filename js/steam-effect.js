/**
 * ========================================
 * TACO TUESDAY - Steam Particle Effect
 * ========================================
 * CSS-based steam animation enhancement
 * with JavaScript controls
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
    const steamContainer = document.querySelector('.steam-container');
    if (!steamContainer) return;

    const particles = steamContainer.querySelectorAll('.steam-particle');

    // Add random variations to each particle
    particles.forEach((particle, index) => {
      // Random delay
      const delay = Math.random() * 2;
      particle.style.animationDelay = `${delay}s`;

      // Random duration
      const duration = 2.5 + Math.random() * 1.5;
      particle.style.animationDuration = `${duration}s`;

      // Random horizontal position
      const leftPos = 20 + Math.random() * 60;
      particle.style.left = `${leftPos}%`;

      // Random size variation
      const scale = 0.8 + Math.random() * 0.4;
      particle.style.transform = `scale(${scale})`;
    });

    // Pause animation on hover for performance
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
      heroSection.addEventListener('mouseenter', () => {
        particles.forEach(particle => {
          particle.style.animationPlayState = 'paused';
        });
      });

      heroSection.addEventListener('mouseleave', () => {
        particles.forEach(particle => {
          particle.style.animationPlayState = 'running';
        });
      });
    }

    // Reduce motion for users who prefer it
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    function handleReducedMotion(e) {
      if (e.matches) {
        particles.forEach(particle => {
          particle.style.animation = 'none';
          particle.style.opacity = '0';
        });
      }
    }

    handleReducedMotion(mediaQuery);
    mediaQuery.addEventListener('change', handleReducedMotion);
  }
})();
