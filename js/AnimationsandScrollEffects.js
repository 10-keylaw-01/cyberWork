document.addEventListener('DOMContentLoaded', function() {
    // ======== Navigation Functionality ========
    initializeScrollEffects();
    

  });



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
  