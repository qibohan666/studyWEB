(function(){
    'use strict'
    function draw(boolean,callback){
        console.log(boolean);
        callback();
    }
    let p=new Promise((resolve, reject) => {
        resolve(100)
    })
    
    async function fn(){
        let a=await p;
        console.log(a);
        draw(true,function(){
            console.log('callback执行');
        })
    }
    fn();
    //执行结果data=20

    //async/await是generator的语法糖，体现在async/await能够自动的执行generator的next方法
    function asyncFunc(gen){

    }


})();