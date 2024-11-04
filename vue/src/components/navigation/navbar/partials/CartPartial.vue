<template>
    <div>
        <!-- Cart Button -->
        <button
            @click="updateCart(true)"
            class="text-gray-200 hover:text-white rounded-full hover:bg-white/10 relative p-3 transition-colors z-0"
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
                v-show="cartState.items.length"
                class="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-medium rounded-full h-5 w-5 flex items-center justify-center ring-2 ring-black"
            >
                {{ totalItems }}
            </span>
        </button>

        <!-- Cart Panel -->
        <Transition
            enter-active-class="duration-100 ease-out"
            leave-active-class="duration-100 ease-in"
        >
            <div
                v-show="isCartOpen"
                class="fixed inset-0 z-50"
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
                    class="fixed inset-y-0 right-0 w-full max-w-md bg-black/90 transform transition-transform border-l border-white/10 backdrop-blur-sm"
                    :class="[isCartOpen ? 'translate-x-0' : 'translate-x-full']"
                    @click.stop
                >
                    <!-- Header -->
                    <header
                        class="flex items-center justify-between px-6 py-4 border-b border-white/10"
                    >
                        <div class="flex items-center gap-3">
                            <h2
                                class="text-base text-white uppercase tracking-wide font-medium"
                            >
                                Shopping Cart ({{ totalItems }})
                            </h2>
                            <kbd
                                class="hidden sm:flex px-2 py-1 text-xs text-gray-400 bg-white/5 border border-white/10 rounded items-center gap-1"
                            >
                                <span class="text-xs">⌘</span>
                                <span>M</span>
                            </kbd>
                        </div>
                        <button
                            @click="updateCart(false)"
                            class="text-white/80 hover:text-white p-2 hover:bg-white/5 rounded-lg transition-colors"
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

                    <div class="h-[calc(100%-64px)] flex flex-col">
                        <!-- Cart Items -->
                        <template v-if="cartState.items.length > 0">
                            <div
                                class="flex-1 overflow-y-auto p-6 space-y-4 overflow-x-hidden"
                            >
                                <div
                                    v-for="item in cartState.items"
                                    :key="item.id"
                                    class="flex gap-4 py-4 border-b border-white/10"
                                >
                                    <!-- Product Image -->
                                    <div
                                        class="w-20 h-20 bg-white/5 rounded-lg overflow-hidden flex-shrink-0"
                                    >
                                        <img
                                            :src="item.image"
                                            :alt="item.name"
                                            class="w-full h-full object-cover"
                                        />
                                    </div>

                                    <!-- Product Details -->
                                    <div class="flex-1 min-w-0">
                                        <div class="flex">
                                            <!-- Product Info Column -->
                                            <div class="flex-1 min-w-0 pr-3">
                                                <h3
                                                    class="text-sm text-white font-medium leading-5 break-words"
                                                >
                                                    {{ item.name }}
                                                </h3>
                                                <p
                                                    class="text-sm text-gray-400 mt-0.5"
                                                >
                                                    Size:
                                                    {{ item.selectedSize }}
                                                </p>
                                            </div>

                                            <!-- Price Column - Fixed Width -->
                                            <div
                                                class="w-24 text-right flex-shrink-0"
                                            >
                                                <p
                                                    class="text-sm text-white font-medium"
                                                >
                                                    {{ item.price }}
                                                </p>
                                            </div>
                                        </div>

                                        <!-- Quantity Controls -->
                                        <div
                                            class="mt-2 flex justify-between items-center"
                                        >
                                            <div
                                                class="flex items-center gap-2"
                                            >
                                                <button
                                                    @click="
                                                        updateItemQuantity(
                                                            item.id,
                                                            -1,
                                                        )
                                                    "
                                                    class="text-white/80 hover:text-white p-1 hover:bg-white/5 rounded"
                                                >
                                                    <svg
                                                        class="w-4 h-4"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            stroke-linecap="round"
                                                            stroke-width="2"
                                                            d="M20 12H4"
                                                        />
                                                    </svg>
                                                </button>
                                                <span
                                                    class="text-white min-w-[20px] text-center"
                                                >
                                                    {{ item.quantity }}
                                                </span>
                                                <button
                                                    @click="
                                                        updateItemQuantity(
                                                            item.id,
                                                            1,
                                                        )
                                                    "
                                                    class="text-white/80 hover:text-white p-1 hover:bg-white/5 rounded"
                                                >
                                                    <svg
                                                        class="w-4 h-4"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            stroke-linecap="round"
                                                            stroke-width="2"
                                                            d="M12 4v16m8-8H4"
                                                        />
                                                    </svg>
                                                </button>
                                            </div>
                                            <button
                                                @click="removeFromCart(item.id)"
                                                class="text-red-400 hover:text-red-300 text-sm"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </template>

                        <!-- Empty State -->
                        <template v-else>
                            <div
                                class="flex-1 flex flex-col items-center justify-center p-8 space-y-6"
                            >
                                <div class="relative">
                                    <div
                                        class="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center"
                                    >
                                        <svg
                                            class="w-12 h-12 text-white/40"
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
                                    </div>
                                    <div
                                        class="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white/5 flex items-center justify-center text-white/40 text-sm"
                                    >
                                        0
                                    </div>
                                </div>

                                <div class="text-center space-y-2">
                                    <p class="text-white text-lg font-medium">
                                        Your cart is empty
                                    </p>
                                    <p
                                        class="text-gray-400 text-sm max-w-[250px]"
                                    >
                                        Looks like you haven't added any items
                                        to your cart yet
                                    </p>
                                </div>

                                <button
                                    @click="updateCart(false)"
                                    class="px-6 py-3 bg-white text-black font-medium rounded-lg hover:bg-white/90 transition-colors"
                                >
                                    Continue Shopping
                                </button>
                            </div>
                        </template>

                        <!-- Footer -->
                        <div class="border-t border-white/10 p-6">
                            <div class="flex justify-between text-sm mb-2">
                                <span class="text-gray-400">Subtotal</span>
                                <span class="text-white font-medium">{{
                                    formatPrice(subtotal)
                                }}</span>
                            </div>
                            <div class="flex justify-between text-sm mb-2">
                                <span class="text-gray-400">Shipping</span>
                                <span class="text-white font-medium">Free</span>
                            </div>
                            <!-- Modified Cart Details Link -->
                            <div class="flex justify-end mb-6">
                                <router-link
                                    to="/cartdetails"
                                    class="text-gray-400 tracking-[0.1em] hover:text-gray-300 text-sm font-medium transition-colors"
                                    @click="updateCart(false)"
                                >
                                    Cart Details →
                                </router-link>
                            </div>
                            <button
                                class="w-full py-3 rounded-lg transition-colors"
                                :class="[
                                    cartState.items.length > 0
                                        ? 'bg-white text-black tracking-[0.2em] hover:bg-white/90'
                                        : 'bg-white/5 text-gray-400 border border-white/10 cursor-not-allowed',
                                ]"
                                :disabled="cartState.items.length === 0"
                            >
                                Checkout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Transition>
    </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted } from 'vue'
import { cartState } from './MenuConfig'

const props = defineProps({
    isSearchOpen: Boolean,
    isCartOpen: Boolean,
})

const emit = defineEmits(['updateSearchState', 'updateCartState'])

// Computed Properties
const totalItems = computed(() => {
    return cartState.items.reduce((total, item) => total + item.quantity, 0)
})

const subtotal = computed(() => {
    return cartState.items.reduce((total, item) => {
        const price = parseInt(item.price.replace(/[^\d]/g, ''))
        return total + price * item.quantity
    }, 0)
})

// Methods
const updateCart = state => {
    if (state === false && props.isSearchOpen) {
        emit('updateSearchState', false)
    }
    emit('updateCartState', state)
}

const formatPrice = price => {
    return `Rp${price.toLocaleString()}`
}

const updateItemQuantity = (itemId, change) => {
    const item = cartState.items.find(item => item.id === itemId)
    if (item) {
        const newQuantity = item.quantity + change
        if (newQuantity > 0) {
            item.quantity = newQuantity
        }
    }
}

const removeFromCart = itemId => {
    const index = cartState.items.findIndex(item => item.id === itemId)
    if (index > -1) {
        cartState.items.splice(index, 1)
    }
}

// Keyboard shortcuts
const handleKeydown = e => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'm') {
        e.preventDefault()
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
