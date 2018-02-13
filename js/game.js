
const field = document.querySelector('.grid-container');
let count = 0;

field.addEventListener('click', function(event){
    event.preventDefault();  
	const clicked = event.target;
	const item = clicked.firstElementChild;
	
	if(count < 2){
		const clicked = event.target;
	    const item = clicked.firstElementChild;
		item.className = "visible";
		count++;
	} else {
		for(i = 0; i < 2; i++){
			visibleItem = document.querySelector('.visible');
			visibleItem.setAttribute("class", "hidden");
		}		
		count = 0;
	}

	
});

