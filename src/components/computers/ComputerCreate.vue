<template>
    <div>
        <b-form-group label="Mainboard:">
            <b-form-select required></b-form-select>
        </b-form-group>
        <b-form-group label="CPU:">
            <b-form-select required></b-form-select>
        </b-form-group>
        <b-form-group label="RAM:">
            <div style="display: flex">
                <b-form-select required style="width: 80%"></b-form-select>
                <b-form-input min="0" oninput="this.value = Math.abs(this.value)" placeholder="Số lượng" required
                              style="width: 20%" type="number"></b-form-input>
            </div>
        </b-form-group>
        <b-form-group label="GPU:">
            <div style="display: flex">
                <b-form-select required style="width: 80%"></b-form-select>
                <b-form-input min="0" oninput="this.value = Math.abs(this.value)" placeholder="Số lượng" required
                              style="width: 20%" type="number"></b-form-input>
            </div>
        </b-form-group>
        <b-form-group label="Nguồn:">
            <div style="display: flex">
                <b-form-select required style="width: 80%"></b-form-select>
                <b-form-input min="0" oninput="this.value = Math.abs(this.value)" placeholder="Số lượng" required
                              style="width: 20%" type="number"></b-form-input>
            </div>
        </b-form-group>
        <b-form-group label="SSD:">
            <div style="display: flex">
                <b-form-select required style="width: 80%"></b-form-select>
                <b-form-input min="0" oninput="this.value = Math.abs(this.value)" placeholder="Số lượng" required
                              style="width: 20%" type="number"></b-form-input>
            </div>
        </b-form-group>
        <b-form-group label="Nguồn:">
            <div style="display: flex">
                <b-form-select required style="width: 80%"></b-form-select>
                <b-form-input min="0" oninput="this.value = Math.abs(this.value)" placeholder="Số lượng" required
                              style="width: 20%" type="number"></b-form-input>
            </div>
        </b-form-group>
    </div>
</template>

<script>
    export default {
        name: "ComputerCreate"
    }
</script>

<style scoped>

</style>