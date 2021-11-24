import pointService from "../../services/pointService";


export default {
    state: {
        id: '',
        point: [0, 0],
        radius: 0
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
        }
    },
    actions: {
        getUserPoint({ commit }) {
            pointService.getUserPoint().then(response => {
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

            pointService.changeUserPoint(state.id, data)
        }
    },
    getters: {
        point: state => state.point,
        radius: state => state.radius
    }
}