import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

class AuthService {
    login(user) {
        return axios.post(
            API_URL + '/auth/login/',
            {
                email: user.email,
                password: user.password
            },
            { withCredentials: true, }
            ).then(response => {
                if (response.data.access_token) {
                    localStorage.setItem('user', JSON.stringify(response.data));
                }
                return Promise.resolve(response.data);
            }).catch(error => {
                return Promise.reject(error);
            });
    }

    refresh() {
        let user = JSON.parse(localStorage.getItem('user'))

        return axios.post(
          API_URL + '/auth/token/refresh/',
          {
              refresh: user.refreshToken,
          },
          { withCredentials: true, }
        ).then(response => {
            if (response.data.access) {
                user.access_token = response.data.access
                user.refresh_token = response.data.refresh
                localStorage.setItem('user', JSON.stringify(user));
            }
            return Promise.resolve(response.data);
        }).catch(error => {
            return Promise.reject(error);
        });
    }

    logout() {
        localStorage.removeItem('user');
    }

    register(user) {
        return axios.post(API_URL + '/auth/register/', {
            first_name: user.firstName,
            last_name: user.lastName,
            email: user.email,
            password: user.password
        }).then(response => {
            return Promise.resolve(response);
        }).catch(error => {
            return Promise.reject(error);
        });
    }
    changePassword(newpassword)
    {
        return axios.post(
            API_URL + '/auth/password/change/',
            {
                new_password1: newpassword.password,
                new_password2: newpassword.repeatedPassword
            },
            // config
            { withCredentials: true }
        );
    }
}

export default new AuthService();
