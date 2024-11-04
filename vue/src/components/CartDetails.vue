<template>
    <div class="min-h-screen bg-black text-white py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-7xl mx-auto">
            <!-- Header -->
            <h1 class="text-2xl mb-8 tracking-[0.2em]">YOUR CART</h1>

            <!-- Continue Shopping Link -->
            <div class="mb-8">
                <router-link
                    to="/"
                    class="text-white hover:opacity-80 transition-opacity uppercase text-sm tracking-wider"
                >
                    ← CONTINUE BROWSING
                </router-link>
            </div>

            <!-- Table Headers -->
            <div
                class="grid grid-cols-12 gap-4 py-4 border-b border-white/10 uppercase text-xs tracking-wider"
            >
                <div class="col-span-6">PRODUCT</div>
                <div class="col-span-2 text-right">PRICE</div>
                <div class="col-span-2 text-center">QUANTITY</div>
                <div class="col-span-2 text-right">TOTAL</div>
            </div>

            <!-- Cart Items -->
            <div class="divide-y divide-white/10">
                <div
                    v-for="item in cartState.items"
                    :key="item.id"
                    class="py-6 grid grid-cols-12 gap-4 items-center"
                >
                    <!-- Product Info -->
                    <!-- Product Info -->
                    <div class="col-span-6 flex gap-6">
                        <router-link
                            :to="`/product/${item.id}`"
                            class="w-32 h-32 bg-gray-900 hover:opacity-80 transition-opacity"
                        >
                            <img
                                :src="item.image"
                                :alt="item.name"
                                class="w-full h-full object-cover"
                            />
                        </router-link>
                        <div class="flex flex-col justify-between py-1">
                            <div>
                                <router-link
                                    :to="`/product/${item.id}`"
                                    class="hover:opacity-80 transition-opacity block"
                                >
                                    <h3 class="font-light text-lg">
                                        {{ item.name }}
                                    </h3>
                                </router-link>
                                <p class="text-sm text-gray-400 mt-1">
                                    Size: {{ item.selectedSize }}
                                </p>
                            </div>
                            <button
                                @click="removeFromCart(item.id)"
                                class="text-white/60 hover:text-white uppercase text-left tracking-wider"
                            >
                                Remove
                            </button>
                        </div>
                    </div>

                    <!-- Price -->
                    <div class="col-span-2 text-right">
                        <div class="text-white/60 line-through text-sm mb-1">
                            {{ item.originalPrice }}
                        </div>
                        <div>{{ item.price }}</div>
                    </div>

                    <!-- Quantity -->
                    <div class="col-span-2">
                        <div class="flex items-center justify-center">
                            <div
                                class="border border-white/20 rounded flex items-center"
                            >
                                <button
                                    @click="updateItemQuantity(item.id, -1)"
                                    class="px-3 py-1 hover:bg-white/5"
                                >
                                    -
                                </button>
                                <span
                                    class="px-3 py-1 min-w-[40px] text-center"
                                    >{{ item.quantity }}</span
                                >
                                <button
                                    @click="updateItemQuantity(item.id, 1)"
                                    class="px-3 py-1 hover:bg-white/5"
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Total -->
                    <div class="col-span-2 text-right font-light">
                        {{ formatPrice(calculateItemTotal(item)) }}
                    </div>
                </div>
            </div>

            <!-- Package Protection -->
            <div
                class="mt-8 flex items-start justify-end gap-4 border-t border-white/10 pt-8"
            >
                <div class="w-6 h-6 flex-shrink-0">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                    </svg>
                </div>
                <!-- <div class="flex-1 max-w-md">
                    <div class="flex justify-between items-start mb-2">
                        <span class="text-sm"
                            >Package Protection - Rp 61.000,00</span
                        >
                        <button class="text-white hover:opacity-80 text-sm">
                            Add
                        </button>
                    </div>
                    <p class="text-white/60 text-sm">
                        Against loss, theft, or damage in transit and instant
                        resolution with Swap.
                        <a href="#" class="text-white hover:opacity-80 ml-1"
                            >Learn More</a
                        >
                    </p>
                </div> -->
            </div>

            <!-- Subtotal -->
            <div class="mt-8 text-right">
                <div class="inline-flex flex-col items-end">
                    <div class="flex justify-between gap-8">
                        <span class="uppercase text-sm tracking-wider"
                            >SUBTOTAL</span
                        >
                        <span class="font-light">{{
                            formatPrice(subtotal)
                        }}</span>
                    </div>
                    <p class="text-white/60 text-sm mt-2 italic">
                        Shipping & taxes calculated at checkout
                    </p>
                </div>
            </div>

            <!-- Checkout Actions -->
            <div class="mt-8 flex flex-col gap-4">
                <button
                    to="/checkout"
                    @click="navigateToCheckout"
                    class="w-full bg-white text-black py-4 uppercase tracking-wider text-sm hover:bg-white/90 transition-colors"
                >
                    Check Out
                </button>

                <!-- Payment buttons -->
                <!-- <div class="grid grid-cols-2 gap-4">
                    <button
                        class="w-full bg-[#5A31F4] text-white py-3 rounded flex items-center justify-center gap-2"
                    >
                        <span>Shop</span>
                        <span class="font-medium">Pay</span>
                    </button>
                    <button
                        class="w-full bg-white text-black py-3 rounded flex items-center justify-center"
                    >
                        <img
                            src="/path-to-gpay-logo.png"
                            alt="Google Pay"
                            class="h-6"
                        />
                    </button>
                </div> -->

                <!-- Shipping Calculator -->
                <!-- <button
                    class="text-left text-white/80 hover:text-white py-4 border-t border-white/10 flex justify-between items-center"
                >
                    <span>Estimate shipping</span>
                    <svg
                        class="w-4 h-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M9 5l7 7-7 7"
                        />
                    </svg>
                </button> -->
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import { cartState } from '@/components/navigation/navbar/partials/MenuConfig'
import router from '@/router'

// Computed Properties
const subtotal = computed(() => {
    return cartState.items.reduce((total, item) => {
        const price = parseInt(item.price.replace(/[^\d]/g, ''))
        return total + price * item.quantity
    }, 0)
})

// Methods
const formatPrice = price => {
    return `Rp ${price.toLocaleString('id-ID')},00`
}

const calculateItemTotal = item => {
    const price = parseInt(item.price.replace(/[^\d]/g, ''))
    return price * item.quantity
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

const navigateToCheckout = () => {
    router.push('/checkout')
}
</script>
