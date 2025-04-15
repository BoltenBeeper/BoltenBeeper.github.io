// vvv THIS CODE IS FOR COPYING AND PASTING FOR THE MEDIA QUERRIES PAGE vvv

// Function to handle the click event on the "Read More" button
// document.querySelector('.read-more-button').addEventListener('click', () => {
//     // Scroll to the summary section
//     document.querySelector('.summary-section').scrollIntoView({ behavior: 'smooth' });
// });

// Function to handle the click event on the "Back to Top" button
// document.querySelector('.back-to-top-button').addEventListener('click', () => {
//     // Scroll to the top of the page
//     window.scrollTo({ top: 0, behavior: 'smooth' });
// });

document.querySelector('.preview-image-section').addEventListener('mouseenter', () => {
    document.querySelector('.preview-image').style.filter = 'blur(0vw)';
    document.querySelector('.preview-image').style.transition = 'all 0.5s ease-in-out';

    document.querySelector('.project-name').style.color = 'rgb(255, 220, 50, 0.3)';
    document.querySelector('.project-name').style.transition = 'all 0.5s ease-in-out';
});

document.querySelector('.preview-image-section').addEventListener('mouseleave', () => {
    document.querySelector('.project-name').style.color = 'rgb(255, 220, 50, 1)';
    document.querySelector('.project-name').style.transition = 'all 0.5s ease-in-out';
});

document.querySelector('.project-name').addEventListener('mouseenter', () => {
    document.querySelector('.preview-image').style.filter = 'blur(1vw)';
    document.querySelector('.preview-image').style.transition = 'all 0.5s ease-in-out';

    document.querySelector('.project-name').style.color = 'rgb(255, 220, 50, 1)';
    document.querySelector('.project-name').style.transition = 'all 0.5s ease-in-out';
});

document.querySelector('.project-name').addEventListener('mouseleave', () => {
    document.querySelector('.preview-image').style.filter = 'blur(0vw)';
    document.querySelector('.preview-image').style.transition = 'all 0.5s ease-in-out';
    
    document.querySelector('.project-name').style.color = 'rgb(255, 220, 50, 0.3)';
    document.querySelector('.project-name').style.transition = 'all 0.5s ease-in-out';
});