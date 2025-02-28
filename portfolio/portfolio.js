// Fire animation code adapted from: https://codepen.io/LiaTsernant/pen/KKvMyLp

let fireContainer = document.getElementById("fire-container");
let particleInterval;
let audioContext = new (window.AudioContext || window.webkitAudioContext)();
let audioElement = document.getElementById("fire-sound-loop");
let track = audioContext.createMediaElementSource(audioElement);
let gainNode = audioContext.createGain();
track.connect(gainNode).connect(audioContext.destination);

// Set initial gain value to a higher level
gainNode.gain.value = 1;
let isPlaying = false;
let fadeOutTimeout;

// Ensure AudioContext is resumed on first user interaction
function resumeAudioContext() {
  if (audioContext.state === 'suspended') {
    audioContext.resume().then(() => {
      console.log("Audio context resumed");
    }).catch((error) => {
      console.error("Error resuming audio context:", error);
    });
  }
}

document.addEventListener('click', resumeAudioContext, { once: true });
document.addEventListener('keydown', resumeAudioContext, { once: true });

function createParticle(fireContainer) {
  let particle = document.createElement("div");
  particle.style.left = `calc((100% - 5em) * ${Math.random()})`;
  particle.style.height = 2 + Math.random() + "em";
  particle.style.backgroundColor = `hsl(${Math.random() * 50}, 0%, 0%)`;
  particle.setAttribute("class", "particle");
  particle.style.animationDelay = .01 * Math.random() + "s";
  particle.style.animationDuration = 1 + Math.random() + "s";
  fireContainer.appendChild(particle);

  // Remove particle after animation ends
  particle.addEventListener('animationend', () => {
    particle.remove();
  });
}

function startCreatingParticles() {
  resumeAudioContext();
  fadeInSound();
  particleInterval = setInterval(() => {
    createParticle(fireContainer);
  }, 10); // Create a particle every 10ms
}

function stopCreatingParticles() {
  clearInterval(particleInterval);
  fadeOutSound();
}

function fadeInSound() {
  if (fadeOutTimeout) {
    clearTimeout(fadeOutTimeout);
    fadeOutTimeout = null;
  }
  gainNode.gain.cancelScheduledValues(audioContext.currentTime);
  gainNode.gain.setValueAtTime(gainNode.gain.value, audioContext.currentTime);
  gainNode.gain.linearRampToValueAtTime(1, audioContext.currentTime + 0.5);
  if (!isPlaying) {
    isPlaying = true;
    audioElement.play();
  }
}

function fadeOutSound() {
  if (isPlaying) {
    gainNode.gain.cancelScheduledValues(audioContext.currentTime);
    gainNode.gain.setValueAtTime(gainNode.gain.value, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.5);
    fadeOutTimeout = setTimeout(() => {
      audioElement.pause();
      isPlaying = false;
    }, 500);
  }
}

// Hide overlay and resume AudioContext on user interaction
function hideOverlay() {
  document.getElementById('overlay').style.display = 'none';
  resumeAudioContext();
}

document.getElementById('overlay').addEventListener('click', hideOverlay);
document.addEventListener('keydown', hideOverlay, { once: true });

document.querySelector('.button-container-one').addEventListener('mouseenter', startCreatingParticles);
document.querySelector('.button-container-one').addEventListener('mouseleave', stopCreatingParticles);