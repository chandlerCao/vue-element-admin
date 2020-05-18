<!-- tab标签页 -->
<template>
	<div class="tabs">
		<div class="tabs-box">
			<div
				v-for="(item, index) in tabsList"
				class="tabs-item"
				:class="{'active': curRouterName === item.name}"
				:key="item.name"
				@click="$router.push(item.path)"
			>
				{{item.name}}
				<div v-if="!item.hideCloseIcon" class="tabs-close" @click.stop="closeTabItemHandle(index)">
					<i class="el-icon-close"></i>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'tabs',
	data() {
		return {
			tabsList: [
				{
					path: '/admin/home',
					name: '首页',
					hideCloseIcon: true
				}
			]
		}
	},
	computed: {
		curRouterName() {
			return this.$route.name
		}
	},
	watch: {
		$route: {
			handler(route) {
				if (!this.tabsList.some(item => item.name === route.name)) {
					this.tabsList.push({
						path: route.fullPath,
						name: route.name
					})
				}
			},
			immediate: true
		}
	},
	methods: {
		closeTabItemHandle(index) {
			// 如果删除的正好为高亮状态
			if (this.tabsList.splice(index, 1)[0].name === this.curRouterName)
				this.$router.push(
					this.tabsList[index]
						? this.tabsList[index].path
						: this.tabsList[index - 1].path
				)
		}
	}
}
</script>

<style lang="less">
.tabs {
	padding-bottom: 5px;
	border-bottom: 1px solid #e4e7ed;
}
.tabs-box {
	display: inline-flex;
	.tabs-item {
		position: relative;
		padding: 5px 10px;
		margin-right: 5px;
		border: 1px solid #e6edf6;
		background-color: #fff;
		font-size: 12px;
		color: #666;
		cursor: pointer;
		&:hover,
		&.active {
			background-image: linear-gradient(#1585fe, #00a2ff);
			color: #fff;
		}
		.tabs-close {
			display: none;
			width: 14px;
			height: 14px;
			line-height: 14px;
			text-align: center;
			border-radius: 50%;
			&:hover {
				background-color: #fff;
				color: #303133;
			}
		}
		&:hover {
			.tabs-close {
				display: inline-block;
			}
		}
		&.active {
			padding-left: 20px;
			&:before {
				content: '';
				position: absolute;
				width: 6px;
				height: 6px;
				border-radius: 50%;
				background-color: #fff;
				left: 9px;
				top: 10px;
			}
		}
	}
}
</style>