let animationQueue = [];
let currentAnimation = null;
let mouseIsHovering

function keepFirstTwo(arr) {
  arr.splice(2); // Removes all elements starting from index 2
  return arr;
}

// Function to process the animation queue
const processQueue = () => {
  if (animationQueue.length === 0 || currentAnimation) return;

  const { element, action } = animationQueue.shift();
  currentAnimation = element;

  // Remove active class from all other icons except the current one
  document.querySelectorAll('.preview-icon').forEach(icon => {
    if (icon !== element) {
      // if (icon.classList.contains('active')) {
      //   animationQueue.push({ element: icon, action: 'fade-out' }) };
      icon.classList.remove('active');
      // icon.classList.remove('fading-in');
      // icon.classList.remove('fading-out');
    }
  });

  if (action === 'fade-in') {
    element.classList.add('active');
    // element.classList.remove('fading-out');
    requestAnimationFrame(() => {
      element.classList.add('fading-in');
    });
    setTimeout(() => {
      element.classList.remove('fading-in');
      currentAnimation = null;
      if (!mouseIsHovering) {
        animationQueue = [{ element: element, action: 'fade-out' }];
        console.log("MOUSE IS NOT HOVERING");
      }
      processQueue();
    }, parseInt(getComputedStyle(element).getPropertyValue('--animation-duration')));
  } else if (action === 'fade-out') {
    element.classList.remove('fading-in');
    requestAnimationFrame(() => {
      element.classList.add('fading-out');
      element.classList.remove('active');
    });
    setTimeout(() => {
      element.classList.remove('fading-out');
      currentAnimation = null;
      processQueue();
    }, parseInt(getComputedStyle(element).getPropertyValue('--animation-duration')));
  }
};

const handleHover = (element) => {
  // keepFirstTwo(animationQueue);
  const destination = element.dataset.destination;
  const destinationElement = document.querySelector(`#${destination}`);

  element.addEventListener('mouseenter', () => {
    console.log('mouseenter', animationQueue[0]);
    // if (destinationElement.classList.contains('active') || destinationElement.classList.contains('fading-in') || destinationElement.classList.contains('fading-out')) return;
    animationQueue = [{ element: destinationElement, action: 'fade-in' }];
    console.log('replaced with:', animationQueue[0]);
    mouseIsHovering = true;
    processQueue();
  });

  element.addEventListener('mouseleave', () => {
    if (!destinationElement.classList.contains('active')) return;
    animationQueue.push({ element: destinationElement, action: 'fade-out' });
    mouseIsHovering = false;
    processQueue();
  });
};

const buttons = document.querySelectorAll('.journey-button');
buttons.forEach(button => handleHover(button));



// Unused code to copy/paste:

// document.querySelectorAll('.preview-icon').forEach(icon => {icon.classList.remove('active');});