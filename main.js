// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Scroll indicator functionality
    const scrollIndicator = document.getElementById('scrollIndicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function () {
            const servicesSection = document.getElementById('services');
            if (servicesSection) {
                servicesSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Hide scroll indicator when user scrolls down
        if (scrollIndicator) {
            if (currentScroll > 100) {
                scrollIndicator.style.opacity = '0';
                scrollIndicator.style.pointerEvents = 'none';
            } else {
                scrollIndicator.style.opacity = '1';
                scrollIndicator.style.pointerEvents = 'auto';
            }
        }
    });

    // Animate statistics circles when they come into view
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const statObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStatCircle(entry.target);
                statObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all stat circles
    document.querySelectorAll('.stat-circle').forEach(circle => {
        statObserver.observe(circle);
    });

    // Function to animate stat circles
    function animateStatCircle(circle) {
        const targetValue = parseInt(circle.dataset.value);
        const numberElement = circle.querySelector('.stat-number');
        let currentValue = 0;
        const increment = targetValue / 50;
        const timer = setInterval(() => {
            currentValue += increment;
            if (currentValue >= targetValue) {
                currentValue = targetValue;
                clearInterval(timer);
            }
            numberElement.textContent = Math.floor(currentValue) + '%';
        }, 30);
    }

    // Lazy loading for images
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    // Observe all images
    document.querySelectorAll('img').forEach(img => {
        imageObserver.observe(img);
    });
});
