import { handleCalendar } from "./handleCalendar";
import { yaml } from "../processMarkdown/yaml";
import { convertLatexExpressions } from "../processMarkdown/convertLatex";

export function createCalendar(data, startDay) {
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
	if (yaml && yaml.maths) {
		setTimeout(() => {
			initialMessageElement.innerHTML = convertLatexExpressions(
				initialMessageElement.innerHTML,
			);
			mainElement.innerHTML = convertLatexExpressions(calendar);
			handleCalendar(startDay);
		}, 200);
	} else {
		mainElement.innerHTML = calendar;
		handleCalendar(startDay);
	}
}
