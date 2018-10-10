# Front Panier

## Requis

* [npm]([https://www.npmjs.com/get-npm])

## Pour tester

A taper dans la console pour :

* Charger les modules : `npm install`
* Lancer le serveur : `npm run dev`

## Contenu

Pour mettre en place le front-end de ce site, le framework **VueJs** a été utilisé.
Pour la partie *CSS*, les templates de bases sont du **Bootstrap**, **Bootstrap-vue** ou **Element**.
Le tout est contenu dans un **Webpack** dont le template multi-page est issue du GitHub de [Plortinus](https://github.com/Plortinus/vue-multiple-pages).


#### 1) La structure :

Voici l'arborescence du projet :

    ├── README.md
    ├── build                           (configuration de webpack)
    │   ├── webpack.base.conf.js
    │   ├── webpack.dev.conf.js
    │   └── webpack.prod.conf.js
    ├── package.json
    ├── postcss.config.js
    └── src
        ├── assets
        │   ├── css                     (contient le fichier qui modifie le thème bootstrap)
        │   ├── font                    (contient l'ensemble des fonts utiles)
        │   └── img                     (contient l'ensemble des images)
        ├── components
		│ 	├── cat-section.vue
		│ 	├── filter-aside.vue
		│ 	├── home-section.vue
		│ 	├── horizontal-scroll-wrapper.vue
		│ 	├── nav-bar.vue
		│ 	├── myModal.vue
		│ 	├── myTab.vue
		│ 	├── myTable.vue
		│ 	├── product-section.vue
		│ 	├── search-bar.vue
		│ 	└── subsection.vue
        └── pages
            ├── focus
            │   ├── article
			│ 	│ 	├── app.html
			│ 	│ 	├── app.js
			│ 	│ 	└── app.vue
			│ 	├── brand
			│ 	│ 	├── app.html
			│ 	│ 	├── app.js
			│ 	│ 	└── app.vue
			│ 	├── collection
			│ 	│ 	├── app.html
			│ 	│ 	├── app.js
			│ 	│ 	└── app.vue
			│ 	├── product
			│ 	│ 	├── app.html
			│ 	│ 	├── app.js
			│ 	│ 	└── app.vue
			│ 	├── shop
			│ 	│ 	├── app.html
			│ 	│ 	├── app.js
			│ 	│ 	└── app.vue
			│ 	└── user
			│ 		├── app.html
			│ 		├── app.js
			│ 		└── app.vue
            ├── home
            │   ├── app.html
            │   ├── app.js
            │   └── app.vue
            └── result
                ├── app.html
                ├── app.js
                └── app.vue

#### 2) Les composants :

* **cat-section.vue :**

##### Description :
Ce composant permet l'affichage en ligne d'images associées à un nom correspondant à un élément (*produit*, *article*, etc...).

##### Variables :
    {
        display: "short ou large, i.e. type d'affichage",
    }

##### Methodes :

	{
        changeDisplay() : modifie le display. Appelée par le bouton (+)
        getImgUrl(string pic) : retourne le chemin pour afficher l'image "pic"
        getLinkUrl(string type, int id) : retourne le chemin du lien à partir de son type et de l'id de l'élément
        getText(string text) : retourne le début de "text"
    }

##### Inputs :

    attribute = {
        title: "Nom de la section",
        display: "short ou large, i.e. type d'affichage",
        font: "font utilisée pour le titre",
        content: [{name: "nom du premier objet", image: "image associée"}, ..., {...}]
    }

Le `display: short` permet en fait un affichage limité à 4 éléments
(si plus que 4 sont en fait proposé, un icon (+) apparaitra en fin de ligne).

Le `display: large` affiche quant à lui l'ensemble des objets contenus dans `content`.
Cette différence est notamment utile pour proposer plusieurs sections (et donc plusieurs types d'objets
: *article*, *produit*, *boutique*, ...) sur une même page, sans que cette dernière soit potentiellement
"infinie".

##### Utilisation de l'API :

Aucune.

##### Liens :

| Parent(s) 			| Fils     	|
| :-------------: 	|:-------------:	|
| 						| 			  	|

-

* **filter-aside.vue :**

##### Description :

Ce composant propose un filtre fixe sur le côté gauche de l'écran. Grace à un affichage en *collapse*
on peut ajouter de nombreux filtres sans que ce composant soit trop grand.

De plus, lorsque qu'un filtre est sélectionné, il apparait en dessous de la section qui *collapse*,
ce qui permet à l'utilisateur de voir les filtres sélectionnés et éventuellement les supprimer (en cliquant
directement sur le bouton qui s'affiche).

Dans les *data* de ce composants, on retrouve les différentes sections et filtres proposés.

##### Variables :

    {
   			activeNames : ["collapse filtre ouvert"],
   			activeNamesOrderBy : ["collapse tri ouvert"],
   			selection : ["id des filtres actifs"],
   			sortedBy : ["id des tris actifs"]
    }


##### Méthodes :

    {
    		sendSelection([] selected, string name) : callback de l'event @change des checkboxs des filtres.
    		sendSort([] selected, int id) : callback de l'event @change des checkboxs des tris.
    		reset() : reset les filtres.
    }

Ces méthodes renvoient toutes une *emit* vers **result/app.vue** pour modifier les requêtes en tenant compte des tris et filtres.

##### Inputs :

    {
   			filters : [{
   							name : "nom du filtre",
   							content : [{
   											id : id du filtre,
   											text : texte affiché sur le choix,
   											value: valeur de retour
   										}, ... , {...}],
   							title : "nom du filtre affiché",
   							selection : [liste des filtres sélectionnés]
   						}, ... , {...}]
    }

##### Utilisation de l'API :

Aucune.

##### Liens :

| Parent(s) 			| Fils     	|
| :-------------: 	|:-------------:	|
| result/app.vue		| 				  	|

-

* **home-sections.vue :**

#####Description :

Ce composant est simplement un conteneur. Il permet l'affichage des différentes sections de
la page d'accueil.

##### Variables :

    {}


##### Méthodes :

    {}

##### Inputs :

    {
   			attribute : {
   								name: "Nom de la section",
   								content: [{img: 'image mise en valeur', text: 'texte associé'}, ..., {...}]
    					},
    		position : {
    							scrollTop : position de la page par rapport à la fenêtre.
    				   }
    }

Le `content` va être retransmis au composant suivant qui va l'afficher.

##### Utilisation de l'API :

Aucune.

##### Liens :


| Parent(s) 			| Fils     	|
| :-------------: 	|:-------------:	|
| 						| subsection.vue	|

-

* **horizontal-scroll-wrapper.vue :**

##### Description :

Ce composant est le conteneur principal de la page d'accueil. Il permet l'affichage des sections
et de la barre de navigation.

##### Variables :

    {
   			sections : [{
   								name : "nom de la section",
   								content : [voir home-section.vue],
   								type : "type de section, utile pour un affichage adéquate",
   								link : lien redirigeant vers l'ensemble des éléments de la section.
   						}, ... , {...}]
    }


##### Méthodes :

    {
   			mouseScroll(val) : callback de l'event @mouseenter des flêches sur les côtés de la fenêtre. Permet de lancer le scroll. "val" indique le sens de scroll.
   			mouseFree() : callbakc de l'event @mouseleave des flêches sur les côtés de la fenêtre. Permet d'arrêter le scroll.
    }

##### Inputs :

    {
   			position : {
   						 		scrollTop : position verticale de la page par rapport à la fenêtre.
   						 		scrollLeft : position horizontale de la page par rapport à la fenêtre.
   					   }
    }

##### Utilisation de l'API :

- **/article/accueil/news** : accède aux *news* sélectionnées pour l'accueil.
- **/article/accueil/reportage** : accède aux *reportages* sélectionnés pour l'accueil.
- **/article/accueil/dossier** : accède aux *dossiers* sélectionnés pour l'accueil.
- **/article/accueil/maison** : accède aux articles *maison* sélectionnés pour l'accueil.
- **/brand/accueil** : accède aux *marques* sélectionnées pour  l'accueil.
- **/shop/accueil** : accède aux *boutiques* sélectionnées pour l'accueil.

##### Liens :

| Parent(s) 			| Fils     	|
| :-------------: 	|:-------------:	|
| 						| home-section.vue <br> nav-bar.vue <br> product-section.vue 				  	|

-

* **myModal.vue :**

##### Description :

Ce composant permet l'affichage d'une modale personnalisable.

On peut modifier depuis le composant parent le `header` de la façon suivante :

```html
<div slot="header"> ... <\div>
```
On procède de la même façon pour modifier le `body`.

Le composant a été créé pour contourner les difficultés à personnaliser les *modal* proposées par **Bootstrap**.

##### Variables :

    {}


##### Méthodes :

    {}

##### Inputs :

    {
   			width : largeur de la fenêtre modale.
   			backOffice : boolean pour savoir s'il s'agit du backOffice ou non.
    }

##### Utilisation de l'API :

Aucune.

##### Liens :

| Parent(s) 			| Fils     	|
| :-------------: 	|:-------------:	|
| nav-bar.vue <br> user/app.vue	|  	|

-

* **myTab.vue :**

##### Description :

Ce composant permet l'affichage du nav-tab personnalisé du back office. Le composant a été créé pour contourner les difficultés à personnaliser les *tab* proposés par **Bootstrap**.

##### Variables :

    {
   			userAutho : {id_authorization : scope_authorization, ...}.
   			selectedX : true si onglet actif, false sinon.
   			columnsCategorie : [{
   										friendlyName : nom de l'attribut affiché,
   										id : nom de l'attribut,
   										type : type d'input (text, image, file, ...)
   								}, ... , {...}]
    }

Il y a 5 catégories : *product*, *article*, *shop*, *brand*, *user*, qui possèdent toutes un **selectedX** associé.


##### Méthodes :

    {
    		changeAttributes(index) :	callback de l'event @click, permettant l'affichage du bon contenu en fonction de l'onglet actif.
    }

##### Inputs :

    {
   			isAdmin : true si l'utilisateur est admin, false sinon. Utile pour conntourner les problèmes d'authentification.
    }

##### Utilisation de l'API :

- **/user/authorization/:id** : accède aux authorisations d'un utilisateur dont l'identifiant est *id*.

##### Liens :

| Parent(s) 			| Fils     	|
| :-------------: 	|:-------------:	|
| user/app.vue		| myTable.vue  	|

-

* **myTable.vue :**

##### Description :

Ce composant permet l'affichage du tableau du back-office. Il possède deux parties : ajout + affichage/edition.

##### Variables :

    {
   			labels : [{tous les attributs d'un élément}],
   			inputValue : {tous les attributs d'un élément qu'un utilisateur rentre grâce aux formulaires},
   			authorizations : [{
   										friendlyName : nom de l'authorisation affichée,
   										id : id de l'authorisation,
   										right : 0 si pas le droit, 1 sinon,
   										scope : scope de l'authorisation
   								  }, ... , {...}],
   			oldAutho : [liste des id des authorisations avant modification],
   			file : fichier CSV que l'utilisateur peut entrer
    }

Pour avoir le détails du contenu de *labels* ou *inputValue* voir la description des fonctions de l'API utilisées par ce composant (cf. [GauPanisset/panier-app](https://github.com/GauPanisset/passer-app/tree/master/routes)).

**authorizations** est utile pour la modification et la personnalisation des authorisations d'un utilisateur. **oldAutho** ne sert qu'à retenir les anciennes authorisations pour les modifier le cas échéant.

**file** permet à l'utilisateur d'entrer un fichier CSV pour remplir automatiquement la base de données.
*Respecter le format de fichier* : les noms de colonnes doivent être celles des attributs du produit. Une ligne correspond à un produit.

##### Méthodes :

    {
   			sendData() : méthode permettant d'envoyer les données dans la base de données à partir du fichier CSV.
   			updateAutho(id_utilisateur) : callback de l'event @ok de la modal. Modifie, supprime ou ajoute les authorisations de l'utilisateur d'identifiant id_utilisateur en base de données, après avoir confirmé.
   			openModalAutho(id_utilisateur, item) : ouvre la modal correspondant à l'utilisateur d'id id_utilisateur.
   			closeModalAutho() : ferme la modal.
   			updateEvent(column, item, value) : callback de l'event @blur des input-form. Elle met à jour les données.
   			checkBrand() : vérifie que la marque entrée par l'utilisateur existe. Si non il faut qu'il la crée.
   			deleteEvent(index) : callback de l'event @click sur le bouton poubelle. Elle permet de supprimer l'élément d'id index.
   			addRow() : callback de l'event @click sur le bouton (+). Elle ajoute un élément à partir des données stockées dans inputValue.
   			getItems() : permet d'obtenir l'ensemble des éléments d'une catégorie.
    }

##### Inputs :

    {
   			columnsNames : tableau des columnsCategorie (voir myTab.vue)
   			categorie : [liste des categories et de leurs id]
   			isAdmin : voir myTab.vue
   			userAutho : voir myTab.vue
    }

##### Utilisation de l'API :

- **/brand/index/allback** : retourne tous les attributs de toutes les marques.
- **/product/index/allback** : retourne tous les attributs de tous les produits.
- **/article/index/allback** : retourne tous les attributs de tous les articles.
- **/shop/index/allback** : retourne tous les attributs de toutes les boutiques.
- **/user/index/allback** : retourne tous les attributs de tous les utilisateurs.
- **/product/jsoncreate** : créer des produits à partir d'un fichier CSV converti en JSON. Un produit par ligne.
- **/user/authorization/:id\_user/:id\_autho** : supprime l'authorisation id_autho de l'utilisateur id_user.
- **/user/account/authorization** : modifie l'authorisation passée en data.
- **/user/authorization** : ajoute l'authorisation passée en data.
- **/user/authorization/:id** : retourne toutes les authorisations de l'utilisateur id.
- **/brand/:attribut** : modifie l'attribut de la marque passée en data. La nouvelle valeur est également passée en data.
- **/product/:attribut** : modifie l'attribut du produit passé en data. La nouvelle valeur est également passée en data.
- **/article/:attribut** : modifie l'attribut de l'article passé en data. La nouvelle valeur est également passée en data.
- **/shop/:attribut** : modifie l'attribut de la boutique passée en data. La nouvelle valeur est également passée en data.
- **/user/:attribut** : modifie l'attribut de l'utilisateur passée en data. La nouvelle valeur est également passée en data.
- **/brand/id/:brand_name** : retourne l'identifiant de la marque brand_name. L'utilisation de cette méthode permet également de tester si la marque existe (cf. checKBrand() ).
- **/brand/:id** : supprime la marque d'identifiant id.
- **/product/:id** : supprime le produit d'identifiant id.
- **/article/:id** : supprime l'article d'identifiant id.
- **/shop/:id** : supprime la boutique d'identifiant id.
- **/user/:id** : supprime l'utilisateur d'identifiant id.
- **/brand/create** : ajoute la marque dont les attributs sont passés en data.
- **/product/create** : ajoute le produit dont les attributs sont passés en data.
- **/article/create** : ajoute l'article dont les attributs sont passés en data.
- **/shop/create** : ajoute la boutique dont les attributs sont passés en data.
- **/user/create** : ajoute l'utilisateur dont les attributs sont passés en data.

##### Liens :

| Parent(s) 			| Fils     	|
| :-------------: 	|:-------------:	|
| myTab.vue			| myModal.vue	  	|

-

* **nav-bar.vue :**

##### Description :

Ce composant permet l'affichage de la barre de navigation du site. Il contient également la définition de la fenêtre de connexion et de création de compte.

L'utilisateur peut également faire une recherche depuis cette barre de navigation.

##### Variables :

    {
   			request : "requête faite via la barre de recherche".
   			username : "variable contenant la valeur de l'input-form 'nom d'utilisateur'".
   			password : "variable contenant la valeur de l'input-form 'mot de passe'".
   			picture : "nom de la photo de l'utilisateur".
   			userInput : vrai si l'utilisateur a ouvert le dropdown de connexion. Faux sinon.
   			userConnected : vrai si l'utilisateur est connecté. Faux sinon.
   			showModal : vrai pour afficher la modal de création de compte. Faux sinon.
   			stateX : vrai si l'input est valide. Faux sinon.
   			newX : "valeur de l'input".
   			confirmed : vrai si la création a été effectuée. Faux sinon.
    }


##### Méthodes :

    {
   			getImgUrl(string pic) : retourne le chemin pour afficher l'image "pic"
   			toResult() : callback de l'event @click ou #keyup.enter de la barre de recherche qui appelle la page de résultat.
   			changeUserConnect(event) : callback de l'event @click du bouton profil permettant de créer un écran opaque lorsque le dropdown est déplié. Modifie en réalité la variable userInput.
   			login() : connecte un utilisateur.
   			logout() : déconnecter l'utilisateur connecté.
   			closeModal() : ferme la modal de création de compte.
   			confirm() : confirme les choix de création de compte.
    }

##### Inputs :

    {}

##### Utilisation de l'API :

- **/user/login** : vérifie que l'association mot de passe - nom d'utilisateur est correcte et retourne un token.
- **/user/logout** : supprime le token et déconnecte l'utilisateur.
- **/user/create** : ajoute un utilisateur.

##### Liens :

| Parent(s) 			| Fils     		|
| :-------------: 	|:-------------:	|
| myTab.vue			| myModal		  	|

-

* **product-section.vue :**

##### Description :

Ce composant permet l'affichage de la première section de la page d'accueil. Il présente les catégories de produits et propose des liens.

##### Variables :

    {
    		categories : [{
    								friendlyName : "nom affiché de la catégorie",
    								categorie : "identifiant de la catégorie",
    								image : "url de l'image associée à la catégorie"
    					  }, ... , {...}]
    }

##### Methodes :

    {
    		getImgUrl(string pic) : retourne le chemin pour afficher l'image "pic"
    }

##### Inputs :

    {
    		position : {
   						 		scrollTop : position verticale de la page par rapport à la fenêtre.
   						 		scrollLeft : position horizontale de la page par rapport à la fenêtre.
   					   }
    }

##### Utilisation de l'API :

- **/product/accueil/random** : retourne les catégories disponibles associées à une image d'un objet aléatoire de la catégorie.

##### Liens :

| Parent(s) 			| Fils    	 	|
| :-------------: 	|:-------------:	|
| 						| 				  	|

-

* **search-bar.vue :**

##### Description :

Ce composant permet l'affichage de la premier partie de la page d'accueil, avec la barre de
recherche centrale.

##### Variables :

    {
    		request : "requête faite via la barre de recherche"
    }

##### Methodes :
	{
			toResult() : callback de l'event @click ou #keyup.enter de la barre de recherche qui appelle la page de résultat.
	}
##### Inputs :

    {
    		position : {
   						 		scrollTop : position verticale de la page par rapport à la fenêtre.
   						 		scrollLeft : position horizontale de la page par rapport à la fenêtre.
   					   }
    }

##### Utilisation de l'API :

Aucune.

##### Liens :

| Parent(s) 			| Fils     	|
| :-------------: 	|:-------------:	|
| 						| 		     	  	|

-

* **subsection.vue :**

##### Description :

Ce composant affiche les éléments présents sur la page d'accueil dans la section associée.

Il place le texte par rapport à l'image et l'image par rapport à la section de façon aléatoire
pour créer un effet de désordre organisé. De plus, ce composant implémente l'effet de parallaxe
 que l'on observe, i.e. la modification de la position relative de l'image par rapport au texte en fonction de sa position dans la fenêtre

La position du scroll est établie dans le composant parent et est transmise ici
pour permettre l'effet de parallaxe.

##### Variables :

	{
			init : {
							widthText : largeur du block texte,
							widthImg : largeur du block image,
							heightImg : hauteur du block image,
							value : alpha modificateur
				   }
			styleObject : {
							top : valeur de l'attribut top des éléments,
							padding-left : valeur de l'attribut padding-left des éléments,
						  }
			styleMove : {
							left : valeur de l'attribut left des éléments
						}
			summary : {
							content : "texte réduit pour être affiché",
							link : "lien utile pour rediriger vers l'élément affiché"
					  }
	}

*styleMove* engendre l'effet de désordre et *styleMove* l'effet parallaxe.

##### Methodes :

    {
    		getImgUrl(string pic) : retourne le chemin pour afficher l'image "pic"
    		parallaxe() : permet l'effet de parallaxe.
    }

##### Inputs :

	{
    		position : {
   						 		scrollTop : position verticale de la page par rapport à la fenêtre.
   						 		scrollLeft : position horizontale de la page par rapport à la fenêtre.
   					   }
   			attribut : {
   								image : "url de l'image de la vignette"
   								title : "titre affiché sous la vignette"
   								content : "texte affiché sous le titre"
   								id : id de l'élément affiché
   								type : "type de l'élément : article, brand ou shop"
   					   }
    }

##### Utilisation de l'API :

Aucune.

##### Liens :

| Parent(s) 			| Fils     	|
| :-------------: 	|:-------------:	|
| 						| 				  	|



#### 3) Les pages

* **focus :**

##### Description :

Les 6 pages focus proposent des affichages pour des *articles*, des *marques*, des *boutiques*, des *produits*, des *collections* ou des *utilisateurs* précis.
Elles donnent toutes les informations disponibles.

* focus/articles/app.vue :

##### Variables :

	{
				title : "titre de l'article",
               	subtitle : "sous-titre de l'article",
                date : "date de l'article",
                content: ["paragraphe du texte", ... , "..."],
                tags : ["liste des tags"],
                images : ["listes des urls des images"],
                imagesGallery : ["listes des urls des images pour la gallerie],
                positions: {
                				"url de l'image" : {
                										top : valeur de l'attribut top de l'élément
                										left : valeur de l'attribut left de l'élément
                									}
                		   },
                products : attributs nécessaires à la création d'une cat-section pour afficher les produits liés cf. cat-section.vue,
                articles : attributs nécessaires à la création d'une cat-section pour afficher les articles similaires cf. cat-section.vue,
                index: null. Utile pour l'utilisation de vue-gallery
    }

##### Methodes :

	{
			getImgUrl(string pic) : retourne le chemin pour afficher l'image "pic".
			displayImg(string image) : callback de l'event @mouseenter de l'image. Passe l'image au premier plan.
			hideImg(string image) : callback de l'event @mouseleave de l'image. Passe l'image à l'arrière plan.
	}

##### Inputs :

	{}

##### Utilisation de l'API :

- **/article/:id** : retourne les attributs de l'article d'identifiant id.
- **/article/image/:id** : retourne les images de l'article d'identifiant id.

##### Liens :

| Parent(s) 			| Fils     	|
| :-------------: 	|:-------------:	|
| 						| nav-bar.vue <br> cat-section.vue |

-

* focus/brand/app.vue :

##### Variables :

	{
				brand : "nom de la marque",
               	website : "url du site de la marque",
                content : ["paragraphe du texte de description", ... , "..."],
                links : [{
                				name : "nom du lien",
                				url : "url du lien"
                		 }, ... , {...}],
                tags : ["liste des tags"],
                images : ["listes des urls des images"],
                imagesGallery : ["listes des urls des images pour la gallerie],
                positions: {
                				"url de l'image" : {
                										top : valeur de l'attribut top de l'élément
                										left : valeur de l'attribut left de l'élément
                									}
                		   },
                shop : attributs nécessaires à la création d'une cat-section pour afficher les boutiques liées cf cat-section.vue,
                products : attributs nécessaires à la création d'une cat-section pour afficher les produits liés cf. cat-section.vue,
                articles : attributs nécessaires à la création d'une cat-section pour afficher les articles similaires cf. cat-section.vue,
                index: null. Utile pour l'utilisation de vue-gallery
    }

##### Methodes :

	{
			getImgUrl(string pic) : retourne le chemin pour afficher l'image "pic".
			displayImg(string image) : callback de l'event @mouseenter de l'image. Passe l'image au premier plan.
			hideImg(string image) : callback de l'event @mouseleave de l'image. Passe l'image à l'arrière plan.
	}

##### Inputs :

	{}

##### Utilisation de l'API :

- **/brand/:id** : retourne les attributs de la marque d'identifiant id.
- **/brand/image/:id** : retourne les images de la marque d'identifiant id.

##### Liens :

| Parent(s) 			| Fils     	|
| :-------------: 	|:-------------:	|
| 						| nav-bar.vue <br> cat-section.vue |

-

* focus/collection/app.vue :

##### Variables :

	{
				sections : liste des attributs nécessaires à la création des cat-section pour afficher les collections cf. cat-section.vue
    }

##### Methodes :

	{
			getImgUrl(string pic) : retourne le chemin pour afficher l'image "pic".
	}

##### Inputs :

	{}

##### Utilisation de l'API :

- **/product/collection/:brand_id** : retourne les produits et leurs attributs triés par collection de la marque d'identifiant brand_id.
- **/user/collection/:id** : retourne éléments et leurs attributs triés par collection de l'utilisateur d'identifiant id.

##### Liens :

| Parent(s) 			| Fils     	|
| :-------------: 	|:-------------:	|
| 						| nav-bar.vue <br> cat-section.vue |

-

* focus/product/app.vue :

##### Variables :

	{
				product : "nom du produit",
               	price : prix du produit,
               	attributes : [["nom de l'attribut affiché, valeur de l'attribut], ... , [...]]
                description : ["paragraphe du texte de description", ... , "..."],
                images : ["listes des urls des images"],
                imagesGallery : ["listes des urls des images pour la gallerie],
                positions : {
                				"url de l'image" : {
                										top : valeur de l'attribut top de l'élément
                										left : valeur de l'attribut left de l'élément
                									}
                		   },
               	inCollection : vrai si dans la collection, faux sinon.
                products : attributs nécessaires à la création d'une cat-section pour afficher les produits liés cf. cat-section.vue,
                articles : attributs nécessaires à la création d'une cat-section pour afficher les articles similaires cf. cat-section.vue,
                index : null. Utile pour l'utilisation de vue-gallery,
                showAddModal :  vrai pour afficher la modal d'ajout à la collection. Faux sinon,
                showDeleteModal :  vrai pour afficher la modal de suppression de la collection. Faux sinon,
                collectionName : "nom de la collection choisi pour l'ajout ou la suppression",
                options : [Liste des noms de collections disponibles pour l'ajout]
                optionsDelete : [Liste des noms de collections disponibles à la suppression]
    }

##### Methodes :

	{
			closeAddModal() : ferme la modal d'ajout à la collection.
			closeDeleteModal() : ferme la modal de suppression de la collection.
			addToCollection() : ajoute un produit à la collection choisie.
			removeFromCollection() : supprime un produit de la collection choisie.
			getImgUrl(string pic) : retourne le chemin pour afficher l'image "pic".
			displayImg(string image) : callback de l'event @mouseenter de l'image. Passe l'image au premier plan.
			hideImg(string image) : callback de l'event @mouseleave de l'image. Passe l'image à l'arrière plan.
	}

##### Inputs :

	{}

##### Utilisation de l'API :

- **/user/collection** : ajoute le produit à la collection.
- **/user/collection/:id/:collectionName** : supprimer le produit de la collection collectionName de l'utilisateur d'identifiant id.

##### Liens :

| Parent(s) 			| Fils     	|
| :-------------: 	|:-------------:	|
| 						| nav-bar.vue <br> cat-section.vue <br> myModal.vue|

-

* focus/shop/app.vue :

##### Variables :

	{
				name : "nom de la boutique",
               	website : "url de son site web",
                content : ["paragraphe du texte de description", ... , "..."],
                location1 : "première ligne de l'adresse de la boutique",
                location2 : "seconde ligne de l'adresse de la boutique",
                images : ["listes des urls des images"],
                imagesGallery : ["listes des urls des images pour la gallerie],
                positions : {
                				"url de l'image" : {
                										top : valeur de l'attribut top de l'élément
                										left : valeur de l'attribut left de l'élément
                									}
                		   },
				brand : attributs nécessaires à la création d'une cat-section pour afficher les marques liées cf. cat-section.vue,
                products : attributs nécessaires à la création d'une cat-section pour afficher les produits liés cf. cat-section.vue,
                articles : attributs nécessaires à la création d'une cat-section pour afficher les articles similaires cf. cat-section.vue,
                index : null. Utile pour l'utilisation de vue-gallery,
    }

##### Methodes :

	{
			getImgUrl(string pic) : retourne le chemin pour afficher l'image "pic".
			displayImg(string image) : callback de l'event @mouseenter de l'image. Passe l'image au premier plan.
			hideImg(string image) : callback de l'event @mouseleave de l'image. Passe l'image à l'arrière plan.
	}

##### Inputs :

	{}

##### Utilisation de l'API :

- **/shop/:id** : retourne les attributs de la boutique d'identifiant id.
- **/shop/image/:id** : retourne les images de la boutique d'identifiant id.

##### Liens :

| Parent(s) 			| Fils     	|
| :-------------: 	|:-------------:	|
| 						| nav-bar.vue <br> cat-section.vue |

-

* focus/user/app.vue :

##### Variables :

	{
				pseudo : "pseudo de l'utilisateur",
               	mail : "adresse mail de l'utilisateur",
                picture : "url de la photo de profil de l'utilisateur,
                admin : vrai si l'utilisateur est administrateur. Faux sinon,
                back : vrai si l'utilisateur a accès à une partie du back office. Faux sinon,
                showModalModif : vrai si la modal de modification est affichée. Faux sinon,
                stateEmail : vrai si l'email est valide. Faux sinon,
                newMail : "nouvelle adresse mail de l'utilisateur lors d'une modification",
				stateMdp : vrai si le mot de passe est valide. Faux sinon,
                stateMdp2 : vrai si le mot de passe réécrit est identique. Faux sinon,
                newMdp : {one : "valeur de l'input-form du nouveau mot de passe", two : "valeur de l'input-form de la réécriture du mot de passe"},
                confirmed : vrai si la création a été effectuée. Faux sinon,
                showModalBack : vrai si la modal de back-office est affichée. Faux sinon
    }

##### Methodes :

	{
			goTo(string url) : Callback de l'envent @click de lien "Mes Collections". Renvoie vers la page url.
			getImgUrl(string pic) : retourne le chemin pour afficher l'image "pic".
			closeModalBack() : ferme la modal du back-office.
			closeModalModif() : ferme la modal de modification.
			confirmModif : confirme les modifications.
	}

##### Inputs :

	{}

##### Utilisation de l'API :

- **/user/mail** : modifie l'adresse mail de l'utilisateur connecté.
- **/user/mdp** : modifie le mot de passe de l'utilisateur connecté.
- **/user/index/:id** : retourne les informations de l'utilisateur d'identifiant id.

##### Liens :

| Parent(s) 			| Fils     	|
| :-------------: 	|:-------------:	|
| 						| nav-bar.vue <br> myModal.vue <br> myTab.vue|

-

* home :

##### Description :

Il s'agit de la page d'accueil. Elle est composée est deux morceaux. Le premier, une barre de recherche
qui invite directement l'utilisateur à faire une requête au moteur de recherche. Le défile est ici verticale.
Il y a également une flèche qui permet d'atteindre la partie suivante.

La deuxième partie constitue véritable la page d'accueil, on peut y retrouver la barre de navigation
mais également les différentes sections qui mettent en avant des objets présents sur le site (articles,
marques, ...). Dans cette partie le défilement se fait horizontalement. Là encore, des petites flèches
de chaque côté permettent de défiler sans avoir à scroller.

##### Variables :

	{
				position : {
   						 		scrollTop : position verticale de la page par rapport à la fenêtre.
   						 		scrollLeft : position horizontale de la page par rapport à la fenêtre.
   					  	   }
    }

##### Methodes :

	{
			handleScroll() : méthode permettant le changement de direction de scroll.
	}

##### Inputs :

	{}

##### Utilisation de l'API :

Aucune

##### Liens :

| Parent(s) 			| Fils     	|
| :-------------: 	|:-------------:	|
| 						| search-bar.vue <br> horizontal-scroll-wrapper.vue|

-

* result :

Il s'agit de la page qui suit une recherche. Elle permet l'affichage du résultat. Celui-ci dépend
des contraintes exercées par l'utilisateur. En effet, la page peut afficher uniquement un type d'objet
(que les produits par exemple) ou tous les objets pertinents pour la recherche (que ce soit des produits,
des articles, des marques, ...)

Sur cette page, l'utilisateur pourra tout de même raffiner sa requête grace aux filtres.
##### Description :

Il s'agit de la page d'accueil. Elle est composée est deux morceaux. Le premier, une barre de recherche
qui invite directement l'utilisateur à faire une requête au moteur de recherche. Le défile est ici verticale.
Il y a également une flèche qui permet d'atteindre la partie suivante.

La deuxième partie constitue véritable la page d'accueil, on peut y retrouver la barre de navigation
mais également les différentes sections qui mettent en avant des objets présents sur le site (articles,
marques, ...). Dans cette partie le défilement se fait horizontalement. Là encore, des petites flèches
de chaque côté permettent de défiler sans avoir à scroller.

##### Variables :

	{
				sections : [liste des sections à afficher cf. cat-section.vue],
				filters : [liste des filtres disponibles cf. filter-aside.vue],
				request : "enoncé de la requête",
				section : "nom de la catégorie courante si il y a",
				reqParams : {
   						 		filter : valeur de la réécriture des filtres sous forme de paramètre de requête.
   						 		sort : valeur de la réécriture des tris sous forme de paramètre de requête.
   					  	   }
    }

##### Methodes :

	{
			setSort(data) : méthode traitant le retour du composant filter-aside.vue. Réécrit le tri comme un paramètre de la requête.
			setSelection(data) : méthode traitant le retour du composant filter-aside.vue. Réécrit les filtres comme un paramètre de la requête.
			displaySection() : permet l'affichage et la mise à jour des catégories.
			displayResult() : permet l'affichage de la mise à jour des résultats de requête.
	}

##### Inputs :

	{}

##### Utilisation de l'API :

- **/article/section/:type** : retourne tous les articles de la catégorie type.
- **/brand/index/all** : retourne toutes les marques.
- **/shop/index/all** : retourne toutes les boutiques.
- **/product/request/:keywords** : retourne tous les produits répondant à la requête keywords.
- **/product/image/:id** : retourne les images du produit id.
- **/article/request/:keywords** : retourne tous les articles répondant à la requête keywords.
- **/article/image/:id** : retourne les images de l'article id.

##### Liens :

| Parent(s) 			| Fils     	|
| :-------------: 	|:-------------:	|
| 						| nav-var.vue <br> filter-aside.vue <br> cat-section.vue |


## Pour plus tard...

- Gestion des images : actuellement il n'est pas possible d'ajouter une image depuis le back-office.
- Définition automatique des articles/produits/marques/... liés.
- Possibilité de s'inscrire en tant que *Marque* pour avoir des privilèges supérieurs.
- Ajouter des éléments dans l'index (côté back-end, le moteur de recherche utilise un index. Actuellement on peut ajouter des objets avec le back-office, mais ceux-ci ne sont pas indexé, donc on ne peut pas les chercher avec le moteur).
- Tout n'est pas parfaitement responsive.