
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
mix.addEventListener('click', function(){
	mixCards();
});

function changeCards(){
	event.preventDefault();
	const clicked = event.target;
	clickEvent++;
	
	if (clicked.classList.contains('card') === true){
		counter();
		// identification of the clicked card and the first child (item/ the other side of the card)
		item[clickEvent] = clicked.firstElementChild;
		item[clickEvent].className = 'visible';

		// storing the class name of the recently clicked card and the one before
		clickedCardsClasses[clickEvent] = clicked.className;		
		// storing the clicked element and storing it in an array
		usedCards[clickEvent] = clicked;

		// incrementing the number of the guesses to allow max. 2
		count++;
	} else {
		// skipping and erasing all unrelated clickEvents
		clickEvent--;
	} 
		
		// special action when 2 guesses were done
	if (count > 1){
		if (clickedCardsClasses[clickEvent] != clickedCardsClasses[clickEvent-1]){
		fail();
		} else {			
			match();
		}	
	// count has to be set to 0 to allow 2 guesses max.
		count = 0;	
	//clickEvent has to be incremented to count through the arrays (arrays store the clicked cards 
	//and the class names)					
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
// if the class names are different the class of the two last recently moved cards is 
	// changed back to .hidden
		const firstCardClass = clickedCardsClasses[clickEvent-1];	
		const secondCardClass = clickedCardsClasses[clickEvent];

		usedCards[clickEvent-1].className = 'fail';	
		usedCards[clickEvent].className = 'fail';
		setTimeout(function(){
			usedCards[clickEvent-1].firstElementChild.className = 'hidden';
			usedCards[clickEvent].firstElementChild.className = 'hidden';	
			usedCards[clickEvent-1].className = firstCardClass;
			usedCards[clickEvent].className = secondCardClass;
		}, 1000);				
		// clearTimeout(timeout);
	// if there is a match the class of the two last recently moved cards is changed to .match 
	// 	to avoid more click reactions or changes of this cards	
}

function match(){
	usedCards[clickEvent-1].className = 'match';	
	usedCards[clickEvent].className = 'match'; 

	// show the winner message if all cards are matched
	youWon();
}

function youWon(){
	const leftCards = document.getElementsByClassName('card');
	if(leftCards.length === 0){
		gameFinished();
	}
}

function gameFinished(firstCard, secondCard){
	const game = document.querySelector('.grid-container');
	game.style.display = 'none';

	const winnerMessage = document.querySelector('.winner');
	winnerMessage.style.display = 'block';
}

function mixCards() {
	let cards = field.childNodes;
	console.log(cards);


}



