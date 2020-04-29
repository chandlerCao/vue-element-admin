<template>
	<div id="nav-menu">
		<el-menu
			:default-active="defaultActive"
			router
			class="el-menu-vertical-demo"
			background-color="#304156"
			text-color="#fff"
			active-text-color="#409eff"
			style="height: 100%"
			:collapse="isCollapse"
		>
			<el-menu-item index="/admin/home">
				<i class="el-icon-s-home"></i>
				<span slot="title">首页</span>
			</el-menu-item>
			<el-submenu index="/admin/user/userlist">
				<template slot="title">
					<i class="el-icon-user-solid"></i>
					<span>用户管理</span>
				</template>
				<el-menu-item index="/admin/user/userlist">用户列表</el-menu-item>
				<el-menu-item index="/admin/user/useradd">用户新增</el-menu-item>
			</el-submenu>
		</el-menu>
	</div>
</template>

<script>
import eventBus from '@/utils/event-bus'
export default {
	name: 'navMenu',
	data() {
		return { isCollapse: false }
	},
	created() {
		eventBus.$on('collapseHandle', isCollapse => {
			this.isCollapse = isCollapse
		})
	},
	computed: {
		defaultActive() {
			return this.$route.fullPath
		}
	}
}
</script>

<style lang="less" scoped>
#nav-menu {
	position: relative;
	width: 100%;
	height: 100%;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
	width: 240px;
}
</style>