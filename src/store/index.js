import { createStore } from "vuex"

import { auth } from './modules/auth.module'
import pointModule from './modules/pointModule'
import profileModule from './modules/profileModule'

const store = createStore({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        auth,
        pointModule,
        profileModule
    }
})

export default store
