<template>
    <div id="app">
        <div class="focus-collection">
            <nav-bar></nav-bar>
            <cat-section v-for="section in sections" :attribute="section" :key="section.title" v-on:display="displayType[section.type] = $event"></cat-section>

        </div>
    </div>
</template>

<script>

    import 'bootstrap/dist/css/bootstrap.css'
    import 'bootstrap-vue/dist/bootstrap-vue.css'

    import axios from 'axios';

    import CatSection from 'components/cat-section'

    import NavBar from "components/nav-bar"

    const server_url = "https://panier-app.herokuapp.com";
    //const server_url = "http://localhost:3031";

    export default {
        name: "app",
        data() {
            return {
                sections: []
            }
        },
        components: {
            NavBar,
            CatSection,
        },
        computed: {
        },
        methods: {
            getImgUrl(pic) {

                if (pic !== "") {
                    return require('assets/img/' + pic);
                }
                return pic;
            },
        },
        mounted() {

            if (this.$route.query.brand !== undefined) {
                axios
                    .get(server_url + '/product/collection/' + this.$route.query.brand)
                    .then(response => {
                        let itemContent = {};
                        console.log(response.data);
                        response.data.forEach(item => {
                            let name = item.collection;
                            if (!Object.keys(itemContent).includes(name)) {
                                itemContent[name] = [];
                            }
                            itemContent[name].push({
                                name: item.nom,
                                image: item.image,
                                id: item.id,
                                price: item.prix,
                                type: 'product',
                            })
                        });
                        for (let prop in itemContent) {
                            this.sections.push({
                                title: prop,
                                display: "short",
                                font: "salome",
                                content: itemContent[prop],
                            });
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
                console.log(this.sections);

            } else {
                axios
                    .get(server_url + '/user/collection/' + sessionStorage.getItem("id"))
                    .then(response => {
                        let itemContent = {};
                        response.data.forEach(item => {
                            let name = item.nom;
                            if (!Object.keys(itemContent).includes(name)) {
                                itemContent[name] = [];
                            }
                            if (item.valeur3 === 'product') {
                                itemContent[name].push({
                                    name: item.valeur1,
                                    image: item.image,
                                    id: item.id,
                                    price: item.valeur2,
                                    type: 'product',
                                })
                            } else {
                                itemContent[name].push({
                                    name: item.valeur1,
                                    image: item.image,
                                    id: item.id,
                                    subtitle: item.valeur2,
                                    text: item.valeur3,
                                    type: 'article',
                                })
                            }
                        });
                        for (let prop in itemContent) {
                            this.sections.push({
                                title: prop,
                                display: "short",
                                font: "salome",
                                content: itemContent[prop],
                            });
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
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


</style>
