// Par défaut on affiche ça :
const defaultCalendar = `# Mon calendrier de l'Avent

> Ce site vous permet de créer un calendrier de l'Avent personnalisé
> 
> 1. Créez un fichier sur CodiMD ou sur une forge.
> 2. Ce fichier doit comporter : un titre, un bloc de citation qui constituera le message initial, ainsi que pour chaque jour un titre, une image et du contenu qui s'affichera quand on clique dessus. Vous pouvez récupérer [ce modèle](https://codimd.apps.education.fr/-PbI3GizQo6xV-TEiU1-sA).
> 3. Votre calendrier de l'Avent sera alors disponible à l'adresse : https://eyssette.forge.aeif.fr/calendrier-avent#URL (en remplaçant URL par l'URL de votre fichier).

## 1
![](https://publicdomainvectors.org/photos/johnny_automatic_Christmas_Tree_1.png)

Contenu jour 1

## 2
![](https://publicdomainvectors.org/photos/ralexandrec_Christmas_Ball.png)

Contenu jour 2

## 3
![](https://publicdomainvectors.org/photos/nicubunu_Christmas_Candy.png)

Contenu jour 3

## 4
![](https://publicdomainvectors.org/photos/secretlondon_chocolate_present.png)

Contenu jour 4

## 5
![](https://publicdomainvectors.org/photos/xmas03.png)

Contenu jour 5

## 6
![](https://publicdomainvectors.org/photos/harmonic_Tree.png)

Contenu jour 6

## 7
![](https://publicdomainvectors.org/photos/oak-tree-covered-in-snow.png)

Contenu jour 7

## 8
![](https://publicdomainvectors.org/photos/1542274483.png)

Contenu jour 8

## 9
![](https://publicdomainvectors.org/photos/johnny_automatic_Christmas_Tree_1.png)

Contenu jour 9

## 10
![](https://publicdomainvectors.org/photos/ralexandrec_Christmas_Ball.png)

Contenu jour 10

## 11
![](https://publicdomainvectors.org/photos/nicubunu_Christmas_Candy.png)

Contenu jour 11

## 12
![](https://publicdomainvectors.org/photos/secretlondon_chocolate_present.png)

Contenu jour 12

## 13
![](https://publicdomainvectors.org/photos/xmas03.png)

Contenu jour 13

## 14
![](https://publicdomainvectors.org/photos/harmonic_Tree.png)

Contenu jour 14

## 15
![](https://publicdomainvectors.org/photos/oak-tree-covered-in-snow.png)

Contenu jour 15

## 16
![](https://publicdomainvectors.org/photos/1542274483.png)

Contenu jour 16

## 17
![](https://publicdomainvectors.org/photos/johnny_automatic_Christmas_Tree_1.png)

Contenu jour 17

## 18
![](https://publicdomainvectors.org/photos/ralexandrec_Christmas_Ball.png)

Contenu jour 18

## 19
![](https://publicdomainvectors.org/photos/nicubunu_Christmas_Candy.png)

Contenu jour 19

## 20
![](https://publicdomainvectors.org/photos/secretlondon_chocolate_present.png)

Contenu jour 20

## 21
![](https://publicdomainvectors.org/photos/xmas03.png)

Contenu jour 21

## 22
![](https://publicdomainvectors.org/photos/harmonic_Tree.png)

Contenu jour 22

## 23
![](https://publicdomainvectors.org/photos/oak-tree-covered-in-snow.png)

Contenu jour 23

## 24
![](https://publicdomainvectors.org/photos/1542274483.png)

Contenu jour 24

## 25
![](https://publicdomainvectors.org/photos/johnny_automatic_Christmas_Tree_1.png)

Contenu jour 	25

## 26
![](https://publicdomainvectors.org/photos/ralexandrec_Christmas_Ball.png)

Contenu jour 26

## 27
![](https://publicdomainvectors.org/photos/nicubunu_Christmas_Candy.png)

Contenu jour 27

## 28
![](https://publicdomainvectors.org/photos/secretlondon_chocolate_present.png)

Contenu jour 28

## 29
![](https://publicdomainvectors.org/photos/xmas03.png)

Contenu jour 29

## 30
![](https://publicdomainvectors.org/photos/harmonic_Tree.png)

Contenu jour 30

## 31
![](https://publicdomainvectors.org/photos/oak-tree-covered-in-snow.png)

Contenu jour 31
`;

let md = defaultCalendar;

// On peut définir des raccourcis vers ses calendriers (si on veut forker le projet et avoir une URL plus courte à partager)

const shortcuts = [
	["mycalendar","URL"],
]

function getMarkdownContent() {
	// Récupération du markdown externe
	let urlMD = window.location.hash.substring(1); // Récupère l'URL du hashtag sans le #
	if (urlMD !== "") {
		// Gestion des fichiers hébergés sur github
		if (urlMD.startsWith("https://github.com")) {
			urlMD = urlMD.replace(
				"https://github.com",
				"https://raw.githubusercontent.com"
			);
			urlMD = urlMD.replace("/blob/", "/");
		}
		// Gestion des fichiers hébergés sur codiMD
		if (
			urlMD.startsWith("https://codimd") &&
			urlMD.indexOf("download") === -1
		) {
			urlMD =
				urlMD.replace("?edit", "").replace("?both", "").replace("?view", "") +
				"/download";
		}
		// Vérification de la présence d'un raccourci
		shortcut = shortcuts.find(element => element[0]==urlMD)
		if (shortcut) {
			urlMD = shortcut[1]
		}
		// Récupération du contenu du fichier
		fetch(urlMD)
			.then((response) => response.text())
			.then((data) => {
				md = data;
				calendarData = parseMarkdown(md);
				createCalendar(calendarData);
			})
			.catch((error) => {
				calendarData = parseMarkdown(defaultCalendar);
				createCalendar(calendarData);
				alert("Il y a une erreur dans l'URL. Merci de la vérifier et de vous assurer que le fichier est bien accessible.")
				console.log(error);
			});
	} else {
		calendarData = parseMarkdown(md);
		createCalendar(calendarData);
	}
}

getMarkdownContent()

function parseMarkdown(markdownContent) {
	const lines = markdownContent.split("\n");
	let calendarData = [];
	let calendarTitle = "Mon calendrier de l'Avent";
	let initialMessageComputed = false;
	let initialMessageContent = [];
	let calendarMarkdown = [];

	// Gestion de la conversion du markdown en HTML
	const converter = new showdown.Converter({
		emoji: true,
		parseImgDimensions: true,
		simplifiedAutoLink: true,
	});
	function markdownToHTML(text) {
		const html = converter.makeHtml(text);
		return html;
	}

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
				line = initialMessageComputed ? '</section></section></section>\n\n<section markdown class="day" id="day-'+day+'">'+line : '\n<section markdown class="day" id="day-'+day+'">\n\n'+line;
				initialMessageComputed = true;
				initialImageComputed = false;
				day++;
			}
			if (line.startsWith("![") && !initialImageComputed) {
				line = line + '\n\n<section markdown class="dayContent"><button class="closeButton">X</button><section markdown class="content">';
				initialImageComputed = true;
			}
			// Récupération du contenu du calendrier
			line = isLastLine ? line+'</section></section></section>' : line;
			calendarMarkdown.push(line);
		}
	}


	calendarData = [
		calendarTitle,
		markdownToHTML(initialMessageContent.join('\n')),
		markdownToHTML(calendarMarkdown.join('\n'))
	];
	return calendarData;
}

function createCalendar(data) {
	const titleElement = document.getElementById("title")
	const initialMessageElement = document.getElementById("initial-message")
	const mainElement = document.getElementById("calendar")
	/* const footerElement = document.getElementById("credits") */
	title = data[0];
	initialMessage = data[1];
	calendar = data[2];
	// On change le titre et le message initial avec le contenu personnalisé
	titleElement.innerHTML = title;
	if (initialMessage.length>0) {
		initialMessageElement.innerHTML = initialMessage;
		initialMessageElement.style.visibility = "visible";
	}
	else {
		initialMessageElement.style.display = "none";
	}
	// On affiche le calendrier
	mainElement.innerHTML = calendar;
	handleCalendar()
}