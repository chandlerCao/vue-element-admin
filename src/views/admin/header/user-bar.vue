<template>
    <div id="user-bar">
        <i class="el-icon-full-screen" id="full-screen-icon"></i>
        <el-dropdown trigger="click" @command="handleCommand">
            <span class="el-dropdown-link">
                <el-avatar size="medium" :src="avatarUrl"></el-avatar>
                <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="home">首页</el-dropdown-item>
                <el-dropdown-item command="github">项目地址</el-dropdown-item>
                <el-dropdown-item divided command="loginOut">退出登陆</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>

<script>
export default {
    name: 'user-bar',
    data() {
        return {
            avatarUrl: ''
        }
    },
    methods: {
        handleCommand(command) {
            switch (command) {
                case 'home':
                    this.$router.push({ name: '首页' })
                    break
                case 'github':
                    window.open('https://www.baidu.com')
                    break
                case 'loginOut':
                    this.$router.push('/login')
            }
        }
    }
}
</script>

<style lang="less">
#user-bar {
    display: flex;
    float: right;
    align-items: center;
    margin-right: 20px;
}
#full-screen-icon {
    font-size: 25px;
    padding-right: 15px;
}
</style>