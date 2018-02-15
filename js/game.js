
const field = document.querySelector('.grid-container');
let count = 0;
let clickEvent = 0;
clickedCardsClasses = [];
usedCards = [];
item = [];
field.addEventListener('click', changeCards);

function changeCards(){
	event.preventDefault();
	
	const clicked = event.target;
	clickEvent++;
	
	if (clicked.classList.contains('card') === true){
		let counter = document.querySelector('.counter');
		if (clickEvent === 1){
			counter.textContent = clickEvent + " move";
		} else {
			counter.textContent = clickEvent + " moves";
		}
		// identification of the clicked card and the first child (item/ the other side of the card)
		// changing the other side of the card to be visible by changing the class in CSS	
		item[clickEvent] = clicked.firstElementChild;
		item[clickEvent].className = 'visible';

		// getting the class name of the recently clicked card and the one before and storing 
		// it in an array
		clickedCardsClasses[clickEvent] = clicked.className;	
		const firstCardClass = clickedCardsClasses[clickEvent-1];	
		const secondCardClass = clickedCardsClasses[clickEvent];	
		// getting the clicked element and storing it in an array
		usedCards[clickEvent] = clicked;
		const firstCard = usedCards[clickEvent-1];
		const secondCard = usedCards[clickEvent];
		// incrementing the number of the guesses to allow max. 2
		count++;
		
		// special action when 2 guesses were done
		if (count > 1){
			// if the class names are different the class of the two last recently moved cards is 
			// changed back to .hidden
			if (clickedCardsClasses[clickEvent] != clickedCardsClasses[clickEvent-1]){
				firstCard.className = 'fail';	
				secondCard.className = 'fail';
				setTimeout(function(){
					firstCard.firstElementChild.className = 'hidden';
					secondCard.firstElementChild.className = 'hidden';	
					firstCard.className = firstCardClass;
					secondCard.className = secondCardClass;
				}, 1000);				
				// clearTimeout(timeout);
			// if there is a match the class of the two last recently moved cards is changed to .match 
			// 	to avoid more click reactions or changes of this cards	
			} else {			
				firstCard.className = 'match';	
				secondCard.className = 'match'; 

				// show the winner message if all cards are matched
				const leftCards = document.getElementsByClassName('card');
				if(leftCards.length === 0){
					gameFinished();
				}
			}	
		// count has to be set to 0 to allow 2 guesses max.
			count = 0;
		}	
		//clickEvent has to be incremented to count through the arrays (arrays store the clicked cards 
		//and the class names)			
	} else {
		// skipping and erasing all unrelated clickEvents
		clickEvent--;
	} 		
}

function gameFinished(){
	const game = document.querySelector('.grid-container');
	game.style.display = 'none';

	const winnerMessage = document.querySelector('.winner');
	winnerMessage.style.display = 'block';
}

// function shuffle(array) {
//   var m = array.length, t, i;

//   // While there remain elements to shuffle…
//   while (m) {

//     // Pick a remaining element…
//     i = Math.floor(Math.random() * m--);

//     // And swap it with the current element.
//     t = array[m];
//     array[m] = array[i];
//     array[i] = t;
//   }

//   return array;
// }

