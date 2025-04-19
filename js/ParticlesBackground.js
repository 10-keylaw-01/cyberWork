document.addEventListener('DOMContentLoaded', function() {
  
    // ======== Particles Background ========
    initializeParticles();
    
   
  });
  
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