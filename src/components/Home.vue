<template>
    <div>
        <div class="content">
            <h1>{{ content }}</h1>
        </div>
    </div>
</template>

<script>
import CommonService from "@/services/common.service";

export default {
    name: "Home",
    data() {
        return {
            content: "",
        };
    },
    mounted() {
        CommonService.indexCommonAPI().then((response) => {
            this.content = response.message;
        });
    },
};
</script>
<style>
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
</style>
