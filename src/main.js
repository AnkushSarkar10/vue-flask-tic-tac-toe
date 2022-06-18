import { createApp } from 'vue'


import App from './App.vue'
import store from './store.js';
import router from './router.js';

import TheCell from './components/TheCell.vue'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'


const app = createApp(App);

//componenets
// app.component("the-board", TheBoard);
app.component("the-cell", TheCell);

app.use(store);
app.use(router);
app.mount('#app');
