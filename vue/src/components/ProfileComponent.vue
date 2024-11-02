<template>
    <div class="bg-[#0d1117] rounded-lg p-6">
        <h2 class="text-xl font-semibold text-white mb-6">Public profile</h2>

        <form @submit.prevent="handleSubmit" class="space-y-6">
            <!-- Name Field -->
            <div class="space-y-2">
                <label
                    for="name"
                    class="block text-sm font-medium text-gray-300"
                >
                    Name
                </label>
                <input
                    id="name"
                    type="text"
                    v-model="name"
                    required
                    class="w-full px-3 py-2 bg-[#0d1117] border border-gray-700 rounded-md text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    :class="{ 'border-red-500': errors.name }"
                />
                <p v-if="errors.name" class="text-red-500 text-sm mt-1">
                    {{ errors.name }}
                </p>
            </div>

            <!-- Public Email Field -->
            <div class="space-y-2">
                <label class="block text-sm font-medium text-gray-300">
                    Public email
                </label>
                <div class="relative">
                    <select
                        v-model="email"
                        class="w-full px-3 py-2 bg-[#0d1117] border border-gray-700 rounded-md text-white appearance-none"
                        :class="{ 'border-red-500': errors.email }"
                    >
                        <option value="">
                            Select a verified email to display
                        </option>
                        <option value="email@example.com">
                            email@example.com
                        </option>
                    </select>
                    <svg
                        class="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clip-rule="evenodd"
                        />
                    </svg>
                </div>
                <p v-if="errors.email" class="text-red-500 text-sm mt-1">
                    {{ errors.email }}
                </p>
            </div>

            <!-- Bio Field -->
            <div class="space-y-2">
                <label class="block text-sm font-medium text-gray-300">
                    Bio
                </label>
                <textarea
                    rows="4"
                    class="w-full px-3 py-2 bg-[#0d1117] border border-gray-700 rounded-md text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Tell us a little bit about yourself"
                ></textarea>
            </div>

            <!-- Pronouns Field -->
            <div class="space-y-2">
                <label class="block text-sm font-medium text-gray-300">
                    Pronouns
                </label>
                <div class="relative">
                    <select
                        class="w-full px-3 py-2 bg-[#0d1117] border border-gray-700 rounded-md text-white appearance-none"
                    >
                        <option value="he/him">he/him</option>
                        <option value="she/her">she/her</option>
                        <option value="they/them">they/them</option>
                    </select>
                    <svg
                        class="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clip-rule="evenodd"
                        />
                    </svg>
                </div>
            </div>

            <!-- Submit Button -->
            <button
                type="submit"
                :disabled="loading"
                class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <svg
                    v-if="loading"
                    class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        class="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        stroke-width="4"
                    />
                    <path
                        class="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                </svg>
                {{ loading ? 'Saving changes...' : 'Save Changes' }}
            </button>
        </form>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const name = ref('')
const email = ref('')
const loading = ref(false)
const errors = reactive({
    name: '',
    email: '',
})

const handleSubmit = async () => {
    errors.name = ''
    errors.email = ''

    if (!name.value) {
        errors.name = 'Name is required'
        return
    }

    if (!email.value) {
        errors.email = 'Email is required'
        return
    }

    try {
        loading.value = true
        await new Promise(resolve => setTimeout(resolve, 1500))
        console.log('Form submitted:', {
            name: name.value,
            email: email.value,
        })
    } catch (error) {
        console.error('Profile update error:', error)
    } finally {
        loading.value = false
    }
}
</script>
