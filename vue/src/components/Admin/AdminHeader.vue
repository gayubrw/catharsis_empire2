<template>
    <header class="bg-black shadow-sm sticky top-0 z-10">
        <div class="flex items-center justify-between h-24 px-8 py-4">
            <div class="flex items-center space-x-4">
                <h2 class="text-2xl font-bold text-gray-800">
                    {{ title }}
                </h2>
            </div>
            <div class="flex items-center space-x-4">
                <!-- Notifications -->
                <button class="p-2 text-white hover:text-gray-700 relative">
                    <svg
                        class="w-6 h-6"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                    >
                        <path :d="iconPaths.bell" />
                    </svg>
                    <span
                        class="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"
                    ></span>
                </button>

                <!-- User Profile -->
                <AdminUserProfile />
            </div>
        </div>
    </header>
</template>

<script setup>
import { iconPaths } from './MenuConfig'
import AdminUserProfile from './AdminUserProfile.vue'

defineProps({
    title: {
        type: String,
        required: true,
    },
})
</script>
