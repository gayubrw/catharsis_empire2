<template>
    <div class="relative">
        <button
            @click="toggleUserMenu"
            class="flex items-center space-x-3 p-2 rounded-lg hover:bg-zinc-800/50 transition-all duration-200 group"
        >
            <div
                class="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center text-white font-bold group-hover:from-purple-500 group-hover:to-purple-700 transition-all duration-200"
            >
                {{ userInitials }}
            </div>
            <div class="text-left">
                <p
                    class="text-sm font-semibold text-white group-hover:text-purple-400 transition-colors duration-200"
                >
                    {{ user.name }}
                </p>
                <p class="text-xs text-zinc-400">{{ user.email }}</p>
            </div>
        </button>

        <!-- Dropdown Menu -->
        <div
            v-if="showUserMenu"
            class="absolute right-0 mt-2 w-48 bg-zinc-900 rounded-lg shadow-xl border border-zinc-800 py-1 z-50"
        >
            <!-- View Store Link -->
            <router-link
                to="/"
                class="flex items-center px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-800 transition-colors duration-200"
            >
                <svg
                    class="w-4 h-4 mr-2 text-zinc-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                >
                    <path d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                View Store
            </router-link>

            <a
                href="#"
                class="flex items-center px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-800 transition-colors duration-200"
            >
                <svg
                    class="w-4 h-4 mr-2 text-zinc-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                >
                    <path
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                </svg>
                Profile
            </a>
            <a
                href="#"
                class="flex items-center px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-800 transition-colors duration-200"
            >
                <svg
                    class="w-4 h-4 mr-2 text-zinc-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                >
                    <path
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                </svg>
                Settings
            </a>
            <div class="border-t border-zinc-800 my-1"></div>
            <a
                href="#"
                class="flex items-center px-4 py-2 text-sm text-red-400 hover:bg-zinc-800 transition-colors duration-200"
            >
                <svg
                    class="w-4 h-4 mr-2"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                >
                    <path
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                </svg>
                Logout
            </a>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const user = ref({
    name: 'Admin User',
    email: 'admin@dystopian.com',
})

const showUserMenu = ref(false)

const userInitials = computed(() => {
    return user.value.name
        .split(' ')
        .map(name => name[0])
        .join('')
})

const toggleUserMenu = () => {
    showUserMenu.value = !showUserMenu.value
}
</script>
