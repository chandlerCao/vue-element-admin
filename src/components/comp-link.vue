<template>
	<span class="comp-link" @click="$emit('click')">
		<slot></slot>
	</span>
</template>

<script>
export default {
	name: 'comp-link'
}
</script>

<style lang="less" scoped>
.comp-link {
	position: relative;
	font-size: 14px;
	color: #409eff;
	padding: 0 5px;
	cursor: pointer;
	&:after {
		content: '';
		position: absolute;
		width: 100%;
		height: 1px;
		background-color: #409eff;
		left: 0;
		bottom: -1px;
	}
}
</style>