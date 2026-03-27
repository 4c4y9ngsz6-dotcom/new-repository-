document.addEventListener('DOMContentLoaded', function() {
    // Theme toggle
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    const currentTheme = localStorage.getItem('theme') || 'light';
    body.setAttribute('data-theme', currentTheme);
    
    themeToggle.addEventListener('click', function() {
        const newTheme = body.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
    
    // Message changer (existing feature, enhanced)
    const message = document.getElementById('message');
    const changeBtn = document.getElementById('changeBtn');
    
    let messages = [
        'مرحباً بك في أفكار جديدة! | Welcome to New Ideas!',
        'HTML, CSS, و JavaScript يعملون معاً! | HTML, CSS, and JS working together!',
        'انقر مرة أخرى لرسالة أخرى. | Click again for another message.',
        'صفحة تفاعلية بسيطة ومتطورة. | Simple yet advanced interactive page.'
    ];
    let index = parseInt(localStorage.getItem('messageIndex')) || 0;
    message.textContent = messages[index];
    
    changeBtn.addEventListener('click', function() {
        index = (index + 1) % messages.length;
        message.textContent = messages[index];
        localStorage.setItem('messageIndex', index);
    });
    
    // Smooth scrolling for nav links
    document.querySelectorAll('nav a[href^=\"#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    // Mobile menu toggle (if needed in future)
    // Add hamburger menu logic here if expanding nav
});
