/**
 * ========================================
 * TACO TUESDAY - 3D Coffee Cup
 * ========================================
 * Three.js interactive 3D coffee cup
 * with mouse-follow rotation and animations
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
    const canvas = document.getElementById('coffee-cup-canvas');
    if (!canvas) return;

    // Scene setup
    const scene = new THREE.Scene();
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      50,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: true
    });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Create coffee cup group
    const cupGroup = new THREE.Group();

    // Cup body (cylinder)
    const cupGeometry = new THREE.CylinderGeometry(1, 0.85, 1.8, 32);
    const cupMaterial = new THREE.MeshStandardMaterial({
      color: 0xD4A574,
      metalness: 0.1,
      roughness: 0.4,
    });
    const cupBody = new THREE.Mesh(cupGeometry, cupMaterial);
    cupBody.castShadow = true;
    cupBody.receiveShadow = true;
    cupGroup.add(cupBody);

    // Cup interior (slightly smaller cylinder)
    const interiorGeometry = new THREE.CylinderGeometry(0.82, 0.7, 1.6, 32);
    const interiorMaterial = new THREE.MeshStandardMaterial({
      color: 0x1A1512,
      metalness: 0.2,
      roughness: 0.3,
    });
    const cupInterior = new THREE.Mesh(interiorGeometry, interiorMaterial);
    cupInterior.position.y = 0.1;
    cupGroup.add(cupInterior);

    // Coffee liquid (dark cylinder inside) - FILLED TO TOP
    const liquidGeometry = new THREE.CylinderGeometry(0.78, 0.66, 0.5, 32);
    const liquidMaterial = new THREE.MeshStandardMaterial({
      color: 0x3D2A1F,
      metalness: 0.4,
      roughness: 0.1,
      emissive: 0x2D1F1A,
      emissiveIntensity: 0.3
    });
    const coffeeLiquid = new THREE.Mesh(liquidGeometry, liquidMaterial);
    coffeeLiquid.position.y = 0.6;
    coffeeLiquid.name = 'coffeeLiquid';
    cupGroup.add(coffeeLiquid);

    // Cup saucer (flat cylinder)
    const saucerGeometry = new THREE.CylinderGeometry(1.8, 1.8, 0.1, 32);
    const saucerMaterial = new THREE.MeshStandardMaterial({
      color: 0xD4A574,
      metalness: 0.1,
      roughness: 0.4,
    });
    const saucer = new THREE.Mesh(saucerGeometry, saucerMaterial);
    saucer.position.y = -1;
    saucer.castShadow = true;
    saucer.receiveShadow = true;
    cupGroup.add(saucer);

    // Cup handle (torus segment)
    const handleGeometry = new THREE.TorusGeometry(0.5, 0.12, 16, 32, Math.PI * 1.3);
    const handleMaterial = new THREE.MeshStandardMaterial({
      color: 0xD4A574,
      metalness: 0.1,
      roughness: 0.4,
    });
    const handle = new THREE.Mesh(handleGeometry, handleMaterial);
    handle.position.set(0.9, 0, 0);
    handle.rotation.z = -Math.PI / 2;
    handle.castShadow = true;
    cupGroup.add(handle);

    // Steam particles (small spheres)
    const steamParticles = [];
    const steamGeometry = new THREE.SphereGeometry(0.05, 8, 8);
    const steamMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.4,
    });

    for (let i = 0; i < 15; i++) {
      const particle = new THREE.Mesh(steamGeometry, steamMaterial.clone());
      particle.position.set(
        (Math.random() - 0.5) * 0.8,
        1 + Math.random() * 0.5,
        (Math.random() - 0.5) * 0.8
      );
      particle.userData = {
        speed: 0.01 + Math.random() * 0.02,
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: 0.02 + Math.random() * 0.03,
        initialY: particle.position.y
      };
      cupGroup.add(particle);
      steamParticles.push(particle);
    }

    // Add cup to scene
    scene.add(cupGroup);

    // Lighting
    // Ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    // Main directional light (key light)
    const mainLight = new THREE.DirectionalLight(0xE8B86D, 1);
    mainLight.position.set(3, 5, 3);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = 1024;
    mainLight.shadow.mapSize.height = 1024;
    scene.add(mainLight);

    // Fill light (warmer)
    const fillLight = new THREE.DirectionalLight(0xD4A574, 0.5);
    fillLight.position.set(-2, 2, 2);
    scene.add(fillLight);

    // Rim light (cool)
    const rimLight = new THREE.DirectionalLight(0xC65D3B, 0.3);
    rimLight.position.set(0, -2, -3);
    scene.add(rimLight);

    // Point light for glow effect
    const pointLight = new THREE.PointLight(0xE8B86D, 0.5, 10);
    pointLight.position.set(0, 1, 0);
    scene.add(pointLight);

    // Mouse tracking for rotation
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;

    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    document.addEventListener('mousemove', (event) => {
      mouseX = (event.clientX - windowHalfX) / 100;
      mouseY = (event.clientY - windowHalfY) / 100;
    });

    // Touch support
    document.addEventListener('touchmove', (event) => {
      if (event.touches.length > 0) {
        const touch = event.touches[0];
        mouseX = (touch.clientX - windowHalfX) / 100;
        mouseY = (touch.clientY - windowHalfY) / 100;
      }
    }, { passive: true });

    // Animation loop
    let time = 0;
    
    function animate() {
      requestAnimationFrame(animate);
      time += 0.01;

      // Smooth rotation based on mouse
      targetRotationX = mouseY * 0.3;
      targetRotationY = mouseX * 0.3;

      cupGroup.rotation.x += (targetRotationX - cupGroup.rotation.x) * 0.05;
      cupGroup.rotation.y += (targetRotationY - cupGroup.rotation.y) * 0.05;

      // Gentle floating animation
      cupGroup.position.y = Math.sin(time) * 0.1;

      // Coffee liquid wave animation
      const coffeeLiquid = cupGroup.getObjectByName('coffeeLiquid');
      if (coffeeLiquid) {
        coffeeLiquid.scale.x = 1 + Math.sin(time * 2) * 0.02;
        coffeeLiquid.scale.z = 1 + Math.cos(time * 2) * 0.02;
        coffeeLiquid.position.y = 0.6 + Math.sin(time * 1.5) * 0.02;
      }

      // Animate steam particles
      steamParticles.forEach((particle, index) => {
        particle.position.y += particle.userData.speed;
        particle.position.x = Math.sin(time * particle.userData.wobbleSpeed + particle.userData.wobble) * 0.3;
        particle.position.z = Math.cos(time * particle.userData.wobbleSpeed + particle.userData.wobble) * 0.3;

        // Fade out as they rise
        particle.material.opacity = Math.max(0, 0.4 - (particle.position.y - particle.userData.initialY) * 0.5);

        // Reset particle when it goes too high
        if (particle.position.y > 2) {
          particle.position.y = particle.userData.initialY;
          particle.material.opacity = 0.4;
        }
      });

      // Subtle rotation when not interacting
      if (Math.abs(mouseX) < 0.1 && Math.abs(mouseY) < 0.1) {
        cupGroup.rotation.y += 0.002;
      }

      renderer.render(scene, camera);
    }

    animate();

    // Handle window resize
    window.addEventListener('resize', () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
    });

    // GSAP entrance animation (if GSAP is loaded)
    if (typeof gsap !== 'undefined') {
      cupGroup.scale.set(0, 0, 0);
      
      gsap.to(cupGroup.scale, {
        x: 1,
        y: 1,
        z: 1,
        duration: 1.5,
        ease: 'elastic.out(1, 0.5)',
        delay: 0.5
      });

      gsap.from(cupGroup.position, {
        y: 1,
        duration: 1.5,
        ease: 'power3.out',
        delay: 0.5
      });

      gsap.from(cupGroup.rotation, {
        y: Math.PI * 0.3,
        duration: 1.5,
        ease: 'power3.out',
        delay: 0.5
      });
    }
  }
})();
