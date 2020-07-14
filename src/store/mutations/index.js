import {
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT,
    GET_PART_TYPES_SUCCESS,
    GET_PART_TYPES_FAILURE,
    GET_PARTS_SUCCESS,
    GET_PARTS_FAILURE,
} from "../types";

export default {
    [LOGIN_SUCCESS](state, user) {
        state.status.loggedIn = true;
        state.user = user;
    },
    [LOGIN_FAILURE](state) {
        state.status.loggedIn = false;
        state.user = null;
    },
    [LOGOUT](state) {
        state.status.loggedIn = false;
        state.user = null;
    },
    [GET_PART_TYPES_SUCCESS](state, types) {
        state.types = types;
    },
    [GET_PART_TYPES_FAILURE](state) {
        state.types = [];
    },
    [GET_PARTS_SUCCESS](state, parts) {
        state.parts = parts;
    },
    [GET_PARTS_FAILURE](state) {
        state.parts = {};
    },
};
