import { createRouter, createWebHistory } from "vue-router";
// import { createRouter, createWebHistory } from "vue-router/dist/vue-router";

const routes = [{
        path: '/',
        redirect: '/index'
    },
    {
        path: '/index',
        name: 'Index',
        meta: {
            title: '首页'
        },
        component: () =>
            import ('@/views/index.vue')
    }, {
        path: '/map',
        name: 'Map',
        meta: {
            title: '点亮北京地图'
        },
        component: () =>
            import ('@/views/map/index.vue')
    }, {
        path: '/draw',
        name: 'Draw',
        meta: {
            title: '抽奖'
        },
        component: () =>
            import ('@/views/draw/index.vue')
    },
]
const router = createRouter({ history: createWebHistory(), routes })

export default router