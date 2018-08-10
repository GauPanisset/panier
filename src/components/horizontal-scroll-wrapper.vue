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

    const server_url = "https://panier-app.herokuapp.com";
    //const server_url = "http://localhost:3031";

    const domain_url = "https://panier-vue.herokuapp.com";
    //const domain_url = "http://localhost:8010";

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
                .get(server_url + '/article/accueil/news')
                .then(response => {(this.sections.push({name: "News", content: response.data, type: "article", link: domain_url + '/result.html?section=news'}))});
            axios
                .get(server_url + '/article/accueil/reportage')
                .then(response => {(this.sections.push({name: "Reportages", content: response.data, type: "article", link: domain_url + '/result.html?section=reportage'}))});
            axios
                .get(server_url + '/article/accueil/dossier')
                .then(response => {(this.sections.push({name: "Dossiers", content: response.data, type: "article", link: domain_url + '/result.html?section=dossier'}))});
            axios
                .get(server_url + '/article/accueil/maison')
                .then(response => {(this.sections.push({name: "Maison", content: response.data, type: "article", link: domain_url + '/result.html?section=maison'}))});
            axios
                .get(server_url + '/brand/accueil')
                .then(response => {(this.sections.push({name: "Marques", content: response.data, type: "brand", link: domain_url + '/result.html?section=brand'}))});
            axios
                .get(server_url + '/shop/accueil')
                .then(response => {(this.sections.push({name: "Boutiques", content: response.data, type: "shop", link: domain_url + '/result.html?section=boutique'}))});
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
