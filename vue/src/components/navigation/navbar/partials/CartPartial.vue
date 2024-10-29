<template>
    <div>
        <!-- Cart Button -->
        <button
            @click="updateCart(true)"
            class="text-gray-200 hover:text-white rounded-full hover:bg-white/10 relative p-3"
        >
            <svg
                class="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
            </svg>
            <span
                v-show="cartCount"
                class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
            >
                {{ cartCount }}
            </span>
        </button>

        <!-- Cart Panel -->
        <Transition
            enter-active-class="duration-300 ease-out"
            leave-active-class="duration-200 ease-in"
        >
            <div
                v-show="isCartOpen"
                class="fixed inset-0 z-[9999]"
                @keydown.esc="updateCart(false)"
            >
                <!-- Backdrop -->
                <div
                    class="fixed inset-0 bg-black/40 backdrop-blur-md transition-opacity"
                    :class="[isCartOpen ? 'opacity-100' : 'opacity-0']"
                    @click="updateCart(false)"
                ></div>

                <!-- Sidebar -->
                <div
                    class="fixed inset-y-0 right-0 w-[50%] bg-black/90 transform transition-transform"
                    :class="[isCartOpen ? 'translate-x-0' : 'translate-x-full']"
                    @click.stop
                >
                    <!-- Header -->
                    <header
                        class="flex items-center justify-between p-6 border-b border-white/10"
                    >
                        <h2
                            class="text-base text-white uppercase tracking-[0.1em] font-medium"
                        >
                            Cart
                        </h2>
                        <button
                            @click="updateCart(false)"
                            class="text-white/80 hover:text-white"
                        >
                            <svg
                                class="w-5 h-5"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                fill="none"
                            >
                                <path
                                    d="M6 18L18 6M6 6l12 12"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                />
                            </svg>
                        </button>
                    </header>

                    <!-- Content -->
                    <div
                        class="flex flex-col items-center justify-center h-[calc(100%-76px)] space-y-8"
                    >
                        <p class="text-white text-base font-light">
                            Your cart is empty.
                        </p>

                        <!-- Continue Shopping -->
                        <div class="flex flex-col items-center justify-center">
                            <button
                                @click="updateCart(false)"
                                class="w-20 h-20 rounded-full bg-black border border-white/10 hover:bg-white/5 transition-colors flex items-center justify-center"
                            >
                                <svg
                                    class="w-8 h-8 text-white"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    fill="none"
                                >
                                    <path
                                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                        stroke-width="1.5"
                                        stroke-linecap="round"
                                    />
                                </svg>
                            </button>
                            <span
                                class="mt-4 block text-[11px] text-white uppercase tracking-[0.2em]"
                            >
                                Continue browsing
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </Transition>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const cartCount = ref(0)

const props = defineProps({
    isSearchOpen: Boolean,
    isCartOpen: Boolean,
})

const emit = defineEmits(['updateSearchState', 'updateCartState'])

const updateCart = state => {
    emit('updateCartState', state)
    if (state === false && props.isSearchOpen) {
        emit('updateSearchState', false)
    }
}

// Keyboard shortcuts
const handleKeydown = e => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'm') {
        emit('updateSearchState', false)
        updateCart(!props.isCartOpen)
    }
}

onMounted(() => window.addEventListener('keydown', handleKeydown))
onUnmounted(() => window.removeEventListener('keydown', handleKeydown))
</script>

<style scoped>
.backdrop-blur-md {
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
}
</style>
