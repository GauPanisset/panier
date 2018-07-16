<template>
  <div class="subsection" v-bind:style="styleObject">
      <img class="image" :src="getImgUrl(img)" ref="imgRef"/>
      <img class="text" :src="getImgUrl(text)" ref="textRef" v-bind:style="styleMove"/>

  </div>
</template>

<script>
    export default {
        name: "subsection",
        data() {
          return {
            init: {
              widthText: 0,
              widthImg: 0
            },
            styleObject: {
              top: (Math.random() * 150).toString() + "px",
              'padding-left': (Math.random() * 80).toString() + "px"
            },
            styleMove: {
              left: 0
            }
          }
        },
        props: ['img', 'text', 'position'],
        methods: {
            getImgUrl(pic) {

                if (pic !== "") {
                    return require('../assets/img/'+pic);
                }
                return pic;
            },
            parallaxe() {
                if(this.$refs.imgRef !== undefined) {
                    let value = (this.$refs.imgRef.getBoundingClientRect().left + this.init.widthImg/2)/window.innerWidth;
                    this.styleMove.left = 80*(2*value - 1) + Math.abs(this.init.widthImg - this.init.widthText)/2 + "px";
                }
            }
        },
        mounted() {
          this.init.widthImg = this.$refs.imgRef.getBoundingClientRect().width;
          this.init.widthText = this.$refs.textRef.getBoundingClientRect().width;
          const value = (this.$refs.imgRef.getBoundingClientRect().left + this.init.widthImg/2)/window.innerWidth;
          this.styleMove.left = 50*(2*value - 1) + Math.abs(this.init.widthImg - this.init.widthText)/2 + "px";
        },
        created() {
          window.addEventListener('scroll', this.parallaxe);
        }
    }
</script>

<style scoped>
  .subsection {
    width: 25vw;
    height: fit-content;
    position: relative;
  }
  img {
    position: relative;
    top: 20px;
    width: 100%;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  }
  .text {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    position: relative;
    width: 80%;
    top: -30px;
    left: 0;
  }


</style>
