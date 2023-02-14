<template>
    <section v-if="contact" class="contact-details-container">
        <div class="contact-details">
            <img :src="'https://robohash.org/' + contact.imgId" alt="">
            <h3> {{ contact.name }}</h3>
            <h3> {{ contact.email }}</h3>
            <h3> {{ contact.phone }}</h3>
            <RouterLink to="/contact-list">back</RouterLink>
        </div>
    </section>
</template>

<script>
import { contactService } from '@/services/contact.service.js'

export default {
    data() {
        return {
            contact: null
        }
    },
    async created() {
        this.contact = await contactService.getById(this.$route.params._id)
    }
}
</script>