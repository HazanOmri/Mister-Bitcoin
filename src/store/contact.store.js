// import { contactService } from "../services/contact.service.js"
import { contactService } from "../services/contact.service.js"


export const contactStore = {
    state: {
        contacts: [],
    },
    getters: {
        getContacts({ contacts }) {
            return contacts
        }
    },
    mutations: {
        setContacts(state, { contacts }) {
            state.contacts = contacts
        },
        removeContact(state, { contactId }) {
            const idx = state.contacts.findIndex(p => p._id === contactId)
            state.contacts.splice(idx, 1)
        },
        addContact(state, { contact }) {
            console.log('ADDING')
            state.contacts.push(contact)
        },
        updateContact(state, { contact }) {
            const idx = state.contacts.findIndex(p => p._id === contact._id)
            state.contacts.splice(idx, 1, contact)
        },
        undoRemoveContact(state) {
            state.contacts.unshift(state.lastRemovedContact)
        },

    },
    actions: {
        loadContacts({ commit }) {
            contactService.query()
                .then((contacts) => {
                    commit({ type: 'setContacts', contacts })
                })
        },
        async removeContact({ commit }, payload) {
            commit(payload)
            try {
                await contactService.remove(payload.contactId)
            } catch (err) {
                throw err
            }
        },
        async saveContact({ commit }, { contact }) {
            const actionType = (contact._id) ? 'updateContact' : 'addContact'
            try {
                const savedContact = await contactService.save(contact)
                commit({ type: actionType, contact: savedContact })
                return savedContact
            } catch (err) {
                throw err
            }
        },
    }
}