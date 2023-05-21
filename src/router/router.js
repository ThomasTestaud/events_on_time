import { createRouter, createWebHistory } from 'vue-router';
import Graph from '../views/Graph.vue';
import List from '../views/List.vue';
import NewGraph from '../views/NewGraph.vue';



const routes = [
    {
        path: '/graph/:id',
        component: Graph
    },
    {
        path: '/list',
        component: List
    },
    {
        path: '/new-graph',
        component: NewGraph
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;