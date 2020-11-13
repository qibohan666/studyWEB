(function(){
    'use strict';
    /**
     * async await是generator和promise的语法糖
     * async 返回的是一个promise对象
     * await相当于promise.then()
     * 
     * 1.promise的出现是为了解决回调地狱，但是多次链式调用也并不美观
     * 2.async await则是在promise链式写法的基础上再次优化
     * 
     */
    //有一个异步任务，100毫秒后输出datavalue
    let pro1=new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('pro1执行');
            resolve('time1')
        }, 4000);
    })
    let pro2=new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('pro2执行');
            resolve('time2')
            // reject('time2失败')
        }, 1000);
    })
    let pro3=new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('pro3执行');
            resolve('time3')
        }, 2000);
    })
    //有这么一个需求，p1执行完后处理p2再处理p3
    //promise处理
    // pro1.then(value=>{
    //     console.log('pro1:'+value);
    //     return pro2
    // }).then(value=>{
    //     console.log('pro2:'+value);
    //     return pro3
    // }).then(value=>{
    //     console.log('pro3:'+value);
    // }).catch(reason=>{
    //     throw reason
    // })

    //使用async await来处理
    /*
        await promise相当于promise.then()
        await会让promise任务完成后再去赋值
        await promise结果就是promise.then(value=>{})的value
    */
    async function fn(){
        try {
           let p1= await pro1;
           console.log('pro1:'+p1);
           let p2= await pro2;
           console.log('pro2:'+p2);
           let p3= await pro3;
           console.log('pro3:'+p3);
        } catch (error) {
            throw error
        }
       
    }
})();