// ==========================================
// ENTERPRISE BUSINESS MANAGEMENT PLATFORM
// JavaScript Interactions & Functionality
// ==========================================

// ======== Settings Panel Navigation ========
function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.settings-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });

    // Remove active class from all menu items
    const menuItems = document.querySelectorAll('.settings-menu-item');
    menuItems.forEach(item => {
        item.classList.remove('active');
    });

    // Show the selected section
    const activeSection = document.getElementById(sectionId);
    if (activeSection) {
        activeSection.classList.add('active');
    }

    // Highlight the active menu item
    event.target.classList.add('active');
}

// ======== Initialize Settings Page ========
document.addEventListener('DOMContentLoaded', () => {
    // Show first section by default on settings page
    const firstSection = document.getElementById('profile');
    if (firstSection) {
        firstSection.classList.add('active');
    }

    // Initialize filters on projects page
    initializeFilters();

    // Initialize hover animations
    initializeHoverEffects();

    // Initialize task cards
    initializeTaskCards();

    // Initialize form interactions
    initializeFormInteractions();
});

// ======== Filter Functionality ========
function initializeFilters() {
    const filterButtons = document.querySelectorAll('.btn-filter');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active to clicked button
            button.classList.add('active');

            // Optionally filter cards here
            const status = button.textContent.trim();
            filterProjectCards(status);
        });
    });
}

function filterProjectCards(status) {
    const cards = document.querySelectorAll('.project-card');
    cards.forEach(card => {
        const badge = card.querySelector('.status-badge');
        const badgeText = badge ? badge.textContent.trim() : '';

        if (status === 'الكل' || badgeText.includes(status)) {
            card.style.display = 'block';
            setTimeout(() => card.style.opacity = '1', 10);
        } else {
            card.style.opacity = '0';
            setTimeout(() => card.style.display = 'none', 300);
        }
    });
}

// ======== Hover Effects ========
function initializeHoverEffects() {
    const cards = document.querySelectorAll('.project-card, .kpi-card, .task-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = card.classList.contains('project-card')
                ? 'translateY(-8px)'
                : 'translateY(-4px)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
}

// ======== Task Card Interactions ========
function initializeTaskCards() {
    const taskCards = document.querySelectorAll('.task-card');

    taskCards.forEach(card => {
        // Hover effects
        card.addEventListener('mouseenter', () => {
            card.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.08)';
            card.style.transform = 'translateY(-2px)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.boxShadow = '';
            card.style.transform = '';
        });

        // Click to expand (optional)
        card.addEventListener('click', () => {
            const details = card.querySelector('.task-details');
            if (details) {
                details.style.display =
                    details.style.display === 'none' ? 'block' : 'none';
            }
        });
    });
}

// ======== Form Interactions ========
function initializeFormInteractions() {
    const inputs = document.querySelectorAll('.form-input');

    inputs.forEach(input => {
        // Focus effect
        input.addEventListener('focus', () => {
            input.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
            input.style.borderColor = '#667eea';
        });

        // Blur effect
        input.addEventListener('blur', () => {
            input.style.boxShadow = '';
            input.style.borderColor = '#e2e8f0';
        });
    });

    // Form submission
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            showNotification('تم الحفظ بنجاح!', 'success');
            // Reset form if needed
            // form.reset();
        });
    });
}

// ======== Notification System ========
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#26a69a' : '#667eea'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        animation: slideIn 0.3s ease-out;
        z-index: 1000;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ======== Smooth Scroll ========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ======== Navigation Active State ========
function updateActiveNavItem() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navItems = document.querySelectorAll('.nav-item');

    navItems.forEach(item => {
        const href = item.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

// Call on page load
updateActiveNavItem();

// ======== Keyboard Shortcuts ========
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K for search focus
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.querySelector('.search-input');
        if (searchInput) {
            searchInput.focus();
        }
    }

    // Escape to close modals/dropdowns
    if (e.key === 'Escape') {
        // Add modal closing logic here if needed
    }
});

// ======== Animation Helper ========
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    @keyframes fadeOut {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ======== Dark Mode Toggle (Optional) ========
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

// Load dark mode preference if saved
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}

// ======== Performance Monitoring ========
if ('PerformanceObserver' in window) {
    try {
        const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                if (entry.duration > 3000) {
                    console.warn('Slow operation detected:', entry.name, entry.duration);
                }
            }
        });
        observer.observe({ entryTypes: ['measure', 'navigation'] });
    } catch (e) {
        // Silently fail if not supported
    }
}

// ======== Mobile Menu Toggle ========
function setupMobileMenu() {
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');

    // Check if we're on mobile
    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
        // Optionally collapse sidebar
        sidebar.style.position = 'absolute';
    }

    window.addEventListener('resize', () => {
        const isNowMobile = window.innerWidth <= 768;
        if (isNowMobile && !isMobile) {
            sidebar.style.position = 'absolute';
        }
    });
}

setupMobileMenu();

// ======== Local Storage Helpers ========
const StorageManager = {
    save: (key, value) => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            console.warn('Storage failed:', e);
        }
    },

    load: (key) => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (e) {
            console.warn('Storage read failed:', e);
            return null;
        }
    },

    remove: (key) => {
        try {
            localStorage.removeItem(key);
        } catch (e) {
            console.warn('Storage remove failed:', e);
        }
    }
};

// ======== Export for use in other modules ========
window.AppHelpers = {
    showNotification,
    toggleDarkMode,
    showSection,
    StorageManager
};
