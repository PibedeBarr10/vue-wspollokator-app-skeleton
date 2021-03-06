import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export default {
    getProfile(pk) {
        return axios
            .get(`${API_URL}/profile/${pk}/`, {
                withCredentials: true
            })
            .then(response => {
                return response.data
            })
    },
    changeProfile(id, data) {
        return axios.put(`${API_URL}/profile/${id}/`, data, {
            withCredentials: true,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            // console.log(response.data.status)
            return response.data
        }).catch(error => {
            // console.log(error.response.data)
            return error
        })
    },
    addProfileData(data) {
        return axios.post(`${API_URL}/profile/`, data, {
            withCredentials: true,
            headers: {
                'accept': 'application/json',
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            return response.data
        }).catch(error => {
            return error
        })
    },
}