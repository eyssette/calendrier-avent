import defaultMD from "../../index.md";
import { createCalendar } from "../ui/createCalendar";
import { handleURL } from "../utils/urls";
import { parseMarkdown } from "./parseMarkdown";
import { startDay } from "../config";

let calendarData;
let md = defaultMD;

async function fetchMarkdown(source) {
	const response = await fetch(source);
	if (!response.ok) {
		throw new Error(`Erreur lors de la récupération du fichier : ${source}`);
	}
	return await response.text();
}

export async function getMarkdownContentAndCreateCalendar() {
	// On récupère l'URL du hashtag sans le #
	const url = window.location.hash.substring(1).replace(/\?.*/, "");
	// On traite l'URL pour pouvoir récupérer correctement la source
	let source = handleURL(url, { useCorsProxy: false });

	const isMainWebsite =
		window.location.hostname.startsWith("calendrier-avent.") ||
		window.location.pathname == "/calendrier-avent/" ||
		window.location.hostname.startsWith("127");

	if (source === "") {
		calendarData = parseMarkdown(md);
		if (isMainWebsite) {
			createCalendar(calendarData, startDay);
		} else {
			createCalendar(calendarData);
		}
		return;
	}

	try {
		// Tentative 1 : récupération directe
		md = await fetchMarkdown(source);
		calendarData = parseMarkdown(md);
		createCalendar(calendarData);
	} catch (error) {
		console.error(error);

		try {
			// Tentative 2 : ajout de l'extension .md
			source = handleURL(url + ".md", { useCorsProxy: false });
			md = await fetchMarkdown(source);
			calendarData = parseMarkdown(md);
			createCalendar(calendarData);
		} catch (error) {
			console.error(error);

			try {
				// Tentative 3 : utilisation du proxy CORS
				source = handleURL(url, { useCorsProxy: true });
				md = await fetchMarkdown(source);
				calendarData = parseMarkdown(md);
				createCalendar(calendarData);
			} catch (error) {
				console.error(error);
				console.log("Impossible de récupérer le fichier markdown");
			}
		}
	}
}
