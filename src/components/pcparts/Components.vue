<template>
    <div>
        <Navbar/>
        <div class="content">
            <div style="display: flex">
                <div>
                    <router-link to="/component/create">
                        <button class="btn btn-info">
                            Tạo mới linh kiện máy tính
                        </button>
                    </router-link>
                </div>
                <div style="margin: 10px"></div>
                <input class="form-control col-sm-2" type="text" v-model="query" value=""/>
                <div style="margin: 5px"></div>
                <select class="form-control col-sm-2" id="type" v-model="type">
                    <option value="">-- Chọn linh kiện --</option>
                    <optgroup label="Linh kiện máy tính">
                        <option value="mainboard">Mainboard</option>
                        <option value="cpu">CPU</option>
                        <option value="ram">RAM</option>
                        <option value="vga">VGA</option>
                        <option value="psu">Nguồn</option>
                    </optgroup>
                    <optgroup label="Thiết bị lưu trữ">
                        <option value="hdd">HDD</option>
                        <option value="ssd">SSD</option>
                    </optgroup>
                </select>
                <div style="margin: 5px"></div>
                <button @click="searchPart" class="btn btn-info">Tìm kiếm</button>

            </div>
            <table class="table table-active" style="margin-top: 15px">
                <span v-if="empty">Không có item nào!</span>
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
                parts: [],
                query: '',
                type: '',
                empty: false
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
            },
            isEmpty(obj) {
                for (let key in obj) {
                    if (Object.prototype.hasOwnProperty.call(obj, key))
                        return false;
                }
                return true;
            },
            searchPart() {
                console.log(this.type + ' ' + this.query);
                UserService.searchPart('http://127.0.0.1:1025/endpoint/part/search?type=' + this.type + '&query=' + this.query)
                    .then(res => {
                        if (!this.isEmpty(res)) {
                            this.parts = res;
                        } else {
                            this.parts = res;
                            this.empty = true;
                        }
                        // eslint-disable-next-line no-unused-vars
                    }).catch(e => {
                });
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
