<!-- TransactionView.vue -->
<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { menuConfig } from '@/components/navigation/navbar/partials/menuconfig'

const router = useRouter()
const filterStatus = ref('')
const filterPeriod = ref('365')

// Get all products from MenuConfig
const allProducts = menuConfig.reduce((acc, menu) => {
  if (menu.items) {
    menu.items.forEach(item => {
      if (item.products) {
        acc.push(...item.products)
      }
    })
  }
  return acc
}, [])

// Sample transaction data using real products from collections
const transactions = ref([
    {
        id: 'TRX001',
        date: '2024-03-01 14:30',
        product: allProducts.find(p => p.id === 'dystopian-1'), // Spectrum Tees
        status: 'completed',
        size: 'L',
        quantity: 1
    },
    {
        id: 'TRX002',
        date: '2024-03-15 09:45',
        product: allProducts.find(p => p.id === 'catharsis-empire-1'), // Izanagiryū & Izanamiryū Jacket
        status: 'processing',
        size: 'M',
        quantity: 1
    },
    {
        id: 'TRX003',
        date: '2024-03-20 16:15',
        product: allProducts.find(p => p.id === 'catharsis-reborn-1'), // Adieu Varsity
        status: 'pending',
        size: 'XL',
        quantity: 1
    },
    {
        id: 'TRX004',
        date: '2024-03-25 11:20',
        product: allProducts.find(p => p.id === 'dystopian-4'), // Umbra Socks
        status: 'shipped',
        size: 'Mid Calf',
        quantity: 2
    },
    {
        id: 'TRX005',
        date: '2024-03-27 13:40',
        product: allProducts.find(p => p.id === 'catharsis-empire-2'), // Paragon Ring
        status: 'pending',
        size: '7',
        quantity: 1
    },
    {
        id: 'TRX006',
        date: '2024-03-28 15:10',
        product: allProducts.find(p => p.id === 'catharsis-reborn-4'), // Kibisis Wallet
        status: 'completed',
        size: 'NO SIZES',
        quantity: 1
    },
    {
        id: 'TRX007',
        date: '2024-03-30 10:00',
        product: allProducts.find(p => p.id === 'dystopian-2'), // Purpureal Baby Tee
        status: 'cancelled',
        size: 'M',
        quantity: 1
    }
])

const filteredTransactions = computed(() => {
    let filtered = [...transactions.value]
    
    if (filterStatus.value) {
        filtered = filtered.filter(t => t.status === filterStatus.value)
    }
    
    if (filterPeriod.value) {
        const cutoffDate = new Date()
        cutoffDate.setDate(cutoffDate.getDate() - parseInt(filterPeriod.value))
        filtered = filtered.filter(t => new Date(t.date) > cutoffDate)
    }
    
    return filtered.sort((a, b) => new Date(b.date) - new Date(a.date))
})

const getStatusLabel = (status) => {
    const statusMap = {
        pending: 'Menunggu Pembayaran',
        processing: 'Diproses',
        shipped: 'Dikirim',
        completed: 'Selesai',
        cancelled: 'Dibatalkan'
    }
    return statusMap[status] || status
}

const formatPrice = (price, quantity) => {
    const numericPrice = parseInt(price.replace(/[^0-9]/g, ''))
    const total = numericPrice * quantity
    return `Rp${total.toLocaleString()}`
}

const viewDetail = (id) => {
    router.push(`/transaction/${id}`)
}

const payTransaction = (id) => {
    console.log('Processing payment for transaction:', id)
}

const buyAgain = (productId) => {
    router.push(`/product/${productId}`)
}
</script>

<template>
    <div class="max-w-[1440px] mx-auto px-4 py-12">
        <h1 class="text-3xl font-bold text-white mb-8 uppercase tracking-wider">Riwayat Transaksi</h1>
        
        <!-- Filter Section -->
        <div class="bg-[#131313] border border-zinc-800 rounded-lg p-6 mb-8">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label class="block text-zinc-400 text-sm uppercase tracking-wider mb-2">Status</label>
                    <select 
                        v-model="filterStatus" 
                        class="w-full bg-black text-white rounded-md px-4 py-3 border border-zinc-800 focus:border-white transition-colors"
                    >
                        <option value="">Semua Status</option>
                        <option value="pending">Menunggu Pembayaran</option>
                        <option value="processing">Diproses</option>
                        <option value="shipped">Dikirim</option>
                        <option value="completed">Selesai</option>
                        <option value="cancelled">Dibatalkan</option>
                    </select>
                </div>
                <div>
                    <label class="block text-zinc-400 text-sm uppercase tracking-wider mb-2">Periode</label>
                    <select 
                        v-model="filterPeriod" 
                        class="w-full bg-black text-white rounded-md px-4 py-3 border border-zinc-800 focus:border-white transition-colors"
                    >
                        <option value="7">7 Hari Terakhir</option>
                        <option value="30">30 Hari Terakhir</option>
                        <option value="90">90 Hari Terakhir</option>
                        <option value="365">1 Tahun Terakhir</option>
                    </select>
                </div>
            </div>
        </div>

        <!-- Transaction Summary -->
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div class="bg-[#131313] border border-zinc-800 rounded-lg p-6">
                <div class="flex flex-col">
                    <span class="text-zinc-400 text-sm uppercase tracking-wider mb-2">Total Pesanan</span>
                    <span class="text-3xl font-bold text-white">{{ transactions.length }}</span>
                </div>
            </div>
            <div class="bg-[#131313] border border-zinc-800 rounded-lg p-6">
                <div class="flex flex-col">
                    <span class="text-zinc-400 text-sm uppercase tracking-wider mb-2">Menunggu</span>
                    <span class="text-3xl font-bold text-zinc-200">
                        {{ transactions.filter(t => t.status === 'pending').length }}
                    </span>
                </div>
            </div>
            <div class="bg-[#131313] border border-zinc-800 rounded-lg p-6">
                <div class="flex flex-col">
                    <span class="text-zinc-400 text-sm uppercase tracking-wider mb-2">Proses</span>
                    <span class="text-3xl font-bold text-zinc-200">
                        {{ transactions.filter(t => ['processing', 'shipped'].includes(t.status)).length }}
                    </span>
                </div>
            </div>
            <div class="bg-[#131313] border border-zinc-800 rounded-lg p-6">
                <div class="flex flex-col">
                    <span class="text-zinc-400 text-sm uppercase tracking-wider mb-2">Selesai</span>
                    <span class="text-3xl font-bold text-zinc-200">
                        {{ transactions.filter(t => t.status === 'completed').length }}
                    </span>
                </div>
            </div>
        </div>

        <!-- Transaction List -->
        <div class="space-y-4">
            <div v-for="transaction in filteredTransactions" :key="transaction.id" 
                class="bg-[#131313] border border-zinc-800 rounded-lg p-6 hover:border-zinc-600 transition-colors">
                <div class="flex flex-col md:flex-row gap-6">
                    <!-- Product Image -->
                    <div class="w-full md:w-48 h-48 bg-black rounded-lg overflow-hidden flex-shrink-0 border border-zinc-800">
                        <img 
                            v-if="transaction.product?.image"
                            :src="transaction.product.image" 
                            :alt="transaction.product.name"
                            class="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                        />
                    </div>

                    <!-- Product Details -->
                    <div class="flex-grow space-y-4">
                        <div>
                            <h3 class="text-white text-lg font-medium mb-2">{{ transaction.product?.name }}</h3>
                            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div>
                                    <p class="text-zinc-400 text-sm uppercase tracking-wider mb-1">Kategori</p>
                                    <p class="text-white">{{ transaction.product?.categories }}</p>
                                </div>
                                <div>
                                    <p class="text-zinc-400 text-sm uppercase tracking-wider mb-1">Ukuran</p>
                                    <p class="text-white">{{ transaction.size }}</p>
                                </div>
                                <div>
                                    <p class="text-zinc-400 text-sm uppercase tracking-wider mb-1">Jumlah</p>
                                    <p class="text-white">{{ transaction.quantity }}</p>
                                </div>
                                <div>
                                    <p class="text-zinc-400 text-sm uppercase tracking-wider mb-1">Total</p>
                                    <p class="text-white font-medium">{{ formatPrice(transaction.product?.price || '0', transaction.quantity) }}</p>
                                </div>
                            </div>
                        </div>

                        <!-- Transaction Info -->
                        <div class="grid grid-cols-2 gap-4 pt-4 border-t border-zinc-800">
                            <div>
                                <p class="text-zinc-400 text-sm uppercase tracking-wider mb-1">ID Transaksi</p>
                                <p class="text-white">#{{ transaction.id }}</p>
                            </div>
                            <div>
                                <p class="text-zinc-400 text-sm uppercase tracking-wider mb-1">Tanggal</p>
                                <p class="text-white">{{ transaction.date }}</p>
                            </div>
                        </div>

                        <!-- Action Buttons -->
                        <div class="flex pt-4 border-t border-zinc-800 justify-between items-center">
                            <div class="flex flex-wrap gap-4">
                                <button 
                                    v-if="transaction.status === 'pending'"
                                    @click="payTransaction(transaction.id)"
                                    class="px-6 py-2 bg-white text-black text-sm uppercase tracking-wider hover:bg-zinc-200 transition-colors"
                                >
                                    Bayar Sekarang
                                </button>
                                <button 
                                    @click="viewDetail(transaction.id)"
                                    class="px-6 py-2 border border-white text-white text-sm uppercase tracking-wider hover:bg-white hover:text-black transition-colors"
                                >
                                    Detail Pesanan
                                </button>
                                <button 
                                    v-if="transaction.status === 'completed'"
                                    @click="buyAgain(transaction.product?.id)"
                                    class="px-6 py-2 border border-zinc-400 text-zinc-400 text-sm uppercase tracking-wider hover:bg-zinc-400 hover:text-black transition-colors"
                                >
                                    Beli Lagi
                                </button>
                            </div>
                            <span class="px-4 py-2 text-sm text-white uppercase tracking-wider font-medium border"
                            >
                                {{ getStatusLabel(transaction.status) }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Empty State -->
        <div v-if="filteredTransactions.length === 0" class="bg-[#131313] border border-zinc-800 rounded-lg p-12 text-center">
            <p class="text-zinc-400 text-lg">Tidak ada transaksi yang ditemukan</p>
        </div>
    </div>
</template>