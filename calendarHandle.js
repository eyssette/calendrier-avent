function handleCalendar() {
	const contentNotAvalaible = "Ce n'est pas encore le bon jour, merci de patienter !"

	const daySections = document.querySelectorAll(".day");
	// Récupérer la date actuelle
	const currentDate = new Date();
	const currentDay = currentDate.getDate();

	function dayContentHide() {
		daySections.forEach((daySection) => {
			const dayContent = daySection.querySelector(".dayContent");
			dayContent.style.display = "none";
			daySection.classList.remove("active");
		});
	}

	daySections.forEach((daySection) => {
		const images = daySection.querySelector("h2+p")
		const dayContent = daySection.querySelector(".dayContent");

		// Parcourir chaque élément et ajouter la classe "datePassee" si nécessaire
		// Extraire l'ID du jour à partir de l'attribut "id"
		const id = parseInt(daySection.id.split("-")[1], 10);

		// Vérifier si l'ID est inférieur au jour actuel
		if (id < currentDay) {
			daySection.classList.add("pastDate");
			if (images.children.length == 2) {
				images.children[0].remove();
			}
		}
		if (id > currentDay) {
			daySection.classList.add("futureDate");
		}


		
		const closeButton = daySection.querySelector(".closeButton");

		// Afficher dayContent lors du clic sur day
		daySection.addEventListener("click", function (event) {
			dayContentHide();
			if (daySection.classList.contains("futureDate")) {
				// Si c'est un jour futur, on n'affiche pas le contenu
				dayContent.children[1].innerHTML = contentNotAvalaible;
			}
			dayContent.style.display = "block";
			daySection.classList.add("active");
			event.stopPropagation();
		});

		// Masquer dayContent lors du clic en dehors ou appui sur "Esc"
		document.addEventListener("click", function () {
			dayContentHide();
		});

		document.addEventListener("keydown", function (event) {
			if (event.key === "Escape") {
				dayContentHide();
			}
		});

		closeButton.addEventListener("click", function(event) {
			dayContentHide();
		})


		// Empêcher la propagation du clic à partir de dayContent vers le document
		dayContent.addEventListener("click", function (event) {
			event.stopPropagation();
		});
	});
}