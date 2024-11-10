<template>
    <div class="min-h-screen bg-black p-28">
        <!-- Header -->
        <div class="mb-8 flex justify-between items-center">
            <div>
                <div class="flex items-center gap-4">
                    <button
                        @click="goBackToCollections"
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
                            {{ collection?.name }}
                        </h1>
                        <p class="text-zinc-400 mt-1 tracking-wide">
                            Manage products in this collection
                        </p>
                    </div>
                </div>
            </div>
            <button
                @click="openAddProductModal"
                class="bg-purple-600 text-white px-4 py-2.5 rounded-lg hover:bg-purple-700 transition-all duration-300 flex items-center space-x-2 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-black"
            >
                <svg
                    class="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                >
                    <path
                        d="M12 4v16m8-8H4"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </svg>
                <span>Add Product</span>
            </button>
        </div>

        <!-- Search and Filter Section -->
        <div class="bg-zinc-900/50 rounded-xl border border-zinc-800 p-6 mb-8">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
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

                <!-- Category Filter -->
                <select
                    v-model="categoryFilter"
                    class="bg-black border border-zinc-800 text-white rounded-lg px-4 py-2.5 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all duration-300"
                >
                    <option value="">All Categories</option>
                    <option
                        v-for="category in productCategories"
                        :key="category"
                        :value="category"
                    >
                        {{ category }}
                    </option>
                </select>

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
                                Category
                            </th>
                            <th
                                class="px-6 py-4 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider"
                            >
                                Status
                            </th>
                            <th
                                class="px-6 py-4 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider"
                            >
                                Stock
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
                                    class="px-3 py-1 text-xs font-medium rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700"
                                >
                                    {{ product.category }}
                                </span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span :class="getStatusClass(product.status)">
                                    {{ formatStatus(product.status) }}
                                </span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm text-zinc-300 font-mono">
                                    {{ product.stock }}
                                </div>
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
        <div
            v-if="showModal"
            class="fixed inset-0 z-50 overflow-y-auto"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
        >
            <div
                class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
            >
                <!-- Background overlay -->
                <div
                    class="fixed inset-0 bg-black bg-opacity-75 transition-opacity"
                    aria-hidden="true"
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

                            <!-- Category -->
                            <div>
                                <label
                                    class="block text-sm font-medium text-zinc-400 mb-1"
                                >
                                    Category
                                </label>
                                <select
                                    v-model="productForm.category"
                                    class="w-full bg-black border border-zinc-800 text-white rounded-lg px-4 py-2.5 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all duration-300"
                                >
                                    <option
                                        v-for="category in productCategories"
                                        :key="category"
                                        :value="category"
                                    >
                                        {{ category }}
                                    </option>
                                </select>
                            </div>

                            <!-- Stock -->
                            <div>
                                <label
                                    class="block text-sm font-medium text-zinc-400 mb-1"
                                >
                                    Stock
                                </label>
                                <input
                                    type="number"
                                    v-model="productForm.stock"
                                    class="w-full bg-black border border-zinc-800 text-white rounded-lg px-4 py-2.5 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all duration-300"
                                    required
                                    min="0"
                                />
                            </div>

                            <!-- Collection -->
                            <div>
                                <label
                                    class="block text-sm font-medium text-zinc-400 mb-1"
                                >
                                    Collection
                                </label>
                                <select
                                    v-model="productForm.collection"
                                    class="w-full bg-black border border-zinc-800 text-white rounded-lg px-4 py-2.5 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all duration-300"
                                >
                                    <option value="">Select Collection</option>
                                    <option
                                        v-for="collection in collectionsData"
                                        :key="collection.id"
                                        :value="collection.id"
                                    >
                                        {{ collection.name }}
                                    </option>
                                </select>
                            </div>

                            <!-- Status -->
                            <div>
                                <label
                                    class="block text-sm font-medium text-zinc-400 mb-1"
                                >
                                    Status
                                </label>
                                <select
                                    v-model="productForm.status"
                                    class="w-full bg-black border border-zinc-800 text-white rounded-lg px-4 py-2.5 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all duration-300"
                                >
                                    <option value="in_stock">In Stock</option>
                                    <option value="low_stock">Low Stock</option>
                                    <option value="out_of_stock">
                                        Out of Stock
                                    </option>
                                </select>
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
import { productsData, productCategories, collectionsData } from './MenuConfig'

const router = useRouter()

const props = defineProps({
    name: {
        type: String,
        required: true,
    },
})

// Get current collection
const collection = computed(() => {
    return collectionsData.find(c => c.slug === props.name)
})

// Get products for this collection
const collectionProducts = computed(() => {
    return productsData.filter(
        product => product.collection === collection.value?.id,
    )
})

// Search and Filter
const searchQuery = ref('')
const categoryFilter = ref('')
const statusFilter = ref('')

// Modal and Form State
const showModal = ref(false)
const editingProduct = ref(null)
const productForm = ref({
    name: '',
    price: 0,
    category: '',
    status: 'in_stock',
    stock: 0,
    collection: collection.value?.id,
})

// Filtered Products
const filteredProducts = computed(() => {
    return collectionProducts.value.filter(product => {
        const matchesSearch = product.name
            .toLowerCase()
            .includes(searchQuery.value.toLowerCase())
        const matchesCategory =
            !categoryFilter.value || product.category === categoryFilter.value
        const matchesStatus =
            !statusFilter.value || product.status === statusFilter.value
        return matchesSearch && matchesCategory && matchesStatus
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
const goBackToCollections = () => {
    router.push('/admin/collections')
}

// CRUD Operations
const openAddProductModal = () => {
    editingProduct.value = null
    productForm.value = {
        name: '',
        price: 0,
        category: productCategories[0],
        status: 'in_stock',
        stock: 0,
        collection: collection.value?.id,
    }
    showModal.value = true
}

const editProduct = product => {
    editingProduct.value = product
    productForm.value = { ...product }
    showModal.value = true
}

const closeModal = () => {
    showModal.value = false
    editingProduct.value = null
    productForm.value = {
        name: '',
        price: 0,
        category: productCategories[0],
        status: 'in_stock',
        stock: 0,
        collection: collection.value?.id,
    }
}

const saveProduct = () => {
    if (editingProduct.value) {
        // Update existing product
        const index = productsData.findIndex(
            p => p.id === editingProduct.value.id,
        )
        if (index !== -1) {
            productsData[index] = {
                ...productsData[index],
                ...productForm.value,
            }
        }
    } else {
        // Add new product
        const newProduct = {
            id: productsData.length + 1,
            image: '/api/placeholder/80/80',
            ...productForm.value,
            lastUpdated: new Date().toISOString().split('T')[0],
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
</style>
