<template>
    <div class="flex flex-col min-h-screen bg-black">
        <LoadingHandler>
            <!-- Navbar -->
            <NavbarComponent />

            <!-- Main content that takes remaining space -->
            <main class="flex-1">
                <RouterView />
            </main>

            <!-- Footer stays at bottom -->
            <FooterComponent />
        </LoadingHandler>
    </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import NavbarComponent from '../components/navigation/navbar/NavbarComponent.vue'
import FooterComponent from '../components/navigation/FooterComponent.vue'
import LoadingHandler from '../components/loading/LoadingHandler.vue'
</script>
