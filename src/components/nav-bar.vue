<template>
    <!--
    Barre de navigation.
    -->

    <div class="nav-bar" @click="(event) => {changeUserConnect(event)}">
        <div id="grey-screen" v-if="userInput"></div>
        <div class="row">
            <div class="logo-nav col-12 col-md-2">
                <a :href="domain+'/home.html'"><img class="logo" src="../assets/img/logo.png"/></a>
            </div>
            <div class="middle-nav col-12 col-md-8">
                <div id="nav-search-bar">
                    <b-input-group>
                        <b-form-input v-model="request" class="bar" type="text" placeholder="Que cherchez vous ?" @keyup.enter.native="toResult"></b-form-input>
                        <b-input-group-append>
                            <b-btn id="bar-button" variant="outline-secondary" style="background-color: white" @click="toResult()">Rechercher</b-btn>
                        </b-input-group-append>
                    </b-input-group>
                </div>
                <b-navbar variant="primary" toggleable>
                    <b-navbar-toggle target="nav_dropdown_collapse"></b-navbar-toggle>
                    <b-collapse is-nav id="nav_dropdown_collapse" class="nav-bar-container">
                        <b-navbar-nav class="main-bar">
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
                </div>
            <div class="user-nav col-12 col-md-2">
                <button class="btn btn-primary dropdown-toggle" type="button" id="dropdown-user" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" @click.prevent="(event) => {changeUserConnect(event)}">
                    <img id="image-user" :src="getImgUrl(picture)"/>
                </button>
                <div v-if="!userConnected" class="dropdown-menu" aria-labelledby="dropdown-user">
                    <label class="first-item">Nom Utilisateur</label>
                    <b-form-input class="input-user" v-model="username"
                                  type="text"
                                  placeholder=""></b-form-input>
                    <label class="first-item">Mot de passe</label>
                    <b-form-input class="input-user" v-model="password"
                                  type="password"
                                  placeholder=""></b-form-input>
                    <a class="dropdown-item second-item" href="#">Mot de passe oublié ?</a>
                    <a class="dropdown-item first-item" @click="login()" style="text-decoration: underline">Connexion</a>
                    <a class="dropdown-item second-item" href="#">Créer un compte</a>
                </div>
                <div v-if="userConnected" class="dropdown-menu" aria-labelledby="dropdown-user">
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item first-item" :href="domain + '/focus/user.html'">{{username}}</a>
                    <a class="dropdown-item first-item" href="#">Mes collections <icon name="heart"></icon></a>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item first-item" @click="logout()" style="text-decoration: underline">Déconnexion</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import 'vue-awesome/icons/heart'
    import Icon from 'vue-awesome/components/Icon'
    import axios from 'axios';

    import swal from 'sweetalert2'

    //const server_url = "https://panier-app.herokuapp.com";
    const server_url = "http://localhost:3031";

    //const domain_url = "https://panier-vue.herokuapp.com";
    const domain_url = "http://localhost:8010";

    export default {
        components: {Icon},
        name: "nav-bar",
        data () {
            return {
                request: "",
                domain: domain_url,
                username: "",
                password: "",
                picture: "user.png",
                userInput: false,
                userConnected: false,
            }
        },
        methods: {
            getImgUrl(pic) {

                if (pic !== "") {
                    return require('assets/img/' + pic);
                }
                return pic;
            },
            toResult() {                        //Méthode de recherche.
                window.location.href = domain_url + "/result.html?request=" + this.request;
            },
            changeUserConnect(event) {
                if ((this.userInput && event.target.nodeName !== 'INPUT') || (!this.userInput && (event.target.id === "dropdown-user" || event.target.id === "image-user"))) {
                    this.userInput = document.getElementsByClassName("show").length === 0;
                }
            },
            login() {
                axios
                    .get(server_url + '/user/login', {
                        headers: {'Authorization': 'Basic ' + btoa(this.username + ':' + this.password)},
                    })
                    .then(response => {
                        this.password = "";

                        if (response.data.auth === true) {
                            this.userConnected = true;
                            sessionStorage.setItem("accessToken" ,response.data.token);
                            sessionStorage.setItem("auth" ,response.data.auth);
                            sessionStorage.setItem("id" ,response.data.id);
                            swal({
                                position: 'top',
                                type: 'success',
                                title: 'Vous êtes connecté !',
                                showConfirmButton: false,
                                animation: false,
                                customClass: 'animated fadeInDown',
                                timer: 1050
                            });

                            axios
                                .get(server_url + "/user/info/" + sessionStorage.getItem("id"))
                                .then(response => {
                                    this.username = response.data[0].pseudo;
                                    this.picture = response.data[0].image === null ? "user.png" : response.data[0].image;
                                })
                                .catch(err => {
                                    console.log(err);
                                });
                        }

                    })
                    .catch(err => {
                        console.log(err);
                        this.password = "";
                    });
            },
            logout() {
                axios
                    .get(server_url + '/user/logout')
                    .then(response => {

                        if (response.data.auth === false) {
                            this.userConnected = false;
                            sessionStorage.setItem("accessToken" ,response.data.token);
                            sessionStorage.setItem("auth" ,response.data.auth);

                            swal({
                                position: 'top',
                                type: 'success',
                                title: 'Vous êtes déconnecté !',
                                showConfirmButton: false,
                                animation: false,
                                customClass: 'animated fadeInDown',
                                timer: 1050
                            });

                            window.location.href = domain_url + "/home.html";
                        }

                    })
                    .catch(err => {
                        console.log(err);
                    });
            },

        },
        mounted() {
            let cloudflareScript = document.createElement('script');
            cloudflareScript.setAttribute('src', 'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.0/umd/popper.min.js');
            cloudflareScript.setAttribute('crossorigin', 'anonymous');
            document.body.appendChild(cloudflareScript);
            let bootstrapScript = document.createElement('script');
            bootstrapScript.setAttribute('src', 'https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js');
            bootstrapScript.setAttribute('crossorigin', 'anonymous');
            document.body.appendChild(bootstrapScript);
            let animateLink = document.createElement('link');
            animateLink.setAttribute('rel', "stylesheet");
            animateLink.setAttribute('href', "https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css");
            document.head.appendChild(animateLink);

            const token = sessionStorage.getItem("accessToken");
            if (token !== undefined && token !== 'null') {
                this.userConnected = true;
                axios
                    .get(server_url + "/user/info/" + sessionStorage.getItem("id"))
                    .then(response => {
                        this.username = response.data[0].pseudo;
                        this.picture = response.data[0].image === null ? "user.png" : response.data[0].image;
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }

        },
        created () {
        }
    }

</script>

<style scoped lang="scss">

    @import '../assets/css/custom-bootstrap.scss';
    @import '../../node_modules/bootstrap/scss/bootstrap.scss';

    #grey-screen {
        width: 100%;
        height: 100%;
        z-index: -1;
        background-color: rgba(0, 0, 0, 0.5);
        position: fixed;
        transition: opacity 2.3s ease;
    }

    .bar, #bar-button{
        border-radius: 0;
    }

    .nav-item {
        margin: auto;
    }

    .navbar {
        padding: 0 0 0 0;
    }

    .nav-bar {
        z-index: 100;
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: fit-content;
    }

    .logo-nav {
        text-align: center;
    }

    .middle-nav {
        height: fit-content;
        text-align: center;
    }

    .main-bar {
        width: 100%;
        max-width: 1000px;
        margin: auto;
    }

    .divider {
        margin: 7px 0 7px 0;
        border-left:1px solid rgba(0, 0, 0, 0.5);
    }

    .logo {
        max-width: 100%;
        max-height: 75px;
    }

    .row {
        width: 100vw;
        height: fit-content;
        margin: 0 0 0 0;
        z-index: 1;
        background-color: $firstColor;
    }

    .user-nav {
        text-align: center;
    }

    #dropdown-user {
        padding: 1px;
        height: 75px;
        width: 75px;
    }

    #image-user {
        max-width: 75px;
        max-height: 75px;
        border-radius: 75px;
    }

    .dropdown-menu {
        text-align: center;
        padding: 5px;
    }

    .input-user {
        border-radius: 0;
    }

    .first-item {
        margin: auto;
    }

    .second-item {
        color: $secondColor;
        font-size: 0.5em;
    }

    .dropdown-toggle::after {
        display:none;
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }

    .fade-enter, .fade-leave-to {
        opacity: 0;
    }


</style>
