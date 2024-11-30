import defaultMD from "../../content.md";
import { createCalendar } from "../ui/createCalendar";
import { handleURL } from "../utils/urls";
import { parseMarkdown } from "./parseMarkdown";
import { startDay } from "../config";

let calendarData;
let md = defaultMD;

export function getMarkdownContentAndCreateCalendar() {
	// On récupère l'URL du hashtag sans le #
	const url = window.location.hash.substring(1).replace(/\?.*/, "");
	// On traite l'URL pour pouvoir récupérer correctement la source
	const source = handleURL(url);
	if (source !== "") {
		fetch(source)
			.then((response) => response.text())
			.then((data) => {
				md = data;
				calendarData = parseMarkdown(md);
				createCalendar(calendarData);
			})
			.catch((error) => console.error(error));
	} else {
		calendarData = parseMarkdown(md);
		createCalendar(calendarData, startDay);
	}
}
