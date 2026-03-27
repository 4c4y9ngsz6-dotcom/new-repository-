∆document.addEventListener('DOMContentLoaded', function() {
    const message = document.getElementById('message');
    const button = document.getElementById('changeBtn');
    
    let messages = [
        'Welcome to my web project!',
        'HTML, CSS, and JavaScript working together!',
        'Click again for another message.',
        'This is a simple interactive page.'
    ];
    let index = 0;
    
    button.addEventListener('click', function() {
        index = (index + 1) % messages.length;
        message.textContent = messages[index];
    });
});
