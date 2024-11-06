<template>
    <aside class="fixed inset-y-0 left-0 w-64 bg-black">
        <div class="flex items-center justify-center h-24 bg-black">
            <h1
                class="text-white text-2xl font-bold transition-opacity uppercase tracking-[0.1em]"
            >
                ADMIN PANEL
            </h1>
        </div>

        <div class="flex items-center justify-center">
            <router-link
                to="/"
                class="text-white hover:opacity-80 transition-opacity uppercase text-sm tracking-wider"
            >
                ← CONTINUE BROWSING
            </router-link>
        </div>

        <!-- Navigation Menu -->
        <nav class="mt-6 px-3 tracking-[0.1em]">
            <div class="space-y-1">
                <router-link
                    v-for="item in menuItems"
                    :key="item.path"
                    :to="item.path"
                    class="flex items-center px-4 py-3 text-white rounded-lg transition-all duration-200 hover:bg-gray-500 group"
                    :class="{
                        'text-white': isCurrentRoute(item.path),
                    }"
                >
                    <div
                        class="p-2 rounded-lg"
                        :class="
                            isCurrentRoute(item.path) ? 'bg-black' : 'bg-black'
                        "
                    >
                        <svg
                            class="w-5 h-5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                        >
                            <path :d="item.svgPath" />
                        </svg>
                    </div>
                    <span class="ml-3 font-medium text-sm">{{
                        item.name
                    }}</span>

                    <!-- Active Indicator -->
                    <span
                        v-if="isCurrentRoute(item.path)"
                        class="ml-auto w-1.5 h-8 bg-white rounded-full"
                    ></span>
                </router-link>
            </div>
        </nav>
    </aside>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { menuItems } from './MenuConfig'

const route = useRoute()

const isCurrentRoute = path => {
    return route.path === path
}
</script>
