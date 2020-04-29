<template>
	<div id="app">
		<el-container>
			<el-aside width="auto">
				<nav-menu></nav-menu>
			</el-aside>
			<el-container>
				<el-header style="height: 50px;">
					<div class="nav-menu-fold" @click="collapseHandle">
						<i v-if="isCollapse" class="el-icon-s-unfold"></i>
						<i v-else class="el-icon-s-fold"></i>
					</div>
					<breadcrumb style="margin-left: 10px;"></breadcrumb>
				</el-header>
				<el-main>
					<router-view></router-view>
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>

<script>
import eventBus from '@/utils/event-bus'
import navMenu from '@/views/menu'
import breadcrumb from '@/views/breadcrumb'
export default {
	name: 'app',
	components: {
		navMenu,
		breadcrumb
	},
	data() {
		return {
			isCollapse: false
		}
	},
	methods: {
		collapseHandle() {
			this.isCollapse = !this.isCollapse
			eventBus.$emit('collapseHandle', this.isCollapse)
		}
	}
}
</script>

<style lang="less" scoped>
#app {
	display: flex;
	height: 100%;
	overflow: hidden;
}

.el-aside {
	overflow: hidden;
}

.el-main {
	background-color: #f1f6fa;
}

.el-header {
	display: flex;
	align-items: center;
	padding-left: 0;
	box-shadow: 2px 0 18px rgba(145, 171, 213, 0.5);
}
body > .el-container {
	margin-bottom: 40px;
}
.nav-menu-fold {
	width: 50px;
	height: 50px;
	text-align: center;
	line-height: 50px;
	font-size: 20px;
	color: #303133;
	cursor: pointer;
	background-color: #fff;
	transition: 0.3s;
	&:hover {
		background-color: #f2f6fc;
	}
}
</style>