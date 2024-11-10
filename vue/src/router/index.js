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
import CartDetails from '@/components/CartDetails.vue'
import CheckoutView from '@/views/CheckoutView.vue'
import TransactionView from '@/views/TransactionView.vue'
import AdminLayout from '@/components/Admin/AdminLayout.vue'
import AdminDashboard from '@/components/Admin/AdminDashboard.vue'
import AdminOrders from '@/components/Admin/AdminOrders.vue'
import AppLayout from '@/views/AppLayout.vue'
import AdminUsers from '@/components/Admin/AdminUsers.vue'
import AdminProducts from '@/components/Admin/AdminProducts.vue'
import AdminCollections from '@/components/Admin/AdminCollections.vue'
import AdminCategories from '@/components/Admin/AdminCategories.vue'
import AdminRoles from '@/components/Admin/AdminRoles.vue'
import AdminCollectionDetail from '@/components/Admin/AdminCollectionDetail.vue'
import AdminCategoryDetail from '@/components/Admin/AdminCategoryDetail.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            component: AppLayout,
            children: [
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
                    path: '/cartdetails',
                    name: 'CartDetails',
                    component: CartDetails,
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
                    meta: { requiresAuth: true },
                },
                {
                    path: '/transaction',
                    name: 'Transaction',
                    component: TransactionView,
                    meta: { requiresAuth: true },
                },
            ],
        },
        {
            path: '/admin',
            component: AdminLayout,
            children: [
                {
                    path: 'dashboard',
                    name: 'admin-dashboard',
                    component: AdminDashboard,
                },
                {
                    path: 'orders',
                    name: 'admin-orders',
                    component: AdminOrders,
                },
                {
                    path: 'users',
                    name: 'admin-users',
                    component: AdminUsers,
                },
                {
                    path: 'products',
                    name: 'admin-products',
                    component: AdminProducts,
                },
                {
                    path: 'collections',
                    name: 'admin-collections',
                    component: AdminCollections,
                },
                {
                    path: 'collection/:name',
                    name: 'admin-collection-detail',
                    component: AdminCollectionDetail,
                    props: true,
                },
                {
                    path: 'categories',
                    name: 'admin-categories',
                    component: AdminCategories,
                },
                {
                    path: 'category/:name',
                    name: 'admin-category-detail',
                    component: AdminCategoryDetail,
                    props: true,
                },
                {
                    path: 'roles',
                    name: 'admin-roles',
                    component: AdminRoles,
                },
                {
                    path: '',
                    redirect: '/admin/dashboard',
                },
            ],
        },
    ],
})

export default router
