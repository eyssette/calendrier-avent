// Par défaut on affiche ça :
const defaultCalendar = `# Mon calendrier de l'Avent

> Ce site vous permet de créer un calendrier de l'Avent personnalisé
> 
> 1. Créez un fichier sur CodiMD ou sur une forge.
> 2. Ce fichier doit comporter : un titre, un bloc de citation qui constituera le message initial, ainsi que pour chaque jour un titre, au moins une image et du contenu qui s'affichera quand on clique dessus. Vous pouvez récupérer [ce modèle](https://codimd.apps.education.fr/-PbI3GizQo6xV-TEiU1-sA?both). 
> 3. Votre calendrier de l'avent sera alors disponible à l'adresse : https://eyssette.forge.aeif.fr/calendrier-avent#URL (en remplaçant URL par l'URL de votre fichier).
> 4. Il est possible de cacher l'URL de votre fichier avec : https://eyssette.forge.aeif.fr/calendrier-avent?c=1#URL (l'URL doit être encodée avec base64)

## 1
![](img/johnny_automatic_Christmas_Tree_1.png) ![](https://picsum.photos/200?random=1)

Contenu jour 1

## 2
![](img/ralexandrec_Christmas_Ball.png) ![](https://picsum.photos/200?random=2)

Contenu jour 2

## 3
![](img/nicubunu_Christmas_Candy.png) ![](https://picsum.photos/200?random=3)

Contenu jour 3

## 4
![](img/secretlondon_chocolate_present.png) ![](https://picsum.photos/200?random=4)

Contenu jour 4

## 5
![](img/xmas03.png) ![](https://picsum.photos/200?random=5)

Contenu jour 5

## 6
![](img/harmonic_Tree.png) ![](https://picsum.photos/200?random=6)

Contenu jour 6

## 7
![](img/oak-tree-covered-in-snow.png) ![](https://picsum.photos/200?random=7)

Contenu jour 7

## 8
![](img/1542274483.png) ![](https://picsum.photos/200?random=8)

Contenu jour 8

## 9
![](img/johnny_automatic_Christmas_Tree_1.png) ![](https://picsum.photos/200?random=9)

Contenu jour 9

## 10
![](img/ralexandrec_Christmas_Ball.png) ![](https://picsum.photos/200?random=10)

Contenu jour 10

## 11
![](img/nicubunu_Christmas_Candy.png) ![](https://picsum.photos/200?random=11)

Contenu jour 11

## 12
![](img/secretlondon_chocolate_present.png) ![](https://picsum.photos/200?random=12)

Contenu jour 12

## 13
![](img/xmas03.png) ![](https://picsum.photos/200?random=13)

Contenu jour 13

## 14
![](img/harmonic_Tree.png) ![](https://picsum.photos/200?random=14)

Contenu jour 14

## 15
![](img/oak-tree-covered-in-snow.png) ![](https://picsum.photos/200?random=15)

Contenu jour 15

## 16
![](img/1542274483.png) ![](https://picsum.photos/200?random=16)

Contenu jour 16

## 17
![](img/johnny_automatic_Christmas_Tree_1.png) ![](https://picsum.photos/200?random=17)

Contenu jour 17

## 18
![](img/ralexandrec_Christmas_Ball.png) ![](https://picsum.photos/200?random=18)

Contenu jour 18

## 19
![](img/nicubunu_Christmas_Candy.png) ![](https://picsum.photos/200?random=19)

Contenu jour 19

## 20
![](img/secretlondon_chocolate_present.png) ![](https://picsum.photos/200?random=20)

Contenu jour 20

## 21
![](img/xmas03.png) ![](https://picsum.photos/200?random=21)

Contenu jour 21

## 22
![](img/harmonic_Tree.png) ![](https://picsum.photos/200?random=22)

Contenu jour 22

## 23
![](img/oak-tree-covered-in-snow.png) ![](https://picsum.photos/200?random=23)

Contenu jour 23

## 24
![](img/1542274483.png) ![](https://picsum.photos/200?random=24)

Contenu jour 24

## 25
![](img/johnny_automatic_Christmas_Tree_1.png) ![](https://picsum.photos/200?random=25)

Contenu jour 	25

## 26
![](img/ralexandrec_Christmas_Ball.png) ![](https://picsum.photos/200?random=26)

Contenu jour 26

## 27
![](img/nicubunu_Christmas_Candy.png) ![](https://picsum.photos/200?random=27)

Contenu jour 27

## 28
![](img/secretlondon_chocolate_present.png) ![](https://picsum.photos/200?random=28)

Contenu jour 28

## 29
![](img/xmas03.png) ![](https://picsum.photos/200?random=29)

Contenu jour 29

## 30
![](img/harmonic_Tree.png) ![](https://picsum.photos/200?random=30)

Contenu jour 30

## 31
![](img/oak-tree-covered-in-snow.png) ![](https://picsum.photos/200?random=31)

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
	let params = new URLSearchParams(document.location.search);
	if (params.get("c")==1) {
		urlMD = atob(urlMD);
	}
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
				urlMD.replace("?edit", "").replace("?both", "").replace("?view", "").replace(/#$/,"") +
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
		let html = converter.makeHtml(text);
		// Optimisation de l'affichage des images
		html = html.replaceAll("<img ",'<img loading="lazy" ')
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