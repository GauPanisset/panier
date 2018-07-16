# Front Panier

## Requis

* npm

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
        │   ├── cat-section.vue
        │   ├── filter-aside.vue
        │   ├── home-section.vue
        │   ├── horizontal-scroll-wrapper.vue
        │   ├── nav-bar.vue
        │   ├── search-bar.vue
        │   └── subsection.vue
        └── pages
            ├── focus
            │   ├── article
            │   │   ├── app.html
            │   │   ├── app.js
            │   │   └── app.vue
            │   ├── brand
            │   │   ├── app.html
            │   │   ├── app.js
            │   │   └── app.vue
            │   └── product
            │       ├── app.html
            │       ├── app.js
            │       └── app.vue
            ├── home
            │   ├── app.html
            │   ├── app.js
            │   └── app.vue
            └── result
                ├── app.html
                ├── app.js
                └── app.vue

#### 2) Les composants :

* cat-section.vue :

Il propose un affichage en ligne d'images associées à un nom.
Ce composant possède les attributs suivants :

    {
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

* filter-aside.vue :

Il propose un filtre fixe sur le côté gauche de l'écran. Grace à un affichage en *collapse*
on peut ajouter de nombreux filtres sans que ce composant soit trop grand.

De plus, lorsque qu'un filtre est sélectionné, il apparait en dessous de la section qui *collapse*,
ce qui permet à l'utilisateur de voir les filtres sélectionnés et éventuellement les supprimer (en cliquant
directement sur le bouton qui s'affiche).

Dans les *data* de ce composants, on retrouve les différentes sections et filtres proposés.

* home-sections.vue :

Ce composant est simplement un conteneur. Il permet l'affichage des différentes sections de
la page d'accueil.

Ce composant possède les attributs suivants :

    {
        name: "Nom de la section",
        content: [{img: 'image mise en valeur', text: 'texte associé'}, ..., {...}]
    }

Le `content` va être retransmis au composant suivant qui va l'afficher.

Ce composant utilise le composant suivant :

    - subsection.vue

* subsection.vue :

Ce composant affiche les éléments présents sur la page d'accueil dans la section associée.

Il place le texte par rapport à l'image et l'image par rapport à la section de façon aléatoire
pour créer un effet de désordre organisé. De plus, ce composant implémente l'effet de parallaxe
 que l'on observe.

Ce composant possède les attributs suivants :

    {
        img: "url de l'image à afficher",
        text: "text associé à afficher,
        position: "position du scroll"
    }

La position du scroll est établie dans le composant parent haut dans la hiérarchie et est transmise ici
pour permettre l'effet de parallaxe.

* horizontal-scroll-wrapper.vue :

Ce composant est le conteneur principal de la page d'accueil. Il permet l'affichage des sections
et de la barre de navigation.

Ce composant utilise les composants suivant :

    - nav-bar.vue
    - home-section.vue

* nav-bar.vue :

Ce composant permet l'affichage de la barre de navigation du site.

* search-bar.vue :

Ce composant permet l'affichage de la premier partie de la page d'accueil, avec la barre de
recherche centrale.

#### 3) Les pages

* focus :

Les 3 pages focus proposent des affichages pour des *articles*, des *marques* ou des *produits* précis.
Elles donnent toutes les informations disponibles.

On utilise dans ces pages les composants suivants :

    - nav-bar.vue
    - cat-section.vue

* home :

Il s'agit de la page d'accueil. Elle est composée est deux morceaux. Le premier, une barre de recherche
qui invite directement l'utilisateur à faire une requête au moteur de recherche. Le défile est ici verticale.
Il y a également une flèche qui permet d'atteindre la partie suivante.

La deuxième partie constitue véritable la page d'accueil, on peut y retrouver la barre de navigation
mais également les différentes sections qui mettent en avant des objets présents sur le site (articles,
marques, ...). Dans cette partie le défilement se fait horizontalement. Là encore, des petites flèches
de chaque côté permettent de défiler sans avoir à scroller.

On utilise dans cette page les composants suivants :

    - search-bar.vue
    - horizontal-scroll-wrapper.vue

* result :

Il s'agit de la page qui suit une recherche. Elle permet l'affichage du résultat. Celui-ci dépend
des contraintes exercées par l'utilisateur. En effet, la page peut afficher uniquement un type d'objet
(que les produits par exemple) ou tous les objets pertinents pour la recherche (que ce soit des produits,
des articles, des marques, ...)

Sur cette page, l'utilisateur pourra tout de même raffiner sa requête grace aux filtres.

On utilise dans cette page les composants suivants :

    - nav-bar.vue
    - filter-aside.vue
    - cat-section.vue
