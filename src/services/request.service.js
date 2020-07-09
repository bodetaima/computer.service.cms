import authHeader from "./auth-header";
import store from "@/store";
import { router } from "@/routes/router";

export async function getData(url = "") {
    const response = await fetch(url, {
        method: "GET",
        headers: authHeader(),
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

export async function postData(url, data) {
    const response = await fetch(url, {
        method: "POST",
        headers: authHeader(),
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        if ([401, 403].indexOf(response.status) !== -1) {
            store.dispatch("auth/logout");
            router.push("/login");
        }
    }

    return response.json();
}

export async function postDataNoHeader(url = "", data = {}) {
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

export async function putData(url, data) {
    const response = await fetch(url, {
        method: "PUT",
        headers: authHeader(),
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        if ([401, 403].indexOf(response.status) !== -1) {
            store.dispatch("auth/logout");
            router.push("/login");
        }
    }

    return response.json();
}
