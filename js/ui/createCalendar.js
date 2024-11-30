import { handleCalendar } from "./handleCalendar";

export function createCalendar(data) {
	const titleElement = document.getElementById("title");
	const initialMessageElement = document.getElementById("initial-message");
	const mainElement = document.getElementById("calendar");
	/* const footerElement = document.getElementById("credits") */
	const title = data[0];
	const initialMessage = data[1];
	const calendar = data[2];
	// On change le titre et le message initial avec le contenu personnalisé
	titleElement.innerHTML = title;
	if (initialMessage.length > 0) {
		initialMessageElement.innerHTML = initialMessage;
		initialMessageElement.style.visibility = "visible";
	} else {
		initialMessageElement.style.display = "none";
	}
	// On affiche le calendrier
	mainElement.innerHTML = calendar;
	handleCalendar();
}
