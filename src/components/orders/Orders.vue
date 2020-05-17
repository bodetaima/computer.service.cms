<template>
  <div>
    <Navbar/>
    <div class="content">
      <div style="display: flex">
        <div>
          <router-link to="/order/create">
            <button class="btn btn-info">
              Tạo đơn hàng mới
            </button>
          </router-link>
        </div>
        <div style="margin-left: 49.3%"></div>
        <label for="query"></label>
        <input class="form-control col-sm-2" id="query" type="text" value=""/>
        <div style="margin: 5px"></div>
        <label for="type"></label>
        <select class="form-control col-sm-2" id="type">
          <option value="">-- Selection --</option>
        </select>
        <div style="margin: 5px"></div>
        <button class="btn btn-info">Tìm kiếm</button>
      </div>
    </div>
  </div>
</template>
<script>
  import Navbar from "../Navbar";

  export default {
    name: "Orders",
    components: {Navbar},
  };
</script>
<style scoped>
  .pull-right {
    float: right
  }

  .content {
    flex: 1 0 auto;
    padding: 20px;
  }

  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font: 16px Sans-Serif;
  }

  h1 {
    margin: 0 0 20px 0;
  }

  p {
    margin: 0 0 20px 0;
  }

  button:disabled,
  button[disabled] {
    color: #666666;
    cursor: not-allowed;
  }
</style>
