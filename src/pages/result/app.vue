<template>
    <div id="app">
        <nav-bar></nav-bar>
        <filter-aside :filters="filters" v-on:selected="setSelection($event)" v-on:selectedSort="setSort($event)"></filter-aside>
        <p>{{displayType}}</p>
        <cat-section v-for="section in sections" :attribute="section" :key="section.title" v-on:display="displayType[section.type] = $event"></cat-section>
    </div>
</template>

<script>

    import NavBar from 'components/nav-bar'
    import FilterAside from 'components/filter-aside'
    import CatSection from 'components/cat-section'

    import axios from 'axios';

    import 'bootstrap/dist/css/bootstrap.css'
    import 'bootstrap-vue/dist/bootstrap-vue.css'

    const server_url = "https://panier-app.herokuapp.com";
    //const server_url = "http://localhost:3031";

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
                displayType: {
                    "product": "short",
                    "article": "short",
                    "brand": "short",
                    "shop": "short"
            },
                filters: "",
                request: "",
                section: "",
                reqParams: {
                    filter: "",
                    sort: "",
                },
            }
        },
        methods: {
            setSort(data) {
                console.log(data);
                if(data.length > 0) {
                    this.reqParams.sort = "order=";
                    data.forEach(item => {
                        this.reqParams.sort += item + '+';
                    });
                    this.reqParams.sort = this.reqParams.sort.slice(0, -1);
                } else {
                    this.reqParams.sort = "";
                }

                if (this.request !== "") {
                    this.displayResult();
                } else {
                    this.displaySection()
                }


            },
            setSelection(data) {
                let filters = "";

                for (let prop in data) {
                    if (data[prop] !== "") {
                        console.log("prop : " + data[prop]);
                        filters += prop.toString() + "=";
                        data[prop].forEach(item => {
                            filters += item.toString() + "+";
                        });
                        filters = filters.slice(0, -1);
                        filters += "&"
                    }
                }
                filters = filters.slice(0, -1);

                this.reqParams.filter = filters;

                if (this.request !== "") {
                    this.displayResult();
                } else {
                    this.displaySection()
                }
            },
            displaySection() {
                this.sections = [];
                const section = this.section;
                const filters = this.reqParams.filter;
                const sort = this.reqParams.sort;

                if (this.$route.query.section !== "brand" && this.$route.query.section !== "shop") {
                    axios
                        .get(server_url + '/article/section/' + section + '/?' + filters + sort)
                        .then(response => {
                            let title = '';
                            switch (section) {
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
                                    display: this.displayType.article,
                                    font: "salome",
                                    content: response.data,
                                    type: "article"
                                }
                            );
                        });
                } else {
                    axios
                        .get(server_url + '/' + this.$route.query.section + '/index/all' + '/?' + filters + sort)
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
                                    display: this.displayType[this.$route.query.section],
                                    font: "salome",
                                    content: response.data,
                                    type: this.$route.query.section
                                }
                            );
                        });
                }
            },
            displayResult() {
                this.sections = [];

                const request = this.request;
                const filters = this.reqParams.filter;
                const sort = this.reqParams.sort;
                axios
                    .get(server_url + '/product/request/' + request + '/?' + filters + sort)
                    .then(response => {
                        if (response.data[0].hits !== undefined) {
                            let itemContent = [];
                            response.data[0].hits.hits.forEach((item) => {
                                let tmp = {
                                    name: item._source.nom,
                                    image: '',
                                    price: item._source.prix,
                                    id: item._source.id,
                                };
                                axios
                                    .get(server_url + '/product/image/' + tmp.id)
                                    .then(response => {
                                        tmp.image = response.data[0].url
                                    });
                                itemContent.push(tmp);
                            });

                            this.sections.push({
                                title: "Produits",
                                display: this.displayType.product,
                                font: "salome",
                                content: itemContent,
                                type: "product"
                            });
                            if (filters === '') {
                                this.filters = response.data[1];
                            }
                        }
                    });

                axios
                    .get(server_url + '/article/request/' + request + '/?' + filters + sort)    //Pas encore de filtres pour les articles.
                    .then(response => {
                        if (response.data[0].hits !== undefined) {
                            let itemContent= [];
                            response.data[0].hits.hits.forEach((item) => {
                                let tmp = {
                                    name: item._source.titre,
                                    image: '',
                                    id: item._source.id,
                                    subtitle: item._source.sous_titre,
                                    text: item._source.texte,
                                };
                                axios
                                    .get(server_url + '/article/image/' + tmp.id)
                                    .then(response => {
                                        tmp.image = response.data[0].url
                                    });
                                itemContent.push(tmp);
                            });
                            this.sections.push({
                                title: "Articles",
                                display: this.displayType.article,
                                font: "salome",
                                content: itemContent,
                                type: "article"
                            });
                        }
                    });
            }

        },
        mounted() {
            if (this.$route.query.request !== "" && this.$route.query.request !== undefined) {
                this.request = this.$route.query.request.replace(' ', '&');
                this.displayResult();
            }
            if (this.$route.query.section !== "" && this.$route.query.section !== undefined) {
                this.section = this.$route.query.section;
                this.displaySection();
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
