document.addEventListener("DOMContentLoaded", function () {
    // Smooth scrolling for anchor links
    document.querySelectorAll("a[href^='#']").forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute("href")).scrollIntoView({
                behavior: "smooth"
            });
        });
    });

    // Mobile menu toggle
    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-menu");
    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", () => {
            navMenu.classList.toggle("active");
        });
    }

    // Fade-in effect for sections on scroll
    const faders = document.querySelectorAll(".fade-in");
    const appearOptions = { threshold: 0.3, rootMargin: "0px 0px -100px 0px" };
    const appearOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("appear");
            observer.unobserve(entry.target);
        });
    }, appearOptions);
    faders.forEach(fader => appearOnScroll.observe(fader));

    // Form validation
    const form = document.querySelector("form");
    if (form) {
        form.addEventListener("submit", function (e) {
            const inputs = form.querySelectorAll("input[required], textarea[required]");
            let valid = true;
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    valid = false;
                    input.classList.add("error");
                } else {
                    input.classList.remove("error");
                }
            });
            if (!valid) e.preventDefault();
        });
    }

    // Light/Dark Mode Toggle
    const themeToggle = document.querySelector(".theme-toggle");
    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            document.body.classList.toggle("dark-mode");
        });
    }

    // Slideshow / Carousel (if images exist)
    const slides = document.querySelectorAll(".slide");
    let currentSlide = 0;
    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove("active"));
        slides[index].classList.add("active");
    }
    if (slides.length > 0) {
        setInterval(() => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }, 3000);
    }

    // Load external menu
    const menuPlaceholder = document.getElementById("menu-bar");
    if (menuPlaceholder) {
        fetch("MenuGz.html")
            .then(response => response.text())
            .then(data => {
                menuPlaceholder.innerHTML = data;
            })
            .catch(error => console.error("Error loading menu:", error));
    }
});
