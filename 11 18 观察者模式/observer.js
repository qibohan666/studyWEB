/**
 * 观察者模式：
 *  一个目标物件管理所有相依于它的观察者物件，是一对多的依赖关系，在它本身的状态改变时主动发出通知，观察者收到通知从而使他们的状态自动发生变化。
 * 目标和观察者是基类，目标提供维护观察者的一系列方法，观察者提供更新接口。
 * 具体观察者和具体目标继承各自的基类，然后具体观察者把自己注册到具体目标里，在具体目标发生变化时候，调度观察者的更新方法。
 * 
 * 
 *        目标 ---------继承--------->具体目标
 *                                   |     ^
 *                                   |     |
 *                     目标发生变化   |     |
 *                     调度观察者     |     |   注册到目标
 *                                   |     |
 *                                   |     |
 *                                   |     |
 *                                   V     |
 *        观察者---------继承-------->具体观察者
 * 
 * 缺点：目标的通知会发送给所有观察者，不管观察者是否需要此信息。
 */
//目标
function Subject(){
    //观察者列表
    this.subjectlist=[]
}
//原型重定向
Subject.prototype={
    constructor:Subject,
    //注册
    add(fn){
        this.subjectlist.push(fn)
    },
    //通知
    notify(content){
        let ary=this.subjectlist
        for (let i = 0; i < ary.length; i++) {
           ary[i].update(content)
            
        }
    },
    //取消注册
    remove(fn){
        this.subjectlist.splice(this.subjectlist.indexOf(fn),1)
    }
}

//观察者A
function ObserverA(){
    this.update=function(content){
        console.log('observerA数据更新：',content);
    }
}

//观察者B
function ObserverB(){
    this.update=function(content){
        console.log('observerB数据更新：',content);
    }
}

//实例化目标和观察者
let subject=new Subject;
let oa=new ObserverA;
let ob=new ObserverB;
//添加至观察者列表
subject.add(oa)
subject.add(ob)
//通知
subject.notify('重要通知')