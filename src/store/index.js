import { createStore } from "vuex"

import { auth } from './modules/auth.module'
import pointModule from './modules/pointModule'

const store = createStore({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        auth,
        pointModule
    }
})

export default store
