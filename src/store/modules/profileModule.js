import profileService from "../../services/profileService";

export default {
    state: {
        profile: {
            id: '',
            updated_at: '',
            sex: 'F',
            age: 18,
            accepts_animals: 'I',
            smoking: 'I',
            preferable_price: 1000,
            description: 'Domyślny opis',
            is_searchable: true,
            avatar: 'http://wspolokator.livs.pl:8000/media/default_avatar.png'
        },
        profileCreated: false
    },
    mutations: {
        SET_PROFILE(state, data) {
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
        CONFIRM_PROFILE_CREATED(state) {
            state.profileCreated = true
        },
        CLEAR_STATE(state) {
            state.profile = {
                id: '',
                updated_at: '',
                sex: 'F',
                age: 18,
                accepts_animals: 'I',
                smoking: 'I',
                preferable_price: 1000,
                description: 'Domyślny opis',
                is_searchable: true,
                avatar: 'http://wspolokator.livs.pl:8000/media/default_avatar.png'
            }

            state.profileCreated = false
        }
    },
    actions: {
        getProfile({ commit }, data) {
            return profileService.getProfile(data.pk).then(data => {
                commit('SET_PROFILE', data)
                commit('CONFIRM_PROFILE_CREATED')
            })
        },
        setProfile({ commit }, data) {
            commit('SET_PROFILE', data.profile)

            data.profile.user = data.user.pk

            const bodyFormData = new FormData()
            bodyFormData.append('sex', data.profile.sex)
            bodyFormData.append('age', data.profile.age)
            bodyFormData.append('accepts_animals', data.profile.accepts_animals)
            bodyFormData.append('smoking', data.profile.smoking)
            bodyFormData.append('preferable_price', data.profile.preferable_price)
            bodyFormData.append('description', data.profile.description)
            bodyFormData.append('is_searchable', data.profile.is_searchable)

            console.log(this.getters.profileCreated)

            if (this.getters.profileCreated) {
                bodyFormData.append('id', data.profile.id)
                if (data.profile.avatar !== null && typeof data.profile.avatar !== "string") {
                    console.log(data.profile.avatar, typeof data.profile.avatar)
                    bodyFormData.append('avatar', data.profile.avatar)
                }

                return profileService.changeProfile(data.user.pk, bodyFormData)
                    .then(data => {
                        console.log(data)
                        return data
                    }).catch(error => {
                        return error
                    })
            } else {
                return profileService.addProfileData(bodyFormData)
                    .then(data => {
                        commit('CONFIRM_PROFILE_CREATED')
                        return Promise.resolve(data);
                    }).catch(error => {
                        return Promise.reject(error);
                    })
            }

            // return Promise.reject()
        },
        clearProfileState({ commit }) {
            commit('CLEAR_STATE')
        }
    },
    getters: {
        profile: state => state.profile,
        profileCreated: state => state.profileCreated
    }
}