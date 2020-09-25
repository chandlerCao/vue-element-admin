// DATE 2020-09-22
// ANCHOR 曹德健
// CREATE_DATE 2020-09-22

<template>
	<div class="tabs">
		<div class="tabs-box">
			<div class="tabs-item" @click="$router.back()">
				<i class="el-icon-back"></i>
				返回
			</div>
			<router-link
				tag="div"
				:class="['tabs-item', {'active': curRouter.name === '首页'}]"
				to="/admin/home"
				v-contextmenu="homeContextmenuData"
			>
				<i class="el-icon-s-home"></i>
				首页
			</router-link>

			<router-link
				v-for="(tabItem, index) in tabList"
				:key="tabItem.name"
				tag="div"
				:to="tabItem.path"
				:class="['tabs-item', {'active': curRouter.name === tabItem.name}]"
				:data-index="index"
				:data-name="tabItem.name"
				:data-path="tabItem.path"
				v-contextmenu="contextmenuData"
			>
				<i :class="['tabs-icon', tabItem.icon]"></i>
				{{tabItem.name}}
				<div v-if="!tabItem.hideCloseIcon" class="tabs-close" @click.stop="closeTabItemHandle(index)">
					<i class="el-icon-close"></i>
				</div>
			</router-link>
		</div>
	</div>
</template>

<script>
export default {
	name: 'tabs',
	data() {
		return {
			curRouter: { name: '', index: 0 },
			tabList: [],
			// 右键菜单数据
			contextmenuData: [
				{
					text: '刷新',
					handler: el => {
						this.$router.replace({
							name: '刷新路由',
							query: {
								redirect: el.dataset.path
							}
						})
					}
				},
				{
					text: '关闭',
					handler: el => {
						this.closeTabItemHandle(parseInt(el.dataset.index))
					}
				},
				{
					text: '关闭其他',
					handler: el => {
						this.tabList = this.tabList.filter(
							tab => tab.name === el.dataset.name
						)

						this.$router.push(el.dataset.path)
					}
				},
				{
					text: '关闭左侧',
					handler: el => {
						const curIndex = parseInt(el.dataset.index)
						this.tabList = this.tabList.slice(
							curIndex,
							this.tabList.length
						)
						// 如果当前高亮的页签被关闭左侧时删除了
						if (this.curRouter.index < curIndex)
							this.$router.push(el.dataset.path)
					}
				},
				{
					text: '关闭右侧',
					handler: el => {
						const curIndex = parseInt(el.dataset.index)
						this.tabList = this.tabList.slice(0, curIndex + 1)
						// 如果当前高亮的页签被关闭右侧时删除了
						if (this.curRouter.index > curIndex)
							this.$router.push(el.dataset.path)
					}
				}
			],
			homeContextmenuData: [
				{
					text: '刷新',
					handler: () => {
						this.$router.replace({
							name: '刷新路由',
							query: {
								redirect: '/admin/home'
							}
						})
					}
				},
				{
					text: '关闭其他',
					handler: () => {
						this.tabList = []
						this.$router.push('/admin/home')
					}
				}
			]
		}
	},
	watch: {
		$route: {
			handler(route) {
				if (
					!this.tabList.some(item => item.name === route.name) &&
					route.name !== '首页' &&
					route.name !== '刷新路由'
				) {
					this.tabList.push({
						path: route.fullPath,
						name: route.name,
						icon: route.meta.icon
					})
				}
				this.curRouter.name = route.name
				this.curRouter.index = this.tabList.have(
					tab => tab.name === route.name
				)
			},
			immediate: true
		}
	},
	methods: {
		closeTabItemHandle(index) {
			// 如果删除的正好为高亮状态
			if (this.tabList.splice(index, 1)[0].name === this.curRouter.name)
				this.$router.push(
					this.tabList[index]
						? this.tabList[index].path
						: this.tabList[index - 1]
						? this.tabList[index - 1].path
						: '/admin/home'
				)
		}
	}
}
</script>

<style lang="less">
.tabs {
	padding-bottom: 7px;
	border-bottom: 1px solid #e4e7ed;
	overflow: auto;
}
.tabs-box {
	white-space: nowrap;
	.tabs-item {
		display: inline-block;
		position: relative;
		padding: 5px 10px;
		margin-right: 5px;
		border: 1px solid #e6edf6;
		font-size: 12px;
		background-color: #fff;
		color: #606266;
		cursor: pointer;
		&:hover,
		&.active {
			background-color: #429eff;
			color: #fff;
		}
		.tabs-close {
			display: inline-block;
			width: 0;
			height: 14px;
			line-height: 14px;
			border-radius: 50%;
			text-align: center;
			transition: 0.2s;
			transform: scaleX(0);
			&:hover {
				background-color: #fff;
				color: #303133;
			}
		}
		&:hover {
			.tabs-close {
				width: 14px;
				transform: scaleX(1);
			}
		}
		// &.active {
		// 	.tabs-icon {
		// 		display: inline-block;
		// 	}
		// }
	}
}
</style>