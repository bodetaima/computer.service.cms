<template><div></div></template>
<script>
import UserService from "../../services/user.service";

export default {
    name: "PartCreate",
    data() {
        return {
            name: "",
            types: [],
            type: "",
            description: "",
            price: 0,
            loading: false,
            message: "",
            showSuccess: false,
            error: "",
            showError: false,
        };
    },
    mounted() {
        UserService.getPartTypes()
            .then((response) => response.json())
            .then((res) => {
                for (let key in res.types) {
                    if (Object.prototype.hasOwnProperty.call(res.types, key)) {
                        this.types.push(res.types[key]);
                    }
                }
            });
    },
    methods: {
        onSubmitForm() {
            this.loading = true;
            this.$validator.validateAll().then((isValid) => {
                if (!isValid) {
                    this.error = "Vui lòng nhập các trường còn thiếu!";
                    this.showError = true;
                    this.loading = false;
                    return;
                }

                if (this.type && this.name && this.description && this.price) {
                    const data = {
                        type: this.type,
                        name: this.name,
                        price: this.price,
                        description: this.description,
                    };
                    UserService.createPcPart("http://127.0.0.1:1025/endpoint/part", data).then(
                        () => {
                            this.showError = false;
                            this.error = "";
                            this.showSuccess = true;
                            this.message = "Lưu thành công!";
                            setTimeout(() => {
                                this.$router.push({ name: "Parts" });
                            }, 1000);
                        },
                        (error) => {
                            this.loading = false;
                            this.showError = true;
                            this.error =
                                "Lưu không thành công. Lỗi: " +
                                ((error.response && error.response.data) || error.message || error.toString());
                        }
                    );
                }
            });
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
