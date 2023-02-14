<template>
  <form @submit.prevent="onSave" v-if="contact" class="contact-edit main-layout">
    <h1>{{ getTitle }}</h1>
    <img :src="'https://robohash.org/' + contact.imgId" alt="" />
    <input type="text" v-model="contact.name" placeholder="Enter contact name..." />
    <input type="text" v-model="contact.email" placeholder="Enter contact email..." />
    <input type="text" v-model.number="contact.phone" placeholder="Enter contact phone..." />
    <button class="primary">Save</button>
  </form>
</template>

<script>
import { contactService } from '@/services/contact.service.js'
export default {
  data() {
    return {
      contact: null,
    }
  },
  async created() {
    const contactId = this.$route.params._id
    if (contactId) {
      this.contact = await contactService.getById(contactId)
    } else {
      this.contact = contactService.getEmptyContact()
    }
  },
  methods: {
    async onSave() {
      // await contactService.saveContact(this.contact)
      const contact = this.contact
      await this.$store.dispatch({ type: 'saveContact', contact })
      this.$router.push('/contact-list')
    },
  },
  computed: {
    getTitle() {
      return (this.contact._id ? 'Edit' : 'Add') + ' Contact'
    }
  }
}
</script>

<style lang="scss">

</style>
