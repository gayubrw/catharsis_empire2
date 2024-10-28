<template>
    <div class="min-h-screen flex bg-gray-100">
        <!-- Left side - Brand Section -->
        <div
            class="w-2/3 bg-indigo-600 text-white p-12 flex flex-col justify-center items-center relative overflow-hidden"
        >
            <div
                class="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 opacity-90"
            ></div>

            <!-- Decorative circles -->
            <div
                class="absolute top-0 left-0 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"
            ></div>
            <div
                class="absolute bottom-0 right-0 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"
            ></div>

            <!-- Content -->
            <div class="relative z-10 text-center">
                <a href="#" class="flex items-center justify-center mb-8">
                    <img src="#" alt="Logo" class="w-12 h-12 mr-4" />
                    <span class="text-3xl font-bold">AppName</span>
                </a>
                <h1 class="text-5xl font-bold mb-6">Join Us Today!</h1>
                <p class="text-xl text-indigo-100 max-w-lg">
                    Create an account and start your journey with us.
                </p>
            </div>
        </div>

        <!-- Right side - Register Form -->
        <div class="w-1/3 bg-white p-12 flex flex-col justify-center">
            <div class="max-w-md w-full mx-auto">
                <div class="text-center mb-8">
                    <h2 class="text-3xl font-bold text-gray-900">
                        Create Account
                    </h2>
                    <p class="mt-2 text-gray-600">
                        Already have an account?
                        <router-link
                            to="/signin"
                            class="text-indigo-600 hover:text-indigo-500 font-medium"
                        >
                            Sign in
                        </router-link>
                    </p>
                </div>

                <form @submit.prevent="handleRegister" class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700"
                            >Full Name</label
                        >
                        <input
                            type="text"
                            v-model="registerForm.name"
                            class="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        />
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700"
                            >Email</label
                        >
                        <input
                            type="email"
                            v-model="registerForm.email"
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
                            v-model="registerForm.password"
                            class="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        />
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700"
                            >Confirm Password</label
                        >
                        <input
                            type="password"
                            v-model="registerForm.confirmPassword"
                            class="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        />
                    </div>

                    <div class="flex items-center">
                        <input
                            type="checkbox"
                            class="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                        />
                        <label class="ml-2 text-sm text-gray-600">
                            I agree to the
                            <a
                                href="#"
                                class="text-indigo-600 hover:text-indigo-500"
                                >Terms of Service</a
                            >
                            and
                            <a
                                href="#"
                                class="text-indigo-600 hover:text-indigo-500"
                                >Privacy Policy</a
                            >
                        </label>
                    </div>

                    <button
                        type="submit"
                        class="w-full py-3 px-4 border border-transparent rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                    >
                        Create Account
                    </button>
                </form>

                <!-- Social Register -->
                <div class="mt-8">
                    <div class="relative">
                        <div class="absolute inset-0 flex items-center">
                            <div class="w-full border-t border-gray-300"></div>
                        </div>
                        <div class="relative flex justify-center text-sm">
                            <span class="px-2 bg-white text-gray-500"
                                >Or sign up with</span
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

const registerForm = ref({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
})

const handleRegister = () => {
    console.log('Register:', registerForm.value)
    // Add your registration logic here
}
</script>

<style>
@keyframes blob {
    0% {
        transform: translate(0px, 0px) scale(1);
    }
    33% {
        transform: translate(30px, -50px) scale(1.1);
    }
    66% {
        transform: translate(-20px, 20px) scale(0.9);
    }
    100% {
        transform: translate(0px, 0px) scale(1);
    }
}

.animate-blob {
    animation: blob 7s infinite;
}

.animation-delay-2000 {
    animation-delay: 2s;
}
</style>
