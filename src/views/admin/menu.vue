<!-- 导航菜单 -->
<template>
	<div id="nav-menu">
		<el-menu
			class="el-menu-vertical-demo"
			:default-active="$route.fullPath"
			router
			unique-opened
			background-color="#ebf1f6"
			active-text-color="#409eff"
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
	name: 'navMenu',
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
	width: 100%;
	height: 100%;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
	width: 240px;
}
</style>