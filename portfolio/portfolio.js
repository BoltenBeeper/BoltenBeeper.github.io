let fireContainer = document.getElementById("fire-container");
let particleInterval;

function createParticle(fireContainer) {
  let particle = document.createElement("div");

  
  particle.style.left = `calc((100% - 5em) * ${Math.random()})`; // Randomize the horizontal position of the particle.
  // particle.style.width = 2 + Math.random() + "em"; // Randomize the width of the particle.
  particle.style.height = 2 + Math.random() + "em"; // Randomize the height of the particle.
  // particle.style.opacity = .5; // Make the particle fully opaque.
  particle.style.backgroundColor = `hsl(${Math.random() * 50}, 0%, 0%)`; // Randomize the background color of the particle.


  particle.setAttribute("class", "particle"); // Add the class of "particle" to the particle.
  particle.style.animationDelay = .01 * Math.random() + "s"; // Randomize the delay of the start and end of animation. This keeps different particles from starting at the same time.
  particle.style.animationDuration = 1 + Math.random() + "s"; // Randomize the duration of the animation. This keeps different particles moving at different speeds.
  fireContainer.appendChild(particle);

  // Remove particle after animation ends
  particle.addEventListener('animationend', () => {
    particle.remove();
  });
}

function startCreatingParticles() {
  particleInterval = setInterval(() => {
    createParticle(fireContainer);
  }, 10); // Create a particle every 10ms
}

function stopCreatingParticles() {
  clearInterval(particleInterval);
}

document.querySelector('.button-container-one').addEventListener('mouseenter', startCreatingParticles);
document.querySelector('.button-container-one').addEventListener('mouseleave', stopCreatingParticles);