# Calendrier de l'Avent

Comment créer votre calendrier de l'Avent ?

1. Ouvrez l'éditeur en ligne.
2. Une fois votre calendrier terminé, copiez le contenu dans [CodiMD](https://codimd.apps.education.fr/) ou un service identique ([Digipage](https://digipage.app/) …).
3. Votre calendrier de l'avent sera alors disponible à l'adresse : `https://calendrier-avent.forge.apps.education.fr/#URL` (en remplaçant URL par l'URL de votre fichier).

## Options plus avancées

Vous pouvez ajouter un en-tête YAML, avec différentes options ([voir un modèle avec toutes ces options](https://codimd.apps.education.fr/-PbI3GizQo6xV-TEiU1-sA?both))

- `maths: true` pour activer l'écriture mathématique en Latex.
- `random: true` pour afficher les jours de manière aléatoire.
- `bouncingEffet: false` pour désactiver l'effet de rebondissement du jour actuel.
- `reveal: true` pour que le contenu de chaque case soit visible.
- `revealAfter: dd/mm/aaaa` : date à partir de laquelle tout reste visible.
- `displayFrom: dd/mm/aaaa` : date à partir de laquelle le calendrier commence à compter les jours (si on veut les afficher un autre mois qu'en décembre).
- `style:` pour personnaliser l'apparence en CSS

Si vous souhaitez cacher l'URL de votre fichier, vous pouvez [encoder l'URL en base64](https://www.base64encode.org/), et utiliser le paramètre `?c=1` : `https://calendrier-avent.forge.apps.education.fr/?c=1#ENCODED_URL`
