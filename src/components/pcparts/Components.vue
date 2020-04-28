<template>
    <div>
        <Navbar/>
        <div class="content">
            <ul class="nav nav-tabs">
                <li class="nav-item">
                    <h4 class="pull-right">Linh kiện máy tính</h4>
                </li>
            </ul>
            <div class="pull-right" style="margin-top: 10px">
                <router-link class="" to="/components/create">
                    <button class="btn btn-primary">Tạo mới linh kiện máy tính</button>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import UserService from '../../services/user.service';
    import Navbar from "../Navbar";

    export default {
        name: 'Components',
        components: {Navbar},
        data() {
            return {
                content: ''
            };
        },
        mounted() {
            UserService.getPCParts().then(
                response => {
                    this.content = response.data;
                },
                error => {
                    this.content =
                        (error.response && error.response.data) ||
                        error.message ||
                        error.toString();
                }
            );
        }
    }
</script>

<style>
    .pull-right {
        float: right
    }

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
