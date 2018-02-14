
const field = document.querySelector('.grid-container');
let count = 0;
let clickEvent = 0;
clickedCards = [];
usedCards = [];
item = [];
field.addEventListener('click', changeCards);

function changeCards(){
	event.preventDefault();
	const clicked = event.target;
	item[clickEvent] = clicked.firstElementChild;
	item[clickEvent].className = 'visible';
	clickedCards[clickEvent] = clicked.className;
	usedCards[clickEvent] = clicked;
	count++;

	if (count == '2'){
		if (clickedCards[clickEvent] != clickedCards[clickEvent-1]){
			const visibleFirstCard = item[clickEvent-1];
			const visibleSecondCard = item[clickEvent];
			visibleFirstCard.className = '.hidden';
			visibleSecondCard.className = '.hidden';
		} else {
			const firstCard = usedCards[clickEvent-1];
			firstCard.className = '.match';
			const secondCard = usedCards[clickEvent]
			secondCard.className = '.match'; 
		}	
		count = 0;
	}		
	clickEvent++;		
}

