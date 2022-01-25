import FavouriteService from "../../services/favouriteService";

export default {
  state: {
    list: [],
  },
  actions: {
    getList({ commit }) {
      return FavouriteService.getFavourite().then(
        (list) => {
          commit("saveFavourite", "dupa");
          return Promise.resolve(list);
        }
      );
    },
    logout({ commit }) {
      AuthService.logout();
      commit("logout");
    },
    register({ commit }, user) {
      return AuthService.register(user).then(
        (response) => {
          commit("registerSuccess");
          return Promise.resolve(response.data);
        },
        (error) => {
          commit("registerFailure");
          return Promise.reject(error);
        }
      );
    },
    changePassword({ commit }, newpassword) {
      return AuthService.changePassword(newpassword).then(
        (response) => {
          commit("passwordChangeSuccess");
          return Promise.resolve(response.data);
        },
        (error) => {
          commit("passwordChangeFailture");
          return Promise.reject(error);
        }
      );
    },
  },
  mutations: {
    saveFavourite(state, list) {
      // console.log(list);
    //   state.list.push(list);
    },
    loginFailure(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    logout(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    registerSuccess(state) {
      state.status.loggedIn = false;
    },
    registerFailure(state) {
      state.status.loggedIn = false;
    },
    passwordChangeSuccess(state) {
      state.status.loggedIn = true;
    },
    passwordChangeFailture(state) {
      state.status.loggedIn = true;
    },
  },
  // getters: {
  //     user: state => state.user
  // }
};
