import { createApp } from 'vue'


import App from './App.vue'
import store from './store.js';
import router from './router.js';

import TheCell from './components/TheCell.vue'
import WinLooseDraw from './components/WinLooseDraw.vue'
import TheHeader from './components/TheHeader.vue'
import ConnectingToServer from './components/ConnectingToServer.vue'
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";

library.add(fab);
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

const app = createApp(App);

// global componenets that are not in routs

app.component("the-cell", TheCell);
app.component("win-loose-draw", WinLooseDraw);
app.component("the-header", TheHeader);
app.component("connecting-to-server", ConnectingToServer);
app.component("font-awesome-icon", FontAwesomeIcon)


app.use(store);
app.use(router);
app.mount('#app');
