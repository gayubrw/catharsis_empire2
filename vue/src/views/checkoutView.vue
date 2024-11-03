```vue
<template>
    <div class="min-h-screen bg-black">
        <!-- Main Content -->
        <div class="container mx-auto px-4 py-8">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                <!-- Left Column - Forms -->
                <div class="space-y-6">
                    <!-- Navigation -->
                    <nav>
                        <ol class="flex items-center text-sm space-x-2">
                            <li class="text-white/60 hover:text-white cursor-pointer" @click="$router.push('/')">Cart</li>
                            <li class="text-white/60">></li>
                            <li class="text-white">Information</li>
                            <li class="text-white/60">></li>
                            <li class="text-white/60">Payment</li>
                        </ol>
                    </nav>

                    <!-- Account Section -->
                    <div class="border border-white/10 rounded p-4">
                        <h2 class="text-sm text-white/60 mb-4">Account</h2>
                        <input
                            type="email"
                            placeholder="Email"
                            v-model="formData.email"
                            class="w-full bg-transparent border border-white/10 rounded px-4 py-3 text-white placeholder:text-white/40"
                        />
                        <div class="flex items-center space-x-2 mt-4">
                            <input type="checkbox" id="newsletter" class="rounded border-white/10" />
                            <label for="newsletter" class="text-sm text-white/60">Email me with news and offers</label>
                        </div>
                    </div>

                    <!-- Shipping Section -->
                    <div class="border border-white/10 rounded p-4">
                        <h2 class="text-sm text-white/60 mb-4">Delivery</h2>
                        <div class="w-full flex items-center justify-between bg-black border border-white/10 rounded px-4 py-3 text-white hover:border-white/20">
                            <div class="flex items-center space-x-2">
                                <input type="radio" name="delivery" checked class="text-white" />
                                <span>Ship</span>
                            </div>
                            <div class="flex items-center">
                                <svg class="w-5 h-5 text-white/60" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" fill="none">
                                    <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </div>
                        </div>

                        <!-- Address Form -->
                        <div class="space-y-4 mt-4">
                            <!-- Country Selection -->
                            <select 
                                v-model="formData.country" 
                                class="w-full bg-transparent border border-white/10 rounded px-4 py-3 text-white"
                            >
                                <option value="ID">Indonesia</option>
                            </select>
                            
                            <!-- Name -->
                            <input
                                type="text"
                                placeholder="Full Name"
                                v-model="formData.name"
                                class="w-full bg-transparent border border-white/10 rounded px-4 py-3 text-white placeholder:text-white/40"
                            />

                            <!-- Address -->
                            <input
                                type="text"
                                placeholder="Address"
                                v-model="formData.address"
                                class="w-full bg-transparent border border-white/10 rounded px-4 py-3 text-white placeholder:text-white/40"
                            />

                            <!-- Subdistrict, City, District Grid -->
                            <div class="grid grid-cols-3 gap-4">
                                <input
                                    type="text"
                                    placeholder="Subdistrict"
                                    v-model="formData.subdistrict"
                                    class="w-full bg-transparent border border-white/10 rounded px-4 py-3 text-white placeholder:text-white/40"
                                />
                                <input
                                    type="text"
                                    placeholder="City"
                                    v-model="formData.city"
                                    class="w-full bg-transparent border border-white/10 rounded px-4 py-3 text-white placeholder:text-white/40"
                                />
                                <input
                                    type="text"
                                    placeholder="District"
                                    v-model="formData.district"
                                    class="w-full bg-transparent border border-white/10 rounded px-4 py-3 text-white placeholder:text-white/40"
                                />
                            </div>

                            <!-- Province and Postal Code -->
                            <div class="grid grid-cols-2 gap-4">
                                <select
                                    v-model="formData.province"
                                    class="w-full bg-transparent border border-white/10 rounded px-4 py-3 text-white"
                                >
                                    <option value="">Province</option>
                                    <option v-for="province in provinces" :key="province.value" :value="province.value">
                                        {{ province.label }}
                                    </option>
                                </select>
                                <input
                                    type="text"
                                    placeholder="Postal Code"
                                    v-model="formData.postalCode"
                                    class="w-full bg-transparent border border-white/10 rounded px-4 py-3 text-white placeholder:text-white/40"
                                />
                            </div>
                        </div>
                    </div>

                    <!-- Review Order -->
                    <div class="border border-white/10 rounded p-4">
                        <h2 class="text-sm text-white/60 mb-4">Review Order</h2>
                        <div class="flex items-center space-x-2 mb-4">
                            <input type="checkbox" id="saveInfo" class="rounded border-white/10" />
                            <label for="saveInfo" class="text-sm text-white/60">Save my information for a faster checkout</label>
                        </div>
                        <div class="flex justify-between items-center">
                            <router-link to="/" class="text-white hover:text-white/80 flex items-center space-x-2">
                                <svg class="w-4 h-4" viewBox="0 0 16 16" fill="none">
                                    <path d="M10 12L6 8l4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                <span>Return to cart</span>
                            </router-link>
                            <button class="bg-white text-black px-6 py-2 rounded hover:bg-white/90">
                                Continue to payment
                            </button>
                        </div>
                    </div>
                </div>
                
                <div class="hidden lg:block absolute left-1/2 top-100 bottom-0 w-px bg-white/10 transform -translate-x-1/2"></div>

                <!-- Right Column - Order Summary -->
                <div class="lg:sticky lg:top-8 h-fit pl-12 mt-[46px]"> <!-- Tambahkan mt-[46px] untuk menurunkan sejajar dengan form -->
                    <div class="border border-white/10 rounded p-6">
                        <!-- Cart Items -->
                        <div class="space-y-4 max-h-[40vh] overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                            <div v-for="item in cartItems" :key="item.id" class="flex items-center gap-4">
                                <div class="relative w-20 h-20 bg-white/5 rounded overflow-hidden">
                                    <img :src="item.image" :alt="item.name" class="w-full h-full object-cover" />
                                    <span class="absolute top-1 right-1 w-5 h-5 bg-white text-black text-xs font-medium rounded-full flex items-center justify-center">
                                        {{ item.quantity }}
                                    </span>
                                </div>
                                <div class="flex-1 min-w-0">
                                    <h3 class="text-white text-sm font-medium truncate">{{ item.name }}</h3>
                                    <p class="text-white/60 text-sm">{{ item.selectedSize }}</p>
                                </div>
                                <div class="text-white text-sm font-medium whitespace-nowrap">
                                    {{ formatPrice(calculateItemTotal(item)) }}
                                </div>
                            </div>
                        </div>

                        <!-- Discount -->
                        <div class="relative mt-6">
                            <input
                                type="text"
                                placeholder="Discount code or gift card"
                                class="w-full bg-transparent border border-white/10 rounded px-4 py-3 text-white placeholder:text-white/40"
                            />
                            <button class="absolute right-3 top-1/2 -translate-y-1/2 text-white hover:text-white/80">
                                Apply
                            </button>
                        </div>

                        <!-- Totals -->
                        <div class="mt-6 pt-4 border-t border-white/10">
                            <div class="space-y-2">
                                <div class="flex justify-between text-white/60">
                                    <span>Subtotal</span>
                                    <span class="text-white">{{ formatPrice(subtotal) }}</span>
                                </div>
                                <div class="flex justify-between text-white/60">
                                    <span>Shipping</span>
                                    <span class="text-white">{{ shipping }}</span>
                                </div>
                            </div>
                            <!-- Total -->
                            <div class="flex justify-between text-lg pt-4 mt-2 border-t border-white/10">
                                <div class="flex items-center gap-1">
                                    <span class="text-white/60">Total</span>
                                    <span class="text-white/60 text-xs">IDR</span>
                                </div>
                                <span class="text-white text-xl">{{ formatPrice(total) }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { cartState } from '@/components/navigation/navbar/partials/MenuConfig'

const router = useRouter()

const formData = ref({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    addressDetail: '',
    city: '',
    province: '',
    postalCode: '',
    phone: '',
    country: 'ID'
})

const provinces = [
    { value: 'jawa-barat', label: 'Jawa Barat' },
    { value: 'jawa-tengah', label: 'Jawa Tengah' },
    { value: 'jawa-timur', label: 'Jawa Timur' },
    { value: 'dki-jakarta', label: 'DKI Jakarta' },
    { value: 'banten', label: 'Banten' }
]

const hasItems = computed(() => cartState.items.length > 0)
const cartItems = computed(() => cartState.items)
const shipping = computed(() => 'Enter shipping address')

const subtotal = computed(() => {
    return cartState.items.reduce((total, item) => {
        const price = parseInt(item.price.replace(/[^\d]/g, ''))
        return total + (price * item.quantity)
    }, 0)
})

const total = computed(() => subtotal.value)

const calculateItemTotal = (item) => {
    const price = parseInt(item.price.replace(/[^\d]/g, ''))
    return price * item.quantity
}

const formatPrice = (price) => `Rp${price.toLocaleString()}`

// Redirect if cart is empty
if (!hasItems.value) {
    console.warn('Cart is empty')
}
</script>

<style scoped>
input[type="radio"], 
input[type="checkbox"] {
    accent-color: white;
}

.scrollbar-thin::-webkit-scrollbar {
    width: 6px;
}

.scrollbar-thin::-webkit-scrollbar-track {
    background: transparent;
}

.scrollbar-thin::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 3px;
}

select {
    background-color: transparent;
    appearance: none;
    background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%23FFFFFF' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E");
    background-position: right 0.5rem center;
    background-repeat: no-repeat;
    background-size: 1.5em 1.5em;
    padding-right: 2.5rem;
}

select option {
    background-color: black;
    color: white;
}

.container {
    max-width: 1280px;
    margin: 0 auto;
}

@media (min-width: 1024px) {

    .grid::before {
        content: '';
        position: absolute;
        left: 50%;
        top: 0;
        bottom: 0;
        width: 1px;
        background-color: rgba(255, 255, 255, 0.1);
        transform: translateX(-50%);
    }
}
</style>
```