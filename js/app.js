/*
 * Create a list that holds all of your cards
 */

let cards = document.querySelectorAll('.card');

let card = ['./img/008.svg', './img/008.svg',
    './img/007.svg', './img/007.svg',
    './img/006.svg', './img/006.svg',
    './img/005.svg', './img/005.svg',
    './img/004.svg', './img/004.svg',
    './img/003.svg', './img/003.svg',
    './img/002.svg', './img/002.svg',
    './img/001.svg', './img/001.svg',
]

let openCards = [];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

shuffle(card);

for (i = 0; i < cards.length; i++) {
    const icons = document.createElement('img');
    const icon = cards[i].appendChild(icons);
    icon.setAttribute("src", card[i]);
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(cards) {
    var currentIndex = cards.length,
        temporaryValue, randomIndex;

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
    let moves = document.querySelector('.moves');
    let star3 = document.querySelector('#star3');
    let star2 = document.querySelector('#star2');
    let star1 = document.querySelector('#star1');
    total += el / 2;
    moves.textContent = Math.round(total);
    if (total > 8 && total <= 10) {
        star3.classList.remove('fa-star');
        star3.classList.add('fa-star-half-o');
    } else if (total > 10 && total <= 12) {
        star3.classList.remove('fa-star-half-o');
        star3.classList.add('fa-star-o');
    } else if (total > 12 && total <= 14) {
        star2.classList.remove('fa-star');
        star2.classList.add('fa-star-half-o');
    } else if (total > 14 && total <= 16) {
        star2.classList.remove('fa-star-half-o');
        star2.classList.add('fa-star-o');
    } else if (total > 16 && total <= 18) {
        star1.classList.remove('fa-star');
        star1.classList.add('fa-star-half-o');
    } else if (total > 18) {
        star1.classList.remove('fa-star-half-o');
        star1.classList.add('fa-star-o');
    }
}

const deck = document.querySelector('.deck');
deck.addEventListener('click', onClick);

function onClick(event) {
    if (event.target.nodeName === 'LI') {
        event.target.classList.add('open', 'show');
        openCards.push(event.target);
        event.target.style.pointerEvents = "none";
        countMoves(1);
        if (openCards.length === 2 && openCards[0].firstElementChild.currentSrc ===
            openCards[1].firstElementChild.currentSrc) {
            addMatch();
            console.log('true');
            gameWon();
        } else if (openCards.length === 2 && openCards[0].firstElementChild.currentSrc !== openCards[1].firstElementChild.currentSrc) {
            misMatch();
        }
    }
}

function addMatch() {
    let cardOne = openCards[0];
    let cardTwo = openCards[1];
    cardOne.classList.remove('open', 'show');
    cardOne.classList.add('match');
    cardOne.style.pointerEvents = "none";
    cardTwo.classList.remove('open', 'show');
    cardTwo.classList.add('match');
    cardTwo.style.pointerEvents = "none";
    openCards = [];
}

function misMatch() {
    let cardOne = openCards[0];
    let cardTwo = openCards[1];
    deck.style.pointerEvents = "none";
    setTimeout(() => { deck.removeAttribute("style") }, 1000);
    setTimeout(() => {
        cardOne.classList.remove('open', 'show');
        cardOne.removeAttribute("style");
        cardTwo.classList.remove('open', 'show');
        cardTwo.removeAttribute("style");
        openCards = [];
    }, 1000);
}

function gameWon() {
    let matchedCards = document.querySelectorAll('.match');
    if (matchedCards.length === 16) {
        const page = document.querySelector('.container');
        const result = document.querySelector('.score-panel');
        const newDiv = document.createElement('div');
        newDiv.classList.add('container', 'newgame');
        const newDiv1 = document.body.appendChild(newDiv);
        newDiv1.appendChild(result);
        page.style.display = "none";
        newDiv1.insertAdjacentHTML('afterbegin', `<h1>You Won!</h1><h1 id="result"></h1><button onClick="window.location.reload()">Start new game!</button>`);
        console.log('you won!');
    }
}
//reset
document.querySelector('.restart').addEventListener('click', () => {
    window.location.reload();
})