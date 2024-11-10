<template>
    <div class="min-h-screen bg-black p-28">
        <!-- Header with Search and Filters -->
        <div class="mb-8">
            <div class="flex items-start justify-between mb-6">
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
                    </div>
                </div>
            </div>

            <!-- Integrated Search and Filter -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                                    class="px-3 py-1 text-xs font-medium rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700"
                                >
                                    {{ product.category }}
                                </span>
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
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import {
    productsData,
    productCategories,
    collectionsData,
    availableSizes,
} from './MenuConfig'

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

// Initialize size stock
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

// Modal and Form State
const showModal = ref(false)
const editingProduct = ref(null)
const productForm = ref({
    name: '',
    price: 0,
    category: productCategories[0],
    sizeStock: initializeSizeStock(),
    collection: collection.value?.id,
})

// Get overall status based on size stock
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
    return collectionProducts.value.filter(product => {
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

// const closeModal = () => {
//     showModal.value = false
//     editingProduct.value = null
//     productForm.value = {
//         name: '',
//         price: 0,
//         category: productCategories[0],
//         sizeStock: initializeSizeStock(),
//         collection: collection.value?.id,
//     }
// }

// const saveProduct = () => {
//     const now = new Date().toISOString().split('T')[0]

//     if (editingProduct.value) {
//         const index = productsData.findIndex(
//             p => p.id === editingProduct.value.id,
//         )
//         if (index !== -1) {
//             productsData[index] = {
//                 ...productsData[index],
//                 ...productForm.value,
//                 lastUpdated: now,
//             }
//         }
//     } else {
//         const newProduct = {
//             id: Math.max(...productsData.map(p => p.id)) + 1,
//             image: '/api/placeholder/80/80',
//             ...productForm.value,
//             lastUpdated: now,
//         }
//         productsData.push(newProduct)
//     }
//     closeModal()
// }

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
