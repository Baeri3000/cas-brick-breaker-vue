import {createRouter, createWebHistory} from 'vue-router'
import Home from '../views/Home.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/:catchAll(.*)',
            name: 'NotFound',
            component: () => import('../views/NotFound.vue')
        }
    ],
    scrollBehavior(to, from, savedPosition) {
        if (from.path === to.path) {
            return {top: 0, behavior: "smooth"}
        } else if (savedPosition) {
            return savedPosition
        } else {
            return {top: 0}
        }
    },
})

export default router
