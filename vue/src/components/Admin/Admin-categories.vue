<template>
    <div>
        <!-- Header -->
        <div class="flex justify-between items-center mb-6">
            <div>
                <h1 class="text-2xl font-bold text-white">Categories</h1>
                <p class="text-sm text-gray-300 mt-1">
                    Manage product categories and subcategories
                </p>
            </div>
            <button
                @click="openAddCategoryModal"
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
                Add Category
            </button>
        </div>

        <!-- Search and Filter -->
        <div class="bg-white p-4 rounded-xl shadow-sm mb-6">
            <div class="flex flex-wrap gap-4">
                <div class="relative flex-1">
                    <input
                        type="text"
                        v-model="searchQuery"
                        class="pl-10 pr-4 py-2 w-full border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Search categories..."
                    />
                    <span class="absolute left-3 top-2.5 text-gray-400">
                        <svg
                            class="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </span>
                </div>
                <select
                    v-model="statusFilter"
                    class="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                    <option value="">All Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </select>
            </div>
        </div>

        <!-- Categories Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
                v-for="category in filteredCategories"
                :key="category.id"
                class="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200"
            >
                <div class="p-6">
                    <!-- Category Header -->
                    <div class="flex items-center justify-between mb-4">
                        <div class="flex items-center">
                            <img
                                :src="category.image"
                                :alt="category.name"
                                class="w-12 h-12 rounded-lg object-cover"
                            />
                            <div class="ml-3">
                                <h3 class="text-lg font-semibold text-gray-900">
                                    {{ category.name }}
                                </h3>
                                <span class="text-sm text-gray-500">{{
                                    category.slug
                                }}</span>
                            </div>
                        </div>
                        <span
                            class="px-2 py-1 text-xs font-semibold rounded-full"
                            :class="
                                category.status === 'active'
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-gray-100 text-gray-800'
                            "
                        >
                            {{ category.status }}
                        </span>
                    </div>

                    <!-- Category Info -->
                    <p class="text-sm text-gray-600 mb-4">
                        {{ category.description }}
                    </p>

                    <!-- Stats -->
                    <div
                        class="flex items-center justify-between text-sm text-gray-500 mb-4"
                    >
                        <span>{{ category.productsCount }} Products</span>
                        <span
                            >{{
                                category.subcategories.length
                            }}
                            Subcategories</span
                        >
                    </div>

                    <!-- Subcategories -->
                    <div class="mb-4">
                        <div class="flex flex-wrap gap-2">
                            <span
                                v-for="subcategory in category.subcategories"
                                :key="subcategory"
                                class="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                            >
                                {{ subcategory }}
                            </span>
                        </div>
                    </div>

                    <!-- Actions -->
                    <div class="flex justify-end space-x-3 mt-4 pt-4 border-t">
                        <button
                            @click="editCategory(category)"
                            class="text-sm text-blue-600 hover:text-blue-700"
                        >
                            Edit
                        </button>
                        <button
                            @click="deleteCategory(category.id)"
                            class="text-sm text-red-600 hover:text-red-700"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Category Modal -->
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
                <!-- Background overlay -->
                <div
                    class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                    aria-hidden="true"
                ></div>

                <!-- Modal panel -->
                <div
                    class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
                >
                    <h3 class="text-lg font-medium text-gray-900">
                        {{
                            editingCategory
                                ? 'Edit Category'
                                : 'Add New Category'
                        }}
                    </h3>

                    <form @submit.prevent="saveCategory" class="mt-4 space-y-4">
                        <!-- Name -->
                        <div>
                            <label
                                for="name"
                                class="block text-sm font-medium text-gray-700"
                                >Name</label
                            >
                            <input
                                type="text"
                                id="name"
                                v-model="categoryForm.name"
                                class="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>

                        <!-- Description -->
                        <div>
                            <label
                                for="description"
                                class="block text-sm font-medium text-gray-700"
                                >Description</label
                            >
                            <textarea
                                id="description"
                                v-model="categoryForm.description"
                                rows="3"
                                class="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
                                required
                            ></textarea>
                        </div>

                        <!-- Subcategories -->
                        <div>
                            <label
                                for="subcategories"
                                class="block text-sm font-medium text-gray-700"
                            >
                                Subcategories (comma-separated)
                            </label>
                            <input
                                type="text"
                                id="subcategories"
                                v-model="subcategoriesInput"
                                class="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="e.g. Books, Magazines, Comics"
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
                                v-model="categoryForm.status"
                                class="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </div>
                    </form>

                    <!-- Modal Actions -->
                    <div
                        class="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense"
                    >
                        <button
                            type="button"
                            @click="saveCategory"
                            class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:col-start-2 sm:text-sm"
                        >
                            {{
                                editingCategory
                                    ? 'Save Changes'
                                    : 'Add Category'
                            }}
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
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { categoriesData } from './MenuConfig'

// Search and Filter
const searchQuery = ref('')
const statusFilter = ref('')

// Modal and Form
const showModal = ref(false)
const editingCategory = ref(null)
const categoryForm = ref({
    name: '',
    description: '',
    status: 'active',
    subcategories: [],
})
const subcategoriesInput = ref('')

// Computed
const filteredCategories = computed(() => {
    return categoriesData.filter(category => {
        const matchesSearch =
            category.name
                .toLowerCase()
                .includes(searchQuery.value.toLowerCase()) ||
            category.description
                .toLowerCase()
                .includes(searchQuery.value.toLowerCase())
        const matchesStatus =
            !statusFilter.value || category.status === statusFilter.value
        return matchesSearch && matchesStatus
    })
})

// Methods
const openAddCategoryModal = () => {
    editingCategory.value = null
    categoryForm.value = {
        name: '',
        description: '',
        status: 'active',
        subcategories: [],
    }
    subcategoriesInput.value = ''
    showModal.value = true
}

const editCategory = category => {
    editingCategory.value = category
    categoryForm.value = {
        name: category.name,
        description: category.description,
        status: category.status,
        subcategories: category.subcategories,
    }
    subcategoriesInput.value = category.subcategories.join(', ')
    showModal.value = true
}

const closeModal = () => {
    showModal.value = false
    editingCategory.value = null
    categoryForm.value = {
        name: '',
        description: '',
        status: 'active',
        subcategories: [],
    }
    subcategoriesInput.value = ''
}

const saveCategory = () => {
    // Process subcategories from input
    const subcategories = subcategoriesInput.value
        .split(',')
        .map(item => item.trim())
        .filter(item => item)

    const formData = {
        ...categoryForm.value,
        subcategories,
        slug: categoryForm.value.name
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^\w-]+/g, ''),
    }

    if (editingCategory.value) {
        // Update existing category
        const index = categoriesData.findIndex(
            c => c.id === editingCategory.value.id,
        )
        if (index !== -1) {
            categoriesData[index] = {
                ...categoriesData[index],
                ...formData,
            }
        }
    } else {
        // Add new category
        const newCategory = {
            id: categoriesData.length + 1,
            ...formData,
            productsCount: 0,
            image: '/api/placeholder/80/80',
        }
        categoriesData.push(newCategory)
    }
    closeModal()
}

const deleteCategory = categoryId => {
    if (
        confirm(
            'Are you sure you want to delete this category? This action cannot be undone.',
        )
    ) {
        const index = categoriesData.findIndex(c => c.id === categoryId)
        if (index !== -1) {
            categoriesData.splice(index, 1)
        }
    }
}
</script>
