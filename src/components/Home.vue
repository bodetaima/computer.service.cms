<template>
    <div>
        <div class="content">
            <h1>{{content}}</h1>
        </div>
    </div>
</template>

<script>
    import UserService from '../services/user.service';

    export default {
        name: 'Home',
        data() {
            return {
                content: ''
            };
        },
        mounted() {
            UserService.getIndex().then(
                response => {
                    return response.json();
                }
            ).then((res) => {
                this.content = res.message;
                // eslint-disable-next-line no-unused-vars
            }).catch(e => {
            });
        }
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
