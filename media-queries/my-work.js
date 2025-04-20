document.querySelector('.NM0').addEventListener('click', () => {
    // Scroll to the top of the page
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Function to handle the click event on the "Read More" button
document.querySelector('.NM1').addEventListener('click', () => {
    // Scroll to the summary section
    document.querySelector('.living-planet').scrollIntoView({ behavior: 'smooth' });
});

document.querySelector('.NM2').addEventListener('click', () => {
    // Scroll to the summary section
    document.querySelector('.max1m').scrollIntoView({ behavior: 'smooth' });
});

document.querySelector('.NM3').addEventListener('click', () => {
    // Scroll to the summary section
    document.querySelector('.charging-box').scrollIntoView({ behavior: 'smooth' });
});

window.addEventListener('load', () => { // Handles nav map text disappearing after a few seconds
    const message = document.querySelector('.disappear-on-load');
    setTimeout(() => {
        message.style.opacity = '0';
    }, 5000);
});

// TEST