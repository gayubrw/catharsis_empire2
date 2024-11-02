<template>
    <div class="bg-[#0d1117] rounded-lg p-6">
        <h2 class="text-xl font-semibold text-white mb-6">
            Address Information
        </h2>

        <form @submit.prevent="handleSubmit" class="space-y-6">
            <!-- Street Address -->
            <div class="space-y-2">
                <label
                    for="street"
                    class="block text-sm font-medium text-gray-300"
                >
                    Street Address
                </label>
                <input
                    id="street"
                    type="text"
                    v-model="street"
                    required
                    class="w-full px-3 py-2 bg-[#0d1117] border border-gray-700 rounded-md text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
            </div>

            <!-- City -->
            <div class="space-y-2">
                <label
                    for="city"
                    class="block text-sm font-medium text-gray-300"
                >
                    City
                </label>
                <input
                    id="city"
                    type="text"
                    v-model="city"
                    required
                    class="w-full px-3 py-2 bg-[#0d1117] border border-gray-700 rounded-md text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
            </div>

            <!-- State -->
            <div class="space-y-2">
                <label
                    for="state"
                    class="block text-sm font-medium text-gray-300"
                >
                    State/Province
                </label>
                <input
                    id="state"
                    type="text"
                    v-model="state"
                    required
                    class="w-full px-3 py-2 bg-[#0d1117] border border-gray-700 rounded-md text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
            </div>

            <!-- Postal Code -->
            <div class="space-y-2">
                <label
                    for="postal"
                    class="block text-sm font-medium text-gray-300"
                >
                    Postal Code
                </label>
                <input
                    id="postal"
                    type="text"
                    v-model="postal"
                    required
                    class="w-full px-3 py-2 bg-[#0d1117] border border-gray-700 rounded-md text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
            </div>

            <!-- Country -->
            <div class="space-y-2">
                <label
                    for="country"
                    class="block text-sm font-medium text-gray-300"
                >
                    Country
                </label>
                <select
                    id="country"
                    v-model="country"
                    required
                    class="w-full px-3 py-2 bg-[#0d1117] border border-gray-700 rounded-md text-white appearance-none"
                >
                    <option value="">Select a country</option>
                    <option value="ID">Indonesia</option>
                    <option value="US">United States</option>
                    <option value="UK">United Kingdom</option>
                    <option value="CA">Canada</option>
                </select>
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
import { ref } from 'vue'

const street = ref('')
const city = ref('')
const state = ref('')
const postal = ref('')
const country = ref('')
const loading = ref(false)

const handleSubmit = async () => {
    try {
        loading.value = true
        await new Promise(resolve => setTimeout(resolve, 1500))
        console.log('Address submitted:', {
            street: street.value,
            city: city.value,
            state: state.value,
            postal: postal.value,
            country: country.value,
        })
    } catch (error) {
        console.error('Address update error:', error)
    } finally {
        loading.value = false
    }
}
</script>
