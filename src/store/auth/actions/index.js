import AuthService from "../../../services/auth.service";
import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from "../types";

export default {
    async login({ commit }, user) {
        return AuthService.login(user).then(
            (user) => {
                commit(LOGIN_SUCCESS, user);
                return Promise.resolve(user);
            },
            (error) => {
                commit(LOGIN_FAILURE);
                return Promise.reject(error);
            }
        );
    },
    logout({ commit }) {
        AuthService.logout();
        commit(LOGOUT);
    },
};
