import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export default {
  addOpinion(issuedBy, issuedTo, rate, textOpinion) {
    // console.log(issuedBy, issuedTo, rate, textOpinion);
    return axios
      .post(
        `${API_URL}/opinions/`,
        {
          issued_by: issuedBy,
          about: issuedTo,
          rate: rate,
          text: textOpinion
        },
        {withCredentials: true}
      )
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        // console.log(err);
      });
  },
  getOpinionsAboutMe() {
    return axios
      .get(`${API_URL}/opinions/`, {
        withCredentials: true
      })
      .then(response => {
        return response.data
      })
  },
  getOpinionsAboutUser(user_id) {
    return axios
      .get(`${API_URL}/opinions/about/${user_id}/`, {
        withCredentials: true
      })
      .then(response => {
        return response.data
      })
  },
}