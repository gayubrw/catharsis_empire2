<template>
    <div>
        <!-- Header -->
        <div class="flex justify-between items-center mb-6">
            <div>
                <h1 class="text-2xl font-bold text-white">Roles</h1>
                <p class="text-sm text-gray-300 mt-1">
                    Manage user roles and permissions
                </p>
            </div>
            <button
                @click="openAddRoleModal"
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
                Add Role
            </button>
        </div>

        <!-- Roles List -->
        <div class="bg-white rounded-xl shadow-sm overflow-hidden">
            <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                        <tr>
                            <th
                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Role
                            </th>
                            <th
                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Users
                            </th>
                            <th
                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Permissions
                            </th>
                            <th
                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Created
                            </th>
                            <th
                                class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                        <tr v-for="role in rolesData" :key="role.id">
                            <!-- Role Info -->
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div>
                                    <div
                                        class="text-sm font-medium text-gray-900"
                                    >
                                        {{ role.name }}
                                    </div>
                                    <div class="text-sm text-gray-500">
                                        {{ role.description }}
                                    </div>
                                </div>
                            </td>

                            <!-- Users Count -->
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span
                                    class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800"
                                >
                                    {{ role.usersCount }} users
                                </span>
                            </td>

                            <!-- Permissions -->
                            <td class="px-6 py-4">
                                <div class="flex flex-wrap gap-2 max-w-md">
                                    <span
                                        v-for="permission in role.permissions.slice(
                                            0,
                                            3,
                                        )"
                                        :key="permission"
                                        class="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full"
                                    >
                                        {{ formatPermission(permission) }}
                                    </span>
                                    <span
                                        v-if="role.permissions.length > 3"
                                        class="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full"
                                    >
                                        +{{ role.permissions.length - 3 }} more
                                    </span>
                                </div>
                            </td>

                            <!-- Created Date -->
                            <td
                                class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                            >
                                {{ formatDate(role.createdAt) }}
                            </td>

                            <!-- Actions -->
                            <td
                                class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
                            >
                                <button
                                    @click="editRole(role)"
                                    class="text-blue-600 hover:text-blue-900 mr-4"
                                >
                                    Edit
                                </button>
                                <button
                                    @click="deleteRole(role.id)"
                                    class="text-red-600 hover:text-red-900"
                                    :disabled="role.name === 'Super Admin'"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Role Modal -->
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

                <div
                    class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
                >
                    <h3 class="text-lg font-medium text-gray-900">
                        {{ editingRole ? 'Edit Role' : 'Add New Role' }}
                    </h3>

                    <form @submit.prevent="saveRole" class="mt-4 space-y-4">
                        <!-- Role Name -->
                        <div>
                            <label
                                for="name"
                                class="block text-sm font-medium text-gray-700"
                                >Role Name</label
                            >
                            <input
                                type="text"
                                id="name"
                                v-model="roleForm.name"
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
                                v-model="roleForm.description"
                                rows="2"
                                class="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
                                required
                            ></textarea>
                        </div>

                        <!-- Permissions -->
                        <div>
                            <label
                                class="block text-sm font-medium text-gray-700 mb-2"
                                >Permissions</label
                            >
                            <div class="space-y-2 max-h-60 overflow-y-auto">
                                <div
                                    v-for="permission in availablePermissions"
                                    :key="permission.id"
                                    class="flex items-center"
                                >
                                    <input
                                        type="checkbox"
                                        :id="permission.id"
                                        :value="permission.id"
                                        v-model="roleForm.permissions"
                                        class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                    />
                                    <label
                                        :for="permission.id"
                                        class="ml-2 block text-sm text-gray-900"
                                    >
                                        {{ permission.name }}
                                    </label>
                                </div>
                            </div>
                        </div>
                    </form>

                    <!-- Modal Actions -->
                    <div
                        class="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense"
                    >
                        <button
                            type="button"
                            @click="saveRole"
                            class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:col-start-2 sm:text-sm"
                        >
                            {{ editingRole ? 'Save Changes' : 'Add Role' }}
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
import { ref } from 'vue'
import { rolesData, availablePermissions } from './MenuConfig'

// Modal and Form
const showModal = ref(false)
const editingRole = ref(null)
const roleForm = ref({
    name: '',
    description: '',
    permissions: [],
})

// Methods
const formatPermission = permission => {
    return permission
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

const openAddRoleModal = () => {
    editingRole.value = null
    roleForm.value = {
        name: '',
        description: '',
        permissions: [],
    }
    showModal.value = true
}

const editRole = role => {
    editingRole.value = role
    roleForm.value = {
        name: role.name,
        description: role.description,
        permissions: [...role.permissions],
    }
    showModal.value = true
}

const closeModal = () => {
    showModal.value = false
    editingRole.value = null
    roleForm.value = {
        name: '',
        description: '',
        permissions: [],
    }
}

const saveRole = () => {
    if (editingRole.value) {
        // Update existing role
        const index = rolesData.findIndex(r => r.id === editingRole.value.id)
        if (index !== -1) {
            rolesData[index] = {
                ...rolesData[index],
                ...roleForm.value,
            }
        }
    } else {
        // Add new role
        const newRole = {
            id: rolesData.length + 1,
            ...roleForm.value,
            usersCount: 0,
            createdAt: new Date().toISOString().split('T')[0],
        }
        rolesData.push(newRole)
    }
    closeModal()
}

const deleteRole = roleId => {
    const role = rolesData.find(r => r.id === roleId)
    if (role.name === 'Super Admin') {
        alert('The Super Admin role cannot be deleted.')
        return
    }

    if (
        confirm(
            'Are you sure you want to delete this role? This action cannot be undone.',
        )
    ) {
        const index = rolesData.findIndex(r => r.id === roleId)
        if (index !== -1) {
            rolesData.splice(index, 1)
        }
    }
}
</script>
