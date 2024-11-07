<template>
    <div class="min-h-screen bg-black">
        <!-- Header -->
        <div class="mb-8">
            <div class="flex justify-between items-center">
                <div>
                    <h1
                        class="text-3xl font-bold text-white tracking-wider uppercase"
                    >
                        Orders
                    </h1>
                    <p class="text-zinc-400 mt-1 tracking-wide">
                        Manage and track your customer orders
                    </p>
                </div>
                <div class="flex space-x-4">
                    <!-- Export Button -->
                    <button
                        class="px-4 py-2 bg-zinc-900 border border-zinc-700 text-zinc-300 rounded-lg hover:border-purple-500 transition-all duration-300 flex items-center group"
                    >
                        <svg
                            class="w-4 h-4 mr-2 text-zinc-400 group-hover:text-purple-400"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                        >
                            <path
                                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                        </svg>
                        Export Data
                    </button>
                    <!-- Add Order Button -->
                    <button
                        class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all duration-300 flex items-center"
                    >
                        <svg
                            class="w-4 h-4 mr-2"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                        >
                            <path
                                d="M12 4v16m8-8H4"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                        </svg>
                        New Order
                    </button>
                </div>
            </div>

            <!-- Filters -->
            <div class="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
                <div class="relative">
                    <input
                        type="text"
                        placeholder="Search orders..."
                        class="w-full bg-zinc-900 border border-zinc-800 text-white rounded-lg px-4 py-2.5 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all duration-300"
                    />
                    <svg
                        class="w-5 h-5 absolute right-3 top-3 text-zinc-400"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                    >
                        <path
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>
                </div>
                <div>
                    <select
                        class="w-full bg-zinc-900 border border-zinc-800 text-white rounded-lg px-4 py-2.5 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all duration-300"
                    >
                        <option value="">All Statuses</option>
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </div>
                <div>
                    <select
                        class="w-full bg-zinc-900 border border-zinc-800 text-white rounded-lg px-4 py-2.5 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all duration-300"
                    >
                        <option value="">All Time</option>
                        <option value="today">Today</option>
                        <option value="week">This Week</option>
                        <option value="month">This Month</option>
                        <option value="year">This Year</option>
                    </select>
                </div>
                <div>
                    <select
                        class="w-full bg-zinc-900 border border-zinc-800 text-white rounded-lg px-4 py-2.5 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all duration-300"
                    >
                        <option value="">Sort By</option>
                        <option value="newest">Newest First</option>
                        <option value="oldest">Oldest First</option>
                        <option value="highest">Highest Amount</option>
                        <option value="lowest">Lowest Amount</option>
                    </select>
                </div>
            </div>
        </div>

        <!-- Orders Table -->
        <div class="bg-zinc-900 rounded-lg border border-zinc-800">
            <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-zinc-800">
                    <thead>
                        <tr class="bg-zinc-900/50">
                            <th
                                class="px-6 py-4 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider"
                            >
                                Order ID
                            </th>
                            <th
                                class="px-6 py-4 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider"
                            >
                                Customer
                            </th>
                            <th
                                class="px-6 py-4 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider"
                            >
                                Status
                            </th>
                            <th
                                class="px-6 py-4 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider"
                            >
                                Date
                            </th>
                            <th
                                class="px-6 py-4 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider"
                            >
                                Total
                            </th>
                            <th
                                class="px-6 py-4 text-right text-xs font-medium text-zinc-400 uppercase tracking-wider"
                            >
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-zinc-800">
                        <tr
                            v-for="order in ordersData"
                            :key="order.id"
                            class="hover:bg-zinc-800/50 transition-colors duration-200"
                        >
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span
                                    class="text-sm font-mono text-purple-400 font-medium"
                                    >#{{ order.id }}</span
                                >
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="flex items-center">
                                    <div
                                        class="h-8 w-8 rounded-lg bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center text-white text-sm font-medium"
                                    >
                                        {{ getInitials(order.customer) }}
                                    </div>
                                    <div class="ml-3">
                                        <div
                                            class="text-sm font-medium text-white"
                                        >
                                            {{ order.customer }}
                                        </div>
                                        <div class="text-sm text-zinc-400">
                                            {{ order.email }}
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span :class="getStatusClass(order.status)">
                                    {{ formatStatus(order.status) }}
                                </span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm text-zinc-300">
                                    {{ formatDate(order.date) }}
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm font-mono text-white">
                                    ${{ order.total.toFixed(2) }}
                                </div>
                            </td>
                            <td
                                class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3"
                            >
                                <button
                                    class="text-purple-400 hover:text-purple-300 transition-colors duration-200"
                                >
                                    View
                                </button>
                                <button
                                    class="text-zinc-400 hover:text-white transition-colors duration-200"
                                >
                                    Edit
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Pagination -->
            <div class="px-6 py-4 border-t border-zinc-800">
                <div class="flex items-center justify-between">
                    <div class="text-sm text-zinc-400">
                        Showing <span class="font-medium text-white">1</span> to
                        <span class="font-medium text-white">10</span> of
                        <span class="font-medium text-white">100</span> results
                    </div>
                    <div class="flex space-x-2">
                        <button
                            class="px-4 py-2 text-sm text-zinc-400 hover:text-white transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Previous
                        </button>
                        <div class="flex space-x-1">
                            <button
                                v-for="page in [1, 2, 3, 4, 5]"
                                :key="page"
                                class="px-3 py-1 text-sm rounded-md"
                                :class="
                                    page === 1
                                        ? 'bg-purple-600 text-white'
                                        : 'text-zinc-400 hover:text-white'
                                "
                            >
                                {{ page }}
                            </button>
                        </div>
                        <button
                            class="px-4 py-2 text-sm text-zinc-400 hover:text-white transition-colors duration-200"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ordersData } from './MenuConfig'

const getInitials = name => {
    return name
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase()
}

const formatDate = date => {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })
}

const formatStatus = status => {
    return status.charAt(0).toUpperCase() + status.slice(1)
}

const getStatusClass = status => {
    const baseClasses = 'px-3 py-1 text-xs font-medium rounded-full'
    const statusClasses = {
        pending: 'bg-yellow-900/30 text-yellow-400 border border-yellow-700/50',
        processing: 'bg-blue-900/30 text-blue-400 border border-blue-700/50',
        completed: 'bg-green-900/30 text-green-400 border border-green-700/50',
        cancelled: 'bg-red-900/30 text-red-400 border border-red-700/50',
    }
    return `${baseClasses} ${statusClasses[status]}`
}
</script>

<style scoped>
.font-mono {
    font-family: 'JetBrains Mono', monospace;
}
</style>
