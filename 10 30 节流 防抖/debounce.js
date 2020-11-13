(function(){
    /**
     *  1.防抖：就是减少频繁请求，当事件被触发后，延迟n秒后再执行回调，如果在这n秒内事件又被触发，则重新计时 
     *  防抖(debounce)就是把多个顺序的调用合并到一起(只执行一次),这在某些情况下对性能会有极大的优化
     *  个人理解：防抖技术用于进行那种有了累计关系的
     *           比如：输入框的自动补全功能：当用户输入一个内容给用户进行提示
     *                1.用户想要搜索的是最后那个完整的内容，而不是输入的每一个字
     *                2.我们需要捕获的是用户不再打字时的内容，对于之前打用户打的每一个字并不需要捕获。
     *                3.用户输入完整内容需要时间，我们可以设置一个等待时间delay。
     *                4.如果用户打字后，过了delay时间还没有打字，我们就认为此时的内容就是用户想要搜索的内容，通过fn进行捕获操作。
     *                  如果用户在delay时间段内又重新打字，我们认为用户还在输入完整内容中，此时重新计时。
     *  应用场景：输入框自动补全，窗口变动自适应                
     */
    //1.简单实现(非立即执行版)
    function debounce1(fn,delay){
        let timer=null;
        return function(){
                let _this=this,arg=arguments;
                clearTimeout(timer)
                timer=setTimeout(()=>{
                    fn.apply(_this, arg);
                },delay)
            }
            
    }
    //2.简单实现(立即执行版)
    //setTimeout会返回一个定时器id是正整数，只有！0==true,其他都是false
    function debounce2(fn,delay){
        let timer=null;
        return function(){
            let _this=this,arg=arguments;
            if(timer) clearTimeout(timer)
            let callNow=!timer
            timer=setTimeout(()=>{
                timer=null  //重点
            },delay)
            if(callNow) fn.apply(_this, arg);
            
        }
    }
    //3.结合版，我们可以添加一个参数immediate true 表立即执行，false 表示非立即执行
    function debounce(fn,delay,immediate){
        let timer=null
        return function(){
            let _this=this,arg=arguments;
            if(timer) clearTimeout(timer)
            if(immediate){
                //需要先立即执行
                let callNow=!timer
                timer=setTimeout(() => {
                    timer=null
                }, delay);
                if(callNow) fn.apply(_this,arg)
            }else{
                //延时后执行
                timer=setTimeout(() => {
                    fn.apply(_this,arg)
                }, delay);
            }
        }
    }
    
    //例子1：输入框搜索提示,简易防抖
    let inp=document.getElementsByName('myInput')[0]

    function reValue(e){
        let v=inp.value
        console.log(v);
    }
    
    inp.addEventListener('input',debounce(reValue,500,true))
})();