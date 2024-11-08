<template>
    <div class="min-h-screen bg-black p-28">
        <!-- Header -->
        <div class="mb-8 flex justify-between items-center">
            <div>
                <h1
                    class="text-3xl font-bold text-white tracking-wider uppercase"
                >
                    Collections
                </h1>
                <p class="text-zinc-400 mt-1 tracking-wide">
                    Curate and manage your featured collections
                </p>
            </div>
            <button
                @click="openAddCollectionModal"
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
                <span>Add Collection</span>
            </button>
        </div>

        <!-- Filters Section -->
        <div class="bg-zinc-900/50 rounded-xl border border-zinc-800 p-6 mb-8">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Search -->
                <div class="relative">
                    <input
                        type="text"
                        v-model="searchQuery"
                        class="w-full bg-black border border-zinc-800 text-white rounded-lg pl-10 pr-4 py-2.5 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all duration-300"
                        placeholder="Search collections..."
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
                    <option value="active">Active</option>
                    <option value="scheduled">Scheduled</option>
                    <option value="ended">Ended</option>
                </select>
            </div>
        </div>

        <!-- Collections Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
                v-for="collection in displayCollections"
                :key="collection.id"
                class="group bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden hover:border-purple-500/50 transition-all duration-300"
            >
                <!-- Collection Image -->
                <div class="relative h-[600px] overflow-hidden">
                    <img
                        :src="collection.featuredImage"
                        :alt="collection.name"
                        class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                    <div
                        class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"
                    ></div>

                    <!-- Status Badge -->
                    <div class="absolute top-4 right-4">
                        <span :class="getStatusClass(collection.status)">
                            {{ collection.status }}
                        </span>
                    </div>

                    <!-- Collection Info Overlay -->
                    <div class="absolute bottom-0 left-0 right-0 p-6">
                        <h3
                            class="text-xl font-bold text-white tracking-wider group-hover:text-purple-400 transition-colors duration-300"
                        >
                            {{ collection.name }}
                        </h3>
                        <p class="mt-2 text-sm text-zinc-300 line-clamp-2">
                            {{ collection.description }}
                        </p>
                    </div>
                </div>

                <!-- Collection Stats -->
                <div class="p-6 space-y-4 border-t border-zinc-800">
                    <!-- Stats Grid -->
                    <div class="grid grid-cols-2 gap-4">
                        <div class="text-center p-3 bg-zinc-800/50 rounded-lg">
                            <span class="text-sm text-zinc-400">Products</span>
                            <p class="mt-1 text-lg font-mono text-white">
                                {{ collection.productsCount }}
                            </p>
                        </div>
                        <div class="text-center p-3 bg-zinc-800/50 rounded-lg">
                            <span class="text-sm text-zinc-400">Duration</span>
                            <p class="mt-1 text-sm font-mono text-white">
                                {{ formatDate(collection.startDate) }}
                            </p>
                        </div>
                    </div>

                    <!-- Actions -->
                    <div
                        class="flex justify-end space-x-3 pt-4 border-t border-zinc-800"
                    >
                        <button
                            @click="editCollection(collection)"
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
                            @click="deleteCollection(collection.id)"
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
        </div>

        <!-- Collection Modal -->
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
                                editingCollection
                                    ? 'Edit Collection'
                                    : 'Add New Collection'
                            }}
                        </h3>

                        <form
                            @submit.prevent="saveCollection"
                            class="space-y-4"
                        >
                            <!-- Name -->
                            <div>
                                <label
                                    class="block text-sm font-medium text-zinc-400 mb-1"
                                >
                                    Collection Name
                                </label>
                                <input
                                    type="text"
                                    v-model="collectionForm.name"
                                    class="w-full bg-black border border-zinc-800 text-white rounded-lg px-4 py-2.5 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all duration-300"
                                    required
                                />
                            </div>

                            <!-- Description -->
                            <div>
                                <label
                                    class="block text-sm font-medium text-zinc-400 mb-1"
                                >
                                    Description
                                </label>
                                <textarea
                                    v-model="collectionForm.description"
                                    rows="3"
                                    class="w-full bg-black border border-zinc-800 text-white rounded-lg px-4 py-2.5 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all duration-300"
                                    required
                                ></textarea>
                            </div>

                            <!-- Dates -->
                            <div class="grid grid-cols-2 gap-4">
                                <div>
                                    <label
                                        class="block text-sm font-medium text-zinc-400 mb-1"
                                    >
                                        Start Date
                                    </label>
                                    <input
                                        type="date"
                                        v-model="collectionForm.startDate"
                                        class="w-full bg-black border border-zinc-800 text-white rounded-lg px-4 py-2.5 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all duration-300"
                                        required
                                    />
                                </div>
                                <div>
                                    <label
                                        class="block text-sm font-medium text-zinc-400 mb-1"
                                    >
                                        End Date
                                    </label>
                                    <input
                                        type="date"
                                        v-model="collectionForm.endDate"
                                        class="w-full bg-black border border-zinc-800 text-white rounded-lg px-4 py-2.5 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all duration-300"
                                        required
                                    />
                                </div>
                            </div>

                            <!-- Status -->
                            <div>
                                <label
                                    class="block text-sm font-medium text-zinc-400 mb-1"
                                >
                                    Status
                                </label>
                                <select
                                    v-model="collectionForm.status"
                                    class="w-full bg-black border border-zinc-800 text-white rounded-lg px-4 py-2.5 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all duration-300"
                                >
                                    <option value="active">Active</option>
                                    <option value="scheduled">Scheduled</option>
                                    <option value="ended">Ended</option>
                                </select>
                            </div>
                        </form>
                    </div>
                    <div
                        class="bg-zinc-800/50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse"
                    >
                        <button
                            @click="saveCollection"
                            class="w-full inline-flex justify-center rounded-lg border border-transparent shadow-sm px-4 py-2 bg-purple-600 text-base font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:ml-3 sm:w-auto sm:text-sm transition-all duration-200"
                        >
                            {{
                                editingCollection
                                    ? 'Save Changes'
                                    : 'Add Collection'
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
import { collectionsData } from './MenuConfig'

// Search and Filter
const searchQuery = ref('')
const statusFilter = ref('')

// Modal and Form
const showModal = ref(false)
const editingCollection = ref(null)
const collectionForm = ref({
    name: '',
    description: '',
    status: 'active',
    startDate: '',
    endDate: '',
})

// Computed Properties
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

// Methods
const getStatusClass = status => {
    const baseClasses =
        'px-3 py-1 text-xs font-medium rounded-full border backdrop-blur-sm'
    const statusClasses = {
        active: 'bg-emerald-900/30 text-emerald-400 border-emerald-700/50',
        scheduled: 'bg-blue-900/30 text-blue-400 border-blue-700/50',
        ended: 'bg-zinc-900/30 text-zinc-400 border-zinc-700/50',
    }
    return `${baseClasses} ${statusClasses[status]}`
}

const formatDate = date => {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
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
    collectionForm.value = {
        name: '',
        description: '',
        status: 'active',
        startDate: '',
        endDate: '',
    }
}

const saveCollection = () => {
    if (editingCollection.value) {
        // Update existing collection
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
        // Add new collection
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

const deleteCollection = collectionId => {
    if (
        confirm(
            'Are you sure you want to delete this collection? This action cannot be undone.',
        )
    ) {
        const index = collectionsData.findIndex(c => c.id === collectionId)
        if (index !== -1) {
            collectionsData.splice(index, 1)
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

/* Image hover effect */
.group:hover .transform {
    transform: scale(1.05);
}

/* Gradient overlay */
.from-black\/80 {
    --tw-gradient-from: rgb(0 0 0 / 0.8);
    --tw-gradient-to: rgb(0 0 0 / 0);
    --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);
}

/* Font settings */
.font-mono {
    font-family: 'JetBrains Mono', monospace;
}

/* Card hover effect */
.hover\:border-purple-500\/50:hover {
    border-color: rgb(168 85 247 / 0.5);
}

/* Status badge hover effect */
[class*='rounded-full']:hover {
    filter: brightness(1.1);
    transition: filter 0.2s ease-in-out;
}

/* Date input color fix for webkit browsers */
input[type='date'] {
    color-scheme: dark;
}

/* Textarea resize handling */
textarea {
    resize: vertical;
    min-height: 100px;
}

/* Collection card image gradient overlay */
.collection-image-overlay {
    background: linear-gradient(
        to top,
        rgba(0, 0, 0, 0.8) 0%,
        rgba(0, 0, 0, 0) 100%
    );
}

/* Collection card hover effects */
.collection-card {
    transition: transform 0.3s ease-in-out;
}

.collection-card:hover {
    transform: translateY(-4px);
}

/* Button focus ring offset fix for dark theme */
button:focus {
    --tw-ring-offset-color: #000000;
}
</style>
