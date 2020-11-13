(function(){
    'use strict'
    let api=data=>new Promise((resolve, reject) => {
        resolve(data)
    })
    async function fn(){
        let data=await api(10);
        data=await api(data+10)
        console.log(data);//20
    }
    fn();
    // async/await是generator的语法糖，体现在async/await可以自动执行generator的next方法。
    function asyncFunc(generator){
        //先执行生成器函数，得到可迭代对象iterator
        let iterator=generator()
        //利用一个递归函数，执行iterator.next到结果的done为true
        const next=data=>{
            let {
                done,
                value
            }=iterator.next(data)
            if(done) return;
            //利用next函数传参,会赋值给上一个yield赋值的特点
            value.then(data=>{
                next(data)
            })
        }
        next();
    }
    asyncFunc(function* (){
        let data=yield api(10);
        data=yield api(data+10)
        console.log(data);//20
    })
})();