<template>
    <div class="min-h-screen bg-black p-28">
        <!-- Header -->
        <div class="mb-8">
            <div class="flex flex-col space-y-4">
                <div class="flex justify-between items-center">
                    <div>
                        <h1
                            class="text-3xl font-bold text-white tracking-wider uppercase"
                        >
                            Categories
                        </h1>
                        <p class="text-zinc-400 mt-1 tracking-wide">
                            Organize your products with dynamic categories
                        </p>
                    </div>
                    <button
                        @click="openAddCategoryModal"
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
                        <span>Add Category</span>
                    </button>
                </div>

                <div class="flex gap-4">
                    <!-- Search -->
                    <div class="relative flex-1">
                        <input
                            type="text"
                            v-model="searchQuery"
                            class="w-full bg-zinc-900/50 border border-zinc-800 text-white rounded-lg pl-10 pr-4 py-2.5 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all duration-300"
                            placeholder="Search categories..."
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
                        class="w-40 bg-zinc-900/50 border border-zinc-800 text-white rounded-lg px-4 py-2.5 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all duration-300"
                    >
                        <option value="">All Status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </div>
            </div>
        </div>

        <!-- Categories Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
                v-for="category in displayCategories"
                :key="category.id"
                class="group bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden hover:border-purple-500/50 transition-all duration-300 cursor-pointer"
                @click="navigateToCategory(category)"
            >
                <!-- Category Header -->
                <div class="p-6 border-b border-zinc-800">
                    <div class="flex items-center justify-between mb-4">
                        <div class="flex items-center space-x-4">
                            <div
                                class="h-12 w-12 rounded-lg bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center"
                            >
                                <svg
                                    class="w-6 h-6 text-white"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                >
                                    <path
                                        d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                </svg>
                            </div>
                            <div>
                                <h3
                                    class="text-lg font-medium text-white group-hover:text-purple-400 transition-colors duration-300"
                                >
                                    {{ category.name }}
                                </h3>
                            </div>
                        </div>
                        <span :class="getStatusClass(category.status)">
                            {{ category.status }}
                        </span>
                    </div>
                </div>

                <!-- Category Stats -->
                <div class="px-6 py-4 bg-zinc-900/50">
                    <div class="grid gap-4">
                        <div class="text-center p-3 bg-zinc-800/50 rounded-lg">
                            <span class="text-sm text-zinc-400">Products</span>
                            <p class="mt-1 text-lg font-mono text-white">
                                {{ category.productsCount }}
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Actions -->
                <div
                    class="px-6 py-4 border-t border-zinc-800 flex justify-end space-x-3"
                    @click.stop
                >
                    <button
                        @click="editCategory(category)"
                        class="text-purple-400 hover:text-purple-300 transition-colors duration-200 text-sm flex items-center space-x-1"
                    >
                        <svg
                            class="w-4 h-4"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                        >
                            <path
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                        </svg>
                        <span>Edit</span>
                    </button>
                    <button
                        @click="deleteCategory(category.id)"
                        class="text-red-400 hover:text-red-300 transition-colors duration-200 text-sm flex items-center space-x-1"
                    >
                        <svg
                            class="w-4 h-4"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                        >
                            <path
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                        </svg>
                        <span>Delete</span>
                    </button>
                </div>
            </div>
        </div>

        <!-- Category Modal -->
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
                                editingCategory
                                    ? 'Edit Category'
                                    : 'Add New Category'
                            }}
                        </h3>

                        <form @submit.prevent="saveCategory" class="space-y-4">
                            <!-- Name -->
                            <div>
                                <label
                                    class="block text-sm font-medium text-zinc-400 mb-1"
                                >
                                    Category Name
                                </label>
                                <input
                                    type="text"
                                    v-model="categoryForm.name"
                                    class="w-full bg-black border border-zinc-800 text-white rounded-lg px-4 py-2.5 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all duration-300"
                                    required
                                />
                            </div>

                            <!-- Status -->
                            <div>
                                <label
                                    class="block text-sm font-medium text-zinc-400 mb-1"
                                >
                                    Status
                                </label>
                                <select
                                    v-model="categoryForm.status"
                                    class="w-full bg-black border border-zinc-800 text-white rounded-lg px-4 py-2.5 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all duration-300"
                                >
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                </select>
                            </div>
                        </form>
                    </div>
                    <div
                        class="bg-zinc-800/50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse"
                    >
                        <button
                            @click="saveCategory"
                            class="w-full inline-flex justify-center rounded-lg border border-transparent shadow-sm px-4 py-2 bg-purple-600 text-base font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:ml-3 sm:w-auto sm:text-sm transition-all duration-200"
                        >
                            {{
                                editingCategory
                                    ? 'Save Changes'
                                    : 'Add Category'
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
import { categoriesData, productsData } from './MenuConfig'

const router = useRouter()

// Search and Filter
const searchQuery = ref('')
const statusFilter = ref('')

// Modal and Form
const showModal = ref(false)
const editingCategory = ref(null)
const categoryForm = ref({
    name: '',
    status: 'active',
})

// Computed Properties
const displayCategories = computed(() => {
    return categoriesData.filter(category => {
        // Hitung jumlah produk untuk kategori ini
        const productCount = productsData.filter(
            product => product.category === category.name,
        ).length

        // Update productsCount
        category.productsCount = productCount

        const matchesSearch = category.name
            .toLowerCase()
            .includes(searchQuery.value.toLowerCase())
        const matchesStatus =
            !statusFilter.value || category.status === statusFilter.value
        return matchesSearch && matchesStatus
    })
})

const getStatusClass = status => {
    const baseClasses =
        'px-3 py-1 text-xs font-medium rounded-full border backdrop-blur-sm'
    const statusClasses = {
        active: 'bg-emerald-900/30 text-emerald-400 border-emerald-700/50',
        inactive: 'bg-zinc-900/30 text-zinc-400 border-zinc-700/50',
    }
    return `${baseClasses} ${statusClasses[status]}`
}

const openAddCategoryModal = () => {
    editingCategory.value = null
    categoryForm.value = {
        name: '',
        status: 'active',
    }
    showModal.value = true
}

const editCategory = category => {
    editingCategory.value = category
    categoryForm.value = { ...category }
    showModal.value = true
}

const closeModal = () => {
    showModal.value = false
    editingCategory.value = null
    categoryForm.value = {
        name: '',
        status: 'active',
    }
}

const navigateToCategory = category => {
    router.push(`/admin/category/${category.slug}`)
}

const saveCategory = () => {
    if (editingCategory.value) {
        // Update existing category
        const index = categoriesData.findIndex(
            c => c.id === editingCategory.value.id,
        )
        if (index !== -1) {
            categoriesData[index] = {
                ...categoriesData[index],
                ...categoryForm.value,
                // Generate slug from name
                slug: categoryForm.value.name
                    .toLowerCase()
                    .replace(/\s+/g, '-'),
            }
        }
    } else {
        // Add new category
        const newCategory = {
            id: categoriesData.length + 1,
            ...categoryForm.value,
            productsCount: 0,
            image: '/api/placeholder/80/80',
            slug: categoryForm.value.name.toLowerCase().replace(/\s+/g, '-'),
        }
        categoriesData.push(newCategory)
    }
    closeModal()
}

const deleteCategory = categoryId => {
    if (
        confirm(
            'Are you sure you want to delete this category? This will affect all products in this category.',
        )
    ) {
        const category = categoriesData.find(c => c.id === categoryId)
        const index = categoriesData.findIndex(c => c.id === categoryId)

        if (index !== -1) {
            // Update products yang menggunakan kategori ini
            productsData.forEach(product => {
                if (product.category === category.name) {
                    product.category = 'Uncategorized'
                }
            })

            // Hapus kategori
            categoriesData.splice(index, 1)
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
