const card = document.querySelector('.card');
const field = document.querySelector('.grid-container');

field.addEventListener('click', changeCard);

function changeCard(){
	const clickedCard = event.target;
	const clickedCardItem = event.target.getElementsByClassName(".item");
	const clickedCardCover = event.target.getElementsByClassName(".cover");
	clickedCardItem.style.display = "grid";
	clickedCardCover.style.display = "none";
}