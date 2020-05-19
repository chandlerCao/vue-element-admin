<template>
	<comp-form v-bind="formData"></comp-form>
</template>

<script>
export default {
	data() {
		return {
			formData: {
				formData: {
					name: {
						label: '姓名'
					},
					age: {
						label: '年龄'
					},
					file: {
						label: '文件',
						el: 'comp-upload-file',
						attrs: {
							type: 'primary'
						}
					}
				},
				elAttrs: {
					// size: 'mini'
				},
				formAttrs: {
					labelWidth: '60px'
				},
				// hideReset: true,
				submitBtn: {
					// name: '提交',
					attrs: {
						type: 'primary',
						icon: 'el-icon-user'
					}
				}
			}
		}
	}
}
</script>

<style lang="less">
</style>