# Mon calendrier de l'Avent

:::howto Comment créer votre calendrier de l'Avent ?

1. Ouvrez l'éditeur en ligne : <button class="openEditor">ouvrir l'éditeur</button>.
2. Une fois votre calendrier terminé, copiez le contenu dans un fichier sur [CodiMD](https://codimd.apps.education.fr/) ou un service identique.
3. <label for="redirect">Copiez ici le lien vers votre fichier :</label> <input type="url" id="redirect" class="redirect-input" placeholder="Votre URL"> <button  class="redirect-button" data-input-id="redirect" >OK</button>
:::

:::info collapsible Voir les options plus avancées

### Dans l'en-tête YAML

Vous pouvez ajouter un en-tête YAML, avec différentes options ([voir un modèle avec toutes ces options](https://codimd.apps.education.fr/-PbI3GizQo6xV-TEiU1-sA?both))

- `maths: true` pour activer l'écriture mathématique en Latex.
- `random: true` pour afficher les jours de manière aléatoire.
- `bouncingEffet: false` pour désactiver l'effet de rebondissement du jour actuel.
- `reveal: true` pour que le contenu de chaque case soit visible.
- `revealAfter: jj/mm/aaaa` : date à partir de laquelle tout reste visible.
- `displayFrom: jj/mm/aaaa` : date à partir de laquelle le calendrier commence à compter les jours (si on veut les afficher un autre mois qu'en décembre).
- `style:` pour personnaliser l'apparence en CSS.

### Dans le contenu d'une case

#### Images personnalisées pour les cases cachées

Par défaut, l'application choisit l'image des cases cachées. Pour utiliser vos propres images, ajoutez simplement une image avant celle qui s'affiche quand le jour est visible :

```
![](URL_image_case_cachée) ![](URL_image_case_visible)
```

#### Déclenchement d'un son à l'ouverture d'une case

Vous pouvez déclencher un son à l'ouverture d'une case en écrivant :

```
!Audio: URL_du_fichier_audio
```

#### Choisir une date précise pour afficher la case

On peut choisir la date à laquelle la case va s'afficher en écrivant :

```
!Date: jj/mm/aaaa
```


### Autres options

Si vous souhaitez cacher l'URL de votre fichier, vous pouvez [encoder l'URL en base64](https://www.base64encode.org/), et utiliser le paramètre `?c=1` : `https://calendrier-avent.forge.apps.education.fr/?c=1#ENCODED_URL`

:::

Pour la démonstration ci-dessous, les 4 premiers jours sont visibles. Dans votre calendrier, les cases apparaîtront automatiquement chaque jour de décembre.

## 1

![](https://picsum.photos/200?random=1)

Contenu jour 1

## 2

![](https://picsum.photos/200?random=2)

Contenu jour 2

## 3

![](https://picsum.photos/200?random=3)

Contenu jour 3

## 4

![](https://picsum.photos/200?random=4)

Contenu jour 4

## 5

![](https://picsum.photos/200?random=5)

Contenu jour 5

## 6

![](https://picsum.photos/200?random=6)

Contenu jour 6

## 7

![](https://picsum.photos/200?random=7)

Contenu jour 7

## 8

![](https://picsum.photos/200?random=8)

Contenu jour 8

## 9

![](https://picsum.photos/200?random=16)

Contenu jour 9

## 10

![](https://picsum.photos/200?random=12)

Contenu jour 10

## 11

![](https://picsum.photos/200?random=14)

Contenu jour 11

## 12

![](https://picsum.photos/200?random=10)

Contenu jour 12

## 13

![](https://picsum.photos/200?random=15)

Contenu jour 13

## 14

![](https://picsum.photos/200?random=13)

Contenu jour 14

## 15

![](https://picsum.photos/200?random=11)

Contenu jour 15

## 16

![](https://picsum.photos/200?random=9)

Contenu jour 16

## 17

![](https://picsum.photos/200?random=20)

Contenu jour 17

## 18

![](https://picsum.photos/200?random=19)

Contenu jour 18

## 19

![](https://picsum.photos/200?random=23)

Contenu jour 19

## 20

![](https://picsum.photos/200?random=17)

Contenu jour 20

## 21

![](https://picsum.photos/200?random=24)

Contenu jour 21

## 22

![](https://picsum.photos/200?random=18)

Contenu jour 22

## 23

![](https://picsum.photos/200?random=22)

Contenu jour 23

## 24

![](https://picsum.photos/200?random=21)

Contenu jour 24

## 25

![](https://picsum.photos/200?random=26)

Contenu jour 25

## 26

![](https://picsum.photos/200?random=29)

Contenu jour 26

## 27

![](https://picsum.photos/200?random=27)

Contenu jour 27

## 28

![](https://picsum.photos/200?random=31)

Contenu jour 28

## 29

![](https://picsum.photos/200?random=25)

Contenu jour 29

## 30

![](https://picsum.photos/200?random=30)

Contenu jour 30

## 31

![](https://picsum.photos/200?random=28)

Contenu jour 31
