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

                    <!-- Shipping Section with modified delivery options -->
                    <div class="border border-white/10 rounded p-4">
                        <h2 class="text-sm text-white/60 mb-4">Delivery</h2>
                        <!-- Profile Data Option -->
                        <button 
                            class="w-full mb-4"
                            @click="setDeliveryOption('profile')"
                        >
                            <div 
                                class="w-full flex items-center justify-between bg-black border border-white/10 rounded px-4 py-3 text-white hover:border-white/20"
                                :class="{ 'border-white/30': deliveryOption === 'profile' }"
                            >
                                <div class="flex items-center space-x-2">
                                    <input 
                                        type="radio" 
                                        name="delivery" 
                                        :checked="deliveryOption === 'profile'"
                                        class="text-white" 
                                    />
                                    <span>Use Profile Data</span>
                                </div>
                                <div class="flex items-center">
                                    <svg class="w-5 h-5 text-white/60" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" fill="none">
                                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </div>
                            </div>
                        </button>

                        <!-- Manual Fill Option -->
                        <button 
                            class="w-full"
                            @click="setDeliveryOption('manual')"
                        >
                            <div 
                                class="w-full flex items-center justify-between bg-black border border-white/10 rounded px-4 py-3 text-white hover:border-white/20"
                                :class="{ 'border-white/30': deliveryOption === 'manual' }"
                            >
                                <div class="flex items-center space-x-2">
                                    <input 
                                        type="radio" 
                                        name="delivery" 
                                        :checked="deliveryOption === 'manual'"
                                        class="text-white" 
                                    />
                                    <span>Fill Manually</span>
                                </div>
                                <div class="flex items-center">
                                    <svg class="w-5 h-5 text-white/60" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" fill="none">
                                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </div>
                            </div>
                        </button>

                        <!-- Profile Addresses Selection (shown when profile option is selected) -->
                        <div v-if="deliveryOption === 'profile' && savedAddresses.length > 0" class="mt-4 space-y-4">
                            <div v-for="(address, index) in savedAddresses" :key="index">
                                <button 
                                    class="w-full text-left"
                                    @click="selectAddress(index)"
                                >
                                    <div 
                                        class="p-4 border rounded hover:border-white/20 transition-colors"
                                        :class="selectedAddressIndex === index ? 'border-white/30 bg-white/5' : 'border-white/10'"
                                    >
                                        <div class="flex items-center space-x-3">
                                            <input 
                                                type="radio" 
                                                name="address" 
                                                :checked="selectedAddressIndex === index"
                                                class="text-white" 
                                            />
                                            <div class="flex-1">
                                                <p class="text-white font-medium">{{ address.name }}</p>
                                                <p class="text-white/60 text-sm mt-1">{{ address.address }}</p>
                                                <p class="text-white/60 text-sm">
                                                    {{ address.subdistrict }}, {{ address.city }}, {{ address.district }}
                                                </p>
                                                <p class="text-white/60 text-sm">
                                                    {{ address.province }}, {{ address.postalCode }}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </button>
                            </div>
                        </div>

                        <!-- Manual Address Form (shown when manual option is selected) -->
                        <div v-if="deliveryOption === 'manual'" class="space-y-4 mt-4">
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
                <div class="lg:sticky lg:top-8 h-fit mt-[46px]"> <!-- Tambahkan mt-[46px] untuk menurunkan sejajar dengan form -->
                    <div class="border border-white/10 rounded p-5">
                        <!-- Cart Items -->
                        <div class="space-y-4 max-h-[40vh] overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent p-1">
                            <div v-for="item in cartItems" :key="item.id" class="flex gap-4">
                                <!-- Product Image -->
                                <div class="relative w-20 h-20 bg-white/5 rounded overflow-hidden">
                                    <img :src="item.image" :alt="item.name" class="w-full h-full object-cover" />
                                </div>
                                
                                <!-- Product Details -->
                                <div class="flex-1 min-w-0 flex justify-between">
                                    <!-- Left side: Name, Size, Quantity -->
                                    <div class="flex flex-col">
                                        <h3 class="text-white text-sm font-medium truncate">{{ item.name }}</h3>
                                        <p class="text-white/60 text-sm">{{ item.selectedSize }}</p>
                                    </div>
                                    
                                    <!-- Right side: Price calculation -->
                                    <div class="text-right">
                                        <p class="text-white/60 text-sm">
                                            {{ item.quantity }} x {{ formatPrice(parseInt(item.price.replace(/[^\d]/g, ''))) }}
                                        </p>
                                        <p class="text-white text-sm font-medium mt-1">
                                            {{ formatPrice(calculateItemTotal(item)) }}
                                        </p>
                                    </div>
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
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { cartState } from '@/components/navigation/navbar/partials/MenuConfig'

const router = useRouter()
const deliveryOption = ref('profile') // Default to profile option
const selectedAddressIndex = ref(0) // Tambahkan ini
const savedAddresses = ref([]) // Tambahkan ini

const formData = ref({
    email: '',
    name: '',
    address: '',
    subdistrict: '',
    city: '',
    district: '',
    province: '',
    postalCode: '',
    country: 'ID'
})

// Simulated function to fetch profile data - replace with actual API call
const fetchProfileData = async () => {
    try {
        // Simulate API call - replace with actual API endpoint
        // const response = await fetch('/api/addresses')
        // const data = await response.json()
        
        // Simulated multiple addresses
        savedAddresses.value = [
            {
                name: 'Phill Less',
                address: 'Le Grande Driving Range',
                subdistrict: 'Kenjeran',
                city: 'Surabaya',
                district: 'Surabaya Timur',
                province: 'Jawa Timur',
                postalCode: '12520'
            },
            {
                name: 'Om Cali',
                address: 'Jl. BDG, Kenjeran dan Graha',
                subdistrict: 'Bukit Darmo',
                city: 'Surabaya',
                district: 'Surabaya Barat',
                province: 'Jawa Timur',
                postalCode: '180704'
            }
        ]

        // If profile option is selected, populate form data with first address
        if (deliveryOption.value === 'profile') {
            selectAddress(0)
        }
    } catch (error) {
        console.error('Error fetching profile data:', error)
    }
}

const selectAddress = (index) => {
    selectedAddressIndex.value = index
    const selectedAddress = savedAddresses.value[index]
    
    formData.value = {
        ...formData.value,
        name: selectedAddress.name,
        address: selectedAddress.address,
        subdistrict: selectedAddress.subdistrict,
        city: selectedAddress.city,
        district: selectedAddress.district,
        province: selectedAddress.province,
        postalCode: selectedAddress.postalCode
    }
}

const setDeliveryOption = (option) => {
    deliveryOption.value = option
    if (option === 'profile' && savedAddresses.value.length > 0) {
        selectAddress(selectedAddressIndex.value)
    } else if (option === 'manual') {
        // Reset form data when switching to manual
        formData.value = {
            email: formData.value.email, // Preserve email
            name: '',
            address: '',
            subdistrict: '',
            city: '',
            district: '',
            province: '',
            postalCode: '',
            country: 'ID'
        }
    }
}

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

// Fetch profile data when component mounts
onMounted(() => {
    fetchProfileData()
})

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
        top: ;
        bottom: 0;
        width: 1px;
        background-color: rgba(255, 255, 255, 0.1);
        transform: translateX(-50%);
    }
}
</style>
```