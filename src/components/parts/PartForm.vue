<template>
    <v-container>
        <form>
            <v-text-field v-model="name" label="Tên linh kiện" :rules="nameRules" required></v-text-field>
            <v-select
                :items="types"
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

export default {
    name: "PartForm",
    props: {
        id: {
            type: String,
        },
    },
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
            update: false,
        };
    },
    mounted() {
        this.getChildPartTypes();
        if (this.id) {
            this.getPartDetails(this.id);
        }
    },
    methods: {
        async getChildPartTypes() {
            return await fetch(API_URL + "types/child", {
                headers: authHeader(),
            })
                .then((response) => {
                    if (response.status === 401) {
                        this.$store.dispatch("auth/logout");
                        this.$router.push("/login");
                    }

                    return response.json();
                })
                .then((res) => {
                    this.types = res.map((r) => ({ text: r.name, value: r.type }));
                });
        },
        async getPartDetails(id) {
            return await fetch(API_URL + `parts/${id}`, {
                headers: authHeader(),
            })
                .then((response) => {
                    if (response.status === 401) {
                        this.$store.dispatch("auth/logout");
                        this.$router.push("/login");
                    }

                    return response.json();
                })
                .then((res) => {
                    this.update = true;
                    this.name = res.name;
                    this.type = res.type.type;
                    this.price = res.price;
                    this.description = res.description;
                });
        },
        async onCreatePart() {
            if (!this.type || !this.name || !this.description || !this.price) {
                this.message = "Vui lòng nhập các trường còn thiếu!";
                this.showError = true;
                this.$emit("createFail", this.showError, this.message);
                return;
            }

            if (this.price <= 0) {
                this.message = "Giá linh kiện không thể âm hoặc bằng 0!";
                this.showError = true;
                this.$emit("createFail", this.showError, this.message);
                return;
            }

            if (this.type && this.name && this.description && this.price) {
                const data = {
                    name: this.name,
                    type: this.type,
                    price: this.price,
                    description: this.description,
                };
                await fetch(API_URL + "parts", {
                    method: "POST",
                    headers: authHeader(),
                    body: JSON.stringify(data),
                })
                    .then((response) => {
                        if (response.status === 401) {
                            this.$store.dispatch("auth/logout");
                            this.$router.push("/login");
                        }

                        return response.json();
                    })
                    .then(
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
            }
        },
        async onUpdatePart() {
            if (!this.type || !this.name || !this.description || !this.price) {
                this.message = "Vui lòng nhập các trường còn thiếu!";
                this.showError = true;
                this.$emit("updateFail", this.showError, this.message);
                return;
            }

            if (this.price <= 0) {
                this.message = "Giá linh kiện không thể âm hoặc bằng 0!";
                this.showError = true;
                this.$emit("updateFail", this.showError, this.message);
                return;
            }

            if (this.type && this.name && this.description && this.price) {
                const data = {
                    name: this.name,
                    price: this.price,
                    description: this.description,
                };
                await fetch(API_URL + `parts/${this.id}`, {
                    method: "PUT",
                    headers: authHeader(),
                    body: JSON.stringify(data),
                })
                    .then((response) => {
                        if (response.status === 401) {
                            this.$store.dispatch("auth/logout");
                            this.$router.push("/login");
                        }

                        return response.json();
                    })
                    .then(
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
