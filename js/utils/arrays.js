// Pour réordonner de manière aléatoire un tableau
export function shuffleArray(array) {
	return array.sort(function () {
		return Math.random() - 0.5;
	});
}
