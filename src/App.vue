<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    name: 'app',
    created() {
        // 获取所有标签
        this.getTagList()
    },
    methods: {
        ...mapActions({
            getTagList: 'tag/getTagList',
        }),
    },
}
</script>

<style lang="less" scoped>
#app {
    height: 100%;
}
</style>