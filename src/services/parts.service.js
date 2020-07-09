import { API_URL } from "@/constant";
import { getData, postData, putData } from "./request.service";

class PartsService {
    async getPartTypes() {
        return getData(API_URL + "types").then((response) => response);
    }

    async getParts(name = "", types = [], size = 5, page = 0, sort = "") {
        return getData(
            API_URL + `parts?name=${name}&types=${types.toString()}&size=${size}&page=${page}&sort=${sort}`
        ).then((response) => response);
    }

    async getPartDetail(id) {
        return getData(API_URL + `parts/${id}`).then((response) => response);
    }

    async createPart(data) {
        return postData(API_URL + "parts", data).then((response) => response);
    }

    async updatePart(id, data) {
        return putData(API_URL + `parts/${id}`, data).then((response) => response);
    }
}

export default new PartsService();
