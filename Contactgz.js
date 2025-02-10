document.addEventListener('DOMContentLoaded', () => {
    const menuPlaceholder = document.getElementById('contact-bar');
    fetch('Contact us.html')
        .then(response => response.text())
        .then(data => {
            menuPlaceholder.innerHTML = data;
        })
        .catch(error => console.error('Error loading menu:', error));
});