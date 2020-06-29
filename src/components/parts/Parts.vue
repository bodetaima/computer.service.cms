<template>
    <v-container>
        <v-snackbar v-model="showSuccess" color="success" :timeout="2000" top>
            {{ message }}
        </v-snackbar>
        <v-snackbar v-model="showError" color="error" :timeout="2000" top>
            {{ message }}
        </v-snackbar>
        <v-dialog scrollable v-model="filterDialog" persistent max-width="600px">
            <template v-slot:activator="{ on, attrs }">
                <v-btn depressed normal color="success" v-bind="attrs" v-on="on">
                    <v-icon>mdi-layers-search</v-icon> Tìm kiếm
                </v-btn>
            </template>
            <v-card>
                <v-card-title>
                    <span class="headline">Bộ lọc linh kiện</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12" sm="4">
                                <v-text-field v-model="name" label="Tên linh kiện"></v-text-field>
                            </v-col>
                            <template v-for="type in types">
                                <v-col cols="12" sm="4" :key="type.id">
                                    <v-subheader>{{ type.name }}</v-subheader>
                                    <v-checkbox
                                        v-for="child in type.childType"
                                        :key="child.id"
                                        :label="child.name"
                                        :value="child.type"
                                        v-model="selected"
                                    ></v-checkbox>
                                </v-col>
                            </template>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="filterDialog = false">Đóng</v-btn>
                    <v-btn
                        color="blue darken-1"
                        text
                        @click="
                            filterParts(name, selected);
                            filterDialog = false;
                        "
                        >Tìm kiếm</v-btn
                    >
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-spacer></v-spacer>
        <v-chip
            v-if="name !== ''"
            class="ma-2"
            close
            @click:close="
                name = '';
                filterParts(name, selected);
            "
        >
            {{ name }}
        </v-chip>
        <v-chip
            v-for="(type, index) in selected"
            :key="index"
            class="ma-2"
            close
            @click:close="
                selected.splice(index, 1);
                filterParts(name, selected);
            "
        >
            {{ type }}
        </v-chip>
        <v-spacer></v-spacer>
        <v-simple-table>
            <template v-slot:default>
                <thead>
                    <tr>
                        <th class="text-left">Tên link kiện</th>
                        <th class="text-left">Loại linh kiện</th>
                        <th class="text-left">Giá</th>
                    </tr>
                </thead>
                <tbody v-if="hasData">
                    <tr v-for="part in parts" :key="part.id">
                        <td>{{ part.name }}</td>
                        <td>{{ part.type.name }}</td>
                        <td>{{ part.price.toLocaleString("vn-VN", { style: "currency", currency: "VND" }) }}</td>
                    </tr>
                </tbody>
                <tbody v-else>
                    <tr>
                        Chưa có linh kiện nào!
                    </tr>
                </tbody>
            </template>
        </v-simple-table>
        <v-dialog scrollable v-model="createDialog" persistent max-width="600px">
            <template v-slot:activator="{ on, attrs }">
                <v-btn color="green" dark large fixed bottom right fab v-bind="attrs" v-on="on">
                    <v-icon>mdi-plus</v-icon>
                </v-btn>
            </template>
            <v-card>
                <v-card-title>
                    <span class="headline">Tạo linh kiện mới</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <part-create
                            ref="form"
                            @onSuccessState="successState"
                            @onFailState="failState"
                        ></part-create>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="createDialog = false">Đóng</v-btn>
                    <v-btn color="blue darken-1" text @click="submit">Lưu</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
import UserService from "../../services/user.service";
import PartCreate from "./PartCreate";
export default {
    name: "Parts",
    components: { PartCreate },
    data() {
        return {
            parts: [],
            types: [],
            size: 10,
            page: 0,
            inputPage: 1,
            totalPages: 0,
            totalElements: 0,
            name: "",
            hasData: false,
            filterDialog: false,
            createDialog: false,
            selected: [],
            showSuccess: false,
            showError: false,
            message: "",
        };
    },
    mounted() {
        UserService.getPCParts()
            .then((response) => {
                return response.json();
            })
            .then((res) => {
                this.empty = this.isEmpty(res);
                this.hasData = !this.isEmpty(res);
                this.parts = res;
            })
            .then(() => {
                UserService.getPartTypes()
                    .then((response) => response.json())
                    .then((res) => {
                        this.types = res;
                    });
            })
            // eslint-disable-next-line no-unused-vars
            .catch((e) => {});
    },
    methods: {
        isEmpty(obj) {
            for (let key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) return false;
            }
            return true;
        },
        filterParts(name, type) {
            UserService.getPCParts(name, type)
                .then((response) => {
                    return response.json();
                })
                .then((res) => {
                    this.empty = this.isEmpty(res);
                    this.hasData = !this.isEmpty(res);
                    this.parts = res;
                });
        },
        submit() {
            this.$refs.form.onSubmitForm();
        },
        successState(...value) {
            let [state, message] = value;
            this.showSuccess = state;
            this.message = message;
            this.createDialog = false;
            this.filterParts(this.name, this.selected);
        },
        failState(...value) {
            let [state, message] = value;
            this.showError = state;
            this.message = message;
        },
    },
};
</script>

<style scoped>
a {
    text-decoration: none;
}

a:hover {
    text-decoration: none;
}
</style>
