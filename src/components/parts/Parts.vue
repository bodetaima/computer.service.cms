<template>
    <v-container>
        <v-snackbar v-model="showSuccess" color="success" :timeout="3000" top>
            <v-icon>mdi-check-bold</v-icon> {{ message }}
        </v-snackbar>
        <v-snackbar v-model="showError" color="error" :timeout="3000" top>
            <v-icon>mdi-close-thick</v-icon> {{ message }}
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
                            filterParts(name, selected, size, page);
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
                filterParts(name, selected, size, page);
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
                filterParts(name, selected, size, page);
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
        <v-pagination
            v-model="page"
            v-if="totalPages > 0"
            :length="totalPages"
            :total-visible="7"
            @input="filterParts(name, selected, size, page)"
        ></v-pagination>
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
                        <part-create ref="form" @submitSuccess="success" @submitFail="fail"></part-create>
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
            size: 8,
            page: 1,
            totalPages: 0,
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
                this.parts = res.parts;
                this.size = res.size;
                this.page = res.page;
                this.totalPages = res.totalPages;
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
        filterParts(name, type, size, page) {
            UserService.getPCParts(name, type, size, page)
                .then((response) => {
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
        submit() {
            this.$refs.form.onSubmitForm();
        },
        success(...value) {
            let [state, message] = value;
            this.showSuccess = state;
            this.message = message;
            this.createDialog = false;
            this.filterParts(this.name, this.selected, this.size, this.page);
        },
        fail(...value) {
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
