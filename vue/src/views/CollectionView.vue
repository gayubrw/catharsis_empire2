<template>
    <div class="min-h-screen bg-black p-8">
        <div class="max-w-7xl mx-auto space-y-10">
            <!-- Daftar Koleksi dengan Produk -->
            <div
                v-for="collection in collections"
                :key="collection.id"
                class="collection-section"
            >
                <!-- Label Koleksi -->
                <h2
                    class="text-xl font-bold text-white uppercase mb-4 text-center tracking-[0.2em]"
                >
                    {{ collection.label }}
                </h2>

                <!-- Daftar Produk untuk Koleksi -->
                <div
                    class="product-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
                >
                    <router-link
                        v-for="product in collection.products"
                        :key="product.id"
                        :to="collection.path"
                        class="product-card group flex flex-col items-center cursor-pointer transform transition-all duration-200 hover:scale-[101%] relative"
                    >
                        <!-- Wishlist Button -->
                        <button
                            @click.prevent="toggleWishlist(product)"
                            :class="[
                                'absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 backdrop-blur-sm transition-all duration-200',
                                isInWishlist(product.id)
                                    ? 'opacity-100 translate-y-0'
                                    : 'opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0',
                            ]"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                :class="[
                                    'w-5 h-5 transition-colors duration-200',
                                    isInWishlist(product.id)
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

                        <div class="image-container mb-4">
                            <img
                                :src="product.image"
                                :alt="product.name"
                                class="w-full h-auto rounded-lg"
                            />
                        </div>
                        <div class="product-info text-center space-y-1">
                            <h3 class="text-lg font-semibold text-white">
                                {{ product.name }}
                            </h3>
                            <p
                                class="text-sm text-gray-400 opacity-0 transform -translate-y-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0"
                            >
                                {{ product.categories }}
                            </p>
                            <p
                                class="text-white font-bold opacity-0 transform -translate-y-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0"
                            >
                                {{ product.price }}
                            </p>
                        </div>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { menuConfig } from '@/components/navigation/navbar/partials/MenuConfig'
import { useWishlistStore } from '@/stores/wishlistStore'

export default {
    name: 'CollectionsView',
    data() {
        return {
            collections: menuConfig.find(item => item.id === 'collections')
                .items,
        }
    },
    setup() {
        const wishlistStore = useWishlistStore()

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
            toggleWishlist,
            isInWishlist,
        }
    },
}
</script>
