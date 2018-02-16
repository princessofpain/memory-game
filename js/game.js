let count = 0;
let clickEvent = 0;
let clickedCardsClasses = [];
let usedCards = [];
let item = [];

const field = document.querySelector('.grid-container');
field.addEventListener('click', function(event){
	changeCards();
});

const mix = document.querySelector('.mix-cards');
mix.addEventListener('click', mixCards);

function changeCards(){
	event.preventDefault();
	const clicked = event.target;
	clickEvent++;
	
	if (clicked.classList.contains('card') === true){
		counter();
		// identification of the clicked card and the other side of the card as child
		item[clickEvent] = clicked.firstElementChild;
		item[clickEvent].className = 'visible';

		// storing the class name of the recently clicked card in an array
		clickedCardsClasses[clickEvent] = clicked.className;		
		// storing the clicked element in an array
		usedCards[clickEvent] = clicked;

		// incrementing the number of the guesses to allow max. 2
		count++;
	} else {
		// skipping and erasing all card-unrelated clickEvents
		clickEvent--;
	} 
		
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
		counter.textContent = clickEvent + " move";
	} else {
		counter.textContent = clickEvent + " moves";
	}
}

function fail(){
	usedCards[clickEvent-1].classList.add('fail');	
	usedCards[clickEvent].classList.add('fail');

	setTimeout(function(){
		usedCards[clickEvent-1].firstElementChild.className = 'hidden';
		usedCards[clickEvent].firstElementChild.className = 'hidden';	
		usedCards[clickEvent-1].classList.remove('fail');
		usedCards[clickEvent].classList.remove('fail');
	}, 1000);					
}

function match(){
	console.log(usedCards[clickEvent-1].classList + " " + usedCards[clickEvent].classList);
	usedCards[clickEvent-1].classList.add('match');	
	usedCards[clickEvent].classList.add('match'); 
	console.log(usedCards[clickEvent-1].classList + " " + usedCards[clickEvent].classList);

	// show the winner message if all cards are matched
	youWon();
}

function youWon(){
	const leftCards = document.getElementsByClassName('card');

	if(leftCards.length === 0){
		const game = document.querySelector('.grid-container');
		game.style.display = 'none';

		const winnerMessage = document.querySelector('.winner');
		winnerMessage.style.display = 'block';
	}
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
}

// Durstenfeld shuffle for ES6
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

