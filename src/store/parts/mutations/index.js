import { GET_PART_TYPES_SUCCESS, GET_PARTS_SUCCESS, GET_PARTS_FAILURE, GET_PART_TYPES_FAILURE } from "../types";

export default {
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
