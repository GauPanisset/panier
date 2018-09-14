<template>
    <!--
    Section sur laquelle l'utilisateur arrive.
    Barre de recherche.
    -->
    <div id="search-bar">
        <div class="slogan">
            Toute l'actualité et toutes les collections du monde de la déco
        </div>
        <div class="dropdown-divider"></div>
        <div class="logo-container">
            <img src="../assets/img/logo.png">
        </div>
        <div id="search-input">
            <b-input-group>
                <b-form-input v-model="request" id="bar" type="text" placeholder="Que cherchez vous ?" @keyup.enter.native="toResult"></b-form-input>
                <b-input-group-append>
                    <b-btn variant="outline-secondary" @click="toResult()" >Rechercher</b-btn>
                </b-input-group-append>
            </b-input-group>
        </div>
    <b-navbar class="trans-nav-bar" variant="primary" style="background-color: transparent !important; padding: 20px 100px 20px 100px;" toggleable>
        <b-navbar-toggle target="nav_dropdown_collapse"></b-navbar-toggle>
        <b-collapse is-nav id="nav_dropdown_collapse">
            <b-navbar-nav id="main-bar-search">
                <b-nav-item :href="domain+'/result.html?section=news'">News</b-nav-item>
                <b-nav-item :href="domain+'/result.html?section=reportage'">Reportages</b-nav-item>
                <b-nav-item :href="domain+'/result.html?section=dossier'">Dossiers</b-nav-item>
                <div class="divider"></div>
                <b-nav-item :href="domain+'/result.html?section=maison'">Maison</b-nav-item>
                <b-nav-item :href="domain+'/result.html?section=brand'">Marques</b-nav-item>
                <b-nav-item :href="domain+'/result.html?section=shop'">Boutiques</b-nav-item>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
    <img id="down-arrow" src="../assets/img/fleches_down.png" v-scroll-to="'#horizontal-scroll-wrapper'" v-if="2*position.scrollTop < windowHeight">
    </div>
</template>

<script>

    const domain_url = "https://panier-vue.herokuapp.com";
    //const domain_url = "http://localhost:8010";

    export default {
        name: "search-bar",
        data() {
            return {
                request: '',
                domain: domain_url,
            }
        },
        props : ['position', 'windowHeight'],
        methods: {
            toResult() {                                //Méthode de recherche
                window.location.href = domain_url + "/result.html?request=" + this.request;
            }
        },
    }
</script>

<style scoped lang="scss">
    @import '../assets/css/custom-bootstrap.scss';
    @import '../../node_modules/bootstrap/scss/bootstrap.scss';

    .slogan {
        padding: 50px 0 20px 0;
        color: white;
        font-size: 1.5rem;
    }

    .dropdown-divider {
        width: 20%;
        margin: auto;
    }

    .logo-container {
        padding-top: 13vh;
    }

    #bar, #bar-button{
        border-radius: 0;
    }

    .navbar-light .navbar-nav .nav-link {
        color: rgba(255, 255, 255, 0.8);
    }

    #search-bar {
        background-image: url("../assets/img/64.jpg");//linear-gradient($firstColor, white);
        background-repeat: no-repeat;
        background-size: 100%;
        min-height: 100vh;
        max-width: 100vw;
        text-align: center;
    }

    #search-input {
        padding-top: 10vh;
        width: 50%;
        margin-left: auto;
        margin-right: auto;
    }

    #down-arrow {
        animation: MoveUpDown 2s ease infinite;
        position: absolute;
        height: auto;
        width: auto;
        max-height: 50px;
        max-width: 50px;
        z-index: 1000;
    }

    @keyframes MoveUpDown {
        0%, 100% {
            bottom: 20px;
        }
        50% {
            bottom: 35px;
        }
    }


    .nav-item {
        //text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white;
    }

    #main-bar-search {
        margin: auto;
        color: white;
    }

    .divider {
        margin-top: 7px;
        margin-bottom: 7px;
        border-left:1px solid rgba(255, 255, 255, 0.5);
        padding: 0;
    }

</style>
