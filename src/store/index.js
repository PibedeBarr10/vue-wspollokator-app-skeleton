import { createStore } from "vuex"

import { auth } from './modules/auth.module'

const store = createStore({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        auth
    }
})

export default store
