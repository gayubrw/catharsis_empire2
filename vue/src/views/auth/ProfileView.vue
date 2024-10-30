<template>
    <div class="w-full h-[43rem] bg-black">
        <div class="h-full w-full max-w-md mx-auto px-4 flex flex-col justify-center space-y-6">
            <!-- Header -->
            <div class="text-center">
                <h1 class="text-2xl font-bold mb-2 text-white">Profile</h1>
                <p class="text-gray-400">Manage your account details</p>
            </div>

            <!-- Profile Form -->
            <form @submit.prevent="handleSubmit" class="space-y-6">
                <!-- Profile Picture -->
                <div class="flex flex-col items-center space-y-3">
                    <div class="w-24 h-24 rounded-full bg-zinc-800 flex items-center justify-center border-2 border-gray-700">
                        <svg v-if="!profileImage" class="w-12 h-12 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <img v-else :src="profileImage" class="w-full h-full rounded-full object-cover" />
                    </div>
                    <button type="button" class="text-sm text-white hover:underline">
                        Change Profile Picture
                    </button>
                </div>

                <!-- Name Field -->
                <div class="space-y-2">
                    <label for="name" class="block text-sm font-medium text-gray-300">
                        Full Name
                    </label>
                    <input
                        id="name"
                        type="text"
                        v-model="name"
                        required
                        class="w-full px-4 py-3 rounded-lg border bg-zinc-900 border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition"
                        :class="{ 'border-red-500': errors.name }"
                    />
                    <p v-if="errors.name" class="text-red-500 text-sm mt-1">
                        {{ errors.name }}
                    </p>
                </div>

                <!-- Email Field -->
                <div class="space-y-2">
                    <label for="email" class="block text-sm font-medium text-gray-300">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        v-model="email"
                        required
                        class="w-full px-4 py-3 rounded-lg border bg-zinc-900 border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition"
                        :class="{ 'border-red-500': errors.email }"
                    />
                    <p v-if="errors.email" class="text-red-500 text-sm mt-1">
                        {{ errors.email }}
                    </p>
                </div>

                <!-- Current Password Field -->
                <div class="space-y-2">
                    <label for="currentPassword" class="block text-sm font-medium text-gray-300">
                        Current Password
                    </label>
                    <div class="relative">
                        <input
                            id="currentPassword"
                            :type="showCurrentPassword ? 'text' : 'password'"
                            v-model="currentPassword"
                            class="w-full px-4 py-3 rounded-lg border bg-zinc-900 border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition"
                            :class="{ 'border-red-500': errors.currentPassword }"
                        />
                        <button
                            type="button"
                            @click="toggleCurrentPassword"
                            class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                        >
                            <svg
                                v-if="showCurrentPassword"
                                class="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            <svg
                                v-else
                                class="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                            </svg>
                        </button>
                    </div>
                    <p v-if="errors.currentPassword" class="text-red-500 text-sm mt-1">
                        {{ errors.currentPassword }}
                    </p>
                </div>

                <!-- New Password Field -->
                <div class="space-y-2">
                    <label for="newPassword" class="block text-sm font-medium text-gray-300">
                        New Password (Optional)
                    </label>
                    <div class="relative">
                        <input
                            id="newPassword"
                            :type="showNewPassword ? 'text' : 'password'"
                            v-model="newPassword"
                            class="w-full px-4 py-3 rounded-lg border bg-zinc-900 border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition"
                            :class="{ 'border-red-500': errors.newPassword }"
                        />
                        <button
                            type="button"
                            @click="toggleNewPassword"
                            class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                        >
                            <svg
                                v-if="showNewPassword"
                                class="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            <svg
                                v-else
                                class="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                            </svg>
                        </button>
                    </div>
                    <p v-if="errors.newPassword" class="text-red-500 text-sm mt-1">
                        {{ errors.newPassword }}
                    </p>
                </div>

                <!-- Submit Button -->
                <button
                    type="submit"
                    :disabled="loading"
                    class="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-black bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                    <svg
                        v-if="loading"
                        class="animate-spin -ml-1 mr-3 h-5 w-5 text-black"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    {{ loading ? 'Saving changes...' : 'Save Changes' }}
                </button>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

// Form fields
const name = ref('')
const email = ref('')
const currentPassword = ref('')
const newPassword = ref('')
const showCurrentPassword = ref(false)
const showNewPassword = ref(false)
const loading = ref(false)
const profileImage = ref(null)
const errors = reactive({
    name: '',
    email: '',
    currentPassword: '',
    newPassword: '',
})

// Toggle password visibility
const toggleCurrentPassword = () => {
    showCurrentPassword.value = !showCurrentPassword.value
}

const toggleNewPassword = () => {
    showNewPassword.value = !showNewPassword.value
}

// Form submission
const handleSubmit = async () => {
    // Reset errors
    errors.name = ''
    errors.email = ''
    errors.currentPassword = ''
    errors.newPassword = ''

    // Basic validation
    if (!name.value) {
        errors.name = 'Name is required'
        return
    }

    if (!email.value) {
        errors.email = 'Email is required'
        return
    }

    if (!currentPassword.value) {
        errors.currentPassword = 'Current password is required'
        return
    }

    try {
        loading.value = true
        // Add your profile update logic here
        await new Promise(resolve => setTimeout(resolve, 1500)) // Simulate API call
        console.log('Form submitted:', {
            name: name.value,
            email: email.value,
            currentPassword: currentPassword.value,
            newPassword: newPassword.value,
        })
    } catch (error) {
        console.error('Profile update error:', error)
    } finally {
        loading.value = false
    }
}
</script>
