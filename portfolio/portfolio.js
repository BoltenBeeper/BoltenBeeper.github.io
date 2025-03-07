// Fire animation code adapted from: https://codepen.io/LiaTsernant/pen/KKvMyLp

// Get the fire container element
let fireContainer = document.getElementById("fire-container");

// Variables for particle interval and audio context
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

// Function to resume the AudioContext on user interaction
function resumeAudioContext() {
  if (audioContext.state === 'suspended') {
    audioContext.resume().then(() => {
      console.log("Audio context resumed");
    }).catch((error) => {
      console.error("Error resuming audio context:", error);
    });
  }
}

// Add event listeners to resume AudioContext on click or keydown
document.addEventListener('click', resumeAudioContext, { once: true });
document.addEventListener('keydown', resumeAudioContext, { once: true });

// Function to create a particle element and add it to the specific fire container
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

// Function to start creating particles and play the fire sound for a specific container
function startCreatingParticles(fireContainer) {
  if (!document.getElementById('sound-toggle').checked) {
    resumeAudioContext();
    fadeInSound();
  }
  particleInterval = setInterval(() => {
    createParticle(fireContainer);
  }, 10); // Create a particle every 10ms
}

// Function to stop creating particles and fade out the fire sound
function stopCreatingParticles() {
  clearInterval(particleInterval);
  if (!document.getElementById('sound-toggle').checked) {
    fadeOutSound();
  }
}

// Function to fade in the fire sound
function fadeInSound() {
  if (fadeOutTimeout) {
    clearTimeout(fadeOutTimeout);
    fadeOutTimeout = null;
  }
  gainNode.gain.cancelScheduledValues(audioContext.currentTime);
  gainNode.gain.setValueAtTime(gainNode.gain.value, audioContext.currentTime);
  gainNode.gain.linearRampToValueAtTime(2, audioContext.currentTime + .5);
  if (!isPlaying) {
    isPlaying = true;
    audioElement.play();
  }
}

// Function to fade out the fire sound
function fadeOutSound() {
  if (isPlaying) {
    gainNode.gain.cancelScheduledValues(audioContext.currentTime);
    gainNode.gain.setValueAtTime(gainNode.gain.value, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + .5);
    fadeOutTimeout = setTimeout(() => {
      audioElement.pause();
      isPlaying = false;
    }, 500);
  }
}

// Function to hide the overlay and resume AudioContext on user interaction
function hideOverlay() {
  document.getElementById('overlay').style.display = 'none';
  resumeAudioContext();
  localStorage.setItem('overlayShown', 'true'); // Set flag in localStorage
}

// Function to show the overlay and unset the flag in localStorage
function showOverlay() {
  document.getElementById('overlay').style.display = 'flex';
  localStorage.removeItem('overlayShown'); // Unset flag in localStorage
}

// Check if the overlay has been shown before
if (!localStorage.getItem('overlayShown')) {
  document.getElementById('overlay').style.display = 'flex';
  document.getElementById('sound-toggle').checked = false; // Unmute
} else {
  document.getElementById('overlay').style.display = 'none';
  resumeAudioContext();
  document.getElementById('sound-toggle').checked = true; // Mute
}

// Add event listeners to hide the overlay on click or keydown
document.getElementById('overlay').addEventListener('click', hideOverlay);
document.addEventListener('keydown', hideOverlay, { once: true });

// Add event listener to show the overlay on pressing the "o" key
document.addEventListener('keydown', (event) => {
  if (event.key === 'w') {
    showOverlay();
  }
});

// Add event listener to show the overlay when the welcome button is clicked
document.getElementById('welcome-button').addEventListener('click', showOverlay);

// Add event listeners to start and stop creating particles on hover for each button
document.querySelector('.button-container-one').addEventListener('mouseenter', () => startCreatingParticles(document.getElementById('fire-container-one')));
document.querySelector('.button-container-one').addEventListener('mouseleave', stopCreatingParticles);

document.querySelector('.button-container-two').addEventListener('mouseenter', () => startCreatingParticles(document.getElementById('fire-container-two')));
document.querySelector('.button-container-two').addEventListener('mouseleave', stopCreatingParticles);

document.querySelector('.button-container-three').addEventListener('mouseenter', () => startCreatingParticles(document.getElementById('fire-container-three')));
document.querySelector('.button-container-three').addEventListener('mouseleave', stopCreatingParticles);

document.querySelector('.button-container-four').addEventListener('mouseenter', () => startCreatingParticles(document.getElementById('fire-container-four')));
document.querySelector('.button-container-four').addEventListener('mouseleave', stopCreatingParticles);

// Update overlay header text on load and resize
// window.addEventListener('load', updateOverlayHeader);
// window.addEventListener('resize', updateOverlayHeader);

// Set the sound toggle to mute on page load
window.addEventListener('load', () => {
  if (document.getElementById('overlay').style.display === 'none') {
    document.getElementById('sound-toggle').checked = true; // Mute
  }
});

// Ensure the sound toggle resets to mute when the user returns to the page
window.addEventListener('pageshow', () => {
  if (document.getElementById('overlay').style.display === 'none') {
    document.getElementById('sound-toggle').checked = true; // Mute
  }
});
