<template>
    <v-container>
        <form>
            <v-text-field v-model="name" label="Tên linh kiện" :rules="nameRules" required></v-text-field>
            <v-select :items="types" :rules="typeRules" v-model="type" label="Loại linh kiện"> </v-select>
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
import UserService from "../../services/user.service";

export default {
    name: "PartCreate",
    data() {
        return {
            name: "",
            nameRules: [(v) => !!v || "Tên linh kiện không được để trống!"],
            types: [],
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
        };
    },
    mounted() {
        UserService.getChildPartTypes()
            .then((response) => response.json())
            .then((res) => {
                this.types = res.map((r) => ({ text: r.name, value: r.type }));
            });
    },
    methods: {
        onSubmitForm() {
            if (!this.type || !this.name || !this.description || !this.price) {
                this.message = "Vui lòng nhập các trường còn thiếu!";
                this.showError = true;
                this.$emit("submitFail", this.showError, this.message);
                return;
            }

            if (this.price <= 0) {
                this.message = "Giá linh kiện không thể âm hoặc bằng 0!";
                this.showError = true;
                this.$emit("submitFail", this.showError, this.message);
                return;
            }

            if (this.type && this.name && this.description && this.price) {
                const data = {
                    name: this.name,
                    type: this.type,
                    price: this.price,
                    description: this.description,
                };
                UserService.createPcPart("http://localhost:1025/api/parts", data).then(
                    () => {
                        this.showSuccess = true;
                        this.message = "Lưu thành công!";
                        this.$emit("submitSuccess", this.showSuccess, this.message);
                    },
                    (error) => {
                        this.showError = true;
                        this.message =
                            "Lưu không thành công. Lỗi: " +
                            ((error.response && error.response.data) || error.message || error.toString());
                        this.$emit("submitFail", this.showError, this.message);
                    }
                );
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
