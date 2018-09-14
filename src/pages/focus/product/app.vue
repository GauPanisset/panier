<template>
    <div id="app">
        <div class="focus-product">
            <gallery :images="imagesGallery" :index="index" @close="index = null"></gallery>
            <div id="background"></div>
            <nav-bar></nav-bar>
            <div class="image-container image" :ref="image" v-for="(image, imageIndex) in images" :key="imageIndex" @click="index = imageIndex" :style="positions[image]">
                <b-img :src="getImgUrl(image)" fluid alt="image article" :style="positions[image]" @mouseenter="displayImg(image)" @mouseleave="hideImg(image)"/>
            </div>

            <div class="product-container">

                <div class="text-header">
                    <h1>{{product}}</h1>
                    <p>Prix constaté {{price}}€</p>
                </div>
                <div class="text-container">
                    <div class="add-button">
                        <b-button :variant="'link'" @click="showAddModal = true">Ajouter à ma Collection <icon name="heart"></icon></b-button><br>
                        <b-button v-if="inCollection" :variant="'link'" @click="showDeleteModal = true">Enlever de ma Collection <icon name="heart"></icon></b-button><br>
                        <my-modal v-if="showAddModal" @close="closeAddModal()" @ok="addToCollection()" :backOffice="false" :width="'20%'">
                            <h4 slot="header">Choisissez la collection du produit à ajouter</h4>
                            <div slot="body" role="tablist">
                                <b-form-group>
                                    <b-form-radio-group id="btnradios1"
                                                        buttons
                                                        stacked
                                                        v-model="collectionName"
                                                        :options="options"
                                                        name="addRadio" />
                                    <b-form-input v-model="collectionName"
                                                  type="text"
                                                  placeholder="Nouvelle collection ?"></b-form-input>
                                </b-form-group>
                            </div>
                        </my-modal>
                        <my-modal v-if="showDeleteModal" @close="closeDeleteModal()" @ok="removeFromCollection()" :backOffice="false" :width="'20%'">
                            <h4 slot="header">Choisissez la collection du produit à supprimer</h4>

                            <div slot="body" role="tablist">
                                <b-form-group>
                                    <b-form-radio-group id="btnradios2"
                                                        buttons
                                                        stacked
                                                        v-model="collectionName"
                                                        :options="optionsDelete"
                                                        name="deleteRadio" />
                                </b-form-group>
                            </div>
                        </my-modal>
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

    import VueGallery from "vue-gallery"

    import MyModal from "components/myModal"

    const server_url = "https://panier-app.herokuapp.com";
    //const server_url = "http://localhost:3031";

    export default {
        name: "app",
        data() {
            return {
                product: "Nom objet",
                price: "45",
                attributes: [],
                description: [],
                images: [],
                imagesGallery: [],
                positions: {},
                inCollection: false,
                products: {
                    title: "Produits similaires",
                    display: "short",
                    font: "raleway",
                    content: [{name: 'Pot blanc', image: '11.jpeg', price:'30', id: '3'}, {name: 'Assiette rose', image: '25.jpg', price:'35', id: '4'}, {name: 'Petite peluche souris', image: '32.jpg', price:'25', id: '5'}, {name: 'Baignoire Design', image: '43.jpg', price:'450', id: '6'}, {name: 'Bougie de jardin', image: '49.jpg', price: '20', id: '7'}, {name: 'Chaise design', image: '8.jpg', price:'50', id: '2'}],
                },
                articles: {
                    title: "Articles liés",
                    display: "short",
                    font: "raleway",
                    content: [{name: "Titre article 1", image: "5.jpg", id: '10'}, {name: "Titre article 2", image: "6.jpg", id: '11'}],
                },
                index: null,
                showAddModal: false,
                showDeleteModal: false,
                collectionName: '',
                options: [],
                optionsDelete: [],
            }

        },
        components: {
            NavBar,
            CatSection,
            Icon,
            gallery: VueGallery,
            MyModal,
        },
        methods: {
            closeAddModal() {
                this.showAddModal = false;
            },
            closeDeleteModal() {
                this.showDeleteModal = false;
            },
            addToCollection() {
                axios
                    .post(server_url + '/user/collection', {
                        item: 'produit',
                        id_item: this.$route.query.id,
                        id: sessionStorage.getItem('id'),
                        nom: this.collectionName,
                    }, {
                            headers: {
                                "x-access-token": sessionStorage.getItem("accessToken"),
                            },
                    })
                    .then(response => {
                        location.reload();
                        console.log('added to collection');
                    })
                    .catch(err => {
                        console.log(err);
                    })
            },
            removeFromCollection() {
                axios
                    .delete(server_url + '/user/collection/' + sessionStorage.getItem('id') + '/' + this.collectionName + '/?item=produit&id_item=' + this.$route.query.id,
                        { headers: {"x-access-token": sessionStorage.getItem("accessToken"),},})
                    .then(response => {
                        location.reload();
                        console.log('deleted from collection');
                    })
                    .catch(err => {
                        console.log(err);
                    })

            },
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
                .get(server_url + '/product/' + id)
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
                .get(server_url + '/product/image/' + id)
                .then(response => {
                    const pos = [{
                        top: '15vh',
                        left: '10vw',
                    }, {
                        top: '10vh',
                        left: '15vw',
                    }];
                    for (let i = 0; i < Math.min(2, response.data.length); i ++) {
                        this.images.push(response.data[i]["url"]);
                        this.imagesGallery.push(this.getImgUrl(response.data[i]["url"]));
                        this.positions[response.data[i]["url"]] = pos[i];
                    }
                });
            axios
                .get(server_url + '/user/collection/all/' + sessionStorage.getItem('id'))
                .then(response => {
                    response.data.forEach(item => {
                        this.options.push({
                            text: item.nom,
                            value: item.nom,
                        })
                    });
                })
                .catch(err => {
                    console.log(err);
                });
            axios
                .get(server_url + '/user/collection/check/' + sessionStorage.getItem('id') + '/?item=produit&id_item=' + this.$route.query.id)
                .then(response => {

                    if (response.data.length > 0) {
                        this.inCollection = true;
                        response.data.forEach(item => {
                            this.optionsDelete.push({
                                text: item.nom,
                                value: item.nom,
                            })
                        })
                    }
                })
                .catch(err => {
                    console.log(err);
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
        max-width: 30vw;
        max-height: 70vh;
        position: static;
        left: 0;
        z-index: 2;
    }

    .blueimp-gallery {
        background: rgba(0,0,0,.5);
    }

    #btnradios1, #btnradios2 {
        width:80%;
    }

    .form-control {
        text-align: center;
        width: 80%;

        margin: 20px auto auto auto;
    }


</style>
