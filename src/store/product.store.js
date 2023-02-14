import { productService } from "../services/product.service.js"


export const productStore = {
    state: {
        products: [],
        cart: [],
        lastRemovedProduct: null

    },
    getters: {
        cartTotal({ cart }) {
            return cart.reduce((acc, prd) => acc + prd.price, 0)
        },
        cart({ cart }) {
            return cart
        },
        products({ products }) {
            return products
        },
        productCount({ cart }) {
            return cart.length
        },
    },
    mutations: {
        setProducts(state, { products }) {
            // console.log('payload: ', payload)
            state.products = products
        },
        clearCart(state) {
            state.cart = []
        },
        addToCart(state, { product }) {
            state.cart.push(product)
        },
        removeFromCart(state, { productId }) {
            const idx = state.cart.findIndex(p => p._id === productId)
            state.cart.splice(idx, 1)
        },
        removeProduct(state, { productId }) {
            const idx = state.products.findIndex(p => p._id === productId)
            state.lastRemovedProduct = state.products[idx]
            state.products.splice(idx, 1)
        },
        addProduct(state, { product }) {
            state.products.push(product)
        },
        updateProduct(state, { product }) {
            const idx = state.products.findIndex(p => p._id === product._id)
            state.products.splice(idx, 1, product)
        },
        clearRemoveProduct(state) {
            state.lastRemovedProduct = null
        },
        undoRemoveProduct(state) {
            state.products.unshift(state.lastRemovedProduct)
            state.lastRemovedProduct = null
        },

    },
    actions: {
        loadProducts({ commit }) {
            productService.query()
                .then((products) => {
                    commit({ type: 'setProducts', products })
                })
        },
        async removeProduct({ commit }, payload) {
            commit(payload)
            try {
                await productService.remove(payload.productId)
                commit({ type: 'clearRemoveProduct' })
            } catch (err) {
                commit({ type: 'undoRemoveProduct' })
                throw err
            }
        },
        saveProduct({ commit }, { product }) {
            const actionType = (product._id) ? 'updateProduct' : 'addProduct'
            return productService.save(product)
                .then((savedProduct) => {
                    commit({ type: actionType, product: savedProduct })
                    return savedProduct
                })
        },
    }
}