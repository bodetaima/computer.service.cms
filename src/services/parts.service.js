import { API_URL } from "./request.service";
import authHeader from "./auth-header";
import store from "@/store";
import { router } from "@/routes/router";

class PartsService {
    async getData(url = "") {
        const response = await fetch(url, {
            method: "GET",
            mode: "cors",
            cache: "no-cache",
            headers: authHeader(),
            credentials: "same-origin",
        });

        if (!response.ok) {
            if ([401, 403].indexOf(response.status) !== -1) {
                store.dispatch("auth/logout");
                router.push("/login");
                return;
            }
        }
        return response.json();
    }

    async getPartTypes() {
        return this.getData(API_URL + "types").then((response) => response);
    }

    async getParts(name = "", types = [], size = 5, page = 0, sort = "") {
        return this.getData(
            API_URL + `parts?name=${name}&types=${types.toString()}&size=${size}&page=${page}&sort=${sort}`
        ).then((response) => response);
    }

    async getPartDetail(id) {
        return this.getData(API_URL + `parts/${id}`);
    }
}

export default new PartsService();
