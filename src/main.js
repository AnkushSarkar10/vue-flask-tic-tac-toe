import { createApp } from 'vue'


import App from './App.vue'
import store from './store.js';
import router from './router.js';

import TheCell from './components/TheCell.vue'
import WinLooseDraw from './components/WinLooseDraw.vue'
import TheHeader from './components/TheHeader.vue'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'


const app = createApp(App);

// global componenets that are not in routs

app.component("the-cell", TheCell);
app.component("win-loose-draw", WinLooseDraw);
app.component("the-header", TheHeader);


app.use(store);
app.use(router);
app.mount('#app');
