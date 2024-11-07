<template>
    <header
        class="bg-black/50 backdrop-blur-sm sticky top-0 z-10 border-b border-zinc-800"
    >
        <div class="flex items-center justify-between h-24 px-8">
            <div class="flex items-center space-x-4">
                <h2
                    class="text-2xl font-bold text-white tracking-wider uppercase"
                >
                    {{ title }}
                </h2>
            </div>
            <div class="flex items-center space-x-6">
                <!-- Notifications -->
                <button
                    class="p-2 text-zinc-400 hover:text-purple-400 transition-colors duration-200 relative"
                >
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
                        class="absolute top-0.5 right-0.5 w-2 h-2 bg-purple-500 rounded-full"
                    ></span>
                </button>

                <!-- Settings -->
                <button
                    class="p-2 text-zinc-400 hover:text-purple-400 transition-colors duration-200"
                >
                    <svg
                        class="w-6 h-6"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                    >
                        <path :d="iconPaths.settings" />
                    </svg>
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
