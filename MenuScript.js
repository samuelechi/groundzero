document.addEventListener("DOMContentLoaded", function () {
    
    // --- 1. COMPONENT LOADER (Header/Footer) ---
    function loadComponent(id, file) {
        const element = document.getElementById(id);
        if (element) {
            fetch(file)
                .then(res => {
                    if (!res.ok) throw new Error("Failed to load");
                    return res.text();
                })
                .then(data => {
                    element.innerHTML = data;
                    if(id === 'menu-bar') initMobileMenu(); // Re-init menu listeners after load
                })
                .catch(err => console.log(err));
        }
    }

    loadComponent("menu-bar", "MenuGz.html");
    loadComponent("contact-bar", "Contact us.html");


    // --- 2. MOBILE MENU LOGIC (The Fix) ---
    function initMobileMenu() {
        const hamburger = document.querySelector('.hamburger');
        const navLinks = document.querySelector('.nav-links');
        const links = document.querySelectorAll('.nav-links li');

        if (hamburger) {
            hamburger.addEventListener('click', () => {
                navLinks.classList.toggle('active');
                hamburger.classList.toggle('active');
                
                // Animate Links
                links.forEach((link, index) => {
                    if (link.style.animation) {
                        link.style.animation = '';
                    } else {
                        link.style.animation = `fadeUp 0.5s ease forwards ${index / 7 + 0.3}s`;
                    }
                });
            });
        }
    }

    // --- 3. SCROLL EFFECTS (Navbar & Reveal) ---
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (header) {
            header.style.background = window.scrollY > 50 ? 'rgba(10, 15, 20, 0.98)' : 'rgba(10, 15, 20, 0.85)';
            header.style.boxShadow = window.scrollY > 50 ? '0 10px 30px rgba(0,0,0,0.5)' : 'none';
        }

        // Reveal Elements on Scroll
        const reveals = document.querySelectorAll('.card, .section-title, .grid-2 div');
        for (let i = 0; i < reveals.length; i++) {
            let windowHeight = window.innerHeight;
            let elementTop = reveals[i].getBoundingClientRect().top;
            let elementVisible = 150;
            if (elementTop < windowHeight - elementVisible) {
                reveals[i].style.opacity = "1";
                reveals[i].style.transform = "translateY(0)";
            } else {
                reveals[i].style.opacity = "0";
                reveals[i].style.transform = "translateY(50px)";
                reveals[i].style.transition = "all 0.6s ease-out";
            }
        }
    });

    // --- 4. SMART CHATBOT ---
    const chatBtn = document.getElementById('chat-toggle');
    const chatWindow = document.getElementById('chat-window');
    const sendBtn = document.getElementById('send-btn');
    const chatInput = document.getElementById('chat-input');
    const chatBody = document.getElementById('chat-body');

    if(chatBtn) {
        chatBtn.addEventListener('click', () => {
            const isFlex = chatWindow.style.display === 'flex';
            chatWindow.style.display = isFlex ? 'none' : 'flex';
        });
    }

    if(sendBtn) {
        sendBtn.addEventListener('click', handleChat);
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleChat();
        });
    }

    function handleChat() {
        const text = chatInput.value.trim();
        if (!text) return;

        // 1. User Message
        addMessage(text, 'user-msg');
        chatInput.value = "";

        // 2. Typing Indicator
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot-msg';
        typingDiv.innerHTML = '<em>Typing...</em>';
        typingDiv.id = 'typing-indicator';
        chatBody.appendChild(typingDiv);
        chatBody.scrollTop = chatBody.scrollHeight;

        // 3. Bot Response Delay
        setTimeout(() => {
            document.getElementById('typing-indicator').remove();
            const reply = getBotResponse(text.toLowerCase());
            addMessage(reply, 'bot-msg');
        }, 1200); // 1.2s delay for realism
    }

    function addMessage(text, className) {
        const div = document.createElement('div');
        div.className = `message ${className}`;
        div.innerText = text;
        chatBody.appendChild(div);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    function getBotResponse(input) {
        if (input.includes('hello') || input.includes('hi')) return "Welcome to GroundZero! 👋 I'm your engineering assistant. How can I help with your project today?";
        if (input.includes('price') || input.includes('quote') || input.includes('cost')) return "Since every project is unique, we'd love to give you a custom quote. Could you leave your email so our team can contact you?";
        if (input.includes('service') || input.includes('do')) return "We specialize in EPC: Engineering design, Procurement, and Construction of oil/gas storage and civil infrastructure.";
        if (input.includes('contact') || input.includes('phone')) return "You can call us directly at +234 (803)-352-2992 or visit our Lagos office.";
        return "I'm taking note of that. Would you like to speak to a human engineer? Click the 'Contact' button above.";
    }
});
