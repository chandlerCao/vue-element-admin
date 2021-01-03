import Vue from 'vue'
export default {
    assign(obj1 = {}, obj2 = {}) {
        if (typeof obj2 !== 'object') return Object.assign(obj2, {})
        const obj = {}
        Array.from(new Set(Object.keys(obj1).concat(Object.keys(obj2)))).forEach(key => {
            if (toString(obj1[key]) !== toString(obj2[key])) obj[key] = obj2[key] || obj1[key]
            // 如果为Vue组件
            else if (obj2[key] instanceof new Vue().$createElement().constructor) {
                obj[key] = obj2[key] || obj1[key]
            }
            else switch (toString(obj2[key])) {
                case '[object Object]':
                    obj[key] = this.assign(obj1[key], obj2[key])
                    break;
                case '[object Array]':
                    obj[key] = []
                    for (let i = 0; i < obj2[key].length; i++) {
                        obj[key].push(this.assign(obj1[key][i], obj2[key][i]))
                    }
                    break;
                case '[object Function]':
                    obj[key] = function () { obj1[key] && obj1[key].call(obj, ...arguments); obj2[key].call(obj, ...arguments) }
                    break;
                default:
                    obj[key] = obj2[key] || obj1[key]
            }
        })
        return obj
        function toString(obj) {
            return Object.prototype.toString.call(obj)
        }
    }
}