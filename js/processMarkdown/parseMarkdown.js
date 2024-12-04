import { markdownToHTML } from "./markdownToHTML";
import { processYAML, yaml } from "./yaml";
import { shuffleArray } from "../utils/arrays";

export function parseMarkdown(markdownContent) {
	processYAML(markdownContent);
	const indexFirstH1title = markdownContent.indexOf("# ");
	const mainContent = markdownContent.substring(indexFirstH1title);
	let calendarData = [];
	let calendarTitle = "Mon calendrier de l'Avent";
	let initialMessageContent = [];
	let calendarMarkdown = [];

	// Extraction du Titre
	const titleStartIndex = mainContent.indexOf("# ");
	if (titleStartIndex !== -1) {
		const titleEndIndex = mainContent.indexOf("\n", titleStartIndex);
		calendarTitle = mainContent
			.substring(titleStartIndex + 2, titleEndIndex)
			.trim();
	}

	// Extraction du Message Initial
	const messageStartIndex = mainContent.indexOf("> ");
	if (messageStartIndex !== -1) {
		const daysStartIndex = mainContent.indexOf("\n## ", messageStartIndex);
		const messageBlock = mainContent.substring(
			messageStartIndex,
			daysStartIndex === -1 ? undefined : daysStartIndex,
		);
		initialMessageContent = messageBlock
			.split("\n")
			.filter((line) => line.startsWith(">"))
			.map((line) => line.replace(/^>\s?/, "").trim());
	}

	// Extraction des Éléments du Calendrier
	const days = mainContent.split("\n## ").slice(1);
	let day = 1;

	for (let dayBlock of days) {
		// Extraction des informations du jour
		const titleEndIndex = dayBlock.indexOf("\n");
		let titleH2 = dayBlock.substring(0, titleEndIndex).trim();
		titleH2 = titleH2 == day ? "" : titleH2;

		// Génération de la structure HTML pour le jour
		const hasTitle = titleH2 ? "hasTitle" : "";
		const dayHtmlStart = `<section markdown class="day ${hasTitle}" id="day-${day}"><h2>${day}<span>${markdownToHTML(titleH2)}</span></h2>`;

		// Extraction du contenu
		let dayContent = dayBlock.substring(titleEndIndex + 1).trim();
		const firstImageIndex = dayContent.indexOf("![");
		if (firstImageIndex !== -1) {
			// Ligne contenant l'image et le reste du contenu après
			const imageAndAfter = dayContent.substring(firstImageIndex);
			const nextLineBreak = imageAndAfter.indexOf("\n");
			const imageLine =
				nextLineBreak !== -1
					? imageAndAfter.substring(0, nextLineBreak).trim()
					: imageAndAfter.trim();
			const afterImage =
				nextLineBreak !== -1
					? imageAndAfter.substring(nextLineBreak + 1).trim()
					: "";
			// Ajout de la structure HTML autour de la première image
			dayContent =
				`${markdownToHTML(imageLine)}<section markdown class="dayContent"><p><button class="closeButton">X</button></p><section markdown class="content">` +
				markdownToHTML(afterImage);
		}
		const dayHtmlEnd = "</section></section></section>";
		const fullDayHtml = `${dayHtmlStart}${dayContent}${dayHtmlEnd}`;
		calendarMarkdown.push(fullDayHtml);
		day++;
	}
	if (yaml && yaml.random == true) {
		shuffleArray(calendarMarkdown);
	}
	// Ajout de la dernière fermeture, si nécessaire
	if (calendarMarkdown.length > 0) {
		calendarMarkdown[calendarMarkdown.length - 1] +=
			"</section></section></section>";
	}

	calendarData = [
		calendarTitle,
		markdownToHTML(initialMessageContent.join("\n")),
		calendarMarkdown.join("\n"),
	];
	return calendarData;
}
