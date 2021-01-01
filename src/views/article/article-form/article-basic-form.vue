<template>
    <div id="article-form" class="comp-container">
        <comp-form
            v-bind="articleFormData"
            @submit-form-handler="articleSubmit"
        >
        </comp-form>
    </div>
</template>

<script>
export default {
    name: 'article-add',
    props: {
        articleData: {
            type: Object,
            default() {
                return {}
            },
        },
    },
    data() {
        return {
            articleFormData: {
                formData: {
                    title: {
                        label: '标题',
                        attrs: {
                            maxlength: 24,
                        },
                        rule: [
                            {
                                required: true,
                                message: '请输入标题',
                                trigger: 'submit',
                            },
                        ],
                    },
                    preface: {
                        label: '前言',
                        rule: [
                            {
                                required: true,
                                message: '请输入前言',
                                trigger: 'submit',
                            },
                        ],
                        attrs: {
                            type: 'textarea',
                            rows: '3',
                            maxlength: 255,
                        },
                    },
                    cover: {
                        label: '封面',
                        el: 'comp-upload-image',
                        rule: [
                            {
                                required: true,
                                message: '请上传封面',
                                trigger: 'submit',
                            },
                        ],
                        attrs: {
                            uploadImgReq: async (formData) => {
                                return this.$req(
                                    this.$api.article.uploadImg,
                                    formData
                                )
                            },
                        },
                    },
                    tag_id: {
                        label: '标签',
                        el: 'el-select',
                        rule: [
                            {
                                required: true,
                                message: '请选择标签',
                                trigger: 'submit',
                            },
                        ],
                        options: this.$store.getters['tag/newTagList'],
                    },
                    state: {
                        label: '是否上线',
                        el: 'el-switch',
                        attrs: {
                            activeValue: 1,
                            inactiveValue: 0,
                        },
                    },
                    contentInfo: {
                        label: '文章内容',
                        el: 'comp-mavon-editor',
                        rule: [
                            {
                                validator: (rule, value, callback) => {
                                    if (
                                        !value ||
                                        value.markdownTxt.trim() === ''
                                    ) {
                                        return callback(
                                            new Error('请填写文章内容')
                                        )
                                    }
                                    return callback()
                                },
                                trigger: 'submit',
                            },
                        ],
                        attrs: {
                            ishljs: true,
                            autofocus: false,
                        },
                    },
                },
                submitBtn: {
                    name: this.$attrs['submit-btn'] || '发布文章',
                },
                resetBtn: {},
                formAttrs: {
                    labelPosition: 'top',
                },
            },
        }
    },
    watch: {
        articleData(articleData) {
            // 初始化文章字段值
            this.setArticleDefaultVal(articleData)
        },
    },
    methods: {
        // 初始化文章表单
        setArticleDefaultVal(articleData) {
            for (const formName in this.articleFormData.formData) {
                this.$set(
                    this.articleFormData.formData[formName],
                    'defaultValue',
                    articleData[formName]
                )
            }
        },
        // 发布文章
        articleSubmit(articleData) {
            articleData.markdownTxt = articleData.contentInfo.markdownTxt
            articleData.content = articleData.contentInfo.content
            delete articleData.contentInfo
            this.$emit('submit', articleData)
        },
    },
}
</script>