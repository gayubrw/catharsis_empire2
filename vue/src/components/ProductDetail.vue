<template>
    <div class="product-detail min-h-screen bg-black p-8">
        <div class="max-w-7xl mx-auto">
            <!-- Breadcrumb -->
            <div class="text-white text-sm mb-8">
                <router-link to="/" class="hover:text-gray-300"
                    >Home</router-link
                >
                <span class="mx-2">/</span>
                <span>{{ product?.categories }}</span>
                <span class="mx-2">/</span>
                <span>{{ product?.name }}</span>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
                <!-- Left Column - Product Info -->
                <div class="space-y-6">
                    <h1 class="text-white text-5xl font-bold">
                        {{ product?.name }}
                    </h1>
                    <p class="text-white text-xl">{{ product?.categories }}</p>
                    <p class="text-white text-2xl font-bold">
                        {{ product?.price }}
                    </p>

                    <!-- Size Selection -->
                    <div class="space-y-4">
                        <p class="text-white text-sm">SIZE</p>
                        <div class="flex gap-4">
                            <button
                                v-for="size in product?.sizes"
                                :key="size"
                                class="border border-white text-white px-4 py-2 hover:bg-white hover:text-black transition-colors"
                            >
                                {{ size }}
                            </button>
                        </div>
                    </div>

                    <!-- Action Buttons -->
                    <div class="space-y-4">
                        <button
                            class="w-full bg-gray-700 text-white py-3 hover:bg-gray-600 transition-colors"
                        >
                            ADD TO CART
                        </button>
                        <button
                            class="w-full bg-indigo-600 text-white py-3 hover:bg-indigo-700 transition-colors"
                        >
                            Buy with ShopPay
                        </button>
                        <button
                            class="w-full bg-gray-700 text-white py-3 hover:bg-gray-600 transition-colors"
                        >
                            MORE PAYMENT OPTIONS
                        </button>
                    </div>

                    <!-- Additional Buttons -->
                    <div class="grid grid-cols-2 gap-4">
                        <button
                            class="bg-white text-black py-3 flex items-center justify-center gap-2"
                        >
                            <span class="material-icons">straighten</span>
                            SIZE GUIDE
                        </button>
                        <button
                            class="bg-white text-black py-3 flex items-center justify-center gap-2"
                        >
                            <span class="material-icons">favorite_border</span>
                            ADD TO HITLIST
                        </button>
                    </div>

                    <!-- Product Details -->
                    <div class="text-white space-y-2 mt-8">
                        <pre class="whitespace-pre-line font-sans text-white">{{
                            product?.description
                        }}</pre>
                    </div>
                </div>

                <!-- Right Column - Product Image -->
                <div class="product-image">
                    <img
                        :src="product?.image"
                        :alt="product?.name"
                        class="w-full h-auto"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { menuConfig } from './layouts/MenuConfig'

export default {
    name: 'ProductDetail',
    setup() {
        const route = useRoute()
        const product = ref(null)
        const selectedSize = ref(null)

        const formatPrice = price => {
            return price
        }

        onMounted(() => {
            const productId = route.params.id
            for (const config of menuConfig) {
                const data = config.data()
                const foundProduct = (data.products || data.items)?.find(
                    item => item.id === productId,
                )

                if (foundProduct) {
                    product.value = foundProduct
                    break
                }
            }
        })

        const selectSize = size => {
            selectedSize.value = size
        }

        return {
            product,
            formatPrice,
            selectedSize,
            selectSize,
        }
    },
}
</script>
