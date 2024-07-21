document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.getElementById('nav-links');

    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const toggleImage = navToggle.querySelector('img');
        if (navLinks.classList.contains('active')) {
            toggleImage.src = 'Image/close-icon.png';
        } else {
            toggleImage.src = 'Image/menu-icon.png';
        }
    });

    document.addEventListener('click', (event) => {
        if (!navLinks.contains(event.target) && !navToggle.contains(event.target)) {
            navLinks.classList.remove('active');
            navToggle.querySelector('img').src = 'Image/menu-icon.png';
        }
    });

    const slides = document.querySelectorAll('.slide');
    const nextButton = document.getElementById('next');
    const prevButton = document.getElementById('prev');
    const controlButtons = document.querySelectorAll('.control-button');
    const navbar = document.getElementById('navbar');
    let currentSlide = 0;
    let lastScrollTop = 0;
    let autoSlideInterval;

    const showSlide = (index) => {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (i === index) {
                slide.classList.add('active');
            }
        });

        const currentSlideElement = slides[index];
        const contentElements = currentSlideElement.querySelectorAll('.animate-content');
        
        contentElements.forEach((content) => {
            content.classList.add('active');
        });

        controlButtons.forEach((button, i) => {
            button.classList.toggle('active', i === index);
        });
    };

    const nextSlide = () => {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    };

    const prevSlide = () => {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    };

    nextButton.addEventListener('click', () => {
        nextSlide();
        resetAutoSlide();
    });
    prevButton.addEventListener('click', () => {
        prevSlide();
        resetAutoSlide();
    });

    const handleScroll = () => {
        const slide1Inner = document.getElementById('inner1');
        const slide2Inner = document.getElementById('inner2');
        const scrollTop = window.scrollY;

        if (scrollTop > window.innerHeight) {
            slide1Inner.classList.add('hidden');
            slide2Inner.classList.add('hidden');
        } else {
            slide1Inner.classList.remove('hidden');
            slide2Inner.classList.remove('hidden');
        }

        // Show navbar only when scrolling up
        if (scrollTop < lastScrollTop) {
            navbar.classList.add('visible');
        } else {
            navbar.classList.remove('visible');
        }

        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
    };

    window.addEventListener('scroll', handleScroll);

    const resetAutoSlide = () => {
        clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(nextSlide, 10000);
    };

    showSlide(currentSlide);
    autoSlideInterval = setInterval(nextSlide, 10000); // Auto-slide every 5 seconds
});
