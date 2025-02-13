// DOM Elements
const elements = {
    welcomeMessage: document.querySelector('.welcome-message'),
    startButton: document.querySelector('.start-button'),
    giftContainer: document.querySelector('.gift-container'),
    giftBox: document.querySelector('.gift-box'),
    gallery: document.querySelector('.gallery'),
    floatingHeartsContainer: document.querySelector('.floating-hearts'),
    musicToggle: document.querySelector('.music-toggle'),
    modal: document.getElementById('imageModal'),
    modalImage: document.getElementById('modalImage'),
    modalTitle: document.querySelector('.modal-title'),
    modalDescription: document.querySelector('.modal-description'),
    modalQuote: document.querySelector('.modal-quote'),
    closeModal: document.querySelector('.close-modal'),
    galleryItems: document.querySelectorAll('.gallery-item')
};

function updateTimer() {
    // Set start date to February 14, 2024
    const startDate = new Date('2024-02-14').getTime();
    const now = new Date().getTime();
    const diff = now - startDate;

    // Calculate time units
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    // Calculate years, months and remaining days
    const years = Math.floor(days / 365);
    const remainingDays = days % 365;
    const months = Math.floor(remainingDays / 30);
    const finalDays = remainingDays % 30;

    // Update timer display
    const timerElement = document.getElementById('timer');
    if (timerElement) {
        timerElement.innerHTML = `
            ${years > 0 ? years + ' ปี ' : ''}
            ${months > 0 ? months + ' เดือน ' : ''}
            ${finalDays} วัน<br>
            ${hours} ชั่วโมง ${minutes} นาที ${seconds} วินาที
        `;
    }
}

// Initial call
updateTimer();

// Update timer every second
setInterval(updateTimer, 1000);

// Add animation when hovering over timer
document.querySelector('.time-counter')?.addEventListener('mouseover', function() {
    this.style.transform = 'scale(1.05)';
});

document.querySelector('.time-counter')?.addEventListener('mouseout', function() {
    this.style.transform = 'scale(1)';
});
// State management
const state = {
    isGiftOpen: false,
    isMusicPlaying: false
};

// Configuration
const config = {
    heartCount: 30,
    heartCreationInterval: 500,
    heartCreationChance: 0.3,
    confettiCount: 100,
    confettiColors: ['#ff69b4', '#ff1493', '#ffffff', '#ff4081'],
    mobileBreakpoint: 768
};

// Background Music Setup
const bgMusic = new Audio('assets/audio/background-music.mp3');
bgMusic.loop = true;

// Image content data
const imageContent = {
    'romantic-moment-1': {
        title: 'Our First Date',
        description: 'The moment our hearts first danced together, creating memories that would last a lifetime.',
        quote: '"Every love story is beautiful, but ours is my favorite."'
    },
    'romantic-moment-2': {
        title: 'Beautiful Sunset Together',
        description: 'Watching the sun paint the sky in shades of love, while our hearts grew closer.',
        quote: '"The best thing to hold onto in life is each other."'
    },
    'romantic-moment-3': {
        title: 'Perfect Evening',
        description: 'Under the moonlight, every moment with you becomes magical and unforgettable.',
        quote: '"In your arms is where I belong."'
    },
    'romantic-moment-4': {
        title: 'Sweet Memories',
        description: 'Each smile, each laugh, each tender moment builds our beautiful story together.',
        quote: '"You are my today and all of my tomorrows."'
    },
    'romantic-moment-5': {
        title: 'Sweet Memories',
        description: 'Each smile, each laugh, each tender moment builds our beautiful story together.',
        quote: '"You are my today and all of my tomorrows."'
    },
    'romantic-moment-6': {
        title: 'Sweet Memories',
        description: 'Each smile, each laugh, each tender moment builds our beautiful story together.',
        quote: '"You are my today and all of my tomorrows."'
    }
};

// Animation Utilities
const animations = {
    createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        
        const size = Math.random() * 15 + 10;
        const duration = Math.random() * 3 + 2;
        
        Object.assign(heart.style, {
            left: `${Math.random() * 100}vw`,
            top: '100vh',
            width: `${size}px`,
            height: `${size}px`,
            animation: `heartBeat ${duration}s infinite, float ${duration * 2}s linear`,
            transform: `rotate(${Math.random() * 360}deg)`
        });
        
        elements.floatingHeartsContainer.appendChild(heart);
        
        setTimeout(() => heart.remove(), duration * 2000);
    },

    createHeartBurst() {
        for(let i = 0; i < config.heartCount; i++) {
            setTimeout(() => this.createHeart(), i * 100);
        }
    },

    playConfetti() {
        for (let i = 0; i < config.confettiCount; i++) {
            const confetti = document.createElement('div');
            
            Object.assign(confetti.style, {
                position: 'fixed',
                width: '10px',
                height: '10px',
                backgroundColor: config.confettiColors[Math.floor(Math.random() * config.confettiColors.length)],
                left: `${Math.random() * 100}vw`,
                top: '-20px',
                transform: `rotate(${Math.random() * 360}deg)`,
                opacity: Math.random().toString(),
                transition: 'all 1s ease'
            });
            
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                confetti.style.top = '100vh';
                confetti.style.transform = `rotate(${Math.random() * 360 + 720}deg)`;
            }, 50);
            
            setTimeout(() => confetti.remove(), 3000);
        }
    }
};

// Event Handlers
const handlers = {
    handleStart() {
        elements.welcomeMessage.classList.add('hide');
        setTimeout(() => {
            elements.giftContainer.classList.add('show');
            animations.createHeartBurst();
        }, 500);
    },

    handleGiftOpen() {
        if (!state.isGiftOpen) {
            elements.giftBox.classList.add('open');
            setTimeout(() => {
                elements.gallery.classList.add('show');
                animations.createHeartBurst();
                animations.playConfetti();
            }, 1000);
            state.isGiftOpen = true;
        }
    },

    handleMusicToggle() {
        state.isMusicPlaying ? bgMusic.pause() : bgMusic.play();
        elements.musicToggle.innerHTML = state.isMusicPlaying ? 
            '<i class="fas fa-music"></i>' : 
            '<i class="fas fa-pause"></i>';
        state.isMusicPlaying = !state.isMusicPlaying;
    },

    handleModalOpen(item, index) {
        const imageId = `romantic-moment-${index + 1}`;
        const content = imageContent[imageId];
        const img = item.querySelector('img');
        
        elements.modalImage.src = img.src;
        elements.modalImage.alt = img.alt;
        elements.modalTitle.textContent = content.title;
        elements.modalDescription.textContent = content.description;
        elements.modalQuote.textContent = content.quote;
        
        elements.modal.style.display = 'block';
        setTimeout(() => elements.modal.classList.add('show'), 10);
        animations.createHeartBurst();
    },

    handleModalClose() {
        elements.modal.classList.remove('show');
        setTimeout(() => {
            elements.modal.style.display = 'none';
        }, 300);
    }
};

// Event Listeners
function initializeEventListeners() {
    // Core functionality
    elements.startButton.addEventListener('click', handlers.handleStart);
    elements.giftBox.addEventListener('click', handlers.handleGiftOpen);
    elements.musicToggle.addEventListener('click', handlers.handleMusicToggle);
    
    // Modal events
    elements.closeModal.addEventListener('click', handlers.handleModalClose);
    elements.modal.addEventListener('click', (e) => {
        if (e.target === elements.modal) handlers.handleModalClose();
    });
    
    // Gallery items
    elements.galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => handlers.handleModalOpen(item, index));
        item.addEventListener('mouseenter', () => animations.createHeartBurst());
    });
    
    // Keyboard events
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && elements.modal.style.display === 'block') {
            handlers.handleModalClose();
        }
    });
    
    // Mobile touch events
    let touchStartY;
    elements.gallery.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
    });

    elements.gallery.addEventListener('touchmove', (e) => {
        const touchY = e.touches[0].clientY;
        const diff = touchStartY - touchY;
        
        if (Math.abs(diff) > 5) {
            e.preventDefault();
            elements.gallery.scrollTop += diff;
            touchStartY = touchY;
        }
    });
    
    // Resize handler
    window.addEventListener('resize', () => {
        elements.gallery.style.height = 
            window.innerWidth < config.mobileBreakpoint ? '70vh' : '80vh';
    });
    
    // Loading animation
    window.addEventListener('load', () => {
        document.body.style.opacity = '1';
    });
}

// Floating hearts animation
setInterval(() => {
    if (Math.random() > config.heartCreationChance) {
        animations.createHeart();
    }
}, config.heartCreationInterval);

// Initialize the application
function initialize() {
    // Add floating animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0% {
                transform: rotate(45deg) translateY(0) translateX(0);
                opacity: 1;
            }
            100% {
                transform: rotate(45deg) translateY(-100vh) translateX(${Math.random() * 200 - 100}px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Preload images
    elements.galleryItems.forEach(item => {
        const img = item.querySelector('img');
        if (img) {
            const temp = new Image();
            temp.src = img.src;
        }
    });

    // Initialize event listeners
    initializeEventListeners();
}

// Start the application
initialize();