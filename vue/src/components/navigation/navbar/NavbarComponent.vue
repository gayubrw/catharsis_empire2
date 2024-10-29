<template>
    <nav
        class="h-24 w-full z-50 top-0 left-0 flex items-center"
        :class="[navBackground]"
    >
        <div class="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center h-16">
                <!-- Logo -->
                <Logo />

                <!-- Desktop Menu - Centered -->
                <div class="hidden lg:flex flex-grow justify-center">
                    <div class="flex items-baseline space-x-8">
                        <a
                            href="#"
                            class="text-gray-200 hover:text-white px-3 py-2 rounded-md text-sm font-bold tracking-[0.25em]"
                            >COLLECTIONS</a
                        >
                        <a
                            href="#"
                            class="text-gray-200 hover:text-white px-3 py-2 rounded-md text-sm font-bold tracking-[0.25em]"
                            >CATEGORIES</a
                        >
                        <a
                            href="#"
                            class="text-gray-200 hover:text-white px-3 py-2 rounded-md text-sm font-bold tracking-[0.25em]"
                            >EXPLORE</a
                        >
                    </div>
                </div>

                <!-- Right Section: Search, Wishlist, Cart, Account -->
                <div class="hidden lg:flex items-center space-x-3">
                    <!-- Search Toggle Button -->
                    <button
                        @click="toggleSearch"
                        class="text-gray-200 hover:text-white rounded-full hover:bg-white/10 relative flex items-center gap-2 p-3"
                        :class="{ 'text-gray-300': isSearchOpen }"
                    >
                        <svg
                            class="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </button>

                    <!-- Wishlist -->
                    <Wishlist />

                    <!-- Cart -->
                    <Cart
                        :isSearchOpen="isSearchOpen"
                        :isCartOpen="isCartOpen"
                        @updateSearchState="updateSearchState"
                        @updateCartState="updateCartState"
                    />

                    <!-- Account -->
                    <Account />
                </div>
            </div>
        </div>

        <!-- Search Modal -->
        <div
            v-if="isSearchOpen"
            class="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-start justify-center pt-20"
            @click="closeSearch"
        >
            <div
                @click.stop
                class="w-full max-w-2xl mx-4 bg-white rounded-lg shadow-xl"
            >
                <div class="relative">
                    <input
                        ref="searchInput"
                        type="text"
                        v-model="searchQuery"
                        placeholder="Search..."
                        class="w-full bg-transparent text-gray-900 text-lg pl-12 pr-4 py-3 focus:outline-none"
                    />
                    <svg
                        class="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                </div>
            </div>
        </div>
    </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { Logo, Cart, Account, Wishlist } from './partials'

const isSearchOpen = ref(false)
const isCartOpen = ref(false)
const searchQuery = ref('')
const searchInput = ref(null)
const route = useRoute()

// Computed property untuk mengecek background
const navBackground = computed(() => {
    return route.path === '/' ? 'bg-transparent absolute' : 'bg-black'
})

const updateSearchState = newState => {
    isSearchOpen.value = newState
}

const updateCartState = newState => {
    isCartOpen.value = newState
}

onMounted(() => {
    window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
    window.removeEventListener('keydown', handleKeydown)
})

const handleKeydown = e => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        if (isCartOpen.value) {
            updateCartState(false)
        }
        e.preventDefault()
        toggleSearch()
    }

    if (e.key === 'Escape') {
        if (isSearchOpen.value) {
            closeSearch()
        }
    }
}

const toggleSearch = () => {
    isSearchOpen.value = !isSearchOpen.value
    if (isSearchOpen.value) {
        setTimeout(() => {
            searchInput.value?.focus()
        }, 100)
    }
}

const closeSearch = () => {
    isSearchOpen.value = false
    searchQuery.value = ''
}
</script>
