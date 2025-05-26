// Get the animation container
const portrait = document.querySelector('.portrait');
const logo = document.querySelector('.logo');

function startAnimation() {
    // waiting 1 second before applying the "animating" class
    setTimeout(function() {
        portrait.classList.add('animating');
        logo.classList.add('animating1');
    }, 500);

    // Remove "animating" class after 2 seconds
    setTimeout(function() {
        logo.classList.remove('animating1');
        logo.classList.add('animating2');
    }, 1000);

    

    // Remove "animating" class after 2 seconds
    setTimeout(function() {
        portrait.classList.remove('animating');
        logo.classList.remove('animating2');
        portrait.classList.add('idle');
        logo.classList.add('idle');

        // When the page loads
        logo.addEventListener('mouseenter', function() {
            logo.classList.remove('mouseleave');
            logo.classList.remove('idle');
            logo.classList.add('mouseenter');
        });

        // When the page loads
        logo.addEventListener('mouseleave', function() {
            logo.classList.remove('mouseenter');
            logo.classList.add('mouseleave');
            setTimeout(function() {
                logo.classList.remove('mouseleave');
                logo.classList.add('idle');
            }, 100);
        });
    }, 2000);
}

document.querySelector('.profile').addEventListener('mouseeneter', function() {
    document.querySelector('.profile').classList.add('testing');
});

// When the page loads
window.addEventListener('load', function() {
    startAnimation();
});