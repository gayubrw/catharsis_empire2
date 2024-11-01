import { defineStore } from 'pinia'

export const useWishlistStore = defineStore('wishlist', {
    state: () => ({
        items: [],
    }),

    actions: {
        addToWishlist(product) {
            const exists = this.items.some(item => item.id === product.id)
            if (!exists) {
                this.items.push(product)
            }
        },

        removeFromWishlist(productId) {
            this.items = this.items.filter(item => item.id !== productId)
        },

        isInWishlist(productId) {
            return this.items.some(item => item.id === productId)
        },

        clearWishlist() {
            this.items = []
        },
    },

    persist: {
        key: 'wishlist-storage',
        storage: localStorage,
    },
})
