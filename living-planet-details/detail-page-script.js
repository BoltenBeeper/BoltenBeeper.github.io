// This script file may contain unused code and should not be used as a document to fully copy and paste for reuse. For copy and pasting for new details pages use a different detail-page-script.js file.

// Old code for the hover effect, need to decide if I like this or the new one better.

// document.querySelector('.preview-image-section').addEventListener('mouseenter', () => {
//     document.querySelector('.preview-image').style.filter = 'blur(0vw)';
//     document.querySelector('.preview-image').style.transition = 'all 0.5s ease-in-out';

//     document.querySelector('.project-name').style.color = 'rgb(255, 220, 50, 0.3)';
//     document.querySelector('.project-name').style.transition = 'all 0.5s ease-in-out';
// });

// document.querySelector('.preview-image-section').addEventListener('mouseleave', () => {
//     document.querySelector('.project-name').style.color = 'rgb(255, 220, 50, 1)';
//     document.querySelector('.project-name').style.transition = 'all 0.5s ease-in-out';
// });

// document.querySelector('.project-name').addEventListener('mouseenter', () => {
//     document.querySelector('.preview-image').style.filter = 'blur(1vw)';
//     document.querySelector('.preview-image').style.transition = 'all 0.5s ease-in-out';

//     document.querySelector('.project-name').style.color = 'rgb(255, 220, 50, 1)';
//     document.querySelector('.project-name').style.transition = 'all 0.5s ease-in-out';
// });

// document.querySelector('.project-name').addEventListener('mouseleave', () => {
//     document.querySelector('.preview-image').style.filter = 'blur(0vw)';
//     document.querySelector('.preview-image').style.transition = 'all 0.5s ease-in-out';
    
//     document.querySelector('.project-name').style.color = 'rgb(255, 220, 50, 0.3)';
//     document.querySelector('.project-name').style.transition = 'all 0.5s ease-in-out';
// });

document.querySelector('.preview-image-section').addEventListener('mouseenter', () => {
    document.querySelector('.preview-image').style.filter = 'blur(1vw)';
    document.querySelector('.preview-image').style.transition = 'all 0.5s ease-in-out';
});

document.querySelector('.preview-image-section').addEventListener('mouseleave', () => {
    document.querySelector('.preview-image').style.filter = 'blur(0vw)';
    document.querySelector('.preview-image').style.transition = 'all 0.5s ease-in-out';
});

document.querySelector('.project-name').addEventListener('mouseenter', () => {
    document.querySelector('.preview-image').style.filter = 'blur(0vw)';
    document.querySelector('.preview-image').style.transition = 'all 0.5s ease-in-out';
});

document.querySelector('.project-name').addEventListener('mouseleave', () => {
    document.querySelector('.preview-image').style.filter = 'blur(1vw)';
    document.querySelector('.preview-image').style.transition = 'all 0.5s ease-in-out';
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

function resetZoom() {
    scale = 1;
    translateX = 0.5;
    translateY = 0.5;
    overlayImage.style.transform = `translate(0, 0) scale(1)`;
}

function constrainTranslation() {
    const imageWidth = scale * zoomContainer.offsetWidth;
    const imageHeight = scale * zoomContainer.offsetHeight;

    
    let maxTranslateX = Math.max(0, (imageWidth - zoomContainer.offsetWidth));
    let maxTranslateY = Math.max(0, (imageHeight - zoomContainer.offsetHeight));

    // I never really figured out this out but it was here because for some reason draggin the image can can ignore the border snapping rule. I may come back to it later. I'm too tired.

    // if (isDragging) {
    //     maxTranslateX = Math.max(0, (imageWidth - zoomContainer.offsetWidth) / (2 * imageWidth));
    //     maxTranslateY = Math.max(0, (imageHeight - zoomContainer.offsetHeight) / (2 * imageHeight));
    // } else {
    //     maxTranslateX = Math.max(0, (imageWidth - zoomContainer.offsetWidth));
    //     maxTranslateY = Math.max(0, (imageHeight - zoomContainer.offsetHeight));
    // }

    translateX = Math.min(Math.max(translateX, 0.5 - maxTranslateX), 0.5 + maxTranslateX);
    translateY = Math.min(Math.max(translateY, 0.5 - maxTranslateY), 0.5 + maxTranslateY);
}

function zoomImage(event) {
    event.preventDefault();

    const rect = zoomContainer.getBoundingClientRect();
    const mouseX = (event.clientX - rect.left) / rect.width; // Mouse X position as a percentage
    const mouseY = (event.clientY - rect.top) / rect.height; // Mouse Y position as a percentage

    // Adjust zoom scale
    const zoomStep = 0.1;
    const previousScale = scale;
    scale += event.deltaY < 0 ? zoomStep : -zoomStep;
    scale = Math.min(Math.max(scale, 1), 3); // Clamp scale between 1 and 3

    // Calculate the translation to keep the zoom centered on the cursor
    const deltaScale = scale / previousScale;
    translateX = (translateX - mouseX) * deltaScale + mouseX;
    translateY = (translateY - mouseY) * deltaScale + mouseY;

    // Constrain translation to prevent white space
    constrainTranslation();

    // Apply zoom transformation
    overlayImage.style.transform = `translate(${(translateX - 0.5) * 100}%, ${(translateY - 0.5) * 100}%) scale(${scale})`;
}

// Reset zoom when navigating between images
function showPrevImage() {
    resetZoom();
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    overlayImage.src = images[currentIndex];
}

function showNextImage() {
    resetZoom();
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

const zoomContainer = document.getElementById('zoom-container');
let scale = 1; // Initial zoom level
let translateX = 0.5; // Horizontal translation. 0.5 to set the image in the center of the screen ( 0.5 * 100% = 50%)
let translateY = 0.5; // Vertical translation. 0.5 to set the image in the center of the screen ( 0.5 * 100% = 50%)

// Add zoom functionality
zoomContainer.addEventListener('wheel', zoomImage);

// Reset zoom when closing the overlay
closeButton.addEventListener('click', resetZoom);

let isDragging = false; // Track whether the user is dragging
let lastMouseX = 0; // Last X position of the mouse
let lastMouseY = 0; // Last Y position of the mouse

function startDrag(event) {
    isDragging = true;
    lastMouseX = event.clientX;
    lastMouseY = event.clientY;
    zoomContainer.style.cursor = 'grabbing'; // Change cursor to indicate dragging
}

function dragImage(event) {
    if (!isDragging) return;

    const deltaX = (event.clientX - lastMouseX) / zoomContainer.offsetWidth; // Drag distance as a percentage of container width
    const deltaY = (event.clientY - lastMouseY) / zoomContainer.offsetHeight; // Drag distance as a percentage of container height

    lastMouseX = event.clientX;
    lastMouseY = event.clientY;

    // Update translation values
    translateX += deltaX;
    translateY += deltaY;

    // Constrain translation to prevent white space
    constrainTranslation();

    // Apply updated transformation
    overlayImage.style.transform = `translate(${(translateX - 0.5) * 100}%, ${(translateY - 0.5) * 100}%) scale(${scale})`;
}

function endDrag() {
    isDragging = false;
    zoomContainer.style.cursor = 'grab'; // Reset cursor
}

// Add event listeners for dragging
zoomContainer.addEventListener('mousedown', startDrag);
zoomContainer.addEventListener('mousemove', dragImage);
document.addEventListener('mouseup', endDrag); // Use document to ensure drag ends even if the cursor leaves the container



// vvv GALLAY CONTROL FOR TOUCH DEVICES vvv //

let pinchStartScale = 1;
let pinchStartDistance = 0;
let pinchStartCenter = { x: 0, y: 0 };
let pinchStartTranslate = { x: 0.5, y: 0.5 };
let lastPinchTime = 0;
const DRAG_AFTER_PINCH_DELAY = 1000; // ms

zoomContainer.addEventListener('touchstart', (event) => {
    if (Date.now() - lastPinchTime < DRAG_AFTER_PINCH_DELAY) return;
    if (event.touches.length === 1) {
        startDrag(event.touches[0]);
    }
    if (event.touches.length === 2) {
        event.preventDefault();
        const touch1 = event.touches[0];
        const touch2 = event.touches[1];
        pinchStartDistance = Math.hypot(
            touch2.clientX - touch1.clientX,
            touch2.clientY - touch1.clientY
        );
        pinchStartScale = scale;
        pinchStartTranslate = { x: translateX, y: translateY };
        // Center between two touches, normalized to container
        const rect = zoomContainer.getBoundingClientRect();
        pinchStartCenter = {
            x: ((touch1.clientX + touch2.clientX) / 2 - rect.left) / rect.width,
            y: ((touch1.clientY + touch2.clientY) / 2 - rect.top) / rect.height
        };

        lastPinchTime = Date.now();
    }
});

zoomContainer.addEventListener('touchmove', (event) => {
    if (event.touches.length === 1) {
        if (Date.now() - lastPinchTime < DRAG_AFTER_PINCH_DELAY) return;
        if (isDragging) event.preventDefault();
        dragImage(event.touches[0]);
    }
    if (event.touches.length === 2) {
        event.preventDefault();
        const touch1 = event.touches[0];
        const touch2 = event.touches[1];
        const newDistance = Math.hypot(
            touch2.clientX - touch1.clientX,
            touch2.clientY - touch1.clientY
        );
        let newScale = pinchStartScale * (newDistance / pinchStartDistance);
        newScale = Math.min(Math.max(newScale, 1), 3);

        // Center between two touches, normalized to container
        const rect = zoomContainer.getBoundingClientRect();
        const newCenter = {
            x: ((touch1.clientX + touch2.clientX) / 2 - rect.left) / rect.width,
            y: ((touch1.clientY + touch2.clientY) / 2 - rect.top) / rect.height
        };

        // Adjust translation to keep zoom centered on pinch center
        const scaleRatio = newScale / pinchStartScale;
        translateX = (pinchStartTranslate.x - pinchStartCenter.x) * scaleRatio + newCenter.x;
        translateY = (pinchStartTranslate.y - pinchStartCenter.y) * scaleRatio + newCenter.y;

        scale = newScale;
        constrainTranslation();

        overlayImage.style.transform = `translate(${(translateX - 0.5) * 100}%, ${(translateY - 0.5) * 100}%) scale(${scale})`;

        lastPinchTime = Date.now();
    }
});