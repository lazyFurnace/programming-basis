Function.prototype.myCall = function (context) {
    var context = context || window;
    context.fn = this;
    var arg = [...arguments].splice(1);
    var result = context.fn(...arg);
    delete context.fn;
    return result;
}

// 数组降维
function flattenDeep(arr) {
    if (Array.isArray(arr)) {
        return arr.reduce((a, b) => {
            return [...a, ...flattenDeep(b)]
        }, [])
    } else {
        return [arr]
    }

}
