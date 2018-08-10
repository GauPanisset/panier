<template>
      <div id="app">
            <search-bar></search-bar>
            <horizontal-scroll-wrapper :position="position" :windowHeight="windowHeight"></horizontal-scroll-wrapper>
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
            this.position.scrollTop = window.scrollY;
            this.position.scrollLeft = window.scrollX;
          }
        },

        computed: {
        },

        created() {
            window.addEventListener('scroll', this.handleScroll);

            this.windowHeight = window.innerHeight;

            scrollVert();
            let scrollLeft = 0;

            function scrollVert() {
                  $('html, body, *').off('mousewheel').mousewheel(function (e) {
                      const delta = e.deltaY;
                      if ($(window).scrollTop() + 8 + $(window).height() !== $(document).height()) {
                          this.scrollTop -= delta*(1.05 - Math.exp(-this.scrollTop*0.003));
                      }
                      e.preventDefault();
                      setTimeout(function () {

                          if ($(window).scrollTop() + 8 + $(window).height() === $(document).height()) {
                              scrollHoriz();
                          }
                      }, 0);

                  });
            }

            function scrollHoriz() {
                  $('html, body, *').off('mousewheel').mousewheel(function (e) {
                      const delta = e.deltaY;
                      this.scrollLeft -= (delta);
                      e.preventDefault();
                      scrollLeft = this.scrollLeft;
                      setTimeout(function () {
                          if (scrollLeft === 0) {
                              //scrollVert();
                          }
                      }, 0);
                  });
            }
        },

        beforeUpdate () {
          this.windowHeight = window.innerHeight;
        },

        destroyed () {
          window.removeEventListener('scroll', this.handleScroll);
        }
    }
</script>

<style scoped lang="scss">
    @import '../../assets/css/custom-bootstrap.scss';
    @import '../../../node_modules/bootstrap/scss/bootstrap.scss';
    @import url('https://fonts.googleapis.com/css?family=Raleway');

    #app {
        background: linear-gradient($firstColor, white);
        height: 100vh;
        font-family: 'Raleway', sans-serif;
        margin: -8px;
    }
</style>
