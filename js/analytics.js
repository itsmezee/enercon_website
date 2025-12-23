/*

// Simple Analytics Tracking
document.addEventListener('DOMContentLoaded', function() {
    // Track page views
    console.log('Page viewed:', document.title, window.location.href);
    
    // Track time on page
    let pageLoadTime = Date.now();
    
    // Track button clicks
    document.querySelectorAll('.btn-primary, .btn-secondary, .cta-button').forEach(button => {
        button.addEventListener('click', function() {
            console.log('Button clicked:', this.textContent.trim());
        });
    });
    
    // Track external links
    document.querySelectorAll('a[target="_blank"]').forEach(link => {
        link.addEventListener('click', function() {
            console.log('External link clicked:', this.href);
        });
    });
    
    // Track form interactions
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function() {
            console.log('Form submitted:', this.id || 'form');
        });
    });
    
    // Send page view data on unload
    window.addEventListener('beforeunload', function() {
        const timeSpent = Math.round((Date.now() - pageLoadTime) / 1000);
        console.log('Time spent on page:', timeSpent, 'seconds');
        
        // You can send this data to your server here
        // Example: fetch('/api/analytics', { method: 'POST', body: JSON.stringify({timeSpent}) });
    });
});

 */