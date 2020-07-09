import { API_URL } from "@/constant";
import { getData } from "./request.service";

class CommonService {
    async indexCommonAPI() {
        return getData(API_URL).then((response) => response);
    }
}

export default new CommonService();
