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
    document.querySelector('.last-defence').scrollIntoView({ behavior: 'smooth' });
});

document.querySelector('.NM4').addEventListener('click', () => {
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

// Project filtering logic
document.querySelectorAll('.project-tab').forEach(tab => {
    tab.addEventListener('click', function() {
        document.querySelectorAll('.project-tab').forEach(t => t.classList.remove('selected')); // unselects all other tabs
        this.classList.add('selected');
        const filter = this.getAttribute('data-filter');
        document.querySelectorAll('.listed-project').forEach(proj => {
            if (filter === 'all' || proj.classList.contains(filter)) {
                proj.classList.remove('hide');
            } else {
                proj.classList.add('hide');
            }
        });
    });
});