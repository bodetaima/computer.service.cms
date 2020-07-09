<template>
    <v-container>
        <form>
            <v-text-field v-model="name" label="Tên linh kiện" :rules="nameRules" required></v-text-field>
            <v-select
                :items="childTypes"
                :readonly="update"
                :rules="typeRules"
                v-model="type"
                label="Loại linh kiện"
            ></v-select>
            <v-text-field
                type="number"
                v-model="price"
                label="Giá linh kiện"
                min="0"
                :rules="priceRules"
                required
            ></v-text-field>
            <v-textarea name="input-7-1" v-model="description" :rules="descRules" label="Mô tả linh kiện"></v-textarea>
        </form>
    </v-container>
</template>
<script>
import { API_URL } from "../../services/request.service";
import authHeader from "../../services/auth-header";
import PartsService from "@/services/parts.service";
export default {
    name: "PartForm",
    props: {
        id: {
            type: String,
        },
        types: {
            type: Array,
        },
    },
    data() {
        return {
            name: "",
            nameRules: [(v) => !!v || "Tên linh kiện không được để trống!"],
            typeRules: [(v) => !!v || "Loại linh kiện không được để trống!"],
            type: "",
            description: "",
            descRules: [(v) => !!v || "Mô tả linh kiện không được để trống!"],
            price: 0,
            priceRules: [
                (v) => !!v || "Giá linh kiện không được để trống!",
                (v) => v > 0 || "Giá linh kiện không được âm hoặc bằng 0!",
            ],
            message: "",
            showSuccess: false,
            showError: false,
            update: false,
        };
    },
    mounted() {
        if (this.id) {
            this.getPartDetails(this.id);
        }
    },
    computed: {
        childTypes() {
            return this.types.map((type) => ({ text: type.name, value: type.type }));
        },
    },
    methods: {
        async getPartDetails(id) {
            return await PartsService.getPartDetail(id)
                .then((part) => {
                    this.update = true;
                    this.name = part.name;
                    this.type = part.type.type;
                    this.price = part.price;
                    this.description = part.description;
                })
                .catch((e) => {});
        },
        async onSubmit() {
            if (!this.type || !this.name || !this.description || !this.price) {
                this.message = "Vui lòng nhập các trường còn thiếu!";
                this.showError = true;
                if (!this.update) {
                    this.$emit("createFail", this.showError, this.message);
                } else {
                    this.$emit("updateFail", this.showError, this.message);
                }

                return;
            }

            if (this.price <= 0) {
                this.message = "Giá linh kiện không thể âm hoặc bằng 0!";
                this.showError = true;
                if (!this.update) {
                    this.$emit("createFail", this.showError, this.message);
                } else {
                    this.$emit("updateFail", this.showError, this.message);
                }
                return;
            }

            if (this.type && this.name && this.description && this.price) {
                if (!this.update) {
                    const data = {
                        name: this.name,
                        type: this.type,
                        price: this.price,
                        description: this.description,
                    };
                    PartsService.createPart(data).then(
                        () => {
                            this.showSuccess = true;
                            this.message = "Lưu thành công!";
                            this.$emit("createSuccess", this.showSuccess, this.message);
                        },
                        (error) => {
                            this.showError = true;
                            this.message =
                                "Lưu không thành công. Lỗi: " +
                                ((error.response && error.response.data) || error.message || error.toString());
                            this.$emit("createFail", this.showError, this.message);
                        }
                    );
                } else {
                    const data = {
                        name: this.name,
                        price: this.price,
                        description: this.description,
                    };
                    PartsService.updatePart(this.id, data).then(
                        () => {
                            this.showSuccess = true;
                            this.message = "Lưu thành công!";
                            this.$emit("updateSuccess", this.showSuccess, this.message);
                        },
                        (error) => {
                            this.showError = true;
                            this.message =
                                "Lưu không thành công. Lỗi: " +
                                ((error.response && error.response.data) || error.message || error.toString());
                            this.$emit("updateFail", this.showError, this.message);
                        }
                    );
                }
            }
        },
        isEmpty(obj) {
            for (let key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) return false;
            }
            return true;
        },
    },
};
</script>
