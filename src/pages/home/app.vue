<template>
    <!--

    -->
    <div id="app">
        <div id="container">
            <search-bar :position="position" :windowHeight="windowHeight"></search-bar>
            <horizontal-scroll-wrapper :position="position" :windowHeight="windowHeight"></horizontal-scroll-wrapper>
        </div>

    </div>
</template>

<script>

    import SearchBar from "components/search-bar";
    import HorizontalScrollWrapper from "components/horizontal-scroll-wrapper";

    import $ from 'jquery';
    import 'jquery-mousewheel';

    import 'bootstrap/dist/css/bootstrap.css'
    import 'bootstrap-vue/dist/bootstrap-vue.css'

    export default {
        data () {
            return {
              position: {scrollTop: 0, scrollLeft: 0},
              windowHeight: window.innerHeight,
            }
        },

        name: "app",
        components: {
            HorizontalScrollWrapper,
            SearchBar,
        },

        methods: {
            handleScroll () {
                const myApp = document.getElementById('app');
                this.position.scrollTop = myApp.scrollTop;
                this.position.scrollLeft = myApp.scrollLeft;
                if  (this.position.scrollTop >= $(window).height()) {
                    myApp.style.overflowX = "scroll";
                    myApp.style.overflowY = "hidden";
                }
            },
        },

        computed: {
        },

        mounted() {
            const that = this;
            document.getElementById("app").addEventListener('scroll', this.handleScroll);
            $('#app').on('mousewheel', function(event) {
                if (that.position.scrollTop >= $(window).height()) {
                    this.scrollLeft -= event.deltaY * event.deltaFactor;
                }
            });
        },
        beforeUpdate () {
          this.windowHeight = window.innerHeight;
        },
        destroyed () {
            document.getElementById("app").removeEventListener('scroll', this.handleScroll);
        }
    }
</script>

<style scoped lang="scss">
    @import '../../assets/css/custom-bootstrap.scss';
    @import '../../../node_modules/bootstrap/scss/bootstrap.scss';
    @import url('https://fonts.googleapis.com/css?family=Raleway');

    body {
        overflow: hidden;
    }

    #app {
        overflow-x: hidden;
        overflow-y: scroll;
        height: 100vh;
        width: 100vw;
        font-family: 'Raleway', sans-serif;
    }

    #container {
        height: fit-content;
        width: fit-content;
    }

</style>
