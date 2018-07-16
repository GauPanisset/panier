<template>
    <div id="app">
        <div class="focus-article">

            <div id="background"></div>
            <nav-bar></nav-bar>
            <div class="image-container" :ref="image" v-for="image in images" :key="image" :style="positions[image]">
                <b-img :src="getImgUrl(image)" fluid alt="image article" :style="positions[image]" @mouseenter="displayImg(image)" @mouseleave="hideImg(image)"/>
            </div>
            <div class="text-container">
                <h1>{{title}}</h1>
                <h2>{{author}}, {{date}}, {{link}}</h2>

                <p v-for="paragraph in content" :key="paragraph.substr(0, 20) + paragraph.length">{{paragraph}}</p>

                <div class="add-button">
                    <b-button :variant="'link'">Ajouter à ma Collection <icon name="heart"></icon></b-button><br>
                    <b-button :variant="'link'">Partager</b-button>
                </div>

                <div class="tag-section">
                    <b-badge class="tag-badge" v-for="tag in tags" pill variant="primary" :key="tag">{{tag}}</b-badge>
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

    import 'vue-awesome/icons/heart'
    import Icon from 'vue-awesome/components/Icon'

    import CatSection from 'components/cat-section'

    import NavBar from "components/nav-bar"

    export default {
        name: "app",
        data() {
            return {
                title: "Titre article",
                author: "Auteur",
                date: "date",
                link: "lien",
                content: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nisl sem, cursus eget convallis id, suscipit vehicula dui. Vestibulum sagittis eros eget rhoncus blandit. In hac habitasse platea dictumst. Duis gravida quam nec lorem venenatis, vitae congue leo tempus. Donec dictum elementum est at molestie. Cras semper libero id diam egestas dignissim. Curabitur laoreet molestie est id bibendum.',
                    'Proin malesuada tempor nunc eget pulvinar. Quisque nec iaculis ipsum. Aliquam leo tellus, efficitur id lectus ut, vehicula luctus nunc. Donec est justo, facilisis vitae ullamcorper dapibus, scelerisque vel neque. Pellentesque quis accumsan sapien. Vivamus efficitur sapien vel purus ultrices tincidunt. Donec ex tellus, semper non sagittis eget, suscipit sit amet odio. Donec tempus accumsan mattis. Quisque maximus magna lectus, ac hendrerit orci egestas eget. Curabitur lacus eros, semper in lectus ac, gravida dictum dolor.',
                    'Praesent ullamcorper feugiat tortor nec tristique. In gravida felis id tellus interdum, malesuada finibus mi facilisis. Etiam gravida tortor pulvinar neque maximus convallis. Sed in lacus lectus. Morbi congue pellentesque lobortis. Sed mattis aliquam sapien at elementum. Etiam volutpat diam at risus varius maximus. Quisque cursus, mauris sed laoreet posuere, nisi magna fermentum ex, non venenatis urna risus sit amet purus.',
                    'Sed pharetra ligula euismod consectetur mollis. Praesent risus purus, pulvinar et pellentesque in, ultrices et risus. Sed vel aliquet eros, vitae ullamcorper velit. Fusce dolor nibh, fermentum sed nulla eu, eleifend maximus felis. Aliquam pellentesque tincidunt lectus. Vestibulum sodales nisl tortor, ut venenatis lorem semper eu. Curabitur fermentum, felis porta interdum aliquam, arcu purus cursus est, at sagittis nibh quam ut sapien. Phasellus blandit, mi sed dignissim vehicula, massa mauris elementum tortor, eu facilisis augue sapien non orci. Vestibulum sit amet arcu et ligula lobortis euismod et eget felis. Suspendisse eu ex vitae purus maximus consectetur id vitae libero. Pellentesque vel interdum lectus, sed lobortis ante. In magna lectus, euismod id mauris eu, viverra lobortis ligula. Duis consequat purus pretium auctor auctor.',
                    'In viverra nisl nec sapien malesuada, facilisis feugiat dolor facilisis. Aliquam vitae lectus non massa varius ullamcorper. Etiam sed justo nec orci pharetra pharetra nec et lectus. Fusce rhoncus risus ut cursus condimentum. Ut non libero tempor, aliquet libero at, venenatis risus. Sed dictum auctor eleifend. Cras ornare vel lacus in mattis. Sed scelerisque convallis leo eu fermentum. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.'],
                tags: ['tag1', 'tag2', 'tag3'],
                images: ['1.jpg', '7.jpg'],
                positions: {'1.jpg': {
                        top: '30vh',
                        left: '10vw'
                        },
                            '7.jpg': {
                        top: '10vh',
                        left: '55vw'
                        }},
                products: {
                    title: "Produits liés",
                    display: "short",
                    font: "raleway",
                    content: [{name: 'Produit 1', image: '16.jpeg', price:'45'}, {name: 'Produit 2', image: '16.jpeg', price:'45'}, {name: 'Produit 3', image: '16.jpeg', price:'45'}, {name: 'Produit 4', image: '16.jpeg', price:'45'}, {name: 'Produit 5', image: '16.jpeg', price:'45'}, {name: 'Produit 6', image: '16.jpeg', price:'45'}]
                },
                articles: {
                    title: "Articles similaires",
                    display: "short",
                    font: "raleway",
                    content: [{name: "Titre article 1", image: "5.jpg"}, {name: "Titre article 2", image: "6.jpg"}]
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

    .focus-article .image-container {
        position: absolute;
        height: 100%;
        top: 0;
        z-index: 1;
    }

    .focus-article .image-container img {
        width: 30vw;
        position: sticky;
        left: 0;
        z-index: 2;
    }



</style>
