<template>
  <div ref="imgRef" class="subsection" v-bind:style="styleObject">
      <a :href="summary.link"><img class="image" :src="getImgUrl(attribute.image)"/></a>
      <div class="text" ref="textRef" v-bind:style="styleMove">
          <h2>{{attribute.title}}</h2>
          <p>{{summary.content}}</p>
          <a class="readMore" :href="summary.link">Lire la suite</a>
      </div>
  </div>
</template>

<script>
    const domain_url = "https://panier-vue.herokuapp.com";
    //const domain_url = "http://localhost:8010";

    export default {
        name: "subsection",
        data() {
            return {
                init: {
                    widthText: 0,
                    widthImg: 0,
                    heightImg: 0,
                    value: 0
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
                }
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
                    this.init.value = (this.$refs.imgRef.getBoundingClientRect().left + this.init.widthImg/2)/window.innerWidth;
                    this.styleMove.left = 80*(2*this.init.value - 1) + Math.abs(this.init.widthImg - this.init.widthText)/2 + "px";
                }
            }
        },
        mounted() {

            let img = new Image();
            const that = this;

            img.onload = function () {
                that.init.heightImg = that.$refs.imgRef.clientHeight;
                that.init.widthImg = that.$refs.imgRef.clientWidth;
                that.init.widthText = that.$refs.textRef.clientWidth + 20;

                that.styleObject.top = (window.innerHeight*0.45 - that.init.heightImg/2 + ((Math.random() * 150) - 75) * 2*(1 - that.init.heightImg/(window.innerHeight - 50))).toString() + "px";
                that.init.value = (that.$refs.imgRef.getBoundingClientRect().left + that.init.widthImg/2)/window.innerWidth;
                that.styleMove.left = 80*(2*that.init.value - 1) + Math.abs(that.init.widthImg - that.init.widthText)/2 + "px";
            };

            img.src = this.getImgUrl(this.attribute.image);


            this.summary.content=this.attribute.content.substr(0, 100);
            if (this.summary.content[-1] !== ".") {
                this.summary.content = this.summary.content.concat("...")
            }
            if (this.attribute.type === 'article') {
                this.summary.link = domain_url + "/focus/article.html?id=" + this.attribute.id;
            } else if (this.attribute.type === 'brand') {
                this.summary.link = domain_url + "/focus/brand.html?id=" + this.attribute.id;
            } else {
                this.summary.link = domain_url + "/focus/shop.html?id=" + this.attribute.id;
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
        top: 1px;
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


</style>
