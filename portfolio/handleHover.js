let animationQueue = [];
let currentAnimation = null;

const processQueue = () => {
  if (animationQueue.length === 0 || currentAnimation) return;

  const { element, action } = animationQueue.shift();
  currentAnimation = element;

  if (action === 'fade-in') {
    element.classList.add('active');
    element.classList.remove('fading-out');
    requestAnimationFrame(() => {
      element.classList.add('fading-in');
    });
    setTimeout(() => {
      element.classList.remove('fading-in');
      currentAnimation = null;
      processQueue();
    }, parseInt(getComputedStyle(element).getPropertyValue('--animation-duration')));
  } else if (action === 'fade-out') {
    element.classList.remove('fading-in');
    requestAnimationFrame(() => {
      element.classList.add('fading-out');
    });
    setTimeout(() => {
      element.classList.remove('fading-out');
      element.classList.remove('active');
      currentAnimation = null;
      processQueue();
    }, parseInt(getComputedStyle(element).getPropertyValue('--animation-duration')));
  }
};

const handleHover = (element) => {
  const destination = element.dataset.destination;
  const destinationElement = document.querySelector(`#${destination}`);

  element.addEventListener('mouseenter', () => {
    if (destinationElement.classList.contains('active') || destinationElement.classList.contains('fading-in')) return;
    animationQueue = [{ element: destinationElement, action: 'fade-in' }];
    processQueue();
  });

  element.addEventListener('mouseleave', () => {
    if (!destinationElement.classList.contains('active')) return;
    animationQueue.push({ element: destinationElement, action: 'fade-out' });
    processQueue();
  });
};

const buttons = document.querySelectorAll('.journey-button');
buttons.forEach(button => handleHover(button));