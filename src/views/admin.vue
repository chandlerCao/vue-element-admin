<template>
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
				<tabs></tabs>
				<transition name="slide">
					<router-view style="padding: 15px;"></router-view>
				</transition>
			</el-main>
		</el-container>
	</el-container>
</template>

<script>
import eventBus from '@/utils/event-bus'
import navMenu from '@/views/menu'
import breadcrumb from '@/views/breadcrumb'
import tabs from '@/views/tabs'
export default {
	name: 'app',
	components: {
		navMenu,
		breadcrumb,
		tabs
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
.el-aside {
	overflow: hidden;
}

.el-main {
	padding: 0;
	background-color: #f1f6fa;
}

.el-header {
	display: flex;
	align-items: center;
	padding-left: 0;
	border-bottom: 1px solid #dcdfe6;
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