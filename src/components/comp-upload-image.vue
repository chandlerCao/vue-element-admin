<template>
	<div class="comp-upload-image">
		<div class="comp-upload-wrapper" @click="agentUpload">
			<i
				v-show="imgUrl"
				class="comp-image-close el-icon-circle-close"
				title="删除图片"
				@click.stop="clearImage"
			></i>
			<el-image :src="imgUrl" fit="cover" style="width: 300px; height: 200px;">
				<div slot="error" class="image-slot">
					<i :class="[uploadComplete ? 'el-icon-picture-outline' : 'el-icon-loading']"></i>
				</div>
			</el-image>
		</div>
		<input
			v-if="inputFile"
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
	model: {
		prop: 'url',
		event: 'upload'
	},
	props: {
		url: String,
		uploadImgReq: {
			type: Function,
			default: async () => () => {}
		}
	},
	data() {
		return {
			uploadComplete: true,
			inputFile: true,
			imgUrl: ''
		}
	},
	watch: {
		url(url) {
			this.imgUrl = url
		},
		imgUrl(imgUrl) {
			this.$emit('upload', imgUrl)
		}
	},
	methods: {
		agentUpload() {
			this.$el.childNodes[1].click()
		},
		// 删除图片
		clearImage() {
			this.inputFile = false
			this.imgUrl = ''
			setTimeout(() => {
				this.inputFile = true
			}, 0)
		},
		async uploadImg(e) {
			if (!this.uploadComplete || e.target.files.length === 0)
				return false
			this.imgUrl = ''
			this.uploadComplete = false
			const formData = new FormData()
			formData.append('image', e.target.files[0])
			const { url } = await this.uploadImgReq(formData)
			this.imgUrl = url
			this.uploadComplete = true
		}
	}
}
</script>

<style lang="less">
.comp-upload-image {
	width: 100%;
}
.comp-upload-wrapper {
	display: inline-block;
	position: relative;
	.comp-image-close {
		position: absolute;
		font-size: 20px;
		right: -20px;
		top: -20px;
		cursor: pointer;
		transition: 0.15s;
		&:hover {
			transform: rotate(360deg);
		}
	}
}
.image-slot {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
	background: #f5f7fa;
	color: #909399;
	font-size: 30px;
	cursor: pointer;
}
</style>