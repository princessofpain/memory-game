
const field = document.querySelector('.grid-container');
let count = 0;
let clickEvent = 0;
clickedCardsClasses = [];
usedCards = [];
item = [];
field.addEventListener('click', changeCards);

function changeCards(){
	event.preventDefault();
	// identification of the clicked card and the first child (item/ the other side of the card)
	let clicked = event.target;

	// skipping a click event for the container
	if(clicked.className === 'grid-container'){
		alert('Click on a card to play!');
	} else {
		// changing the other side of the card to be visible by changing the class in CSS	
		item[clickEvent] = clicked.firstElementChild;
		item[clickEvent].className = 'visible';
		const visibleFirstCard = item[clickEvent-1];
		const visibleSecondCard = item[clickEvent];

		// getting the class name of the recently clicked card and the one before and storing 
		// it in an array
		clickedCardsClasses[clickEvent] = clicked.className;		
		// getting the clicked element and storing it in an array
		usedCards[clickEvent] = clicked;
		const firstCard = usedCards[clickEvent-1];
		const secondCard = usedCards[clickEvent];
		// incrementing the number of the guesses to allow max. 2
		count++;
		// special action when 2 guesses were done
		if (count == '2'){
			// if the class names are different the class of the two last recently moved cards is 
			// changed back to .hidden
			if (clickedCardsClasses[clickEvent] != clickedCardsClasses[clickEvent-1]){
				// firstCard.classList.toggle = 'fail';	
				// secondCard.classList.toggle = 'fail';
				firstCard.className = clickedCardsClasses[clickEvent-1];	
				secondCard.className = clickedCardsClasses[clickEvent]; 
				visibleFirstCard.className = 'hidden';
				visibleSecondCard.className = 'hidden';	
					
			// if there is a match the class of the two last recently moved cards is changed to .match 
			// 	to avoid more click reactions or changes of this cards	
			} else {			
				firstCard.className = 'match';	
				secondCard.className = 'match'; 
				console.log(firstCard.classList + " " + secondCard.classList);
			}	
		// count has to be set to 0 to allow 2 guesses max.
			count = 0;
		}	
		//clickEvent has to be incremented to count through the arrays (arrays store the clicked cards 
		//and the class names)	
		clickEvent++;	
	}	
}
