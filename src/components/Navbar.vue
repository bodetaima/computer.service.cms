<template>

    <b-navbar class="navbar navbar-expand-lg navbar-dark bg-dark " toggleable="lg" type="dark" variant="info">
        <b-navbar-brand to="/"><img alt="Vue logo" class="logo-resize" src="../assets/logo.png"></b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse class="justify-content-end" id="nav-collapse" is-nav>
            <b-navbar-nav>
                <b-nav-item to="/">Trang chủ</b-nav-item>
                <b-nav-item to="/components">Linh kiện máy tính</b-nav-item>
                <b-nav-item to="/orders">Đơn hàng</b-nav-item>
                <b-nav-item to="/computers">Máy tính</b-nav-item>
                <b-nav-item to="/customers">Khách hàng</b-nav-item>
                <div class="navbar-nav ml-auto" v-if="currentUser">
                    <b-nav-item to="/profile">
                        <font-awesome-icon icon="user"/>
                        {{ currentUser.username }}
                    </b-nav-item>
                    <b-nav-item @click.prevent="logOut">
                        <font-awesome-icon icon="sign-out-alt"/>
                        LogOut
                    </b-nav-item>
                </div>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</template>

<script>
    export default {
        name: 'Navbar',
        computed: {
            currentUser() {
                return this.$store.state.auth.user;
            }
        },
        methods: {
            logOut() {
                this.$store.dispatch('auth/logout');
                this.$router.push('/login');
            }
        }
    }
</script>

<style>
    .logo-resize {
        width: 50px;
        height: 50px;
    }
</style>