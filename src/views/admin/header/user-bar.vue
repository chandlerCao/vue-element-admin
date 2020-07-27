<template>
	<div id="user-bar">
		<!-- <i class="el-icon-full-screen" id="full-screen-icon" @click="fullScreen"></i> -->
		<el-dropdown trigger="click" @command="handleCommand">
			<!-- 头像展示 -->
			<span class="el-dropdown-link">
				<span id="username">{{userInfo.username}}</span>
				<el-avatar size="medium" :src="userInfo.avatar"></el-avatar>
				<i class="el-icon-arrow-down el-icon--right"></i>
			</span>
			<el-dropdown-menu slot="dropdown">
				<el-dropdown-item command="home">首页</el-dropdown-item>
				<el-dropdown-item command="edituser">修改资料</el-dropdown-item>
				<el-dropdown-item command="github">项目地址</el-dropdown-item>
				<el-dropdown-item command="register">用户注册</el-dropdown-item>
				<el-dropdown-item divided command="loginOut">退出登陆</el-dropdown-item>
			</el-dropdown-menu>
		</el-dropdown>
	</div>
</template>

<script>
export default {
	name: 'user-bar',
	data() {
		return {
			userInfo: {
				username: '',
				avatar: ''
			}
		}
	},
	created() {
		// 获取用户信息
		this.getUserInfo()
	},
	methods: {
		// 获取用户信息
		async getUserInfo() {
			this.$req(this.$api.user.getUserInfo, {
				uid: window.localStorage.getItem('uid')
			}).then(({ username, avatar }) => {
				this.userInfo.username = username
				this.userInfo.avatar = avatar
			})
		},
		handleCommand(command) {
			switch (command) {
				case 'home':
					this.$router.push({ name: '首页' })
					break
				case 'edituser':
					this.$router.push({
						name: '用户编辑',
						params: { uid: window.localStorage.getItem('uid') }
					})
					break
				case 'github':
					window.open('https://www.baidu.com')
					break
				case 'register':
					this.$router.push('/register')
					break
				case 'loginOut':
					this.$router.push('/login')
			}
		}
	}
}
</script>

<style lang="less">
#user-bar {
	float: right;
	margin-right: 20px;
}
#full-screen-icon {
	font-size: 25px;
	padding-right: 15px;
	cursor: pointer;
}
#username {
	position: relative;
	padding-right: 15px;
	top: -11px;
	color: #909399;
}
</style>