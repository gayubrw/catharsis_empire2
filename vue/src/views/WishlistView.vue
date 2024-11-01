<template>
    <div class="min-h-screen bg-black text-white">
        <header class="px-4 py-6 mt-16">
            <div class="max-w-[1200px] mx-auto relative">
                <h1
                    class="text-xl tracking-[0.2em] uppercase absolute -top-12 left-0 font-bold"
                >
                    Wishlist
                </h1>
                <!-- Top Line -->
                <div class="w-full h-[0.5px] bg-white"></div>

                <!-- Menu Button centered between lines -->
                <div class="absolute right-0" style="top: calc(50% - 10px)">
                    <div class="relative">
                        <button
                            @click="toggleDropdown"
                            class="text-white hover:text-gray-300 transition-colors"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <circle cx="12" cy="12" r="2" />
                                <circle cx="12" cy="5" r="2" />
                                <circle cx="12" cy="19" r="2" />
                            </svg>
                        </button>
                        <!-- Styled Dropdown Menu -->
                        <div
                            v-if="isDropdownOpen"
                            class="absolute right-0 mt-4 w-60 bg-white"
                            @click.stop
                        >
                            <button
                                @click="clearWishlist"
                                class="w-full px-6 py-3 text-left text-sm text-black tracking-[0.2em] uppercase font-light"
                            >
                                Clear List
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Bottom Line -->
                <div class="w-full h-[0.5px] bg-white mt-12"></div>
            </div>
        </header>

        <main class="px-4 py-8">
            <div class="max-w-[1200px] mx-auto">
                <!-- Empty State -->
                <div
                    v-if="!wishlistItems.length"
                    class="flex flex-col items-center justify-center h-[40vh]"
                >
                    <div class="text-center max-w-2xl mx-auto">
                        <h2 class="text-xl font-light tracking-[0.2em] mb-8">
                            Love It? Add To My Wishlist
                        </h2>
                        <p
                            class="text-sm text-gray-300 leading-relaxed mb-10 max-w-xl mx-auto"
                        >
                            My Wishlist allows you to keep track of all of your
                            favorites and shopping activity whether you're on
                            your computer, phone, or tablet.
                        </p>
                        <button
                            @click="goToDashboard"
                            class="bg-white text-black px-8 py-2 text-sm hover:bg-gray-100 transition-colors uppercase tracking-wider"
                        >
                            Continue Shopping
                        </button>
                    </div>
                </div>

                <!-- Wishlist Items -->
                <div
                    v-else
                    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    <div
                        v-for="item in wishlistItems"
                        :key="item.id"
                        class="group relative"
                    >
                        <!-- Image Container -->
                        <div class="relative w-full overflow-hidden">
                            <img
                                :src="item.image"
                                :alt="item.name"
                                class="w-full h-auto"
                            />

                            <!-- Overlay with details (visible on hover) -->
                            <div
                                class="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4"
                            >
                                <!-- Top section -->
                                <div
                                    class="space-y-2 transform translate-y-[-20px] group-hover:translate-y-0 transition-transform duration-300"
                                >
                                    <p class="text-gray-300">
                                        {{ item.categories }}
                                    </p>
                                    <p class="text-xl font-bold">
                                        {{ item.price }}
                                    </p>
                                </div>

                                <!-- Bottom section -->
                                <div
                                    class="space-y-2 transform translate-y-[20px] group-hover:translate-y-0 transition-transform duration-300"
                                >
                                    <button
                                        @click="viewProduct(item.id)"
                                        class="w-full bg-white text-black py-2 hover:bg-gray-100 transition-colors text-sm uppercase tracking-wider"
                                    >
                                        View Details
                                    </button>
                                    <button
                                        @click="removeFromWishlist(item.id)"
                                        class="w-full bg-red-600 text-white py-2 hover:bg-red-700 transition-colors text-sm uppercase tracking-wider"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>

                        <!-- Product name (always visible) -->
                        <h3 class="text-lg font-bold mt-2">{{ item.name }}</h3>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { useWishlistStore } from '@/stores/wishlistStore'
import { computed, ref, onMounted, onUnmounted } from 'vue'

export default {
    name: 'WishlistPage',
    setup() {
        const router = useRouter()
        const wishlistStore = useWishlistStore()
        const isDropdownOpen = ref(false)

        const wishlistItems = computed(() => wishlistStore.items)

        const handleClickOutside = () => {
            if (isDropdownOpen.value) {
                isDropdownOpen.value = false
            }
        }

        onMounted(() => {
            document.addEventListener('click', handleClickOutside)
        })

        onUnmounted(() => {
            document.removeEventListener('click', handleClickOutside)
        })

        const toggleDropdown = event => {
            event.stopPropagation()
            isDropdownOpen.value = !isDropdownOpen.value
        }

        const clearWishlist = () => {
            wishlistStore.clearWishlist()
            isDropdownOpen.value = false
        }

        const goToDashboard = () => {
            router.push('/')
        }

        const viewProduct = productId => {
            router.push(`/product/${productId}`)
        }

        const removeFromWishlist = productId => {
            wishlistStore.removeFromWishlist(productId)
        }

        return {
            wishlistItems,
            isDropdownOpen,
            toggleDropdown,
            clearWishlist,
            goToDashboard,
            viewProduct,
            removeFromWishlist,
        }
    },
}
</script>
