export default {
    assign(obj1 = {}, obj2 = {}) {
        const obj = {}
        Array.from(new Set(Object.keys(obj1).concat(Object.keys(obj2)))).forEach(key => {
            switch (Object.prototype.toString.call(obj2[key])) {
                case '[object Object]':
                    obj[key] = this.assign(obj1[key], obj2[key])
                    break;
                case '[object Array]':
                    obj[key] = obj2[key].concat(obj1[key])
                    break;
                case '[object Function]':
                    obj[key] = function () { obj1[key](...arguments); obj2[key](...arguments) }
                    break;
                default:
                    obj[key] = obj2[key] || obj1[key]
            }
        })
        return obj
    },
    childObj(obj = {}, keys = []) {
        return keys.reduce((prevObj, key) => {
            prevObj[key] = obj[key]
            return prevObj
        }, {})
    }
}