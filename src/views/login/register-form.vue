<template>
    <form id="register-form">
        <div id="register-title">用户注册</div>
        <div class="comp-form-item">
            <i class="el-icon-user-solid"></i>
            <input
                type="text"
                v-model="registerInfo.username"
                maxlength="10"
                placeholder="用户名"
                autofocus
            />
        </div>
        <div class="comp-form-item">
            <i class="el-icon-lock"></i>
            <input
                type="password"
                v-model="registerInfo.password"
                placeholder="用户密码"
                maxlength="16"
            />
        </div>
        <div class="comp-form-item">
            <i class="el-icon-lock"></i>
            <input
                type="password"
                v-model="registerInfo.confirmPassword"
                placeholder="确认密码"
                maxlength="16"
            />
        </div>
        <el-button
            type="primary"
            style="width: 100%"
            @click="register"
            :loading="registerLoading"
        >注册</el-button>
    </form>
</template>

<script>
export default {
    name: 'register-form',
    data() {
        return {
            registerLoading: false,
            registerInfo: {
                username: '',
                password: '',
                confirmPassword: ''
            }
        }
    },
    methods: {
        async register() {
            if (this.registerLoading) return
            this.registerLoading = true
            this.$req(this.$api.user.register, this.registerInfo)
                .then(registerRes => {
                    window.localStorage.setItem('token', registerRes.token)
                    this.$router.push({ name: '文章列表' })
                })
                .finally(() => {
                    this.registerLoading = false
                })
        }
    }
}
</script>

<style lang="less">
#register-form {
    display: block;
    width: 520px;
    max-width: 100%;
    overflow: hidden;
}
#register-title {
    font-size: 26px;
    color: #fff;
    margin: 0 auto 40px auto;
    text-align: center;
    font-weight: 700;
}
input {
    outline: none;
    background: transparent;
    border: 0;
    -webkit-appearance: none;
    border-radius: 0;
    height: 47px;
    box-sizing: border-box;
    padding: 12px 5px 12px 15px;
    color: #fff;
    caret-color: #fff;
}
.comp-form-item {
    display: flex;
    align-items: center;
    line-height: 32px;
    padding: 0 20px;
    border: 1px solid hsla(0, 0%, 100%, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #fff;
    margin-bottom: 18px;
    input {
        flex: 1;
    }
}
</style>