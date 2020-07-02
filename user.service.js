import authHeader from "./auth-header";

//const API_URL = "http://192.168.1.20:1025";
// const API_URL = 'http://192.168.2.196:1025';
export const API_URL = "http://localhost:1025/api/";

class UserService {
    async getPartTypes() {
        return await fetch(API_URL + "api/types", {
            headers: authHeader(),
        }).then((response) => {
            if (response.status === 401) {
                this.$store.dispatch("auth/logout");
                this.$router.push("/login");
            }

            return response.json();
        });
    }

    async getChildPartTypes() {
        return await fetch(API_URL + "api/types/child", {
            headers: authHeader(),
        }).then((response) => {
            if (response.status === 401) {
                this.$store.dispatch("auth/logout");
                this.$router.push("/login");
            }

            return response.json();
        });
    }

    async createPcPart(data = {}) {
        await fetch(API_URL + "api/parts", {
            method: "POST",
            headers: authHeader(),
            body: JSON.stringify(data),
        }).then((response) => {
            if (response.status === 401) {
                this.$store.dispatch("auth/logout");
                this.$router.push("/login");
            }

            return response.json();
        });
    }

    async getPartDetails(id) {
        return await fetch(API_URL + `api/parts/${id}`, {
            headers: authHeader(),
        }).then((response) => {
            if (response.status === 401) {
                this.$store.dispatch("auth/logout");
                this.$router.push("/login");
            }

            return response.json();
        });
    }

    async updatePartDetails(id, data = {}) {
        await fetch(API_URL + `api/parts/${id}`, {
            method: "PUT",
            headers: authHeader(),
            body: JSON.stringify(data),
        }).then((response) => {
            if (response.status === 401) {
                this.$store.dispatch("auth/logout");
                this.$router.push("/login");
            }

            return response.json();
        });
    }
}
