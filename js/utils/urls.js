import { shortcuts, corsProxy } from "../config";

function decryptURL(url) {
	let params = new URLSearchParams(document.location.search);
	if (params.get("c") == 1) {
		url = atob(url);
	}
	return url;
}

export function handleURL(url) {
	url = decryptURL(url);
	if (url !== "") {
		let addCorsProxy = true;
		// Vérification de la présence d'un raccourci
		const shortcut = shortcuts.find((element) => element[0] == url);
		if (shortcut) {
			url = shortcut[1];
			// Si on a un raccourci, on n'a pas besoin de traiter correctement l'url
			return url;
		}
		// Gestion des fichiers hébergés sur la forge et publiés sur une page web
		if (url.includes(".forge")) {
			addCorsProxy = false;
		}
		// Gestion des fichiers hébergés sur github
		if (url.startsWith("https://github.com")) {
			addCorsProxy = false;
			url = url.replace(
				"https://github.com",
				"https://raw.githubusercontent.com",
			);
			url = url.replace("/blob/", "/");
		}
		// gestion des fichiers hébergés sur codiMD / le pad gouv / hedgedoc / digipage
		if (
			url.startsWith("https://codimd") ||
			url.startsWith("https://pad.numerique.gouv.fr/") ||
			url.includes("hedgedoc") ||
			url.includes("digipage")
		) {
			addCorsProxy = false;
			url = url
				.replace("?edit", "")
				.replace("?both", "")
				.replace("?view", "")
				.replace(/#$/, "")
				.replace(/\/$/, "");
			url = url.indexOf("download") === -1 ? url + "/download" : url;
		}
		// gestion des fichiers hébergés sur framapad ou digidoc
		if (
			(url.includes("framapad") || url.includes("digidoc")) &&
			!url.endsWith("/export/txt")
		) {
			addCorsProxy = false;
			url = url.replace(/\?.*/, "") + "/export/txt";
		}
		url = addCorsProxy ? corsProxy + url : url;
	}
	return url;
}

export function loadScript(src, name) {
	const prefixScript = "script-";
	// Fonction pour charger des scripts
	const alreadyLoaded = document.querySelector("#" + prefixScript + name);
	if (!alreadyLoaded) {
		return new Promise((resolve, reject) => {
			const script = document.createElement("script");
			script.src = src;
			script.id = prefixScript + name;
			script.onload = resolve;
			script.onerror = reject;
			document.head.appendChild(script);
		});
	}
}
export function loadCSS(src, name) {
	const prefixCSS = "css-";
	// Fonction pour charger des CSS
	const cssElement = document.querySelector("#" + prefixCSS + name);
	if (!cssElement) {
		return new Promise((resolve, reject) => {
			const styleElement = document.createElement("link");
			styleElement.href = src;
			styleElement.id = prefixCSS + name;
			styleElement.rel = "stylesheet";
			styleElement.onload = resolve;
			styleElement.onerror = reject;
			document.body.appendChild(styleElement);
		});
	}
}
