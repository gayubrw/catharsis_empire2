<template>
    <div class="shop p-8 bg-black">
        <header class="shop-header text-center mb-20"></header>
        <div
            class="product-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
        >
            <div
                v-for="item in currentData"
                :key="item.id"
                class="product-card group flex flex-col cursor-pointer transform transition-all duration-200 hover:scale-[101%]"
                @click="viewProduct(item.id)"
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
            </div>
        </div>
    </div>
</template>

<script>
import { menuConfig } from './MenuConfig'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

// Mapping konfigurasi route ke nama config
const ROUTE_CONFIG_MAP = {
    '/': 'ProjectDystopian',
    '/categories/shop': 'ShopAll',
    '/collections/project-dystopian': 'ProjectDystopian',
    '/collections/catharsis-empire': 'CatharsisEmpire',
}

export default {
    name: 'LayoutShopComponent',
    setup() {
        const route = useRoute()

        const currentConfig = computed(() => {
            const configName = ROUTE_CONFIG_MAP[route.path]
            return (
                menuConfig.find(config => config.name === configName) ||
                menuConfig[0]
            )
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
            return price // Jika sudah dalam format string (seperti 'Rp396.000')
        }

        const viewProduct = id => {
            console.log('Viewing product:', id)
        }

        return {
            currentData,
            getItemTitle,
            formatPrice,
            viewProduct,
        }
    },
}
</script>
