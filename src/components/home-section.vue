<template>
    <!--
    Section regroupant tous les items d'une même catégorie présentés en page d'accueil.
    Les items sont affichés grâce à des <subsection>.
    Le titre de la catégorie est affiché avec le <h1>.
    -->
    <div class="home-section">
        <template v-for="subsec in attribute.content">
            <subsection :attribute="{image: subsec.image, title: subsec.titre, content: subsec.texte, id: subsec.id, type: attribute.type}" :position="position"></subsection>
        </template>
        <transition name="fade">
            <h1 v-if="position.scrollTop + 8 >= this.windowHeight" ref="sectionTitle"><a :href="attribute.link">{{attribute.name}}</a></h1>
        </transition>
    </div>

</template>

<script>
    import Subsection from "./subsection";



    export default {
        components: {Subsection},
        name: "home-section",
        data () {
            return {
                windowHeight: window.innerHeight,
            }
        },
        props: ['attribute', 'position'],               //position donne {scrollTop, scrollLeft} i.e. la position dans la home.
                                                        //attribute donne les informations à afficher : {name, content: {id, texte, image, titre}, type, link}
    }

</script>

<style scoped>
    .home-section {
        padding-top: 60px;
        height: 100vh;
    }

    h1 {
        font-family: 'salomeregular';
        font-size: 8vh;
        height: fit-content;
        position: sticky;
        top: 85%;
        right: 65%;
        z-index: 10;
    }

    a {
        color: black;
        text-decoration: none;
    }

    h1>a:before {
        content: "";
        position: absolute;
        width: 100%;
        height: 2px;
        bottom: 0;
        left: 0;
        background-color: #000;
        visibility: hidden;
        -webkit-transform: scaleX(0);
        transform: scaleX(0);
        -webkit-transition: all 0.3s ease-in-out 0s;
        transition: all 0.3s ease-in-out 0s;
    }

    h1>a:hover:before {
        visibility: visible;
        -webkit-transform: scaleX(1);
        transform: scaleX(1);
    }

    @font-face {
        font-family: 'salomeregular';
        src: url('../assets/font/salome-webfont.eot');
        src: url('../assets/font/salome-webfont.eot?#iefix') format('embedded-opentype'),
        url('../assets/font/salome-webfont.woff2') format('woff2'),
        url('../assets/font/salome-webfont.woff') format('woff'),
        url('../assets/font/salome-webfont.ttf') format('truetype'),
        url('../assets/font/salome-webfont.svg#salomeregular') format('svg');
        font-weight: normal;
        font-style: normal;
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to {
        opacity: 0;
    }

</style>
