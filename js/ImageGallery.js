document.addEventListener('DOMContentLoaded', function() {
  
    
    // ======== Image Gallery ========
    initializeImageGallery();
    

  });
  
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
  