(function(){
    /**
     * 节流的就是让函数在一定时间段内只执行一次，减少函数执行的频率，从而提高前端性能。
     * 比如频繁的点击按钮触发click事件，我们认为需要有个间隔时间，在这个时间段内只触发一次点击事件
     * 节流函数的实现有两种
     *  1.时间戳实现
     *  2.计时器实现
     *  应用场景：滚动，移动
     */
    //1.时间戳实现节流函数  特点：间隔时间一开始就会执行函数
    console.log(+new Date==Date.now());
    function throttle1(fn,delay){
        let last=0
        return function(){
            let _this=this,arg=arguments;
            let now=Date.now()
            if(now-last>delay){
                fn.apply(_this, arg);
            }
            last=now
        }
        
    }
    //2.定时器实现节流函数 特点：间隔时间结束才会执行函数
    function throttle2(fn,delay){
        let timer;
        return function(){
            let _this=this,arg=arguments;
            if(!timer){
                timer=setTimeout(() => {
                    fn.apply(_this,arg)
                    timer=null
                }, delay);
            }    
        }
    }
    //3.两者结合实现的节流函数
    function throttle(fn,delay,type){
        if(type==1){
            //时间戳版
            var last=0;
        }else if(type==2){
            var timer;
        }
        return function(){
            let _this=this,arg=arguments;
            if(type==1){
                let now=Date.now()
                if(now-last>delay){
                    fn.apply(_this, arg);
                }
                last=now
            }else if(type==2){
                if(!timer){
                    timer=setTimeout(() => {
                        fn.apply(_this,arg)
                        timer=null
                    }, delay);
                }  
            }
        }
    }
    //例子1 按钮节流处理
    let btn=document.getElementsByClassName('btn')[0]
    function func(e){
        console.log(e);
        console.log('btn');

    }
    btn.addEventListener('click',throttle(func,500,2))
})();