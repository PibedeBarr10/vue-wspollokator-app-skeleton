import axios from "axios";

const API_URL = 'http://localhost:8000';

export default {
    getProfile() {
        return axios
            .get(
                `${API_URL}/profile/`,
                { withCredentials: true })
            .then(response => {
                return response.data
            })
    },
    changeProfile(id, data) {
        // console.log(data)
        return axios.put(`${API_URL}/profile/${id}/`, data, {
            withCredentials: true,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => {
            // console.log(res.data)
        })
    },
}