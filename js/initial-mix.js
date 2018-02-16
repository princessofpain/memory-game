function mixCards() {
	let allCards = document.querySelectorAll(".card, .match");
	let shuffleNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

	shuffleArray(shuffleNumbers);

	// shuffle DOMTokenList by assigning a randomized array (1 - 16) to the css order property
	for (let i = 0; i < shuffleNumbers.length; i++) {
		allCards[i].style.order = shuffleNumbers[i];
		allCards[i].classList.remove("match");
		allCards[i].firstElementChild.className = "hidden";
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

mixCards();