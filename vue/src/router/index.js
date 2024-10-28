import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { SignInView, SignUpView } from '../views/auth'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
        },
        {
            path: '/signin',
            name: 'signin',
            component: SignInView,
        },
        {
            path: '/signup',
            name: 'signup',
            component: SignUpView,
        },
    ],
})

export default router
