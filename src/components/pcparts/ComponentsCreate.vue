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
                                <span class="text-muted">{{ note.name }}</span>
                            </li>
                            <li class="list-group-item d-flex justify-content-between lh-condensed">
                                <div>
                                    <h6 class="my-0">Loại linh kiện</h6>
                                </div>
                                <span class="text-muted">{{ note.type }}</span>
                            </li>
                            <li class="list-group-item d-flex justify-content-between lh-condensed">
                                <div>
                                    <h6 class="my-0">Giá linh kiện</h6>
                                </div>
                                <span class="text-muted">{{ note.price }}</span>
                            </li>
                        </ul>
                    </div>
                    <div class="col-md-8 order-md-1">
                        <h4 class="mb-3">Thông tin linh kiện</h4>
                        <div class="row">
                            <div class="col-md-4 mb-3">
                                <label for="name">Tên linh kiện</label>
                                <input @change="updateName"
                                       autocomplete="off"
                                       class="form-control"
                                       id="name"
                                       maxlength="255"
                                       name="name"
                                       oninvalid="this.setCustomValidity('Tên không thể bỏ trống!')"
                                       required
                                       type="text"
                                       v-model="form.name">
                            </div>
                            <div class="col-md-4 mb-3">
                                <label for="type">Loại linh kiện</label>
                                <select @change="updateType" class="form-control" id="type"
                                        oninvalid="this.setCustomValidity('Vui lòng chọn một loại linh kiện!')"
                                        required v-model="form.type">
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
                            </div>
                            <div class="col-md-4 mb-3">
                                <label for="price">Giá</label>
                                <div class="input-group">
                                    <input @change="updatePrice"
                                           class="form-control col-sm-10"
                                           id="price"
                                           maxlength="120"
                                           min="1"
                                           oninput="this.value = Math.abs(this.value)"
                                           oninvalid="this.setCustomValidity('Giá không thể bỏ trống hoặc 0!')"
                                           required
                                           step="1"
                                           type="number"
                                           v-model="form.price">
                                    <div class="input-group-append">
                                        <span class="input-group-text">VNĐ</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="description">Thông tin thêm</label>
                            <div class="input-group">
                        <textarea @keyup="updateDescription" class="form-control" id="description"
                                  maxlength="2000" oninvalid="this.setCustomValidity('Mô tả không thể bỏ trống!')"
                                  required rows="6" type="text"
                                  v-model="form.description"></textarea>
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
    import UserService from '../../services/user.service';
    import Navbar from "../Navbar";

    export default {
        name: 'ComponentsCreate',
        components: {Navbar},
        data() {
            return {
                form: {
                    name: '',
                    type: '',
                    description: '',
                    price: 0
                },
                note: {
                    name: '',
                    type: '',
                    price: 0
                },
                loading: false,
                message: '',
                error: ''
            }
        },
        methods: {
            updateName(event) {
                this.form.name = event.target.value;
                this.note.name = this.form.name;
            },
            updateType(event) {
                this.form.type = event.target.value;
                this.note.type = this.form.type.toUpperCase();
            },
            updatePrice(event) {
                this.form.price = event.target.value;
                this.note.price = this.form.price;
            },
            updateDescription(event) {
                this.form.description = event.target.value;
            },
            onSubmitForm() {
                this.loading = true;
                this.$validator.validateAll().then(isValid => {
                    if (!isValid) {
                        this.loading = false;
                        return;
                    }

                    if (this.form.type && this.form.name && this.form.description && this.note.price) {
                        const data = {
                            "type": this.form.type,
                            "name": this.form.name,
                            "price": this.form.price,
                            "description": this.form.description
                        }
                        UserService.createPcPart('http://127.0.0.1:1025/endpoint/part', data)
                            .then(() => {
                                    this.error = '';
                                    this.message = 'Lưu thành công!'
                                    setTimeout(() => {
                                        this.$router.push({"name": "Components"});
                                    }, 1000);
                                },
                                error => {
                                    this.loading = false;
                                    this.error = 'Lưu không thành công. Lỗi: ' +
                                        ((error.response && error.response.data) ||
                                            error.message ||
                                            error.toString());
                                });
                    }
                });
            }
        }
    }
</script>