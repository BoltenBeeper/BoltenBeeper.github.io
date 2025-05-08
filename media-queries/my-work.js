document.querySelector('.NM0').addEventListener('click', () => {
    // Scroll to the top of the page
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Function to handle the click event on the "Read More" button
document.querySelector('.NM1').addEventListener('click', () => {
    document.querySelector('.living-planet').scrollIntoView({ behavior: 'smooth' });
});

document.querySelector('.NM2').addEventListener('click', () => {
    document.querySelector('.max1m').scrollIntoView({ behavior: 'smooth' });
});

document.querySelector('.NM3').addEventListener('click', () => {
    document.querySelector('.charging-box').scrollIntoView({ behavior: 'smooth' });
});

window.addEventListener('load', () => { // Handles nav map text disappearing after a few seconds
    const message = document.querySelector('.disappear-on-load');
    setTimeout(() => {
        message.style.opacity = '0';
    }, 5000);
});

// Toggle the hover-simulated class on tap for touch screens (only for resolutions 768px or lower)
if (window.matchMedia('(max-width: 768px)').matches) {
    const navMap = document.querySelector('.nav-map');
    navMap.addEventListener('click', () => {
        navMap.classList.toggle('hover-simulated');
    });
}