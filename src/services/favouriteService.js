import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export default {
  getFavourite() {
    return axios
      .get(`${API_URL}/favourite/list/`, {
        withCredentials: true,
      })
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  addFavourite(id) {
    console.log(id);
    return axios
      .post(
        `${API_URL}/favourite/add/`,
        {
          user_id: id,
        },
        { withCredentials: true }
      )
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  removeFavourite(id) {
    return axios
      .post(
        `${API_URL}/favourite/remove/`,
        {
          user_id: id,
        },
        { withCredentials: true }
      )
      .then((response) => {
        return response.data;
      });
  },
};
