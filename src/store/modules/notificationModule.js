const getters = {
    msg: state => state.msg,
    color: state => state.color,
    show: state => state.show
}

const actions = {
    show ({ commit }, { msg, color }) {
        commit('SET_NOTIFICATION_SHOW', { msg, color })

        setTimeout(() => {
            commit('SET_NOTIFICATION_HIDE')
        }, 2000)
    },
    hide ({ commit }) {
        commit('SET_NOTIFICATION_HIDE')
    }
}

const mutations = {
    SET_NOTIFICATION_SHOW: (state, { msg, color }) => {
        state.msg = msg
        state.color = color
        // state.icon = icon
        state.show = true
    },
    SET_NOTIFICATION_HIDE: (state) => {
        state.show = false
    }
}

const state = () => ({
    msg: '',
    color: 'bg-red-500',
    // icon: '',
    show: false
})

export default {
    state,
    getters,
    actions,
    mutations,
    namespaced: true
}