import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import WishlistView from '@/views/WishlistView.vue'
import { SignInView, SignUpView, ForgotPasswordView } from '../views/auth'
import ProfileView from '../views/ProfileView.vue'
import LayoutsShopComponent from '@/components/layouts/LayoutsShopComponent.vue'
import ProductDetail from '../components/ProductDetail.vue'
import Collections from '@/views/CollectionView.vue'
import AddressComponent from '../components/AddressComponent.vue'
import ProfileComponent from '../components/ProfileComponent.vue'
import CheckoutView from '@/views/CheckoutView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
        },
        {
            path: '/wishlist',
            name: 'wishlist',
            component: WishlistView,
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
        {
            path: '/',
            component: ProfileView,
            children: [
                {
                    path: 'profile',
                    component: ProfileComponent,
                },
                {
                    path: 'address',
                    component: AddressComponent,
                },
                {
                    path: '',
                    redirect: '/profile-setting',
                },
            ],
        },
        {
            path: '/forgot-password',
            name: 'forgot-password',
            component: ForgotPasswordView,
        },
        {
            path: '/categories/shop',
            name: 'Shop',
            component: LayoutsShopComponent,
        },
        {
            path: '/collections',
            name: 'Collections',
            component: Collections,
        },
        {
            path: '/collections/project-dystopian',
            name: 'project-dystopian',
            component: LayoutsShopComponent,
        },
        {
            path: '/collections/catharsis-empire',
            name: 'catharsis-empire',
            component: LayoutsShopComponent,
        },
        {
            path: '/collections/catharsis-reborn',
            name: 'catharsis-reborn',
            component: LayoutsShopComponent,
        },
        {
            path: '/product/:id',
            component: ProductDetail,
            props: true,
        },
        {
            path: '/checkout',
            name: 'checkout',
            component: CheckoutView,
            meta: { requiresAuth: true }
        },
    ],
})

export default router