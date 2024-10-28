<template>
    <div class="min-h-screen bg-gray-50">
        <!-- Navigation -->
        <nav class="bg-white shadow-sm">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between h-16 items-center">
                    <div class="flex items-center">
                        <button @click="toggleMenu" class="text-gray-500">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        </button>
                        <span class="ml-4 text-xl font-semibold text-gray-800"
                            >HomeVue</span
                        >
                    </div>
                    <div class="flex items-center space-x-4">
                        <div class="relative">
                            <div
                                class="absolute left-3 top-1/2 transform -translate-y-1/2"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    class="h-5 w-5 text-gray-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                            </div>
                            <input
                                v-model="searchQuery"
                                type="text"
                                placeholder="Search..."
                                class="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        <div class="relative">
                            <button
                                @click="toggleNotifications"
                                class="text-gray-500"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    class="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                                    />
                                </svg>
                            </button>
                            <span
                                v-if="notificationCount > 0"
                                class="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center"
                            >
                                {{ notificationCount }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </nav>

        <!-- Hero Section -->
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div class="text-center">
                <h1 class="text-4xl font-bold text-gray-900 mb-4">
                    Welcome to HomeVue
                </h1>
                <p class="text-lg text-gray-600 mb-8">
                    Discover a new way to experience elegant and minimalist
                    design
                </p>
                <button
                    @click="getStarted"
                    class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                    Get Started
                </button>
            </div>
        </div>

        <!-- Features Grid -->
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div
                    v-for="feature in features"
                    :key="feature.id"
                    class="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                    <div class="h-40 bg-gray-100 rounded-lg mb-4"></div>
                    <h3 class="text-lg font-semibold text-gray-800 mb-2">
                        {{ feature.title }}
                    </h3>
                    <p class="text-gray-600">
                        {{ feature.description }}
                    </p>
                </div>
            </div>
        </div>

        <!-- Footer -->
        <footer class="bg-white border-t mt-12">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div
                    class="flex flex-col md:flex-row justify-between items-center"
                >
                    <div class="text-gray-600 mb-4 md:mb-0">
                        © {{ currentYear }} HomeVue. All rights reserved.
                    </div>
                    <div class="flex space-x-6">
                        <a
                            v-for="link in footerLinks"
                            :key="link.id"
                            :href="link.url"
                            class="text-gray-600 hover:text-gray-900"
                        >
                            {{ link.text }}
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// State
const searchQuery = ref('')
const notificationCount = ref(3)
const isMenuOpen = ref(false)

// Computed
const currentYear = computed(() => new Date().getFullYear())

// Data
const features = [
    {
        id: 1,
        title: 'Feature 1',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.',
    },
    {
        id: 2,
        title: 'Feature 2',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.',
    },
    {
        id: 3,
        title: 'Feature 3',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.',
    },
]

const footerLinks = [
    { id: 1, text: 'About', url: '#' },
    { id: 2, text: 'Features', url: '#' },
    { id: 3, text: 'Contact', url: '#' },
]

// Methods
const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value
}

const toggleNotifications = () => {
    // Add notification logic here
}

const getStarted = () => {
    // Add get started logic here
}
</script>

<style scoped>
/* Add any component-specific styles here if needed */
</style>
