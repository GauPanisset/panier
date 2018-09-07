<template>
    <div role="tablist">
        <div class="card">
            <div class="tabs row no-gutters">
                <div class="col-auto">
                    <ul role="tablist" id="tab_control" class="nav nav-tabs card-header h-100 flex-column border-bottom-0 rounded-0">
                        <li role="presentation" class="nav-item">
                            <a role="tab" href="#" id="tab_button_1" :aria-selected="selected1" aria-setsize="3" aria-posinset="1" aria-controls="tab_container" :class="{'active': selected1, 'nav-link': true}" @click="changeAttributes(0)">Produit</a>
                        </li>
                        <li role="presentation" class="nav-item">
                            <a role="tab" href="#" id="tab_button_2" :aria-selected="selected2" aria-setsize="3" aria-posinset="1" aria-controls="tab_container" :class="{'active': selected2, 'nav-link': true}" @click="changeAttributes(1)">Article</a>
                        </li>
                        <li role="presentation" class="nav-item">
                            <a role="tab" href="#" id="tab_button_3" :aria-selected="selected3" aria-setsize="3" aria-posinset="1" aria-controls="tab_container" :class="{'active': selected3, 'nav-link': true}" @click="changeAttributes(2)">Boutique</a>
                        </li>
                        <li role="presentation" class="nav-item">
                            <a role="tab" href="#" id="tab_button_4" :aria-selected="selected4" aria-setsize="3" aria-posinset="1" aria-controls="tab_container" :class="{'active': selected4, 'nav-link': true}" @click="changeAttributes(3)">Marque</a>
                        </li>
                        <li role="presentation" class="nav-item">
                            <a role="tab" href="#"  aria-setsize="3" aria-posinset="1" aria-controls="tab_container" class="nav-link disabled">  </a>
                        </li>
                        <li role="presentation" class="nav-item">
                            <a role="tab" href="#" id="tab_button_5" :aria-selected="selected5" aria-setsize="3" aria-posinset="1" aria-controls="tab_container" :class="{'active': selected5, 'nav-link': true}" @click="changeAttributes(4)">Utilisateurs</a>
                        </li>
                        <li role="presentation" class="nav-item">
                            <a role="tab" href="#" aria-setsize="3" aria-posinset="1" aria-controls="tab_container" class="nav-link disabled">  </a>
                        </li>
                    </ul>
                </div>
                <div id="tab_container" class="tab-content col">
                    <div role="tabpanel" id="tab_content_1" :aria-hidden="selected1" :aria-expanded="selected1" aria-labelledby="tab_button_1" :class="{'active': selected1, 'show': selected1, 'displayed': !selected1, 'tab-pane': true, 'card-body': true, 'fade': true}">
                        <my-table :columnNames="columnsProduct" :categorie="'product'"></my-table>
                    </div>
                    <div role="tabpanel" id="tab_content_2" :aria-hidden="selected2" :aria-expanded="selected2" aria-labelledby="tab_button_2" :class="{'active': selected2, 'show': selected2, 'displayed': !selected2, 'tab-pane': true, 'card-body': true, 'fade': true}">
                        <my-table :columnNames="columnsArticle" :categorie="'article'"></my-table>
                    </div>
                    <div role="tabpanel" id="tab_content_3" :aria-hidden="selected3" :aria-expanded="selected3" aria-labelledby="tab_button_3" :class="{'active': selected3, 'show': selected3, 'displayed': !selected3, 'tab-pane': true, 'card-body': true, 'fade': true}">
                        <my-table :columnNames="columnsShop" :categorie="'shop'"></my-table>
                    </div>
                    <div role="tabpanel" id="tab_content_4" :aria-hidden="selected4" :aria-expanded="selected4" aria-labelledby="tab_button_4" :class="{'active': selected4, 'show': selected4, 'displayed': !selected4, 'tab-pane': true, 'card-body': true, 'fade': true}">
                        <my-table :columnNames="columnsBrand" :categorie="'brand'"></my-table>
                    </div>
                    <div role="tabpanel" id="tab_content_5" :aria-hidden="selected5" :aria-expanded="selected5" aria-labelledby="tab_button_5" :class="{'active': selected5, 'show': selected5, 'displayed': !selected5, 'tab-pane': true, 'card-body': true, 'fade': true}">
                        <my-table :columnNames="columnsUsers" :categorie="'user'"></my-table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import MyTable from "components/myTable";

    export default {
        name: "nav-tab",
        components: {MyTable},
        data() {
            return {
                selected1: true,
                selected2: false,
                selected3: false,
                selected4: false,
                selected5: false,
                columnsProduct: [{friendlyName: 'Nom', id: 'nom', type: 'text'}, {friendlyName: 'Categorie', id: 'categorie', type: 'text'}, {friendlyName: 'Description', id: 'description'}, {friendlyName: 'Sous categorie', id: 'sous_categorie', type: 'text'}, {friendlyName: 'Couleur', id: 'couleur', type: 'text'}, {friendlyName: 'Type de couleur', id: 'couleur_type', type: 'text'}, {friendlyName: 'Matière', id: 'matiere', type: 'text'}, {friendlyName: 'Forme', id: 'forme', type: 'text'}, {friendlyName: 'Prix', id: 'prix', type: 'text'}, {friendlyName: 'Marque', id: 'marque', type: 'text'}, {friendlyName: 'Collection', id: 'collection', type: 'text'}, {friendlyName: 'Numero', id: 'numero', type: 'text'}],
                columnsArticle: [{friendlyName: 'Titre', id: 'titre', type: 'text'}, {friendlyName: 'Sous-titre', id: 'sous_titre', type: 'text'}, {friendlyName: 'Texte', id: 'texte', type: 'text'}, {friendlyName: 'Auteur', id: 'auteur', type: 'text'}, {friendlyName: 'Lien', id: 'lien', type: 'text'}, {friendlyName: 'Date', id: 'date', type: 'text'}, {friendlyName: 'Type', id: 'type', type: 'text'}, {friendlyName: 'Accueil', id: 'accueil', type: 'checkbox'}],
                columnsShop: [{friendlyName: 'Nom', id: 'nom', type: 'text'}, {friendlyName: 'Site', id: 'site', type: 'text'}, {friendlyName: 'Description', id: 'description', type: 'text'}, {friendlyName: 'Pays', id: 'pays', type: 'text'}, {friendlyName: 'Ville', id: 'ville', type: 'text'}, {friendlyName: 'Rue', id: 'rue', type: 'text'}, {friendlyName: 'Numéro', id: 'numero', type: 'text'}, {friendlyName: 'Complément', id: 'complement', type: 'text'}, {friendlyName: 'Accueil', id: 'accueil', type: 'checkbox'}],
                columnsBrand: [{friendlyName: 'Nom', id: 'nom', type: 'text'}, {friendlyName: 'Site', id: 'site', type: 'text'}, {friendlyName: 'Description', id: 'description', type: 'text'}, {friendlyName: 'Accueil', id: 'accueil', type: 'checkbox'}, {friendlyName: 'Photo', id: 'photo', type: 'file'}],
                columnsUsers: [{friendlyName: 'Pseudo', id: 'pseudo', type: 'text'}, {friendlyName: 'Email', id: 'mail', type: 'text'}, {friendlyName: 'Admin', id: 'admin', type: 'checkbox'}, {friendlyName: 'Marque', id: 'marque', type: 'text'}, {friendlyName: 'Photo', id: 'photo', type: 'file'}],
            }
        },
        computed: {
        },
        methods: {
            changeAttributes(index) {
                this.selected1 = 0 === index;
                this.selected2 = 1 === index;
                this.selected3 = 2 === index;
                this.selected4 = 3 === index;
                this.selected5 = 4 === index;
                document.getElementById('tab_button_1').setAttribute('aria-selected', this.selected1 ? 'true' : 'false');
                const content_element1 = document.getElementById('tab_content_1');
                content_element1.setAttribute('aria-hidden', this.selected1 ? 'true' : 'false');
                content_element1.setAttribute('aria-expanded', this.selected1 ? 'true' : 'false');
                document.getElementById('tab_button_2').setAttribute('aria-selected', this.selected2 ? 'true' : 'false');
                const content_element2 = document.getElementById('tab_content_1');
                content_element2.setAttribute('aria-hidden', this.selected2 ? 'true' : 'false');
                content_element2.setAttribute('aria-expanded', this.selected2 ? 'true' : 'false');
                document.getElementById('tab_button_3').setAttribute('aria-selected', this.selected3 ? 'true' : 'false');
                const content_element3 = document.getElementById('tab_content_1');
                content_element3.setAttribute('aria-hidden', this.selected3 ? 'true' : 'false');
                content_element3.setAttribute('aria-expanded', this.selected3 ? 'true' : 'false');
                document.getElementById('tab_button_4').setAttribute('aria-selected', this.selected4 ? 'true' : 'false');
                const content_element4 = document.getElementById('tab_content_1');
                content_element4.setAttribute('aria-hidden', this.selected4 ? 'true' : 'false');
                content_element4.setAttribute('aria-expanded', this.selected4 ? 'true' : 'false');

            },
        }
    }
</script>

<style scoped lang="scss">

    @import '../assets/css/custom-bootstrap.scss';
    @import '../../node_modules/bootstrap/scss/bootstrap.scss';

    .card-header {
        background-color: $firstColor;
        padding-right: 0;
    }

    .card {
        border-color: rgba(200, 200, 200, 1);;
    }

    .nav-tabs .nav-link.active, .nav-tabs .nav-item.show .nav-link{
        border-top-right-radius: 0;
        border-bottom-left-radius: 0.25rem;
        border: 1px solid rgba(200, 200, 200, 1);
        border-right: 0!important;
        /*box-shadow: inset 0 20px 5px -20px rgba(0, 0, 0, 1),
        inset 20px 0 5px -20px rgba(0, 0, 0, 1),
        inset 0 -20px 5px -20px rgba(0, 0, 0, 1);*/
    }

    .displayed {
        display: none;
    }

    .nav-link {
        color: rgba(0, 0, 0, 1);

    }

    .nav-tabs .nav-link.disabled {
        height: 25vh;
        border-right: 1px solid rgba(200, 200, 200, 1);
    }

    .nav-tabs .nav-link {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
        border-right: 1px solid rgba(200, 200, 200, 1);
    }

</style>
