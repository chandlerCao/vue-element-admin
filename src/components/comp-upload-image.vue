<template>
	<div class="comp-upload-image" style="width: 100px; height: 100px">
		<el-image
			v-if="url"
			style="width: 100%; height: 100%;"
			:src="url"
			:fit="fit"
			:preview-src-list="srcList"
		></el-image>
		<div v-else class="upload-image" @click="agentUpload">
			<i class="el-icon-picture-outline"></i>
		</div>
		<input
			type="file"
			style="display: none;"
			accept="image/gif, image/jpeg, image/jpg, image/png"
			@change="uploadImg"
		/>
	</div>
</template>

<script>
export default {
	name: 'comp-upload-image',
	props: {
		reqMethod: {
			type: Function,
			default: async () => () => {}
		}
	},
	data() {
		return {
			id: Math.random(),
			url: ''
		}
	},
	methods: {
		agentUpload() {
			this.$el.childNodes[1].click()
		},
		uploadImg(e) {
			console.log(e.target.files)
		}
	}
}
</script>

<style lang="less">
.upload-image {
	display: flex;
	width: 100%;
	height: 100%;
	background-color: #f5f7fa;
	justify-content: center;
	align-items: center;
	font-size: 24px;
	color: #909399;
	cursor: pointer;
}
</style>