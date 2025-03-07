let animationQueue = [];
const processQueue = (name) => {
  console.log('Currently rocessing:', name);
}

// for buttons with a class of 'journey-button' and a data-destination attribute
// will effect elements with an id that matches the data-destination value

const handleHover = (element) => {
  const duration = Number(document.querySelector(".icon-container").dataset.duration);
  const destination = element.dataset.destination; // String from data-destination attribute
  const destinationElement = document.querySelector(`#${destination}`); // Image element to fade in/out
  destinationElement.style.setProperty("--animation-duration", duration);
  console.log('duration:', duration);

  element.addEventListener('mouseenter', () => {
    console.log('start hover button:', destination);
    if (destinationElement.classList.contains('active')) return;
    destinationElement.classList.add('active');
    destinationElement.classList.remove('fading-out');
    setTimeout(() => {destinationElement.classList.add('fading-in');}, 1);
    setTimeout(() => {
      destinationElement.classList.remove('fading-in');
    }, duration + 1);
  });

  element.addEventListener('mouseleave', () => {
    console.log('stop hover button:', destination);
    destinationElement.classList.remove('fading-in');
    setTimeout(() => {destinationElement.classList.add('fading-out');}, 1);
    setTimeout(() => {
      destinationElement.classList.remove('fading-out');
      destinationElement.classList.remove('active');
    }, duration + 1);
  });
}

const buttons = document.querySelectorAll('.journey-button');
buttons.forEach(button => handleHover(button));

// setTimeout(() => {
//   animationQueue.push({ image: destinationElement, action: 'fade-in' });
//   processQueue(destination);
// }, ANIMATION_DURATION);