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
                    placeholder="Search users..."
                />
            </div>

            <!-- Filters -->
            <div class="flex gap-4">
                <select
                    v-model="roleFilter"
                    class="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                    <option value="">All Roles</option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                    <option value="editor">Editor</option>
                </select>

                <select
                    v-model="statusFilter"
                    class="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                    <option value="">All Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="suspended">Suspended</option>
                </select>

                <!-- Add User Button -->
                <button
                    @click="openAddUserModal"
                    class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    Add User
                </button>
            </div>
        </div>
    </div>

    <!-- Users Table -->
    <div class="bg-white rounded-xl shadow-sm overflow-hidden">
        <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                    <tr>
                        <th
                            v-for="header in tableHeaders"
                            :key="header.key"
                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            {{ header.label }}
                        </th>
                        <th class="px-6 py-3 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-for="user in filteredUsers" :key="user.id">
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="flex items-center">
                                <div class="h-10 w-10 flex-shrink-0">
                                    <img
                                        :src="user.avatar"
                                        class="h-10 w-10 rounded-full"
                                        :alt="user.name"
                                    />
                                </div>
                                <div class="ml-4">
                                    <div
                                        class="text-sm font-medium text-gray-900"
                                    >
                                        {{ user.name }}
                                    </div>
                                    <div class="text-sm text-gray-500">
                                        {{ user.email }}
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <span
                                class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                                :class="getRoleClass(user.role)"
                            >
                                {{ user.role }}
                            </span>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <span
                                class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                                :class="getStatusClass(user.status)"
                            >
                                {{ user.status }}
                            </span>
                        </td>
                        <td
                            class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                        >
                            {{ user.lastLogin }}
                        </td>
                        <td
                            class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
                        >
                            <button
                                @click="editUser(user)"
                                class="text-blue-600 hover:text-blue-900 mr-4"
                            >
                                Edit
                            </button>
                            <button
                                @click="deleteUser(user.id)"
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
                            <span class="font-medium">{{ totalUsers }}</span>
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

    <!-- Add/Edit User Modal -->
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
                        {{ editingUser ? 'Edit User' : 'Add New User' }}
                    </h3>
                    <div class="mt-2">
                        <form @submit.prevent="saveUser" class="space-y-4">
                            <div>
                                <label
                                    for="name"
                                    class="block text-sm font-medium text-gray-700"
                                    >Name</label
                                >
                                <input
                                    type="text"
                                    id="name"
                                    v-model="userForm.name"
                                    class="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    for="email"
                                    class="block text-sm font-medium text-gray-700"
                                    >Email</label
                                >
                                <input
                                    type="email"
                                    id="email"
                                    v-model="userForm.email"
                                    class="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    for="role"
                                    class="block text-sm font-medium text-gray-700"
                                    >Role</label
                                >
                                <select
                                    id="role"
                                    v-model="userForm.role"
                                    class="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="admin">Admin</option>
                                    <option value="user">User</option>
                                    <option value="editor">Editor</option>
                                </select>
                            </div>
                            <div>
                                <label
                                    for="status"
                                    class="block text-sm font-medium text-gray-700"
                                    >Status</label
                                >
                                <select
                                    id="status"
                                    v-model="userForm.status"
                                    class="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                    <option value="suspended">Suspended</option>
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
                        @click="saveUser"
                        class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:col-start-2 sm:text-sm"
                    >
                        {{ editingUser ? 'Save Changes' : 'Add User' }}
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
import { usersData, tableHeaders } from './MenuConfig'

// Search and Filter
const searchQuery = ref('')
const roleFilter = ref('')
const statusFilter = ref('')

// Pagination
const itemsPerPage = 10
const currentPage = ref(1)

// Modal and Form
const showModal = ref(false)
const editingUser = ref(null)
const userForm = ref({
    name: '',
    email: '',
    role: 'user',
    status: 'active',
})

// Computed Properties
const filteredUsers = computed(() => {
    return usersData.filter(user => {
        const matchesSearch =
            user.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.value.toLowerCase())
        const matchesRole = !roleFilter.value || user.role === roleFilter.value
        const matchesStatus =
            !statusFilter.value || user.status === statusFilter.value
        return matchesSearch && matchesRole && matchesStatus
    })
})

const totalUsers = computed(() => filteredUsers.value.length)
const totalPages = computed(() => Math.ceil(totalUsers.value / itemsPerPage))
const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage)
const endIndex = computed(() =>
    Math.min(startIndex.value + itemsPerPage, totalUsers.value),
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
const getRoleClass = role => {
    const classes = {
        admin: 'bg-purple-100 text-purple-800',
        user: 'bg-green-100 text-green-800',
        editor: 'bg-blue-100 text-blue-800',
    }
    return classes[role] || 'bg-gray-100 text-gray-800'
}

const getStatusClass = status => {
    const classes = {
        active: 'bg-green-100 text-green-800',
        inactive: 'bg-gray-100 text-gray-800',
        suspended: 'bg-red-100 text-red-800',
    }
    return classes[status] || 'bg-gray-100 text-gray-800'
}

const openAddUserModal = () => {
    editingUser.value = null
    userForm.value = {
        name: '',
        email: '',
        role: 'user',
        status: 'active',
    }
    showModal.value = true
}

const editUser = user => {
    editingUser.value = user
    userForm.value = { ...user }
    showModal.value = true
}

const closeModal = () => {
    showModal.value = false
    editingUser.value = null
    userForm.value = {
        name: '',
        email: '',
        role: 'user',
        status: 'active',
    }
}

const saveUser = () => {
    if (editingUser.value) {
        // Update existing user
        const index = usersData.findIndex(u => u.id === editingUser.value.id)
        if (index !== -1) {
            usersData[index] = {
                ...usersData[index],
                ...userForm.value,
            }
        }
    } else {
        // Add new user
        const newUser = {
            id: usersData.length + 1,
            ...userForm.value,
            lastLogin: 'Never',
            avatar: '/api/placeholder/40/40',
        }
        usersData.push(newUser)
    }
    closeModal()
}

const deleteUser = userId => {
    if (confirm('Are you sure you want to delete this user?')) {
        const index = usersData.findIndex(u => u.id === userId)
        if (index !== -1) {
            usersData.splice(index, 1)
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
