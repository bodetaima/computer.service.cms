import authHeader from "./auth-header";

const API_URL = "http://192.168.1.20:1025";
// const API_URL = 'http://192.168.2.196:1025';
//const API_URL = "http://localhost:1025";

class UserService {
    async getIndex() {
        return await fetch(API_URL, {
            headers: authHeader(),
        });
    }

    async getPCParts(name = "", type = [], size = 5, page = 1, sort = "") {
        return await fetch(
            API_URL +
                "/api/parts?name=" +
                name +
                "&type=" +
                type.toString() +
                "&size=" +
                size +
                "&page=" +
                page +
                "&sort=" +
                sort,
            {
                headers: authHeader(),
            }
        );
    }

    async getPartTypes() {
        return await fetch(API_URL + "/api/types", {
            headers: authHeader(),
        });
    }

    async getChildPartTypes() {
        return await fetch(API_URL + "/api/types/child", {
            headers: authHeader(),
        });
    }

    async createPcPart(url = "", data = {}) {
        const response = await fetch(url, {
            method: "POST",
            headers: authHeader(),
            body: JSON.stringify(data),
        });
        return response.json();
    }

    async getPartDetails(type, id) {
        return await fetch(API_URL + `/part/${type}/${id}`, {
            headers: authHeader(),
        });
    }

    async updatePartDetails(url = "", data = {}) {
        const response = await fetch(url, {
            method: "PUT",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: authHeader(),
            redirect: "follow",
            referrerPolicy: "no-referrer",
            body: JSON.stringify(data),
        });
        return response.json();
    }

    async deletePart(url = "") {
        await fetch(url, {
            method: "DELETE",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: authHeader(),
            redirect: "follow",
            referrerPolicy: "no-referrer",
        });
    }

    async searchPart(url = "") {
        const response = await fetch(url, {
            method: "GET",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: authHeader(),
            redirect: "follow",
            referrerPolicy: "no-referrer",
        });
        return response.json();
    }
}

export default new UserService();
