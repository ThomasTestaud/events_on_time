import { createRouter, createWebHistory } from 'vue-router';
import Graph from '../views/Graph.vue';
import List from '../views/List.vue';
import NewGraph from '../views/NewGraph.vue';
import ConnectView from '../views/Connect.vue';
import CreateUser from '../views/CreateUser.vue';



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
    },
    {
        path: '/connect',
        component: ConnectView
    },
    {
        path: '/create-account',
        component: CreateUser
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;