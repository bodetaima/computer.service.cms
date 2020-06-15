<template>
  <div>
    <b-button v-b-modal.mb block>Mainboard</b-button>
    <b-modal size="xl" id="mb" title="Mainboard">
      <table class="table table-stripped">
          <thead>
              <tr>
                  <th>Tên linh kiện</th>
                  <th>Giá linh kiện</th>
              </tr>
          </thead>
          <tbody>
              <tr v-for="(part, index) in parts" :key="index">
                  <td>{{ part.name }}</td>
                  <td>{{ part.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND'}) }}</td>
              </tr>
          </tbody>
      </table>
    </b-modal>
    <b-button v-b-modal.cpu block>CPU</b-button>
    <b-modal id="cpu" title="CPU">
      <p class="my-4">Hello from modal!</p>
    </b-modal>
    <b-button v-b-modal.ram block>RAM</b-button>
    <b-modal id="ram" title="RAM">
      <p class="my-4">Hello from modal!</p>
    </b-modal>
    <b-button v-b-modal.gpu block>GPU</b-button>
    <b-modal id="gpu" title="GPU">
      <p class="my-4">Hello from modal!</p>
    </b-modal>
    <b-button v-b-modal.psu block>Nguồn</b-button>
    <b-modal id="psu" title="Nguồn">
      <p class="my-4">Hello from modal!</p>
    </b-modal>
    <b-button v-b-modal.ssd block>SSD</b-button>
    <b-modal id="ssd" title="SSD">
      <p class="my-4">Hello from modal!</p>
    </b-modal>
    <b-button v-b-modal.hdd block>HDD</b-button>
    <b-modal id="hdd" title="HDD">
      <p class="my-4">Hello from modal!</p>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "ComputerCreate",
  props: {
      parts: Array,
      size: Number,
      page: Number,
      totalPages: Number,
      totalElements: Number
  }
};
</script>

<style scoped>
</style>