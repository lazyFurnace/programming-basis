// 未整理
function Promise(executor) {
    const _ = this;
    _.state = 'pending';
    _.value = null;
    _.callbacksResolve = [];
    _.callbacksReject = [];

    function resolve(value) {
        _.state = 'resolve';
        _.value = value;
        _.callbacksResolve.forEach(fn => fn(_.value))
    }

    function reject(value) {
        _.state = 'reject';
        _.value = value;
        _.callbacksReject.forEach(fn => fn(_.value))
    }

    try {
        executor(resolve, reject);
    } catch (e) {
        reject(e);
    }

}

Promise.prototype.then = function (onFulfilled, onRejected) {
    const _ = this;
    let newPromise;
    if (_.state === 'pending') {
        newPromise = new Promise((resolve, reject) => {
            _.callbacksResolve.push(() => {
                setTimeout(() => {
                    try {
                        const x = onFulfilled(_.value);
                        resolvePromise(newPromise, x, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                }, 0)
            });
            _.callbacksReject.push(() => {
                setTimeout(() => {
                    try {
                        const x = onRejected(_.value);
                        resolvePromise(newPromise, x, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                }, 0)
            });
        })
    } else if (_.state === 'resolve') {
        newPromise = new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    const x = onFulfilled(_.value);
                    resolvePromise(newPromise, x, resolve, reject);
                } catch (e) {
                    reject(e);
                }
            }, 0)
        })
    } else if (_.state === 'reject') {
        newPromise = new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    const x = onRejected(_.value);
                    resolvePromise(newPromise, x, resolve, reject);
                } catch (e) {
                    reject(e)
                }
            })
        })
    } else {
        throw Error('Promise 状态未知');
    }

    return newPromise;
}


function resolvePromise(newPromise, x, resolve, reject) {
    //判断x和promise2之间的关系
    //因为promise2是上一个promise.then后的返回结果，所以如果相同，会导致下面的.then会是同一个promise2，一直都是，没有尽头
    if (x === newPromise) {
        //相当于promise.then之后return了自己，因为then会等待return后的promise，导致自己等待自己，一直处于等待
        return reject(new TypeError('循环引用'))
    }
    //如果x不是null，是对象或者方法
    if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
        //为了判断resolve过的就不用再reject了，（比如有reject和resolve的时候）
        let called;
        try {
            //防止then出现异常，Object.defineProperty
            //取x的then方法可能会取到{then:{}},并没有执行
            let then = x.then;
            if (typeof then === 'function') {
                //我们就认为他是promise,call他,因为then方法中的this来自自己的promise对象
                then.call(x, y => {
                    //第一个参数是将x这个promise方法作为this指向，后两个参数分别为成功失败回调
                    if (called) return;
                    called = true;
                    //因为可能promise中还有promise，所以需要递归
                    resolvePromise(newPromise, y, resolve, reject);
                }, err => {
                    if (called) return;
                    called = true;
                    //一次错误就直接返回
                    reject(err);
                })
            } else {
                //如果是个普通对象就直接返回resolve作为结果
                resolve(x)
            }
        } catch (e) {
            if (called) return;
            called = true;
            reject(e);
        }
    } else {
        //这里返回的是非函数，非对象的值,就直接放在promise2的resolve中作为结果
        resolve(x)
    }
}