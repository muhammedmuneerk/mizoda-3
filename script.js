document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.header');
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    const reviewSlider = document.querySelector('.review-slider');
    const themeToggle = document.querySelector('.theme-toggle');
    const voiceSearchBtn = document.querySelector('.voice-search');
    const shareBtn = document.querySelector('.share-btn');
    const loadMoreBtn = document.getElementById('load-more-products');
    const scrollProgress = document.querySelector('.scroll-progress');
    const fabToggle = document.querySelector('.fab-toggle');
    const fabOptions = document.querySelector('.fab-options');
    const chatbotToggle = document.querySelector('.chatbot-toggle');
    const chatbotContainer = document.querySelector('.chatbot-container');
    const chatbotClose = document.querySelector('.chatbot-close');
    const chatbotForm = document.querySelector('.chatbot-input');
    const chatbotMessages = document.querySelector('.chatbot-messages');

    // Responsive navigation
    const toggleMenu = () => {
        nav.classList.toggle('active');
        menuToggle.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    
        // Prevent body scroll when menu is open
        if (nav.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    };

    menuToggle.addEventListener('click', toggleMenu);

    // Close menu when clicking a nav link
    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && !menuToggle.contains(e.target) && nav.classList.contains('active')) {
            toggleMenu();
        }
    });

    // Scroll progress indicator
    window.addEventListener('scroll', () => {
        const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        scrollProgress.style.width = scrollPercentage + '%';
    });

    // Theme toggle
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
        updateChartColors();
    });

    // Check for saved theme preference or use light theme as default
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }

    // Sticky header
    const stickyHeader = () => {
        if (window.scrollY > 100) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    };

    window.addEventListener('scroll', stickyHeader);

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = header.offsetHeight;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollBy({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                if (nav.classList.contains('active')) {
                    toggleMenu();
                }
            }
        });
    });

    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                entry.target.classList.add('slide-in');
            }
        });
    }, { threshold: 0.1 });

    animatedElements.forEach(el => observer.observe(el));

    // Parallax effect for hero image
    const parallax = () => {
        const heroImage = document.querySelector('.hero-image');
        const scrollPosition = window.pageYOffset;
        heroImage.style.transform = `translateY(${scrollPosition * 0.5}px)`;
    };

    window.addEventListener('scroll', parallax);

    // Review slider with touch support
    let isDown = false;
    let startX;
    let scrollLeft;

    reviewSlider.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - reviewSlider.offsetLeft;
        scrollLeft = reviewSlider.scrollLeft;
    });

    reviewSlider.addEventListener('touchstart', (e) => {
        isDown = true;
        startX = e.touches[0].pageX - reviewSlider.offsetLeft;
        scrollLeft = reviewSlider.scrollLeft;
    });

    reviewSlider.addEventListener('mouseleave', () => {
        isDown = false;
    });

    reviewSlider.addEventListener('mouseup', () => {
        isDown = false;
    });

    reviewSlider.addEventListener('touchend', () => {
        isDown = false;
    });

    reviewSlider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - reviewSlider.offsetLeft;
        const walk = (x - startX) * 2;
        reviewSlider.scrollLeft = scrollLeft - walk;
    });

    reviewSlider.addEventListener('touchmove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.touches[0].pageX - reviewSlider.offsetLeft;
        const walk = (x - startX) * 2;
        reviewSlider.scrollLeft = scrollLeft - walk;
    });

    // Form submission with real-time validation
    const contactForm = document.getElementById('contact-form');
    const newsletterForm = document.getElementById('newsletter-form');

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const formObject = Object.fromEntries(formData);

        if (!validateForm(form)) {
            return;
        }

        try {
            // Simulating form submission
            await new Promise(resolve => setTimeout(resolve, 1000));
            console.log('Form submitted:', formObject);

            // Show success message
            const successMessage = document.createElement('p');
            successMessage.textContent = 'Thank you for your submission!';
            successMessage.style.color = 'var(--color-accent)';
            form.appendChild(successMessage);

            // Reset form
            form.reset();

            // Remove success message after 3 seconds
            setTimeout(() => {
                successMessage.remove();
            }, 3000);

            // Show notification
            if ('Notification' in window && Notification.permission === 'granted') {
                new Notification('Form Submitted', {
                    body: 'Thank you for your submission!',
                    icon: '/images/mozoda-logo-r-m7VkEDw5V2hVrg4w.avif'
                });
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    const validateForm = (form) => {
        let isValid = true;
        form.querySelectorAll('input, textarea').forEach(input => {
            if (input.checkValidity()) {
                input.classList.remove('invalid');
            } else {
                input.classList.add('invalid');
                isValid = false;
            }
        });
        return isValid;
    };

    contactForm.addEventListener('submit', handleFormSubmit);
    newsletterForm.addEventListener('submit', handleFormSubmit);

    // Real-time form validation
    document.querySelectorAll('input, textarea').forEach(input => {
        input.addEventListener('input', () => {
            if (input.checkValidity()) {
                input.classList.remove('invalid');
            } else {
                input.classList.add('invalid');
            }
        });
    });

    // Product modal
    const showProductModal = (name, description) => {
        const modal = document.createElement('div');
        modal.classList.add('modal', 'fade-in');
        modal.innerHTML = `
            <div class="modal-content slide-in">
                <h2>${name}</h2>
                <p>${description}</p>
                <button class="btn close-modal">Close</button>
            </div>
        `;
        document.body.appendChild(modal);

        modal.querySelector('.close-modal').addEventListener('click', () => {
            modal.classList.remove('fade-in');
            modal.classList.add('fade-out');
            setTimeout(() => modal.remove(), 500);
        });
    };

    const productButtons = document.querySelectorAll('.product-btn');
    productButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const productName = e.target.parentElement.querySelector('h3').textContent;
            const productDescription = e.target.parentElement.querySelector('p').textContent;
            showProductModal(productName, productDescription);
        });
    });


    //-------------------------<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>-------------//
    // // Voice Search
    // voiceSearchBtn.addEventListener('click', () => {
    //     if ('webkitSpeechRecognition' in window) {
    //         const recognition = new webkitSpeechRecognition();
    //         recognition.continuous = false;
    //         recognition.interimResults = false;

    //         recognition.onresult = (event) => {
    //             const transcript = event.results[0][0].transcript;
    //             console.log('Voice search:', transcript);
    //             // Implement search functionality here
    //         };

    //         recognition.start();
    //     } else {
    //         console.log('Web Speech API is not supported in this browser.');
    //     }
    // });
    //------------------------------<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>--------------------//


    //\\<<>> Chatgpt <<>>//\\


    // Advanced Voice Search with Section Scrolling
voiceSearchBtn.addEventListener('click', () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();

        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.lang = 'en-US'; // Set language, can be customized
        let isRecognizing = false;

        // Provide user feedback while recognition is active
        voiceSearchBtn.textContent = "Listening...";
        voiceSearchBtn.disabled = true;

        // Capture final transcript and handle section scrolling
        recognition.onresult = (event) => {
            let transcript = '';
            for (let i = event.resultIndex; i < event.results.length; i++) {
                transcript += event.results[i][0].transcript.toLowerCase(); // Convert to lowercase for easy matching
            }
            console.log('Voice search:', transcript);
            voiceSearchBtn.textContent = "Voice Search";
            voiceSearchBtn.disabled = false;

            // Scroll to section based on recognized words
            if (transcript.includes("home")) {
                document.getElementById("home").scrollIntoView({ behavior: "smooth" });
            } else if (transcript.includes("services")) {
                document.getElementById("services").scrollIntoView({ behavior: "smooth" });
            } else if (transcript.includes("products")) {
                document.getElementById("products").scrollIntoView({ behavior: "smooth" });
            } else if (transcript.includes("about")) {
                document.getElementById("about").scrollIntoView({ behavior: "smooth" });
            } else if (transcript.includes("contact")) {
                document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
            } else {
                alert("Section not found. Please say 'Home', 'Services', 'Products', 'About', or 'Contact'.");
            }
        };

        // Handle errors and reset UI
        recognition.onerror = (event) => {
            console.error('Recognition error:', event.error);
            voiceSearchBtn.textContent = "Voice Search";
            voiceSearchBtn.disabled = false;
            alert('Error occurred during voice recognition. Please try again.');
        };

        // Stop feedback when recognition ends
        recognition.onend = () => {
            voiceSearchBtn.textContent = "Voice Search";
            voiceSearchBtn.disabled = false;
        };

        // Start recognition
        recognition.start();
        isRecognizing = true;
    } else {
        console.log('Web Speech API is not supported in this browser.');
        alert('Voice search is not supported in this browser.');
    }
});



    //-----------------------------<<<<<<<<<<<>>>>>>>>>>>>>------------------//

    // Web Share API
    shareBtn.addEventListener('click', async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'Mizoda Trades & Exports',
                    text: 'Check out these premium spices!',
                    url: window.location.href
                });
            } catch (error) {
                console.error('Error sharing:', error);
            }
        } else {
            console.log('Web Share API is not supported in this browser.');
        }
    });

    // Infinite scrolling for products
    let page = 1;
    const loadMoreProducts = async () => {
        try {
            // Simulating API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            const newProducts = [
                { name: 'Cinnamon', description: 'Aromatic cinnamon sticks from Sri Lanka.', image:"images/Cinnamon-products-3.jpeg" },
                { name: 'Cloves', description: 'Fragrant cloves perfect for various cuisines.', image:"images/Cloves-products-3.jpeg" }
            ];

            const productGrid = document.querySelector('.product-grid');
            newProducts.forEach(product => {
                const productItem = document.createElement('div');
                productItem.classList.add('product-item', 'animate-on-scroll');
                productItem.innerHTML = `
                    <img src="${product.image}" alt="${product.name}" class="product-image">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <button class="btn product-btn">Learn More</button>
                `;
                productGrid.appendChild(productItem);
                observer.observe(productItem);
            });

            page++;
            if (page > 3) {
                loadMoreBtn.style.display = 'none';
            }
        } catch (error) {
            console.error('Error loading more products:', error);
        }
    };

    loadMoreBtn.addEventListener('click', loadMoreProducts);

    // Service Worker Registration
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
                console.log('Service Worker registered with scope:', registration.scope);
            })
            .catch(error => {
                console.error('Service Worker registration failed:', error);
            });
    }

    // Market Trends Chart
    let marketTrendsChart;
    const createMarketTrendsChart = () => {
        const ctx = document.getElementById('marketTrendsChart').getContext('2d');
        marketTrendsChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Green Cardamom',
                    data: [12, 19, 3, 5, 2, 3],
                    borderColor: '#00C853',
                    tension: 0.1
                }, {
                    label: 'Black Pepper',
                    data: [7, 11, 5, 8, 3, 7],
                    borderColor: '#00E676',
                    tension: 0.1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    };

    createMarketTrendsChart();

    // Update chart colors based on theme
    const updateChartColors = () => {
        const isDarkTheme = document.body.classList.contains('dark-theme');
        const textColor = isDarkTheme ? '#F5F5F5' : '#212121';

        marketTrendsChart.options.scales.x.ticks.color = textColor;
        marketTrendsChart.options.scales.y.ticks.color = textColor;
        marketTrendsChart.options.plugins.legend.labels.color = textColor;
        marketTrendsChart.update();
    };

    // Initialize chart colors
    updateChartColors();

    // Floating Action Button
    fabToggle.addEventListener('click', () => {
        fabOptions.style.display = fabOptions.style.display === 'none' ? 'block' : 'none';
    });

    // Chatbot
    chatbotToggle.addEventListener('click', () => {
        chatbotContainer.style.display = 'block';
    });

    chatbotClose.addEventListener('click', () => {
        chatbotContainer.style.display = 'none';
    });

    chatbotForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = chatbotForm.querySelector('input');
        const message = input.value.trim();
        if (message) {
            addChatMessage('user', message);
            // Simulate chatbot response
            setTimeout(() => {
                addChatMessage('bot', 'Thank you for your message. Our team will get back to you soon.');
            }, 1000);
            input.value = '';
        }
    });

    const addChatMessage = (sender, message) => {
        const messageElement = document.createElement('div');
        messageElement.classList.add('chat-message', sender);
        messageElement.textContent = message;
        chatbotMessages.appendChild(messageElement);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    };

    // Resize event listener for responsive adjustments
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            nav.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });
});
