import pointService from "../../services/pointService";


export default {
    state: {
        id: '',
        point: [52, 20],
        radius: 1
    },
    mutations: {
        SET_ID(state, id) {
            state.id = id
        },
        SET_POINT(state, coordinates) {
            state.point = coordinates
        },
        SET_RADIUS(state, radius) {
            state.radius = radius
        },
        CLEAR_STATE(state) {
            state.id = ''
            state.point = [52, 20]
            state.radius = 1
        }
    },
    actions: {
        getUserPoint({ commit }) {
            return pointService.getUserPoint().then(response => {
                if (response.length > 0) {
                    commit('SET_ID', response[0].id)
                    commit('SET_POINT', response[0].location.coordinates)
                    commit('SET_RADIUS', response[0].radius)
                }
            })
        },
        changeUserPoint({ commit, state }, data) {
            commit('SET_POINT', data.location)
            commit('SET_RADIUS', data.radius)

            data.location = `POINT(${data.location[0]} ${data.location[1]})`

            if (state.id) {
                pointService.changeUserPoint(state.id, data)
            } else {
                pointService.addUserPoint(data).then(id => {
                    commit('SET_ID', id)
                })
            }
        },
        clearPointState({ commit }) {
            commit('CLEAR_STATE')
        }
    },
    getters: {
        point: state => state.point,
        radius: state => state.radius
    }
}