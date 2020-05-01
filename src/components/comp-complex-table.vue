<template>
	<el-container class="comp-complex-table">
		<el-header v-if="$attrs['form-data']" style="height: auto;">
			<comp-form v-bind="$attrs['form-data']" @submit-form="submitForm"></comp-form>
			<el-divider></el-divider>
		</el-header>
		<el-main>
			<comp-table
				ref="compTable"
				v-bind="$attrs['table-data']"
				:requst-method="$attrs['requst-method']"
			></comp-table>
		</el-main>
	</el-container>
</template>

<script>
export default {
	name: 'compComplexTable',
	inheritAttrs: false,
	methods: {
		submitForm(formDataVal) {
			this.$refs.compTable.reloadTableHandle(Object.create(formDataVal))
		}
	}
}
</script>

<style lang="less">
</style>