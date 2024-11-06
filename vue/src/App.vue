<template>
    <div class="flex flex-col min-h-screen bg-black">
        <LoadingHandler>
            <RouterView />
        </LoadingHandler>
    </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import LoadingHandler from './components/loading/LoadingHandler.vue'
</script>
