<!-- 导航菜单 -->
<template>
    <!-- :class="{ padding: !isCollapse }" -->
    <div id="nav-menu">
        <h1 id="logo">曹德健的Blog</h1>
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
#logo {
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    background-color: rgb(33, 37, 40);
    color: #409eff;
    border-bottom: 1px solid #dcdfe6;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}
#nav-menu {
    position: relative;
    height: 100%;
    box-sizing: border-box;
    border-right: 1px solid #e6edf6;
    overflow: hidden;
    transition: 0.15s;
    &.padding {
        padding: 10px 15px 0;
    }
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 210px;
}
</style>