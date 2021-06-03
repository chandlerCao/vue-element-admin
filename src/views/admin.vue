<template>
    <el-container>
        <el-aside width="auto">
            <nav-menu></nav-menu>
        </el-aside>
        <el-container>
            <el-header
                id="comp-header"
                class="comp-shadow"
                style="height: 50px"
            >
                <div id="header-content">
                    <div class="nav-menu-fold" @click="collapseHandle">
                        <i v-show="isCollapse" class="el-icon-s-unfold"></i>
                        <i v-show="!isCollapse" class="el-icon-s-fold"></i>
                    </div>
                    <breadcrumb style="margin-left: 15px"></breadcrumb>
                </div>
                <user-bar></user-bar>
            </el-header>
            <el-main id="admin-main">
                <el-container>
                    <el-header style="height: auto; padding: 10px 15px 0">
                        <tabs></tabs>
                    </el-header>
                    <el-main style="padding: 10px 0 0 15px">
                        <transition name="slide-fade">
                            <router-view></router-view>
                        </transition>
                    </el-main>
                </el-container>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import eventBus from '@/utils/event-bus'
import navMenu from '@/views/admin/nav-menu'
import breadcrumb from '@/views/admin/header/breadcrumb'
import userBar from '@/views/admin/header/user-bar'
import tabs from '@/views/admin/tabs'

export default {
    name: 'app',
    components: {
        userBar,
        navMenu,
        breadcrumb,
        tabs,
    },
    data() {
        return {
            isCollapse: false,
        }
    },
    methods: {
        collapseHandle() {
            this.isCollapse = !this.isCollapse
            eventBus.$emit('collapseHandle', this.isCollapse)
        },
    },
}
</script>

<style lang="less" scoped>
#comp-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 0;
}
// .el-main {
// 	background-color: #eee;
// }
.nav-menu-fold {
    width: 50px;
    height: 50px;
    text-align: center;
    line-height: 50px;
    font-size: 20px;
    color: #303133;
    cursor: pointer;
    background-color: #fff;
    transition: 0.3s;
    &:hover {
        background-color: #f2f6fc;
    }
}
#header-content {
    display: flex;
    align-items: center;
}
</style>