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
                path: '/focus/user.html',
                component: require('./app'),
                name: 'user'
            }
        ]
    }
);

new Vue({
    el: '#app',
    router,
    render: h => h(App)
});
