import { createRouter,createWebHistory } from 'vue-router';
import TheBoard from './components/TheBoard.vue'
import NameInput from './components/NameInput.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: NameInput },
        { path: '/game/:roomid', component: TheBoard }
    ]
});

export default router;