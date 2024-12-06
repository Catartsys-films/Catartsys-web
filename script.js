// Hero Video Setup
const heroContainer = document.getElementById('hero-video-container');
let heroPlayer;

// Initialize hero video from Vimeo
const options = {
    id: 530017940,
    background: true,
    responsive: true,
    autoplay: true,
    loop: true,
    muted: true
};

heroPlayer = new Vimeo.Player(heroContainer, options);

// Sound Toggle Functionality
const soundToggle = document.getElementById('sound-toggle');
const soundIcon = soundToggle.querySelector('i');
let isMuted = true;

soundToggle.addEventListener('click', () => {
    isMuted = !isMuted;
    heroPlayer.setVolume(isMuted ? 0 : 1);
    soundIcon.className = isMuted ? 'bi bi-volume-mute-fill' : 'bi bi-volume-up-fill';
});

// Initialize Vimeo Grid Videos
document.querySelectorAll('.video-container[data-vimeo-id]').forEach(container => {
    const videoId = container.dataset.vimeoId;
    new Vimeo.Player(container, {
        id: videoId,
        responsive: true,
        autoplay: false,
        loop: false,
        muted: true
    });
});

// Initialize YouTube Vertical Videos
function loadYouTubeAPI() {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

function onYouTubeIframeAPIReady() {
    document.querySelectorAll('.vertical-video-container[data-youtube-id]').forEach(container => {
        const videoId = container.dataset.youtubeId;
        new YT.Player(container, {
            videoId: videoId,
            playerVars: {
                autoplay: 0,
                controls: 1,
                modestbranding: 1,
                rel: 0
            }
        });
    });
}

loadYouTubeAPI();

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Active link on scroll
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});
