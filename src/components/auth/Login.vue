<template>
    <v-container class="login-card">
        <form>
            <img class="profile-img-card" id="profile-img" src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" />
            <v-text-field v-model="user.username" label="Username" required></v-text-field>
            <v-text-field
                v-model="user.password"
                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show ? 'text' : 'password'"
                name="input-10-1"
                label="Password"
                @click:append="show = !show"
            ></v-text-field>
            <v-btn @click="handleLogin">Login</v-btn>
        </form>
    </v-container>
</template>

<script>
import LoginUser from "../../models/LoginUser";
import { mapState, mapActions } from "vuex";
export default {
    name: "Login",
    data() {
        return {
            user: new LoginUser("", ""),
            loading: false,
            message: "",
            show: false,
        };
    },
    computed: {
        ...mapState({
            loggedIn: (store) => store.auth.status.loggedIn,
        }),
    },
    created() {
        if (this.loggedIn) {
            this.$router.push("/");
        }
    },
    methods: {
        ...mapActions({
            login: "auth/login",
        }),
        handleLogin() {
            this.loading = true;
            if (this.user.username && this.user.password) {
                this.login(this.user).then(
                    () => {
                        this.$router.push("/");
                    },
                    (error) => {
                        this.loading = false;
                        this.message = (error.response && error.response.data) || error.message || error.toString();
                    }
                );
            }
        },
    },
};
</script>
<style scoped>
.login-card {
    width: 100%;
}

@media (min-width: 400px) {
    .login-card {
        width: 400px;
    }
}

.profile-img-card {
    width: 96px;
    height: 96px;
    margin: 0 auto 10px;
    display: block;
    -moz-border-radius: 50%;
    -webkit-border-radius: 50%;
    border-radius: 50%;
}
</style>
