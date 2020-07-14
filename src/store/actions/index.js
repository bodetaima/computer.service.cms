import PartsService from "@/services/parts.service";
import AuthService from "@/services/auth.service";
import {
    GET_PART_TYPES_SUCCESS,
    GET_PART_TYPES_FAILURE,
    GET_PARTS_SUCCESS,
    GET_PARTS_FAILURE,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT,
} from "../types";

export default {
    getPartTypes({ commit }) {
        return PartsService.getPartTypes().then(
            (types) => {
                commit(GET_PART_TYPES_SUCCESS, types);
                return Promise.resolve(types);
            },
            (error) => {
                commit(GET_PART_TYPES_FAILURE);
                return Promise.reject(error);
            }
        );
    },
    getParts({ commit }, { name, types, size, page, sort }) {
        return PartsService.getParts(name, types, size, page, sort).then(
            (parts) => {
                commit(GET_PARTS_SUCCESS, parts);
                return Promise.resolve(parts);
            },
            (error) => {
                commit(GET_PARTS_FAILURE);
                return Promise.reject(error);
            }
        );
    },
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
