<template>
    <header class="full main-layout">
        <div class="app-header">
            <h1>Mister Bitcoin</h1>
            <div class="details">
                <h3> Hello {{ looggedInUser?.name }}</h3>
                <h3>Rate: {{ rate }}</h3>
            </div>
            <nav>
                <RouterLink to="/">Home</RouterLink>
                <RouterLink to="/contact-list">Contact List</RouterLink>
                <RouterLink to="/stats">Stats</RouterLink>
            </nav>
        </div>
        </header>
</template>

<script>
import { bitcoinService } from '@/services/bitcoin.service.js'
import { userService } from '@/services/user.service.js'
export default {
    data() {
        return {
            rate: null,
            marketPriceHistory: null,
            looggedInUser: null,
        }
    },
    async created() {
        this.rate = await bitcoinService.getRate()
        // this.marketPriceHistory = await bitcoinService.getMarketPriceHistory()
        this.looggedInUser = userService.getUser()
    }
}
</script>