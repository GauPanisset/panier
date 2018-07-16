<template>
    <div id="app">
        <nav-bar></nav-bar>
        <filter-aside></filter-aside>
        <cat-section :attribute="section1"></cat-section>
        <cat-section :attribute="section2"></cat-section>
        <cat-section :attribute="section3"></cat-section>
        <cat-section :attribute="section4"></cat-section>
    </div>
</template>

<script>

    import NavBar from 'components/nav-bar'
    import FilterAside from 'components/filter-aside'
    import CatSection from 'components/cat-section'

    import 'bootstrap/dist/css/bootstrap.css'
    import 'bootstrap-vue/dist/bootstrap-vue.css'

    export default {
        name: "app",
        components: {
            NavBar,
            FilterAside,
            CatSection
        },
        data() {
            return {
                section1: {
                    title: "Articles",
                    display: "large",
                    font: "salome",
                    content: [{name: "Titre article 1", image: "5.jpg"}, {name: "Titre article beaucoup plus long", image: "44.jpg"}, {name: "Titre article 2", image: "6.jpg"}, {name: "Titre article 3", image: "9.jpg"}, {name: "Titre article 4", image: "23.jpg"}, {name: "Titre article 6", image: "19.png"}, {name: "Titre article 7", image: "2.jpg"}]
                },
                section2: {
                    title: "Boutiques",
                    display: "short",
                    font: "salome",
                    content: [{name: "Nom boutique 1", image: "20.jpg"}, {name: "Nom boutique 2", image: "34.jpg"}, {name: "Nom boutique 3", image: "38.jpg"}, {name: "Nom boutique 4", image: "46.jpg"}, {name: "Nom boutique 5", image: "20.jpg"}]
                },
                section3: {
                    title: "Marques",
                    display: "short",
                    font: "salome",
                    content: [{name: "Marque 1", image: "50.png"}, {name: "Marque 2", image: "58.jpg"}]
                },
                section4 : {
                    title: 'Produits',
                    display: "large",
                    font: "salome",
                    content: [{name: 'Produit 1', image: '16.jpeg', price:'45'}, {name: 'Produit 2', image: '16.jpeg', price:'45'}, {name: 'Produit 3', image: '16.jpeg', price:'45'}, {name: 'Produit 4', image: '16.jpeg', price:'45'}, {name: 'Produit 5', image: '16.jpeg', price:'45'}, {name: 'Produit 6', image: '16.jpeg', price:'45'}]
                }
            }
        }
    }
</script>

<style scoped>
    @import url('https://fonts.googleapis.com/css?family=Raleway');

    #app {
        font-family: 'Raleway', sans-serif;
    }


</style>
