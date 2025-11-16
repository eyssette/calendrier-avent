import { load as loadYAML } from "../externals/js-yaml.js";
import { loadScript, loadCSS } from "../utils/urls.js";

export let yaml;

export function processYAML(markdownContent) {
	if (
		markdownContent.split("---").length > 2 &&
		markdownContent.startsWith("---")
	) {
		try {
			// Traitement des propriétés dans le YAML
			yaml = loadYAML(markdownContent.split("---")[1]);
			// Gestion des mathématiques
			if (yaml.maths === true) {
				Promise.all([
					loadScript(
						"https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js",
						"katex",
					),
					loadCSS(
						"https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css",
						"katex",
					),
				]);
			}
			// Gestion des styles personnalisés en CSS
			if (yaml.style) {
				const styleElement = document.createElement("style");
				styleElement.innerHTML = yaml.style.replaceAll("\\", "");
				document.body.appendChild(styleElement);
			}
		} catch (e) {
			console.log("erreur processYAML : " + e);
		}
	}
	return markdownContent;
}

export function resetYamlToDefault() {
	// Supprime toutes les clés existantes
	if (yaml) {
		for (const key of Object.keys(yaml)) {
			delete yaml[key];
		}
	}
	// Copie toutes les clés de defaultYaml
	// for (const [key, value] of Object.entries(defaultYaml)) {
	// 	yaml[key] = value;
	// }
}
