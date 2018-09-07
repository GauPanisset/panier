<template>
    <!--
        Affiche les filtres sur la gauche dans un aside.
        Lorsque l'utilisateur coche un filtre, un bouton apparait en dessous hors du collapse. Il peut cliquer dessus pour désélectionner le filtre.
      -->
    <div id="filter-aside">
        <aside>
            <el-collapse v-model="activeNamesOrderBy">                      <!-- Trier par -->
                <el-collapse-item  :title="'Trier par'">
                    <b-form-group v-for="sort in order" :key="sort.name">
                        <b-form-radio-group stacked v-model="sort.selected" :options="sort.content" @change="function(event) {sendSort(event, sort.name)}" class="collapse-item">
                        </b-form-radio-group>
                    </b-form-group>
                </el-collapse-item>
            </el-collapse>
            <br>                                                            <!-- Filtres -->
            <el-collapse v-model="activeNames" v-for="filter in filters" :key="filter.title">
                <el-collapse-item  :title="filter.title" :name="filter.name">
                    <b-form-group>
                        <b-form-checkbox-group stacked v-model="filter.selected" :options="filter.content" @change="function (event){sendSelection(event, filter.name)}" class="collapse-item">
                        </b-form-checkbox-group>
                    </b-form-group>
                </el-collapse-item>
                <b-button-group size="sm" v-for="item in filter.selected" :key="item">
                    <b-button :variant="'primary'" @click="function () {filter.selected.splice(filter.selected.indexOf(item), 1); selection.splice(selection.indexOf(item),1)}">{{getName(item)}}<icon name="close"></icon></b-button>
                </b-button-group>
            </el-collapse>
            <b-button :variant="'link'" @click="reset()" style="margin-top: 25px">Reset filtres</b-button>
        </aside>
    </div>
</template>

<script>
    import 'vue-awesome/icons/close'
    import Icon from 'vue-awesome/components/Icon'


    export default {

        name: "filter-aside",
        components: {
            Icon
        },
        data() {
            return {
                activeNames: [''],                              //Permet de savoir quel collapse est ouvert ("Trier par").
                activeNamesOrderBy: [''],                       //Permet de savoir quel collapse est ouvert ("filtres").
                selection: [],                                  //Selection pour les filtres.
                order: [                                        //Description des options de "Trier par".
                    {
                        name: 0,
                        selected: '',
                        content: [
                            {
                                text: "de A à Z",
                                value: "alphaC",
                            },
                            {
                                text: "de Z à A",
                                value: "alphaD"
                            },
                        ]
                    },
                    {
                        name: 1,
                        selected: '',
                        content: [
                            {
                                text: "Date ↑",
                                value: "dateC"
                            },
                            {
                                text: "Date ↓",
                                value: "dateD"
                            },
                        ]
                    }
                ],
                sortedBy: [],                                   //Selection pour "Trier par"

            };
        },
        props: ['filters'],                                     //Descriptipn des options de filtres: [{name, content: {id, text, value}, title, selection}, ...]
        methods: {
            getName(value) {                                    //Méthode permettant de retrouver le nom des filtres lorsqu'ils sont composés de plusieurs mots.
                return value.replace("_", " ");
            },
            sendSelection(selected, name) {                     //Méthode renvoyant la sélection des filtres.

                if (selected.length > 0) {
                    this.selection[name] = selected;
                } else {
                    delete this.selection[name];
                }


                this.$emit('selected', this.selection);
            },
            sendSort(event, id) {                               //Méthode renvoyant la sélection du tri.
                this.sortedBy[id] = event;

                this.$emit('selectedSort', this.sortedBy);
            },
            reset() {
                this.selection = [];
                this.$emit('selected', this.selection);
            }
        },

    }
</script>

<style scoped lang="scss">
    @import '../assets/css/custom-bootstrap.scss';
    @import '../../node_modules/bootstrap/scss/bootstrap.scss';

    .btn .fa-icon {
        margin: 0 0 0.1rem 0.5rem;
        vertical-align: middle;

    }
    .btn .fa-icon:last-child {
        margin-right: 0;
    }

    .collapse-item {
        padding-left: 5px;
    }

    #filter-aside aside {
        position: fixed;
        top: 150px;
        left: 10px;
        min-width: 120px;
        width: 10vw;
    }
</style>
