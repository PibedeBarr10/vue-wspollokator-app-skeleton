import profileService from "../../services/profileService";

export default {
    state: {
        profile: {
            id: '',
            sex: '',
            age: 0,
            accepts_animals: '',
            smoking: '',
            preferable_price: '',
            description: '',
            is_searchable: false,
            avatar: null,
            updated_at: ''
        }
    },
    mutations: {
        SET_PROFILE(state, data) {
            // state.profile = data
            state.profile.id = data.id
            state.profile.sex = data.sex
            state.profile.age = data.age
            state.profile.accepts_animals = data.accepts_animals
            state.profile.smoking = data.smoking
            state.profile.preferable_price = data.preferable_price
            state.profile.description = data.description
            state.profile.is_searchable = data.is_searchable
            state.profile.avatar = data.avatar
            state.profile.updated_at = data.updated_at
        },
    },
    actions: {
        getProfile({ commit }) {
            profileService.getProfile().then(data => {
                if (data.length > 0) {
                    commit('SET_PROFILE', data[0])
                }
            })
        },
        setProfile({ commit }, data) {
            commit('SET_PROFILE', data.profile)

            data.profile.user = data.user.pk
            // data.profile.avatar = new FormData()
            const bodyFormData = new FormData()
            bodyFormData.append('id', data.profile.id)
            bodyFormData.append('sex', data.profile.sex)
            bodyFormData.append('age', data.profile.age)
            bodyFormData.append('accepts_animals', data.profile.accepts_animals)
            bodyFormData.append('smoking', data.profile.smoking)
            bodyFormData.append('preferable_price', data.profile.preferable_price)
            bodyFormData.append('description', data.profile.description)
            bodyFormData.append('is_searchable', data.profile.is_searchable)
            bodyFormData.append('avatar', new Blob([JSON.stringify({ obj: 'abc' }, null, 2)], {type : 'application/json'}))
            bodyFormData.append('updated_at', data.profile.updated_at)

            profileService.changeProfile(data.user.pk, bodyFormData)
        }
    },
    getters: {
        // sex: state => state.profile.sex,
        // age: state => state.profile.age,
        // accepts_animals: state => state.profile.accepts_animals,
        // smoking: state => state.profile.smoking,
        // preferable_price: state => state.profile.preferable_price,
        // description: state => state.profile.description,
        // is_searchable: state => state.profile.is_searchable,
        profile: state => state.profile
    }
}