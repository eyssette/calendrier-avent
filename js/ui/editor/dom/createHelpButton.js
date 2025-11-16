import { markdownToHTML } from "../../../processMarkdown/markdownToHTML.js";

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
Vous pouvez ajouter un en-tête YAML, avec différentes options ([voir un modèle avec toutes ces options](https://codimd.apps.education.fr/-PbI3GizQo6xV-TEiU1-sA?both))

- \`maths: true\` pour activer l'écriture mathématique en Latex.
- \`random: true\` pour afficher les jours de manière aléatoire.
- \`bouncingEffet: false\` pour désactiver l'effet de rebondissement du jour actuel.
- \`reveal: true\` pour que le contenu de chaque case soit visible.
- \`revealAfter: dd/mm/aaaa\` : date à partir de laquelle tout reste visible.
- \`displayFrom: dd/mm/aaaa\` : date à partir de laquelle le calendrier commence à compter les jours (si on veut les afficher un autre mois qu'en décembre).
- \`style:\` pour personnaliser l'apparence en CSS

Par défaut, l'application choisit l'image des cases cachées. Pour utiliser vos propres images, ajoutez simplement une image avant celle qui s'affiche quand le jour est visible :

\`\`\`
![](URL_image_case_cachée) ![](URL_image_case_visible)
\`\`\`

Si vous souhaitez cacher l'URL de votre fichier, vous pouvez [encoder l'URL en base64](https://www.base64encode.org/), et utiliser le paramètre \`?c=1\` : \`https://calendrier-avent.forge.apps.education.fr/?c=1#ENCODED_URL\`
`);
		const modal = document.createElement("div");
		modal.className = "help-modal";
		modal.innerHTML = `
			<div class="help-modal-content">
				<span class="help-modal-close">&times;</span>
				${helpMessage}
			</div>
		`;
		document.body.appendChild(modal);

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

				if (!clickedInsideModal) {
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
