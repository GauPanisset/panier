<template>
    <div class="cat-section">
        <div class="title" :style="font[attribute.font]">{{attribute.title}}</div>
        <b-container class="bv-example-row">
            <b-row align-h="start" v-if="attribute.title != 'Produits' && attribute.display == 'short'">
                <b-col class="result-container" cols="2" v-for="index in displayLength" :key="attribute.content[index].name">
                    <b-card href="#" :title="attribute.content[index].name" :img-src="getImgUrl(attribute.content[index].image)" :img-alt="attribute.content[index].name"></b-card>
                </b-col>
                <b-col class="result-plus" sm="1" md="1" lg="2">
                    <b-button v-if="attribute.content.length >= 5" :variant="'outline-secondary'" class="plus-button">
                        <icon name="plus"></icon>
                    </b-button>
                </b-col>
            </b-row>

            <b-row align-h="start" v-if="attribute.title != 'Produits' && attribute.display == 'large'">
                <b-col class="result-container" cols="2" v-for="item in attribute.content" :key="item.name">
                    <b-card href="#" :title="item.name" :img-src="getImgUrl(item.image)" :img-alt="item.name"></b-card>
                </b-col>
            </b-row>

            <b-row align-h="start" v-if="attribute.title == 'Produits'">
                <b-col class="result-container" cols="2" v-for="product in attribute.content" :key="product.name">
                    <b-card href="#" :title="product.name" :img-src="getImgUrl(product.image)" :img-alt="product.name">
                        <p class="card-text">
                            Prix constaté {{product.price}} €
                        </p>
                    </b-card>
                </b-col>
            </b-row>

        </b-container>
    </div>
</template>

<script>
    import 'vue-awesome/icons/plus'
    import Icon from 'vue-awesome/components/Icon'

    export default {
        name: "cat-section",
        data() {
            const dl = [];
            for(let i = 0; i < Math.min(this.attribute.content.length, 4); i++) {
                dl.push(i);
            }
            return {
                displayLength: dl,
                font: {
                    salome: {'font-family': 'salomeregular'},
                    raleway: {'font-family': 'Raleway'}
                }
            }
        },
        components: {
            Icon,
        },
        props: ['attribute'],
        methods: {
            getImgUrl(pic) {

                if (pic !== "") {
                    return require('../assets/img/' + pic);
                }
                return pic;
            },
        }
    }
</script>

<style scoped lang="scss">

    @import '../assets/css/custom-bootstrap.scss';
    @import '../../node_modules/bootstrap/scss/bootstrap.scss';

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
        color: rgb(233, 138, 120);
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
