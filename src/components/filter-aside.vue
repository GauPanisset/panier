<template>
    <div id="filter-aside">
        <aside>
            <el-collapse v-model="activeNames">
                <el-collapse-item title="Marque" name="1">
                    <b-form-group>
                        <b-form-checkbox-group stacked v-model="brandSelections" :options="brandOptions" class="collapse-item" >
                        </b-form-checkbox-group>
                    </b-form-group>
                </el-collapse-item>
                <b-button-group size="sm" v-for="brand in brandSelections" :key="brand">
                    <b-button :variant="'primary'" @click="brandSelections.splice(brandSelections.indexOf(brand), 1)">{{brand}}<icon name="close"></icon></b-button>
                </b-button-group>
                <el-collapse-item title="Couleur" name="2">
                    <b-form-group>
                        <b-form-checkbox-group stacked v-model="colorSelections" :options="colorOptions" class="collapse-item" >
                        </b-form-checkbox-group>
                    </b-form-group>
                </el-collapse-item>
                <b-button-group size="sm" v-for="color in colorSelections" :key="color">
                    <b-button :variant="'primary'" @click="colorSelections.splice(colorSelections.indexOf(color), 1)">{{color}}<icon name="close"></icon></b-button>
                </b-button-group>
                <el-collapse-item title="Matière" name="3">
                <b-form-group>
                    <b-form-checkbox-group stacked v-model="materialSelections" :options="materialOptions" class="collapse-item" >
                    </b-form-checkbox-group>
                </b-form-group>
                </el-collapse-item>
                <b-button-group size="sm" v-for="material in materialSelections" :key="material">
                    <b-button :variant="'primary'" @click="materialSelections.splice(materialSelections.indexOf(material), 1)">{{material}}<icon name="close"></icon></b-button>
                </b-button-group>
                <el-collapse-item title="Prix" name="4">
                <b-form-group>
                    <b-form-checkbox-group stacked v-model="priceSelections" :options="priceOptions" class="collapse-item" >
                    </b-form-checkbox-group>
                </b-form-group>
                </el-collapse-item>
                <b-button-group size="sm" v-for="price in priceSelections" :key="price">
                    <b-button :variant="'primary'" @click="priceSelections.splice(priceSelections.indexOf(price), 1)">{{price}}<icon name="close"></icon></b-button>
                </b-button-group>
            </el-collapse>
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
                activeNames: [''],
                brandOptions: [
                    {id: 0, text: 'Rice', value: 'Rice'},
                    {id: 1, text: 'Pip Studio', value: 'Pip Studio'},
                    {id: 2, text: 'Greengate', value: 'Greengate'},
                ],
                brandSelections: [],
                colorOptions: [
                    {id: 0, text: 'Rouge', value: 'Rouge'},
                    {id: 1, text: 'Vert', value: 'Vert'},
                    {id: 2, text: 'Bleu', value: 'Bleu'},
                    {id: 3, text: 'Jaune', value: 'Jaune'},
                ],
                colorSelections: [],
                materialOptions: [
                    {id: 0, text: 'Melamine', value: 'Melamine'},
                    {id: 1, text: 'Porcelaine', value: 'Porcelaine'},
                    {id: 2, text: 'Verre', value: 'Verre'},
                ],
                materialSelections: [],
                priceOptions: [
                    {id: 0, text: '< 10€', value: '< 10€'},
                    {id: 1, text: '10€ < ... < 100€', value: '10€ < ... < 100€'},
                    {id: 2, text: '> 100€', value: '> 100€'},
                ],
                priceSelections: [],
            };
        },
        methods: {
        }
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
