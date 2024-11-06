<template>
    <!-- Search and Filter Section -->
    <div class="bg-white p-6 rounded-xl shadow-sm mb-6">
        <div
            class="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        >
            <!-- Search -->
            <div class="relative flex-1">
                <span class="absolute inset-y-0 left-0 pl-3 flex items-center">
                    <svg
                        class="h-5 w-5 text-gray-400"
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
                </span>
                <input
                    type="text"
                    v-model="searchQuery"
                    class="pl-10 pr-4 py-2 w-full border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Search products..."
                />
            </div>

            <!-- Filters -->
            <div class="flex flex-wrap gap-4">
                <select
                    v-model="categoryFilter"
                    class="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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

                <select
                    v-model="statusFilter"
                    class="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                    <option value="">All Status</option>
                    <option value="in_stock">In Stock</option>
                    <option value="low_stock">Low Stock</option>
                    <option value="out_of_stock">Out of Stock</option>
                </select>

                <!-- Add Product Button -->
                <button
                    @click="openAddProductModal"
                    class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center"
                >
                    <svg
                        class="w-5 h-5 mr-2"
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
                    Add Product
                </button>
            </div>
        </div>
    </div>

    <!-- Products Table -->
    <div class="bg-white rounded-xl shadow-sm overflow-hidden">
        <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                    <tr>
                        <th
                            v-for="header in productTableHeaders"
                            :key="header.key"
                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            {{ header.label }}
                        </th>
                        <th class="px-6 py-3 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-for="product in filteredProducts" :key="product.id">
                        <!-- Product Info -->
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="flex items-center">
                                <div class="h-20 w-20 flex-shrink-0">
                                    <img
                                        :src="product.image"
                                        class="h-20 w-20 rounded-lg object-cover"
                                        :alt="product.name"
                                    />
                                </div>
                                <div class="ml-4">
                                    <div
                                        class="text-sm font-medium text-gray-900"
                                    >
                                        {{ product.name }}
                                    </div>
                                </div>
                            </div>
                        </td>

                        <!-- Price -->
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-sm text-gray-900">
                                Rp{{ product.price.toFixed(2) }}
                            </div>
                        </td>

                        <!-- Category -->
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-sm text-gray-900">
                                {{ product.category }}
                            </div>
                        </td>

                        <!-- Status -->
                        <td class="px-6 py-4 whitespace-nowrap">
                            <span
                                class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                                :class="getStatusClass(product.status)"
                            >
                                {{ formatStatus(product.status) }}
                            </span>
                        </td>

                        <!-- Stock -->
                        <td
                            class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                        >
                            {{ product.stock }}
                        </td>

                        <!-- SKU -->
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-sm text-gray-500">
                                {{ product.sku }}
                            </div>
                        </td>

                        <!-- Last Updated -->
                        <td
                            class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                        >
                            {{ formatDate(product.lastUpdated) }}
                        </td>

                        <!-- Actions -->
                        <td
                            class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
                        >
                            <button
                                @click="editProduct(product)"
                                class="text-blue-600 hover:text-blue-900 mr-4"
                            >
                                Edit
                            </button>
                            <button
                                @click="deleteProduct(product.id)"
                                class="text-red-600 hover:text-red-900"
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Pagination -->
        <div class="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
            <div class="flex items-center justify-between">
                <div class="flex-1 flex justify-between sm:hidden">
                    <button
                        @click="previousPage"
                        :disabled="currentPage === 1"
                        class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                        Previous
                    </button>
                    <button
                        @click="nextPage"
                        :disabled="currentPage === totalPages"
                        class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                        Next
                    </button>
                </div>
                <div
                    class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between"
                >
                    <div>
                        <p class="text-sm text-gray-700">
                            Showing
                            <span class="font-medium">{{
                                startIndex + 1
                            }}</span>
                            to
                            <span class="font-medium">{{ endIndex }}</span>
                            of
                            <span class="font-medium">{{ totalProducts }}</span>
                            results
                        </p>
                    </div>
                    <div>
                        <nav
                            class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                        >
                            <button
                                @click="previousPage"
                                :disabled="currentPage === 1"
                                class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                            >
                                Previous
                            </button>
                            <button
                                v-for="page in displayedPages"
                                :key="page"
                                @click="goToPage(page)"
                                :class="[
                                    currentPage === page
                                        ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                                        : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50',
                                    'relative inline-flex items-center px-4 py-2 border text-sm font-medium',
                                ]"
                            >
                                {{ page }}
                            </button>
                            <button
                                @click="nextPage"
                                :disabled="currentPage === totalPages"
                                class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                            >
                                Next
                            </button>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Add/Edit Product Modal -->
    <div
        v-if="showModal"
        class="fixed z-10 inset-0 overflow-y-auto"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
    >
        <div
            class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
        >
            <div
                class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                aria-hidden="true"
            ></div>
            <span
                class="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true"
                >&#8203;</span
            >
            <div
                class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
            >
                <div>
                    <h3
                        class="text-lg leading-6 font-medium text-gray-900"
                        id="modal-title"
                    >
                        {{
                            editingProduct ? 'Edit Product' : 'Add New Product'
                        }}
                    </h3>
                    <div class="mt-2">
                        <form @submit.prevent="saveProduct" class="space-y-4">
                            <!-- Name -->
                            <div>
                                <label
                                    for="name"
                                    class="block text-sm font-medium text-gray-700"
                                    >Product Name</label
                                >
                                <input
                                    type="text"
                                    id="name"
                                    v-model="productForm.name"
                                    class="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                            </div>

                            <!-- Price -->
                            <div>
                                <label
                                    for="price"
                                    class="block text-sm font-medium text-gray-700"
                                    >Price</label
                                >
                                <div class="mt-1 relative rounded-md shadow-sm">
                                    <div
                                        class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                                    >
                                        <span class="text-gray-500 sm:text-sm"
                                            >$</span
                                        >
                                    </div>
                                    <input
                                        type="number"
                                        id="price"
                                        v-model="productForm.price"
                                        class="pl-7 block w-full border rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
                                        required
                                        step="0.01"
                                        min="0"
                                    />
                                </div>
                            </div>

                            <!-- Category -->
                            <div>
                                <label
                                    for="category"
                                    class="block text-sm font-medium text-gray-700"
                                    >Category</label
                                >
                                <select
                                    id="category"
                                    v-model="productForm.category"
                                    class="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
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
                                    for="stock"
                                    class="block text-sm font-medium text-gray-700"
                                    >Stock</label
                                >
                                <input
                                    type="number"
                                    id="stock"
                                    v-model="productForm.stock"
                                    class="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
                                    required
                                    min="0"
                                />
                            </div>

                            <!-- SKU -->
                            <div>
                                <label
                                    for="sku"
                                    class="block text-sm font-medium text-gray-700"
                                    >SKU</label
                                >
                                <input
                                    type="text"
                                    id="sku"
                                    v-model="productForm.sku"
                                    class="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                            </div>

                            <!-- Status -->
                            <div>
                                <label
                                    for="status"
                                    class="block text-sm font-medium text-gray-700"
                                    >Status</label
                                >
                                <select
                                    id="status"
                                    v-model="productForm.status"
                                    class="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
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
                </div>
                <div
                    class="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense"
                >
                    <button
                        type="button"
                        @click="saveProduct"
                        class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:col-start-2 sm:text-sm"
                    >
                        {{ editingProduct ? 'Save Changes' : 'Add Product' }}
                    </button>
                    <button
                        type="button"
                        @click="closeModal"
                        class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import {
    productsData,
    productTableHeaders,
    productCategories,
} from './MenuConfig'

// Search and Filter
const searchQuery = ref('')
const categoryFilter = ref('')
const statusFilter = ref('')

// Pagination
const itemsPerPage = 10
const currentPage = ref(1)

// Modal and Form
const showModal = ref(false)
const editingProduct = ref(null)
const productForm = ref({
    name: '',
    price: 0,
    category: productCategories[0],
    status: 'in_stock',
    stock: 0,
    sku: '',
})

// Computed Properties
const filteredProducts = computed(() => {
    return productsData.filter(product => {
        const matchesSearch =
            product.name
                .toLowerCase()
                .includes(searchQuery.value.toLowerCase()) ||
            product.sku.toLowerCase().includes(searchQuery.value.toLowerCase())
        const matchesCategory =
            !categoryFilter.value || product.category === categoryFilter.value
        const matchesStatus =
            !statusFilter.value || product.status === statusFilter.value
        return matchesSearch && matchesCategory && matchesStatus
    })
})

const totalProducts = computed(() => filteredProducts.value.length)
const totalPages = computed(() => Math.ceil(totalProducts.value / itemsPerPage))
const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage)
const endIndex = computed(() =>
    Math.min(startIndex.value + itemsPerPage, totalProducts.value),
)

const displayedPages = computed(() => {
    const pages = []
    const maxVisiblePages = 5
    let startPage = Math.max(
        1,
        currentPage.value - Math.floor(maxVisiblePages / 2),
    )
    let endPage = Math.min(totalPages.value, startPage + maxVisiblePages - 1)

    if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1)
    }

    for (let i = startPage; i <= endPage; i++) {
        pages.push(i)
    }
    return pages
})

// Methods
const getStatusClass = status => {
    const classes = {
        in_stock: 'bg-green-100 text-green-800',
        low_stock: 'bg-yellow-100 text-yellow-800',
        out_of_stock: 'bg-red-100 text-red-800',
    }
    return classes[status] || 'bg-gray-100 text-gray-800'
}

const formatStatus = status => {
    return status
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
}

const formatDate = date => {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })
}

const openAddProductModal = () => {
    editingProduct.value = null
    productForm.value = {
        name: '',
        price: 0,
        category: productCategories[0],
        status: 'in_stock',
        stock: 0,
        sku: '',
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
        sku: '',
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
                lastUpdated: new Date().toISOString().split('T')[0],
            }
        }
    } else {
        // Add new product
        const newProduct = {
            id: productsData.length + 1,
            ...productForm.value,
            lastUpdated: new Date().toISOString().split('T')[0],
            image: '/api/placeholder/80/80',
        }
        productsData.push(newProduct)
    }
    closeModal()
}

const deleteProduct = productId => {
    if (confirm('Are you sure you want to delete this product?')) {
        const index = productsData.findIndex(p => p.id === productId)
        if (index !== -1) {
            productsData.splice(index, 1)
        }
    }
}

// Pagination Methods
const previousPage = () => {
    if (currentPage.value > 1) {
        currentPage.value--
    }
}

const nextPage = () => {
    if (currentPage.value < totalPages.value) {
        currentPage.value++
    }
}

const goToPage = page => {
    currentPage.value = page
}
</script>

<style scoped>
/* Add any additional styles here */
</style>
