import Vue from 'vue'
import App from './app.vue'

import 'element-ui/lib/theme-chalk/index.css'

import ElementUI from 'element-ui'
Vue.use(ElementUI);

import VueScrollTo from 'vue-scrollto'
Vue.use(VueScrollTo, {
    container: "#app"
});

import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue);

new Vue({
    el: '#app',
    render: h => h(App)
});
