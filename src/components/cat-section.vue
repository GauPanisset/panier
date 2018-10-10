<template>
    <!--
    Section d'affichage des catégories. Une catégorie est composée d'un titre <div class="title"> et d'un contenu <b-container>.
    Cette section présente deux modes d'affichage :
        - 'short': les items sont sur une seule ligne. Le dernier item de la ligne est remplacé par un bouton permettant de passer en mode 'large'.
        - 'large': tous les items sont présentés.
    Les sections présentent les items différemment en fonction de leur catégorie :
        - 'product': 4 items/ligne ('short') et 5 items/ligne ('large').
        - 'article': 2 items/ligne ('short' et 'large') avec apperçu du texte.
        - 'brand' || 'shop' : 4 items/ligne ('short') et 5 items/ligne ('large').
    -->

    <div class="cat-section" v-if="displayLength.length > 0">
        <div class="title" :style="font[attribute.font]">{{attribute.title}}</div>          <!-- Titre de la section -->
        <b-container class="bv-example-row" v-if="display === 'short'">                     <!-- Contenu de la section en mode 'short' -->

            <b-row align-h="start">
                <b-col class="result-container" :cols="attribute.content[index].type === 'article' ? 4 : 2" v-for="index in displayLength" :key="attribute.content[index].name">
                    <a :href="getLinkUrl(attribute.content[index].type, attribute.content[index].id)">
                        <b-card :title="attribute.content[index].name" :img-src="getImgUrl(attribute.content[index].image)" :img-alt="attribute.content[index].name">
                            <p v-if="attribute.content[index].type === 'product'" class="card-text">
                                Prix constaté {{attribute.content[index].price}} €
                            </p>
                        </b-card>
                    </a>
                    <p v-if="attribute.content[index].type === 'article'" class="card-text-article">
                        <strong>{{attribute.content[index].subtitle}}</strong>
                        <br>
                        {{getText(attribute.content[index].text)}}
                        <br>
                        <a class="readMore" :href="getLinkUrl(attribute.content[index].type, attribute.content[index].id)">Lire la suite</a>
                    </p>
                </b-col>
                <b-col class="result-plus" sm="1" md="1" lg="2">
                    <b-button v-if="attribute.content.length >= 5" :variant="'outline-secondary'" class="plus-button" @click="changeDisplay">
                        <icon name="plus"></icon>
                    </b-button>
                </b-col>
            </b-row>

        </b-container>
        <b-container class="bv-example-row" v-if="display === 'large'">                     <!-- Contenu de la section en mode 'large' -->

            <b-row align-h="start">
                <b-col class="result-container" :cols="item.type === 'article' ? 4 : 2" v-for="item in attribute.content" :key="item.name">
                    <a :href="getLinkUrl(item.type, item.id)">
                        <b-card :title="item.name" :img-src="getImgUrl(item.image)" :img-alt="item.name">
                            <p v-if="item.type === 'product'" class="card-text">
                                Prix constaté {{item.price}} €
                            </p>
                        </b-card>
                    </a>
                    <p v-if="item.type === 'article'" class="card-text-article">
                        <strong>{{item.subtitle}}</strong>
                        <br>
                        {{getText(item.text)}}
                        <br>
                        <a class="readMore" :href="getLinkUrl(item.type, item.id)">Lire la suite</a>
                    </p>
                </b-col>
            </b-row>

        </b-container>
    </div>
</template>

<script>
    import 'vue-awesome/icons/plus'
    import Icon from 'vue-awesome/components/Icon'

    const domain_url = "https://panier-vue.herokuapp.com";
    //const domain_url = "http://localhost:8010";

    export default {
        name: "cat-section",
        data() {
            const dl = [];
            let score = 0;                                  //Score permettant de calculer le nombre d'éléments à afficher. Utile pour différencier l'affichage d'un article qui est plus large que pour les autres éléments.
            let index = 0;
            while (score < 4 && index < this.attribute.content.length) {
                score += this.attribute.content[0].type === 'article' ? 2 : 1;
                dl.push(index);
                index++;
            }
            return {
                displayLength: dl,                          //Array avec les indices des items à afficher.
                font: {                                             //Font disponible
                    salome: {'font-family': 'salomeregular'},
                    raleway: {'font-family': 'Raleway'}
                },
                display: this.attribute.display,            //Mode d'affichage.
            }
        },
        components: {
            Icon,
        },
        props: ['attribute'],                               //[{title, display, font, type, content: {id, name, price, image} || {id, image, name, text, subtitle} || {id, image, name}}, ...]
        methods: {                                          //                                          -> product                  -> article                          -> shop || brand
            changeDisplay() {                               //Méthode de changement de mode de display.
                this.display = "large";
                this.$emit('display', this.display);
            },
            getImgUrl(pic) {                                //Méthode pour afficher les images à partir de l'url.

                if (pic !== "") {
                    return require('../assets/img/' + pic);
                }
                return pic;
            },
            getLinkUrl(type, id) {                          //Méthode pour créer les liens des images.
                return domain_url + "/focus/" + type + ".html?id=" + id;
            },
            getText(text) {                                 //Méthode pour créer l'apperçu du texte.
                let res = text.substr(0, 150);
                if (res[-1] !== ".") {
                    res = res.concat("...")
                }
                return res;
            }
        },
    }
</script>

<style scoped lang="scss">

    @import '../assets/css/custom-bootstrap.scss';
    @import '../../node_modules/bootstrap/scss/bootstrap.scss';

    .cat-section a {
        color: black;
    }

    .cat-section .container {
        max-width: none;
    }

    .cat-section {
        padding: 100px 5vw 0 15vw;
    }

    .title {
        font-size: 3em;
        border-bottom: 1px solid rgba(0, 0, 0, 0.5);
    }

    .bv-example-row {
        padding-top: 20px;

    }

    .result-container {
        padding: 0;
        margin-right: 20px;
        width: fit-content;
        max-width: none;
        display: flex;
    }

    .result-plus {
        padding: 0;
        margin: auto;
        width: fit-content;
        max-width: none;
    }

    .plus-button {
        margin: auto;
        width: fit-content;
        border-radius: 50%;
    }

    .plus-button svg {
        position:relative;
        top: 7px;
        width: 7vw;
        height: 7vw;
    }

    .card {
        width: 14vw;
        border: 0;
    }

    .card img {
        object-fit: cover;
        height: 14vw;
        width: 14vw;
        border-radius: 0;
    }

    .card-body {
        padding: 15px 5px 30px 5px;
    }

    .card-body h4 {
        width: fit-content;
        margin: auto;
        font-size: 1em;
    }

    .card-text {
        width: fit-content;
        margin: 0 auto 0 auto;
        color: $secondColor;
    }


    .card-text-article {
        text-indent: 15px;
        padding: 0 10px 0 10px;
        text-align: justify;
        font-size: 1em;
    }

    .card-text-article strong {
        font-size: 1.2em;
        font-weight: bold;
    }

    .readMore {
        color: black;
        text-decoration: underline;
        margin-left: 20px;
    }

    @font-face {
        font-family: 'salomeregular';
        src: url('../assets/font/salome-webfont.eot');
        src: url('../assets/font/salome-webfont.eot?#iefix') format('embedded-opentype'),
        url('../assets/font/salome-webfont.woff2') format('woff2'),
        url('../assets/font/salome-webfont.woff') format('woff'),
        url('../assets/font/salome-webfont.ttf') format('truetype'),
        url('../assets/font/salome-webfont.svg#salomeregular') format('svg');
        font-weight: normal;
        font-style: normal;
    }

</style>
