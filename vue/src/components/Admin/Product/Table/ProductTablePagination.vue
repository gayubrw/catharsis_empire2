<template>
    <div class="bg-zinc-900/50 px-6 py-4 border-t border-zinc-800">
        <div class="flex items-center justify-between">
            <div class="text-sm text-zinc-400">
                Showing
                <span class="font-medium text-purple-500">{{
                    startIndex
                }}</span>
                to
                <span class="font-medium text-purple-500">{{ endIndex }}</span>
                of
                <span class="font-medium text-purple-500">{{
                    totalItems
                }}</span>
                products
            </div>
            <div class="flex items-center space-x-2">
                <button
                    @click="prevPage"
                    :disabled="currentPage === 1"
                    class="px-4 py-2 text-sm text-zinc-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:bg-zinc-800/50 rounded-lg"
                >
                    Previous
                </button>
                <div class="flex space-x-1">
                    <button
                        v-for="page in displayedPages"
                        :key="page"
                        @click="handlePageClick(page)"
                        :disabled="typeof page !== 'number'"
                        class="px-4 py-2 text-sm rounded-lg transition-all duration-200"
                        :class="getPageButtonClass(page)"
                    >
                        {{ page }}
                    </button>
                </div>
                <button
                    @click="nextPage"
                    :disabled="currentPage === totalPages"
                    class="px-4 py-2 text-sm text-zinc-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:bg-zinc-800/50 rounded-lg"
                >
                    Next
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    currentPage: {
        type: Number,
        required: true,
    },
    totalItems: {
        type: Number,
        required: true,
    },
    itemsPerPage: {
        type: Number,
        default: 4,
    },
})

const emit = defineEmits(['update:currentPage'])

// Computed
const totalPages = computed(() =>
    Math.ceil(props.totalItems / props.itemsPerPage),
)
const startIndex = computed(
    () => (props.currentPage - 1) * props.itemsPerPage + 1,
)
const endIndex = computed(() =>
    Math.min(props.currentPage * props.itemsPerPage, props.totalItems),
)

const displayedPages = computed(() => {
    const total = totalPages.value
    if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1)

    const current = props.currentPage
    const pages = []

    if (current <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i)
        if (total > 4) {
            pages.push('...')
            pages.push(total)
        }
    } else if (current >= total - 2) {
        pages.push(1)
        pages.push('...')
        for (let i = total - 3; i <= total; i++) pages.push(i)
    } else {
        pages.push(1)
        pages.push('...')
        for (let i = current - 1; i <= current + 1; i++) pages.push(i)
        pages.push('...')
        pages.push(total)
    }

    return pages
})

// Methods
const handlePageClick = page => {
    if (typeof page === 'number') {
        emit('update:currentPage', page)
    }
}

const prevPage = () => {
    if (props.currentPage > 1) {
        emit('update:currentPage', props.currentPage - 1)
    }
}

const nextPage = () => {
    if (props.currentPage < totalPages.value) {
        emit('update:currentPage', props.currentPage + 1)
    }
}

const getPageButtonClass = page => {
    if (typeof page !== 'number') return 'text-zinc-600'
    return props.currentPage === page
        ? 'bg-purple-600 text-white'
        : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
}
</script>
