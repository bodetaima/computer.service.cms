import authHeader from "./auth-header";

const API_URL = 'http://127.0.0.1:1025/endpoint';

class UserService {

    async getIndex() {
        return await fetch(API_URL + '/index', {
            headers: authHeader()
        });
    }

    async getPCParts(size, page) {
        return await fetch(API_URL + '/part?size=' + size + '&page=' + page, {
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

    async getPartDetails(type, id) {
        return await fetch(API_URL + `/part/${type}/${id}`, {
            headers: authHeader()
        })
    }

    async updatePartDetails(url = '', data = {}) {
        const response = await fetch(url, {
            method: 'PUT',
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

    async deletePart(url = '') {
        await fetch(url, {
            method: 'DELETE',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: authHeader(),
            redirect: 'follow',
            referrerPolicy: 'no-referrer'
        });
    }

    async searchPart(url = '') {
        const response = await fetch(url, {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: authHeader(),
            redirect: 'follow',
            referrerPolicy: 'no-referrer'
        });
        return response.json();
    }
}

export default new UserService();