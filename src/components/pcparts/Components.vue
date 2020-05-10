<template>
    <div>
        <Navbar/>
        <div class="content">
            <div class="pull-right" style="margin-bottom: 15px">
                <router-link to="/component/create">
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
                    <th>Xử lý</th>
                </tr>
                </thead>
                <tbody :key="part.type + part.id" v-bind:index="index" v-for="(part, index) in parts">
                <tr>
                    <td><a :href="'/component/' + part.type + '/' + part.id">{{ part.name }}</a></td>
                    <td>{{ part.type.toUpperCase() }}</td>
                    <td>{{ part.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND'}) }}</td>
                    <td>
                        <button @click="deletePart(part.type, part.id, index)" class="btn btn-danger">Xóa</button>
                    </td>
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
        },
        methods: {
            deletePart(type, id, index) {
                UserService.deletePart('http://127.0.0.1:1025/endpoint/part/' + type + '/' + id)
                    .then(() => {
                        this.parts.splice(index, 1);
                        alert("Xóa thành công!");
                    })
            }
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
