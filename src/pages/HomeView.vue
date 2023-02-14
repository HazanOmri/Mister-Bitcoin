<template>
    <div class="home">
        <h3>Hello {{ looggedInUser?.name }}</h3>
        <p>Your balance is: {{ looggedInUser?.balance }}</p>
    </div>
</template>

<script>
import { bitcoinService } from '@/services/bitcoin.service.js'
import { userService } from '@/services/user.service.js'
export default {
    data() {
        return {
            looggedInUser: null,
        }
    },
    async created() {
        this.rate = await bitcoinService.getRate()
        this.looggedInUser = userService.getUser()
    }
}
</script>
