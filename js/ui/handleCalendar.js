import { yaml } from "../processMarkdown/yaml";

export function handleCalendar(startDay) {
	const contentNotAvalaible =
		"Ce n'est pas encore le bon jour, merci de patienter !";

	const daySections = document.querySelectorAll(".day");
	// Récupérer la date actuelle
	const currentDate = new Date();
	const currentDay = currentDate.getDate();
	const currentMonth = currentDate.getMonth();

	function dayContentHide() {
		if (!yaml || yaml.bouncingEffect != false) {
			document.querySelector(".currentDate").classList.add("bounce");
		}
		daySections.forEach((daySection) => {
			const dayContent = daySection.querySelector(".dayContent");
			dayContent.style.display = "none";
			daySection.classList.remove("active");
		});
	}

	daySections.forEach((daySection) => {
		const images = daySection.querySelector("h2+p");
		const dayContent = daySection.querySelector(".dayContent");

		// Parcourir chaque élément et ajouter la classe "datePassee" si nécessaire
		// Extraire l'ID du jour à partir de l'attribut "id"
		const id = parseInt(daySection.id.split("-")[1], 10);

		// On affiche le contenu seulement si on est au mois de décembre et si le jour du contenu est égal ou inférieur au jour actuel
		const displayFromDay = startDay ? startDay : currentDay;
		const displayFromMonth = startDay ? currentMonth : 11;
		if (currentMonth == displayFromMonth && id <= displayFromDay) {
			const classToAdd = id == displayFromDay ? "currentDate" : "pastDate";
			daySection.classList.add(classToAdd);
			if (images.children.length == 2 && id < displayFromDay) {
				images.children[0].remove();
			}
		} else {
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
			if (daySection.classList.contains("currentDate")) {
				document.querySelector(".currentDate").classList.remove("bounce");
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

		closeButton.addEventListener("click", function () {
			dayContentHide();
		});

		// Empêcher la propagation du clic à partir de dayContent vers le document
		dayContent.addEventListener("click", function (event) {
			event.stopPropagation();
		});
	});
	if (!yaml || yaml.bouncingEffect != false) {
		document.querySelector(".currentDate").classList.add("bounce");
	}
}
