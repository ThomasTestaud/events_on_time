import { createRouter, createWebHistory } from 'vue-router';
import Graph from '../components/Graph.vue';
import List from '../components/List.vue';
import NewGraph from '../components/NewGraph.vue';



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