
import { createApp } from 'vue'
import App from './src/App.vue';
import store from './store';
import router from './src/router';
import axios from 'axios';
import VueAxios from 'vue-axios';

createApp(App)
.use(store)
.use(router)
.use(VueAxios, axios)
.mount('#app');
