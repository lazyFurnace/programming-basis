Function.prototype.myBind = function (context) {
    var that = this;
    var arg1 = Array.prototype.slice.call(arguments, 1);
    return function bind() {
        var arg2 = Array.prototype.slice.call(arguments);

        if (this instanceof bind) {
            return new that(...arg1, ...arg2);
        }

        return that.apply(context, arg1.concat(arg2));
    }
}

// test

var a = {
    value: 1
}
function getValue(name, age) {
    this.name = name;
    this.age = age;
    console.log(this.value);
}

var b = getValue.myBind(a, 'liqi', 18);

var c = new b();