import { userService } from "../services/user.service.js"

export const userStore = {
    state: {
        user: userService.getLoggedinUser(),
    },
    getters: {
        user({ user }) { return user },
        // products(state) {
        //     return []
        // },
    },
    mutations: {
        updateOrder(state, { order }) {
            const idx = state.user.orders.findIndex(o => o._id === order._id)
            state.user.orders.splice(idx, 1, order)
        },
        setUser(state, { user }) {
            state.user = user
        },
        setUserBalance(state, { balance }) {
            state.user.balance = balance
        }
    },
    actions: {
        checkout({ commit, getters }) {
            return userService.addOrder(getters.cart, getters.cartTotal)
                .then(user => {
                    commit({ type: 'setUser', user })
                    commit({ type: 'clearCart' })
                    return user.balance
                })
        },
        changeOrderStatus({ commit }, { orderId, status }) {
            return userService.changeOrderStatus(orderId, status)
                .then(order => {
                    commit({ type: 'updateOrder', order })
                    return order
                })
        },
        deposit(context, { amount }) {
            console.log('context', context)
            return userService.updateBalance(amount)
                .then(balance => {
                    context.commit({ type: 'setUserBalance', balance })
                    return balance
                })
        },

    }
}