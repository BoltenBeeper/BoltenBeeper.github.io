const buttonsList = ["resume", "my-work", "reviews", "connect"]; // An unchanging list of all of the button's IDs. (NOTE: Icon IDs are different and have "icon-" infront of them)
let animationQueue = [] // Adds id when intro animation starts, removes once in middle animation point (idle)
let onScreenList = [] // Adds id when intro animation starts, removes at very end of exit animation
let buttonHovered // True when any button is being hovered over at all, false when not
var enteringElement = null // Contains the current element object in the entering animation phase, null when no element is in that phase
var idleElement = null // Contains the current element object in the idling animation phase, null when no element is in that phase
var exitingElement = null // Contains the current element object in the exiting animation phase, null when no element is in that phase
let currentleyHovered // Specific button id that is currently hovered
let enteringLock = false // True at start of makeIconEnter(), false at end (Ensuring function can only be run once at a time)
let exitingLock = false // True at start of makeIconExit(), false at end (Ensuring function can only be run once at a time)
let removedId = undefined // Contains the id of the element that was removed from the animation queue

let resumeButton = document.getElementById("resume")
let myWorkButton = document.getElementById("my-work")
let reviewsButton = document.getElementById("reviews")
let connectButton = document.getElementById("connect")

resumeButton.addEventListener("mouseover", () => buttonHover("resume"))
myWorkButton.addEventListener("mouseover", () => buttonHover("my-work"))
reviewsButton.addEventListener("mouseover", () => buttonHover("reviews"))
connectButton.addEventListener("mouseover", () => buttonHover("connect"))

resumeButton.addEventListener("mouseout", () => buttonStopHover("resume"))
myWorkButton.addEventListener("mouseout", () => buttonStopHover("my-work"))
reviewsButton.addEventListener("mouseout", () => buttonStopHover("reviews"))
connectButton.addEventListener("mouseout", () => buttonStopHover("connect"))

function updateAnimatingElementClass() { // Removes all animation classes from icons, then reapplies only the relevant, current ones
  for (i = 0; i < buttonsList.length; i++) {
    targetElement = document.getElementById("icon-" + buttonsList[i])
    targetElement.classList.remove("entering", "idle", "exiting"); // Remove all animation classes for all icons
  }
  
  // Regulates elements so that any given element can only have one animating class in case of accidental breaking (Keeps latest stage of animation)
  if (enteringElement == idleElement || enteringElement == exitingElement) {
    enteringElement = null;
  };
  if (idleElement == exitingElement) {
    idleElement = null;
  };
  
  // Add classes to elements one by one to ensure only one can have each class at any givent time
  if (enteringElement != null) {
    enteringElement.classList.add("entering")
  }
  if (idleElement != null) {
    idleElement.classList.add("idle")
  }
  if (exitingElement != null) {
    exitingElement.classList.add("exiting")
  }
}

function buttonHover(buttonClass) { // Add last hovered button to queue - start entering animation for first icon in queue if possible
  
  buttonHovered = true // CHECK: HOVERING
  currentleyHovered = buttonClass
  
  if (animationQueue.length >= 2) {  // Keeps the queue always 2 or less
    animationQueue.pop();
  }
  
  if (animationQueue[0] != buttonClass) {
    animationQueue.push(buttonClass);
  }
  
  if (currentleyHovered != removedId || !exitingLock) { // If unhovered than rehovered over the same button as last animated, dont enter to let exit animation finish
    makeIconEnter() // If there is room, make an icon enter (necessary checks already exist in the function)
  }
  
}

function buttonStopHover() {
  buttonHovered = false // UNCHECK: HOVERING
  
  if (animationQueue.length > 1 ) {
    animationQueue.pop()
  }
  
  if (removedId == animationQueue[0] && !enteringLock) { // Very specific case
    animationQueue.shift()
  }
  
  makeIconExit() // If there is an icon idling, start it's exit animation (necessary checks already exist in the function)
}

// [FOUR] activation points
// 1: Right when button is hovered over (buttonHover())
// 2: Right at end of ENTERING animation if no button or a different button is hovered over and queue has items (makeIconIdle())
// 3: Right as EXITING animation starts (makeIconExit())
// 4: Right at end of EXITING animation if queue has items (makeIconExit())
function makeIconEnter() {
  if (animationQueue.length > 0 && onScreenList.length < 2 && enteringElement == null && !enteringLock) { // If there are less than two icons on screen and no other element is entering
    enteringLock = true
    
    enteringElement = document.getElementById("icon-" + animationQueue[0]);
    updateAnimatingElementClass();
    
    // onScreenList.push(animationQueue[0]);
    findTrueOnScreenList() // Using this as a replacement for onScreenList.shift() for now
    
    setTimeout(function(){ // After animating: vvv
      enteringLock = false
      makeIconIdle()
    }, 500)
  }
}

// [ONE] activation point
// 1: At the end of the enter animation (makeIconEnter())
function makeIconIdle() {
  idleElement = enteringElement;
  enteringElement = null;
  updateAnimatingElementClass();
  
  removedId = animationQueue.shift()
  
  if (!buttonHovered || (removedId != undefined && currentleyHovered != removedId)) { // If no button is hovered over by this point, or a new button is hovered, instantly move on to exiting animation
    makeIconExit()
    if (animationQueue.length > 0) {
      makeIconEnter()
    }
  }
}

// [TWO] activation points
// 1: Right when a button stops being hovered over (buttonStopHover())
// 2: Right at end of ENTERING animation if no button is hovered over and queue has items (makeIconIdle())
function makeIconExit() {
  if (idleElement != null && !exitingLock) {
    exitingLock = true
    exitingElement = idleElement;
    idleElement = null;
    updateAnimatingElementClass();

    setTimeout(function(){ // After animating: vvv
      exitingElement = null;
      updateAnimatingElementClass();
      
      // onScreenList.shift()
      findTrueOnScreenList() // Using this as a replacement for onScreenList.shift() for now
    //   displayOnScreenList.innerHTML = ("On Screen: " + onScreenList) // For debugging
      exitingLock = false
      if (animationQueue.length > 0) {
        makeIconEnter()
        }
    }, 500)

    makeIconEnter() // If necessary/possible, start next icon enter animation (necessary checks already exist in the function)
  }
}

function findTrueOnScreenList() { // Will update animation queue and on screen list based on what classes any of the icons currently hold
  onScreenList = []
  for (i = 0; i < buttonsList.length; i++) {
    targetElement = document.getElementById("icon-" + buttonsList[i])
    if (String(targetElement.classList).includes("entering") || String(targetElement.classList).includes("idle") || String(targetElement.classList).includes("exiting")) {
      onScreenList.push(buttonsList[i])
    }
  }
}