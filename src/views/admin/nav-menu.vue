<!-- 导航菜单 -->
<template>
	<div id="nav-menu">
		<!-- unique-opened -->
		<el-menu
			class="el-menu-vertical-demo"
			:default-active="$route.fullPath"
			router
			text-color="#6c748a"
			active-text-color="#6c748a"
			style="height: 100%"
			:collapse="isCollapse"
		>
			<comp-navmenu v-for="item in routes" :key="item.name" :nav-data="item"></comp-navmenu>
		</el-menu>
	</div>
</template>

<script>
import eventBus from '@/utils/event-bus'
import routes from '@/router/routes'
export default {
	name: 'nav-menu',
	data() {
		return {
			routes,
			isCollapse: false
		}
	},
	created() {
		eventBus.$on('collapseHandle', isCollapse => {
			this.isCollapse = isCollapse
		})
	}
}
</script>

<style lang="less" scoped>
#nav-menu {
	position: relative;
	width: 240px;
	height: 100%;
	box-sizing: border-box;
	padding: 10px 15px 0;
	border-right: 1px solid #dcdfe6;
	overflow: auto;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
	width: 210px;
}
</style>