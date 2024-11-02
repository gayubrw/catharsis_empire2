<template>
    <AppLayout>
        <!-- Header slot -->
        <template #header>
            <AppHeader />
        </template>

        <!-- Sidebar slot -->
        <template #sidebar>
            <AppSidebar />
        </template>

        <!-- Default slot untuk router-view -->
        <router-view></router-view>
    </AppLayout>
</template>

<script setup>
import AppLayout from '@/components/layouts/AppLayout.vue'
import AppHeader from '../components/AppHeader.vue'
import AppSidebar from '../components/AppSidebar.vue'
</script>
