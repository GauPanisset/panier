<template>
    <div class="cat-section" v-if="displayLength.length > 0">
        <div class="title" :style="font[attribute.font]">{{attribute.title}}</div>
        <b-container class="bv-example-row" v-if="display === 'short'">
            <b-row align-h="start" v-if="attribute.type === 'brand' || attribute.type === 'shop'">
                <b-col class="result-container" cols="2" v-for="index in displayLength" :key="attribute.content[index].name">
                    <a :href="getLinkUrl(attribute.type, attribute.content[index].id)">
                        <b-card :title="attribute.content[index].name" :img-src="getImgUrl(attribute.content[index].image)" :img-alt="attribute.content[index].name"></b-card>
                    </a>
                </b-col>
                <b-col class="result-plus" sm="1" md="1" lg="2">
                    <b-button v-if="attribute.content.length >= 5" :variant="'outline-secondary'" class="plus-button" @click="changeDisplay">
                        <icon name="plus"></icon>
                    </b-button>
                </b-col>
            </b-row>

            <b-row align-h="start" v-if="attribute.type === 'product'">
                <b-col class="result-container" cols="2" v-for="index in displayLength" :key="attribute.content[index].name">
                    <a :href="getLinkUrl(attribute.type, attribute.content[index].id)">
                        <b-card :title="attribute.content[index].name" :img-src="getImgUrl(attribute.content[index].image)" :img-alt="attribute.content[index].name">
                            <p class="card-text">
                                Prix constaté {{attribute.content[index].price}} €
                            </p>
                        </b-card>
                    </a>
                </b-col>
                <b-col class="result-plus" sm="1" md="1" lg="2">
                    <b-button v-if="attribute.content.length >= 5" :variant="'outline-secondary'" class="plus-button" @click="changeDisplay">
                        <icon name="plus"></icon>
                    </b-button>
                </b-col>
            </b-row>

            <b-row align-h="start" v-if="attribute.type === 'article'">
                <b-col class="result-container-article" cols="5" v-for="index in [0, 1]" :key="attribute.content[index].name">
                    <a :href="getLinkUrl(attribute.type, attribute.content[index].id)">
                        <b-card :title="attribute.content[index].name" :img-src="getImgUrl(attribute.content[index].image)" :img-alt="attribute.content[index].name">
                        </b-card>
                    </a>
                    <p class="card-text-article">
                        <strong>{{attribute.content[index].subtitle}}</strong>
                        <br>
                        {{getText(attribute.content[index].text)}}
                        <br>
                        <a class="readMore" :href="getLinkUrl(attribute.type, attribute.content[index].id)">Lire la suite</a>
                    </p>
                </b-col>
                <b-col class="result-plus" sm="1" md="1" lg="2">
                    <b-button v-if="attribute.content.length >= 5" :variant="'outline-secondary'" class="plus-button" @click="changeDisplay">
                        <icon name="plus"></icon>
                    </b-button>
                </b-col>
            </b-row>

        </b-container>
        <b-container class="bv-example-row" v-if="display === 'large'">

            <b-row align-h="start" v-if="attribute.type === 'brand' || attribute.type === 'shop'">
                <b-col class="result-container" cols="2" v-for="item in attribute.content" :key="item.name">
                    <a :href="getLinkUrl(attribute.type, item.id)">
                        <b-card :title="item.name" :img-src="getImgUrl(item.image)" :img-alt="item.name"></b-card>
                    </a>
                </b-col>
            </b-row>

            <b-row align-h="start" v-if="attribute.type === 'product'">
                <b-col class="result-container" cols="2" v-for="product in attribute.content" :key="product.name">
                    <a :href="getLinkUrl(attribute.type, product.id)">
                        <b-card :title="product.name" :img-src="getImgUrl(product.image)" :img-alt="product.name">
                            <p class="card-text">
                                Prix constaté {{product.price}} €
                            </p>
                        </b-card>
                    </a>
                </b-col>
            </b-row>

            <b-row align-h="start" v-if="attribute.type === 'article'">
                <b-col class="result-container-article" cols="6" v-for="article in attribute.content" :key="article.name">
                    <a :href="getLinkUrl(attribute.type, article.id)">
                        <b-card :title="article.name" :img-src="getImgUrl(article.image)" :img-alt="article.name">
                        </b-card>
                    </a>
                    <p class="card-text-article">
                        <strong>{{article.subtitle}}</strong>
                        <br>
                        {{getText(article.text)}}
                        <br>
                        <a class="readMore" :href="getLinkUrl(attribute.type, article.id)">Lire la suite</a>
                    </p>
                </b-col>
            </b-row>

        </b-container>
    </div>
</template>

<script>
    import 'vue-awesome/icons/plus'
    import Icon from 'vue-awesome/components/Icon'

    const domain_url = "http://localhost:5000";
    //const domain_url = "http://localhost:8010";

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
                },
                display: this.attribute.display,
            }
        },
        components: {
            Icon,
        },
        props: ['attribute'],
        methods: {
            changeDisplay() {
                this.display = "large";
                this.$emit('display', this.display);
            },
            getImgUrl(pic) {

                if (pic !== "") {
                    return require('../assets/img/' + pic);
                }
                return pic;
            },
            getLinkUrl(type, id) {
                return domain_url + "/focus/" + type + ".html?id=" + id;
            },
            getText(text) {
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

    .result-container-article {
        display: flex;
        max-width: none;
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
