<template>
    <div class="w-full min-h-screen bg-black">
        <div class="max-w-4xl mx-auto px-6 py-8">
            <!-- Slot untuk header -->
            <slot name="header"></slot>

            <!-- Main Content with Flexbox -->
            <div class="flex gap-6">
                <!-- Slot untuk sidebar -->
                <slot name="sidebar"></slot>

                <!-- Main Content Area -->
                <div class="flex-1 min-w-0">
                    <div class="bg-gray-800/50 rounded-lg p-6">
                        <!-- Slot untuk konten utama -->
                        <slot></slot>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
