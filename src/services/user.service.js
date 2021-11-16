import axios from 'axios';
import authHeader from './auth-header';

const API_URL = `${import.meta.env.API_URL}`;

class UserService {
    getUserData() {
        return axios.get(API_URL + '/user', { headers: authHeader() });
    }
}

export default new UserService();