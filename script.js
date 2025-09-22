document.addEventListener("DOMContentLoaded", function() {
    const canvas = document.getElementById('sparkles-canvas');
    const ctx = canvas.getContext('2d');

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const numSparkles = 100;
    const sparkles = [];

    class Sparkle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.size = Math.random() * 2 + 0.5;
            this.opacity = Math.random();
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
            ctx.fill();
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x < 0 || this.x > width) this.speedX *= -1;
            if (this.y < 0 || this.y > height) this.speedY *= -1;
        }
    }

    function init() {
        for (let i = 0; i < numSparkles; i++) {
            sparkles.push(new Sparkle());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);
        sparkles.forEach(sparkle => {
            sparkle.update();
            sparkle.draw();
        });
    }

    init();
    gsap.ticker.add(animate);

    // Animation for title and quote
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.to(".title", { opacity: 1, y: 0, duration: 1.2 })
      .to(".quote", { opacity: 1, y: 0, duration: 1.2 }, "-=0.8")
      .to(".navbar", { y: 0, duration: 1.2, ease: "bounce.out" }, "-=0.7");

    // Hamburger menu toggle
    const toggleButton = document.querySelector('.toggle-button');
    const navbarLinks = document.querySelector('.navbar-links');

    toggleButton.addEventListener('click', (e) => {
        e.preventDefault();
        navbarLinks.classList.toggle('active');
        toggleButton.classList.toggle('active');
    });

    // Register ScrollTrigger Plugin
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    // --- SMOOTH SCROLL FOR NAV LINKS ---
    const navLinks = document.querySelectorAll('.navbar-links a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute("href");

            if (navbarLinks.classList.contains('active')) {
                navbarLinks.classList.remove('active');
                toggleButton.classList.remove('active');
            }

            if (document.querySelector(targetId)) {
                // Get the actual navbar dimensions for precise calculation
                const navbar = document.querySelector('.navbar');
                const navbarHeight = navbar.offsetHeight;
                const navbarTop = 20; // Fixed top position from CSS
                
                // Calculate exact offset to position section title just below navbar
                const totalNavbarSpace = navbarHeight + navbarTop + 10; // 10px buffer
                
                gsap.to(window, {
                    duration: 1.5,
                    ease: 'power2.inOut',
                    scrollTo: {
                        y: targetId,
                        offsetY: totalNavbarSpace
                    }
                });
            }
        });
    });

    // --- CLIENTS SECTION ANIMATIONS ---
    gsap.to(".clients-title", {
        scrollTrigger: {
            trigger: ".clients-section",
            start: "top 80%",
            toggleActions: "play none none none",
            once: true
        },
        duration: 1.5,
        rotateX: 0,
        opacity: 1,
        ease: "power3.out"
    });

    gsap.from(".logo-scroller", {
        scrollTrigger: {
            trigger: ".clients-section",
            start: "top 70%",
            toggleActions: "play none none none",
            once: true
        },
        duration: 1.2,
        opacity: 0,
        y: 50,
        ease: "power2.out"
    });


    // --- SERVICES SECTION ANIMATIONS ---
    gsap.to(".services-title", {
        scrollTrigger: {
            trigger: ".services-section",
            start: "top 80%",
            toggleActions: "play none none none",
            once: true
        },
        duration: 1.5,
        rotateX: 0,
        opacity: 1,
        ease: "power3.out"
    });

    gsap.to(".service-card", {
        scrollTrigger: {
            trigger: ".services-container",
            start: "top 80%",
            toggleActions: "play none none none",
            once: true
        },
        duration: 1,
        translateY: 0,
        opacity: 1,
        stagger: 0.2,
        ease: "power2.out"
    });

    // --- ENHANCED PROCESS SECTION ANIMATIONS ---
    const processTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: ".process-section",
            start: "top 70%",
            toggleActions: "play none none none",
            once: true
        }
    });

    // 1. Process Title Animation
    processTimeline.to(".process-title", {
        duration: 1.5,
        rotateX: 0,
        opacity: 1,
        ease: "power3.out"
    });

    // 2. Underline Animation
    processTimeline.to(".underline", {
        duration: 1,
        scaleX: 1,
        ease: "power2.out"
    }, "-=1");

    // Responsive Process Animations
    ScrollTrigger.matchMedia({
        // Desktop Process Animation
        "(min-width: 769px)": function() {
            const hangingContainer = document.querySelector('.hanging-container.desktop-only');
            const threadLine = document.querySelector('.thread-line');
            const processBoard = document.querySelector('.process-board');
            const processSteps = document.querySelectorAll('.process-step');

            if (!hangingContainer || !threadLine || !processBoard) return;

            // Set initial position
            gsap.set(hangingContainer, {
                top: '100%',
                opacity: 1
            });

            // Desktop Animation Sequence
            const desktopTl = gsap.timeline({
                scrollTrigger: {
                    trigger: ".underline",
                    start: "bottom 80%",
                    toggleActions: "play none none none",
                    once: true
                },
                delay: 0.5
            });

            // 1. Thread Drawing Animation
            desktopTl.to(threadLine, {
                strokeDashoffset: 0,
                duration: 1.2,
                ease: "power2.out"
            });

            // 2. Board Bubble Animation (appears and scales up)
            desktopTl.fromTo(processBoard, 
                { 
                    opacity: 0, 
                    scale: 0.3, 
                    y: -50,
                    rotateX: 90 
                },
                { 
                    opacity: 1, 
                    scale: 1, 
                    y: 0,
                    rotateX: 0,
                    duration: 1,
                    ease: "back.out(1.7)"
                }, 
                "-=0.4"
            );

            // 3. Process Steps Staggered Animation
            desktopTl.to(processSteps, {
                opacity: 1,
                y: 0,
                stagger: 0.15,
                duration: 0.8,
                ease: "power2.out"
            }, "-=0.6");

            // 4. Continuous Swaying Motion (only rotation, no horizontal movement)
            const swayTl = gsap.timeline({ repeat: -1, yoyo: true });
            
            swayTl.to(processBoard, {
                rotation: 3,
                duration: 3,
                ease: "sine.inOut"
            })
            .to(processBoard, {
                rotation: -3,
                duration: 3,
                ease: "sine.inOut"
            });

            // Start swaying after initial animation
            desktopTl.add(swayTl, "+=0.5");
        },

        // Mobile Process Animation
        "(max-width: 768px)": function() {
            const mobileContainer = document.querySelector('.mobile-thread-container');
            const mobileThreadLine = document.querySelector('.mobile-thread-line');
            const mobileBoard = document.querySelector('.mobile-process-board');
            const mobileSteps = document.querySelectorAll('.mobile-process-step');

            if (!mobileContainer || !mobileThreadLine || !mobileBoard) return;

            // Mobile Animation Sequence
            const mobileTl = gsap.timeline({
                scrollTrigger: {
                    trigger: ".underline",
                    start: "bottom 85%",
                    toggleActions: "play none none none",
                    once: true
                },
                delay: 0.3
            });

            // 1. Mobile Thread Drawing (shorter)
            mobileTl.to(mobileThreadLine, {
                strokeDashoffset: 0,
                duration: 0.8,
                ease: "power2.out"
            });

            // 2. Board Bubble Animation
            mobileTl.fromTo(mobileBoard, 
                { 
                    opacity: 0, 
                    scale: 0.4, 
                    y: -30,
                    rotateX: 45 
                },
                { 
                    opacity: 1, 
                    scale: 1, 
                    y: 0,
                    rotateX: 0,
                    duration: 0.9,
                    ease: "back.out(1.5)"
                }, 
                "-=0.3"
            );

            // 3. Mobile Steps Animation
            mobileTl.to(mobileSteps, {
                opacity: 1,
                x: 0,
                stagger: 0.1,
                duration: 0.6,
                ease: "power2.out"
            }, "-=0.4");

            // 4. Mobile Swaying Motion (only rotation, more gentle)
            const mobileSwayTl = gsap.timeline({ repeat: -1, yoyo: true });
            
            mobileSwayTl.to(mobileBoard, {
                rotation: 2,
                duration: 2.5,
                ease: "sine.inOut"
            })
            .to(mobileBoard, {
                rotation: -2,
                duration: 2.5,
                ease: "sine.inOut"
            });

            // Start mobile swaying
            mobileTl.add(mobileSwayTl, "+=0.3");
        }
    });

    // Add hover effects for desktop process steps
    if (window.innerWidth > 768) {
        const processSteps = document.querySelectorAll('.process-step');
        
        processSteps.forEach(step => {
            const icon = step.querySelector('.process-icon');
            
            step.addEventListener('mouseenter', () => {
                gsap.to(icon, {
                    scale: 1.2,
                    y: -5,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
            
            step.addEventListener('mouseleave', () => {
                gsap.to(icon, {
                    scale: 1,
                    y: 0,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
        });
    }

    // --- WORKS SECTION ---
    // GSAP Animation for the title
    gsap.to(".works-title", {
        scrollTrigger: {
            trigger: ".works-section",
            start: "top 80%",
            toggleActions: "play none none none",
            once: true
        },
        duration: 1.5,
        rotateX: 0,
        opacity: 1,
        ease: "power3.out"
    });

    // Isotope Initialization
    const $grid = $('.works-grid').isotope({
        itemSelector: '.work-item',
        layoutMode: 'fitRows', // Use fitRows to arrange items in rows
        transitionDuration: '0.6s'
    });

    // Re-layout Isotope on window resize (debounced)
    let resizeTimer;
    $(window).on('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            $grid.isotope('layout');
        }, 250);
    });

    // Filter button click handler
    $('.filter-buttons').on('click', 'button', function() {
        const filterValue = $(this).attr('data-filter');
        $grid.isotope({ filter: filterValue });

        // Active button state
        $('.filter-btn').removeClass('active');
        $(this).addClass('active');
    });

    // --- ABOUT US SECTION ANIMATIONS ---
    const aboutUsTl = gsap.timeline({
        scrollTrigger: {
            trigger: ".about-us-section",
            start: "top 70%",
            toggleActions: "play none none none",
            once: true
        }
    });

    // 1. Title reveals
    aboutUsTl.to(".about-us-title", {
        duration: 1.5,
        rotateX: 0,
        opacity: 1,
        ease: "power3.out"
    });

    // 2. Nail appears
    aboutUsTl.to(".about-us-section .nail", {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        ease: "back.out(1.7)"
    }, "-=1");

    // 3. Threads draw down
    aboutUsTl.to([".about-us-section .thread-left", ".about-us-section .thread-right"], {
        strokeDashoffset: 0,
        duration: 1,
        ease: "power2.out"
    }, "-=0.7");

    // 4. Board drops and reveals
    aboutUsTl.to(".about-us-board", {
        opacity: 1,
        y: 0, 
        duration: 1,
        ease: "power2.out"
    }, "-=0.5");

    // 5. Details fade in
    aboutUsTl.to(".detail-box", {
        opacity: 1,
        y: 0,
        stagger: 0.3,
        duration: 0.8,
        ease: "power2.out"
    }, "-=0.4");

    // --- OUR TEAM SECTION ANIMATIONS ---
    const teamTl = gsap.timeline({
        scrollTrigger: {
            trigger: ".team-section",
            start: "top 70%",
            toggleActions: "play none none none",
            once: true
        }
    });

    // 1. Title reveals
    teamTl.to(".team-heading", {
        duration: 1.5,
        rotateX: 0,
        opacity: 1,
        ease: "power3.out"
    });

    // 2. Nail appears
    teamTl.to(".team-section .nail", {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        ease: "back.out(1.7)"
    }, "-=1");

    // 3. Threads draw down
    teamTl.to([".team-section .thread-left", ".team-section .thread-right"], {
        strokeDashoffset: 0,
        duration: 1,
        ease: "power2.out"
    }, "-=0.7");

    // 4. Board drops and reveals
    teamTl.to(".team-board", {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out"
    }, "-=0.5");

    // 5. Team cards appear and then trigger flip
    teamTl.to(".team-card", {
        opacity: 1,
        y: 0,
        stagger: 0.3,
        duration: 0.8,
        ease: "power2.out",
        onComplete: function() {
            // Target the inner container for the flip animation
            const teamCardInners = document.querySelectorAll('.team-card-inner');
            gsap.to(teamCardInners, {
                rotateY: 180, // Flip to reveal the back
                duration: 0.5, // Faster flip
                ease: "back.out(1.7)", // Snappier ease for a nice effect
                stagger: 0.2
            });
        }
    }, "-=0.4");

    // --- CONTACT US SECTION ANIMATIONS ---
    const contactTl = gsap.timeline({
        scrollTrigger: {
            trigger: ".contact-section",
            start: "top 70%",
            toggleActions: "play none none none",
            once: true
        }
    });

    contactTl.to(".contact-title", {
        duration: 1.5,
        rotateX: 0,
        opacity: 1,
        ease: "power3.out"
    });

    contactTl.to(".contact-card", {
        duration: 1,
        translateY: 0,
        opacity: 1,
        stagger: 0.2,
        ease: "power2.out"
    }, "-=1");

    // --- FOOTER ANIMATION ---
    gsap.to(".site-footer", {
        scrollTrigger: {
            trigger: ".site-footer",
            start: "top 95%",
            toggleActions: "play none none none",
            once: true
        },
        duration: 1.2,
        y: 0,
        opacity: 1,
        ease: "power3.out"
    });
    
    // --- [FINAL FIX] ROBUST SCROLL HANDLING FOR WORKS SECTION ---
    const worksGridWrapper = document.querySelector('.works-grid-wrapper');
    if (worksGridWrapper) {

        // --- MOUSE WHEEL / TRACKPAD HANDLING (Laptops, Desktops) ---
        worksGridWrapper.addEventListener('wheel', (event) => {
            const el = worksGridWrapper;
            const scrollAmount = event.deltaY;
            const isAtTop = el.scrollTop === 0;
            const isAtBottom = Math.abs(el.scrollHeight - el.clientHeight - el.scrollTop) < 1;

            // If scrolling DOWN (positive deltaY) AND we are at the BOTTOM
            if (scrollAmount > 0 && isAtBottom) {
                // Prevent the default scroll on the element, which would do nothing and get "stuck"
                event.preventDefault();
                // Manually scroll the main window
                window.scrollBy(0, scrollAmount);
            }
            // If scrolling UP (negative deltaY) AND we are at the TOP
            else if (scrollAmount < 0 && isAtTop) {
                // Prevent the default scroll on the element
                event.preventDefault();
                // Manually scroll the main window
                window.scrollBy(0, scrollAmount);
            }
            // If we are scrolling in the middle, the browser's default behavior is fine.
        });


        // --- TOUCH HANDLING (Mobile, Tablets) ---
        let touchStartY = 0;

        worksGridWrapper.addEventListener('touchstart', (event) => {
            // Record the starting touch position
            touchStartY = event.touches[0].clientY;
        }, { passive: true });

        worksGridWrapper.addEventListener('touchmove', (event) => {
            const el = worksGridWrapper;
            const currentY = event.touches[0].clientY;
            const scrollDirection = touchStartY - currentY; // positive = scrolling down, negative = scrolling up

            const isAtTop = el.scrollTop === 0;
            const isAtBottom = Math.abs(el.scrollHeight - el.clientHeight - el.scrollTop) < 1;

            // If trying to scroll DOWN (positive direction) while at the BOTTOM
            if (scrollDirection > 0 && isAtBottom) {
                // Allow the default behavior, which on most mobile browsers is to
                // transfer the scroll to the parent (scroll chaining). We don't preventDefault here.
                return;
            }
            // If trying to scroll UP (negative direction) while at the TOP
            else if (scrollDirection < 0 && isAtTop) {
                // Allow the default behavior to scroll the main page up.
                return;
            }
            
            // If the user is actively scrolling within the element, we need to
            // stop the main page from moving to prevent a jarring experience.
            event.stopPropagation();
        });
    }


    // --- DYNAMIC YEAR ---
    const yearSpan = document.getElementById("current-year");
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});
