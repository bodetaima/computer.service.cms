import authHeader from "./auth-header";

const API_URL = 'http://127.0.0.1:1025/endpoint';

class UserService {

    getIndex() {
        return fetch(API_URL + '/index', {
            headers: authHeader()
        });
    }

    getPCParts() {
        return fetch(API_URL + '/part', {
            headers: authHeader()
        })
    }

    async createPcPart(url = '', data = {}) {
        const response = await fetch(url, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: authHeader(),
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(data)
        });
        return response.json();
    }
}

export default new UserService();