<template>
	<li class="compNavMenu">
		<component
			v-for="item in navData"
			:key="item.name"
			:is="item.children && item.children.length ? 'el-submenu' : 'el-menu-item'"
			:index="`${prevPath}/${item.path}`"
		>
			<template slot="title">
				<i v-if="item.meta && item.meta.icon" :class="item.meta.icon"></i>
				<span slot="title">{{item.name}}</span>
			</template>
			<template v-if="item.children && item.children.length">
				<comp-navmenu :nav-data="item.children" :prev-path="`${prevPath}/${item.path}`"></comp-navmenu>
			</template>
		</component>
	</li>
</template>

<script>
export default {
	name: 'compNavMenu',
	props: {
		prevPath: {
			type: String,
			default: '/admin'
		},
		navData: {
			type: Array,
			default: () => []
		}
	}
}
</script>

<style lang="less">
</style>