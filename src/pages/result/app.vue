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

    import axios from 'axios';

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
                sections: [],
            }
        },
        methods: {
        },
        mounted() {
            let request = "";
            if (this.$route.query.request !== "" && this.$route.query.request !== undefined) {
                request = this.$route.query.request.replace(' ', '&');
                console.log(request);
            } else {
                request = "";
            }
            if (this.$route.query.section !== "" && this.$route.query.section !== undefined) {
                if (this.$route.query.section !== "brand" && this.$route.query.section !== "shop") {
                    axios
                        .get('http://localhost:3031/article/section/' + this.$route.query.section)
                        .then(response => {
                            let title = '';
                            switch (this.$route.query.section) {
                                case 'news':
                                    title = "News";
                                    break;
                                case 'maison':
                                    title = "Maison";
                                    break;
                                case 'reportage':
                                    title = "Reportages";
                                    break;
                                case 'dossier':
                                    title = "Dossiers";
                                    break;
                            }
                            this.sections.push({
                                    title: title,
                                    display: "short",
                                    font: "salome",
                                    content: response.data,
                                    type: "article"
                                }
                            )});
                } else {
                    axios
                        .get('http://localhost:3031/' + this.$route.query.section + '/index/all')
                        .then(response => {
                            let title = '';
                            switch (this.$route.query.section) {
                                case 'brand':
                                    title = "Marques";
                                    break;
                                case 'shop':
                                    title = "Boutiques";
                                    break;
                            }
                            this.sections.push({
                                    title: title,
                                    display: "short",
                                    font: "salome",
                                    content: response.data,
                                    type: this.$route.query.section
                                }
                            )});
                }
            }

            axios
                .get('http://localhost:3031/product/request/' + request)
                .then(response => {
                    if (response.data.hits !== undefined) {
                        let itemContent = [];
                        response.data.hits.hits.forEach((item) => {
                            let tmp = {
                                name: item._source.nom,
                                image: '',
                                price: item._source.prix,
                                id: item._source.id,
                            };
                            axios
                                .get('http://localhost:3031/product/image/' + tmp.id)
                                .then(response => {
                                    tmp.image = response.data[0].url
                                });
                            itemContent.push(tmp);
                        });
                        this.sections.push({
                            title: "Produits",
                            display: "short",
                            font: "salome",
                            content: itemContent,
                            type: "product"
                        });
                    }
                });

            axios
                .get('http://localhost:3031/article/request/' + request)
                .then(response => {
                    if (response.data.hits !== undefined) {
                        console.log(response);
                        let itemContent= [];
                        response.data.hits.hits.forEach((item) => {
                            let tmp = {
                                name: item._source.titre,
                                image: '',
                                id: item._source.id,
                                subtitle: item._source.sous_titre,
                                text: item._source.texte
                            };
                            axios
                                .get('http://localhost:3031/article/image/' + tmp.id)
                                .then(response => {
                                    tmp.image = response.data[0].url
                                });
                            itemContent.push(tmp);
                        });
                        this.sections.push({
                            title: "Articles",
                            display: "short",
                            font: "salome",
                            content: itemContent,
                            type: "article"
                        });
                    }
                });
        }
    }
</script>

<style scoped>
    @import url('https://fonts.googleapis.com/css?family=Raleway');

    #app {
        font-family: 'Raleway', sans-serif;
    }


</style>
