document.addEventListener('DOMContentLoaded', function() {

    // ======== Theme Toggle ========
    initializeThemeToggle();
  });
  
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
  