document.addEventListener('DOMContentLoaded', function() {
  
    // ======== Form Validation ========
    initializeFormValidation();
    

  });

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