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

// Fade/slide-in animation for project cards on scroll
function animateProjectsOnScroll() {
    const projects = document.querySelectorAll('.listed-project');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('hide')) {
                entry.target.classList.add('visible');
            } else if (!entry.target.classList.contains('hide')) {
                // entry.target.classList.remove('visible'); // Uncomment to make cards disappear when out of view even if they were visible before
            }
        });
    }, { threshold: 0.15 });

    // Remove .visible from all cards initially
    projects.forEach(proj => {
        proj.classList.remove('visible');
        observer.observe(proj);
    });

    // On load, manually check which cards are in viewport and add .visible only to those
    setTimeout(() => {
        projects.forEach(proj => {
            if (!proj.classList.contains('hide') && isElementInViewport(proj)) {
                proj.classList.add('visible');
            }
        });
    }, 10);
}

// Checks if element is in viewport
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top < window.innerHeight &&
        rect.bottom > 0
    );
}

// Re-runs observer when filtering (to animate newly shown cards)
function refreshProjectAnimations() {
    document.querySelectorAll('.listed-project').forEach(proj => {
        if (!proj.classList.contains('hide')) {
            proj.classList.remove('visible');
            // Force reflow to restart animation
            void proj.offsetWidth;
            proj.classList.add('visible');
        } else {
            proj.classList.remove('visible');
        }
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

        // Nav map list filtering
        document.querySelectorAll('.nav-map-list li').forEach(li => {
            if (li.classList.contains('NM0')) {
                li.style.display = '';
                return;
            }
            
            const mapClass = li.classList[0]; // Gets the corresponding project class name
            let projectSelector = '';
            if (mapClass === 'NM1') projectSelector = '.living-planet';
            if (mapClass === 'NM2') projectSelector = '.max1m';
            if (mapClass === 'NM3') projectSelector = '.last-defence';
            if (mapClass === 'NM4') projectSelector = '.charging-box';
            if (!projectSelector) {
                li.style.display = 'none';
                return;
            }
            const project = document.querySelector(projectSelector);
            if (project && !project.classList.contains('hide')) {
                li.style.display = '';
            } else {
                li.style.display = 'none';
            }
        });
        // Refresh animations for visible cards
        refreshProjectAnimations();

        // Remove .visible from all cards so observer can re-trigger animation (COMMENTED OUT TO KEEP CARDS FROM DISSAPPEARING WHEN SWITCHING TABS)
        // document.querySelectorAll('.listed-project').forEach(proj => {
        //     proj.classList.remove('visible');
        // });
    });
});

window.addEventListener('DOMContentLoaded', () => {
    animateProjectsOnScroll();
});

// iOS detection and fallback for project-button-glow
function isIOS() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
}

if (isIOS()) {
    document.querySelectorAll('.project-button-glow').forEach(btn => {
        btn.classList.remove('project-button-glow');
        btn.classList.add('project-button');
    });
    document.querySelectorAll('.project-button-container-glow').forEach(container => {
        container.classList.remove('project-button-container-glow');
        container.classList.add('project-button-container');
    });
}