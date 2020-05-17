import Vue from 'vue'
export default Vue.component('comp', {
    render: function (createElement) {
        return createElement(
            'div',   // 标签名称
            [this.tableSlot]
        )
    },
    props: {
        tableSlot: {
            type: Object,
            required: true
        }
    }
})