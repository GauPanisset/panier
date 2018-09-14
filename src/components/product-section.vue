<template>
    <div class="product-section">

        <div class="card-container">
            <a :href="domain_url + '/result.html?request=' + item.categorie" v-for="item in categories" :key="item.categorie">
                <b-card overlay
                        :img-src="getImgUrl(item.image)"
                        :img-alt="item.image"
                        :title="item.friendlyName">
                </b-card>
            </a>

        </div>
        <transition name="fade">
            <h1 v-if="position.scrollTop + 8 >= windowHeight" ref="sectionTitle"><a :href="'#'">Catégories</a></h1>
        </transition>
    </div>
</template>

<script>

    import axios from "axios";

    const domain_url = "https://panier-vue.herokuapp.com";
    //const domain_url = "http://localhost:8010";

    const server_url = "https://panier-app.herokuapp.com";
    //const server_url = "http://localhost:3031";

    export default {
        name: "product-section",
        props: ['position'],
        data() {
            return {
                categories: [],
                windowHeight: window.innerHeight,
                domain_url: domain_url,
            }
        },
        methods: {                                              //attribute donne les informations à afficher : {id, type, image, title, content}
            getImgUrl(pic) {                                    //Méthode pour afficher les images à partir de l'url.

                if (pic !== "") {
                    return require('../assets/img/'+pic);
                }
                return pic;
            },
        },
        mounted() {
            const friendlyNames = {
                meuble: "Meuble",
                table: "Art de la table",
                textile: "Textile",
                objet: "Objets déco",
                enfant: "Déco enfant",
                jardin: "Jardin",
                lampe: "Lumière",
                cuisine: "Cuisine",
                senteur: "Senteurs",
                bain: "Salle de bain",
            };
            axios
                .get(server_url + "/product/accueil/random")
                .then(response => {
                    response.data.forEach(categorie => {
                        this.categories.push({
                            friendlyName: friendlyNames[categorie.categorie],
                            categorie: categorie.categorie,
                            image: categorie.image,
                        })
                    })
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }
</script>

<style scoped lang="scss">

    .card-container {
        padding: 110px 0 200px 0;
        width: 98vw;
        display: flex;
        flex-wrap: wrap;
    }

    .card {
        transition: width 0.5s ease, height 0.5s ease;
        width: 18vw;
        height: 18vw;
        overflow: hidden;
        margin: 0 5px 0 5px;
        z-index: 0;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    }

    .card:hover {
        width: 21vw;
        height: 21vw;
        box-shadow: 0 4px 50px 0 rgba(0, 0, 0, 0.5);
        z-index: 1;
    }

    .card-title {
        background-color: white;
        width: fit-content;
        padding: 2px 5px;
        text-shadow: 0 0 2px white;
        border-radius: 1.5em;
        font-size: 1.5em;
        box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.2);
    }

    .card img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    h1 {
        font-family: 'salomeregular';
        font-size: 8vh;
        height: fit-content;
        position: sticky;
        top: 85%;
        right: 65%;
        z-index: 10;
    }

    a {
        color: black;
        text-decoration: none;
    }

    h1>a:before {
        content: "";
        position: absolute;
        width: 100%;
        height: 2px;
        bottom: 0;
        left: 0;
        background-color: #000;
        visibility: hidden;
        -webkit-transform: scaleX(0);
        transform: scaleX(0);
        -webkit-transition: all 0.3s ease-in-out 0s;
        transition: all 0.3s ease-in-out 0s;
    }

    h1>a:hover:before {
        visibility: visible;
        -webkit-transform: scaleX(1);
        transform: scaleX(1);
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

    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to {
        opacity: 0;
    }

</style>
