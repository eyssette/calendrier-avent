import { load as loadYAML } from "../externals/js-yaml.js";
import { loadScript, loadCSS } from "../utils/urls.js";
import { allowedPlugins, pluginsDependencies } from "../config.js";

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
			// Gestion des add-ons (scripts et css en plus)
			if (yaml.plugins) {
				yaml.plugins = yaml.plugins.toString();
				yaml.plugins = yaml.plugins.replaceAll(" ", "").split(",");
				let pluginsDependenciesArray = [];
				// On ajoute aussi les dépendances pour chaque add-on
				for (const [plugin, pluginDependencies] of Object.entries(
					pluginsDependencies,
				)) {
					if (yaml.plugins.includes(plugin)) {
						for (const pluginDependencie of pluginDependencies) {
							pluginsDependenciesArray.push(pluginDependencie);
						}
					}
				}
				yaml.plugins.push(...pluginsDependenciesArray);
				// Pour chaque add-on, on charge le JS ou le CSS correspondant
				for (const desiredPlugin of yaml.plugins) {
					const pluginsPromises = [];
					const addDesiredPlugin = allowedPlugins[desiredPlugin];
					if (addDesiredPlugin) {
						if (addDesiredPlugin.js) {
							pluginsPromises.push(
								loadScript(addDesiredPlugin.js, desiredPlugin),
							);
						}
						if (addDesiredPlugin.css) {
							pluginsPromises.push(
								loadCSS(addDesiredPlugin.css, desiredPlugin),
							);
						}
						Promise.all(pluginsPromises);
					}
				}
			}
		} catch (e) {
			console.log("erreur processYAML : " + e);
		}
	} else {
		yaml = {};
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
}
