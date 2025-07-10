document.addEventListener('DOMContentLoaded', function() {
    // Get all download buttons
    const downloadButtons = document.querySelectorAll('.download-btn');
    
    // Add click event listener to each download button
    downloadButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Prevent default download behavior
            e.preventDefault();
            
            // Add downloading class to show spinner and hide text
            this.classList.add('downloading');
            
            // Get the download URL from the href attribute
            const downloadUrl = this.getAttribute('href');
            
            // Create a temporary anchor element for downloading
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.download = downloadUrl.split('/').pop();
            document.body.appendChild(link);
            
            // Trigger the download
            link.click();
            
            // Clean up
            document.body.removeChild(link);
            
            // Reset button state after a delay (long enough for the download to start)
            setTimeout(() => {
                this.classList.remove('downloading');
            }, 2000); // 2 seconds should be enough for the download to start
        });
    });
});
