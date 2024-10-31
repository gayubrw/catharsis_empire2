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
                        class="product-card group flex flex-col items-center cursor-pointer transform transition-all duration-200 hover:scale-[101%]"
                    >
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

export default {
    name: 'CollectionsView',
    data() {
        return {
            collections: menuConfig.find(item => item.id === 'collections')
                .items,
        }
    },
}
</script>
