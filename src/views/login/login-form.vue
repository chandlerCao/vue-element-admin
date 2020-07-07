<template>
	<form id="login-form" @keyup.enter="login">
		<div id="login-title">系统登录</div>
		<div class="comp-form-item">
			<i class="el-icon-user-solid"></i>
			<input type="text" v-model="loginInfo.username" maxlength="10" placeholder="用户名：admin" autofocus />
		</div>
		<div class="comp-form-item">
			<i class="el-icon-lock"></i>
			<input type="password" v-model="loginInfo.password" maxlength="16" placeholder="密码：1" />
		</div>
		<el-button type="primary" style="width: 100%" @click="login" :loading="loginLoading">登录</el-button>
	</form>
</template>

<script>
export default {
	name: 'login-form',
	data() {
		return {
			loginLoading: false,
			loginInfo: {
				username: '',
				password: ''
			}
		}
	},
	beforeCreate() {
		window.localStorage.removeItem('token')
	},
	methods: {
		async login() {
			if (this.loginLoading) return
			this.loginLoading = true
			this.$req(this.$api.user.login, this.loginInfo)
				.then(loginRes => {
					window.localStorage.setItem('token', loginRes.token)
					window.localStorage.setItem('uid', loginRes.uid)
					this.$router.push({ name: '首页' })
				})
				.finally(() => {
					this.loginLoading = false
				})
		}
	}
}
</script>

<style lang="less" scoped>
#login-form {
	display: block;
	width: 520px;
	max-width: 100%;
	overflow: hidden;
}
#login-title {
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