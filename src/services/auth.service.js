import { AUTH_URL } from "@/constant";
import { postDataNoHeader } from "./request.service";

class AuthService {
    async login(user) {
        return postDataNoHeader(AUTH_URL + "signin", {
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
}

export default new AuthService();
