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

// MINI GALLARY OVERLAY CODE //

const imageContainers = document.querySelectorAll('.image-container img');
const overlay = document.getElementById('image-overlay');
const overlayImage = document.getElementById('overlay-image');
const prevButton = document.getElementById('prev-image');
const nextButton = document.getElementById('next-image');
const closeButton = document.getElementById('close-overlay');

let currentIndex = 0;
const images = Array.from(imageContainers).map(img => img.src);

function showOverlay(index) {
    currentIndex = index;
    overlayImage.src = images[currentIndex];
    overlay.classList.remove('hidden');
}

function hideOverlay() {
    overlay.classList.add('hidden');
}

function showPrevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    overlayImage.src = images[currentIndex];
}

function showNextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    overlayImage.src = images[currentIndex];
}

imageContainers.forEach((img, index) => {
    img.addEventListener('click', () => showOverlay(index));
});

prevButton.addEventListener('click', showPrevImage);
nextButton.addEventListener('click', showNextImage);
closeButton.addEventListener('click', hideOverlay);

overlay.addEventListener('click', (e) => {
    if (e.target === overlay) hideOverlay();
});