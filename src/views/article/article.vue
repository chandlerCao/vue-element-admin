<template>
    <router-view></router-view>
</template>

<script>
export default {
    name: 'article-management',
    created() {
        // 获取所有标签
        this.$store.dispatch('tag/getTagList')
    },
}
</script>

<style lang="less">
</style>