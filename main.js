// Effect Duration
let duration = 1000;

// Blocks Container
let blocksContainer = document.querySelector(".memory-game-blocks");

// Game Blocks
let blocks = Array.from(blocksContainer.children);
// Create Range Of Keys
let orderRange = Array.from(Array(blocks.length).keys());

// console.log(orderRange);  (old array)
shuffle(orderRange);
// console.log(orderRange);  (shuffled array)
// --------------------------------------------
// Add Order Css Property To Game Blocks
blocks.forEach((block, index) => {
  // Add CSS Order Property
  block.style.order = orderRange[index];

  // Add Click Event
  block.addEventListener("click", function () {
    // Trigger The Flip Block Function
    flipBlock(block);
    // check if the game has finished or not
    checkGame();
  });
});
// --------------------------------------------
// Flip Block Function
function flipBlock(selectedBlock) {
  // Add Class is-flipped
  selectedBlock.classList.add("is-flipped");

  // Collect All Flipped Cards
  let allFlippedBlocks = blocks.filter((flippedBlock) =>
    flippedBlock.classList.contains("is-flipped")
  );
  // If Theres Two Selected Blocks
  if (allFlippedBlocks.length === 2) {
    // Stop Clicking Function
    stopClicking();
    // Check Matched Block Function
    checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
  }
}
// --------------------------------------------
// Stop Clicking Function
function stopClicking() {
  // Add Class No Clicking on Main Container
  blocksContainer.classList.add("no-clicking");

  // Wait Duration
  setTimeout(() => {
    // Remove Class No Clicking After The Duration
    blocksContainer.classList.remove("no-clicking");
  }, duration);
}
// --------------------------------------------
// Check Matched Block
function checkMatchedBlocks(firstBlock, secondBlock) {
  let triesElement = document.querySelector(".tries span");

  if (firstBlock.dataset.technology === secondBlock.dataset.technology) {
    firstBlock.classList.remove("is-flipped");
    secondBlock.classList.remove("is-flipped");

    firstBlock.classList.add("has-match");
    secondBlock.classList.add("has-match");

    document.getElementById("success").currentTime = 0;
    document.getElementById("success").play();
  } else {
    triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;

    setTimeout(() => {
      firstBlock.classList.remove("is-flipped");
      secondBlock.classList.remove("is-flipped");
    }, duration);

    document.getElementById("fail").currentTime = 0;
    document.getElementById("fail").play();
  }
}
// --------------------------------------------
function checkGame() {
  let matchedBlocks = blocks.filter((block) =>
    block.classList.contains("has-match")
  );
  if (matchedBlocks.length === blocks.length) {
    setTimeout(() => {
      document.getElementById("win").play();
    }, 500);
    setTimeout(() => {
      location.href = "index.html";
    }, 5000);
  }
}
// --------------------------------------------
// Shuffle Function
function shuffle(array) {
  // Settings Vars
  let current = array.length - 1,
    temp,
    random;

  while (current > 0) {
    // Get Random Number
    random = Math.floor(Math.random() * current);

    // [1] Save Current Element in Stash
    temp = array[current];

    // [2] Current Element = Random Element
    array[current] = array[random];

    // [3] Random Element = Get Element From Stash
    array[random] = temp;
    // new current
    current--;
  }
  return array;
}
// --------------------------------------------
// Select The Start Game Button
setTimeout(() => {
  blocks.forEach((block) => {
    block.classList.add("is-flipped");
  });
  // stopClicking();
}, 500);
setTimeout(() => {
  blocks.forEach((block) => {
    block.classList.remove("is-flipped");
  });
}, 1800);
// stopClicking();
// --------------------------------------------
