<template>
    <div>
        <slot @contextmenu.prevent="showContextmenu"></slot>
        <ul class="comp-contextmenu">
            <li>刷新</li>
            <li>关闭</li>
            <li>关闭其他</li>
            <li>关闭右侧</li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'comp-contextmenu'
}
</script>

<style lang="less">
.comp-contextmenu {
    position: fixed;
    left: 0;
    top: 0;
    background-color: #fff;
    padding: 8px 0;
    border-radius: 8px;
    box-shadow: 0 2px 18px rgba(145, 171, 213, 0.5);
}
.comp-contextmenu li {
    font-size: 12px;
    line-height: 30px;
    color: #606266;
    cursor: pointer;
    padding: 0 20px;
    background-color: #fff;
}
.comp-contextmenu li:hover {
    background-color: #eee;
}
</style>