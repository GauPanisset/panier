<template>
    <div class="nav-bar">
        <div class="logo">
            <a href="http://localhost:8010/home.html"><img src="../assets/img/logo.png" style="width: 100%; height: 100%"/></a>
        </div>
        <div id="nav-bar-middle">
            <div id="nav-search-bar">
                <b-input-group>
                    <b-form-input v-model="request" id="bar" type="text" placeholder="Que cherchez vous ?" @keyup.enter.native="toResult"></b-form-input>
                    <b-input-group-append>
                        <b-btn id="bar-button" variant="outline-secondary" style="background-color: white" @click="toResult()">Rechercher</b-btn>
                    </b-input-group-append>
                </b-input-group>
            </div>
            <b-navbar variant="primary" toggleable>
                <b-navbar-toggle target="nav_dropdown_collapse"></b-navbar-toggle>
                <b-collapse is-nav id="nav_dropdown_collapse" class="nav-bar-container">
                    <b-navbar-nav class="main-bar">
                        <b-nav-item href="http://localhost:8010/result.html?section=news">News</b-nav-item>
                        <b-nav-item href="http://localhost:8010/result.html?section=reportage">Reportages</b-nav-item>
                        <b-nav-item href="http://localhost:8010/result.html?section=dossier">Dossiers</b-nav-item>
                        <div class="divider"></div>
                        <b-nav-item href="http://localhost:8010/result.html?section=maison">Maison</b-nav-item>
                        <b-nav-item href="http://localhost:8010/result.html?section=brand">Marques</b-nav-item>
                        <b-nav-item href="http://localhost:8010/result.html?section=shop">Boutiques</b-nav-item>
                    </b-navbar-nav>
                </b-collapse>
            </b-navbar>
            </div>
        <div class="user-nav">
        <img src="../assets/img/user.png" style="width: 100%; height: 100%"/>
        </div>
    </div>
</template>

<script>

    export default {
        name: "nav-bar",
        data () {
            return {
                request: ""
            }
        },
        methods: {
            toResult() {
                window.location.href = "http://localhost:8010/result.html?request=" + this.request;
            }
        },
        created () {
        }
    }

</script>

<style scoped lang="scss">

    @import '../assets/css/custom-bootstrap.scss';
    @import '../../node_modules/bootstrap/scss/bootstrap.scss';

    .nav-bar {
        display: inline-flex;
        z-index: 100;
    }

    .navbar {
        padding: 0 0 0 0;
    }
    #bar, #bar-button{
        border-radius: 0;
    }

    .nav-item {
        margin: auto;
    }

    .nav-bar {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
    }

    #nav-bar-middle{
        width: 100%;
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
    .nav-bar-container {
        background-color: $firstColor;
    }


</style>
