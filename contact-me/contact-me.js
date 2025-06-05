emailjs.init('vPKut9QSCo3MUyjl-'); // <-- Bot Public EmailJS user ID

document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const status = document.getElementById('form-status');
    status.textContent = "Sending...";

    const serviceID = 'service_wdz7sf6'; // <-- Bot EmailJS service ID
    const templateID = 'template_hqc42ma'; // <-- Bot EmailJS template ID

    emailjs.sendForm(serviceID, templateID, this)
        .then(() => {
            status.style.color = "limegreen";
            status.textContent = "Message sent! Thank you for reaching out.";
            this.reset();
        }, (err) => {
            status.style.color = "red";
            status.textContent = "Failed to send message. Please try again later.";
        });
});

// Copy to clipboard logic for contact info
document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const text = this.getAttribute('data-copy');
        navigator.clipboard.writeText(text).then(() => {
            const status = document.getElementById('copy-status');
            status.textContent = `Copied "${text}" to clipboard!`;
            setTimeout(() => { status.textContent = ""; }, 2000);
        });
    });
});

// Video cover fade logic
window.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        var cover = document.querySelector('.video-cover');
        if (cover) {
            cover.classList.add('fading');
            setTimeout(function() {
                cover.classList.remove('fading');
                cover.classList.add('faded');
            }, 1000);
        }
    }, 1000);
});