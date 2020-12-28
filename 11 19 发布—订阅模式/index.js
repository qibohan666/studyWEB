/**
 * 发布/订阅模式和观察者模式很相似，区别在于：在目标和观察者中间增加了一个调度中心。
 * 订阅者（观察者）把自己想订阅的事件注册到调度中心，当该事件触发时候，发布者（目标）发布该事件到调度中心，
 * 由调度中心统一调度订阅者注册到调度中心的处理代码。
 * 
 * 
 *                             _______________
 *       订阅者a----订阅-----> |               |
 *                            |   调度中心     | <----发布----发布者
 *       订阅者b----订阅-----> |_______________|
 * 
 * 
 */
function Public(){
    this.handlers={}
}
Public.prototype={
    constructor:Public,
    //订阅
    on(eventType,handler){
        var self=this
        //如果handlers中没有这个类型的事件，则添加一个
        if(!(eventType in self.handlers)){
            self.handlers[eventType]=[]
        }
        self.handlers[eventType].push(handler)
        return self
    },
    //发布
    emit(eventType,...arg){
        let self=this
        let length=self.handlers[eventType].length
        for(let i=0;i<length;i++){
            self.handlers[eventType][i].apply(self, [...arg]);
        }
        return self
    },
    //取消订阅
    off(eventType,handler){
        let self=this
        let currentEvent=self.handlers[eventType]
        if(currentEvent){
            for(let i=0;i<currentEvent.length;i++){
                if(currentEvent[i]===handler){
                    currentEvent.splice(i,1)
                }
            }
        }
        return self
    }
}

//订阅者
function observerA(info){
    console.log('observerA的订阅信息:',info);
}

function observerB(info){
    console.log('observerB的订阅信息:',info);
}
let public=new Public;
//订阅者订阅
public.on('午饭',observerA)
public.on('午饭',observerB)

public.on('晚饭',observerA)

public.on('早饭',observerB)

//发布
public.emit('午饭','中午吃奥力给')

public.emit('晚饭','🐀尾汁')

public.emit('早饭','老八蜜汁小🍔')