<template>
	<el-container>
		<el-aside width="auto">
			<nav-menu></nav-menu>
		</el-aside>
		<el-container>
			<el-header id="comp-header" class="comp-shadow" style="height: 50px;">
				<div class="nav-menu-fold" @click="collapseHandle">
					<i v-show="isCollapse" class="el-icon-s-unfold"></i>
					<i v-show="!isCollapse" class="el-icon-s-fold"></i>
				</div>
				<breadcrumb style="margin-left: 10px;"></breadcrumb>
			</el-header>
			<el-main>
				<el-container style="padding: 10px 15px;">
					<el-header style="height: auto;">
						<tabs></tabs>
					</el-header>
					<el-main>
						<transition name="slide-fade">
							<router-view></router-view>
						</transition>
					</el-main>
				</el-container>
			</el-main>
		</el-container>
	</el-container>
</template>

<script>
import eventBus from '@/utils/event-bus'
import navMenu from '@/views/admin/menu'
import breadcrumb from '@/views/admin/breadcrumb'
import tabs from '@/views/admin/tabs'
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
#comp-header {
	display: flex;
	align-items: center;
	padding-left: 0;
}
// .el-main {
// 	background-color: #f1f6fa;
// }
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