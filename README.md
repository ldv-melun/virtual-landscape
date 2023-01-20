## Générateur de paysages virtuels 

Projet de développement logiciel à destinatation d'apprentis développeur.

Objectifs  

* prise en main d'une petite application javascript (sans framework)
* programmation en javascript dans une approche objet et événementielle
* utilisation de l'API 2D JS intégrée
* développement de la créativité  

### Squelette de l'application

#### structure des dossiers

```
.
├── css
│   ├── lavalamp.png
│   ├── layout.css
│   ├── menu_bg.png
│   ├── menu.css
│   └── menu_line.png
├── docs
│   ├── analyse.dia
│   ├── analyse.png
│   ├── java-genPaysageEtudiant.zip
│   └── java-paysage-virutel.png
├── index.html
├── js
│   ├── main.js
│   └── modules
│       ├── index.js
│       ├── AbstractForm.js
│       ├── Immeuble.js
│       └── Triangle.js
└── README.md
```

* `index.html` : le point d'entrée de l'interprétation par un navigateur. Hormis les inclusion `css`, 
ce fichier contient quelques instructions `javascript` faisant appel à des fonction de `main.js`
* `css`     : Thème simple, avec une barre de menu
* `main.js` : Déclare utiliser des modules (des classes `js`) et définit 2 fonctions : ̀


```javascript 
/**
 *  dessine uniquement la forme passée dont le nom est reçu en paramètre
 * @param whichForm 
 */
function drawThisForm(whichForm) {
  const mod = modulesForms;
  if (typeof mod[whichForm] !== undefined) {
    _drawForms(mod[whichForm].buildForms())
  }
}

function drawAllForms () {
  _drawForms(buildForms())
}
```

le dossier `modules` : il contient le code source de classes javascript. C'est dans ce dossier 
que vous placerez vos classes représentant les formes issues de votre imagination. 

* `index.js`: qui déclare les classes des formes (à mettre à jour lorsque vous définissez une nouvelle classe)
* `AbstractForm.js` : c'est la classe de base des formes à venir (des exemples sont fournies)
* `Immeuble.js`, `Planet.js`  et `Triangle.js` sont des exemples.

Les nouvelles formes seront représentées par des classes héritant de `AbstractForm.js` et placées dans le dossier `modules`, conformément aux exemples fournis 
 
 
![analyse](docs/analyse.png)


#### Délivrée par un serveur HTTP

Attention, l'application doit être placée derrière en serveur HTTP, et donc accessible à un utilisateur en réponse à une 
requête de type `http://` (et non en protocole `file://`)  

Sous VS, vous pouvez installer l'extension `Live Server`. Une fois installée, vous pouvez faire clic droit sur `index.html` pour lancer une instance d'un serveur HTTP, sur un port particulier, de votre machine locale. Ainsi votre application est-elle prête à être testée. 

### Comment démarrer ?

1. Étudier le tutoriel https://developer.mozilla.org/fr/docs/Tutoriel_canvas/Utilisation_de_base - pour un internet ouvert - Fondation Mozilla open source (https://www.mozilla.org/fr/about/manifesto/)  
2. Étudier le code de `index.html`, `main.js` et autres de l'application.
3. Concevoir, sur le papier, une idée de dessin originale (faire simple pour commencer) - inspirez vous d'exemples glanés sur le net.
4. Créer une nouvelle classe dans `modules` qui traduira votre idée originale en code 
5. Ajouter cette classe à `modules/index.js` et ajouter un nouveau lien dans le dropdown `Composants` de `index.html` (voir ci-après)
5. Mettre au point ... 

### Analyse du code existant

#### index.html

La barre de menu contient une liste déroulante présentant les composants de forme

```html
  <li><a class="hsubs" href="#">Composant</a>
      <ul class="subs">
        <li><a href="#" onclick="drawForm('Immeuble');return false;">Immeuble</a></li>
        <li><a href="#" onclick="drawForm('Triangle');return false;">Triangle</a></li>
        <li><a href="#" onclick="drawForm('AbstractForm');return false;">AbstractForm</a></li>
      </ul>
  </li>
```

Un clic utilisateur sur un des items de cette liste provoquera 
un appel à la fonction `drawForm`.

```javascript
<script type="module" src="js/main.js"></script>

<script>
  function drawForm(form) {
    document.drawForm(form)
  }
</script>

``` 
En allant voir  `main.js` on comprend que la fonction `drawForm` 
est une référence la fonction  `drawThisForm` du module `main.js` (importé juste avant)
  
<hr>

## ajouter/supprimer une nouvelle classe de forme
<br>

Voici où vous devriez alors intervenir  :

* dans `index.html`, ajouter un ou supprimer un item à la liste `<li>` qui 
définit la fonction `js` à appeler lorsque l'utilisateur clique sur le lien l'instruction 
`return false;` qui suit est pour là pour stopper l'action normal du navigateur lorsque l'utilisateur clique sur un lien - comme suivre le lien ou scroller la page).     
`

* dans `main.js`, modifier les fonctions `buildForms` et ajouter votre classe dans l'export de  `modules/index.js`  

```javascript

/**
 * construit les différentes formes du paysage, en appelant la méthode statique
 * buildForms de chacune des classes
 * 
 * @return {Object[]}
 */
function buildForms() {
  let forms = Immeuble.buildForms()
  forms = forms.concat(Triangle.buildForms())
  forms = forms.concat(AbstractForm.buildForms())
  // à compléter/modifier
  // etc. pour chacune de vos classes
  return forms
}


/**
 *  Dessine uniquement la forme passée dont le nom est reçu en paramètre  (attention, le fichier modules/index.js doit être mis à jour pour chaque classe ajoutée)
 * @param whichForm le nom d'une classe héritant d'AbstractForm dans modules
 */
function drawThisForm(whichForm) {
  const mod = modulesForms;
  if (typeof mod[whichForm] !== undefined) {
    _drawForms(mod[whichForm].buildForms())
  }


```

* Lors d'un ajout d'une nouvelle classe  (par exemple `MaNouvelleFome.js`), redéfinir les méthodes `static buildForms()` et ` draw(ctx)`. Prendre exemple sur `Immeuble` et `Triangle`

 ![exemple en version de base](docs/exemple-app-init.png)


<hr>

### Pour info, des exemples (étudiants 2020)

 ![old-example](docs/exemple-1-2020.png)

![old-example](docs/exemple-2-2020.png)

 ![old-example](docs/exemple-3-2020.png)
 

<hr>

### Un historique en java (étudiant) 

 ![old-example](docs/java-paysage-virutel.png)

[Exemple d'un projet d'étudiant - code et executable en java](docs/java-genPaysageEtudiant.zip) 

Une fois décompressé :

`=> lancement   : java -jar paysage.jar`

`=> son rapport : ./genPaysage/rapport/`

`=> le code source : ./genPaysage/*`


