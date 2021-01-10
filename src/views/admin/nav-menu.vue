<!-- 导航菜单 -->
<template>
    <!-- :class="{ padding: !isCollapse }" -->
    <div id="nav-menu">
        <el-menu
            class="el-menu-vertical-demo"
            :default-active="$route.fullPath"
            :collapse="isCollapse"
            router
            background-color="#212528"
            text-color="#fff"
            active-text-color="#409eff"
            style="height: 100%"
        >
            <comp-navmenu
                v-for="item in routes"
                :key="item.name"
                :nav-data="item"
            ></comp-navmenu>
        </el-menu>
    </div>
</template>

<script>
import eventBus from '@/utils/event-bus'
import routes from '@/router/routes'
export default {
    name: 'nav-menu',
    data() {
        return {
            routes,
            isCollapse: false,
        }
    },
    created() {
        eventBus.$on('collapseHandle', (isCollapse) => {
            this.isCollapse = isCollapse
        })
    },
}
</script>

<style lang="less" scoped>
#nav-menu {
    position: relative;
    height: 100%;
    box-sizing: border-box;
    border-right: 1px solid #e6edf6;
    overflow: auto;
    transition: 0.15s;
    &.padding {
        padding: 10px 15px 0;
    }
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 210px;
}
</style>