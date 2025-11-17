import { markdownToHTML } from "../../../processMarkdown/markdownToHTML.js";
import { copycode } from "../../helpers/copycode.js";

export function createHelpButton(editorWrapper) {
	const button = document.createElement("button");
	button.className = "help-button";
	button.title = "Aide";
	button.innerHTML = "Aide";
	button.addEventListener("click", () => {
		// Affiche une modale d'aide
		const helpTitle = "<h2>Aide</h2>";
		const helpMessage =
			helpTitle +
			markdownToHTML(`
### Rappel de la syntaxe de base


On fait des cases en suivant l'un des modèles ci-dessous.

\`\`\`
## 1

![](https://picsum.photos/200?random=1)

Exemple :
- image au début (qui s'affiche dans la case quand le jour est visible)
- titre simple = numéro de la case
\`\`\`

\`\`\`
## Titre case

Exemple :
- pas d'image au début
- titre personnalisé
\`\`\`

\`\`\`
## Titre case

![](https://picsum.photos/200?random=2)

Exemple : 
- image au début
- titre personnalisé
\`\`\`

\`\`\`
## 4

Exemple :
- pas d'image au début
- pas de titre personnalisé
\`\`\`


### Options avancées


#### Dans l'en-tête YAML

Vous pouvez ajouter un en-tête YAML, avec différentes options ([voir un modèle avec toutes ces options](https://codimd.apps.education.fr/-PbI3GizQo6xV-TEiU1-sA?both))

Exemple :

\`\`\`
---
maths: false
random: false
bouncingEffet: true
reveal: false
revealAfter: 24/12/2024
displayFrom: 01/12/2024
style: |
  .day {
     border: 3px solid red;
  }
---
\`\`\`

- \`maths: true\` pour activer l'écriture mathématique en Latex.
- \`random: true\` pour afficher les jours de manière aléatoire.
- \`bouncingEffet: false\` pour désactiver l'effet de rebondissement du jour actuel.
- \`reveal: true\` pour que le contenu de chaque case soit visible.
- \`revealAfter: jj/mm/aaaa\` : date à partir de laquelle tout reste visible.
- \`displayFrom: jj/mm/aaaa\` : date à partir de laquelle le calendrier commence à compter les jours (si on veut les afficher un autre mois qu'en décembre).
- \`style:\` pour personnaliser l'apparence en CSS


### Dans le contenu d'une case

#### Images personnalisées pour les cases cachées

Par défaut, l'application choisit l'image des cases cachées. Pour utiliser vos propres images, ajoutez simplement une image avant celle qui s'affiche quand le jour est visible :

\`\`\`
![](URL_image_case_cachée) ![](URL_image_case_visible)
\`\`\`

#### Déclenchement d'un son à l'ouverture d'une case

Vous pouvez déclencher un son à l'ouverture d'une case en écrivant :

\`\`\`
!Audio: URL_du_fichier_audio
\`\`\`


#### Choisir une date précise pour afficher la case

On peut choisir la date à laquelle la case va s'afficher en écrivant :

\`\`\`
!Date: jj/mm/aaaa
\`\`\`

### Autres options


Si vous souhaitez cacher l'URL de votre fichier, vous pouvez [encoder l'URL en base64](https://www.base64encode.org/), et utiliser le paramètre \`?c=1\` : \`https://calendrier-avent.forge.apps.education.fr/?c=1#ENCODED_URL\`


`);
		const modal = document.createElement("div");
		modal.className = "help-modal";
		modal.innerHTML = `
			<div class="help-modal-content">
				<span class="help-modal-close">&times;</span>
				<div class="help-modal-message">
				${helpMessage}
				</div>
			</div>
		`;
		document.body.appendChild(modal);
		copycode();

		// Si on clique ailleurs que dans le contenu de la modale, on la ferme
		setTimeout(() => {
			function eventHandler(event) {
				const target = event.target;

				// Si clic sur le bouton de fermeture
				if (target.closest(".help-modal-close")) {
					modal.remove();
					document.removeEventListener("click", eventHandler);
					return;
				}

				// Si clic en dehors du contenu de la modale
				const clickedInsideModal = target.closest(".help-modal-content");
				const clickInsideEditor = target.closest(".editor");

				if (!clickedInsideModal && !clickInsideEditor) {
					modal.remove();
					document.removeEventListener("click", eventHandler);
				}
			}

			document.addEventListener("click", eventHandler);
			// Si on appuie sur Esc, on ferme aussi la modale
			document.addEventListener("keydown", function escHandler(event) {
				if (event.key === "Escape") {
					modal.remove();
					document.removeEventListener("click", eventHandler);
					document.removeEventListener("keydown", escHandler);
				}
			});
		}, 100);
	});
	editorWrapper.appendChild(button);
}
