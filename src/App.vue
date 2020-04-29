<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>

<script>
export default {
	name: 'app'
}
</script>

<style lang="less" scoped>
#app {
	display: flex;
	height: 100%;
	overflow: hidden;
}
</style>