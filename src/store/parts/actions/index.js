import PartsService from "../../../services/parts.service";
import { GET_PART_TYPES_SUCCESS, GET_PARTS_SUCCESS, GET_PARTS_FAILURE, GET_PART_TYPES_FAILURE } from "../types";
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
};
