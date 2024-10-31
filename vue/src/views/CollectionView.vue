<template>
    <div class="collections">
        <h1>Collections</h1>
        <ul>
            <li v-for="collection in collections" :key="collection.id">
                <router-link :to="collection.path">{{
                    collection.label
                }}</router-link>
            </li>
        </ul>
    </div>
</template>

<script>
import { menuConfig } from '@/components/navigation/navbar/partials/MenuConfig' // Adjust this path

export default {
    name: 'CollectionsView',
    data() {
        return {
            collections: menuConfig.find(item => item.id === 'collections')
                .items,
        }
    },
}
</script>

<style scoped>
.collections {
    /* Add styles for the collections page */
}
</style>
