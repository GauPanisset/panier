<template>
    <transition name="modal">
        <div class="myModal-mask">
            <div class="myModal-wrapper">
                <div class="myModal-container" :style="'width:'+width">

                    <div class="myModal-header">
                        <slot name="header">
                            default header
                        </slot>
                    </div>

                    <div class="myModal-body">
                        <slot name="body">
                            default body
                        </slot>
                    </div>

                    <div class="myModal-footer">
                        <slot name="footer">

                            <b-button variant="outline-dark" class="myModal-default-button cancel" @click="$emit('close')">
                                Terminer
                            </b-button>
                            <b-button v-if="!backOffice" variant="outline-dark" class="myModal-default-button confirm" @click="$emit('ok')">
                                Confirmer
                            </b-button>

                        </slot>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    export default {
        name: "my-modal",
        props: ["width", "backOffice"],
    }
</script>

<style scoped lang="scss">
    @import '../assets/css/custom-bootstrap.scss';
    @import '../../node_modules/bootstrap/scss/bootstrap.scss';

    .myModal-mask {
        position: fixed;
        z-index: 9998;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .5);
        display: table;
        transition: opacity .3s ease;
    }

    .myModal-wrapper {
        display: table-cell;
        vertical-align: middle;
    }

    .myModal-container {

        margin: 0 auto;
        padding: 20px 30px;
        background-color: #fff;
        border-radius: 2px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
        transition: all .3s ease;
        font-family: Helvetica, Arial, sans-serif;
    }

    .myModal-header h3 {
        margin-top: 0;
        color: #42b983;
    }

    .myModal-body {
        margin: 20px 0;
    }

    .myModal-footer {
        padding-bottom: 20px;
    }

    .myModal-default-button {
        float: right;
        padding: 2px;
        font-size: 0.8em;
        margin-right: 10px;
    }

    /*
     * The following styles are auto-applied to elements with
     * transition="modal" when their visibility is toggled
     * by Vue.js.
     *
     * You can easily play with the modal transition by editing
     * these styles.
     */

    .modal-enter {
        opacity: 0;
    }

    .modal-leave-active {
        opacity: 0;
    }

    .modal-enter .modal-container,
    .modal-leave-active .modal-container {
        -webkit-transform: scale(1.1);
        transform: scale(1.1);
    }
</style>
