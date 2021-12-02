const getters = {
    text: state => state.text,
    type: state => state.type,
    show: state => state.show
}

const actions = {
    show ({ commit }, { text, type }) {
        commit('SET_NOTIFICATION_SHOW', { text, type })

        setTimeout(() => {
            commit('SET_NOTIFICATION_HIDE')
        }, 2000)
    },
    hide ({ commit }) {
        commit('SET_NOTIFICATION_HIDE')
    }
}

const mutations = {
    SET_NOTIFICATION_SHOW: (state, { text, type }) => {
        state.text = text
        state.type = type
        state.show = true
    },
    SET_NOTIFICATION_HIDE: (state) => {
        state.show = false
    }
}

const state = () => ({
    text: '',
    type: 'success',
    show: false
})

export default {
    state,
    getters,
    actions,
    mutations,
    namespaced: true
}