import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export default {
    getUserPoint() {
        return axios
            .get(
                `${API_URL}/point/`,
                { withCredentials: true })
            .then(response => {
                return response.data
            })
    },
    changeUserPoint(id, data) {
        return axios.put(`${API_URL}/point/${id}/`, {
            'location': data.location,
            'radius': data.radius
        }, { withCredentials: true })
    },
    addUserPoint(data) {
        return axios.post(`${API_URL}/point/`, {
            'location': data.location,
            'radius': data.radius
        }, { withCredentials: true })
            .then(res => {
                return res.data.id
            })
    },
}
