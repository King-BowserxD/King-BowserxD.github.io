document.addEventListener('DOMContentLoaded', function() {
    // Create fullscreen overlay
    const overlay = document.createElement('div');
    overlay.className = 'fullscreen-overlay';
    overlay.setAttribute('aria-hidden', 'true');
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'Image gallery');
    
    overlay.innerHTML = `
        <div class="fullscreen-content">
            <button class="close-btn" aria-label="Close">&times;</button>
            <img class="fullscreen-img" src="" alt="">
            <div class="image-counter" aria-live="polite"></div>
        </div>
    `;
    document.body.appendChild(overlay);

    // Get all gallery items
    const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));
    let currentIndex = 0;
    let isFullscreenOpen = false;

    // Function to open image in fullscreen
    function openFullscreen(index) {
        if (index < 0 || index >= galleryItems.length) return;
        
        const imgElement = galleryItems[index].querySelector('img');
        const imgSrc = imgElement.src;
        const imgAlt = imgElement.alt;
        const fullscreenImg = overlay.querySelector('.fullscreen-img');
        const imageCounter = overlay.querySelector('.image-counter');
        
        fullscreenImg.src = imgSrc;
        fullscreenImg.alt = imgAlt;
        imageCounter.textContent = `${index + 1} / ${galleryItems.length}`;
        
        overlay.style.display = 'flex';
        overlay.setAttribute('aria-hidden', 'false');
        document.body.classList.add('overlay-open');
        
        // Set focus to close button for better keyboard navigation
        const closeBtn = overlay.querySelector('.close-btn');
        closeBtn.focus();
        
        currentIndex = index;
        isFullscreenOpen = true;
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
    }

    // Function to close fullscreen
    function closeFullscreen() {
        overlay.style.display = 'none';
        overlay.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('overlay-open');
        document.body.style.overflow = 'auto';
        isFullscreenOpen = false;
    }

    // Add click event to gallery items
    galleryItems.forEach((item, index) => {
        item.setAttribute('role', 'button');
        item.setAttribute('tabindex', '0');
        item.setAttribute('aria-label', 'View image ' + (index + 1));
        
        const clickHandler = (e) => {
            e.preventDefault();
            openFullscreen(index);
        };
        
        item.addEventListener('click', clickHandler);
        
        // Also make it keyboard accessible
        item.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openFullscreen(index);
            }
        });
    });

    // Close fullscreen when clicking overlay or close button
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay || e.target.classList.contains('close-btn')) {
            closeFullscreen();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (!isFullscreenOpen) return;
        
        if (e.key === 'Escape') {
            closeFullscreen();
            return;
        }
        
        // Navigation with arrow keys
        if (e.key === 'ArrowRight') {
            e.preventDefault();
            const nextIndex = (currentIndex + 1) % galleryItems.length;
            openFullscreen(nextIndex);
        } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            const prevIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
            openFullscreen(prevIndex);
        }
    });
});
