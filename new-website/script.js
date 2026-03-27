// ========== STORAGE MANAGER ==========
const StorageManager = {
    save: (key, value) => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (e) {
            console.error('Storage error:', e);
            return false;
        }
    },
    
    load: (key) => {
        try {
            const value = localStorage.getItem(key);
            return value ? JSON.parse(value) : null;
        } catch (e) {
            console.error('Storage error:', e);
            return null;
        }
    },
    
    remove: (key) => {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (e) {
            console.error('Storage error:', e);
            return false;
        }
    }
};

// ========== LOAD THEME PREFERENCE ==========
function loadThemePreference() {
    const savedTheme = StorageManager.load('theme'); // Can be null for 'auto'
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        updateThemeButtons('dark');
    } else if (savedTheme === 'light') {
        document.body.classList.remove('dark-theme');
        updateThemeButtons('light');
    } else { // savedTheme is null or undefined, meaning 'auto'
        if (prefersDark) {
            document.body.classList.add('dark-theme');
        } else {
            document.body.classList.remove('dark-theme');
        }
        updateThemeButtons('auto');
    }
}

// ========== APP INITIALIZATION ==========
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    loadThemePreference();
    setupNavigation();
    setupButtons();
    setupSearch();
    // Ensure theme buttons are updated on initial load
    updateThemeButtons(StorageManager.load('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
}

// ========== NAVIGATION ==========
function setupNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            if (!item.href) {
                e.preventDefault();
                navItems.forEach(ni => ni.classList.remove('active'));
                item.classList.add('active');
            }
        });
    });
}

// ========== BUTTONS FUNCTIONALITY ==========
function setupButtons() {
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            if (btn.classList.contains('btn-primary') && btn.textContent.includes('جديد')) {
                e.preventDefault();
                showNotification('تم إنشاء عنصر جديد', 'success');
            }
        });
    });
}

// ========== SEARCH FUNCTIONALITY ==========
function setupSearch() {
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                console.log('البحث عن:', searchInput.value);
            }
        });
    }
}

// ========== FILTER PROJECTS ==========
function filterProjects(status) {
    const buttons = document.querySelectorAll('.btn-filter');
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target?.classList.add('active');
    
    showNotification(`تصفية حسب: ${status}`, 'info');
}

// ========== SHOW SECTION ==========
function showSection(sectionId) {
    const sections = document.querySelectorAll('.settings-section');
    const buttons = document.querySelectorAll('.settings-menu-item');
    
    sections?.forEach(section => section.classList.add('hidden'));
    buttons?.forEach(btn => btn.classList.remove('active'));
    
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.remove('hidden');
        event.target?.classList.add('active');
    }
}

// ========== NOTIFICATIONS ==========
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${getNotificationIcon(type)}</span>
            <span class="notification-message">${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

function getNotificationIcon(type) {
    const icons = {
        'success': '✓',
        'error': '✕',
        'warning': '!',
        'info': 'ℹ'
    };
    return icons[type] || '✓';
}

// ========== TOGGLE SWITCH ==========
function toggleSwitch(input) {
    const isChecked = input.checked;
    const label = input.closest('.toggle-group')?.querySelector('.toggle-label');
    if (label) {
        showNotification(
            `${label.textContent}: ${isChecked ? 'مفعل' : 'معطل'}`,
            'success'
        );
    }
}

// ========== MOBILE MENU ==========
function toggleMobileMenu() {
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
        sidebar.classList.toggle('active');
    }
}

// ========== ANIMATIONS ==========
function animateOnScroll() {
    const elements = document.querySelectorAll('.card, .kpi-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeIn 0.5s ease-out';
                observer.unobserve(entry.target);
            }
        });
    });
    
    elements.forEach(el => observer.observe(el));
}

// ========== APP HELPERS ==========
const AppHelpers = {
    formatDate: (date) => {
        return new Date(date).toLocaleDateString('ar-SA', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    },
    
    formatCurrency: (amount) => {
        return new Intl.NumberFormat('ar-SA', {
            style: 'currency',
            currency: 'SAR'
        }).format(amount);
    },
    
    calculateProgress: (current, total) => {
        return Math.round((current / total) * 100);
    },
    
    toggleDarkMode: () => {
        document.body.classList.toggle('dark-mode');
        StorageManager.save('darkMode', document.body.classList.contains('dark-mode'));
    }
};

// Initialize animations on load
animateOnScroll();

// ========== THEME TOGGLE ==========
function toggleTheme(theme) {
    const body = document.body;
    
    if (theme === 'dark') {
        body.classList.add('dark-theme');
        StorageManager.save('theme', 'dark');
        showNotification('✓ تم تفعيل الموضوع المظلم', 'success');
    } else if (theme === 'light') {
        body.classList.remove('dark-theme');
        StorageManager.save('theme', 'light');
        showNotification('✓ تم تفعيل الموضوع الفاتح', 'success');
    } else if (theme === 'auto') {
        StorageManager.remove('theme'); // Let OS/browser decide
        body.classList.remove('dark-theme'); // Ensure no dark theme class
        showNotification('✓ تم تفعيل الموضوع التلقائي', 'success');
    }
    
    updateThemeButtons(theme);
}

function updateThemeButtons(activeTheme) {
    const lightButton = document.querySelector('.settings-section#appearance .btn-primary');
    const darkButton = document.querySelector('.settings-section#appearance .btn-secondary:nth-of-type(1)');
    const autoButton = document.querySelector('.settings-section#appearance .btn-secondary:nth-of-type(2)');

    // Remove active from all theme buttons
    [lightButton, darkButton, autoButton].forEach(btn => btn?.classList.remove('active'));

    // Add active to the current theme button
    if (activeTheme === 'light') {
        lightButton?.classList.add('active');
    } else if (activeTheme === 'dark') {
        darkButton?.classList.add('active');
    } else if (activeTheme === 'auto') {
        autoButton?.classList.add('active');
    }
}

// ========== SETTINGS PAGE HANDLER ==========
function openSettings(event, tabName) {
    // Prevent default button behavior
    event.preventDefault();
    
    // Hide all sections
    const sections = document.querySelectorAll('.settings-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });

    // Remove active from all menu items
    const menuItems = document.querySelectorAll('.settings-menu-item');
    menuItems.forEach(item => {
        item.classList.remove('active');
    });

    // Show the selected section
    const activeSection = document.getElementById(tabName);
    if (activeSection) {
        activeSection.classList.add('active');
    }

    // Add active to clicked button
    if (event.target) {
        event.target.classList.add('active');
    }
}

// Export for global use
window.filterProjects = filterProjects;
window.showSection = showSection;
window.showNotification = showNotification;
window.toggleSwitch = toggleSwitch;
window.toggleMobileMenu = toggleMobileMenu;
window.toggleTheme = toggleTheme;
window.openSettings = openSettings;
window.AppHelpers = AppHelpers;
window.StorageManager = StorageManager;
