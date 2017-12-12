//双向数据绑定

function Observer(obj){
    //这里不能用var,let有块级作用域,用var只能访问最后一个属性
    for(let k in obj){
        //避免访问原型上属性
        if(obj.hasOwnProperty(k)) {
            let v = obj[k];
            Object.defineProperty(obj, k, {
                configurable: true,
                enumerable: true,
                get: function () {
                    console.log('你访问了' + k);
                    return v;
                },
                set: function (newValue) {
                    //设置属性的新值，这里很关键,为什么一个取到的value能够被改变，从而影响原来对象
                    //v仅仅是前面保存的obj[k]而已,为啥不用obj[k] = newValue

                    //原因：闭包特性，v一直存在于内存中，没有销毁
                    //之后所有的get，set都是针对v这个在内存中的变量来操作的
                    v = newValue;
                    console.log('你设置了' + k + ', 新的值为' + newValue);
                }
            })
        }
    }
    this.data = obj;
}

var o = new Observer({
    a:"1",
    b:'sbw'
});
console.log(o.data.a);
o.data.a = 2;
o.data.b='lqy'
console.log(o.data);

