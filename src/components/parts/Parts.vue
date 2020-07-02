<template>
    <v-container>
        <v-snackbar v-model="showSuccess" color="success" :timeout="3000" top>
            <v-icon>mdi-check-bold</v-icon>
            {{ message }}
        </v-snackbar>
        <v-snackbar v-model="showError" color="error" :timeout="3000" top>
            <v-icon>mdi-close-thick</v-icon>
            {{ message }}
        </v-snackbar>
        <v-dialog scrollable v-model="filterDialog" persistent max-width="600px">
            <template v-slot:activator="{ on, attrs }">
                <v-row class="mb-6" no-gutters>
                    <v-col md="4">
                        <v-btn depressed normal color="success" v-bind="attrs" v-on="on">
                            <v-icon>mdi-layers-search</v-icon>Tìm kiếm
                        </v-btn>
                    </v-col>
                    <v-col md="4" offset-md="4">
                        <v-select
                            :items="sortCondition"
                            v-model="sort"
                            label="Sắp xếp"
                            @change="getPCParts(name, selected, size, page, sort)"
                        ></v-select>
                    </v-col>
                </v-row>
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
                            getPCParts(name, selected, size, page, sort);
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
                getPCParts(name, selected, size, page, sort);
            "
            >{{ name }}</v-chip
        >
        <v-chip
            v-for="(type, index) in selected"
            :key="index"
            class="ma-2"
            close
            @click:close="
                selected.splice(index, 1);
                getPCParts(name, selected, size, page, sort);
            "
            >{{ type }}</v-chip
        >
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
                    <tr v-for="(part, index) in parts" :key="part.id">
                        <td>
                            <v-dialog
                                scrollable
                                v-model="updateDialog[index]"
                                persistent
                                max-width="600px"
                                @input="forceReloadUpdateComponent(index)"
                            >
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn text small v-bind="attrs" v-on="on" color="primary">{{ part.name }}</v-btn>
                                </template>
                                <v-card>
                                    <v-card-title>
                                        <span class="headline">Sửa thông tin linh kiện</span>
                                    </v-card-title>
                                    <v-card-text>
                                        <v-container>
                                            <part-form
                                                :key="updateComponentKey[index]"
                                                :id="part.id"
                                                :ref="'updateForm' + index"
                                                @updateSuccess="updateSuccess(index, ...arguments)"
                                                @updateFail="updateFail"
                                            ></part-form>
                                        </v-container>
                                    </v-card-text>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn color="blue darken-1" text @click="updateDialog[index] = false"
                                            >Đóng</v-btn
                                        >
                                        <v-btn color="blue darken-1" text @click="updateSubmit(index)">Lưu</v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                        </td>
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
        <v-pagination
            v-model="page"
            v-if="totalPages > 0"
            :length="totalPages"
            :total-visible="7"
            color="green"
            @input="getPCParts(name, selected, size, page, sort)"
        ></v-pagination>
        <v-dialog scrollable v-model="createDialog" persistent max-width="600px" @input="forceReloadCreateComponent">
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
                        <part-form
                            :key="createComponentKey"
                            ref="newForm"
                            @createSuccess="createSuccess"
                            @createFail="createFail"
                        ></part-form>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="createDialog = false">Đóng</v-btn>
                    <v-btn color="blue darken-1" text @click="createSubmit">Lưu</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
import { API_URL } from "../../services/request.service";
import PartForm from "./PartForm";
import authHeader from "../../services/auth-header";

export default {
    name: "Parts",
    components: { PartForm },
    data() {
        return {
            parts: [],
            types: [],
            size: 8,
            page: 1,
            totalPages: 0,
            name: "",
            hasData: false,
            filterDialog: false,
            createDialog: false,
            updateDialog: {},
            selected: [],
            showSuccess: false,
            showError: false,
            message: "",
            sortCondition: [
                {
                    text: "Mới nhất",
                    value: "",
                },
                {
                    text: "Cũ nhất",
                    value: "createdAsc",
                },
                {
                    text: "Giá thấp nhất",
                    value: "priceAsc",
                },
                {
                    text: "Giá cao nhất",
                    value: "priceDesc",
                },
            ],
            sort: "",
            createComponentKey: 0,
            updateComponentKey: {},
            keyIter: 0,
        };
    },
    mounted() {
        this.getPCParts(this.name, this.selected, 5, 1, this.sort);
        this.getPartTypes();
    },
    methods: {
        isEmpty(obj) {
            for (let key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) return false;
            }
            return true;
        },
        async getPCParts(name = "", type = [], size = 5, page = 1, sort = "") {
            await fetch(
                API_URL +
                    "parts?name=" +
                    name +
                    "&type=" +
                    type.toString() +
                    "&size=" +
                    size +
                    "&page=" +
                    page +
                    "&sort=" +
                    sort,
                {
                    headers: authHeader(),
                }
            )
                .then((response) => {
                    if (response.status === 401) {
                        this.$store.dispatch("auth/logout");
                        this.$router.push("/login");
                        return;
                    }
                    return response.json();
                })
                .then((res) => {
                    this.empty = this.isEmpty(res);
                    this.hasData = !this.isEmpty(res);
                    this.parts = res.parts;
                    this.size = res.size;
                    this.page = res.page;
                    this.totalPages = res.totalPages;
                });
        },
        async getPartTypes() {
            await fetch(API_URL + "types", {
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
                    this.types = res;
                });
        },
        createSubmit() {
            this.$refs.newForm.onCreatePart();
        },
        updateSubmit(index) {
            this.$refs["updateForm" + index][0].onUpdatePart();
        },
        createSuccess(...value) {
            let [state, message] = value;
            this.showSuccess = state;
            this.message = message;
            this.createDialog = false;
            this.getPCParts(this.name, this.selected, this.size, this.page, this.sort);
        },
        createFail(...value) {
            let [state, message] = value;
            this.showError = state;
            this.message = message;
        },
        updateSuccess(index, ...value) {
            let [state, message] = value;
            this.showSuccess = state;
            this.message = message;
            this.updateDialog[index] = false;
            this.getPCParts(this.name, this.selected, this.size, this.page, this.sort);
        },
        updateFail(...value) {
            let [state, message] = value;
            this.showError = state;
            this.message = message;
        },
        forceReloadCreateComponent() {
            this.createComponentKey += 1;
        },
        forceReloadUpdateComponent(i) {
            this.keyIter += 1;
            this.updateComponentKey[i] = this.keyIter;
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
