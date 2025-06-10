
        /* ======================================================================
           MAIN SCRIPT FILE
           - All functionality in one file for portability
           - Well-commented and organized
        ====================================================================== */

        // Wait for DOM to be fully loaded
        document.addEventListener('DOMContentLoaded', function () {
            // Set current year in footer
            document.getElementById('year').textContent = new Date().getFullYear();

            // Remove preloader when page loads
            window.addEventListener('load', function () {
                const preloader = document.getElementById('preloader');
                setTimeout(() => {
                    preloader.style.opacity = '0';
                    setTimeout(() => {
                        preloader.style.display = 'none';
                    }, 500);
                }, 500);
            });

            // Mobile navigation toggle
            const hamburger = document.querySelector('.hamburger');
            const navLinks = document.querySelector('.nav-links');

            hamburger.addEventListener('click', function () {
                navLinks.classList.toggle('active');
                hamburger.classList.toggle('active');
            });

            // Close mobile menu when clicking a link
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.addEventListener('click', function () {
                    navLinks.classList.remove('active');
                    hamburger.classList.remove('active');
                });
            });

            // Theme toggle functionality
            const themeToggle = document.querySelector('.theme-toggle');
            const currentTheme = localStorage.getItem('theme') || 'light';

            // Set initial theme
            if (currentTheme === 'dark') {
                document.body.setAttribute('data-theme', 'dark');
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            }

            // Toggle theme
            themeToggle.addEventListener('click', function () {
                const currentTheme = document.body.getAttribute('data-theme');

                if (currentTheme === 'dark') {
                    document.body.removeAttribute('data-theme');
                    localStorage.setItem('theme', 'light');
                    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
                } else {
                    document.body.setAttribute('data-theme', 'dark');
                    localStorage.setItem('theme', 'dark');
                    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
                }
            });

            // Smooth scrolling for navigation links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();

                    const targetId = this.getAttribute('href');
                    if (targetId === '#') return;

                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        window.scrollTo({
                            top: targetElement.offsetTop - 70,
                            behavior: 'smooth'
                        });
                    }
                });
            });

            // Highlight active navigation item on scroll
            const sections = document.querySelectorAll('section');
            const navItems = document.querySelectorAll('.nav-links a');

            function highlightNav() {
                let current = '';

                sections.forEach(section => {
                    const sectionTop = section.offsetTop;
                    const sectionHeight = section.clientHeight;

                    if (pageYOffset >= sectionTop - 100 && pageYOffset < sectionTop + sectionHeight - 100) {
                        current = section.getAttribute('id');
                    }
                });

                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === `#${current}`) {
                        item.classList.add('active');
                    }
                });
            }

            window.addEventListener('scroll', highlightNav);
            highlightNav(); // Run once on load

            // Back to top button
            const backToTop = document.querySelector('.back-to-top');

            window.addEventListener('scroll', function () {
                if (window.pageYOffset > 300) {
                    backToTop.classList.add('active');
                } else {
                    backToTop.classList.remove('active');
                }
            });

            // Testimonial carousel
            const testimonialSlider = document.querySelector('.testimonials-slider');
            const testimonialDots = document.querySelectorAll('.testimonial-dot');
            let currentTestimonial = 0;

            function showTestimonial(index) {
                testimonialSlider.style.transform = `translateX(-${index * 100}%)`;

                testimonialDots.forEach(dot => dot.classList.remove('active'));
                testimonialDots[index].classList.add('active');

                currentTestimonial = index;
            }

            testimonialDots.forEach(dot => {
                dot.addEventListener('click', function () {
                    const index = parseInt(this.getAttribute('data-index'));
                    showTestimonial(index);
                });
            });

            // Auto-rotate testimonials
            let testimonialInterval = setInterval(() => {
                let nextIndex = (currentTestimonial + 1) % testimonialDots.length;
                showTestimonial(nextIndex);
            }, 5000);

            // Pause auto-rotation on hover
            const testimonialsContainer = document.querySelector('.testimonials-container');

            testimonialsContainer.addEventListener('mouseenter', () => {
                clearInterval(testimonialInterval);
            });

            testimonialsContainer.addEventListener('mouseleave', () => {
                testimonialInterval = setInterval(() => {
                    let nextIndex = (currentTestimonial + 1) % testimonialDots.length;
                    showTestimonial(nextIndex);
                }, 5000);
            });

            // Blog posts data and rendering
            const blogPosts = [
                {
                    id: 1,
                    title: "Confessions of a Caffeine-Crazed Coder ☕️💻",
                    date: "April 2, 2025",
                    image: "images/blog1.png",
                    excerpt: "Surviving all-nighters fueled by coffee, pizza, and existential dread 😂",
                    content: "<p>If code is art, coffee is its cringe soundtrack. Here’s the tea on all-nighters: first sip at midnight, frantically hunting braces at 2 AM, and questioning your life choices by 4 AM ⏰.</p><p>We break down the five stages of coder grief: ‘I got this,’ ‘Maybe a snack,’ ‘Why is the screen blinking?’ ‘Existential panic,’ and finally ‘Ship it (or fake it).’</p><p>Peek at emergency hacks like power-nap scheduling, strategic snack stashes, and writing comments that still make sense when you’ve hallucinated semicolons. By dawn, you’ll either have a working prototype—or at least a half-empty travel mug and a story to flex on Slack.</p>"
                },
                {
                    id: 2,
                    title: "AI Overlords or That Know-It-All Roomie? 🤖🏠",
                    date: "February 24, 2025",
                    image: "images/blog2.png",

                    excerpt: "Living with AI that critiques your code style, your playlist, even your snack game 😅",
                    content: "<p>Remember when autocorrect was annoying? Now imagine an AI that roasts your commit messages, schedules a meeting at 3 AM 'cause your calendar was empty, and judges your ramen choices 🍜.</p><p>We’re diving into LOL-worthy real-life examples—like your chatbot rewriting your sleek algorithm into spaghetti code, or it double-booking you because ‘logical optimization.’</p><p>Learn the art of shady comebacks (“Thanks, but I’ve got this”), how to mute politely, and why every coder needs a ‘nevermind, I’ll handle it’ button. Coexist with your digital roommate without drafting a formal eviction notice 😉.</p>"
                },
                {
                    id: 3,
                    title: "When Your Code Ghosts You Like 💀",
                    date: "December 27, 2024",
                    image: "images/blog3.png",
                    excerpt: "That moment your code dips on you and you're left screaming at your screen 😭",
                    content: "<p>Ever had your code peace out like a flaky friend? One second you’re vibing, next second 'NullPointerException' hits and you’re like big yikes 💀.</p><p>I'm spilling the tea on classic debugging drama: 'works on my machine' flex, the legendary missing semicolon hunt, and the StackOverflow spiral where one bug breeds ten more. Plus, survival hacks like naming your variables something you can actually pronounce (sorry, x1y2z3).</p><p>By the end, you’ll be armed with coffee-fueled rituals, your trusty rubber duck, and maybe even a victory dance when it finally runs. Let’s get this bread (and squash that bug)!</p>"
                }



            ];

            // Render blog posts
            const blogPostsContainer = document.getElementById('blogPostsContainer');
            blogPosts.forEach(post => {
                const blogCard = document.createElement('div');
                blogCard.className = 'blog-card hidden';
                blogCard.innerHTML = `
                <div class="blog-img">
                            <img src="${post.image}" alt="${post.title}"></div>
                <div class="blog-content">
                    <p class="blog-date">${post.date}</p>
                    <h3 class="blog-title">${post.title}</h3>
                    <p class="blog-excerpt">${post.excerpt}</p>
                    <button class="read-more" data-id="${post.id}">
                        Read More <i class="fas fa-arrow-right"></i>
                    </button>
                </div>
                `;
                blogPostsContainer.appendChild(blogCard);
            });

            // Animate blog cards on scroll
            const blogCards = document.querySelectorAll('.blog-card');

            const blogObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('show');
                        blogObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });

            blogCards.forEach(card => {
                blogObserver.observe(card);
            });

            // Blog modal functionality
            const blogModal = document.getElementById('blogModal');
            const modalTitle = document.getElementById('modalTitle');
            const modalDate = document.getElementById('modalDate');
            const modalBody = document.getElementById('modalBody');
            const modalClose = document.querySelector('.modal-close');

            document.addEventListener('click', function (e) {
                if (e.target.classList.contains('read-more')) {
                    e.preventDefault();
                    const postId = parseInt(e.target.getAttribute('data-id'));
                    const post = blogPosts.find(p => p.id === postId);

                    if (post) {
                        modalTitle.textContent = post.title;
                        modalDate.textContent = post.date;
                        modalBody.innerHTML = `
                <div class="modal-image" style="background-image: url('${post.image}')"></div>
                ${post.content}
            `;
                        blogModal.classList.add('active');
                        document.body.style.overflow = 'hidden';
                    }
                }

                if (e.target === blogModal || e.target.closest('.modal-close')) {
                    blogModal.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });

            // Contact form validation and submission
            const contactForm = document.getElementById('contactForm');
            const formMessage = document.getElementById('formMessage');

            contactForm.addEventListener('submit', function (e) {
                e.preventDefault();

                // Simple validation
                const name = document.getElementById('name').value.trim();
                const email = document.getElementById('email').value.trim();
                const message = document.getElementById('message').value.trim();

                if (!name || !email || !message) {
                    formMessage.textContent = 'Please fill in all fields.';
                    formMessage.className = 'form-message error';
                    return;
                }

                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                    formMessage.textContent = 'Please enter a valid email address.';
                    formMessage.className = 'form-message error';
                    return;
                }

                // Simulate form submission
                formMessage.textContent = 'Your message has been sent successfully!';
                formMessage.className = 'form-message success';
                contactForm.reset();

                // In a real implementation, you would send the form data to a server here
                // Example using fetch():
                /*
                fetch('your-endpoint', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: name,
                        email: email,
                        message: message
                    })
                })
                .then(response => response.json())
                .then(data => {
                    formMessage.textContent = 'Your message has been sent successfully!';
                    formMessage.className = 'form-message success';
                    contactForm.reset();
                })
                .catch(error => {
                    formMessage.textContent = 'There was an error sending your message. Please try again later.';
                    formMessage.className = 'form-message error';
                });
                */
            });

            // 3D tilt effect for project cards
            const projectCards = document.querySelectorAll('.project-card');

            projectCards.forEach(card => {
                card.addEventListener('mousemove', function (e) {
                    const x = e.clientX - card.getBoundingClientRect().left;
                    const y = e.clientY - card.getBoundingClientRect().top;

                    const centerX = card.offsetWidth / 2;
                    const centerY = card.offsetHeight / 2;

                    const angleX = (y - centerY) / 20;
                    const angleY = (centerX - x) / 20;

                    card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale(1.05)`;
                    card.style.boxShadow = `${-angleY * 2}px ${angleX * 2}px 30px rgba(0, 0, 0, 0.2)`;
                });

                card.addEventListener('mouseleave', function () {
                    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
                    card.style.boxShadow = 'var(--card-shadow)';
                });
            });

            // Animate skill bars on scroll
            const skillBars = document.querySelectorAll('.skill-progress');

            const skillsObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const width = entry.target.style.width;
                        entry.target.style.width = '0';
                        setTimeout(() => {
                            entry.target.style.width = width;
                        }, 100);
                        skillsObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });

            skillBars.forEach(bar => {
                skillsObserver.observe(bar);
            });

            // Intersection Observer for general animations
            const hiddenElements = document.querySelectorAll('.hidden');

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('show');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });

            hiddenElements.forEach(el => {
                observer.observe(el);
            });
        });
