<template>
    <div>
        <div class="content">
            <h1>{{ content }}</h1>
        </div>
    </div>
</template>

<script>
import { API_URL } from "../services/request.service";
import authHeader from "../services/auth-header";
export default {
    name: "Home",
    data() {
        return {
            content: "",
        };
    },
    async mounted() {
        await fetch(API_URL, {
            headers: authHeader(),
        })
            .then((response) => {
                if (response.status === 401) {
                    this.$store.dispatch("auth/logout");
                    this.$router.push("/login");
                    return;
                }
                return response.json();
            })
            .then((res) => {
                this.content = res.message;
            });
    },
};
</script>
<style>
.content {
    flex: 1 0 auto;
    padding: 20px;
}

* {
    box-sizing: border-box;
}

body {
    margin: 0;
    font: 16px Sans-Serif;
}

h1 {
    margin: 0 0 20px 0;
}

p {
    margin: 0 0 20px 0;
}
</style>
