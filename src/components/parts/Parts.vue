<template>
    <div>
        <Navbar/>
        <div class="content table-responsive">
            <div style="display: flex">
                <div>
                    <router-link to="/part/create">
                        <button class="btn btn-info">
                            Tạo mới linh kiện máy tính
                        </button>
                    </router-link>
                </div>
                <div style="margin-left: 49.3%"></div>
                <label for="query"></label>
                <input class="form-control col-sm-2" id="query" type="text" v-model="query" value=""/>
                <div style="margin: 5px"></div>
                <label for="type"></label>
                <select class="form-control col-sm-2" id="type" v-model="type">
                    <option value="">-- Chọn linh kiện --</option>
                    <optgroup :key="optgroup.name" :label="optgroup.name" v-for="optgroup in types">
                        <option :key="option.type" :value="option.type"
                                v-for="option in optgroup.partTypeDtoList">{{ option.name }}
                        </option>
                    </optgroup>
                </select>
                <div style="margin: 5px"></div>
                <button @click="searchPart" class="btn btn-info">Tìm kiếm</button>
            </div>
            <table class="table table-striped table-bordered b-table-fixed" style="margin-top: 15px" v-if="hasData">
                <thead>
                <tr>
                    <th style="width: 70%">Tên linh kiện</th>
                    <th style="width: 10%">Loại linh kiện</th>
                    <th style="width: 10%">Giá</th>
                    <th style="width: 10%">Xử lý</th>
                </tr>
                </thead>
                <tbody :key="part.type + part.id" v-bind:index="index" v-for="(part, index) in parts">
                <tr>
                    <td>
                        <router-link
                                :to="{ name: 'PartView', params: { type: part.type, id: part.id } }">
                            {{ part.name }}
                        </router-link>
                    </td>
                    <td>{{ part.type.toUpperCase() }}</td>
                    <td>{{ part.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND'}) }}</td>
                    <td>
                        <button @click="deletePart(part.id, index)" class="btn btn-danger">Xóa</button>
                    </td>
                </tr>
                </tbody>
            </table>
            <div style="margin: 10px"></div>
            <span v-if="empty">Không có item nào!</span>
            <div style="margin: 10px"></div>
            <div v-if="totalPages > 0">
                <ul class="pagination pull-right font-weight-bold">
                    <li class="page-item">
                        <label>
                            <input @keyup.enter="changePage(size, inputPage - 1)" class="page-link" type="number"
                                   v-model="inputPage"/>
                        </label>
                    </li>
                    <li class="page-item">
                        <label>
                            <select @change="changePage(size, 0)" class="page-link" v-model="size">
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="20">20</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                            </select>
                        </label>
                    </li>
                    <li class="page-item">
                        <button
                                :disabled="page === 0"
                                @click="changePage(size, 0)"
                                aria-label="First"
                                class="page-link"
                                data-toggle="tooltip"
                                title="First Page"><span aria-hidden="true">&laquo;</span>
                        </button>
                    </li>

                    <li class="page-item">
                        <button :disabled="page === 0" @click="changePage(size, page - 1)" aria-label="Back"
                                class="page-link" data-toggle="tooltip" title="Back">&larr;
                        </button>
                    </li>

                    <li class="page-item"
                        v-if="page - 3 > 0">
                        <button @click="changePage(size,page - 1)" class="page-link"> <span
                                data-feather="more-horizontal">...</span>
                        </button>
                    </li>

                    <li :key="page"
                        class="page-item" v-for="page in getPageNumbers()">
                        <button @click="changePage(size, page)"
                                class="page-link">{{ page + 1 }}
                        </button>
                    </li>

                    <li class="page-item"
                        v-if="page + 3 < totalPages">
                        <button @click="changePage(size,page + 1)"
                                class="page-link "><span
                                data-feather="more-horizontal">...</span>
                        </button>
                    </li>

                    <li class="page-item">
                        <button :disabled="page === totalPages - 1" @click="changePage(size,page + 1)"
                                aria-label="Forward" class="page-link" data-toggle="tooltip"
                                title="Forward">&rarr;
                        </button>
                    </li>
                    <li class="page-item">
                        <button :disabled="page === totalPages - 1" @click="changePage(size, totalPages - 1)"
                                aria-label="Last Page" class="page-link" data-toggle="tooltip"
                                title="Last Page">&raquo;
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import UserService from '../../services/user.service';
    import Navbar from "../Navbar";

    export default {
        name: 'Parts',
        components: {Navbar},
        data() {
            return {
                parts: [],
                types: [],
                size: 10,
                page: 0,
                inputPage: 1,
                totalPages: 0,
                totalElements: 0,
                query: '',
                type: '',
                empty: false,
                hasData: false
            };
        },
        mounted() {
            UserService.getPCParts(this.size, this.page).then(
                response => {
                    return response.json()
                }
            ).then((res) => {
                this.empty = this.isEmpty(res.parts);
                this.hasData = !this.isEmpty(res.parts);
                this.parts = res.parts;
                this.size = res.size;
                this.page = res.page;
                this.totalPages = res.totalPages;
                this.totalElements = res.totalElements;

            }).then(() => {
                UserService.getPartTypes()
                    .then(response => response.json())
                    .then(res => {
                        for (let key in res.types) {
                            if (Object.prototype.hasOwnProperty.call(res.types, key)) {
                                this.types.push(res.types[key])
                            }
                        }
                    })
                // eslint-disable-next-line no-unused-vars
            }).catch(e => {
            });


        },
        methods: {
            deletePart(id, index) {
                UserService.deletePart('http://127.0.0.1:1025/endpoint/part/' + id)
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
                UserService.searchPart('http://127.0.0.1:1025/endpoint/part/search?type=' + this.type + '&query=' + this.query + '&size=' + 10)
                    .then(res => {
                        this.empty = this.isEmpty(res.parts);
                        this.hasData = !this.isEmpty(res.parts);
                        this.parts = res.parts;
                        this.size = res.size;
                        this.page = res.page;
                        this.totalPages = res.totalPages;
                        this.totalElements = res.totalElements;
                        // eslint-disable-next-line no-unused-vars
                    }).catch(e => {
                });
            },
            getPageNumbers() {
                return [...Array(Number(this.totalPages)).keys()];
            },
            changePage(size, page) {
                UserService.getPCParts(size, page).then(
                    response => {
                        return response.json()
                    }
                ).then((res) => {
                    this.parts = res.parts;
                    this.size = res.size;
                    this.page = res.page;
                    this.totalPages = res.totalPages;
                    this.totalElements = res.totalElements;
                    // eslint-disable-next-line no-unused-vars
                }).catch(e => {
                });
            }
        }
    }
</script>

<style scoped>
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

    button:disabled,
    button[disabled] {
        color: #666666;
        cursor: not-allowed;
    }
</style>
