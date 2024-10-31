<template>
    <div class="min-h-screen bg-black p-8">
        <div class="max-w-7xl mx-auto">
            <!-- Products Grid -->
            <div
                v-if="currentData && currentData.length > 0"
                class="product-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
            >
                <router-link
                    v-for="item in currentData"
                    :key="item.id"
                    :to="`/product/${item.id}`"
                    class="product-card group flex flex-col cursor-pointer transform transition-all duration-200 hover:scale-[101%]"
                >
                    <div class="image-container mb-6">
                        <img
                            :src="item.image"
                            :alt="getItemTitle(item)"
                            class="w-full h-auto"
                        />
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

            <!-- Empty State -->
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

        return {
            currentData,
            getItemTitle,
            formatPrice,
            getCurrentTitle,
        }
    },
}
</script>
