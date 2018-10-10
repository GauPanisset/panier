<template>
    <div id="chartpanel" class="row" data-equalizer>

        <div class="column small-12 left_panel" >
            <div id="chart_table">
                <form v-if="categorie !== 'user' && (userAutho[id_categorie[categorie]*3] !== undefined || isAdmin)" id="chart_datas"  >
                    <div class="grid-container">
                        <div class="grid-x grid-padding-x input_wrp">
                            <div class="col-3 cell column" v-for="column in columnNames" :key="column.id + '_input'">
                                <label>
                                    <b-form-group
                                            class="fieldset"
                                            :invalid-feedback="invalidFeedback"
                                            :state="state"
                                            v-if="column.id == 'marque' && categorie == 'product'"
                                    >
                                        <b-form-input v-on:blur.native="checkBrand()" :type="column.type" :placeholder="column.friendlyName" v-model="inputValue['marque']" :id="column.id" :name="column.id"></b-form-input>
                                    </b-form-group>
                                    <input v-if="column.id != 'marque' || categorie != 'product'" :type="column.type" :placeholder="column.friendlyName" v-model="inputValue[column.id]" :id="column.id" :name="column.id">
                                </label>
                            </div>
                            <b-form-file variant="primary" v-model="file" placeholder="Choisissez un fichier CSV"></b-form-file>
                        </div>
                        <button class="addRowBtn" v-on:click.prevent="addRow" value=""><icon id="plus" name="plus"></icon></button>
                    </div>
                </form>

                <div id="chart_table_container">
                    <div class="item-container" v-for="(item, index) in labels" :key="item.id">
                        <div class="content-container">
                            <div class="small-12 medium-2 column single-cel" v-for="(column, index) in columnNames" :key="column.id + '_cell'">
                                <label>{{column.friendlyName}}</label>

                                <input :type="column.type" v-model="item[column.id]" v-bind:disabled="userAutho[id_categorie[categorie]*3 + 1] === undefined && !isAdmin" v-on:blur="updateEvent(column.id, item.id, item[column.id])">
                            </div>
                            <div v-if="categorie === 'user' && (userAutho[15] !== undefined || isAdmin)" class="small-12 medium-2 column single-cel">
                                <button class="" @click="openModalAutho(item.id, item)">Autorisations</button>
                                <my-modal v-if="item.showModal" @close="closeModalAutho(item)" @ok="updateAutho(item.id)" :backOffice="false" :width="'60%'">
                                    <h4 slot="header">Modifier les autorisations</h4>

                                    <div slot="body" role="tablist">
                                        <div class="check-container">
                                            <div v-for="autho in authorizations" :key="autho.id">
                                                <b-form-checkbox v-model="autho.right"
                                                                 value="1"
                                                                 unchecked-value="0">
                                                    {{autho.friendlyName}}
                                                </b-form-checkbox>
                                                <b-form-group v-show="autho.right == 1 && autho.scope !== null">
                                                    <b-form-radio-group v-model="autho.scope"
                                                                        :options="[{text: 'Limitée', value: '0'}, {text: 'Totale', value: '1'}]"
                                                                        stacked>
                                                    </b-form-radio-group>
                                                </b-form-group>
                                            </div>
                                        </div>
                                    </div>
                                </my-modal>
                            </div>
                        </div>
                        <div class="small-12 medium-1 column edit_panel smaller-column">
                            <button v-bind:disabled="userAutho[id_categorie[categorie]*3 + 2] === undefined && !isAdmin" class="edit_mode" @click="deleteEvent(index)">
                                <icon name="trash"></icon>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>




</template>

<script>

    import axios from 'axios';
    import Papa from 'papaparse';
    import MyModal from 'components/myModal';

    const server_url = "https://panier-app.herokuapp.com";
    //const server_url = "http://localhost:3031";

    import 'vue-awesome/icons/trash'
    import 'vue-awesome/icons/times'
    import 'vue-awesome/icons/plus'
    import Icon from 'vue-awesome/components/Icon'

    export default {
        name: "my-table",
        components: {Icon, MyModal},
        props: ['columnNames', 'categorie', 'isAdmin', 'userAutho'],
        data() {
            return {
                id_categorie: {'product': 0, 'article': 1, 'shop': 2, 'brand': 3, 'user': 4},
                disabled: false,
                labels: [],
                inputValue: {},
                state: true,
                authorizations: [],
                oldAutho: [],
                file: null,
            }
        },
        computed: {
            invalidFeedback() {
                if (this.inputValue.marque !== undefined) {
                    if (this.inputValue.marque.length === 0 || this.state) {
                        return '';
                    } else {
                        return "La marque n'existe pas.";
                    }
                }
            },
        },
        methods: {
            sendData() {
                let brands = {};
                axios
                    .get(server_url + '/brand/index/allback')
                    .then(response => {
                        response.data.forEach(brand => {
                            brands[brand.nom] = brand.id;
                        });
                        Papa.parse(this.file, {
                            header: true,
                            complete: (results, file) => {
                                results.data.forEach(item => {
                                    item.marque = brands[item.marque];
                                });
                                axios({
                                    method: "POST",
                                    url: server_url + '/product/jsoncreate',
                                    headers: {"x-access-token": sessionStorage.getItem("accessToken"),},
                                    data: {content: results.data},
                                })
                                    .then(response => {
                                        location.reload();
                                    })
                                    .catch(err => {
                                        console.log(err);
                                    })
                            },
                            error: (err) => {
                                console.log(err);
                            }
                        })
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
            updateAutho(id_utilisateur) {
                this.authorizations.forEach(autho => {
                    if (this.oldAutho.includes(autho.id) && autho.right == 0) {
                        axios({
                            method: "DELETE",
                            url: server_url + '/user/authorization/' + id_utilisateur + '/' + autho.id,
                            headers: {"x-access-token": sessionStorage.getItem("accessToken"),},
                        })
                            .then(response => {
                                console.log('autho deleted');
                                this.oldAutho.splice(this.oldAutho.indexOf(autho.id), 1);
                            })
                            .catch(err => {
                                console.log(err);
                            });
                    } else if (this.oldAutho.includes(autho.id) && autho.right == 1) {
                        axios({
                            method: "PATCH",
                            url: server_url + '/user/account/authorization',
                            data: {id: id_utilisateur, right: autho.id, scope: autho.scope},
                            headers: {"x-access-token": sessionStorage.getItem("accessToken"),},
                        })
                            .then(response => {
                                console.log('autho patched');
                            })
                            .catch(err => {
                                console.log(err);
                            });
                    } else if (!this.oldAutho.includes(autho.id) && autho.right == 1){
                        axios({
                            method: "POST",
                            url: server_url + '/user/authorization',
                            data: {id: id_utilisateur, right: autho.id, scope: autho.scope},
                            headers: {"x-access-token": sessionStorage.getItem("accessToken"),},
                        })
                            .then(response => {
                                console.log('autho created');
                                this.oldAutho.push(autho.id);
                            })
                            .catch(err => {
                                console.log(err);
                            });
                    }
                });
            },
            openModalAutho(id_utilisateur, item) {
                axios
                    .get(server_url + 'i' + id_utilisateur)
                    .then(response => {
                        this.authorizations = [{friendlyName: "Ajouter un produit", id: 0, right: 0, scope: null}, {friendlyName: "Modifier un produit", id: 1, right: 0, scope: -1}, {friendlyName: "Supprimer un produit", id: 2, right: 0, scope: -1}, {friendlyName: "Ajouter un article", id: 3, right: 0, scope: null}, {friendlyName: "Modifier un article", id: 4, right: 0, scope: -1}, {friendlyName: "Supprimer un article", id: 5, right: 0, scope: -1}, {friendlyName: "Ajouter une boutique", id: 6, right: 0, scope: null}, {friendlyName: "Modifier une boutique", id: 7, right: 0, scope: -1}, {friendlyName: "Supprimer une boutique", id: 8, right: 0, scope: -1}, {friendlyName: "Ajouter une marque", id: 9, right: 0, scope: null}, {friendlyName: "Modifier une marque", id: 10, right: 0, scope: -1}, {friendlyName: "Supprimer une marque", id: 11, right: 0, scope: -1}, {friendlyName: "Ajouter un utilisateur", id: 12, right: 0, scope: null}, {friendlyName: "Modifier un utilisateur", id: 13, right: 0, scope: -1}, {friendlyName: "Supprimer un utilisateur", id: 14, right: 0, scope: -1}, {friendlyName: "Modifier les autorisations", id: 15, right: 0, scope: -1}];
                        this.oldAutho = [];
                        response.data.forEach(autho => {
                            this.authorizations[autho.id_droit].scope = autho.total;
                            this.authorizations[autho.id_droit].right = 1;
                            this.oldAutho.push(autho.id_droit);
                        });
                    })
                    .catch(err => {
                        console.log(err);
                    });
                item.showModal = true;
            },
            closeModalAutho(item) {
                item.showModal = false;
            },
            updateEvent(column, item, value) {
                axios({
                    method: "PATCH",
                    url: server_url + '/' + this.categorie + '/' + column,
                    data: {value: value, id: item},
                    headers: {"x-access-token": sessionStorage.getItem("accessToken"),},
                })
                    .then(response => {
                        console.log('updated');
                    })
                    .catch(err => {
                        console.log(err);
                    });

            },
            checkBrand() {
                axios.get(server_url + '/brand/id/' + this.inputValue.marque)
                    .then(response => {
                        if (response.data.length > 0) {
                            this.inputValue["id_marque"] = response.data[0].id;
                            this.state = true;
                        } else {
                            this.state = false;
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    })
            },
            deleteEvent: function(index) {
                axios({
                    method: "DELETE",
                    url: server_url + '/' + this.categorie + '/' + this.labels[index].id,
                    headers: {"x-access-token": sessionStorage.getItem("accessToken"),},
                })
                    .then(response => {
                        this.labels.splice(index, 1);
                    })
                    .catch(err => {
                        console.log(err);
                    });

            },
            addRow: function (event) {
                if (this.file !== null) {
                    this.sendData();
                } else {
                    let newRow = {};
                    this.columnNames.forEach(column => {
                        newRow[column.id] = this.inputValue[column.id];
                    });
                    newRow['id_marque'] = this.inputValue['id_marque'] === undefined ? 0 : this.inputValue['id_marque'];
                    axios({
                        method: "POST",
                        url: server_url + '/' + this.categorie + '/create',
                        data: newRow,
                        headers: {"x-access-token": sessionStorage.getItem("accessToken"),},
                    })
                        .then(response => {
                            newRow['id'] = response.data[0].id;
                            this.labels.push(newRow);
                        })
                        .catch(err => {
                            console.log(err);
                        })
                }
            },
            getItems() {
                axios.get(server_url + '/' + this.categorie + '/index/allback')
                    .then(response => {
                        response.data.forEach(item => {
                            if (this.categorie === 'user') {
                                item.showModal = false;
                            }
                            this.labels.push(item);
                        });

                    })
                    .catch(err => {
                        console.log(err);
                    })
            }
        },
        mounted() {
            this.inputValue = {};
            this.columnNames.forEach(column => {
                this.inputValue[column.id] = '';
            });

            this.getItems();
        }
    }
</script>

<style scoped lang="scss">

    @import '../assets/css/custom-bootstrap.scss';
    @import '../../node_modules/bootstrap/scss/bootstrap.scss';

    *{
        /* Transition */
        --transition-short: all .5s ease-in-out;

        /* padding */
        --padding-standard:1rem;
    }

    html,body{ min-height:100%; height:100%;}
    button{ cursor:pointer; }

    #chart_datas{ position: relative; }
    #chartpanel{height: auto; border-radius:7px;}

    .addRowBtn{  margin: auto; font-size: 2rem; width:50px; height:50px;   background-color: $firstColor;    padding: 0 1.1rem; border-radius: 2rem; z-index: 999999999999999; -webkit-box-shadow: 0px 3px 1px 0px rgba(0,0,0,0.45);
        -moz-box-shadow: 0px 3px 1px 0px rgba(0,0,0,0.45);
        box-shadow: 0px 3px 1px 0px rgba(0,0,0,0.45); cursor: pointer; opacity:1; -webkit-transition: var(--transition-short);  -moz-transition: var(--transition-short);  -o-transition: var(--transition-short); transition: var(--transition-short);}
    .addRowBtn:hover{ opacity:.8; }

    .grid-container {margin: auto auto 20px auto; width: fit-content; border-bottom: 2px solid rgba(0, 0, 0, 0.5); padding-bottom: 20px; display: flex}
    .input_wrp, .item-container {display: flex; flex-wrap: wrap;}
    .item-container {padding-bottom: 20px; margin-bottom: 20px; border-bottom: 1px solid rgba(0, 0, 0, 0.2)}
    .smaller-column {width: 7%; height: fit-content; margin: auto}
    .content-container {width: 80%; display: flex; flex-wrap: wrap;}
    .edit_mode{ cursor:pointer; margin-left: 5%; -webkit-transition: var(--transition-short);  -moz-transition: var(--transition-short);  -o-transition: var(--transition-short); transition: var(--transition-short); margin-right:2%}
    .edit_mode:hover{ color:#666;}
    .smaller-column button {width: 30px; margin-bottom: 5px}
    .smaller-column button:hover{ opacity:.5;}

    .left_panel{ overflow:hidden; position:relative; border-radius:7px; -webkit-box-shadow: 0px 0px 20px 0px rgba(50, 50, 50, 0.57); width: 100%;
        -moz-box-shadow:    0px 0px 20px 0px rgba(50, 50, 50, 0.57);
        box-shadow:         0px 0px 20px 0px rgba(50, 50, 50, 0.57);}

    #chart_datas{padding-top:1rem; margin-top: 1.5rem;}
    .input_wrp .cell{padding:5px;}
    #chart_datas input{    border-top: 0px; border-left: 0px; border-right: 0px; box-shadow: none; background-color: rgba(255,255,255,.30); border-color: $thirdColor;}

    #chart_table_container, #chart_datas{ padding-left: 1rem; padding-right: 1rem }
    #chart_table_container{overflow: scroll; position:relative; height: 42vh;}
    #chart_table_container .column{ padding:3px; margin:auto;}
    #chart_table_container .row{ margin-left:0px; margin-right:0px;}
    #chart_table_container .item-container .content-container div.single-cel input, .smaller-column input{ border: 0px; background-color: rgba(0,0,0,.05); text-align: center; color: rgba(0, 0, 0, 0.5); font-weight: 500; width: 100%; box-shadow: inset 1px 1px 2px 0 rgba(0, 0, 0, 0.2);}
    .single-cel{overflow: hidden; display: block; position: relative; width: 15%;}

    #chart_table_container .item-container .content-container div.single-cel input[type="text"]:disabled, .smaller-column input { background: rgba(0,0,0,.02); }
    #chart_table_container .item-container .content-container div.single-cel input[type="checkbox"] {box-shadow: none; width:fit-content}

    .check-container {height: 70vh; overflow: scroll}
</style>
