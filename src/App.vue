<template>
    <v-app>
        <v-navigation-drawer v-model="drawer" v-if="!loggedIn" app>
            <v-list dense>
                <router-link to="/login">
                    <v-list-item link @click="drawer = !drawer">
                        <v-list-item-action>
                            <v-icon>mdi-login-variant</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>Đăng nhập</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </router-link>
            </v-list>
        </v-navigation-drawer>
        <v-navigation-drawer v-model="drawer" v-if="loggedIn" app>
            <v-list dense>
                <router-link to="/">
                    <v-list-item link @click="drawer = !drawer">
                        <v-list-item-action>
                            <v-icon>mdi-home</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>Trang chủ</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </router-link>
                <router-link to="/parts">
                    <v-list-item link @click="drawer = !drawer">
                        <v-list-item-action>
                            <v-icon>mdi-layers</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>Linh kiện máy tính</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </router-link>
                <v-list-item
                    link
                    @click.prevent="
                        logOut();
                        drawer = !drawer;
                    "
                >
                    <v-list-item-action>
                        <v-icon>mdi-logout-variant</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Đăng xuất</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar app color="green" dark>
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title>{{ $route.meta.title }}</v-toolbar-title>
        </v-app-bar>

        <v-main>
            <v-container fluid>
                <router-view></router-view>
            </v-container>
        </v-main>
    </v-app>
</template>
<script>
export default {
    name: "App",
    components: {},
    data() {
        return {
            drawer: false,
        };
    },
    computed: {
        currentUser() {
            return this.$store.state.auth.user;
        },
        loggedIn() {
            return this.$store.state.auth.status.loggedIn;
        },
    },
    methods: {
        logOut() {
            this.$store.dispatch("auth/logout");
            this.$router.push("/login");
        },
    },
};
</script>

<style scoped>
html,
body {
    height: 100%;
}
a {
    text-decoration: none;
}

a:hover {
    text-decoration: none;
}
</style>
