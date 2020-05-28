<template>
	<div id="login" @keyup.enter="login">
		<form id="login-form">
			<div id="login-title">系统登录</div>
			<div class="comp-form-item">
				<i class="el-icon-user-solid"></i>
				<input type="text" maxlength="10" />
			</div>
			<div class="comp-form-item">
				<i class="el-icon-lock"></i>
				<input type="password" maxlength="16" />
			</div>
			<el-button type="primary" style="width: 100%" @click="login" :loading="loginLoading">登录</el-button>
		</form>
	</div>
</template>

<script>
import Heart from '@/utils/canvas-heart'
export default {
	name: 'login',
	data() {
		return {
			loginLoading: false
		}
	},
	mounted() {
		new Heart(document.getElementById('login'), { len: 20 })
	},
	methods: {
		login() {
			if (this.loginLoading) return
			this.loginLoading = true
			setTimeout(() => {
				this.loginLoading = false
			}, 300)
		}
	}
}
</script>

<style lang="less" scoped>
#login {
	height: 100%;
	background-color: #2d3a4b;
}
#login-form {
	position: relative;
	z-index: 2;
	width: 520px;
	max-width: 100%;
	padding: 160px 35px 0;
	margin: 0 auto;
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