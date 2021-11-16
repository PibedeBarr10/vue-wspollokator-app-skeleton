import axios from 'axios';

const API_URL = 'localhost:8000';
// const API_URL = `${import.meta.env.API_URL}`;

console.log(API_URL)

class AuthService {
    login(user) {
        return axios
            .post(API_URL + '/auth/login/', {
                email: user.email,
                password: user.password
            })
            .then(response => {
                if (response.data.accessToken) {
                    localStorage.setItem('user', JSON.stringify(response.data));
                }

                return response.data;
            });
    }

    logout() {
        localStorage.removeItem('user');
    }

    register(user) {
        return axios.post(API_URL + '/auth/register', {
            username: user.username,
            email: user.email,
            password: user.password
        });
    }
}

export default new AuthService();