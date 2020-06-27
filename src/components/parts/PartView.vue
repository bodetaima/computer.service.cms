<template><div></div></template>
<script>
import UserService from "../../services/user.service";

export default {
    name: "PartView",
    props: {
        part: {
            type: Object,
        },
        types: {
            type: Array,
        },
    },
    data() {
        return {
            name: this.part.name,
            type: this.part.type,
            description: this.part.description,
            price: this.part.price,
            loading: false,
            message: "",
            showSuccess: false,
            error: "",
            showError: false,
        };
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

                if (this.name && this.type && this.description && this.price) {
                    const data = {
                        id: this.$route.params.id,
                        type: this.type,
                        name: this.name,
                        price: this.price,
                        description: this.description,
                    };
                    UserService.updatePartDetails("http://127.0.0.1:1025/endpoint/part", data).then(
                        () => {
                            this.loading = false;
                            this.showError = false;
                            this.error = "";
                            this.showSuccess = true;
                            this.message = "Lưu thành công!";
                            setTimeout(() => {
                                this.message = "";
                                this.showSuccess = false;
                            }, 3000);
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
    },
    async mounted() {},
};
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
