<template>
	<div class="comp-upload-file">
		<el-button class="comp-upload-btn" icon="el-icon-upload" v-bind="$attrs" @click="agentUpload">上传</el-button>
		<ul class="file-list" v-if="fileList.length">
			<li v-for="(file, index) in fileList" :key="file" class="file-item">
				<i class="el-icon-document"></i>
				<span class="file-name">{{file}}</span>
				<i class="file-close el-icon-close" @click="deleteClose(index)"></i>
			</li>
		</ul>
		<input type="file" style="display: none;" @change="uploadImg" />
	</div>
</template>

<script>
export default {
	name: 'comp-upload-file',
	props: {
		reqMethod: {
			type: Function,
			default: async () => () => {}
		}
	},
	data() {
		return {
			fileList: []
		}
	},
	methods: {
		// 代理上传按钮
		agentUpload() {
			this.$el.childNodes[2].click()
		},
		// 文件上传
		uploadImg(e) {
			this.fileList = Array.from(e.target.files).map(file => file.name)
			this.$emit('file-change-handler', e.target.files)
		},
		// 删除文件
		deleteClose(index) {
			this.fileList.splice(index, 1)
			this.$emit('file-change-handler', null)
		}
	}
}
</script>

<style lang="less" scoped>
.comp-upload-btn {
	width: 100%;
}
.file-list {
	color: #909399;
	.file-item {
		display: flex;
		position: relative;
		align-items: center;
		cursor: pointer;
		&:hover {
			background-color: #f5f7fa;
			color: #409eff;
		}
	}
	.file-name {
		margin-left: 5px;
	}
	.file-close {
		margin-left: 10px;
	}
}
</style>