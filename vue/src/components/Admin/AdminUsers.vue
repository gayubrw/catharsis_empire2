<template>
    <div class="min-h-screen bg-black p-28">
        <!-- Header -->
        <div class="mb-8">
            <div class="flex justify-between items-center">
                <div>
                    <h1
                        class="text-3xl font-bold text-white tracking-wider uppercase"
                    >
                        Users
                    </h1>
                    <p class="text-zinc-400 mt-1 tracking-wide">
                        Manage system users and their permissions
                    </p>
                </div>
                <button
                    @click="openAddUserModal"
                    class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all duration-300 flex items-center"
                >
                    <svg
                        class="w-4 h-4 mr-2"
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
                    Add User
                </button>
            </div>
        </div>

        <!-- Search and Filters -->
        <div class="bg-zinc-900 rounded-lg border border-zinc-800 p-6 mb-8">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <!-- Search -->
                <div class="relative">
                    <input
                        type="text"
                        v-model="searchQuery"
                        class="w-full bg-black border border-zinc-800 text-white rounded-lg pl-10 pr-4 py-2.5 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all duration-300"
                        placeholder="Search users..."
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

                <!-- Role Filter -->
                <select
                    v-model="roleFilter"
                    class="bg-black border border-zinc-800 text-white rounded-lg px-4 py-2.5 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all duration-300"
                >
                    <option value="">All Roles</option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                    <option value="editor">Editor</option>
                </select>

                <!-- Status Filter -->
                <select
                    v-model="statusFilter"
                    class="bg-black border border-zinc-800 text-white rounded-lg px-4 py-2.5 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all duration-300"
                >
                    <option value="">All Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </select>
            </div>
        </div>

        <!-- Users Table -->
        <div
            class="bg-zinc-900 rounded-lg border border-zinc-800 overflow-hidden"
        >
            <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-zinc-800">
                    <thead>
                        <tr class="bg-zinc-900/50">
                            <th
                                v-for="header in tableHeaders"
                                :key="header.key"
                                class="px-6 py-4 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider"
                            >
                                {{ header.label }}
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
                            v-for="user in paginatedUsers"
                            :key="user.id"
                            class="hover:bg-zinc-800/50 transition-colors duration-200"
                        >
                            <!-- User Info -->
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="flex items-center">
                                    <div
                                        class="h-10 w-10 rounded-lg bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center text-white"
                                    >
                                        {{ getUserInitials(user.name) }}
                                    </div>
                                    <div class="ml-4">
                                        <div
                                            class="text-sm font-medium text-white"
                                        >
                                            {{ user.name }}
                                        </div>
                                        <div class="text-sm text-zinc-400">
                                            {{ user.email }}
                                        </div>
                                    </div>
                                </div>
                            </td>

                            <!-- Role -->
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span :class="getRoleClass(user.role)">
                                    {{ user.role }}
                                </span>
                            </td>

                            <!-- Status -->
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span :class="getStatusClass(user.status)">
                                    {{ user.status }}
                                </span>
                            </td>

                            <!-- Last Login -->
                            <td
                                class="px-6 py-4 whitespace-nowrap text-sm text-zinc-400"
                            >
                                {{ formatLastLogin(user.lastLogin) }}
                            </td>

                            <!-- Actions -->
                            <td
                                class="px-6 py-4 whitespace-nowrap text-right space-x-3"
                            >
                                <button
                                    @click="editUser(user)"
                                    class="text-purple-400 hover:text-purple-300 transition-colors duration-200 text-sm font-medium"
                                >
                                    Edit
                                </button>
                                <button
                                    @click="deleteUser(user.id)"
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
            <div class="bg-zinc-900 px-6 py-4 border-t border-zinc-800">
                <div class="flex items-center justify-between">
                    <div class="text-sm text-zinc-400">
                        Showing
                        <span class="font-medium text-white">{{
                            startIndex + 1
                        }}</span>
                        to
                        <span class="font-medium text-white">{{
                            endIndex
                        }}</span>
                        of
                        <span class="font-medium text-white">{{
                            totalUsers
                        }}</span>
                        users
                    </div>
                    <div class="flex items-center space-x-2">
                        <button
                            @click="previousPage"
                            :disabled="currentPage === 1"
                            class="px-3 py-1 text-sm text-zinc-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                        >
                            Previous
                        </button>
                        <div class="flex space-x-1">
                            <button
                                v-for="page in displayedPages"
                                :key="page"
                                @click="goToPage(page)"
                                class="px-3 py-1 text-sm rounded-md transition-all duration-200"
                                :class="
                                    currentPage === page
                                        ? 'bg-purple-600 text-white'
                                        : 'text-zinc-400 hover:text-white'
                                "
                            >
                                {{ page }}
                            </button>
                        </div>
                        <button
                            @click="nextPage"
                            :disabled="currentPage === totalPages"
                            class="px-3 py-1 text-sm text-zinc-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- User Modal -->
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
                    <div class="bg-zinc-900 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <h3 class="text-lg font-medium text-white mb-4">
                            {{ editingUser ? 'Edit User' : 'Add New User' }}
                        </h3>
                        <form @submit.prevent="saveUser" class="space-y-4">
                            <div>
                                <label
                                    class="block text-sm font-medium text-zinc-400 mb-1"
                                    >Name</label
                                >
                                <input
                                    type="text"
                                    v-model="userForm.name"
                                    class="w-full bg-black border border-zinc-800 text-white rounded-lg px-4 py-2.5 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all duration-300"
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    class="block text-sm font-medium text-zinc-400 mb-1"
                                    >Email</label
                                >
                                <input
                                    type="email"
                                    v-model="userForm.email"
                                    class="w-full bg-black border border-zinc-800 text-white rounded-lg px-4 py-2.5 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all duration-300"
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    class="block text-sm font-medium text-zinc-400 mb-1"
                                    >Role</label
                                >
                                <select
                                    v-model="userForm.role"
                                    class="w-full bg-black border border-zinc-800 text-white rounded-lg px-4 py-2.5 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all duration-300"
                                >
                                    <option value="admin">Admin</option>
                                    <option value="user">User</option>
                                    <option value="editor">Editor</option>
                                </select>
                            </div>
                            <div>
                                <label
                                    class="block text-sm font-medium text-zinc-400 mb-1"
                                    >Status</label
                                >
                                <select
                                    v-model="userForm.status"
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
                            @click="saveUser"
                            class="w-full inline-flex justify-center rounded-lg border border-transparent shadow-sm px-4 py-2 bg-purple-600 text-base font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:ml-3 sm:w-auto sm:text-sm transition-all duration-200"
                        >
                            {{ editingUser ? 'Save Changes' : 'Add User' }}
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
import { usersData, tableHeaders } from './MenuConfig'

// Search and Filter
const searchQuery = ref('')
const roleFilter = ref('')
const statusFilter = ref('')

// Pagination
const itemsPerPage = 4 // Changed from 8 to 4
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

const paginatedUsers = computed(() => {
    return filteredUsers.value.slice(startIndex.value, endIndex.value)
})

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
const getUserInitials = name => {
    return name
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase()
}

const getRoleClass = role => {
    const baseClasses = 'px-3 py-1 text-xs font-medium rounded-full border'
    const roleClasses = {
        admin: 'bg-purple-900/30 text-purple-400 border-purple-700/50',
        user: 'bg-blue-900/30 text-blue-400 border-blue-700/50',
        editor: 'bg-green-900/30 text-green-400 border-green-700/50',
    }
    return `${baseClasses} ${roleClasses[role]}`
}

const getStatusClass = status => {
    const baseClasses = 'px-3 py-1 text-xs font-medium rounded-full border'
    const statusClasses = {
        active: 'bg-emerald-900/30 text-emerald-400 border-emerald-700/50',
        inactive: 'bg-zinc-900/30 text-zinc-400 border-zinc-700/50',
        suspended: 'bg-red-900/30 text-red-400 border-red-700/50',
    }
    return `${baseClasses} ${statusClasses[status]}`
}

const formatLastLogin = date => {
    if (date === 'Never') return 'Never logged in'
    const loginDate = new Date(date)
    const now = new Date()
    const diffTime = Math.abs(now - loginDate)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 1) return 'Yesterday'
    if (diffDays < 1) {
        const diffHours = Math.ceil(diffTime / (1000 * 60 * 60))
        if (diffHours < 1) {
            const diffMinutes = Math.ceil(diffTime / (1000 * 60))
            return `${diffMinutes} minutes ago`
        }
        return `${diffHours} hours ago`
    }
    if (diffDays < 7) return `${diffDays} days ago`

    return loginDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    })
}

// Modal Methods
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
            avatar: `/api/placeholder/40/40`,
        }
        usersData.push(newUser)
    }
    closeModal()
}

const deleteUser = userId => {
    if (
        confirm(
            'Are you sure you want to delete this user? This action cannot be undone.',
        )
    ) {
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

/* Status and role badge glow effect on hover */
[class*='bg-'].rounded-full:hover {
    filter: brightness(1.1);
    transition: filter 0.2s ease-in-out;
}
</style>
