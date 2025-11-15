# Calendrier-avent

Un outil pour créer facilement un calendrier de l'avent en ligne

1. Créez un fichier sur CodiMD ou sur une forge.
2. Utilisez le [modèle simple](https://codimd.apps.education.fr/e3SID0AXRjitNnQD660FHA?both) ou bien le [modèle avec options plus avancées](https://codimd.apps.education.fr/-PbI3GizQo6xV-TEiU1-sA?both) pour créer votre calendrier
3. Votre calendrier de l'avent sera alors disponible à l'adresse : `https://calendrier-avent.forge.apps.education.fr/#URL` (en remplaçant URL par l'URL de votre fichier).
4. Il est possible de cacher l'URL de votre fichier avec le paramètre `?c=1` : `https://calendrier-avent.forge.apps.education.fr/?c=1#URL` (l'URL doit être encodée avec base64)

## Paramètres

On peut utiliser un en-tête YAML pour spécifier certains paramètres.

```yaml
---
maths: false
random: false
bouncingEffect: true
reveal: false
revealAfter: 31/12/2024
style:
---
```

**Explications**

- _maths_ : pour ajouter la gestion des mathématiques en Latex
- _random_ : pour afficher les jours de manière aléatoire plutôt que dans l'ordre chronologique
- _bouncingEffet_ : pour activer/désactiver l'effet de rebondissement de la case correspondant au jour actuel
- _reveal_ : pour pouvoir voir le résultat quand tout est affiché
- _revealAfter_ : pour indiquer une date à partir de laquelle tout le calendrier restera affiché en entier
- _style_ : pour personnaliser l'apparence de son calendrier en CSS
