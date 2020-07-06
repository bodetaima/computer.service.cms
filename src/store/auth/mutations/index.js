import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from "../types";

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
};
