# Changelog

## 2.2.0 (2025-11-17)

### Feat

- bouton de copie dans le presse-papier des blocs code (utile notamment pour l'aide)

### Fix

- **css**: amélioration de l'affichage du contenu d'une case sur petit écran + résolution problème de scroll sur la case qui conduisait parfois à un scroll de la page entière
- **css**: césures automatiques pour les blocs de code (sinon cela posait problème pour l'affichage du contenu des cases sur petit écran)

### Chore

- task build - vérification npm:install + exécution de cette tâche avant le commit pour commitizen

## 2.1.1 (2025-11-17)

### Fix

- gestion du cas où il n'y a ni titre ni message initial

### Chore

- pas de formatage automatique du Markdown
- configuration commitizen
- configuration Taskfile

## 2.1.0 (2025-11-17)

### Feat

- feat: gestion des plugins + plugin text2quiz
- fix: documentation clarifiée et à jour pour les options avancées (classification des options + ajout explications pour le déclenchement d'un son à l'ouverture d'une case)
- feat: possibilité de déclencher un son à l'ouverture d'une case

## 2.0.1 (2025-11-17)

### Fix

- fix: amélioration du message par défaut dans l'éditeur et du message d'aide
- fix: ajout automatique d'une image pour chaque case cachée si on n'en a pas spécifié une
- fix: affichage amélioré des admonitions
- fix: ajout dans l'éditeur d'un bouton d'aide qui ouvre une modale pour rappeler la syntaxe
- fix: simplification du message initial de la page d'accueil + gestion de l'input pour rediriger vers un calendrier externe avec l'URL dans le hash
- fix: possibilité de ne pas mettre d'image dans une case
- fix: dans l'éditeur paramètre reveal  à true de manière automatique
- fix: accessibilité améliorée (alt vide pour les images + bouton avec aria-label)
- edit: typo
- fix: affichage du titre d'une case seulement si le jour est visible
- fix: on n'ajoute pas plusieurs fois un événement pour détecter le clic sur le bouton d'activation/désactivation des effets d'animation
- fix: précision pour choisir ses propres images dans les cases cachées
- fix: possibilité de garder l'aide affichée quand on utilise l'éditeur
- fix: ajout du titre dans le contenu de la modale qui s'affiche quand on clique sur une case
- fix: url relative pour la feuille de style CSS du mode éditeur
- edit: typo
- fix: détection du switch pour désactiver/activer les effets d'animation corrigée
- fix: détection du mode "éditeur" : pas seulement par le paramètre ?editor (qui n'est pas utilisé si on a simplement cliqué sur le bouton)
- fix: on ne cache pas l'image du jour actuel quand il n'y pas d'image personnalisée et pas de titre presonnalisé
- fix(css) : curseur sur "auto" pour le contenu d'un jour visible
- fix: précision dans le contenu par défaut de l'éditeur pour indiquer qu'il faut mettre au début une image qui s'affiche dans la case quand le jour est visible
- fix: correction bug si on supprimait puis remettait un message initial dans l'éditeur
- fix: optimisation image de fond
- fix: optimisation des images

## 2.0.0 (2025-11-16)

### Feat

- feat!: ajout d'un éditeur intégré

## 1.3.1 (2025-11-15)

### Fix

- fix: parsing du Markdown amélioré - gestion de l'absence de titre + message initial pas forcément dans un blockquote
- ci: définition d'un modèle de déploiement du calendrier
- fix: suppression blockquote dans le message initial + ajout modèle simple + exemples d'URL entre backticks
- fix: parsing du message initial simplfiié et amélioré
- fix: README adapté aussi avec modèle simple + message initial pas forcément dans un blockquote + URLs des exemples entre backticks
- fix: URL relative pour l'image de fond

## 1.3.0 (2025-11-03)

### Feat

- feat(accessibility): bouton pour désactiver les effes d'animation
- feat: possibilité d'utiliser le hash "#monfichier" pour charger "monfichier.md" (dans le dépôt courant) comme source du calendrier
- feat: détection de userPrefersReducedMotion (désaction des effets d'animation dans ce cas)
- fix: URL principale de l'application = calendrier-avent.forge.apps.education.fr
- fix: contenu principal dans "index.md"

## 1.2.0 (2025-01-07)

### Feat

- feat: yaml — displayFrom + gapDays && gestion erreur si pas de currentDate
- feat: yaml — paramètres random + bouncingEffect
- Explications paramètres YAML
- feat: yaml — reveal / revealAfter
- catch error pour Katex
- Amélioration contenu initial
- CSS .dayContent maxWidth/margin
- gapDays: valeur par défaut = 0
- CSS : .dayContent img pour petits écrans
- fix display images if revealAfter
- corsProxy : changement URL

## 1.1.3 (2024-12-04)

### Fix

- ajout yaml : maths + style
- gestion markdown: linebreaks, admonitions, genericattributes, underline, highligh
- parseMarkdown: pas ligne par ligne
- styles pour admonitions
- Améliorations CSS (flocons + initialMessage)
- bouncing effet pour jour actuel
- boutons plus grand pour petit écrans + image jour actuel pas changée
- Style différent pour currentDate
- raccourci domainepublic
- CSS: iframe: max-width 100%
- CSS: .dayContent img max-height:fit-content
- CSS: h1 plus petit pour petit écran

## 1.1.2 (2024-12-01)

### Fix

- Refactor: modular design + Rollup integration
- nouveau style
- Titres pour chaque jour
- Amélioration affichage images/titres
- 4 jours affichés sur page d'accueil
- footer : affichage sur petit écran
- style pour portables
- CSS .dayContent
- image de fond : CSS pour petit écran
- Rectif mois

## 1.1.1 (2024-09-30)

### Fix

- minify & compress
- Meilleur affichage sur smarphone
- liens vers forge sur apps
- README : explications du fonctionnement de l'outil
- lien vers page perso sur la forge
- Si source sur CodiMD : suppression du # à la fin
- Lien CodiMD : ?both pour pouvoir voir la source
- section.dayContent: scroll=auto

## 1.1.0 (2023-12-07)

### Feat

- Possibilité de mettre 2 images
- Possibilité de cacher l'URL, encodée avec base64
- section.day : cursor=pointer & hover=transform

## 1.0.1 (2023-12-07)

### Fix

- add: images
- add gitlab-ci
- Amélioration style .pastDate
- Liens en blanc dans le message initial
- Optimisation des images

## 1.0.0 (2023-12-07)

- initial commit
