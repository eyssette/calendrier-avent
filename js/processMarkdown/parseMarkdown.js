import { markdownToHTML } from "./markdownToHTML";

export function parseMarkdown(markdownContent) {
	const lines = markdownContent.split("\n");
	let calendarData = [];
	let calendarTitle = "Mon calendrier de l'Avent";
	let initialMessageComputed = false;
	let initialMessageContent = [];
	let calendarMarkdown = [];

	const totalLines = lines.length;
	let initialImageComputed = false;
	let day = 1;
	for (let i = 0; i < totalLines; i++) {
		let line = lines[i];
		const isLastLine = i === totalLines - 1;
		// On parcourt le contenu du fichier ligne par ligne
		if (line.startsWith("# ")) {
			// Récupération du titre
			calendarTitle = line.replace("# ", "").trim();
		} else if (line.startsWith(">") && !initialMessageComputed) {
			// Récupération du message initial, défini par un bloc citation
			line = line.replace(/^>\s?/, "").trim();
			initialMessageContent.push(line);
		} else {
			if (line.startsWith("## ")) {
				line = initialMessageComputed
					? '</section></section></section>\n\n<section markdown class="day" id="day-' +
						day +
						'">' +
						line
					: '\n<section markdown class="day" id="day-' + day + '">\n\n' + line;
				initialMessageComputed = true;
				initialImageComputed = false;
				day++;
			}
			if (line.startsWith("![") && !initialImageComputed) {
				line =
					line +
					'\n\n<section markdown class="dayContent"><button class="closeButton">X</button><section markdown class="content">';
				initialImageComputed = true;
			}
			// Récupération du contenu du calendrier
			line = isLastLine ? line + "</section></section></section>" : line;
			calendarMarkdown.push(line);
		}
	}

	calendarData = [
		calendarTitle,
		markdownToHTML(initialMessageContent.join("\n")),
		markdownToHTML(calendarMarkdown.join("\n")),
	];
	return calendarData;
}
