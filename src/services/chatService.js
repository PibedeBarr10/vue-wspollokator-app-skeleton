import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export default {
    getConversations() {
        return axios
            .get(`${API_URL}/conversation/`, {
                withCredentials: true
            })
            .then(response => {
                return response.data
            })
    },
    createConversation()
     {
        return axios
            .post(`${API_URL}/conversation/`, '50e19d71-8a9e-456a-91da-8a94cbd4ce4b', {
                withCredentials: true
            })
            .then(response => {
                return response.data
            })
     },
}