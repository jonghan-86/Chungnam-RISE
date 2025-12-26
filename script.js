document.addEventListener('DOMContentLoaded', () => {
    console.log('Script loaded and DOM ready');

    // =========================================================
    // 1. Mobile Hamburger Menu Logic
    // =========================================================
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li a');

    // Create overlay if it doesn't exist yet (backup)
    let overlay = document.querySelector('.body-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.classList.add('body-overlay');
        document.body.appendChild(overlay);
        console.log('Created overlay element via JS');
    }

    function toggleMenu() {
        console.log('Toggle menu clicked');
        if (!hamburger || !navLinks) {
            console.error('Hamburger or NavLinks element missing');
            return;
        }

        const isActive = navLinks.classList.contains('active');

        if (!isActive) {
            // Open Menu
            hamburger.classList.add('active');
            navLinks.classList.add('active');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        } else {
            // Close Menu
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
        }
    }

    if (hamburger) {
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent immediate bubbling if that was an issue
            toggleMenu();
        });
    } else {
        console.warn('Hamburger element (.hamburger) not found in the DOM.');
    }

    // Close menu when clicking the overlay
    if (overlay) {
        overlay.addEventListener('click', toggleMenu);
    }

    // Close menu when clicking any navigation link
    links.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks && navLinks.classList.contains('active')) {
                toggleMenu();
            }
        });
    });


    // =========================================================
    // 2. Horizontal Scroll Indicators (Dots)
    // =========================================================
    // Select all grids that are expected to have horizontal scrolling on mobile
    // Select all grids that are expected to have horizontal scrolling on mobile
    const grids = document.querySelectorAll('.recruit-premium-grid, .curriculum-grid, .reviews-grid, .success-points-grid, .track-grid, .extra-grid, .stats-grid, .scholarship-structure');

    grids.forEach(grid => {
        // Find the indicators container (should be the immediate next sibling)
        const indicatorsContainer = grid.nextElementSibling;

        if (!indicatorsContainer || !indicatorsContainer.classList.contains('scroll-indicators')) {
            // If strictly next sibling logic fails, try querySelector in parent?
            // For now, let's stick to the structure we built.
            // console.log('No scroll-indicators found for grid', grid);
            return;
        }

        const cards = grid.children;
        const cardCount = cards.length;
        if (cardCount === 0) return;

        // Reset and create dots
        indicatorsContainer.innerHTML = '';
        for (let i = 0; i < cardCount; i++) {
            const dot = document.createElement('div');
            dot.classList.add('scroll-dot');
            if (i === 0) dot.classList.add('active');
            indicatorsContainer.appendChild(dot);
        }

        const dots = indicatorsContainer.querySelectorAll('.scroll-dot');

        // Update dots on scroll
        let isScrolling; // For debouncing
        grid.addEventListener('scroll', () => {
            window.clearTimeout(isScrolling);

            isScrolling = setTimeout(() => {
                const scrollLeft = grid.scrollLeft;
                // Estimate active index based on the first card's width + gap
                // We use offsetWidth of the first card.
                const firstCard = cards[0];
                if (firstCard) {
                    const cardWidth = firstCard.offsetWidth + 16; // 16px is roughly 1rem gap
                    const activeIndex = Math.round(scrollLeft / cardWidth);

                    dots.forEach((dot, idx) => {
                        if (idx === activeIndex) {
                            dot.classList.add('active');
                        } else {
                            dot.classList.remove('active');
                        }
                    });
                }
            }, 50); // 50ms debounce for performance
        }, { passive: true });
    });
});
