// Countdown Timer
function updateCountdown() {
    const weddingDate = new Date('2024-05-25T08:00:00').getTime();
    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = days;
        document.getElementById('hours').textContent = hours;
        document.getElementById('minutes').textContent = minutes;
        document.getElementById('seconds').textContent = seconds;
    } else {
        document.getElementById('countdown').innerHTML = '<div class="countdown-item"><span class="countdown-number">❤️</span><span class="countdown-label">Hari Bahagia</span></div>';
    }
}

// Update countdown every second
setInterval(updateCountdown, 1000);
updateCountdown();

// Smooth Scrolling Navigation
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar Background on Scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', function() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Gallery Lightbox
const galleryImages = [
    'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/1153370/pexels-photo-1153370.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/1444444/pexels-photo-1444444.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/1444424/pexels-photo-1444424.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/1444429/pexels-photo-1444429.jpeg?auto=compress&cs=tinysrgb&w=1200'
];

let currentImageIndex = 0;

function openLightbox(index) {
    currentImageIndex = index;
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    
    lightboxImage.src = galleryImages[index];
    lightbox.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    document.getElementById('lightboxImage').src = galleryImages[currentImageIndex];
}

function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    document.getElementById('lightboxImage').src = galleryImages[currentImageIndex];
}

// Close lightbox on click outside image
document.getElementById('lightbox').addEventListener('click', function(e) {
    if (e.target === this) {
        closeLightbox();
    }
});

// Keyboard navigation for lightbox
document.addEventListener('keydown', function(e) {
    const lightbox = document.getElementById('lightbox');
    if (lightbox.style.display === 'block') {
        if (e.key === 'ArrowRight') {
            nextImage();
        } else if (e.key === 'ArrowLeft') {
            prevImage();
        } else if (e.key === 'Escape') {
            closeLightbox();
        }
    }
});

// Map Functions
function openMap(location) {
    if (location === 'masjid') {
        window.open('https://maps.google.com/?q=Masjid+Al-Hidayah+Jakarta+Selatan', '_blank');
    } else if (location === 'hotel') {
        window.open('https://maps.google.com/?q=Hotel+Grand+Ballroom+Jakarta+Pusat', '_blank');
    }
}

// RSVP Form Handling
const rsvpForm = document.getElementById('rsvpForm');
const rsvpSuccess = document.getElementById('rsvpSuccess');

rsvpForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(rsvpForm);
    const rsvpData = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        attendance: formData.get('attendance'),
        guests: formData.get('guests'),
        message: formData.get('message'),
        timestamp: new Date().toISOString()
    };
    
    // Save to localStorage (in real application, you would send this to a server)
    let rsvpList = JSON.parse(localStorage.getItem('rsvpList') || '[]');
    rsvpList.push(rsvpData);
    localStorage.setItem('rsvpList', JSON.stringify(rsvpList));
    
    // Show success message
    rsvpForm.style.display = 'none';
    rsvpSuccess.style.display = 'block';
    
    // Optional: Reset form after 3 seconds
    setTimeout(() => {
        rsvpForm.style.display = 'block';
        rsvpSuccess.style.display = 'none';
        rsvpForm.reset();
    }, 5000);
});

// Scroll Animation Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Animate sections on scroll
document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('.timeline-item, .detail-card, .gallery-item');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Add hover effects to cards
document.querySelectorAll('.detail-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Parallax effect for hero background
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background');
    
    if (heroBackground && scrolled < window.innerHeight) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add loading animation
window.addEventListener('load', function() {
    const heroContent = document.querySelector('.hero-content');
    heroContent.classList.add('animate-fade-in');
});

// Add ripple effect to buttons
document.querySelectorAll('.map-btn, .rsvp-btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// // Add CSS for ripple animation
// const style = document.createElement('style');
// style.textContent = `
//     @keyframes ripple {
//         to {
//             transform: scale(4);
//             opacity: 0;
//         }
//     }
    
//     .nav-menu.active {
//         display: flex;
//         position: absolute;
//         top: 100%;
//         left: 0;
//         width: 100%;
//         flex-direction: column;
//         background: rgba(255, 255, 255, 0.98);
//         backdrop-filter: blur(10px);
//         padding: 20px;
//         box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
//     }
    
//     .hamburger.active span:nth-child(1) {
//         transform: rotate(-45deg) translate(-5px, 6px);
//     }
    
//     .hamburger.active span:nth-child(2) {
//         opacity: 0;
//     }
    
//     .hamburger.active span:nth-child(3) {
//         transform: rotate(45deg) translate(-5px, -6px);
//     }
// `;
// document.head.appendChild(style);

// console.log('Wedding invitation website loaded successfully! 💕');