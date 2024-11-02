<template>
    <div class="w-48 flex-shrink-0">
        <nav class="space-y-1 sticky top-8">
            <router-link
                to="/profile"
                class="block px-3 py-2 text-sm text-gray-400 hover:text-white rounded-md hover:bg-gray-800"
                :class="{
                    'text-white bg-gray-800': $route.path === '/profile',
                }"
            >
                Profile
            </router-link>
            <router-link
                to="/address"
                class="block px-3 py-2 text-sm text-gray-400 hover:text-white rounded-md hover:bg-gray-800"
                :class="{
                    'text-white bg-gray-800': $route.path === '/address',
                }"
            >
                Address
            </router-link>
        </nav>
    </div>
</template>
