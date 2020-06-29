<template>
    <v-container>
        <v-dialog scrollable v-model="dialog" persistent max-width="600px">
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
                                <v-text-field v-model="query" label="Tên linh kiện"></v-text-field>
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
                    <v-btn color="blue darken-1" text @click="dialog = false">Đóng</v-btn>
                    <v-btn color="blue darken-1" text @click="dialog = false">Tìm kiếm</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-simple-table>
            <template v-slot:default>
                <thead>
                    <tr>
                        <th class="text-left">Tên link kiện</th>
                        <th class="text-left">Loại linh kiện</th>
                        <th class="text-left">Giá</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="part in parts" :key="part.id">
                        <td>{{ part.name }}</td>
                        <td>{{ part.type.name }}</td>
                        <td>{{ part.price.toLocaleString("vn-VN", { style: "currency", currency: "VND" }) }}</td>
                    </tr>
                </tbody>
            </template>
        </v-simple-table>
        <router-link to="/part/create">
            <v-btn color="green" dark large fixed bottom right fab>
                <v-icon>mdi-plus</v-icon>
            </v-btn>
        </router-link>
    </v-container>
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
            selected: [],
        };
    },
    mounted() {
        UserService.getPCParts()
            .then((response) => {
                return response.json();
            })
            .then((res) => {
                this.empty = this.isEmpty(res.parts);
                this.hasData = !this.isEmpty(res.parts);
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
