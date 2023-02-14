import { createRouter, createWebHashHistory } from 'vue-router'

import HomeView from '../pages/HomeView.vue'
import Stats from '../pages/stats.vue'
import ContactList from '../pages/contact-list.vue'
import ContactDetails from '../pages/contact-details.vue'
import ContactEdit from '../pages/contact-edit.vue'

const routerOptions = {
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            component: HomeView,
        },
        {
            path: '/contact-list',
            component: ContactList,
        },
        {
            path: '/contact/:_id',
            component: ContactDetails,
        },
        {
            path: '/stats',
            component: Stats,
        },
        {
            path: '/contact/edit/:_id?',
            component: ContactEdit,
        },
        {
            path: '/about',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('../pages/AboutView.vue'),
        },
    ],
}
const router = createRouter(routerOptions)

export default router
