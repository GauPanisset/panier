<template>
  <div class="home-section">
    <template v-for="subsec in attribute.content">
      <subsection :img="subsec.img" :text="subsec.text" :position="position"></subsection>
    </template>
    <transition name="fade">
        <h1 v-if="position.scrollTop + 8 >= this.windowHeigth" ref="sectionTitle">{{attribute.name}}</h1>
    </transition>
  </div>

</template>

<script>
    import Subsection from "./subsection";

    export default {
      components: {Subsection},
      name: "home-section",
      data () {
        return {
          windowHeigth: window.innerHeight,
          titleOffset: 0
        }
      },
      props: ['attribute', 'position'],
    }

</script>

<style scoped>
  .home-section {
    padding-top:100px;
    height: 100vh;
  }
  h1 {
    font-family: 'salomeregular';
    font-size: 5em;
    height: fit-content;
    position: sticky;
    top: 85%;
    right: 65%;
    z-index: 10;
  }
  @font-face {
    font-family: 'salomeregular';
    src: url('../assets/font/salome-webfont.eot');
    src: url('../assets/font/salome-webfont.eot?#iefix') format('embedded-opentype'),
    url('../assets/font/salome-webfont.woff2') format('woff2'),
    url('../assets/font/salome-webfont.woff') format('woff'),
    url('../assets/font/salome-webfont.ttf') format('truetype'),
    url('../assets/font/salome-webfont.svg#salomeregular') format('svg');
    font-weight: normal;
    font-style: normal;
  }

  .fade-enter-active, .fade-leave-active {
      transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to {
      opacity: 0;
  }

</style>
