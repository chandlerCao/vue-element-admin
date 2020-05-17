<template>
    <div v-if="visible" class="comp-modal">
        <div class="comp-modal__mask"></div>
        <div class="comp-modal__wrap">
            <div class="comp-modal__content">
                <a class="comp-modal-close" @click="cancel">
                    <i class="el-icon-close"></i>
                </a>
                <div class="comp-modal-header">
                    <div class="comp-modal-header-inner">
                        <slot name="title">标题</slot>
                    </div>
                </div>
                <div class="comp-modal-body">
                    <slot></slot>
                </div>
                <div class="comp-modal-footer">
                    <el-button
                        type="primary"
                        icon="el-icon-position"
                        :loading="loading"
                        @click="$emit('ok')"
                    >提交</el-button>
                    <el-button @click="cancel">取消</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'compModal',
    inheritAttrs: false,
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        loading: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        cancel() {
            this.$emit('update:visible', false)
        }
    }
}
</script>

<style lang="less" scoped>
.comp-modal {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 2;
}
.comp-modal__mask {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(55, 55, 55, 0.6);
}
.comp-modal__wrap {
    position: relative;
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
    z-index: 1201;
}
.comp-modal__content {
    display: flex;
    position: relative;
    max-width: 80%;
    max-height: 80%;
    flex-direction: column;
    background-color: #fff;
    border-radius: 6px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    // 关闭
    .comp-modal-close {
        position: absolute;
        font-size: 12px;
        z-index: 1;
        right: 10px;
        top: 10px;
        overflow: hidden;
        cursor: pointer;
        .el-icon-close {
            font-size: 18px;
            color: #999;
            transition: color 0.2s ease;
            position: relative;
            top: 1px;
            &:hover {
                color: #444;
            }
        }
    }
    // header
    .comp-modal-header {
        flex-shrink: 0;
        padding: 14px 16px;
        line-height: 1;
    }
    // body
    .comp-modal-body {
        flex: 1;
        padding: 16px;
        overflow: auto;
    }
    // footer
    .comp-modal-footer {
        flex-shrink: 0;
        padding: 12px 18px;
        text-align: right;
    }
}
// 关闭
</style>