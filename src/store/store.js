
// import { userStore } from './user.store.js'
// import { productStore } from './product.store.js'
import { contactStore } from './contact.store.js'
import { createStore } from 'vuex'


export const store = createStore({
    strict: true,
    getters: {
        // Reusable accessing logic
        countForDisplay(state) {
            return state.count.toLocaleString()
        },
    },
    mutations: {
        changeCount(state, payload) {
            // console.log('payload: ', payload)
            state.count += payload.by
        },
    },
    actions: {
        incrementAsync(context, payload) {
            console.log('context', context)
            setTimeout(() => {
                context.commit({ type: 'changeCount', by: payload.by })
            }, 2500)
        },
    },
    modules: {
        // userStore,
        contactStore
    }
})

store.subscribe((cmd, state) => {
    console.log('**** Store state changed: ****')
    console.log('Command:', cmd.payload)
    console.log('storeState:\n', state)
    console.log('*******************************')
})

