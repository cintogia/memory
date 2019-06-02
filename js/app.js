/*
 * Create a list that holds all of your cards
 */

let cards = document.querySelectorAll('.card');

let card = ['fa-diamond', 'fa-diamond', 'fa-paper-plane-o', 'fa-paper-plane-o', 'fa-anchor', 'fa-anchor', 'fa-bolt', 'fa-bolt', 'fa-cube', 'fa-cube', 'fa-leaf', 'fa-leaf', 'fa-bicycle', 'fa-bicycle', 'fa-bomb', 'fa-bomb']

let openCards = [];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

shuffle(card);

for (i = 0; i < cards.length; i++) {
    const icons = document.createElement('i');
    const icon = cards[i].appendChild(icons);
    icon.classList.add('fa', card[i]);
    //cards[i].addEventListener('click', function() {
    //  cards[i].classList.add('match');
    //});
    //cards[i].insertAdjacentHTML('afterbegin', card[i]);
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
    total += el;
    moves.textContent = total;
    if (total > 16 && total <= 20) {
        star3.classList.remove('fa-star');
        star3.classList.add('fa-star-half-o');
    } else if (total > 20 && total <= 24) {
        star3.classList.remove('fa-star-half-o');
        star3.classList.add('fa-star-o');
    } else if (total > 24 && total <= 28) {
        star2.classList.remove('fa-star');
        star2.classList.add('fa-star-half-o');
    } else if (total > 28 && total <= 32) {
        star2.classList.remove('fa-star-half-o');
        star2.classList.add('fa-star-o');
    } else if (total > 32 && total <= 36) {
        star1.classList.remove('fa-star');
        star1.classList.add('fa-star-half-o');
    } else if (total > 36) {
        star1.classList.remove('fa-star-half-o');
        star1.classList.add('fa-star-o');
    }
}

const deck = document.querySelector('.deck');
deck.addEventListener('click', onClick);

function onClick(event) {
    event.target.classList.add('open', 'show');
    openCards.push(event.target);
    countMoves(1);
    if (openCards.length === 2 && openCards[0].children[0].className === openCards[1].children[0].className) {
        addMatch();
        console.log('true');
        gameWon();
    } else if (openCards.length === 2 && openCards[0].children[0].className !== openCards[1].children[0].className) {
        misMatch();
    }
}

function addMatch() {
    openCards[0].classList.remove('open', 'show');
    openCards[1].classList.remove('open', 'show');
    openCards[0].classList.add('match');
    openCards[1].classList.add('match');
    //matchedCards = [matchedCards, ...openCards];
    openCards = [];
}

function misMatch() {
    setTimeout(() => {
        openCards[0].classList.remove('open', 'show');
        openCards[1].classList.remove('open', 'show');
        openCards = [];
    }, 1000);
}

function gameWon() {
    let matchedCards = document.querySelectorAll('.match');
    if (matchedCards.length === 2) { console.log('you won!'); }
}

document.querySelector('.restart').addEventListener('click', () => {
    let elements = document.querySelectorAll('.card');
    elements.forEach((el) => { el.removeChild(el.firstChild) });
    shuffle(cards);
})