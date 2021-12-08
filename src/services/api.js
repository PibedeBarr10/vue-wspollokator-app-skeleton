import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

export default function apiService(store, router) {
    const setError = errorText => {
        store.dispatch('notificationModule/show', {
            text: errorText,
            type: 'error'
        })
    }

    if (API_URL === undefined) {
        setError('Configuration error - API_URL is undefined')
    }

    const api = axios.create({
        baseURL: `${API_URL}`,
        withCredentials: true
    });

    // api.interceptors.request.use(config => {
    //     if (store.getters.token) {
    //         config.headers.Authorization = `Bearer ${store.getters.token}`
    //     }
    //     return config
    // })

    api.interceptors.response.use(
        res => res,
        error => {
            if (error.response.data.status === 401 || error.response.data.code === 401) {
                router.push('/logout')
                setError('Session expired')
                return Promise.reject('Session expired')
            }
            if (error.response.data.status === 403) {
                router.push('/no-access')
                setError(error.response.data.message || error.response.data)
            }
            setError(error)
            return Promise.reject()
        }
    )

    return api
}
