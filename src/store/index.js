import { createStore } from "vuex"

import { auth } from './modules/auth.module'
import pointModule from './modules/pointModule'
import profileModule from './modules/profileModule'
import chatModule from './modules/chatModule'

const store = createStore({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        auth,
        pointModule,
        profileModule,
        chatModule,
    }
})

export default store
