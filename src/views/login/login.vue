<template>
    <div id="login">
        <div id="login-wrapper">
            <div v-show="!register">
                <login-form></login-form>
                <el-button type="text" style="padding-top: 20px;" @click="register = true">用户注册</el-button>
            </div>
            <div v-show="register">
                <user-register></user-register>
                <el-button type="text" style="padding-top: 20px;" @click="register = false">用户登陆</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import Heart from '@/utils/canvas-heart'
import loginForm from './login-form'
import userRegister from './register-form'
export default {
    name: 'login',
    components: { loginForm, userRegister },
    data() {
        return { register: false }
    },
    mounted() {
        new Heart(document.getElementById('login'), { len: 20 })
    }
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