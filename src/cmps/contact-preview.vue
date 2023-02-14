<template>
    <article class="contact-preview">
        <img :src="'https://robohash.org/' + contact.imgId" alt="" />
        <span>{{ contact.name }}</span>
        <div class="actions">
            <button @click="() => onDeleteContact(contact._id)">Delete</button>
            <RouterLink :to="`/contact/${contact._id}`">Details</RouterLink>
            <RouterLink :to="`/contact/edit/${contact._id}`">Edit</RouterLink>
        </div>
    </article>
</template>

<script>
export default {
    props: {
        contact: {
            type: Object,
            required: true,
        }
    },
    methods: {
        onDeleteContact(contactId) {
            this.$emit('delete', contactId)
        }
    },
}
</script>
