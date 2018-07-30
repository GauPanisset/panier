import Vue from 'vue'
import App from './app.vue'

import 'element-ui/lib/theme-chalk/index.css'

import ElementUI from 'element-ui'
Vue.use(ElementUI);

import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue);

import VueRouter from 'vue-router'
Vue.use(VueRouter);

let router = new VueRouter({
        mode: 'history',
        routes: [
            {
                path: '/result.html',
                component: require('./app'),
                name: 'result'
            }
        ]
    }
);

new Vue({
    el: '#app',
    router,
    render: h => h(App)
});
