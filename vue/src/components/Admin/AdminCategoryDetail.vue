<template>
    <div class="min-h-screen bg-black p-28">
        <!-- Header with Search and Filters -->
        <div class="mb-8">
            <div class="flex items-start justify-between mb-6">
                <div class="flex items-center gap-4">
                    <button
                        @click="goBackToCategories"
                        class="text-zinc-400 hover:text-purple-400 transition-colors duration-200"
                    >
                        <svg
                            class="w-6 h-6"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                        >
                            <path
                                d="M10 19l-7-7m0 0l7-7m-7 7h18"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                        </svg>
                    </button>
                    <div>
                        <h1
                            class="text-3xl font-bold text-white tracking-wider uppercase"
                        >
                            {{ category?.name }}
                        </h1>
                        <p class="text-zinc-400 mt-1 tracking-wide">
                            Manage products in
                            {{ category?.name.toLowerCase() }} category
                        </p>
                    </div>
                </div>
            </div>

            <!-- Integrated Search and Filter -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <!-- Search -->
                <div class="relative">
                    <input
                        type="text"
                        v-model="searchQuery"
                        class="w-full bg-black border border-zinc-800 text-white rounded-lg pl-10 pr-4 py-2.5 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all duration-300"
                        placeholder="Search products..."
                    />
                    <svg
                        class="w-5 h-5 absolute left-3 top-3 text-zinc-400"
                        viewBox="0 0 24 24"
                        fill="none"
                    >
                        <path
                            d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>
                </div>

                <!-- Status Filter -->
                <select
                    v-model="statusFilter"
                    class="bg-black border border-zinc-800 text-white rounded-lg px-4 py-2.5 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all duration-300"
                >
                    <option value="">All Status</option>
                    <option value="in_stock">In Stock</option>
                    <option value="low_stock">Low Stock</option>
                    <option value="out_of_stock">Out of Stock</option>
                </select>
            </div>
        </div>

        <!-- Products Table -->
        <div
            class="bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden"
        >
            <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-zinc-800">
                    <thead class="bg-zinc-900/50">
                        <tr>
                            <th
                                class="px-6 py-4 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider"
                            >
                                Product Info
                            </th>
                            <th
                                class="px-6 py-4 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider"
                            >
                                Price
                            </th>
                            <th
                                class="px-6 py-4 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider"
                            >
                                Status
                            </th>
                            <th
                                class="px-6 py-4 text-right text-xs font-medium text-zinc-400 uppercase tracking-wider"
                            >
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-zinc-800">
                        <tr
                            v-for="product in filteredProducts"
                            :key="product.id"
                            class="hover:bg-zinc-800/50 transition-colors duration-200"
                        >
                            <td class="px-6 py-4">
                                <div class="flex items-center">
                                    <div
                                        class="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border border-zinc-700"
                                    >
                                        <img
                                            :src="product.image"
                                            class="h-16 w-16 object-cover"
                                            :alt="product.name"
                                        />
                                    </div>
                                    <div class="ml-4">
                                        <div
                                            class="text-sm font-medium text-white"
                                        >
                                            {{ product.name }}
                                        </div>
                                        <!-- Size Stock Info -->
                                        <div
                                            class="mt-1 grid grid-cols-5 gap-2"
                                        >
                                            <div
                                                v-for="(
                                                    stock, size
                                                ) in product.sizeStock"
                                                :key="size"
                                                class="text-xs px-2 py-1 rounded bg-zinc-800/50 border border-zinc-700"
                                            >
                                                <span class="text-zinc-400"
                                                    >{{ size }}:</span
                                                >
                                                <span
                                                    :class="{
                                                        'text-emerald-400':
                                                            stock > 10,
                                                        'text-yellow-400':
                                                            stock <= 10 &&
                                                            stock > 0,
                                                        'text-red-400':
                                                            stock === 0,
                                                    }"
                                                    >{{ stock }}</span
                                                >
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm font-mono text-white">
                                    Rp{{ formatPrice(product.price) }}
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span
                                    :class="
                                        getStatusClass(
                                            getOverallStatus(product.sizeStock),
                                        )
                                    "
                                >
                                    {{
                                        formatStatus(
                                            getOverallStatus(product.sizeStock),
                                        )
                                    }}
                                </span>
                            </td>
                            <td
                                class="px-6 py-4 whitespace-nowrap text-right space-x-3"
                            >
                                <button
                                    @click="editProduct(product)"
                                    class="text-purple-400 hover:text-purple-300 transition-colors duration-200 text-sm"
                                >
                                    Edit
                                </button>
                                <button
                                    @click="deleteProduct(product.id)"
                                    class="text-red-400 hover:text-red-300 transition-colors duration-200 text-sm"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Product Modal -->
        <div v-if="showModal" class="fixed inset-0 z-50 overflow-y-auto">
            <div
                class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
            >
                <div
                    class="fixed inset-0 bg-black bg-opacity-75 transition-opacity"
                ></div>

                <div
                    class="inline-block align-bottom bg-zinc-900 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                >
                    <div class="bg-zinc-900 px-4 pt-5 pb-4 sm:p-6">
                        <h3 class="text-lg font-medium text-white mb-4">
                            {{
                                editingProduct
                                    ? 'Edit Product'
                                    : 'Add New Product'
                            }}
                        </h3>

                        <form @submit.prevent="saveProduct" class="space-y-4">
                            <!-- Name -->
                            <div>
                                <label
                                    class="block text-sm font-medium text-zinc-400 mb-1"
                                >
                                    Product Name
                                </label>
                                <input
                                    type="text"
                                    v-model="productForm.name"
                                    class="w-full bg-black border border-zinc-800 text-white rounded-lg px-4 py-2.5 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all duration-300"
                                    required
                                />
                            </div>

                            <!-- Price -->
                            <div>
                                <label
                                    class="block text-sm font-medium text-zinc-400 mb-1"
                                >
                                    Price
                                </label>
                                <div class="relative">
                                    <div
                                        class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                                    >
                                        <span class="text-zinc-400">Rp</span>
                                    </div>
                                    <input
                                        type="number"
                                        v-model="productForm.price"
                                        class="w-full bg-black border border-zinc-800 text-white rounded-lg pl-10 pr-4 py-2.5 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all duration-300"
                                        required
                                        min="0"
                                    />
                                </div>
                            </div>

                            <!-- Size Stock -->
                            <div>
                                <label
                                    class="block text-sm font-medium text-zinc-400 mb-2"
                                >
                                    Stock by Size
                                </label>
                                <div class="space-y-3">
                                    <div
                                        v-for="size in availableSizes"
                                        :key="size"
                                        class="flex items-center space-x-3"
                                    >
                                        <span
                                            class="w-12 text-sm text-zinc-400"
                                            >{{ size }}</span
                                        >
                                        <input
                                            type="number"
                                            v-model="
                                                productForm.sizeStock[size]
                                            "
                                            class="flex-1 bg-black border border-zinc-800 text-white rounded-lg px-4 py-2 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all duration-300"
                                            min="0"
                                            placeholder="Enter stock"
                                        />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div
                        class="bg-zinc-800/50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse"
                    >
                        <button
                            @click="saveProduct"
                            class="w-full inline-flex justify-center rounded-lg border border-transparent shadow-sm px-4 py-2 bg-purple-600 text-base font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:ml-3 sm:w-auto sm:text-sm transition-all duration-200"
                        >
                            {{
                                editingProduct ? 'Save Changes' : 'Add Product'
                            }}
                        </button>
                        <button
                            @click="closeModal"
                            class="mt-3 w-full inline-flex justify-center rounded-lg border border-zinc-600 shadow-sm px-4 py-2 bg-black text-base font-medium text-zinc-300 hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm transition-all duration-200"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { productsData, categoriesData, availableSizes } from './MenuConfig'

const router = useRouter()

const props = defineProps({
    name: {
        type: String,
        required: true,
    },
})

// Get current category
const category = computed(() => {
    return categoriesData.find(c => c.slug === props.name)
})

// Initialize size stock
const initializeSizeStock = () => {
    const sizeStock = {}
    availableSizes.forEach(size => {
        sizeStock[size] = 0
    })
    return sizeStock
}

// Get products for this category
const categoryProducts = computed(() => {
    return productsData.filter(
        product => product.category === category.value?.name,
    )
})

// Search and Filter
const searchQuery = ref('')
const statusFilter = ref('')

// Modal and Form State
const showModal = ref(false)
const editingProduct = ref(null)
const productForm = ref({
    name: '',
    price: 0,
    category: category.value?.name || '',
    sizeStock: initializeSizeStock(),
})

// Helper function to determine overall status based on size stock
const getOverallStatus = sizeStock => {
    if (!sizeStock) return 'out_of_stock'

    const hasAnyStock = Object.values(sizeStock).some(stock => stock > 0)
    const hasLowStock = Object.values(sizeStock).some(
        stock => stock > 0 && stock <= 5,
    )

    if (!hasAnyStock) return 'out_of_stock'
    if (hasLowStock) return 'low_stock'
    return 'in_stock'
}

// Filtered Products
const filteredProducts = computed(() => {
    return categoryProducts.value.filter(product => {
        const matchesSearch = product.name
            .toLowerCase()
            .includes(searchQuery.value.toLowerCase())
        const matchesStatus =
            !statusFilter.value ||
            getOverallStatus(product.sizeStock) === statusFilter.value
        return matchesSearch && matchesStatus
    })
})

// Utility Functions
const formatPrice = price => {
    return new Intl.NumberFormat('id-ID', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(price)
}

const getStatusClass = status => {
    const baseClasses = 'px-3 py-1 text-xs font-medium rounded-full border'
    const statusClasses = {
        in_stock: 'bg-emerald-900/30 text-emerald-400 border-emerald-700/50',
        low_stock: 'bg-yellow-900/30 text-yellow-400 border-yellow-700/50',
        out_of_stock: 'bg-red-900/30 text-red-400 border-red-700/50',
    }
    return `${baseClasses} ${statusClasses[status]}`
}

const formatStatus = status => {
    return status
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
}

// Navigation
const goBackToCategories = () => {
    router.push('/admin/categories')
}

// CRUD Operations
const editProduct = product => {
    editingProduct.value = product
    productForm.value = {
        ...product,
        sizeStock: product.sizeStock
            ? { ...product.sizeStock }
            : initializeSizeStock(),
    }
    showModal.value = true
}

const closeModal = () => {
    showModal.value = false
    editingProduct.value = null
    productForm.value = {
        name: '',
        price: 0,
        category: category.value?.name || '',
        sizeStock: initializeSizeStock(),
    }
}

const saveProduct = () => {
    const now = new Date().toISOString().split('T')[0]

    if (editingProduct.value) {
        // Update existing product
        const index = productsData.findIndex(
            p => p.id === editingProduct.value.id,
        )
        if (index !== -1) {
            productsData[index] = {
                ...productsData[index],
                ...productForm.value,
                category: category.value?.name,
                lastUpdated: now,
            }
        }
    } else {
        // Add new product
        const newProduct = {
            id: Math.max(...productsData.map(p => p.id)) + 1,
            image: '/api/placeholder/80/80',
            category: category.value?.name,
            ...productForm.value,
            lastUpdated: now,
        }
        productsData.push(newProduct)
    }
    closeModal()
}

const deleteProduct = productId => {
    if (
        confirm(
            'Are you sure you want to delete this product? This action cannot be undone.',
        )
    ) {
        const index = productsData.findIndex(p => p.id === productId)
        if (index !== -1) {
            productsData.splice(index, 1)
        }
    }
}
</script>

<style scoped>
.font-mono {
    font-family: 'JetBrains Mono', monospace;
}

/* Input autofill styling */
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus {
    -webkit-text-fill-color: white;
    -webkit-box-shadow: 0 0 0px 1000px #000000 inset;
    transition: background-color 5000s ease-in-out 0s;
}

/* Modal transition */
.modal-enter-active,
.modal-leave-active {
    transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
    opacity: 0;
}
</style>
