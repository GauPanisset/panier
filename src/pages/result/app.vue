<template>
    <div id="app">
        <nav-bar></nav-bar>
        <filter-aside></filter-aside>
        <cat-section v-for="section in sections" :attribute="section" :key="section.title"></cat-section>
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
                sections: [
                    {
                        title: "Articles",
                        display: "large",
                        font: "salome",
                        content: [{name: "Titre article 1", image: "5.jpg", id: '10'}, {name: "Titre article beaucoup plus long", image: "44.jpg", id: '3'}, {name: "Titre article 2", image: "6.jpg", id: '11'}, {name: "Titre article 3", image: "9.jpg", id: '14'}, {name: "Titre article 4", image: "23.jpg", id: '2'}, {name: "Titre article 6", image: "19.png", id: '1'}, {name: "Titre article 7", image: "2.jpg", id: '7'}]
                    },
                    {
                        title: "Boutiques",
                        display: "short",
                        font: "salome",
                        content: [{name: "Nom boutique 1", image: "20.jpg", id: ''}, {name: "Nom boutique 2", image: "34.jpg", id: ''}, {name: "Nom boutique 3", image: "38.jpg", id: ''}, {name: "Nom boutique 4", image: "46.jpg", id: ''}, {name: "Nom boutique 5", image: "20.jpg", id: ''}]
                    },
                    {
                        title: "Marques",
                        display: "short",
                        font: "salome",
                        content: [{name: "Marque 1", image: "50.png", id: '1'}, {name: "Marque 2", image: "58.jpg", id: '4'}]
                    },
                    {
                        title: 'Produits',
                        display: "large",
                        font: "salome",
                        content: [{name: 'Pot blanc', image: '11.jpeg', price:'30', id: '3'}, {name: 'Assiette rose', image: '25.jpg', price:'35', id: '4'}, {name: 'Petite peluche souris', image: '32.jpg', price:'25', id: '5'}, {name: 'Baignoire Design', image: '43.jpg', price:'450', id: '6'}, {name: 'Bougie de jardin', image: '49.jpg', price: '20', id: '7'}, {name: 'Chaise design', image: '8.jpg', price:'50', id: '2'}]
                    }

                ],
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
