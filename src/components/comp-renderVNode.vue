<script>
import Vue from 'vue'
export default {
    props: {
        attrs: {
            type: Object,
            default() {
                return {}
            },
        },
        el: {
            type: Object,
            default() {
                return Vue.component('div')
            },
        },
    },
    render(h) {
        return h(this.el)
    },
}
</script>