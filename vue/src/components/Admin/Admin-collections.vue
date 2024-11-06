<template>
    <div>
        <!-- Header -->
        <div class="flex justify-between items-center mb-6">
            <div>
                <h1 class="text-2xl font-bold text-white">Collections</h1>
                <p class="text-blue-100 mt-1">
                    Discover and manage your latest collections
                </p>
            </div>
            <button
                @click="openAddCollectionModal"
                class="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600 transition-all duration-200 flex items-center shadow-sm"
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
                Add Collection
            </button>
        </div>

        <!-- Filters Section -->
        <div class="bg-white p-4 rounded-xl shadow-sm mb-6">
            <div class="flex flex-wrap gap-4">
                <!-- Search with Enhanced Styling -->
                <div class="relative flex-1 min-w-[300px]">
                    <span
                        class="absolute inset-y-0 left-0 pl-3 flex items-center"
                    >
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
                        class="pl-10 pr-4 py-3 w-full border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                        placeholder="Search collections..."
                    />
                </div>

                <!-- Enhanced Status Filter -->
                <select
                    v-model="statusFilter"
                    class="border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white transition-colors duration-200 min-w-[150px]"
                >
                    <option value="">All Status</option>
                    <option value="active">Active</option>
                    <option value="scheduled">Scheduled</option>
                    <option value="ended">Ended</option>
                </select>
            </div>
        </div>

        <!-- Collections Grid with Enhanced Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
                v-for="collection in displayCollections"
                :key="collection.id"
                class="group bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-100"
            >
                <!-- Collection Image with Hover Effect -->
                <div class="relative h-[600px] overflow-hidden">
                    <img
                        :src="collection.featuredImage"
                        :alt="collection.name"
                        class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                    />
                    <div class="absolute top-4 right-4">
                        <span
                            class="px-3 py-1.5 text-xs font-semibold rounded-full shadow-sm"
                            :class="getStatusClass(collection.status)"
                        >
                            {{ collection.status }}
                        </span>
                    </div>
                </div>

                <!-- Collection Info with Enhanced Layout -->
                <div class="p-6 space-y-4">
                    <div>
                        <h3
                            class="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200"
                        >
                            {{ collection.name }}
                        </h3>
                        <p class="mt-2 text-sm text-gray-600 line-clamp-2">
                            {{ collection.description }}
                        </p>
                    </div>

                    <!-- Stats with Icons -->
                    <div
                        class="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100"
                    >
                        <div class="flex items-center text-sm">
                            <svg
                                class="w-4 h-4 text-gray-400 mr-2"
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
                            <span class="text-gray-600"
                                >{{ collection.productsCount }} Products</span
                            >
                        </div>
                        <div class="flex items-center text-sm">
                            <svg
                                class="w-4 h-4 text-gray-400 mr-2"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                            >
                                <path
                                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                            </svg>
                            <span class="text-gray-600">{{
                                formatDate(collection.startDate)
                            }}</span>
                        </div>
                    </div>

                    <!-- Actions with Enhanced Buttons -->
                    <div
                        class="flex justify-end space-x-3 pt-4 border-t border-gray-100"
                    >
                        <button
                            @click="editCollection(collection)"
                            class="flex items-center text-sm text-blue-600 hover:text-blue-700 transition-colors duration-200"
                        >
                            <svg
                                class="w-4 h-4 mr-1"
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
                            Edit
                        </button>
                        <button
                            @click="deleteCollection(collection.id)"
                            class="flex items-center text-sm text-red-600 hover:text-red-700 transition-colors duration-200"
                        >
                            <svg
                                class="w-4 h-4 mr-1"
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
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Enhanced Modal -->
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
                    @click="closeModal"
                ></div>

                <div
                    class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
                >
                    <div class="sm:flex sm:items-start">
                        <div
                            class="mt-3 text-center sm:mt-0 sm:text-left w-full"
                        >
                            <h3 class="text-lg font-medium text-gray-900">
                                {{
                                    editingCollection
                                        ? 'Edit Collection'
                                        : 'Add New Collection'
                                }}
                            </h3>

                            <form
                                @submit.prevent="saveCollection"
                                class="mt-6 space-y-4"
                            >
                                <div>
                                    <label
                                        class="block text-sm font-medium text-gray-700"
                                        >Name</label
                                    >
                                    <input
                                        type="text"
                                        v-model="collectionForm.name"
                                        class="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    />
                                </div>

                                <div>
                                    <label
                                        class="block text-sm font-medium text-gray-700"
                                        >Description</label
                                    >
                                    <textarea
                                        v-model="collectionForm.description"
                                        rows="3"
                                        class="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    ></textarea>
                                </div>

                                <div class="grid grid-cols-2 gap-4">
                                    <div>
                                        <label
                                            class="block text-sm font-medium text-gray-700"
                                            >Start Date</label
                                        >
                                        <input
                                            type="date"
                                            v-model="collectionForm.startDate"
                                            class="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label
                                            class="block text-sm font-medium text-gray-700"
                                            >End Date</label
                                        >
                                        <input
                                            type="date"
                                            v-model="collectionForm.endDate"
                                            class="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label
                                        class="block text-sm font-medium text-gray-700"
                                        >Status</label
                                    >
                                    <select
                                        v-model="collectionForm.status"
                                        class="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        <option value="active">Active</option>
                                        <option value="scheduled">
                                            Scheduled
                                        </option>
                                        <option value="ended">Ended</option>
                                    </select>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div class="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3">
                        <button
                            @click="closeModal"
                            class="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
                        >
                            Cancel
                        </button>
                        <button
                            @click="saveCollection"
                            class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
                        >
                            {{
                                editingCollection
                                    ? 'Save Changes'
                                    : 'Add Collection'
                            }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { collectionsData } from './MenuConfig'

// Search and Filter
const searchQuery = ref('')
const statusFilter = ref('')
const showModal = ref(false)
const editingCollection = ref(null)
const collectionForm = ref({
    name: '',
    description: '',
    status: 'active',
    startDate: '',
    endDate: '',
})

// Methods
const displayCollections = computed(() => {
    return collectionsData.filter(collection => {
        const matchesSearch = collection.name
            .toLowerCase()
            .includes(searchQuery.value.toLowerCase())
        const matchesStatus =
            !statusFilter.value || collection.status === statusFilter.value
        return matchesSearch && matchesStatus
    })
})

const getStatusClass = status => {
    return (
        {
            active: 'bg-green-100 text-green-800',
            scheduled: 'bg-blue-100 text-blue-800',
            ended: 'bg-red-100 text-red-800',
        }[status] || 'bg-gray-100 text-gray-800'
    )
}

const formatDate = date => {
    return new Date(date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    })
}

const openAddCollectionModal = () => {
    editingCollection.value = null
    collectionForm.value = {
        name: '',
        description: '',
        status: 'active',
        startDate: '',
        endDate: '',
    }
    showModal.value = true
}

const editCollection = collection => {
    editingCollection.value = collection
    collectionForm.value = { ...collection }
    showModal.value = true
}

const closeModal = () => {
    showModal.value = false
    editingCollection.value = null
}

const saveCollection = () => {
    if (editingCollection.value) {
        const index = collectionsData.findIndex(
            c => c.id === editingCollection.value.id,
        )
        if (index !== -1) {
            collectionsData[index] = {
                ...collectionsData[index],
                ...collectionForm.value,
            }
        }
    } else {
        const newCollection = {
            id: collectionsData.length + 1,
            ...collectionForm.value,
            productsCount: 0,
            image: '/api/placeholder/200/100',
            featuredImage: '/api/placeholder/400/200',
        }
        collectionsData.push(newCollection)
    }
    closeModal()
}

const deleteCollection = id => {
    if (confirm('Are you sure you want to delete this collection?')) {
        const index = collectionsData.findIndex(c => c.id === id)
        if (index !== -1) {
            collectionsData.splice(index, 1)
        }
    }
}
</script>
