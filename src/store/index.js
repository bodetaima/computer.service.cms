import Vue from "vue";
import Vuex from "vuex";
import { auth } from "./auth";
import { parts } from "./parts";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        auth,
        parts,
    },
});

