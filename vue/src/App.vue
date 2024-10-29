<script setup>
import { RouterView } from 'vue-router'
import NavbarComponent from './components/navigation/navbar/NavbarComponent.vue'
import FooterComponent from './components/navigation/FooterComponent.vue'
</script>

<template>
    <div class="w-full h-screen bg-black">
        <NavbarComponent />
        <RouterView />
        <FooterComponent />
    </div>
</template>

<style scoped></style>
