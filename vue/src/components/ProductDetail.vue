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
                <!-- Right Column - Product Info -->
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
                        <div class="flex gap-4 flex-wrap">
                            <button
                                v-for="size in product?.sizes"
                                :key="size"
                                class="border border-white text-white px-4 py-2 hover:bg-white hover:text-black transition-colors"
                                :class="
                                    selectedSize === size
                                        ? 'bg-white text-black'
                                        : ''
                                "
                                @click="selectSize(size)"
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
                            @click="openSizeGuide"
                            class="bg-white text-black py-3 flex items-center justify-center gap-2 group"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                class="w-5 h-5 stroke-black group-hover:stroke-black/70"
                                stroke-width="2"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
                                />
                            </svg>
                            <span class="font-medium">SIZE GUIDE</span>
                        </button>
                        <button
                            @click="toggleWishlist"
                            class="bg-white text-black py-3 flex items-center justify-center gap-2 group"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                :class="[
                                    'w-5 h-5 transition-colors duration-200',
                                    isInWishlist
                                        ? 'fill-red-500 stroke-red-500'
                                        : 'stroke-black fill-none group-hover:fill-black/10',
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
                            <span class="font-medium">{{
                                isInWishlist
                                    ? 'REMOVE FROM WISHLIST'
                                    : 'ADD TO WISHLIST'
                            }}</span>
                        </button>
                    </div>

                    <!-- Product Details -->
                    <div class="text-white space-y-2 mt-8">
                        <pre class="whitespace-pre-line font-sans text-white">{{
                            product?.description
                        }}</pre>
                    </div>
                </div>

                <!-- Left Column - Scrollable Product Images -->
                <div class="relative">
                    <div
                        class="sticky top-8 image-gallery space-y-4 max-h-screen overflow-y-auto pr-4"
                    >
                        <div
                            v-for="(image, index) in productImages"
                            :key="index"
                            class="w-full"
                        >
                            <img
                                :src="image"
                                :alt="`${product?.name} view ${index + 1}`"
                                class="w-full h-auto"
                                loading="lazy"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Size Guide Modal -->
        <div
            v-if="showSizeGuide"
            class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
            <div class="bg-white p-5 rounded">
                <h2 class="text-black text-lg font-bold">Size Guide</h2>
                <img :src="product?.sizeguide" alt="Size Guide" class="mt-4" />
                <button
                    @click="closeSizeGuide"
                    class="mt-4 bg-red-500 text-white py-2 px-4 rounded"
                >
                    Close
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { menuConfig } from './layouts/MenuConfig'
import { useWishlistStore } from '@/stores/wishlistStore'

export default {
    name: 'ProductDetail',
    setup() {
        const route = useRoute()
        const wishlistStore = useWishlistStore()
        const product = ref(null)
        const selectedSize = ref(null)
        const showSizeGuide = ref(false)

        // Simulate multiple product images
        const productImages = computed(() => {
            if (!product.value) return []
            // In a real app, these would come from your API
            // For now, we'll duplicate the main image to simulate multiple views
            return [
                product.value.image,
                product.value.image,
                product.value.image,
                product.value.image,
                product.value.image,
                product.value.image,
            ]
        })

        const isInWishlist = computed(() => {
            return product.value
                ? wishlistStore.isInWishlist(product.value.id)
                : false
        })

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

        const toggleWishlist = () => {
            if (product.value) {
                if (isInWishlist.value) {
                    wishlistStore.removeFromWishlist(product.value.id)
                } else {
                    wishlistStore.addToWishlist(product.value)
                }
            }
        }

        const selectSize = size => {
            selectedSize.value = size
        }

        const openSizeGuide = () => {
            showSizeGuide.value = true
        }

        const closeSizeGuide = () => {
            showSizeGuide.value = false
        }

        return {
            product,
            selectedSize,
            selectSize,
            toggleWishlist,
            isInWishlist,
            showSizeGuide,
            openSizeGuide,
            closeSizeGuide,
            productImages,
        }
    },
}
</script>

<style scoped>
.image-gallery::-webkit-scrollbar {
    width: 4px;
}

.image-gallery::-webkit-scrollbar-track {
    background: #1a1a1a;
}

.image-gallery::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 2px;
}

.image-gallery::-webkit-scrollbar-thumb:hover {
    background: #555;
}

/* Smooth scrolling behavior */
.image-gallery {
    scroll-behavior: smooth;
}

/* Hide scrollbar for mobile */
@media (max-width: 768px) {
    .image-gallery {
        padding-right: 0;
    }
    .image-gallery::-webkit-scrollbar {
        display: none;
    }
    .image-gallery {
        -ms-overflow-style: none;
        scrollbar-width: none;
    }
}
</style>
