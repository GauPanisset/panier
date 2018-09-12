import Vue from 'vue'
import App from './app.vue'

import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue);

import VueRouter from 'vue-router'
Vue.use(VueRouter);

let router = new VueRouter({
        mode: 'history',
        routes: [
            {
                path: '/focus/collection.html',
                component: require('./app'),
                name: 'collection'
            }
        ]
    }
);

new Vue({
    el: '#app',
    router,
    render: h => h(App)
});
