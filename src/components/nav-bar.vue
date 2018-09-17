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
                <b-navbar id="my-navbar" variant="primary" toggleable>
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
                    <a class="dropdown-item second-item disabled" href="#">Mot de passe oublié ?</a>
                    <a class="dropdown-item first-item" @click="login()" style="text-decoration: underline">Connexion</a>
                    <a class="dropdown-item second-item" href="#" @click="showModal = true">Créer un compte</a>
                </div>
                <div v-if="userConnected" class="dropdown-menu" aria-labelledby="dropdown-user">
                    <div class="dropdown-divider" style="margin: 5px 0;"></div>
                    <a class="dropdown-item first-item" :href="domain + '/focus/user.html'">{{username}}</a>
                    <a class="dropdown-item first-item" :href="domain + '/focus/collection.html'">Mes collections <icon name="heart"></icon></a>
                    <div class="dropdown-divider" style="margin: 5px 0;"></div>
                    <a class="dropdown-item first-item" @click="logout()" style="text-decoration: underline">Déconnexion</a>
                </div>
            </div>
        </div>
        <my-modal id="account-creation" v-if="showModal" @close="closeModal()" @ok="confirm()" :backOffice="false" :width="'300px'">
            <h4 slot="header">Créer un compte</h4>

            <div slot="body" role="tablist">
                <b-card no-body class="mb-1">
                    <b-card-header header-tag="header" class="p-1" role="tab">
                        <b-btn block href="#" v-b-toggle.accordion1 variant="info">Pseudo</b-btn>
                    </b-card-header>
                    <b-collapse id="accordion1" visible accordion="my-accordion" role="tabpanel">
                        <b-card-body>
                            <b-form-group
                                    class="fieldset"
                                    description="Choisissez un pseudo"
                                    label="Entrez un pseudo"
                                    label-for="input0"
                                    :invalid-feedback="invalidFeedbackPseudo"
                                    :valid-feedback="validFeedbackPseudo"
                                    :state="stateEmail"
                            >
                                <b-form-input id="input0" :state="statePseudo" v-model.trim="newPseudo" type="text"></b-form-input>
                            </b-form-group>
                        </b-card-body>
                    </b-collapse>
                </b-card>
                <b-card no-body class="mb-1">
                    <b-card-header header-tag="header" class="p-1" role="tab">
                        <b-btn block href="#" v-b-toggle.accordion2 variant="info">Adresse mail</b-btn>
                    </b-card-header>
                    <b-collapse id="accordion2" accordion="my-accordion" role="tabpanel">
                        <b-card-body>
                            <b-form-group
                                    class="fieldset"
                                    description="Choisissez votre adresse mail."
                                    label="Entrez une adresse mail"
                                    label-for="input1"
                                    :invalid-feedback="invalidFeedbackEmail"
                                    :valid-feedback="validFeedbackEmail"
                                    :state="stateEmail"
                            >
                                <b-form-input id="input1" :state="stateEmail" v-model.trim="newMail" type="email"></b-form-input>
                            </b-form-group>
                        </b-card-body>
                    </b-collapse>
                </b-card>
                <b-card no-body class="mb-1">
                    <b-card-header header-tag="header" class="p-1" role="tab">
                        <b-btn block href="#" v-b-toggle.accordion3 variant="info">Mot de passe</b-btn>
                    </b-card-header>
                    <b-collapse id="accordion3" accordion="my-accordion" role="tabpanel">
                        <b-card-body>
                            <b-form-group
                                    class="fieldset"
                                    description="Votre mot de passe doit contenir au moins 8 caractères."
                                    label="Entrez un mot de passe"
                                    label-for="input2"
                                    :invalid-feedback="invalidFeedbackMdp"
                                    :valid-feedback="validFeedbackMdp"
                                    :state="stateMdp"
                            >
                                <b-form-input id="input2" :state="stateMdp" v-model.trim="newMdp.one" type="password"></b-form-input>
                            </b-form-group>
                            <b-form-group
                                    class="fieldset"
                                    description="Votre mot de passe doit être identique."
                                    label="Réécrivez votre mot de passe"
                                    label-for="input21"
                                    :invalid-feedback="invalidFeedbackMdp2"
                                    :valid-feedback="validFeedbackMdp2"
                                    :state="stateMdp2"
                            >
                                <b-form-input id="input21" :state="stateMdp2" v-model.trim="newMdp.two" type="password"></b-form-input>
                            </b-form-group>
                        </b-card-body>
                    </b-collapse>
                </b-card>
                <b-card no-body class="mb-1">
                    <b-card-header header-tag="header" class="p-1" role="tab">
                        <b-btn disabled block href="#" v-b-toggle.accordion4 variant="info">Je suis une marque</b-btn>
                    </b-card-header>
                    <b-collapse id="accordion4" accordion="my-accordion" role="tabpanel">
                        <b-card-body>
                            Selection marque
                        </b-card-body>
                    </b-collapse>
                </b-card>
                <transition name="fade">
                    <p v-if="confirmed" class="confirm-text">Vos modifications ont été enregistrées</p>
                </transition>

            </div>
        </my-modal>
    </div>

</template>

<script>

    import 'vue-awesome/icons/heart'
    import Icon from 'vue-awesome/components/Icon'
    import axios from 'axios';
    import MyModal from 'components/myModal'

    import swal from 'sweetalert2'

    const server_url = "https://panier-app.herokuapp.com";
    //const server_url = "http://localhost:3031";

    const domain_url = "https://panier-vue.herokuapp.com";
    //const domain_url = "http://localhost:8010";

    export default {
        components: {Icon, MyModal},
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
                showModal: false,
                statePseudo: false,
                newPseudo: false,
                stateEmail: false,
                newMail: "",
                stateMdp: false,
                stateMdp2: false,
                newMdp: {
                    one: "",
                    two: "",
                },
                confirmed: false,
            }
        },
        computed: {
            invalidFeedbackPseudo () {
                if (this.newPseudo.length < 4) {
                    this.statePseudo = false;
                    return 'Pseudo trop court'
                } else {
                    this.statePseudo = true;
                    return ''
                }
            },
            validFeedbackPseudo () {
                return this.statePseudo ? 'Pseudo valide' : '';
            },
            invalidFeedbackEmail () {
                if (this.newMail.indexOf('@') < 0 || this.newMail.indexOf('.') < this.newMail.indexOf('@')) {
                    this.stateEmail = false;
                    return 'Adresse non valide'
                } else {
                    this.stateEmail = true;
                    return ''
                }
            },
            validFeedbackEmail () {
                return this.stateEmail ? 'Adresse valide' : '';
            },
            invalidFeedbackMdp () {
                if (this.newMdp.one.length < 8) {
                    this.stateMdp = false;
                    return ''
                } else {
                    this.stateMdp = true;
                    return ''
                }
            },
            validFeedbackMdp () {
            },
            invalidFeedbackMdp2 () {
                if (this.newMdp.two.length < 8 || !this.stateMdp) {
                    this.stateMdp2 = false;
                    return 'Mot de passe trop court';
                } else if (this.newMdp.one !== this.newMdp.two) {
                    this.stateMdp2 = false;
                    return 'Les mots de passe doivent être identiques';
                } else {
                    this.stateMdp2 = true;
                    return '';
                }
            },
            validFeedbackMdp2 () {
                return this.stateEmail ? 'Mot de passe valide' : '';
            },
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
                                .get(server_url + "/user/index/" + sessionStorage.getItem("id"))
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
            closeModal() {
                this.showModal = false;
                this.confirmed = false;
            },
            confirm() {
                if (this.statePseudo && this.stateEmail && this.stateMdp) {
                    axios
                        .post(server_url + '/user/create', {
                            pseudo: this.newPseudo,
                            mail: this.newMail,
                            mdp: this.newMdp.one,
                            marque: 0,
                        })
                        .then(response => {
                            console.log("Account created");
                            swal({
                                position: 'top',
                                type: 'success',
                                title: 'Vous pouvez vous connecter !',
                                showConfirmButton: false,
                                animation: false,
                                customClass: 'animated fadeInDown',
                                timer: 1500
                            });
                        })
                        .catch(err => {
                            console.log(err);
                        })
                }
                if (this.stateEmail) {
                    console.log(sessionStorage.getItem("id"));
                    axios
                        .patch(server_url + '/user/mail', {
                            "value": this.newMail,
                            "id_utilisateur": sessionStorage.getItem("id"),
                        }, {
                            headers: {
                                "x-access-token": sessionStorage.getItem("accessToken"),
                            },
                        })
                        .then(response => {
                            this.mail = this.newMail;
                            this.confirmed = true;
                        })
                        .catch(err => {
                            console.log(err);
                        });
                } if (this.stateMdp) {
                    axios
                        .patch(server_url + '/user/mdp', {
                            "value": this.newMdp.one,
                            "id_utilisateur": sessionStorage.getItem("id"),
                        }, {
                            headers: {
                                "x-access-token": sessionStorage.getItem("accessToken"),
                            }
                        })
                        .then(response => {
                            this.confirmed = true;
                        })
                        .catch(err => {
                            console.log(err);
                        });
                } if (!this.stateMdp && !this.stateEmail) {
                    console.log("Invalid values");
                }
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
                    .get(server_url + "/user/index/" + sessionStorage.getItem("id"))
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

    #nav-search-bar {
        margin-top: 15px;
    }

    .nav-item {
        margin: auto;
    }

    #my-navbar {
        background-color: transparent !important;
        background-image: linear-gradient(90deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8) 10%, rgba(0, 0, 0, 0.8) 90%, rgba(0, 0, 0, 0)) !important;//rgba(0, 0, 0, 0.1) !important;
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

    .nav-link {
        color: white !important;
    }

    .logo-nav {
        text-align: center;
        padding-top: 7px;
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
        border-left:1px solid white !important;;
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
        background-image: url("../assets/img/64.jpg");
        background-position: center;
        background-repeat: no-repeat;
        background-size: 100%;
    }

    .user-nav {
        padding-top: 7px;
        text-align: center;
    }

    #dropdown-user {
        padding: 1px;
        height: 75px;
        width: 78px;
        background-color: transparent;
        border-color: transparent;
    }

    #image-user {
        height: 100%;
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

    #account-creation {
        position: fixed;
    }

</style>
