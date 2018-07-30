<template>
    <div id="horizontal-scroll-wrapper">
        <transition name="fade">
          <nav-bar v-show="position.scrollTop + 8 >= windowHeight"></nav-bar>
        </transition>
        <img v-show="position.scrollTop + 8 >= windowHeight" @mouseenter="mouseScroll(-1)" @mouseleave="mouseFree()" class="arrow" id="left-arrow" src="../assets/img/fleches_gauche.png">
        <home-section v-for="section in sections" :key="section.image" :attribute="section" :position="position"></home-section>
        <img v-show="position.scrollTop + 8 >= windowHeight" @mouseenter="mouseScroll(1)" @mouseleave="mouseFree()" class="arrow" id="right-arrow" src="../assets/img/fleches_droite.png">
    </div>

</template>

<script>

    import NavBar from "./nav-bar";
    import HomeSection from "./home-section";

    import axios from 'axios';

    export default {
        props : ['position', 'windowHeight'],
            data() {
                return {
                    repeater: 0,
                    sections: [],
                }
            },
        components: {
            HomeSection,
            NavBar
        },
        name: "horizontal-scroll-wrapper",
        methods: {
            mouseScroll(val) {
                function scrollIt(val, scrollTop, scrollLeft) {
                    window.scrollTo(scrollLeft + val*10, scrollTop);
                }

                this.repeater = setInterval(() => {
                    scrollIt(val, this.position.scrollTop, this.position.scrollLeft);
                }, 10);
            },
            mouseFree() {
                clearInterval(this.repeater);
            }
        },
        mounted () {
            axios
                .get('http://localhost:3031/article/accueil/news')
                .then(response => {(this.sections.push({name: "News", content: response.data, type: "article", link: 'http://localhost:8010/result.html?section=news'}))});
            axios
                .get('http://localhost:3031/article/accueil/reportage')
                .then(response => {(this.sections.push({name: "Reportages", content: response.data, type: "article", link: 'http://localhost:8010/result.html?section=reportage'}))});
            axios
                .get('http://localhost:3031/article/accueil/dossier')
                .then(response => {(this.sections.push({name: "Dossiers", content: response.data, type: "article", link: 'http://localhost:8010/result.html?section=dossier'}))});
            axios
                .get('http://localhost:3031/article/accueil/maison')
                .then(response => {(this.sections.push({name: "Maison", content: response.data, type: "article", link: 'http://localhost:8010/result.html?section=maison'}))});
            axios
                .get('http://localhost:3031/brand/accueil')
                .then(response => {(this.sections.push({name: "Marques", content: response.data, type: "brand", link: 'http://localhost:8010/result.html?section=brand'}))});
            axios
                .get('http://localhost:3031/shop/accueil')
                .then(response => {(this.sections.push({name: "Boutiques", content: response.data, type: "shop", link: 'http://localhost:8010/result.html?section=boutique'}))});
        }
    }
</script>

<style scoped>
    #horizontal-scroll-wrapper {
        max-height: 100%;
        width: auto;
        padding-left: 80px;
    }

    div {
      display: inline-flex;
    }

    .arrow{
        width: 5%;
        position: fixed;
        top: 45%;
        z-index: 1000;
    }

    #left-arrow{
        left: 0;
    }

    #left-arrow:hover{
        left: -10px;
    }


    #right-arrow{
        right: 0;
    }

    #right-arrow:hover{
        right: -10px;
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }

    .fade-enter, .fade-leave-to {
        opacity: 0;
    }

</style>
