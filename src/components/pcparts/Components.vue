<template>
    <div>
        <Navbar/>
        <div class="content">
            <div class="pull-right" style="margin-bottom: 15px">
                <router-link to="/components/create">
                    <button class="btn-sm btn-info">
                        Tạo mới linh kiện máy tính
                    </button>
                </router-link>
            </div>
            <table class="table table-active" style="margin-top: 15px">
                <thead>
                <tr>
                    <th>Tên linh kiện</th>
                    <th>Loại linh kiện</th>
                    <th>Giá</th>
                </tr>
                </thead>
                <tbody :key="part.id" v-for="part in parts">
                <tr>
                    <td>{{ part.name }}</td>
                    <td>{{ part.type }}</td>
                    <td>{{ part.price }}</td>
                </tr>
                </tbody>
            </table>
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
                parts: []
            };
        },
        mounted() {
            UserService.getPCParts().then(
                response => {
                    return response.json()
                }
            ).then((res) => {
                this.parts = res
                // eslint-disable-next-line no-unused-vars
            }).catch(e => {
            });
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
