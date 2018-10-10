<template>
    <div id="app">
        <div class="focus-brand" ref="focusDiv">
            <gallery :images="imagesGallery" :index="index" @close="index = null"></gallery>
            <nav-bar></nav-bar>
            <div class="image-container image" :ref="image" v-for="(image, imageIndex) in images" :key="imageIndex" @click="index = imageIndex" :style="positions[image]">
                <b-img :src="getImgUrl(image)" fluid alt="image article" :style="positions[image]" @mouseenter="displayImg(image)" @mouseleave="hideImg(image)"/>
            </div>
            <div class="text-container">
                <h1>{{name}}</h1>
                <h2><a :href="website">{{website}}</a></h2>

                <p v-for="paragraph in content" :key="paragraph.substr(0, 20) + paragraph.length">{{paragraph}}</p>

                <div class="informations-section">
                    <div class="link-section">
                        <p style="font-size: 1.2em">Où nous trouver ?</p>
                        <p>{{location1}} <br> {{location2}}</p>
                        <a :href="website">{{website}}</a>
                    </div>
                </div>

                <div class="add-button">
                    <b-button :variant="'link'">Partager</b-button>
                </div>
            </div>

        </div>
        <div style="background-color: white">
            <cat-section :attribute="brand"></cat-section>
            <cat-section :attribute="products"></cat-section>
            <cat-section :attribute="articles"></cat-section>
        </div>
    </div>
</template>

<script>

    import 'bootstrap/dist/css/bootstrap.css'
    import 'bootstrap-vue/dist/bootstrap-vue.css'

    import axios from 'axios';

    import 'vue-awesome/icons/heart'
    import Icon from 'vue-awesome/components/Icon'

    import CatSection from 'components/cat-section'

    import NavBar from "components/nav-bar"

    import VueGallery from "vue-gallery"

    const server_url = "https://panier-app.herokuapp.com";
    //const server_url = "http://localhost:3031";

    export default {
        name: "app",
        data() {
            return {
                name: "Nom de la boutique",
                website: "www.site.com",
                content: [],
                location1: "",
                location2: "",
                images: [],
                imagesGallery: [],
                positions: {},
                brand: {
                    title: "Retrouvez ces marques",
                    display: "short",
                    font: "raleway",
                    content: [{name: "Boutique 1", image: "20.jpg", id: ''}]
                },
                products: {
                    title: "Produits liés",
                    display: "short",
                    font: "raleway",
                    content: [{name: 'Pot blanc', image: '11.jpeg', price:'30', id: '3'}, {name: 'Assiette rose', image: '25.jpg', price:'35', id: '4'}, {name: 'Petite peluche souris', image: '32.jpg', price:'25', id: '5'}, {name: 'Baignoire Design', image: '43.jpg', price:'450', id: '6'}, {name: 'Bougie de jardin', image: '49.jpg', price: '20', id: '7'}, {name: 'Chaise design', image: '8.jpg', price:'50', id: '2'}]
                },
                articles: {
                    title: "Articles liés",
                    display: "short",
                    font: "raleway",
                    content: [{name: "Titre article 1", image: "5.jpg", id: '10'}, {name: "Titre article 2", image: "6.jpg", id: '11'}]
                },
                index: null
            }

        },
        components: {
            NavBar,
            CatSection,
            Icon,
            gallery: VueGallery,
        },
        methods: {
            getImgUrl(pic) {

                if (pic !== "") {
                    return require('assets/img/' + pic);
                }
                return pic;
            },
            displayImg(image) {
                this.$refs[image][0].style.zIndex = 2;
                this.$refs[image][0].children[0].style.boxShadow = '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)';
            },
            hideImg(image) {
                this.$refs[image][0].style.zIndex = 1;
                this.$refs[image][0].children[0].style.boxShadow = '0 4px 8px 0 rgba(0, 0, 0, 0.2)';
            }
        },
        mounted() {
            const id = this.$route.query.id;

            axios
                .get(server_url + '/shop/' + id)
                .then(response => {
                    this.name = response.data[0].nom;
                    this.website = response.data[0].site;
                    if (response.data[0].complement !== null) {
                        this.location1 = response.data[0].numero + " " + response.data[0].complement + " " + response.data[0].rue;
                        this.location2 = response.data[0].ville + " " + response.data[0].pays
                    } else {
                        this.location1 = response.data[0].numero + " " + response.data[0].rue;
                        this.location2 = response.data[0].ville + " " + response.data[0].pays
                    }
                    let tmp = 0;
                    for (let i = 0; i < response.data[0].description.length - 4; i ++) {

                        if (response.data[0].description.substr(i, 4) === "\r\n\r\n") {
                            this.content.push(response.data[0].description.substring(tmp, i));
                            tmp = i + 4;
                        }
                    }
                    this.content.push(response.data[0].description.substring(tmp, response.data[0].description.length));
                });
            axios
                .get(server_url + '/shop/image/' + id)
                .then(response => {
                    const pos = [{
                        top: '30vh',
                        left: '10vw',
                    }, {
                        top: '10vh',
                        left: '55vw',
                    }];
                    for (let i = 0; i < Math.min(2, response.data.length); i ++) {
                        this.images.push(response.data[i]["url"]);
                        this.imagesGallery.push(this.getImgUrl(response.data[i]["url"]));
                        this.positions[response.data[i]["url"]] = pos[i];
                        this.positions[response.data[i]["url"]]["height"] = this.$refs.focusDiv.getBoundingClientRect().height + "px";
                    }
                });
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
    }

    .text-container {

        background-color: white;
        position: relative;
        left: 26vw;
        width: 40vw;
        padding: 20px;
        text-align: justify;
        text-indent: 30px;
        font-family: 'Libre Baskerville', serif;
        z-index: 1;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }

    .text-container h1, .text-container h2{
        text-align: center;
        text-indent: 0;
    }
    .text-container h1 {
        font-family: 'Raleway', sans-serif;
        font-size: 2em;
        font-weight: bolder;
        margin-top: 150px;
        margin-bottom: 0;
    }
    .text-container h2 {
        font-size: 1em;
        margin-bottom: 50px;
    }

    .text-container a {
        color: black;
        text-decoration: underline;
    }

    .add-button {
        margin-top: 150px;
        font-family: 'Raleway', sans-serif;
        font-weight: bold;
        text-align: center;
        text-indent: 0;
        width: fit-content;
        margin-left: auto;
        margin-right: auto;
    }

    .add-button button {
        padding: 0;
    }

    .add-button svg {
        margin-left: 5px;
    }

    .tag-section {
        width: fit-content;
        margin-left: auto;
        margin-right: auto;
        text-indent: 0;
        padding-top: 50px;
        font-family: 'Raleway', sans-serif;
        font-weight: bold;
    }

    .tag-section .tag-badge {
        margin-left: 5px;
        margin-right: 5px;
    }

    .focus-brand .image-container {
        position: absolute;
        top: 0 !important;
        z-index: 1;
    }

    .focus-brand .image-container img {
        width: 30vw;
        position: sticky;
        height: auto !important;
        z-index: 2;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    }

    .informations-section {
        text-indent: 0;
        margin-left: 30px;
        margin-top: 100px;
    }

    .link-section {
        margin-top: 40px;
    }

    .link-section a{
        display: block;
    }

    .blueimp-gallery {
        background: rgba(0,0,0,.5);
    }

</style>
