let animationQueue = [];
let currentAnimation = null;
let mouseIsHovering
let currentlyFadingOut = false

function keepFirstTwo(arr) {
  arr.splice(2); // Removes all elements starting from index 2
  return arr;
}

// Function to process the animation queue
const processQueue = () => {
  if (animationQueue.length === 0 || currentAnimation) return;

  const { buttonElement, iconElement, action } = animationQueue.shift();
  currentAnimation = iconElement;

  // Remove active class from all other icons except the current one
  document.querySelectorAll('.preview-icon').forEach(icon => {
    if (icon !== iconElement) {
      // if (icon.classList.contains('active')) {
      //   animationQueue.push({ iconElement: iconElement, action: 'fade-out' }) };
      icon.classList.remove('active');
      // icon.classList.remove('fading-in');
      // icon.classList.remove('fading-out');
    }
  });
  
  document.querySelectorAll('.journey-button').forEach(button => {
    if (button == buttonElement) {
      if (button.matches(':hover')) {
        mouseIsHovering = true;
      } else {
        mouseIsHovering = false;
      }
    }
  });

  if (action === 'fade-in') {
    iconElement.classList.add('active');
    // iconElement.classList.remove('fading-out');
    requestAnimationFrame(() => {
      iconElement.classList.add('fading-in');
    });
    setTimeout(() => {
      iconElement.classList.remove('fading-in');
      if (!mouseIsHovering) {
        animationQueue = [{ buttonElement: buttonElement, iconElement: iconElement, action: 'fade-out' }];
      }
      currentAnimation = null;
      processQueue();
    }, parseInt(getComputedStyle(iconElement).getPropertyValue('--animation-duration')));
  } else if (action === 'fade-out') {
    iconElement.classList.remove('fading-in');
    requestAnimationFrame(() => {
      iconElement.classList.add('fading-out');
      iconElement.classList.remove('active');
    });
    setTimeout(() => {
      iconElement.classList.remove('fading-out');
      currentAnimation = null;
      processQueue();
    }, parseInt(getComputedStyle(iconElement).getPropertyValue('--animation-duration')));
  }
};

const handleHover = (buttonElement) => {
  // keepFirstTwo(animationQueue);
  const destination = buttonElement.dataset.destination;
  const iconElement = document.querySelector(`#${destination}`);

  buttonElement.addEventListener('mouseenter', () => {
    // if (iconElement.classList.contains('active') || iconElement.classList.contains('fading-in') || iconElement.classList.contains('fading-out')) return;
    animationQueue = [{ buttonElement: buttonElement, iconElement: iconElement, action: 'fade-in' }];
    mouseIsHovering = true;
    processQueue();
  });

  buttonElement.addEventListener('mouseleave', () => {
    if (!iconElement.classList.contains('active')) return;
    animationQueue = [{ buttonElement: buttonElement, iconElement: iconElement, action: 'fade-out' }];
    mouseIsHovering = false;
    processQueue();
  });
};

const buttons = document.querySelectorAll('.journey-button');
buttons.forEach(button => handleHover(button));



// Unused code to copy/paste:

// document.querySelectorAll('.preview-icon').forEach(icon => {icon.classList.remove('active');});

// if (!mouseIsHovering) {
//   animationQueue = [{ iconElement: iconElement, action: 'fade-out' }];
//   console.log("MOUSE IS NOT HOVERING");
// }

// if (iconElement.matches(':hover')) {
//   console.log('Mouse is over the iconElement now.');
// } else {
//   console.log('Mouse is not over the iconElement now.');
//   animationQueue = [{ iconElement: iconElement, action: 'fade-out' }];
// }