<template>
    <div class="w-full h-[43rem] bg-black">
        <!-- Previous template code remains the same until the form element -->
        <div
            class="h-full w-full max-w-md mx-auto px-4 flex flex-col justify-center"
        >
            <!-- Header -->
            <div class="text-center mb-8">
                <h1 class="text-2xl font-bold mb-2 text-white">
                    Create Account
                </h1>
                <p class="text-gray-400">Fill in your details to register</p>
            </div>

            <!-- Alert for success/error messages -->
            <div
                v-if="alert.show"
                :class="`mb-4 p-4 rounded-lg ${alert.type === 'success' ? 'bg-green-900 text-green-200' : 'bg-red-900 text-red-200'}`"
            >
                {{ alert.message }}
            </div>

            <!-- Form -->
            <form @submit.prevent="handleSubmit" class="space-y-6">
                <!-- Name Field -->
                <div class="space-y-2">
                    <label
                        for="name"
                        class="block text-sm font-medium text-gray-300"
                    >
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
                    <label
                        for="email"
                        class="block text-sm font-medium text-gray-300"
                    >
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

                <!-- Password Field -->
                <div class="space-y-2">
                    <label
                        for="password"
                        class="block text-sm font-medium text-gray-300"
                    >
                        Password
                    </label>
                    <div class="relative">
                        <input
                            id="password"
                            :type="showPassword ? 'text' : 'password'"
                            v-model="password"
                            required
                            class="w-full px-4 py-3 rounded-lg border bg-zinc-900 border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition"
                            :class="{ 'border-red-500': errors.password }"
                        />
                        <button
                            type="button"
                            @click="togglePassword"
                            class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                        >
                            <svg
                                v-if="showPassword"
                                class="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                />
                            </svg>
                            <svg
                                v-else
                                class="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                                />
                            </svg>
                        </button>
                    </div>
                    <p v-if="errors.password" class="text-red-500 text-sm mt-1">
                        {{ errors.password }}
                    </p>
                </div>

                <!-- Terms and Conditions -->
                <div class="flex items-center">
                    <input
                        id="terms"
                        type="checkbox"
                        v-model="acceptTerms"
                        required
                        class="h-4 w-4 text-gray-600 focus:ring-gray-500 border-gray-700 rounded bg-gray-900"
                    />
                    <label for="terms" class="ml-2 block text-sm text-gray-300">
                        I agree to the
                        <a href="#" class="text-white hover:underline">Terms</a>
                        and
                        <a href="#" class="text-white hover:underline"
                            >Privacy Policy</a
                        >
                    </label>
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
                        <circle
                            class="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            stroke-width="4"
                        />
                        <path
                            class="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                    </svg>
                    {{ loading ? 'Creating account...' : 'Create Account' }}
                </button>

                <!-- Sign In Link -->
                <p class="text-center text-sm text-gray-400">
                    Already have an account?
                    <RouterLink
                        to="/signin"
                        class="font-medium text-white hover:underline"
                    >
                        Sign in
                    </RouterLink>
                </p>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()

// Form fields
const name = ref('')
const email = ref('')
const password = ref('')
const acceptTerms = ref(false)
const showPassword = ref(false)
const loading = ref(false)
const errors = reactive({
    name: '',
    email: '',
    password: '',
})

// Alert state
const alert = reactive({
    show: false,
    message: '',
    type: 'error', // 'error' or 'success'
})

// Toggle password visibility
const togglePassword = () => {
    showPassword.value = !showPassword.value
}

// Show alert message
const showAlert = (message, type = 'error') => {
    alert.show = true
    alert.message = message
    alert.type = type

    // Hide alert after 5 seconds
    setTimeout(() => {
        alert.show = false
        alert.message = ''
    }, 5000)
}

// Form submission
const handleSubmit = async () => {
    // Reset errors
    errors.name = ''
    errors.email = ''
    errors.password = ''
    alert.show = false

    // Basic validation
    if (!name.value.trim()) {
        errors.name = 'Name is required'
        return
    }

    if (!email.value.trim()) {
        errors.email = 'Email is required'
        return
    }

    if (!password.value) {
        errors.password = 'Password is required'
        return
    }

    // Password strength validation
    if (password.value.length < 8) {
        errors.password = 'Password must be at least 8 characters long'
        return
    }

    try {
        loading.value = true

        await axios.post(`${axios.defaults.baseURL}/auth/signup`, {
            name: name.value.trim(),
            email: email.value.trim(),
            password: password.value,
            acceptTerms: acceptTerms.value,
        })

        // Show success message
        showAlert(
            'Account created successfully! Redirecting to login...',
            'success',
        )

        // Reset form
        name.value = ''
        email.value = ''
        password.value = ''
        acceptTerms.value = false

        // Redirect to login page after 2 seconds
        setTimeout(() => {
            router.push('/signin')
        }, 2000)
    } catch (error) {
        console.error('Registration error:', error)

        if (error.response) {
            // Handle specific error messages from the backend
            if (error.response.data.error === 'Email already registered') {
                errors.email = 'This email is already registered'
            } else {
                showAlert(
                    error.response.data.error ||
                        'Registration failed. Please try again.',
                )
            }
        } else {
            showAlert(
                'Network error. Please check your connection and try again.',
            )
        }
    } finally {
        loading.value = false
    }
}
</script>
