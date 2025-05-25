function startAnimation() {
    // Get the animation container
    const portrait = document.querySelector('.portrait');
    const logo = document.querySelector('.logo');
    
    // waiting 1 second before applying the "animating" class
    setTimeout(function() {
        portrait.classList.add('animating');
        logo.classList.add('animating');
    }, 500);

    // Remove "animating" class after 2 seconds
    setTimeout(function() {
        portrait.classList.remove('animating');
        logo.classList.remove('animating');
        portrait.classList.add('idle');
        logo.classList.add('idle');
    }, 2000);
}

// When the page loads
window.addEventListener('load', function() {
    startAnimation();
});

// Function to handle the click event on the logo
// function handleLogoClick() {
//     startAnimation();
    // const logo = document.querySelector('.portrait-box');
    // const portrait = document.querySelector('.portrait');

    // // Toggle the "animating" class on click
    // logo.classList.toggle('animating');
    // portrait.classList.toggle('animating');
// }

// Add click event listener to the portrait-box"
// document.querySelector('.profile"').addEventListener('click', startAnimation);