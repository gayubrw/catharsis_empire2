<template>
    <!-- Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
            v-for="stat in statsData"
            :key="stat.title"
            class="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
        >
            <div class="p-6">
                <div class="flex items-center">
                    <div class="p-3 rounded-xl" :class="stat.bgColor">
                        <svg
                            class="w-6 h-6 text-white"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                        >
                            <path :d="stat.svgPath" />
                        </svg>
                    </div>
                    <div class="ml-4">
                        <h3 class="text-gray-500 text-sm font-medium">
                            {{ stat.title }}
                        </h3>
                        <p class="text-2xl font-bold text-gray-900">
                            {{ stat.value }}
                        </p>
                        <p
                            class="text-sm font-medium flex items-center mt-1"
                            :class="
                                stat.trend > 0
                                    ? 'text-green-600'
                                    : 'text-red-600'
                            "
                        >
                            <svg
                                class="w-4 h-4 mr-1"
                                :class="
                                    stat.trend > 0 ? 'rotate-0' : 'rotate-180'
                                "
                                viewBox="0 0 24 24"
                                fill="none"
                            >
                                <path
                                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                            </svg>
                            {{ Math.abs(stat.trend) }}% from last month
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Recent Activity -->
    <div class="mt-8 bg-white rounded-xl shadow-sm">
        <div class="px-6 py-4 border-b border-gray-100">
            <div class="flex items-center justify-between">
                <h3 class="text-lg font-bold text-gray-900">Recent Activity</h3>
                <button
                    class="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                    View All
                </button>
            </div>
        </div>
        <div class="p-6">
            <div class="space-y-6">
                <div
                    v-for="activity in recentActivities"
                    :key="activity.id"
                    class="flex items-start space-x-4"
                >
                    <div class="flex-shrink-0">
                        <div class="p-2 bg-gray-100 rounded-lg">
                            <svg
                                class="w-5 h-5 text-gray-600"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                            >
                                <path :d="activity.svgPath" />
                            </svg>
                        </div>
                    </div>
                    <div class="flex-1">
                        <p class="text-sm font-medium text-gray-900">
                            {{ activity.description }}
                        </p>
                        <p class="text-sm text-gray-500 mt-1">
                            {{ activity.time }}
                        </p>
                    </div>
                    <button class="text-gray-400 hover:text-gray-600">
                        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none">
                            <path
                                d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { statsData, recentActivities } from './MenuConfig'
</script>
