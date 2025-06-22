// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');

mobileMenuToggle.addEventListener('click', function() {
    // Toggle active class on hamburger button
    this.classList.toggle('active');
    
    // Toggle active class on mobile menu
    mobileMenu.classList.toggle('active');
});

// Close mobile menu when clicking on nav links
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

mobileNavLinks.forEach(link => {
    link.addEventListener('click', function() {
        mobileMenuToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70; // Account for navbar height
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Add scroll effect to navbar
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 10) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 4px 25px rgba(212, 165, 116, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(218, 165, 132, 0.1)';
    }
});

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    const navbar = document.querySelector('.navbar');
    const isClickInsideNavbar = navbar.contains(event.target);
    
    if (!isClickInsideNavbar && mobileMenu.classList.contains('active')) {
        mobileMenuToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
    }
});

// Handle window resize
window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        mobileMenuToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
    }
});

// Add active state to navigation links based on scroll position
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"], .mobile-nav-link[href^="#"]');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// RSVP Button functionality
const rsvpButtons = document.querySelectorAll('.rsvp-btn');

rsvpButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Remove active class from all buttons
        rsvpButtons.forEach(btn => btn.classList.remove('selected'));
        
        // Add active class to clicked button
        this.classList.add('selected');
        
        // Show confirmation message
        const isAttending = this.classList.contains('attend');
        const message = isAttending ? 
            'Terima kasih! Kami menunggu kehadiran Anda.' : 
            'Terima kasih atas konfirmasinya. Kami akan merindukan Anda.';
        
        // Create and show temporary message
        const existingMessage = document.querySelector('.rsvp-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        const messageElement = document.createElement('div');
        messageElement.className = 'rsvp-message';
        messageElement.style.cssText = `
            background: rgba(212, 165, 116, 0.1);
            color: #8b6f47;
            padding: 16px;
            border-radius: 10px;
            margin-top: 20px;
            text-align: center;
            font-weight: 500;
            border: 1px solid rgba(212, 165, 116, 0.3);
        `;
        messageElement.textContent = message;
        
        this.parentNode.insertAdjacentElement('afterend', messageElement);
        
        // Remove message after 5 seconds
        setTimeout(() => {
            if (messageElement.parentNode) {
                messageElement.remove();
            }
        }, 5000);
    });
});

// Add CSS for selected RSVP button
const style = document.createElement('style');
style.textContent = `
    .rsvp-btn.selected.attend {
        background: #d4a574;
        color: white;
        transform: translateY(-2px);
    }
    
    .rsvp-btn.selected.not-attend {
        background: #8b6f47;
        color: white;
        transform: translateY(-2px);
    }
    
    .rsvp-message {
        animation: fadeIn 0.5s ease-in;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(style);

// Add floating animation to hero ornaments
const heroOrnaments = document.querySelectorAll('.hero-ornament, .hero-ornament-bottom');
heroOrnaments.forEach((ornament, index) => {
    ornament.style.animation = `float ${3 + index}s ease-in-out infinite`;
});

// Add floating animation CSS
const floatingStyle = document.createElement('style');
floatingStyle.textContent = `
    @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
    }
`;
document.head.appendChild(floatingStyle);