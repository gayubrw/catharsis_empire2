<template>
    <div class="hidden lg:block">
        <!-- Desktop Menu - Centered -->
        <div class="flex flex-grow justify-center">
            <div
                ref="menuContainer"
                class="flex items-baseline px-4 md:px-8 relative"
                @mouseenter="isMenuHovered = true"
                @mouseleave="handleMenuLeave"
            >
                <!-- Sliding Underline -->
                <div
                    class="absolute bottom-0 h-0.5 bg-white transition-all duration-300 ease-out opacity-0"
                    :class="{ 'opacity-100': hoveredMenu }"
                    :style="{
                        left: `${underlinePosition}px`,
                        width: `${underlineWidth}px`,
                    }"
                ></div>

                <MenuLink
                    v-for="menu in menus"
                    :key="menu.id"
                    :text="menu.label"
                    :path="menu.path"
                    :ref="el => (menuRefs[menu.id] = el)"
                    @mouseenter="handleMenuEnter(menu.id)"
                />
            </div>
        </div>

        <!-- Desktop Dropdown Menus -->
        <div
            v-show="activeMenu"
            class="absolute top-20 left-0 w-full bg-black transition-all duration-300 ease-in-out z-50"
            @mouseenter="isMenuHovered = true"
            @mouseleave="handleMenuLeave"
        >
            <div class="max-w-7xl mx-auto pb-8">
                <div class="text-center">
                    <div class="grid gap-4">
                        <RouterLink
                            v-for="item in getCurrentMenuItems"
                            :key="item.id"
                            :to="item.path"
                            class="block text-gray-200 hover:text-orange-200 text-xl md:text-3xl font-bold py-2 transition-colors duration-200 tracking-[0.1em]"
                        >
                            {{ item.label }}
                        </RouterLink>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import MenuLink from './MenuLink.vue'
import { menuConfig } from './MenuConfig'

// Use shared menu configuration
const menus = menuConfig

// Constants
const HOVER_INTENT_DELAY = 100

// Reactive state
const activeMenu = ref(null)
const menuTimeout = ref(null)
const isMenuHovered = ref(false)
const menuContainer = ref(null)
const menuRefs = ref({})
const hoveredMenu = ref(null)
const underlinePosition = ref(0)
const underlineWidth = ref(0)

// Computed
const getCurrentMenuItems = computed(() => {
    const currentMenu = menus.find(menu => menu.id === activeMenu.value)
    return currentMenu?.items || []
})

// Emits
const emit = defineEmits(['update:menuHovered'])

// Methods
const updateUnderlinePosition = menuId => {
    const menuElement = menuRefs.value[menuId]
    if (!menuElement) return

    const rect = menuElement.$el.getBoundingClientRect()
    const containerRect = menuContainer.value.getBoundingClientRect()

    underlinePosition.value = rect.left - containerRect.left
    underlineWidth.value = rect.width
}

const handleMenuEnter = menuId => {
    hoveredMenu.value = menuId
    updateUnderlinePosition(menuId)
    openMenu(menuId)
}

const openMenu = menuId => {
    clearTimeout(menuTimeout.value)
    activeMenu.value = menuId
    updateMenuState(true)
}

const updateMenuState = state => {
    isMenuHovered.value = state
    emit('update:menuHovered', state)
}

const startCloseTimer = () => {
    menuTimeout.value = setTimeout(() => {
        if (!isMenuHovered.value) {
            closeMenu()
        }
    }, HOVER_INTENT_DELAY)
}

const closeMenu = () => {
    activeMenu.value = null
    hoveredMenu.value = null
    updateMenuState(false)
}

const handleMenuLeave = () => {
    isMenuHovered.value = false
    hoveredMenu.value = null
    startCloseTimer()
}

// Expose necessary properties
defineExpose({
    isMenuHovered,
})
</script>
