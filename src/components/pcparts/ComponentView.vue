<template>
    <div>
        <Navbar/>
        <div class="container">
            <div class="py-5 text-center"></div>
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
                        <li class="list-group-item flex justify-content-between">
                            <label for="price">Giá</label>
                            <div class="input-group">
                                <input @keyup="updatePrice"
                                       class="form-control col-sm-10"
                                       id="price"
                                       maxlength="120"
                                       min="0"
                                       oninput="this.value = Math.abs(this.value)"
                                       step="1"
                                       type="number"
                                       v-model="note.price">
                                <div class="input-group-append">
                                    <span class="input-group-text">VNĐ</span>
                                </div>
                            </div>
                        </li>
                    </ul>

                    <form class="card p-2">
                        <div class="input-group">
                            <input @click="onSubmitForm" class="btn btn-primary btn-lg btn-block" type="button"
                                   value="Lưu"/>
                        </div>
                    </form>
                </div>
                <div class="col-md-8 order-md-1">
                    <h4 class="mb-3">Thông tin linh kiện</h4>
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label for="name">Tên linh kiện</label>
                            <input @change="updateName"
                                   autocomplete="off"
                                   class="form-control"
                                   id="name"
                                   maxlength="255"
                                   required
                                   type="text"
                                   v-model="form.name">
                        </div>
                        <div class="col-md-6 mb-3">
                            <label for="type">Loại linh kiện</label>
                            <select @change="updateType" class="form-control" id="type" v-model="form.type">
                                <option disabled hidden value="">-- Chọn linh kiện --</option>
                                <optgroup label="Linh kiện máy tính">
                                    <option value="mainboard">Mainboard</option>
                                    <option value="cpu">CPU</option>
                                    <option value="ram">RAM</option>
                                    <option value="vga">VGA</option>
                                    <option value="psu">Nguồn</option>
                                </optgroup>
                                <optgroup label="Thiết bị lưu trữ">
                                    <option value="hhd">HDD</option>
                                    <option value="ssd">SSD</option>
                                </optgroup>
                            </select>
                        </div>
                    </div>
                    <div class="mb-3">
                        <label for="description">Thông tin thêm</label>
                        <div class="input-group">
                        <textarea @keyup="updateDescription" class="form-control" id="description"
                                  maxlength="2000" required rows="6" type="text"
                                  v-model="form.description"></textarea>
                        </div>
                    </div>
                </div>
            </div>
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
                form: {
                    name: '',
                    type: '',
                    description: ''
                },
                note: {
                    name: '',
                    type: '',
                    price: 0
                },
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
                this.note.price = event.target.value;
            },
            updateDescription(event) {
                this.form.description = event.target.value;
            },
            onSubmitForm() {
                const data = {
                    "id": this.$route.params.id,
                    "type": this.form.type,
                    "name": this.form.name,
                    "price": this.note.price,
                    "description": this.form.description
                }
                UserService.updatePartDetails('http://127.0.0.1:1025/endpoint/part', data)
                    .then(() => {
                        alert('Lưu thành công!');
                    });
            }
        },
        mounted() {
            UserService.getPartDetails(this.$route.params.type, this.$route.params.id).then(
                response => {
                    return response.json();
                }
            ).then((res) => {
                    this.form.name = res.name;
                    this.form.type = res.type;
                    this.note.name = res.name;
                    this.note.type = res.type.toUpperCase();
                    this.form.description = res.description;
                    this.note.price = res.price;
                }
            )
        }
    }
</script>