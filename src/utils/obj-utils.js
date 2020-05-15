export default {
    assign(obj1 = {}, obj2 = {}) {
        const obj = {}
        Array.from(new Set(Object.keys(obj1).concat(Object.keys(obj2)))).forEach(key => {
            if (toString(obj1[key]) !== toString(obj2[key])) obj[key] = obj2[key] || obj1[key]
            else switch (toString(obj2[key])) {
                case '[object Object]':
                    obj[key] = this.assign(obj1[key], obj2[key])
                    break;
                case '[object Array]':
                    obj[key] = obj2[key].concat(obj1[key])
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