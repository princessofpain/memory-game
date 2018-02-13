const field = document.querySelector('.grid-container');

field.addEventListener('click', changeColor);

function changeColor(){
	const clicked = event.target;
	const item = clicked.firstElementChild;

	item.style.display= "grid";
}
