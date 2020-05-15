<template>
	<comp-modal :visible.sync="modalVisible" :loading="loading" @ok="modalOk">
		<span slot="title">{{$attrs.title}}</span>
		<comp-form
			ref="compForm"
			:style="{width: $attrs.width}"
			v-bind="$attrs.form"
			:is-hide-submit="true"
			@submit-form-handler="submitAddFormHandler"
		></comp-form>
	</comp-modal>
</template>

<script>
export default {
	name: 'comp-modal-form',
	props: {
		visible: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			loading: false,
			modalVisible: this.visible
		}
	},
	watch: {
		visible(visible) {
			this.modalVisible = visible
		},
		modalVisible(modalVisible) {
			this.$emit('update:visible', modalVisible)
		}
	},
	methods: {
		modalOk() {
			this.$refs.compForm.submitForm()
		},
		// 新增表单提交回调
		async submitAddFormHandler(formDataVal) {
			// loading
			this.loading = true
			// 请求新增接口
			await this.$attrs.form.addFormReq({
				id: '5bf57a8f85e0f13af26e579b',
				type: 1,
				...formDataVal
			})
			// loading消失
			this.loading = false
			// 弹框消失
			this.$emit('update:visible', false)
			this.$emit('submit-form-handler')
		}
	}
}
</script>

<style lang="less">
</style>