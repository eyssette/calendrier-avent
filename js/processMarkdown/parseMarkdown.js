import { markdownToHTML } from "./markdownToHTML";
import { processYAML, yaml } from "./yaml";
import { shuffleArray } from "../utils/arrays";

export function parseMarkdown(markdownContent) {
	processYAML(markdownContent);

	// Extraction du Titre
	const titleRegex = /^# (.+$)/m;
	const titleMatch = markdownContent.match(titleRegex);
	const titleStartIndex = titleMatch
		? markdownContent.indexOf(titleMatch[0])
		: -1;
	const titleEndIndex = titleMatch
		? titleStartIndex + titleMatch[0].length
		: -1;
	const calendarTitle = titleMatch ? titleMatch[1].trim() : "";

	// Contenu principal après le titre
	let mainContent = markdownContent.substring(titleEndIndex);
	if (mainContent.startsWith("## ")) {
		mainContent = "\n" + mainContent;
	}
	let calendarData = [];
	let calendarMarkdown = [];

	// Extraction du Message Initial
	const initialMessageEndIndex = mainContent.indexOf("\n## ");
	const initialMessageStartIndex =
		mainContent.indexOf("---", 3) > -1 ? mainContent.indexOf("---", 3) + 3 : 0;
	const initialMessageContent = mainContent.substring(
		initialMessageStartIndex,
		initialMessageEndIndex,
	);

	// Extraction des éléments du Calendrier
	const days = mainContent.split("\n## ").slice(1);
	let day = 1;

	for (let dayBlock of days) {
		// Extraction des informations du jour
		dayBlock = dayBlock.trim();
		// Extraction du titre du jour (qui correspond à la première ligne)
		const dayTitleEndIndex = dayBlock.indexOf("\n");
		const dayTitle = dayBlock.substring(0, dayTitleEndIndex).trim();
		const hasCustomTitle = parseInt(dayTitle) ? false : true;
		const dayTitleInlineHTML = markdownToHTML(dayTitle)
			.replaceAll("<p>", "")
			.replaceAll("</p>", "");
		const dayTitleHTML = hasCustomTitle
			? day + "<span>" + dayTitleInlineHTML + "</span>"
			: dayTitle;

		// Extraction du contenu
		let dayContent = dayBlock.substring(dayTitleEndIndex + 1).trim();
		// On vérifie si une image est présente au début du contenu
		const firstLine = dayContent.split("\n")[0];
		const isFirstLineImage = /^!\[/.test(firstLine);
		if (isFirstLineImage) {
			// Ligne contenant l'image et le reste du contenu après
			const afterImage = dayContent.substring(firstLine.length).trim();
			// Ajout de la structure HTML autour de la première image
			const dayImagesHTML = markdownToHTML(firstLine).replace(
				/^<p>/,
				'<p class="dayImages">',
			);
			dayContent =
				`${dayImagesHTML}<section markdown class="dayContent"><p><button class="closeButton">X</button></p><section markdown class="content">` +
				`<h2>${dayTitleInlineHTML}</h2>` +
				markdownToHTML(afterImage);
		} else {
			dayContent =
				'<p class="dayImages">👆</p><section markdown class="dayContent"><p><button class="closeButton">X</button></p><section markdown class="content">' +
				`<h2>${dayTitleInlineHTML}</h2>` +
				markdownToHTML(dayContent);
		}
		// Génération de la structure HTML pour le jour
		const cssHasCustomTitle = hasCustomTitle ? "hasCustomTitle" : "";
		const cssHasNoCustomImage = isFirstLineImage ? "" : "noCustomImage";
		const dayHtmlStart = `<section markdown class="day ${cssHasCustomTitle} ${cssHasNoCustomImage}" id="day-${day}"><h2>${dayTitleHTML}</h2>`;
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
		markdownToHTML(initialMessageContent),
		calendarMarkdown.join("\n"),
	];
	return calendarData;
}
