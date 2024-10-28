<template>
    <div class="min-h-screen flex bg-gray-100">
        <!-- Left side - Brand Section -->
        <div
            class="w-2/3 bg-indigo-600 text-white p-12 flex flex-col justify-center items-center relative overflow-hidden"
        >
            <!-- Content -->
            <div class="relative z-10 text-center">
                <a href="#" class="flex items-center justify-center mb-8">
                    <img src="#" alt="Logo" class="w-12 h-12 mr-4" />
                    <span class="text-3xl font-bold">AppName</span>
                </a>
                <h1 class="text-5xl font-bold mb-6">Welcome Back!</h1>
                <p class="text-xl text-indigo-100 max-w-lg">
                    Sign in to your account to continue your journey with us.
                </p>
            </div>
        </div>

        <!-- Right side - Login Form -->
        <div class="w-1/3 bg-white p-12 flex flex-col justify-center">
            <div class="max-w-md w-full mx-auto">
                <div class="text-center mb-8">
                    <h2 class="text-3xl font-bold text-gray-900">Sign In</h2>
                    <p class="mt-2 text-gray-600">
                        Don't have an account?
                        <router-link
                            to="/signup"
                            class="text-indigo-600 hover:text-indigo-500 font-medium"
                        >
                            Sign up
                        </router-link>
                    </p>
                </div>

                <form @submit.prevent="handleLogin" class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700"
                            >Email</label
                        >
                        <input
                            type="email"
                            v-model="loginForm.email"
                            class="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        />
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700"
                            >Password</label
                        >
                        <input
                            type="password"
                            v-model="loginForm.password"
                            class="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        />
                    </div>

                    <div class="flex items-center justify-between">
                        <div class="flex items-center">
                            <input
                                type="checkbox"
                                class="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                            />
                            <label class="ml-2 text-sm text-gray-600"
                                >Remember me</label
                            >
                        </div>
                        <a
                            href="#"
                            class="text-sm text-indigo-600 hover:text-indigo-500"
                            >Forgot password?</a
                        >
                    </div>

                    <button
                        type="submit"
                        class="w-full py-3 px-4 border border-transparent rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                    >
                        Sign in
                    </button>
                </form>

                <!-- Social Login -->
                <div class="mt-8">
                    <div class="relative">
                        <div class="absolute inset-0 flex items-center">
                            <div class="w-full border-t border-gray-300"></div>
                        </div>
                        <div class="relative flex justify-center text-sm">
                            <span class="px-2 bg-white text-gray-500"
                                >Or continue with</span
                            >
                        </div>
                    </div>

                    <div class="mt-6 grid grid-cols-2 gap-4">
                        <a
                            href="#"
                            class="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                            <img src="#" alt="Google" class="h-5 w-5 mr-2" />
                            Google
                        </a>
                        <a
                            href="#"
                            class="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                            <img src="#" alt="Facebook" class="h-5 w-5 mr-2" />
                            Facebook
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const loginForm = ref({
    email: '',
    password: '',
})

const handleLogin = () => {
    console.log('Login:', loginForm.value)
    // Add your login logic here
}
</script>

<style></style>
