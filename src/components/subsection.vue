<template>
  <div class="subsection" v-bind:style="styleObject">
      <transition name="fade">
          <a class="readMore" :href="summary.link"><img class="image" :src="getImgUrl(attribute.image)" ref="imgRef"/></a>
      </transition>
      <div class="text" ref="textRef" v-bind:style="styleMove">
          <h2>{{attribute.title}}</h2>
          <p>{{summary.content}}</p>
          <a class="readMore" :href="summary.link">Lire la suite</a>
      </div>
  </div>
</template>

<script>
    export default {
        name: "subsection",
        data() {
            return {
                init: {
                    widthText: 0,
                    widthImg: 0,
                    heightImg: 0,
                },
                styleObject: {
                    top: 0,
                    'padding-left': (Math.random() * 80).toString() + "px"
                },
                styleMove: {
                    left: 0
                },
                summary: {
                    content: "",
                    link: ""
                },
            }
        },
        props: ['attribute', 'position'],
        methods: {
            getImgUrl(pic) {

                if (pic !== "") {
                    return require('../assets/img/'+pic);
                }
                return pic;
            },
            parallaxe() {
                if(this.$refs.imgRef !== undefined) {
                    if (this.init.widthImg === 0) {
                        this.init.widthImg = this.$refs.imgRef.getBoundingClientRect().width;
                        this.init.heightImg = this.$refs.imgRef.getBoundingClientRect().height;
                        this.styleObject.top = ((Math.random() * 150) * 2*(1 - this.init.heightImg/(window.innerHeight - 50))).toString() + "px";
                    }
                    let value = (this.$refs.imgRef.getBoundingClientRect().left + this.init.widthImg/2)/window.innerWidth;
                    this.styleMove.left = 80*(2*value - 1) + Math.abs(this.init.widthImg - this.init.widthText)/2 + "px";
                }
            }
        },
        mounted() {

            this.init.widthText = this.$refs.textRef.getBoundingClientRect().width;
            const value = (this.$refs.imgRef.getBoundingClientRect().left)/window.innerWidth;
            this.styleMove.left = 80*(2*value - 1) + Math.abs(this.init.widthImg - this.init.widthText)/2 + "px";

            this.summary.content=this.attribute.content.substr(0, 100);
            if (this.summary.content[-1] !== ".") {
                this.summary.content = this.summary.content.concat("...")
            }
            if (!this.attribute.brand){
                this.summary.link = "http://localhost:8010/focus/article.html?id=" + this.attribute.id;
            } else {
                this.summary.link = "http://localhost:8010/focus/brand.html?id=" + this.attribute.id;
            }

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
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
        max-width: 100%;
        max-height: 55vh;
    }

    .text {
        padding: 10px;
        background-color: white;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        position: relative;
        width: 80%;
        top: -30px;
        left: 0;
        font-size: 1.5vh;
    }

    .text h2 {
        font-size: 3vh;
    }

    .readMore {
        color: black;
        text-decoration: underline;
        margin-left: 20px;
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to {
        opacity: 0;
    }

</style>
