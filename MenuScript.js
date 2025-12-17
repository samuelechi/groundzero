document.addEventListener("DOMContentLoaded", function () {
    
    // 1. INJECT HEADER & FOOTER
    function loadComponent(id, file) {
        const element = document.getElementById(id);
        if (element) {
            fetch(file)
                .then(res => res.text())
                .then(data => {
                    element.innerHTML = data;
                    // Re-initialize menu listeners after injection
                    if(id === 'menu-bar') initMobileMenu();
                })
                .catch(err => console.error("Error loading " + file, err));
        }
    }

    loadComponent("menu-bar", "MenuGz.html");
    loadComponent("contact-bar", "Contact us.html");

    // 2. MOBILE MENU LOGIC
    function initMobileMenu() {
        const hamburger = document.querySelector('.hamburger');
        const navLinks = document.querySelector('.nav-links');
        if (hamburger) {
            hamburger.addEventListener('click', () => {
                navLinks.classList.toggle('active');
            });
        }
    }

    // 3. SCROLL ANIMATIONS (Intersection Observer)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    });

    // Target all sections for animation
    document.querySelectorAll('section, .card').forEach((el) => {
        el.style.opacity = "0";
        el.style.transform = "translateY(50px)";
        el.style.transition = "all 0.8s ease-out";
        observer.observe(el);
    });

    // 4. CHATBOT LOGIC
    const chatBtn = document.getElementById('chat-toggle');
    const chatWindow = document.getElementById('chat-window');
    const sendBtn = document.getElementById('send-btn');
    const chatInput = document.getElementById('chat-input');
    const chatBody = document.getElementById('chat-body');

    // Toggle Window
    if(chatBtn) {
        chatBtn.addEventListener('click', () => {
            chatWindow.style.display = (chatWindow.style.display === 'flex') ? 'none' : 'flex';
        });
    }

    // Send Message
    if(sendBtn) {
        sendBtn.addEventListener('click', handleChat);
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleChat();
        });
    }

    function handleChat() {
        const text = chatInput.value.trim().toLowerCase();
        if (text === "") return;

        // Add User Message
        addMessage(chatInput.value, 'user-msg');
        chatInput.value = "";

        // Bot Thinking Delay
        setTimeout(() => {
            const reply = getBotResponse(text);
            addMessage(reply, 'bot-msg');
        }, 600);
    }

    function addMessage(text, className) {
        const div = document.createElement('div');
        div.className = `message ${className}`;
        div.innerText = text;
        chatBody.appendChild(div);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    function getBotResponse(input) {
        if (input.includes('hello') || input.includes('hi')) return "Hello! Welcome to GroundZero Engineering. How can I help you today?";
        if (input.includes('service') || input.includes('do')) return "We specialize in Engineering, Procurement, and Construction (EPC) for Oil & Gas storage, pipelines, and civil structures.";
        if (input.includes('contact') || input.includes('phone') || input.includes('email')) return "You can reach us at +234 (803)-352-2992 or email groundzeroengineering455@gmail.com.";
        if (input.includes('location') || input.includes('address')) return "We are located at No 71A Gold Drive Raji Rasaki Estate, Amuwo, Lagos State.";
        if (input.includes('quote') || input.includes('price')) return "For a project quote, please use the contact form on our website or email us your project details.";
        return "I'm not sure about that, but our team can help! Please click 'Contact Us' in the menu.";
    }
});
