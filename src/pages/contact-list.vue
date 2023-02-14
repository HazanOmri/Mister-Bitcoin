<template>
    <section class="contact-list-container">
        <RouterLink to="/contact/edit" class="add">Add new contact</RouterLink>
        <section v-if="contacts" class="contact-list">
            <div v-for="contact in contacts">
                <ContactPreview @delete="removeContact" :contact="contact" />
            </div>
        </section>
    </section>
</template>

<script>
import ContactPreview from '@/cmps/contact-preview.vue'

export default {
    data() {
        return {
        }
    },
    async created() {
        await this.$store.dispatch({ type: 'loadContacts' })

    },
    methods: {
        async removeContact(contactId) {
            await this.$store.dispatch({ type: 'removeContact', contactId })
        }
    },
    computed: {
        contacts() {
            return this.$store.getters.getContacts
        }
    },
    components: {
        ContactPreview,
    },
}
</script>