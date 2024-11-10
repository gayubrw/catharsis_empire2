<template>
    <div class="min-h-screen bg-black p-28">
        <!-- Stats Cards -->
        <ProductStatsCards :products="filteredProducts" />

        <!-- Search and Filter Section -->
        <ProductSearchFilter
            v-model:search="searchQuery"
            v-model:category="categoryFilter"
            v-model:status="statusFilter"
            v-model:collection="collectionFilter"
            :categories="productCategories"
            @add-product="openAddProductModal"
        />

        <!-- Products Table -->
        <ProductTable
            :products="paginatedProducts"
            @edit="editProduct"
            @delete="deleteProduct"
            @view-stock="openStockModal"
        >
            <template #pagination>
                <ProductTablePagination
                    v-model:currentPage="currentPage"
                    :total-items="filteredProducts.length"
                    :items-per-page="itemsPerPage"
                />
            </template>
        </ProductTable>

        <!-- Modals -->
        <ProductFormModal
            v-if="showModal"
            v-model="showModal"
            :product="editingProduct"
            :categories="productCategories"
            :collections="collectionsData"
            :available-sizes="availableSizes"
            @save="saveProduct"
        />

        <StockDetailsModal
            v-if="showStockModal"
            v-model="showStockModal"
            :product="selectedProduct"
            @edit="editStockProduct"
        />

        <DeleteConfirmationModal
            v-if="showDeleteModal"
            v-model="showDeleteModal"
            @confirm="confirmDelete"
        />
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import {
    productsData,
    productCategories,
    collectionsData,
    availableSizes,
} from './MenuConfig'

// Import Components
import ProductStatsCards from './Product/Card/ProductStatsCards.vue'
import ProductSearchFilter from './Product/Filter/ProductSearchFilter.vue'
import ProductTable from './Product/Table/ProductTable.vue'
import ProductTablePagination from './Product/Table/ProductTablePagination.vue'
import ProductFormModal from './Product/Modal/ProductFormModal.vue'
import StockDetailsModal from './Product/Modal/StockDetailsModal.vue'
import DeleteConfirmationModal from './Product/Modal/DeleteConfirmationModal.vue'

// State
const searchQuery = ref('')
const categoryFilter = ref('')
const statusFilter = ref('')
const collectionFilter = ref('') // Add collection filter
const showModal = ref(false)
const showStockModal = ref(false)
const showDeleteModal = ref(false)
const editingProduct = ref(null)
const selectedProduct = ref(null)
const productToDelete = ref(null)
const currentPage = ref(1)
const itemsPerPage = 4

// Computed
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
        const matchesCollection =
            !collectionFilter.value ||
            product.collection === parseInt(collectionFilter.value)
        return (
            matchesSearch &&
            matchesCategory &&
            matchesStatus &&
            matchesCollection
        )
    })
})

const paginatedProducts = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage
    return filteredProducts.value.slice(start, start + itemsPerPage)
})

// Methods
const getOverallStatus = sizeStock => {
    const totalStock = Object.values(sizeStock).reduce(
        (sum, current) => sum + current,
        0,
    )
    if (totalStock === 0) return 'out_of_stock'
    if (Object.values(sizeStock).some(stock => stock > 0 && stock <= 5))
        return 'low_stock'
    return 'in_stock'
}

// Modal Methods
const openAddProductModal = () => {
    editingProduct.value = null
    showModal.value = true
}

const editProduct = product => {
    editingProduct.value = product
    showModal.value = true
}

const openStockModal = product => {
    selectedProduct.value = product
    showStockModal.value = true
}

const editStockProduct = () => {
    if (selectedProduct.value) {
        editProduct(selectedProduct.value)
        showStockModal.value = false
    }
}

const deleteProduct = productId => {
    productToDelete.value = productId
    showDeleteModal.value = true
}

const confirmDelete = () => {
    if (productToDelete.value) {
        const index = productsData.findIndex(
            p => p.id === productToDelete.value,
        )
        if (index !== -1) {
            productsData.splice(index, 1)
        }
    }
    showDeleteModal.value = false
    productToDelete.value = null
}

const saveProduct = formData => {
    if (editingProduct.value) {
        const index = productsData.findIndex(
            p => p.id === editingProduct.value.id,
        )
        if (index !== -1) {
            productsData[index] = { ...productsData[index], ...formData }
        }
    } else {
        const newProduct = {
            id: Math.max(...productsData.map(p => p.id)) + 1,
            ...formData,
            lastUpdated: new Date().toISOString().split('T')[0],
        }
        productsData.push(newProduct)
    }
    showModal.value = false
    editingProduct.value = null
}
</script>
