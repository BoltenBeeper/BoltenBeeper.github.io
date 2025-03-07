function hideOverlay() {
  document.getElementById('overlay').style.display = 'none';
  resumeAudioContext();
  localStorage.setItem('overlayShown', 'true'); // Set flag in localStorage
}

document.getElementById('overlay').addEventListener('click', hideOverlay);

let currentImage = null;
let animationQueue = [];
let isAnimating = false;

function createImageElement(src) {
  const img = document.createElement('img');
  img.src = src;
  img.style.opacity = '0'; // Initially hidden
  return img;
}

function handleHover(buttonIndex) {
  console.log(`Hovering over button ${buttonIndex}`);
  const imageSrc = '../images/resume_icon.png'; // Placeholder image source
  const newImage = createImageElement(imageSrc);
  animationQueue.push({ image: newImage, action: 'fade-in' });
  processQueue();
}

function handleMouseLeave() {
  if (currentImage) {
    console.log('Mouse left, fading out current image');
    animationQueue.push({ image: currentImage, action: 'fade-out' });
    processQueue();
  }
}

function processQueue() {
  if (isAnimating || animationQueue.length === 0) return;

  isAnimating = true;
  const { image, action } = animationQueue.shift();
  const centerArt = document.querySelector('.center_art');

  if (action === 'fade-in') {
    console.log('Processing fade-in');
    if (currentImage) {
      currentImage.classList.add('fade-out');
      currentImage.addEventListener('transitionend', () => {
        console.log('Current image faded out');
        currentImage.remove();
        currentImage = image;
        centerArt.appendChild(image);
        requestAnimationFrame(() => {
          console.log('Fading in new image');
          image.style.opacity = '1'; // Set opacity to 1 when fading in
          image.classList.add('fade-in');
        });
        image.addEventListener('transitionend', () => {
          console.log('New image faded in');
          isAnimating = false;
          processQueue();
        }, { once: true });
      }, { once: true });
    } else {
      currentImage = image;
      centerArt.appendChild(image);
      requestAnimationFrame(() => {
        console.log('Fading in new image');
        image.style.opacity = '1'; // Set opacity to 1 when fading in
        image.classList.add('fade-in');
      });
      image.addEventListener('transitionend', () => {
        console.log('New image faded in');
        isAnimating = false;
        processQueue();
      }, { once: true });
    }
  } else if (action === 'fade-out') {
    console.log('Processing fade-out');
    image.classList.remove('fade-in');
    image.classList.add('fade-out');
    image.addEventListener('transitionend', () => {
      console.log('Current image faded out');
      image.remove();
      if (currentImage === image) {
        currentImage = null;
      }
      isAnimating = false;
      processQueue();
    }, { once: true });
  }
}

document.querySelector('.button-container-one').addEventListener('mouseenter', () => handleHover(1));
document.querySelector('.button-container-one').addEventListener('mouseleave', handleMouseLeave);

document.querySelector('.button-container-two').addEventListener('mouseenter', () => handleHover(2));
document.querySelector('.button-container-two').addEventListener('mouseleave', handleMouseLeave);

document.querySelector('.button-container-three').addEventListener('mouseenter', () => handleHover(3));
document.querySelector('.button-container-three').addEventListener('mouseleave', handleMouseLeave);

document.querySelector('.button-container-four').addEventListener('mouseenter', () => handleHover(4));
document.querySelector('.button-container-four').addEventListener('mouseleave', handleMouseLeave);