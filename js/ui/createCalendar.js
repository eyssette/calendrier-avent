import { handleCalendar } from "./handleCalendar";
import { yaml } from "../processMarkdown/yaml";
import { convertLatexExpressions } from "../processMarkdown/convertLatex";
import { initEditorButtonEvents } from "./editor/eventClickEditorButton";
import { getParamsFromUrl } from "../utils/urls";

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
		initialMessageElement.style.display = "block";
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
		// On affiche l'éditeur (seulement dans la page par défaut, dans laquelle on n'a pas de paramètre maths dans le YAML)
		const params = getParamsFromUrl(window.location.search);
		initEditorButtonEvents(params);
	}
}
