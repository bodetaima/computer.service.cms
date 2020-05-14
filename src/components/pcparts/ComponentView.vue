<template>
    <div>
        <Navbar/>
        <div class="container">
            <div class="py-5 text-center"></div>
            <form @submit.prevent="onSubmitForm">
                <div class="row">
                    <div class="col-md-4 order-md-2 mb-4">
                        <h4 class="d-flex justify-content-between align-items-center mb-3">
                            <span class="text-muted">Notes</span>
                        </h4>
                        <ul class="list-group mb-3">
                            <li class="list-group-item d-flex justify-content-between lh-condensed">
                                <div>
                                    <h6 class="my-0">Tên linh kiện</h6>
                                </div>
                                <span class="text-muted">{{ name }}</span>
                            </li>
                            <li class="list-group-item d-flex justify-content-between lh-condensed">
                                <div>
                                    <h6 class="my-0">Loại linh kiện</h6>
                                </div>
                                <span class="text-muted">{{ type.toUpperCase() }}</span>
                            </li>
                            <li class="list-group-item d-flex justify-content-between lh-condensed">
                                <div>
                                    <h6 class="my-0">Giá linh kiện</h6>
                                </div>
                                <span class="text-muted">{{ price }}</span>
                            </li>
                        </ul>
                    </div>
                    <div class="col-md-8 order-md-1">
                        <h4 class="mb-3">Thông tin linh kiện</h4>
                        <div class="row">
                            <div class="col-md-4 mb-3">
                                <label for="name">Tên linh kiện</label>
                                <input autocomplete="off"
                                       class="form-control"
                                       id="name"
                                       maxlength="255"
                                       name="name"
                                       type="text"
                                       v-model="name"
                                       v-validate="'required'">
                                <div style="margin: 5px"></div>
                                <div
                                        role="alert"
                                        style="color: red; font-size: 10px"
                                        v-if="errors.has('name')"
                                >Vui lòng nhập tên linh kiện!
                                </div>
                            </div>

                            <div class="col-md-4 mb-3">
                                <label for="type">Loại linh kiện</label>
                                <select class="form-control" id="type" name="type"
                                        v-model="type"
                                        v-validate="'required'">
                                    <option disabled hidden value="">-- Chọn linh kiện --</option>
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
                                <div
                                        role="alert"
                                        style="color: red; font-size: 10px"
                                        v-if="errors.has('type')"
                                >Vui lòng chọn loại linh kiện!
                                </div>
                            </div>
                            <div class="col-md-4 mb-3">
                                <label for="price">Giá</label>
                                <div class="input-group">
                                    <input class="form-control col-sm-10"
                                           id="price"
                                           maxlength="120"
                                           min="1"
                                           name="price"
                                           oninput="this.value = Math.abs(this.value)"
                                           step="1"
                                           type="number"
                                           v-model="price"
                                           v-validate="'required'">
                                    <div class="input-group-append">
                                        <span class="input-group-text">VNĐ</span>
                                    </div>
                                </div>
                                <div
                                        role="alert"
                                        style="color: red; font-size: 10px"
                                        v-if="errors.has('price')"
                                >Vui lòng nhập giá linh kiện!
                                </div>
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="description">Thông tin thêm</label>
                            <div class="input-group">
                        <textarea class="form-control" id="description" maxlength="2000"
                                  name="description" rows="6"
                                  type="text" v-model="description"
                                  v-validate="'required'"></textarea>

                            </div>
                            <div
                                    role="alert"
                                    style="color: red; font-size: 10px"
                                    v-if="errors.has('description')"
                            >Vui lòng nhập mô tả linh kiện!
                            </div>
                        </div>
                        <div class="form-group">
                            <button :disabled="loading" class="btn btn-primary btn-block">
                                <span class="spinner-border spinner-border-sm" v-show="loading"></span>
                                <span>Lưu</span>
                            </button>
                        </div>
                        <div class="alert alert-success" role="alert" v-if="message">{{ message }}</div>
                        <div class="alert alert-danger" role="alert" v-if="error">{{ error }}</div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>
<script>

    import Navbar from "../Navbar";
    import UserService from '../../services/user.service';

    export default {
        name: 'ComponentView',
        components: {Navbar},
        data() {
            return {
                name: '',
                type: '',
                description: '',
                price: 0,
                loading: false,
                message: '',
                error: ''
            }
        },
        methods: {
            onSubmitForm() {

                this.loading = true;
                this.$validator.validateAll().then(isValid => {
                    if (!isValid) {
                        this.loading = false;
                        return;
                    }

                    if (this.name && this.type && this.description && this.price) {
                        const data = {
                            "id": this.$route.params.id,
                            "type": this.type,
                            "name": this.name,
                            "price": this.price,
                            "description": this.description
                        }
                        UserService.updatePartDetails('http://127.0.0.1:1025/endpoint/part', data)
                            .then(() => {
                                    this.loading = false;
                                    this.error = '';
                                    this.message = 'Lưu thành công!'
                                    setTimeout(() => {
                                        this.message = '';
                                    }, 3000);
                                },
                                error => {
                                    this.loading = false;
                                    this.error = 'Lưu không thành công. Lỗi: ' +
                                        ((error.response && error.response.data) ||
                                            error.message ||
                                            error.toString());
                                });
                    }
                })
            }
        },
        async mounted() {
            await UserService.getPartDetails(this.$route.params.type, this.$route.params.id).then(
                response => {
                    return response.json();
                }
            ).then((res) => {
                    this.name = res.name;
                    this.type = res.type;
                    this.name = res.name;
                    this.type = res.type;
                    this.description = res.description;
                    this.price = res.price;
                }
            )
        }
    }
</script>
<style scoped>

    input:invalid:required {
        background-color: rgba(255, 0, 0, 0.2);
    }

    textarea:invalid:required {
        background-color: rgba(255, 0, 0, 0.2);
    }

    select:invalid:required {
        background-color: rgba(255, 0, 0, 0.2);
    }
</style>