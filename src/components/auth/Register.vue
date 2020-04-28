<template>
    <div class="col-md-12">
        <div class="card card-container">
            <img
                    alt="profile-picture"
                    class="profile-img-card"
                    id="profile-img"
                    src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"/>
            <form @submit.prevent="handleRegister" name="form">
                <div v-if="!successful">
                    <div class="form-group">
                        <label for="username">Username</label>
                        <input
                                class="form-control"
                                id="username"
                                name="username"
                                type="text"
                                v-model="user.username"
                                v-validate="'required|min:3|max:20'"
                        />
                        <div
                                class="alert-danger"
                                v-if="submitted && errors.has('username')"
                        >{{errors.first('username')}}
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input
                                class="form-control"
                                id="email"
                                name="email"
                                type="email"
                                v-model="user.email"
                                v-validate="'required|email|max:50'"
                        />
                        <div
                                class="alert-danger"
                                v-if="submitted && errors.has('email')"
                        >{{errors.first('email')}}
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input
                                class="form-control"
                                id="password"
                                name="password"
                                type="password"
                                v-model="user.password"
                                v-validate="'required|min:6|max:40'"
                        />
                        <div
                                class="alert-danger"
                                v-if="submitted && errors.has('password')"
                        >{{errors.first('password')}}
                        </div>
                    </div>
                    <div class="form-group">
                        <button class="btn btn-primary btn-block">Sign Up</button>
                    </div>
                </div>
            </form>

            <div
                    :class="successful ? 'alert-success' : 'alert-danger'"
                    class="alert"
                    v-if="message"
            >{{message}}
            </div>
        </div>
    </div>
</template>

<script>
    import RegisterUser from "../../models/RegisterUser";

    export default {
        name: 'Register',
        data() {
            return {
                user: new RegisterUser('', '', ''),
                submitted: false,
                successful: false,
                message: ''
            };
        },
        computed: {
            loggedIn() {
                return this.$store.state.auth.status.loggedIn;
            }
        },
        mounted() {
            if (this.loggedIn) {
                this.$router.push('/');
            }
        },
        methods: {
            handleRegister() {
                this.message = '';
                this.submitted = true;
                this.$validator.validate().then(isValid => {
                    if (isValid) {
                        this.$store.dispatch('auth/register', this.user).then(
                            data => {
                                this.message = data.message;
                                this.successful = true;
                            },
                            error => {
                                this.message =
                                    (error.response && error.response.data) ||
                                    error.message ||
                                    error.toString();
                                this.successful = false;
                            }
                        );
                    }
                });
            }
        }
    };
</script>

<style scoped>
    label {
        display: block;
        margin-top: 10px;
    }

    .card-container.card {
        max-width: 350px !important;
        padding: 40px 40px;
    }

    .card {
        background-color: #f7f7f7;
        padding: 20px 25px 30px;
        margin: 0 auto 25px;
        margin-top: 50px;
        -moz-border-radius: 2px;
        -webkit-border-radius: 2px;
        border-radius: 2px;
        -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
        -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
        box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
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