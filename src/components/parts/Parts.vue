<template>
        <v-row justify="center" align="center">
                <v-dialog v-model="dialog" persistent max-width="600px">
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
                                    <v-col cols="12" sm="6">
                                        <v-text-field v-model="query" label="Tên linh kiện"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6">
                                        <v-select :items="types" v-model="type" label="Loại linh kiện"></v-select>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="dialog = false">Đóng</v-btn>
                            <v-btn color="blue darken-1" text @click="dialog = false">Tìm kiếm</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            <router-link to="/part/create">
                <v-btn color="green" dark large fixed bottom right fab>
                    <v-icon>mdi-plus</v-icon>
                </v-btn>
            </router-link>
        </v-row>
</template>

<script>
import UserService from "../../services/user.service";

export default {
    name: "Parts",
    data() {
        return {
            parts: [],
            types: [],
            size: 10,
            page: 0,
            inputPage: 1,
            totalPages: 0,
            totalElements: 0,
            query: "",
            type: "",
            empty: false,
            hasData: false,
            dialog: false,
        };
    },
    mounted() {
        UserService.getPCParts(this.size, this.page)
            .then((response) => {
                return response.json();
            })
            .then((res) => {
                this.empty = this.isEmpty(res.parts);
                this.hasData = !this.isEmpty(res.parts);
                this.parts = res.parts;
                this.size = res.size;
                this.page = res.page;
                this.totalPages = res.totalPages;
                this.totalElements = res.totalElements;
            })
            .then(() => {
                UserService.getPartTypes()
                    .then((response) => response.json())
                    .then((res) => {
                        for (let key in res.types) {
                            if (Object.prototype.hasOwnProperty.call(res.types, key)) {
                                this.types.push(res.types[key]);
                            }
                        }
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
        searchPart() {
            UserService.searchPart(
                "http://127.0.0.1:1025/endpoint/part/search?type=" + this.type + "&query=" + this.query + "&size=" + 10
            )
                .then((res) => {
                    this.empty = this.isEmpty(res.parts);
                    this.hasData = !this.isEmpty(res.parts);
                    this.parts = res.parts;
                    this.size = res.size;
                    this.page = res.page;
                    this.totalPages = res.totalPages;
                    this.totalElements = res.totalElements;
                })
                // eslint-disable-next-line no-unused-vars
                .catch((e) => {});
        },
        getPageNumbers() {
            return [...Array(Number(this.totalPages)).keys()];
        },
        changePage(size, page) {
            UserService.getPCParts(size, page)
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
