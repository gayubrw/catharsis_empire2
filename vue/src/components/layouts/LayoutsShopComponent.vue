<template>
    <div class="min-h-screen bg-black p-8">
        <div class="max-w-7xl mx-auto">
            <!-- Products Grid -->
            <div
                v-if="currentData && currentData.length > 0"
                class="product-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
            >
                <div
                    v-for="item in currentData"
                    :key="item.id"
                    class="product-card group relative"
                >
                    <!-- Wishlist Button -->
                    <button
                        @click.prevent="toggleWishlist(item)"
                        :class="[
                            'absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 backdrop-blur-sm transition-all duration-200',
                            isInWishlist(item.id)
                                ? 'opacity-100 translate-y-0'
                                : 'opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0',
                        ]"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            :class="[
                                'w-5 h-5 transition-colors duration-200',
                                isInWishlist(item.id)
                                    ? 'fill-red-500 stroke-red-500'
                                    : 'stroke-white fill-none hover:fill-white/10',
                            ]"
                            viewBox="0 0 24 24"
                            stroke-width="2"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                            />
                        </svg>
                    </button>

                    <!-- Product Link -->
                    <router-link
                        :to="`/product/${item.id}`"
                        class="flex flex-col cursor-pointer transform transition-all duration-200 hover:scale-[101%]"
                    >
                        <div
                            class="relative image-container mb-6 overflow-hidden"
                        >
                            <img
                                :src="item.image"
                                :alt="getItemTitle(item)"
                                class="w-full h-auto"
                            />
                            <!-- Optional: Add a subtle overlay on hover -->
                            <div
                                class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200"
                            ></div>
                        </div>
                        <div class="product-info text-center space-y-2">
                            <h3 class="text-lg font-semibold text-white">
                                {{ getItemTitle(item) }}
                            </h3>
                            <p
                                v-if="item.categories"
                                class="text-sm text-gray-400 opacity-0 transform -translate-y-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0"
                            >
                                {{ item.categories }}
                            </p>
                            <p
                                class="product-price text-white font-bold opacity-0 transform -translate-y-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0"
                            >
                                {{ formatPrice(item.price) }}
                            </p>
                        </div>
                    </router-link>
                </div>
            </div>

            <!-- Empty State - tidak berubah -->
            <div v-else class="text-white text-center py-20">
                <p>No products found in this collection.</p>
            </div>
        </div>
    </div>
</template>

<script>
import { menuConfig } from './MenuConfig'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useWishlistStore } from '@/stores/wishlistStore'

// Mapping konfigurasi route ke nama config dan title
const ROUTE_CONFIG_MAP = {
    '/': {
        name: 'ProjectDystopian',
        title: 'Project Dystopian',
    },
    '/categories/shop': {
        name: 'ShopAll',
        title: 'Shop All',
    },
    '/collections/project-dystopian': {
        name: 'ProjectDystopian',
        title: 'Project Dystopian',
    },
    '/collections/catharsis-empire': {
        name: 'CatharsisEmpire',
        title: 'Catharsis Empire',
    },
    '/collections/catharsis-reborn': {
        name: 'CatharsisReborn',
        title: 'Catharsis Reborn',
    },
}

export default {
    name: 'LayoutShopComponent',
    setup() {
        const route = useRoute()
        const wishlistStore = useWishlistStore()

        const currentConfig = computed(() => {
            const config = ROUTE_CONFIG_MAP[route.path]
            if (!config) return menuConfig[0]
            return menuConfig.find(c => c.name === config.name) || menuConfig[0]
        })

        const getCurrentTitle = computed(() => {
            const config = ROUTE_CONFIG_MAP[route.path]
            return config ? config.title : 'Collection'
        })

        const currentData = computed(() => {
            if (!currentConfig.value) return []
            const dataFn = currentConfig.value.data
            return dataFn ? dataFn().products || dataFn().items : []
        })

        const getItemTitle = item => {
            return item.name || item.title
        }

        const formatPrice = price => {
            return price
        }

        const toggleWishlist = item => {
            if (wishlistStore.isInWishlist(item.id)) {
                wishlistStore.removeFromWishlist(item.id)
            } else {
                wishlistStore.addToWishlist(item)
            }
        }

        const isInWishlist = itemId => {
            return wishlistStore.isInWishlist(itemId)
        }

        return {
            currentData,
            getItemTitle,
            formatPrice,
            getCurrentTitle,
            toggleWishlist,
            isInWishlist,
        }
    },
}
</script>

<style scoped>
.group:hover .group-hover\:fill-white\/10 {
    fill: rgba(255, 255, 255, 0.1);
}
</style>
