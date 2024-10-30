<template>
    <div class="min-h-screen bg-black text-white">
        <!-- Header Bar with increased top margin -->
        <header class="px-4 py-6 mt-16">
            <div class="max-w-[1200px] mx-auto relative">
                <!-- Title positioned above the left edge of line -->
                <h1
                    class="text-xl tracking-[0.2em] uppercase absolute -top-12 left-0 font-bold"
                >
                    Wishlist
                </h1>

                <!-- Top Line -->
                <div class="w-full h-[0.5px] bg-white"></div>

                <!-- Menu Button between lines -->
                <div class="absolute right-0 top-4 flex items-center gap-3">
                    <button class="text-white">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                        >
                            <circle cx="12" cy="12" r="2" />
                            <circle cx="12" cy="5" r="2" />
                            <circle cx="12" cy="19" r="2" />
                        </svg>
                    </button>
                </div>

                <!-- Bottom Line -->
                <div class="w-full h-[0.5px] bg-white mt-12"></div>
            </div>
        </header>

        <!-- Empty State Content -->
        <main class="flex flex-col items-center justify-center h-[40vh] px-4">
            <div class="text-center max-w-2xl mx-auto">
                <h2 class="text-xl font-light tracking-[0.2em] mb-8">
                    Love It? Add To My Wishlist
                </h2>
                <p
                    class="text-sm text-gray-300 leading-relaxed mb-10 max-w-xl mx-auto"
                >
                    My Wishlist allows you to keep track of all of your
                    favorites and shopping activity whether you're on your
                    computer, phone, or tablet. You won't have to waste time
                    searching all over again for that item you loved on your
                    phone the other day - it's all here in one place!
                </p>
                <button
                    @click="goToDashboard"
                    class="bg-white text-black px-8 py-2 text-sm hover:bg-gray-100 transition-colors uppercase tracking-wider"
                >
                    Continue Shopping
                </button>
            </div>
        </main>
    </div>
</template>

<script>
import { useRouter } from 'vue-router'

export default {
    name: 'WishlistPage',
    setup() {
        const router = useRouter()

        const goToDashboard = () => {
            router.push('/')
        }

        return {
            goToDashboard,
        }
    },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700&display=swap');

h1 {
    font-family: 'Montserrat', sans-serif;
}
</style>
