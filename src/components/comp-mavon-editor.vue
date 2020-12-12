<template>
    <div class="comp-mavon-editor">
        <mavon-editor
            ref="mavonEditor"
            :value="contentInfo.markdownTxt"
            @imgAdd="articleImgUpload"
            @change="articleCntSave"
            ishljs
            :autofocus="false"
        ></mavon-editor>
    </div>
</template>

<script>
export default {
    name: 'comp-mavon-editor',
    model: {
        prop: 'contentInfo',
        event: 'change',
    },
    props: {
        contentInfo: {
            type: Object,
            default: () => {
                return { markdownTxt: '', content: '' }
            },
        },
    },
    data() {
        return {
            markdownTxt: '',
            content: '',
        }
    },
    watch: {
        markdownTxt(markdownTxt) {
            this.$emit('change', {
                markdownTxt,
                content: this.content,
            })
        },
    },
    methods: {
        // 文章上传图片
        async articleImgUpload(pos, $file) {
            var formdata = new FormData()
            formdata.append('image', $file)
            const { url } = await this.$req(
                this.$api.article.uploadImg,
                formdata
            )
            this.$refs.mavonEditor.$img2Url(pos, url)
        },
        // 文章内容保存
        articleCntSave(markdownTxt, articleCnt) {
            this.markdownTxt = markdownTxt
            this.content = articleCnt
        },
    },
}
</script>

<style lang="less">
</style>