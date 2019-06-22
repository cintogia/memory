/*
 * Create a list that holds all of your cards
 */

let cards = document.querySelectorAll(".card");

let card = [
  "./img/008.svg",
  "./img/008.svg",
  "./img/007.svg",
  "./img/007.svg",
  "./img/006.svg",
  "./img/006.svg",
  "./img/005.svg",
  "./img/005.svg",
  "./img/004.svg",
  "./img/004.svg",
  "./img/003.svg",
  "./img/003.svg",
  "./img/002.svg",
  "./img/002.svg",
  "./img/001.svg",
  "./img/001.svg"
];

let openCards = [];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

shuffle(card);

for (i = 0; i < cards.length; i++) {
  const icons = document.createElement("img");
  const icon = cards[i].appendChild(icons);
  icon.setAttribute("src", card[i]);
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(cards) {
  var currentIndex = cards.length,
    temporaryValue,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = cards[currentIndex];
    cards[currentIndex] = cards[randomIndex];
    cards[randomIndex] = temporaryValue;
  }

  return cards;
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

let total = 0;

function countMoves(el) {
  let moves = document.querySelector(".moves");
  let moveContent = document.querySelector(".moveText");
  let star3 = document.querySelector("#star3");
  let star2 = document.querySelector("#star2");
  let star1 = document.querySelector("#star1");
  // divide by two and round clicks to have: one Move = two open cards
  total += el / 2;
  moveNumber = Math.round(total);
  // create Text Content
  moveText = moveNumber === 1 ? 'Move' : 'Moves';
  moves.textContent = `${moveNumber}`;
  moveContent.textContent = `${moveText}`;

  // star rating system
  if (total > 8 && total <= 10) {
    star3.classList.remove("fa-star");
    star3.classList.add("fa-star-half-o");
  } else if (total > 10 && total <= 12) {
    star3.classList.remove("fa-star-half-o");
    star3.classList.add("fa-star-o");
  } else if (total > 12 && total <= 14) {
    star2.classList.remove("fa-star");
    star2.classList.add("fa-star-half-o");
  } else if (total > 14 && total <= 16) {
    star2.classList.remove("fa-star-half-o");
    star2.classList.add("fa-star-o");
  } else if (total > 16 && total <= 18) {
    star1.classList.remove("fa-star");
    star1.classList.add("fa-star-half-o");
  } else if (total > 18) {
    star1.classList.remove("fa-star-half-o");
    star1.classList.add("fa-star-o");
  }
}

// timer function https://stackoverflow.com/a/5517836
let minLabel = document.getElementById("min");
let secLabel = document.getElementById("sec");
let totalSeconds = 0;
let timer;

function setTime() {
  ++totalSeconds;
  secLabel.innerHTML = pad(totalSeconds % 60);
  minLabel.innerHTML = pad(parseInt(totalSeconds / 60));
}

function pad(val) {
  let valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
}

// event delegation
const deck = document.querySelector(".deck");
deck.addEventListener("click", onClick);

function onClick(event) {
  // makes Listener only valid for list items
  if (event.target.nodeName === "LI") {
    // check if timer has already started
    if (!timer) {
      timer = setInterval(setTime, 1000);
    }
    event.target.classList.add("open", "show");
    openCards.push(event.target);
    // prevent click on card twice
    event.target.style.pointerEvents = "none";
    // count every click on a card once and pass it to the appropriate function
    countMoves(1);
    // compare cards
    if (
      openCards.length === 2 &&
      openCards[0].firstElementChild.currentSrc ===
        openCards[1].firstElementChild.currentSrc
    ) {
      addMatch();
      console.log("true");
      gameWon();
    } else if (
      openCards.length === 2 &&
      openCards[0].firstElementChild.currentSrc !==
        openCards[1].firstElementChild.currentSrc
    ) {
      misMatch();
    }
  }
}

// lock cards and prevents clicks
function addMatch() {
  let cardOne = openCards[0];
  let cardTwo = openCards[1];
  cardOne.classList.remove("open", "show");
  cardOne.classList.add("match");
  cardOne.style.pointerEvents = "none";
  cardTwo.classList.remove("open", "show");
  cardTwo.classList.add("match");
  cardTwo.style.pointerEvents = "none";
  openCards = [];
}

// show cards for one second and prevent clicks until cards are hidden again
function misMatch() {
  let cardOne = openCards[0];
  let cardTwo = openCards[1];
  deck.style.pointerEvents = "none";

  // make cards clickable after 1 sec, hiding
  setTimeout(() => {
    deck.removeAttribute("style");
  }, 1000);

  // hide cards after 1 sec
  setTimeout(() => {
    cardOne.classList.remove("open", "show");
    cardOne.removeAttribute("style");
    cardTwo.classList.remove("open", "show");
    cardTwo.removeAttribute("style");
    openCards = [];
  }, 1000);
}

// show Modal after winning the game
function gameWon() {
  let matchedCards = document.querySelectorAll(".match");
  if (matchedCards.length === 16) {
    clearInterval(timer);
    // Modal https://www.w3schools.com/howto/howto_css_modals.asp
    let modal = document.getElementById("myModal");

    // get current moves count and show in modal
    let moves = document.querySelector(".moves").textContent;
    document.querySelector(".modal-body>p>span").textContent = moves;

    // get current rating and show in modal
    let stars = document.querySelector("section>.stars").innerHTML;
    document.querySelector("#result").innerHTML = stars;

    // get current time and show in modal
    let min = document.querySelector("#min").textContent;
    let sec = document.querySelector("#sec").textContent;
    document.querySelector("#modal-min").textContent = min;
    document.querySelector("#modal-sec").textContent = sec;

    // Get the <span> element that closes the modal
    let span = document.getElementsByClassName("close")[0];

    // show modal
    modal.style.display = "block";

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
      modal.style.display = "none";
    };

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    };
    console.log("you won!");
  }
}
// Reset button, reloads the page onClick
document.querySelector(".restart").addEventListener("click", () => {
  window.location.reload();
});

// install service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/sw.js')
    .then(function() {
      console.log('[ServiceWorker] Register')
    })
}
