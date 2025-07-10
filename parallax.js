// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get the background element
    const background = document.querySelector('body::before');
    
    // Function to handle the scroll effect
    function handleScroll() {
        // Get the current scroll position
        const scrollPosition = window.scrollY;
        
        // Apply a subtle parallax effect (slower movement than the page)
        const yPos = scrollPosition * 0.3; // Adjust this value to control the speed of the parallax
        
        // Apply the transform to create the parallax effect
        document.documentElement.style.setProperty('--parallax-y', `${yPos}px`);
    }
    
    // Add scroll event listener
    window.addEventListener('scroll', function() {
        // Use requestAnimationFrame for smoother performance
        window.requestAnimationFrame(handleScroll);
    });
    
    // Initial call to set the initial position
    handleScroll();
});
