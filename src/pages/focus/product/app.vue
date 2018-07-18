<template>
    <div id="app">
        <div class="focus-product">

            <div id="background"></div>
            <nav-bar></nav-bar>
            <div class="image-container" :ref="image" v-for="image in images" :key="image" :style="positions[image]">
                <b-img :src="getImgUrl(image)" fluid alt="image article" :style="positions[image]" @mouseenter="displayImg(image)" @mouseleave="hideImg(image)"/>
            </div>

            <div class="product-container">

                <div class="text-header">
                    <h1>{{product}}</h1>
                    <p>Prix constaté {{price}}€</p>
                </div>
                <div class="text-container">
                    <div class="add-button">
                        <b-button :variant="'link'">Ajouter à ma Collection <icon name="heart"></icon></b-button><br>
                        <b-button :variant="'link'">Partager</b-button>
                    </div>

                    <ul class="nav nav-tabs" id="myTab" role="tablist">
                        <li class="nav-item">
                            <a class="nav-link active" id="home-tab" data-toggle="tab" href="#description-tab" role="tab" aria-controls="home" aria-selected="true">Description</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" id="profile-tab" data-toggle="tab" href="#fiche-tab" role="tab" aria-controls="profile" aria-selected="false">Fiche technique</a>
                        </li>
                    </ul>
                    <div class="tab-content" id="myTabContent">
                        <div class="tab-pane fade show active" id="description-tab" role="tabpanel" aria-labelledby="home-tab">
                            <p class="text-description" v-for="paragraph in description" :key="paragraph.substr(0, 20) + paragraph.length">{{paragraph}}</p>
                        </div>
                        <div class="tab-pane fade" id="fiche-tab" role="tabpanel" aria-labelledby="profile-tab">
                            <div class="attributes-container">
                                <table>
                                    <tr v-for="item in attributes" :key="item[0]">
                                        <th class="attribute">{{item[0]}}</th>
                                        <th class="value">{{item[1]}}</th>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <div style="background-color: white">
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

    export default {
        name: "app",
        data() {
            return {
                product: "Nom objet",
                price: "45",
                attributes: []/*[["Matière", "Céramique"], ["Dimention", "Diamètre 25cm"], ["Couleur", "Sable"], ["Marque", "Brand"], ["N° article", "2398237"], ["Style", "Antique"]]*/,
                description: [] /*['Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nisl sem, cursus eget convallis id, suscipit vehicula dui. Vestibulum sagittis eros eget rhoncus blandit. In hac habitasse platea dictumst. Duis gravida quam nec lorem venenatis, vitae congue leo tempus. Donec dictum elementum est at molestie. Cras semper libero id diam egestas dignissim. Curabitur laoreet molestie est id bibendum.',
                    'Proin malesuada tempor nunc eget pulvinar. Quisque nec iaculis ipsum. Aliquam leo tellus, efficitur id lectus ut, vehicula luctus nunc. Donec est justo, facilisis vitae ullamcorper dapibus, scelerisque vel neque. Pellentesque quis accumsan sapien. Vivamus efficitur sapien vel purus ultrices tincidunt. Donec ex tellus, semper non sagittis eget, suscipit sit amet odio. Donec tempus accumsan mattis. Quisque maximus magna lectus, ac hendrerit orci egestas eget. Curabitur lacus eros, semper in lectus ac, gravida dictum dolor.']*/,
                images: [] /*['1.jpg', '7.jpg']*/,
                positions: {}/*{'1.jpg': {
                        top: '30vh',
                        left: '10vw'
                    },
                    '7.jpg': {
                        top: '10vh',
                        left: '15vw'
                    }}*/,
                products: {
                    title: "Produits similaires",
                    display: "short",
                    font: "raleway",
                    content: [{name: 'Pot blanc', image: '11.jpeg', price:'30', id: '3'}, {name: 'Assiette rose', image: '25.jpg', price:'35', id: '4'}, {name: 'Petite peluche souris', image: '32.jpg', price:'25', id: '5'}, {name: 'Baignoire Design', image: '43.jpg', price:'450', id: '6'}, {name: 'Bougie de jardin', image: '49.jpg', price: '20', id: '7'}, {name: 'Chaise design', image: '8.jpg', price:'50', id: '2'}]
                },
                articles: {
                    title: "Articles liés",
                    display: "short",
                    font: "raleway",
                    content: [{name: "Titre article 1", image: "5.jpg", id: '10'}, {name: "Titre article 2", image: "6.jpg", id: '11'}]
                }
            }

        },
        components: {
            NavBar,
            CatSection,
            Icon,
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
                this.$refs[image][0].children[0].style.boxShadow = 'none';
            }
        },
        mounted() {
            const id = this.$route.query.id;
            const attri = [["Matière", "matiere"], ["Dimention", "dimension"], ["Couleur", "couleur"], ["Marque", "marque"], ["N° article", "numero"], ["Style", "style"]];

            axios
                .get('http://localhost:3031/product/' + id)
                .then(response => {
                    this.product = response.data[0].nom;
                    this.price = response.data[0].prix;
                    let tmp = 0;
                    for(let i = 0; i < attri.length; i++){
                        if (response.data[0][attri[i][1]] !== undefined && response.data[0][attri[i][1]] !== 0 && response.data[0][attri[i][1]] !== null) {
                            this.attributes.push([attri[i][0], response.data[0][attri[i][1]]]);
                        }
                    }
                    for (let i = 0; i < response.data[0].description.length - 4; i ++) {

                        if (response.data[0].description.substr(i, 4) === "\r\n\r\n") {
                            this.description.push(response.data[0].description.substring(tmp, i));
                            tmp = i + 4;
                        }
                    }
                    this.description.push(response.data[0].description.substring(tmp, response.data[0].description.length));
                });
            axios
                .get('http://localhost:3031/product/image/' + id)
                .then(response => {
                    const pos = [{
                        top: '30vh',
                        left: '10vw',
                    }, {
                        top: '10vh',
                        left: '15vw',
                    }];
                    for (let i = 0; i < Math.min(2, response.data.length); i ++) {
                        this.images.push(response.data[i]["url"]);
                        this.positions[response.data[i]["url"]] = pos[i];
                    }
                });
        }
    }
</script>

<style scoped lang="scss">
    @import '../../../assets/css/custom-bootstrap.scss';
    @import '../../../../node_modules/bootstrap/scss/bootstrap.scss';
    @import url('https://fonts.googleapis.com/css?family=Libre+Baskerville');
    @import url('https://fonts.googleapis.com/css?family=Raleway');

    #app {
        font-family: 'Raleway', sans-serif;
    }

    #background {
        position: fixed;
        left: 25vw;
        z-index: -100;
        background-color: $thirdColor;
        height: 85vh;
        width: 50vw;
    }

    .focus-product {
        height: 85vh;
    }

    .product-container {
        position: relative;
        top: 20vh;
        left: 45vw;
        width: 40vw;
        padding-left: 20px;
        z-index: 1;
    }

    .presentation-tabs {
        margin-top: 40px;
    }

    .text-description {
        padding: 10px;
        text-align: justify;
        text-indent: 30px;
    }

    .text-header {
        background-color: white;
        height: fit-content;
        margin-bottom: 50px;
    }

    .text-header h1 {
        width: fit-content;
        margin: 10px auto 20px auto;
    }
    .text-header p {
        width: fit-content;
        margin: 10px auto 20px auto;
        color: $secondColor;
    }

    .text-container {
        background-color: white;
        height: fit-content;
        padding: 30px 0 30px 0;
    }

    #myTab a {
        color: black;
    }

    .attributes-container {
        margin: 10px auto 0 auto;
        width: fit-content;
    }

    .attributes-container tr {
        border-bottom: 1px solid rgba(0, 0, 0, 0.2);
        height: 40px;
    }

    .attributes-container .attribute {
        text-align: end;
        padding-right: 10px;
        width: 200px;
    }

    .attributes-container .value {
        font-weight: lighter;
        padding-left: 10px;
        width: 200px;
    }

    .add-button {
        font-weight: bold;
        text-align: center;
        text-indent: 0;
        width: fit-content;
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 20px;
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

    .focus-product .image-container {
        position: absolute;
        height: fit-content;
        z-index: 1;
    }

    .focus-product .image-container img {
        width: 30vw;
        position: static;
        left: 0;
        z-index: 2;
    }


</style>
