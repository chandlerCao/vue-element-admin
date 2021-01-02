<template>
    <div id="login">
        <div id="login-wrapper">
            <login-form></login-form>
            <router-link to="/register">
                <el-button type="text" style="padding-top: 20px"
                    >用户注册</el-button
                >
            </router-link>
        </div>
    </div>
</template>

<script>
import Heart from '@/utils/canvas-heart'
import loginForm from './login-form'
export default {
    name: 'login',
    components: { loginForm },
    mounted() {
        new Heart(document.getElementById('login'), { len: 20 })
    },
}
</script>

<style lang="less" scoped>
#login {
    height: 100%;
    background-color: #2d3a4b;
    padding: 160px 0;
}
#login-wrapper {
    position: relative;
    width: 520px;
    margin: 0 auto;
    z-index: 2;
}
</style>