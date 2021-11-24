import axios from "axios";

const API_URL = 'http://wspolokator.livs.pl:8000';

export default {
    getUserPoint() {
        return axios
            .get(
                `${API_URL}/point/`,
                { withCredentials: true })
            .then(response => {
                // console.log(response.data)
                return response.data
            })
    },
    changeUserPoint(id, data) {
        // console.log(data)
        return axios.put(`${API_URL}/point/${id}/`, {
            'location': data.location,
            'radius': data.radius
        }, { withCredentials: true }).then(res => {
            console.log(res.data)
        })
    },
}
