<template>
    <div id="app">
        <div class="focus-user">
            <nav-bar></nav-bar>
            <div id="background">
                <div class="row profil-container mt-5 mt-md-4">
                    <div class="image-container d-none col-12 d-md-block col-md-6">
                        <img class="profil-picture" :src="getImgUrl(picture)"/>
                    </div>
                    <div class="text-container col-12 col-md-6">
                        <p id="pseudo">{{pseudo}}</p>
                        <p id="mail">{{mail}}</p>
                    </div>
                    <div class="col-12" style="margin-top: 50px">
                        <b-button class="profil-button" variant="outline-light" id="show-modal" @click="showModalModif = true">Modifier mes informations</b-button>
                        <my-modal v-if="showModalModif" @close="closeModalModif()" @ok="confirmModif()" :backOffice="false" :width="'300px'">
                            <h4 slot="header">Modifier mes informations</h4>

                            <div slot="body" role="tablist">
                                <b-card no-body class="mb-1">
                                    <b-card-header header-tag="header" class="p-1" role="tab">
                                        <b-btn block href="#" v-b-toggle.accordion1 variant="info">Adresse mail</b-btn>
                                    </b-card-header>
                                    <b-collapse id="accordion1" accordion="my-accordion" role="tabpanel">
                                        <b-card-body>
                                            <b-form-group
                                                    class="fieldset"
                                                    description="Changez votre adresse mail."
                                                    label="Entrez une nouvelle adresse mail"
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
                                        <b-btn block href="#" v-b-toggle.accordion2 variant="info">Mot de passe</b-btn>
                                    </b-card-header>
                                    <b-collapse id="accordion2" accordion="my-accordion" role="tabpanel">
                                        <b-card-body>
                                            <b-form-group
                                                    class="fieldset"
                                                    description="Votre mot de passe doit contenir au moins 8 caractères."
                                                    label="Entrez un nouveau mot de passe"
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
                                        <b-btn disabled block href="#" v-b-toggle.accordion3 variant="info">Je suis une marque</b-btn>
                                    </b-card-header>
                                    <b-collapse id="accordion3" accordion="my-accordion" role="tabpanel">
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
                    <div class="col-12">
                        <b-button class="profil-button" variant="outline-light" id="show-list" @click="goTo('/focus/collection.html')">Voir mes collections <icon name="heart"></icon></b-button>
                    </div>
                    <div v-if="back || admin" class="col-12">
                        <b-button class="profil-button" variant="outline-light" id="show-list" @click="showModalBack = true">Back Office</b-button>
                        <my-modal v-if="showModalBack" @close="closeModalBack()" :backOffice="true" :width="'98%'">
                            <h4 slot="header">Back Office</h4>

                            <div slot="body" role="tablist">
                                <my-tab :isAdmin="admin"></my-tab>
                            </div>
                        </my-modal>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import 'bootstrap/dist/css/bootstrap.css'
    import 'bootstrap-vue/dist/bootstrap-vue.css'

    import axios from 'axios';

    import 'vue-awesome/icons/heart'
    import Icon from 'vue-awesome/components/Icon'

    import NavBar from "components/nav-bar"

    import MyTab from "components/myTab"

    import MyModal from "../../../components/myModal";

    const domain_url = "https://panier-vue.herokuapp.com";
    //const domain_url = "http://localhost:8010";

    const server_url = "https://panier-app.herokuapp.com";
    //const server_url = "http://localhost:3031";

    export default {
        name: "app",
        data() {
            return {
                pseudo: "Pseudo",
                mail: "example@mail.com",
                picture: "user.png",
                admin: false,
                back: false,
                showModalModif: false,
                stateEmail: false,
                newMail: "",
                stateMdp: false,
                stateMdp2: false,
                newMdp: {
                    one: "",
                    two: "",
                },
                confirmed: false,
                showModalBack: false,
            }
        },
        components: {
            MyModal,
            NavBar,
            Icon,
            MyTab,
        },
        computed: {
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
            goTo(url) {
                window.location.href = domain_url + url;
            },
            getImgUrl(pic) {

                if (pic !== "") {
                    return require('assets/img/' + pic);
                }
                return pic;
            },
            closeModalBack() {
                this.showModalBack = false;
            },
            closeModalModif() {
                this.showModalModif = false;
                this.confirmed = false;
            },
            confirmModif() {
                if (this.stateEmail) {
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
            }
        },
        mounted() {
            axios
                .get(server_url + '/user/index/' + sessionStorage.getItem("id"))
                .then(response => {
                    this.pseudo = response.data[0].pseudo;
                    this.mail = response.data[0].mail;
                    this.picture = response.data[0].image === null ? "user.png" : response.data[0].image;
                    this.admin = response.data[0].admin == 1;
                })
                .catch(err => {
                    this.userConnected = false;
                    console.log(err);
                });
            if (this.back !== true) {
                axios
                    .get(server_url + '/user/authorization/' + sessionStorage.getItem("id"))
                    .then(response => {
                        this.back = response.data.length > 1;
                    })
            }

        }
    }
</script>

<style scoped lang="scss">

    @import '../../../assets/css/custom-bootstrap.scss';
    @import '../../../../node_modules/bootstrap/scss/bootstrap.scss';

    @import url('https://fonts.googleapis.com/css?family=Libre+Baskerville');
    @import url('https://fonts.googleapis.com/css?family=Raleway:400');

    #app {
        font-family: 'Raleway', sans-serif;
    }

    #background {
        position: fixed;
        left: 25vw;
        z-index: -100;
        background-color: $thirdColor;
        height: 100vh;
        width: 50vw;
        display: flex;
        min-width: 280px;
    }

    .mt-5 {
        margin-top: 250px;
    }

    .mt-md-0 {
        margin-top: 150px;
    }

    .profil-container {
        width: 50vw;
        height: 20vw;
        margin-left: 0;
    }

    .image-container {
        width: fit-content;
        vertical-align: center;
    }

    .profil-picture {
        border-radius: 20vw;
        width: 20vw;
        height: 20vw;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    }

    .text-container {
        color: white;
        margin: auto;
    }

    #pseudo {
        font-size: 200%;
    }

    #mail {
        font-size: 80%;
    }

    .col-12 {
        text-align: center;
    }

    .profil-button {
        margin-bottom: 50px;
        width: 250px;
    }

    .fieldset {
        margin-top: 10px;
        font-size: 13px;
    }

    #app .nav-item a {
        background-color: $firstColor !important;
    }



</style>
