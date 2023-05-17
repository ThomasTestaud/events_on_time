import { createRouter, createWebHistory } from 'vue-router';
import Graph from '../components/Graph.vue';
import List from '../components/List.vue';



const routes = [
    {
        path: '/graph/:id',
        component: Graph
    },
    {
        path: '/list',
        component: List
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;