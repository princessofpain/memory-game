
const field = document.querySelector('.grid-container');
let count = 0;
let clickEvent = 0;
clickedCards = [];
usedCards = [];
item = [];
field.addEventListener('click', changeCards);

function changeCards(){
	event.preventDefault();
	// identification of the clicked card and the first child (item/ the other side of the card)
	const clicked = event.target;
	item[clickEvent] = clicked.firstElementChild;
	// changing the other side of the card to be visible by changing the class in CSS
	item[clickEvent].className = 'visible';
	console.log(item[clickEvent].className);

	// getting the class name of the recently clicked card and storing it in an array
	clickedCards[clickEvent] = clicked.className;
	// getting the clicked element and storing it in an array
	usedCards[clickEvent] = clicked;
	// incrementing the number of the guesses to allow max. 2
	count++;

	// special action when 2 guesses were done
	if (count == '2'){
		// if the class names are different the class of the two last recently moved cards is 
		// changed back to .hidden
		if (clickedCards[clickEvent] != clickedCards[clickEvent-1]){
			const visibleFirstCard = item[clickEvent-1];
			const visibleSecondCard = item[clickEvent];
			visibleFirstCard.className = '.hidden';
			visibleSecondCard.className = '.hidden';
		} else {
		// if there is a match the class of the two last recently moved cards is changed to .match 
		// 	to avoid more click reactions or changes of this card
			const firstCard = usedCards[clickEvent-1];
			firstCard.className = '.match';
			const secondCard = usedCards[clickEvent]
			secondCard.className = '.match'; 
		}	
	// count has to be set to 0 to allow 2 guesses max.
		count = 0;
	}	
	//clickEvent has to be incremented to count through the arrays (arrays store the clicked cards 
	//and the class names)	
	clickEvent++;		
}

