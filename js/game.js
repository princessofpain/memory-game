let count = 0;
let clickEvent = 0;
let clickedCardsClasses = [];
let usedCards = [];
let item = [];
let sec = 0;
let timeCounter = 0;
let seconds = 0;
let minutes = 0;
let countEvent = 0;

const field = document.querySelector('.grid-container');
field.addEventListener('click', function(event){
	event.preventDefault();
	countEvent++;
	if(countEvent <= 2){
		startGame();
	}
});

const mix = document.querySelector('.mix-cards');
mix.addEventListener('click', mixCards);

const playAgain = document.querySelector('#play-again');
const winnerMessage = document.querySelector('.winner');
playAgain.addEventListener('click', function(){
	mixCards();
	field.style.display = 'grid';
	winnerMessage.style.display = 'none';
	document.querySelector('.header').style.display = 'flex';
});

function startGame() {
	const clicked = event.target;
	clickEvent++;
	if (clicked.classList.contains('card') === true){
		if(clickEvent === 1){
			timeCounter = setInterval(timer, 1000);
		}
		counter();

		starRating();
		turnCard(clicked);
		twoCardsOpen();
	} else {
		// skipping and erasing all card-unrelated clickEvents
		clickEvent--;
	}
}

function turnCard(clicked){
	// identification of the clicked card and the other side of the card as child
	item[clickEvent] = clicked.firstElementChild;
	item[clickEvent].className = 'visible';

	// storing the class name of the recently clicked card in an array
	clickedCardsClasses[clickEvent] = clicked.className;
	// storing the clicked element in an array
	usedCards[clickEvent] = clicked;

	// incrementing the number of the guesses to allow max. 2
	count++;
}

function twoCardsOpen(){
	// compare 2 guesses for giving a match or a fail
	if (count > 1){
		if (clickedCardsClasses[clickEvent] != clickedCardsClasses[clickEvent-1]){
		fail();
		} else {
			match();
		}
		// count has to be set to 0 to allow 2 guesses max.
		count = 0;
	}
}

function counter(){
	let counter = document.querySelector('.counter');
	if (clickEvent === 1){
		counter.textContent = clickEvent + ' move';
	} else {
		counter.textContent = clickEvent + ' moves';
	}
}

function timer() {
	function pad(val) {
    	return val > 9 ? val : '0' + val;
    }
    seconds = document.querySelector('.seconds').innerHTML = pad(++sec%60);
    minutes = document.querySelector('.minutes').innerHTML = pad(parseInt(sec/60,10));
}

function stopTimer() {
	clearInterval(timeCounter);
}

function resetTimer() {
	stopTimer();

	document.querySelector('.seconds').innerHTML = '00';
    document.querySelector('.minutes').innerHTML = '00';

    sec = 0;
}

function starRating() {
	if(clickEvent > 30 && clickEvent < 40){
		document.querySelector('.three').classList.add('unchecked');
		document.querySelector('.numberStars').textContent = '2';
	} else if (clickEvent > 40 && clickEvent < 50) {
		document.querySelector('.two').classList.add('unchecked');
		document.querySelector('.numberStars').textContent = '1';
	} else if (clickEvent > 50) {
		document.querySelector('.one').classList.add('unchecked');
		document.querySelector('.numberStars').textContent = '0';
	} else {
		document.querySelector('.numberStars').textContent = '3';
	}
}

function uncheckStars() {
	document.querySelector('.three').classList.remove('unchecked');
	document.querySelector('.two').classList.remove('unchecked');
	document.querySelector('.one').classList.remove('unchecked');
}

function fail(){
	usedCards[clickEvent-1].classList.add('fail');
	usedCards[clickEvent].classList.add('fail');

	setTimeout(function(){
		usedCards[clickEvent-1].firstElementChild.className = 'hidden';
		usedCards[clickEvent].firstElementChild.className = 'hidden';
		usedCards[clickEvent-1].classList.remove('fail');
		usedCards[clickEvent].classList.remove('fail');
	}, 1100);
}

function match(){
	usedCards[clickEvent-1].classList.add('match');
	usedCards[clickEvent].classList.add('match');

	const leftCards = document.getElementsByClassName('match');

	if(leftCards.length === 16){
		stopTimer();
		// shows the winner message if all cards are matched
		setTimeout(function(){
			youWon();
		}, 3000);
	}
}

function youWon(){
	field.style.display = 'none';
	document.querySelector('.header').style.display = 'none';
	document.querySelector('.attempts').textContent = clickEvent + ' moves';
	winnerMessage.style.display = 'block';
	document.querySelector('.timerAll').innerHTML = minutes + ':' + seconds;
}

function mixCards() {
	let allCards = document.querySelectorAll('.card, .match');
	let shuffleNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

	shuffleArray(shuffleNumbers);

	// shuffle DOMTokenList by assigning a randomized array (1 - 16) to the css order property
	for(let i = 0; i < shuffleNumbers.length; i++){
		allCards[i].style.order = shuffleNumbers[i];
		allCards[i].classList.remove('match');
		allCards[i].firstElementChild.className = 'hidden';
	}
	clickEvent = 0;
	counter();
	uncheckStars();
	resetTimer();
}

// Durstenfeld shuffle for ES6
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

