import { yaml } from "../processMarkdown/yaml";

function shouldDisplayDay(
	id,
	currentDay,
	currentMonth,
	displayFromMonth,
	displayFrom,
) {
	let shouldDisplay = false;
	if (displayFrom) {
		console.log(displayFrom.gapDays);
		shouldDisplay =
			currentMonth == displayFrom.month &&
			currentDay >= displayFrom.day + (id - 1) * (displayFrom.gapDays + 1);
	} else {
		shouldDisplay = currentMonth == displayFromMonth && id <= currentDay;
	}
	return shouldDisplay;
}

function idRepresentsCurrentDay(id, currentDay, displayFrom) {
	if (displayFrom) {
		return currentDay == displayFrom.day + (id - 1) * (displayFrom.gapDays + 1);
	} else {
		return id == currentDay;
	}
}

export function handleCalendar(startDay) {
	const userPrefersReducedMotion = window.matchMedia(
		"(prefers-reduced-motion: reduce)",
	).matches;
	const snowContainer = document.body.querySelector(".snow-container");
	if (userPrefersReducedMotion) {
		snowContainer.style.display = "none";
	}
	let showBouncingEffect;
	let reveal = yaml && yaml.reveal ? yaml.reveal : false;
	const hideBouncingEffet =
		(yaml && yaml.bouncingEffect == false) ||
		reveal == true ||
		userPrefersReducedMotion;
	showBouncingEffect = !hideBouncingEffet;
	const switchSnowElement = document.body.querySelector("input");
	switchSnowElement.addEventListener("click", () => {
		snowContainer.style.display =
			snowContainer.style.display == "none" ? "block" : "none";
		showBouncingEffect = !showBouncingEffect;
		dayContentHide();
	});
	const contentNotAvalaible =
		"Ce n'est pas encore le bon jour, merci de patienter !";

	const daySections = document.querySelectorAll(".day");
	// Récupérer la date actuelle
	const currentDate = new Date();
	let currentDay = currentDate.getDate();
	const currentMonth = currentDate.getMonth() + 1;

	let date;
	if (yaml && yaml.revealAfter) {
		const [day, month, year] = yaml.revealAfter.split("/").map(Number);
		date = new Date(year, month - 1, day);
		reveal = currentDate > date ? true : false;
	}
	let displayFrom = false;
	if (yaml && yaml.displayFrom) {
		const [day, month, year] = yaml.displayFrom.split("/").map(Number);
		displayFrom = {
			day: day,
			month: month,
			year: year,
			gapDays: yaml.gapDays || 0,
		};
	}

	function dayContentHide() {
		const currentDateSelector = document.querySelector(".currentDate");
		if (currentDateSelector) {
			if (showBouncingEffect) {
				currentDateSelector.classList.add("bounce");
			} else {
				currentDateSelector.classList.remove("bounce");
			}
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

		// Parcourir chaque élément et ajouter la classe "pastDate" si nécessaire
		// Extraire l'ID du jour à partir de l'attribut "id"
		const id = parseInt(daySection.id.split("-")[1], 10);
		// On affiche le contenu seulement si on est au mois de décembre et si le jour du contenu est égal ou inférieur au jour actuel
		currentDay = startDay ? startDay : currentDay;
		const displayFromMonth = startDay ? currentMonth : 12;
		if (
			shouldDisplayDay(
				id,
				currentDay,
				currentMonth,
				displayFromMonth,
				displayFrom,
			) ||
			reveal
		) {
			const classToAdd =
				idRepresentsCurrentDay(id, currentDay, displayFrom) && !reveal
					? "currentDate"
					: "pastDate";
			daySection.classList.add(classToAdd);
			if ((images.children.length == 2 && id < currentDay) || reveal) {
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
	const currentDateSelector = document.querySelector(".currentDate");
	if (showBouncingEffect && currentDateSelector) {
		currentDateSelector.classList.add("bounce");
	}
}
