let animationQueue = [];
let currentAnimation = null;

const processQueue = () => {
  if (animationQueue.length === 0 || currentAnimation) return;

  const { element, action } = animationQueue.shift();
  currentAnimation = element;

  if (action === 'fade-in') {
    element.classList.add('active');
    element.classList.remove('fading-out');
    setTimeout(() => {
      element.classList.add('fading-in');
    }, 1);
    setTimeout(() => {
      element.classList.remove('fading-in');
      currentAnimation = null;
      processQueue();
    }, Number(document.querySelector(".icon-container").dataset.duration) + 1);
  } else if (action === 'fade-out') {
    element.classList.remove('fading-in');
    setTimeout(() => {
      element.classList.add('fading-out');
    }, 1);
    setTimeout(() => {
      element.classList.remove('fading-out');
      element.classList.remove('active');
      currentAnimation = null;
      processQueue();
    }, Number(document.querySelector(".icon-container").dataset.duration) + 1);
  }
};

const handleHover = (element) => {
  const destination = element.dataset.destination;
  const destinationElement = document.querySelector(`#${destination}`);

  element.addEventListener('mouseenter', () => {
    if (destinationElement.classList.contains('active')) return;
    animationQueue = [{ element: destinationElement, action: 'fade-in' }];
    processQueue();
  });

  element.addEventListener('mouseleave', () => {
    animationQueue.push({ element: destinationElement, action: 'fade-out' });
    processQueue();
  });
};

const buttons = document.querySelectorAll('.journey-button');
buttons.forEach(button => handleHover(button));