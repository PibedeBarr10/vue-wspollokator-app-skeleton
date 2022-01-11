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
    getConversation(id) {
        return axios
            .get(`${API_URL}/conversation/${id}/`, {
                withCredentials: true
            })
            .then(response => {
                return response.data
            })
    },
    sendMessage(id,message)
    {
        return axios
            .post(`${API_URL}/conversation/${id}/message/`,{
                'text': message}, {
                withCredentials: true
            })
            .then(response => {
                return response.data
            })
    },
    createConversation(userId)
     {
        return axios
            .post(`${API_URL}/conversation/`,{user_id: userId}, {
                withCredentials: true
            })
            .then(response => {
                return response.data
            })
     },
    createGroupConversation(usersId, name)
    {
        return axios
            .post(`${API_URL}/conversation/group/`,{user_ids: usersId, name: name}, {
                withCredentials: true
            })
            .then(response => {
                return response.data
            })
    },
}