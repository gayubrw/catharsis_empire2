<template>
    <div class="min-h-screen bg-black">
        <AdminSidebar />
        <div class="ml-64">
            <AdminHeader :title="pageTitle" />
            <main class="p-8">
                <RouterView></RouterView>
            </main>
        </div>
    </div>
</template>

<script setup>
import AdminHeader from './AdminHeader.vue'
import AdminSidebar from './AdminSidebar.vue'

defineProps({
    pageTitle: {
        type: String,
        required: true,
    },
})
</script>
