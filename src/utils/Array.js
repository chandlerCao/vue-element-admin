Array.prototype.have = function (fn) {
    if (Object.prototype.toString.call(fn) !== '[object Function]') {
        throw '请传递一个函数'
    }
    for (let i = 0; i < this.length; i++) {
        if (fn(this[i], i)) return i
    }
    return -1
}