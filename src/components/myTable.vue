<template>
    <div id="chartpanel" class="row" data-equalizer>

        <div class="column small-12 left_panel" >
            <div id="chart_table">
                <form v-if="categorie !== 'user'" id="chart_datas"  >
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
                        </div>
                        <button class="addRowBtn" v-on:click.prevent="addRow" value=""><icon id="plus" name="plus"></icon></button>
                    </div>

                </form>

                <div id="chart_table_container">
                    <div class="item-container" v-for="(item, index) in labels" :key="item.id">
                        <div class="content-container">
                            <div class="small-12 medium-2 column single-cel" v-for="column in columnNames" :key="column.id + '_cell'">
                                <label>{{column.friendlyName}}</label>
                                <input :type="column.type" v-model="item[column.id]" v-bind:disabled="disabled" v-on:blur="updateEvent(column.id, item.id, item[column.id])">
                            </div>
                        </div>
                        <div class="small-12 medium-1 column edit_panel smaller-column">
                            <button class="edit_mode" @click="deleteEvent(index)">
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

    const server_url = "https://panier-app.herokuapp.com";
    //const server_url = "http://localhost:3031";

    import 'vue-awesome/icons/trash'
    import 'vue-awesome/icons/times'
    import 'vue-awesome/icons/pencil'
    import 'vue-awesome/icons/plus-square'
    import Icon from 'vue-awesome/components/Icon'

    export default {
        name: "my-table",
        components: {Icon},
        props: ['columnNames', 'categorie'],
        data() {
            return {
                disabled: false,
                labels: [],
                inputValue: {},
                state: true,
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
            },
            getItems() {
                axios.get(server_url + '/' + this.categorie + '/index/allback')
                    .then(response => {
                        response.data.forEach(item => {
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

            document.getElementById("marque").classList.remove("form-control");

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
</style>
