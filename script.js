// Wait for the DOM to be fully loaded before executing
document.addEventListener('DOMContentLoaded', function() {
    // ======== Navigation Functionality ========
    initializeNavigation();
    
    // ======== Animations and Scroll Effects ========
    initializeScrollEffects();
    
    // ======== Particles Background ========
    initializeParticles();
    
    // ======== Form Validation ========
    initializeFormValidation();
    
    // ======== Image Gallery ========
    initializeImageGallery();
    
    // ======== Theme Toggle ========
    initializeThemeToggle();
  });
  
  // ======== Navigation Functionality ========
  function initializeNavigation() {
    const nav = document.querySelector('nav');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');
    
    // Handle navigation background change on scroll
    window.addEventListener('scroll', function () {
      if (window.scrollY > 50) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    });
    
    // Mobile menu toggle
    if (menuToggle) {
      menuToggle.addEventListener('click', function() {
        document.body.classList.toggle('menu-open');
        navLinks.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
      });
    }
    
    // Close mobile menu when clicking on a link
    navLinksItems.forEach(item => {
      item.addEventListener('click', function() {
        if (navLinks.classList.contains('active')) {
          document.body.classList.remove('menu-open');
          navLinks.classList.remove('active');
          document.body.classList.remove('no-scroll');
        }
      });
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (!targetElement) return;
        
        const navHeight = nav.offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      });
    });
  }
  
  // ======== Animations and Scroll Effects ========
  function initializeScrollEffects() {
    // Fade-in animation for elements when scrolled into view
    const fadeElements = document.querySelectorAll('.fade-in');
    
    // Create Intersection Observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        // Add 'visible' class when element is in view
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Unobserve after animation is triggered
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });
    
    // Apply observer to all fade elements
    if (fadeElements.length > 0) {
      fadeElements.forEach(element => {
        observer.observe(element);
      });
    }
    
    // Add fade-in class to various elements
    const animateElements = [
      '.section-header',
      '.course-card',
      '.service-card',
      '.resource-card',
      '.about-content',
      '.stat-item',
      '.map-container',
      '.contact-form',
      '.contact-info',
      '.cyber-image-card'
    ];
    
    animateElements.forEach(selector => {
      document.querySelectorAll(selector).forEach((element, index) => {
        if (!element.classList.contains('fade-in')) {
          element.classList.add('fade-in');
          // Add a small delay based on index to create a cascade effect
          element.style.transitionDelay = `${index * 0.1}s`;
          observer.observe(element);
        }
      });
    });
  }
  
  // ======== Particles Background ========
  function initializeParticles() {
    const headerParticles = document.querySelector('.header-particles');
    if (!headerParticles) return;
    
    // Create canvas
    const canvas = document.createElement('canvas');
    headerParticles.appendChild(canvas);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const ctx = canvas.getContext('2d');
    
    // Create particles
    const particles = [];
    const particleCount = Math.min(100, Math.floor(window.innerWidth / 20)); // Responsive particle count
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        color: 'rgba(0, 240, 255, ' + (Math.random() * 0.5 + 0.1) + ')',
        speedX: (Math.random() - 0.5) * 0.5, // Slower movement
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.1
      });
    }
    
    // Animation loop with requestAnimationFrame for better performance
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        // Move particles
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Wrap particles around edges with a bit of buffer
        if (particle.x < -50) particle.x = canvas.width + 50;
        if (particle.x > canvas.width + 50) particle.x = -50;
        if (particle.y < -50) particle.y = canvas.height + 50;
        if (particle.y > canvas.height + 50) particle.y = -50;
        
        // Draw particles
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
      });
      
      // Connect particles with lines when they are close
      connectParticles();
      
      requestAnimationFrame(animate);
    }
    
    // Connect nearby particles with lines
    function connectParticles() {
      const maxDistance = canvas.width > 768 ? 150 : 100;
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < maxDistance) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0, 240, 255, ${(maxDistance - distance) / maxDistance * 0.2})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    }
    
    // Handle window resize to maintain full-screen canvas
    window.addEventListener('resize', debounce(function() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Adjust particle count for smaller screens
      const newParticleCount = Math.min(100, Math.floor(window.innerWidth / 20));
      
      // Adjust particle array if needed
      if (newParticleCount < particles.length) {
        particles.splice(newParticleCount);
      } else if (newParticleCount > particles.length) {
        for (let i = particles.length; i < newParticleCount; i++) {
          particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 2 + 1,
            color: 'rgba(0, 240, 255, ' + (Math.random() * 0.5 + 0.1) + ')',
            speedX: (Math.random() - 0.5) * 0.5,
            speedY: (Math.random() - 0.5) * 0.5,
            opacity: Math.random() * 0.5 + 0.1
          });
        }
      }
    }, 250));
    
    // Start animation
    animate();
  }
  
  // ======== Form Validation ========
  function initializeFormValidation() {
    const contactForm = document.querySelector('.contact-form form');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Basic form validation
      let isValid = true;
      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const messageInput = document.getElementById('message');
      
      // Clear previous error states
      const errorElements = document.querySelectorAll('.error-message');
      errorElements.forEach(el => el.remove());
      
      // Reset input border colors
      const formInputs = contactForm.querySelectorAll('input, textarea');
      formInputs.forEach(input => {
        input.style.borderColor = 'rgba(0, 240, 255, 0.2)';
      });
      
      // Validate name
      if (!nameInput || !nameInput.value.trim()) {
        showError(nameInput, 'Please enter your name');
        isValid = false;
      }
      
      // Validate email
      if (!emailInput || !emailInput.value.trim()) {
        showError(emailInput, 'Please enter your email');
        isValid = false;
      } else if (!isValidEmail(emailInput.value)) {
        showError(emailInput, 'Please enter a valid email address');
        isValid = false;
      }
      
      // Validate message
      if (!messageInput || !messageInput.value.trim()) {
        showError(messageInput, 'Please enter your message');
        isValid = false;
      }
      
      // If form is valid, submit or show success message
      if (isValid) {
        // For demonstration, we're showing a success message
        // In a real application, you would send the form data to a server
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
        
        // Simulate form submission
        setTimeout(() => {
          showSuccess(contactForm);
          contactForm.reset();
          submitButton.disabled = false;
          submitButton.textContent = originalText;
        }, 1500);
      }
    });
    
    // Show error message
    function showError(inputElement, message) {
      if (!inputElement) return;
      
      const errorDiv = document.createElement('div');
      errorDiv.className = 'error-message';
      errorDiv.textContent = message;
      errorDiv.style.color = 'var(--secondary-color)';
      errorDiv.style.fontSize = '0.85rem';
      errorDiv.style.marginTop = '5px';
      
      inputElement.parentElement.appendChild(errorDiv);
      inputElement.style.borderColor = 'var(--secondary-color)';
    }
    
    // Show success message
    function showSuccess(formElement) {
      const successDiv = document.createElement('div');
      successDiv.className = 'success-message';
      successDiv.textContent = 'Your message has been sent successfully!';
      successDiv.style.color = 'var(--primary-color)';
      successDiv.style.padding = '15px';
      successDiv.style.marginTop = '20px';
      successDiv.style.backgroundColor = 'rgba(0, 240, 255, 0.1)';
      successDiv.style.borderRadius = '8px';
      successDiv.style.textAlign = 'center';
      
      formElement.appendChild(successDiv);
      
      // Remove success message after 5 seconds
      setTimeout(() => {
        successDiv.remove();
      }, 5000);
    }
    
    // Validate email format with regex
    function isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }
  }
  
  // ======== Image Gallery ========
  function initializeImageGallery() {
    const galleryCards = document.querySelectorAll('.cyber-image-card');
    if (galleryCards.length === 0) return;
    
    // Create modal for full-size image viewing if it doesn't exist yet
    if (!document.querySelector('.image-modal')) {
      const modal = document.createElement('div');
      modal.className = 'image-modal';
      modal.innerHTML = `
        <div class="modal-content">
          <span class="close-modal">&times;</span>
          <img class="modal-image" alt="Enlarged view">
          <div class="modal-caption"></div>
        </div>
      `;
      document.body.appendChild(modal);
      
      // Style the modal
      const modalStyles = `
        .image-modal {
          display: none;
          position: fixed;
          z-index: 1000;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.9);
          padding: 40px;
          overflow: auto;
          transition: opacity 0.3s ease;
          opacity: 0;
          justify-content: center;
          align-items: center;
        }
        .modal-content {
          position: relative;
          margin: auto;
          max-width: 90%;
          max-height: 90vh;
          animation: zoomIn 0.3s;
        }
        .modal-image {
          display: block;
          width: 100%;
          max-height: 80vh;
          object-fit: contain;
          border: 2px solid rgba(0, 240, 255, 0.3);
          border-radius: 8px;
        }
        .modal-caption {
          color: var(--text-light);
          text-align: center;
          padding: 15px 0;
          font-size: 1.2rem;
        }
        .close-modal {
          position: absolute;
          top: -40px;
          right: 0;
          color: var(--text-light);
          font-size: 30px;
          font-weight: bold;
          cursor: pointer;
          transition: color 0.3s ease;
        }
        .close-modal:hover {
          color: var(--primary-color);
        }
        @keyframes zoomIn {
          from {
            transform: scale(0.8);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
      `;
      
      // Add styles to head
      const styleElement = document.createElement('style');
      styleElement.textContent = modalStyles;
      document.head.appendChild(styleElement);
    }
    
    // Get modal elements
    const modalElement = document.querySelector('.image-modal');
    const modalImage = document.querySelector('.modal-image');
    const modalCaption = document.querySelector('.modal-caption');
    const closeModal = document.querySelector('.close-modal');
    
    // Add click event to gallery images
    galleryCards.forEach(card => {
      card.addEventListener('click', function() {
        const img = this.querySelector('img');
        const caption = this.querySelector('.card-overlay span');
        
        if (img) {
          modalImage.src = img.src;
          modalCaption.textContent = caption ? caption.textContent : '';
          modalElement.style.display = 'flex';
          document.body.style.overflow = 'hidden';
          
          // Trigger animation
          setTimeout(() => {
            modalElement.style.opacity = '1';
          }, 10);
        }
      });
    });
    
    // Close modal when clicking on close button or outside the image
    closeModal.addEventListener('click', closeImageModal);
    modalElement.addEventListener('click', function(e) {
      if (e.target === modalElement) {
        closeImageModal();
      }
    });
    
    // Close modal with escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && modalElement.style.display === 'flex') {
        closeImageModal();
      }
    });
    
    function closeImageModal() {
      modalElement.style.opacity = '0';
      setTimeout(() => {
        modalElement.style.display = 'none';
        document.body.style.overflow = '';
      }, 300);
    }
  }
  
  // ======== Theme Toggle ========
  function initializeThemeToggle() {
    // Check if theme toggle button exists
    const themeToggle = document.querySelector('.theme-toggle');
    if (!themeToggle) {
      // Create theme toggle if it doesn't exist
      const toggleBtn = document.createElement('button');
      toggleBtn.className = 'theme-toggle';
      toggleBtn.setAttribute('aria-label', 'Toggle dark/light mode');
      toggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
      document.body.appendChild(toggleBtn);
      
      // Style the toggle button
      toggleBtn.style.position = 'fixed';
      toggleBtn.style.bottom = '20px';
      toggleBtn.style.right = '20px';
      toggleBtn.style.zIndex = '99';
      toggleBtn.style.width = '50px';
      toggleBtn.style.height = '50px';
      toggleBtn.style.borderRadius = '50%';
      toggleBtn.style.background = 'var(--bg-light)';
      toggleBtn.style.border = 'none';
      toggleBtn.style.boxShadow = '0 3px 10px rgba(0,0,0,0.2), 0 0 15px rgba(0, 240, 255, 0.2)';
      toggleBtn.style.cursor = 'pointer';
      toggleBtn.style.display = 'flex';
      toggleBtn.style.justifyContent = 'center';
      toggleBtn.style.alignItems = 'center';
      toggleBtn.style.color = 'var(--primary-color)';
      toggleBtn.style.fontSize = '1.2rem';
      toggleBtn.style.transition = 'var(--transition-fast)';
    }
    
    // Get the toggle button (either existing or newly created)
    const toggleButton = document.querySelector('.theme-toggle');
    
    // Add light theme CSS variables
    const lightThemeCSS = `
      [data-theme="light"] {
        --primary-color: #00c3d0;
        --primary-dark: #009da8;
        --secondary-color: #ff003c;
        --bg-dark: #f5f5f5;
        --bg-darker: #e5e5e5;
        --bg-light: #ffffff;
        --bg-lighter: #f0f0f0;
        --text-light: #333333;
        --text-dark: #666666;
        --text-accent: #00a0ad;
        --glow-shadow: 0 0 10px rgba(0, 195, 208, 0.4), 0 0 20px rgba(0, 195, 208, 0.2);
      }
    `;
    
    // Add style element for theme variables if not already added
    if (!document.querySelector('#theme-vars')) {
      const styleElement = document.createElement('style');
      styleElement.id = 'theme-vars';
      styleElement.textContent = lightThemeCSS;
      document.head.appendChild(styleElement);
    }
    
    // Check user preference in localStorage
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
      toggleButton.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    // Add event listener to toggle button
    toggleButton.addEventListener('click', function() {
      let theme = 'dark';
      
      if (document.documentElement.getAttribute('data-theme') === 'dark' || 
         !document.documentElement.hasAttribute('data-theme')) {
        document.documentElement.setAttribute('data-theme', 'light');
        this.innerHTML = '<i class="fas fa-sun"></i>';
        theme = 'light';
      } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        this.innerHTML = '<i class="fas fa-moon"></i>';
        theme = 'dark';
      }
      
      // Save preference to localStorage
      localStorage.setItem('theme', theme);
    });
    
    // Add hover effect
    toggleButton.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-5px)';
      this.style.boxShadow = '0 8px 15px rgba(0,0,0,0.3), 0 0 20px rgba(0, 240, 255, 0.4)';
    });
    
    toggleButton.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
      this.style.boxShadow = '0 3px 10px rgba(0,0,0,0.2), 0 0 15px rgba(0, 240, 255, 0.2)';
    });
  }
  
  // ======== Utility Functions ========
  
  // Throttle function to limit execution rate
  function throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
  
  // Debounce function to prevent excessive function calls
  function debounce(func, wait) {
    let timeout;
    return function() {
      const context = this;
      const args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), wait);
    };
  }
  
  // Check if element is in viewport
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
  
  // Add event listener for when page is about to be unloaded
  window.addEventListener('beforeunload', function() {
    // Remove any temporary elements or clean up event listeners
    // This helps prevent memory leaks
    const temporaryElements = document.querySelectorAll('.image-modal');
    temporaryElements.forEach(el => el.remove());
  });