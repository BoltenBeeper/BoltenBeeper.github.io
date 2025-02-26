let fireContainer = document.getElementById("fire-container");
function createParticles(fireContainer, num, leftSpacing) {
  for (let i = 0; i < num; i += 1) {
    let particle = document.createElement("div");
    particle.style.left = `calc((100% - 5em) * ${i / leftSpacing })`;
    particle.setAttribute("class", "particle");
    particle.style.animationDelay = 4 * Math.random() + "s";
    fireContainer.appendChild(particle);
  }
}

createParticles(fireContainer, 200, 200); // 200 particles, 200px spacing