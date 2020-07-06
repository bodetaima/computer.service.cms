import { AUTH_URL } from "./request.service";

class AuthService {
    async postData(url = "", data = {}) {
        const response = await fetch(url, {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
            body: JSON.stringify(data),
        });
        return response.json();
    }

    async login(user) {
        return this.postData(AUTH_URL + "signin", {
            username: user.username,
            password: user.password,
        }).then((response) => {
            if (response.accessToken) {
                localStorage.setItem("user", JSON.stringify(response));
            }
            return response;
        });
    }

    logout() {
        localStorage.removeItem("user");
    }

    register(user) {
        return this.postData(AUTH_URL + "signup", {
            username: user.username,
            email: user.email,
            password: user.password,
        });
    }
}

export default new AuthService();
