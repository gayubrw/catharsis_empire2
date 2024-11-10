<template>
    <div class="min-h-screen bg-black p-28">
        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div class="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-zinc-400 text-sm">Total Products</p>
                        <p class="text-2xl font-bold text-white mt-1">
                            {{ filteredProducts.length }}
                        </p>
                    </div>
                    <div class="bg-purple-500/10 p-3 rounded-lg">
                        <svg
                            class="w-6 h-6 text-purple-500"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                        >
                            <path
                                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                        </svg>
                    </div>
                </div>
            </div>

            <div class="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-zinc-400 text-sm">In Stock</p>
                        <p class="text-2xl font-bold text-emerald-500 mt-1">
                            {{
                                filteredProducts.filter(
                                    p =>
                                        getOverallStatus(p.sizeStock) ===
                                        'in_stock',
                                ).length
                            }}
                        </p>
                    </div>
                    <div class="bg-emerald-500/10 p-3 rounded-lg">
                        <svg
                            class="w-6 h-6 text-emerald-500"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                        >
                            <path
                                d="M5 13l4 4L19 7"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                        </svg>
                    </div>
                </div>
            </div>

            <div class="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-zinc-400 text-sm">Low Stock</p>
                        <p class="text-2xl font-bold text-yellow-500 mt-1">
                            {{
                                filteredProducts.filter(
                                    p =>
                                        getOverallStatus(p.sizeStock) ===
                                        'low_stock',
                                ).length
                            }}
                        </p>
                    </div>
                    <div class="bg-yellow-500/10 p-3 rounded-lg">
                        <svg
                            class="w-6 h-6 text-yellow-500"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                        >
                            <path
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                        </svg>
                    </div>
                </div>
            </div>

            <div class="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-zinc-400 text-sm">Out of Stock</p>
                        <p class="text-2xl font-bold text-red-500 mt-1">
                            {{
                                filteredProducts.filter(
                                    p =>
                                        getOverallStatus(p.sizeStock) ===
                                        'out_of_stock',
                                ).length
                            }}
                        </p>
                    </div>
                    <div class="bg-red-500/10 p-3 rounded-lg">
                        <svg
                            class="w-6 h-6 text-red-500"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                        >
                            <path
                                d="M6 18L18 6M6 6l12 12"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                        </svg>
                    </div>
                </div>
            </div>
        </div>

        <!-- Search and Filter Section -->
        <div
            class="bg-gradient-to-r from-zinc-900/50 to-zinc-800/30 rounded-xl border border-zinc-800 p-6 mb-8"
        >
            <div
                class="flex flex-col md:flex-row md:items-center md:justify-between gap-6"
            >
                <!-- Search -->
                <div class="relative flex-1 group">
                    <input
                        type="text"
                        v-model="searchQuery"
                        class="w-full bg-black/50 border border-zinc-800 text-white rounded-xl pl-10 pr-4 py-3 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                        placeholder="Search products..."
                    />
                    <span
                        class="absolute inset-y-0 left-0 pl-3 flex items-center"
                    >
                        <svg
                            class="h-5 w-5 text-zinc-400 transition-colors duration-200 group-focus-within:text-purple-500"
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
                </div>

                <!-- Filters -->
                <div class="flex flex-wrap gap-4">
                    <select
                        v-model="categoryFilter"
                        class="bg-black/50 border border-zinc-800 text-white rounded-xl px-6 py-3 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
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
                        class="bg-black/50 border border-zinc-800 text-white rounded-xl px-6 py-3 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                    >
                        <option value="">All Status</option>
                        <option value="in_stock">In Stock</option>
                        <option value="low_stock">Low Stock</option>
                        <option value="out_of_stock">Out of Stock</option>
                    </select>

                    <button
                        @click="openAddProductModal"
                        class="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 py-3 rounded-xl hover:from-purple-500 hover:to-purple-600 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
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
            </div>
        </div>

        <!-- Products Table -->
        <div
            class="bg-gradient-to-b from-zinc-900/80 to-zinc-900/50 rounded-xl border border-zinc-800 overflow-hidden"
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
                                class="px-6 py-4 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider"
                            >
                                Collection
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
                            v-for="product in paginatedProducts"
                            :key="product.id"
                            class="hover:bg-zinc-800/50 transition-colors duration-200"
                        >
                            <!-- Product Info -->
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

                            <!-- Price -->
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm font-mono text-white">
                                    Rp{{ formatPrice(product.price) }}
                                </div>
                            </td>

                            <!-- Category -->
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span
                                    class="px-3 py-1 text-xs font-medium rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700"
                                >
                                    {{ product.category }}
                                </span>
                            </td>

                            <!-- Status -->
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

                            <!-- Stocks with Popover -->
                            <td class="px-6 py-4 whitespace-nowrap relative">
                                <button
                                    @click="toggleStockPopover(product.id)"
                                    class="inline-flex items-center px-3 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 transition-all duration-200 group"
                                >
                                    <span
                                        class="text-sm font-mono text-zinc-300 group-hover:text-white"
                                    >
                                        {{ getTotalStock(product.sizeStock) }}
                                    </span>
                                    <svg
                                        class="w-4 h-4 ml-1.5 text-zinc-400 group-hover:text-white transition-transform duration-200"
                                        :class="{
                                            'rotate-180':
                                                openPopoverId === product.id,
                                        }"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                    >
                                        <path
                                            d="M19 9l-7 7-7-7"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        />
                                    </svg>
                                </button>

                                <!-- Stock Size Popover -->
                                <div
                                    v-if="openPopoverId === product.id"
                                    class="absolute z-10 mt-2 transform -translate-x-1/2 left-1/2"
                                >
                                    <div
                                        class="bg-zinc-900 rounded-xl shadow-lg border border-zinc-700 p-4 w-48"
                                    >
                                        <div class="space-y-2">
                                            <div
                                                v-for="(
                                                    stock, size
                                                ) in product.sizeStock"
                                                :key="size"
                                                class="flex items-center justify-between py-1.5"
                                            >
                                                <span
                                                    class="text-sm font-medium text-zinc-300"
                                                    >Size {{ size }}</span
                                                >
                                                <span
                                                    :class="{
                                                        'px-2 py-0.5 rounded-md text-xs font-medium': true,
                                                        'bg-emerald-500/20 text-emerald-400':
                                                            stock > 10,
                                                        'bg-yellow-500/20 text-yellow-400':
                                                            stock <= 10 &&
                                                            stock > 0,
                                                        'bg-red-500/20 text-red-400':
                                                            stock === 0,
                                                    }"
                                                >
                                                    {{ stock }}
                                                </span>
                                            </div>
                                        </div>
                                        <div
                                            class="mt-2 pt-2 border-t border-zinc-700"
                                        >
                                            <div
                                                class="flex items-center justify-between"
                                            >
                                                <span
                                                    class="text-sm font-medium text-zinc-300"
                                                    >Total</span
                                                >
                                                <span
                                                    class="text-sm font-medium text-purple-400"
                                                >
                                                    {{
                                                        getTotalStock(
                                                            product.sizeStock,
                                                        )
                                                    }}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </td>

                            <!-- Collection -->
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm text-zinc-300">
                                    {{ getCollectionName(product.collection) }}
                                </div>
                            </td>

                            <!-- Actions -->
                            <td
                                class="px-6 py-4 whitespace-nowrap text-right space-x-3"
                            >
                                <button
                                    @click="editProduct(product)"
                                    class="text-purple-400 hover:text-purple-300 transition-colors duration-200 text-sm font-medium"
                                >
                                    Edit
                                </button>
                                <button
                                    @click="deleteProduct(product.id)"
                                    class="text-red-400 hover:text-red-300 transition-colors duration-200 text-sm font-medium"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Pagination -->
            <div class="bg-zinc-900/50 px-6 py-4 border-t border-zinc-800">
                <div class="flex items-center justify-between">
                    <div class="text-sm text-zinc-400">
                        Showing
                        <span class="font-medium text-purple-500">
                            {{ (currentPage - 1) * itemsPerPage + 1 }}
                        </span>
                        to
                        <span class="font-medium text-purple-500">
                            {{
                                Math.min(
                                    currentPage * itemsPerPage,
                                    filteredProducts.length,
                                )
                            }}
                        </span>
                        of
                        <span class="font-medium text-purple-500">
                            {{ filteredProducts.length }}
                        </span>
                        products
                    </div>
                    <div class="flex items-center space-x-2">
                        <button
                            @click="currentPage > 1 && currentPage--"
                            :disabled="currentPage === 1"
                            class="px-4 py-2 text-sm text-zinc-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:bg-zinc-800/50 rounded-lg"
                        >
                            Previous
                        </button>
                        <div class="flex space-x-1">
                            <button
                                v-for="page in displayedPages"
                                :key="page"
                                @click="
                                    typeof page === 'number' &&
                                        (currentPage = page)
                                "
                                :disabled="typeof page !== 'number'"
                                class="px-4 py-2 text-sm rounded-lg transition-all duration-200"
                                :class="[
                                    typeof page === 'number'
                                        ? currentPage === page
                                            ? 'bg-purple-600 text-white'
                                            : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                                        : 'text-zinc-600',
                                ]"
                            >
                                {{ page }}
                            </button>
                        </div>
                        <button
                            @click="currentPage < totalPages && currentPage++"
                            :disabled="currentPage === totalPages"
                            class="px-4 py-2 text-sm text-zinc-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:bg-zinc-800/50 rounded-lg"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Product Modal -->
        <div v-if="showModal" class="fixed inset-0 z-50 overflow-y-auto">
            <div
                class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
            >
                <!-- Overlay -->
                <div
                    class="fixed inset-0 bg-black bg-opacity-75 transition-opacity"
                    aria-hidden="true"
                ></div>

                <div
                    class="inline-block align-bottom bg-zinc-900 rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
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
                                    >Product Name</label
                                >
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
                                    >Price</label
                                >
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
                                    >Stock by Size</label
                                >
                                <div class="grid grid-cols-2 gap-4">
                                    <div
                                        v-for="size in availableSizes"
                                        :key="size"
                                        class="relative bg-zinc-800/30 rounded-xl p-4 border border-zinc-700/50"
                                    >
                                        <label
                                            :for="'size-' + size"
                                            class="text-sm font-medium text-zinc-300 mb-2"
                                        >
                                            Size {{ size }}
                                        </label>
                                        <input
                                            :id="'size-' + size"
                                            type="number"
                                            v-model="
                                                productForm.sizeStock[size]
                                            "
                                            class="w-full bg-black/50 border border-zinc-700 text-white rounded-lg px-3 py-2 focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50 transition-all duration-300"
                                            min="0"
                                            placeholder="0"
                                        />
                                        <div class="absolute top-2 right-2">
                                            <span
                                                :class="{
                                                    'px-2 py-1 rounded-md text-xs font-medium': true,
                                                    'bg-emerald-500/20 text-emerald-400':
                                                        productForm.sizeStock[
                                                            size
                                                        ] > 10,
                                                    'bg-yellow-500/20 text-yellow-400':
                                                        productForm.sizeStock[
                                                            size
                                                        ] <= 10 &&
                                                        productForm.sizeStock[
                                                            size
                                                        ] > 0,
                                                    'bg-red-500/20 text-red-400':
                                                        !productForm.sizeStock[
                                                            size
                                                        ] ||
                                                        productForm.sizeStock[
                                                            size
                                                        ] === 0,
                                                }"
                                            >
                                                {{
                                                    productForm.sizeStock[
                                                        size
                                                    ] > 0
                                                        ? 'In Stock'
                                                        : 'Out'
                                                }}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Category -->
                            <div>
                                <label
                                    class="block text-sm font-medium text-zinc-400 mb-1"
                                    >Category</label
                                >
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

                            <!-- Collection -->
                            <div>
                                <label
                                    class="block text-sm font-medium text-zinc-400 mb-1"
                                    >Collection</label
                                >
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
                        </form>
                    </div>

                    <!-- Modal Footer -->
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
import { ref, computed, onMounted } from 'vue'
import {
    productsData,
    productCategories,
    collectionsData,
    availableSizes, // Import availableSizes dari MenuConfig
} from './MenuConfig'

// Add new ref for popover
const openPopoverId = ref(null)

// Add new method for handling popover
const toggleStockPopover = productId => {
    openPopoverId.value = openPopoverId.value === productId ? null : productId
}

// Add method to calculate total stock
const getTotalStock = sizeStock => {
    if (!sizeStock) return 0
    return Object.values(sizeStock).reduce((sum, current) => sum + current, 0)
}

// Add click outside handler for popover
onMounted(() => {
    document.addEventListener('click', e => {
        if (
            !e.target.closest('button') &&
            !e.target.closest('.stock-popover')
        ) {
            openPopoverId.value = null
        }
    })
})

// Initialize form with size stock
const initializeSizeStock = () => {
    const sizeStock = {}
    availableSizes.forEach(size => {
        sizeStock[size] = 0
    })
    return sizeStock
}

// Search and Filter
const searchQuery = ref('')
const categoryFilter = ref('')
const statusFilter = ref('')

// Pagination
const itemsPerPage = 4
const currentPage = ref(1)

// Modal and Form
const showModal = ref(false)
const editingProduct = ref(null)
const productForm = ref({
    name: '',
    price: 0,
    category: productCategories[0],
    sizeStock: initializeSizeStock(),
    collection: '',
    image: '/api/placeholder/80/80', // Tambahkan default image
    lastUpdated: new Date().toISOString().split('T')[0], // Tambahkan default lastUpdated
})

// Helper function to determine overall status based on size stock
const getOverallStatus = sizeStock => {
    if (!sizeStock) return 'out_of_stock' // Handle kasus dimana sizeStock undefined

    const hasAnyStock = Object.values(sizeStock).some(stock => stock > 0)
    const hasLowStock = Object.values(sizeStock).some(
        stock => stock > 0 && stock <= 5,
    )

    if (!hasAnyStock) return 'out_of_stock'
    if (hasLowStock) return 'low_stock'
    return 'in_stock'
}

// Computed Properties
const filteredProducts = computed(() => {
    return productsData.filter(product => {
        const matchesSearch = product.name
            .toLowerCase()
            .includes(searchQuery.value.toLowerCase())
        const matchesCategory =
            !categoryFilter.value || product.category === categoryFilter.value
        const matchesStatus =
            !statusFilter.value ||
            getOverallStatus(product.sizeStock) === statusFilter.value
        return matchesSearch && matchesCategory && matchesStatus
    })
})

// Tambahkan computed properties untuk paginasi
const displayedPages = computed(() => {
    const total = Math.ceil(filteredProducts.value.length / itemsPerPage)
    if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1)

    const current = currentPage.value
    const pages = []

    if (current <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i)
        pages.push('...')
        pages.push(total)
    } else if (current >= total - 2) {
        pages.push(1)
        pages.push('...')
        for (let i = total - 3; i <= total; i++) pages.push(i)
    } else {
        pages.push(1)
        pages.push('...')
        for (let i = current - 1; i <= current + 1; i++) pages.push(i)
        pages.push('...')
        pages.push(total)
    }

    return pages
})

const totalPages = computed(() =>
    Math.ceil(filteredProducts.value.length / itemsPerPage),
)

// Modifikasi paginatedProducts untuk menggunakan currentPage
const paginatedProducts = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage
    return filteredProducts.value.slice(start, start + itemsPerPage)
})

// Methods
const formatStatus = status => {
    return status
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
}

const getStatusClass = status => {
    const baseClasses = 'px-3 py-1 text-xs font-medium rounded-full border'
    const statusClasses = {
        in_stock: 'bg-emerald-900/30 text-emerald-400 border-emerald-700/50',
        low_stock: 'bg-yellow-900/30 text-yellow-400 border-yellow-700/50',
        out_of_stock: 'bg-red-900/30 text-red-400 border-red-700/50',
    }
    return `${baseClasses} ${statusClasses[status] || statusClasses.out_of_stock}`
}

const formatPrice = price => {
    return new Intl.NumberFormat('id-ID', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(price)
}

const getCollectionName = collectionId => {
    const collection = collectionsData.find(c => c.id === collectionId)
    return collection ? collection.name : '-'
}

const openAddProductModal = () => {
    editingProduct.value = null
    productForm.value = {
        name: '',
        price: 0,
        category: productCategories[0],
        sizeStock: initializeSizeStock(),
        collection: '',
        image: '/api/placeholder/80/80',
        lastUpdated: new Date().toISOString().split('T')[0],
    }
    showModal.value = true
}

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
        category: productCategories[0],
        sizeStock: initializeSizeStock(),
        collection: '',
        image: '/api/placeholder/80/80',
        lastUpdated: new Date().toISOString().split('T')[0],
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
                lastUpdated: now,
            }
        }
    } else {
        // Add new product
        const newProduct = {
            id: Math.max(...productsData.map(p => p.id)) + 1, // Ensure unique ID
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
/* Custom scrollbar styling */
::-webkit-scrollbar {
    width: 8px;
    height: 8px;
}

::-webkit-scrollbar-track {
    background: #18181b;
    border-radius: 4px;
}

::-webkit-scrollbar-thumb {
    background: #3f3f46;
    border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
    background: #52525b;
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

/* Font settings */
.font-mono {
    font-family: 'JetBrains Mono', monospace;
}

/* Status badge hover effect */
[class*='rounded-full']:hover {
    filter: brightness(1.1);
    transition: filter 0.2s ease-in-out;
}

/* Button focus ring offset fix for dark theme */
button:focus {
    --tw-ring-offset-color: #000000;
}
</style>
