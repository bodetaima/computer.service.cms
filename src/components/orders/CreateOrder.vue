<template>
    <div>
        <div class="container">
            <div class="py-5 text-center"></div>
            <b-form>
                <div style="float: left">
                    <div class="card">
                        <b-form-group id="customerNameLabel" label="Tên khách hàng:" label-for="customerName">
                            <b-form-input id="customerName" required type="text"></b-form-input>
                        </b-form-group>
                        <b-form-group id="customerEmailLabel" label="Email:" label-for="customerEmail">
                            <b-form-input id="customerEmail" required type="email"></b-form-input>
                        </b-form-group>
                        <b-form-group id="customerPhoneLabel" label="Số điện thoại:" label-for="customerPhone">
                            <b-form-input id="customerPhone" required type="text"></b-form-input>
                        </b-form-group>
                        <b-form-group id="customerAddressLabel" label="Địa chỉ:" label-for="customerAddress">
                            <b-form-input id="customerAddress" required type="text"></b-form-input>
                        </b-form-group>
                    </div>
                </div>
                <div style="display: grid;">
                    <div :key="computer.id" class="card" v-for="(computer, index) in computers">
                        <computer-create
                            :parts="parts"
                            :size="size"
                            :page="page"
                            :totalPages="totalPages"
                            :totalElements="totalElements"
                        />
                        <b-button
                            @click="deleteComputerCard(index)"
                            style="margin: 5px"
                            v-if="index > 0"
                            variant="danger"
                            >Xóa máy tính</b-button
                        >
                    </div>
                    <b-button @click="addNewComputerCard" style="margin: 5px" v-if="computers.length < 5" variant="info"
                        >Thêm máy tính</b-button
                    >
                </div>
                <div style="float: right;">
                    <b-button style="margin: 5px" type="submit" variant="primary">Submit</b-button>
                    <b-button type="reset" variant="danger">Reset</b-button>
                </div>
            </b-form>
        </div>
    </div>
</template>
<script>
import ComputerCreate from "../computers/ComputerCreate";
import UserService from "../../services/user.service";

export default {
    name: "CreateOrder",
    components: { ComputerCreate },
    data() {
        return {
            computers: [{ id: 1, name: "computer1" }],
            parts: [],
            size: 0,
            page: 0,
            totalPages: 0,
            totalElements: 0,
        };
    },
    methods: {
        addNewComputerCard() {
            let computerNumber = this.computers.length + 1;
            this.computers.push({
                id: computerNumber,
                name: "computer" + computerNumber,
            });
        },
        deleteComputerCard(index) {
            this.computers.splice(index, 1);
        },
    },
    created() {
        UserService.getPCParts(10, 0)
            .then((response) => {
                return response.json();
            })
            .then((res) => {
                this.parts = res.parts;
                this.size = res.size;
                this.page = res.page;
                this.totalPages = res.totalPages;
                this.totalElements = res.totalElements;
            })
            // eslint-disable-next-line no-unused-vars
            .catch((e) => {});
    },
};
</script>
<style>
.card {
    text-align: left;
    border: 1px solid darkslategrey;
    border-radius: 25px;
    padding: 25px;
    margin: 10px;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19);
}
</style>
