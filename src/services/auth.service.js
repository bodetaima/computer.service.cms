// const API_URL = "http://192.168.1.20:1025/api/auth";
// const API_URL = 'http://192.168.2.196:1025/api/auth';
const API_URL = 'http://localhost:1025/api/auth';
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

    login(user) {
        return this.postData(API_URL + "/signin", {
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
        return this.postData(API_URL + "/signup", {
            username: user.username,
            email: user.email,
            password: user.password,
        });
    }
}

export default new AuthService();
