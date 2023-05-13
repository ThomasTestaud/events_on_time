import { createRouter, createWebHistory } from 'vue-router';
import Graph from '../components/Graph.vue';

const routes = [
    {
        path: '/',
        component: Graph
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;