<template>
  <div id="horizontal-scroll-wrapper">
      <transition name="fade">
          <nav-bar v-show="position.scrollTop + 8 >= windowHeight"></nav-bar>
      </transition>
      <img v-show="position.scrollTop + 8 >= windowHeight" @mouseenter="mouseScroll(-1)" @mouseleave="mouseFree()" class="arrow" id="left-arrow" src="../assets/img/fleches_gauche.png">
      <home-section ref="sec1" :attribute="section1" :position="position"></home-section>
      <home-section ref="sec2" :attribute="section2" :position="position"></home-section>
      <home-section ref="sec3" :attribute="section3" :position="position"></home-section>
      <img v-show="position.scrollTop + 8 >= windowHeight" @mouseenter="mouseScroll(1)" @mouseleave="mouseFree()" class="arrow" id="right-arrow" src="../assets/img/fleches_droite.png">

  </div>

</template>

<script>

    import NavBar from "./nav-bar";
    import HomeSection from "./home-section";

    export default {
      props : ['position', 'windowHeight'],
      data() {
        return {
          repeater: 0,
          section1: {
            name: "Actualités",
            content: [{img: '12.jpg', text: 'a.png'}, {img: '11.jpeg', text: 'a.png'}, {img: '10.jpeg', text: 'b.png'}, {img: '7.jpg', text: 'a.png'}, {img: '6.jpg', text: 'a.png'}]
          },
          section2: {
            name: "Dossiers",
            content: [{img: '12.jpg', text: 'a.png'}, {img: '11.jpeg', text: 'a.png'}, {img: '10.jpeg', text: 'a.png'}, {img: '7.jpg', text: 'a.png'}, {img: '6.jpg', text: 'b.png'}]
          },
          section3: {
            name: "Marques",
            content: [{img: '12.jpg', text: 'a.png'}, {img: '11.jpeg', text: 'b.png'}, {img: '10.jpeg', text: 'a.png'}, {img: '7.jpg', text: 'a.png'}, {img: '6.jpg', text: 'a.png'}]
          }
        }
      },
      components: {
        HomeSection,
        NavBar
      },
      name: "horizontal-scroll-wrapper",
      methods: {
        mouseScroll(val) {
          function scrollIt(val, scrollTop, scrollLeft) {
            window.scrollTo(scrollLeft + val*10, scrollTop);
          }

          this.repeater = setInterval(() => {
            scrollIt(val, this.position.scrollTop, this.position.scrollLeft);
            }, 10);
        },
        mouseFree() {
          clearInterval(this.repeater);
        }
      }
    }
</script>

<style scoped>
  #horizontal-scroll-wrapper {
    max-height: 100%;
    width: auto;
    padding-left: 80px;
  }
  div {
    display: inline-flex;
  }
  .arrow{
    width: 5%;
    position: fixed;
    top: 45%;
    z-index: 1000;
  }
  #left-arrow{
    left: 0;
  }
  #left-arrow:hover{
    left: -10px;
  }

  #right-arrow{
    right: 0;
  }
  #right-arrow:hover{
    right: -10px;
  }

  .fade-enter-active, .fade-leave-active {
      transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to {
      opacity: 0;
  }

</style>
