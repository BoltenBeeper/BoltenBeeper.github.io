const ANIMATION_DURATION = 1000;
let animationQueue = [];
const processQueue = (name) => {
  console.log('Currently rocessing:', name);
}

// for buttons with a class of 'journey-button' and a data-destination attribute
// will effect elements with an id that matches the data-destination value

const handleHover = (element) => {
  const destination = element.dataset.destination;
  const destinationElement = document.querySelector(`#${destination}`);

  element.addEventListener('mouseenter', () => {
    console.log('start hover button:', destination);
    destinationElement.classList.remove('idle');
    destinationElement.classList.add('active');
  });

  element.addEventListener('mouseleave', () => {
    console.log('stop hover button:', destination);
    destinationElement.classList.add('idle');
    destinationElement.classList.remove('active');
  });
}

const buttons = document.querySelectorAll('.journey-button');
buttons.forEach(button => handleHover(button));