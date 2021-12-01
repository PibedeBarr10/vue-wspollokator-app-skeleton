import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export default {
    getProfiles() {
        return axios
            .get(`${API_URL}/profile/`, {
                withCredentials: true
            })
            .then(response => {
                return response.data
            })
    },
    getFilteredProfiles(filters) {
        return axios
            .get(`${API_URL}/profile/`, {
                withCredentials: true,
                params: filters
            })
            .then(response => {
                return response.data
            })
    }
}