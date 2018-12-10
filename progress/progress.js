(function(global,fn){
    // if(module && module.exports) {
    //     module.exports = fn()
    // }else
        global.NProgress = fn()
})(this,function(){
    let NProgress = {};
    let timeoutListeners = [];
    NProgress.version = '0.1.0';
    var setting = NProgress.setting = {
        color: 'blue',
        minimum: 0.08,
        ease: 'ease',
        speed: 700,
        incrementAmount: 4,  //增加幅度
        trickle: true,
        trickleSpeed: 200,
        showSpinner: true,
        parent: 'body',
        template: '<div role="progress"></div>'
    }
    NProgress.config = function(option){
        if(typeof option == 'object'){
            for(var key in option){
                var value = option.key;
                if(setting.hasOwnProperty(key))
                    setting.key = value;
            }
        }
    }
    NProgress.start = function(){
        var documentElement = document.documentElement;
        documentElement.classList.add('busy-progress');
        var wraper = document.createElement('div');
        wraper.id = 'progress';
        wraper.innerHTML = setting.template;
        var parent = document.querySelector(setting.parent);
        parent.appendChild(wraper);
        var progress = document.querySelector('[role="progress"]');
        progress.style.backgroundColor = setting.color;
        progress.style.transitionProperty = 'all';
        progress.style.transitionTimingFunction = setting.ease;
        progress.style.transitionDuration = `${setting.speed}ms`;
        var offset = setting.minimum*100-100;
        setTimeout(()=>{
            progress.style.transform = `translate3d(${offset}%,0,0)`;
        },0)

        if(setting.trickle){
            trickle(progress)
        }
        return this;
    }
    NProgress.done = function(isShow){
        var documentElement = document.documentElement;
        var progressWraper = document.querySelector('#progress')
        var progress = document.querySelector('[role="progress"]');
        progress.style.transform = 'translate3d(0,0,0)';
        progress.style.transitionProperty = 'all';
        if(isShow) return;
        setTimeout(()=>{
            progress.style.opacity = 0;
            setTimeout(()=>{
                progressWraper.parentNode.removeChild(progressWraper);
                documentElement.classList.remove('busy-progress');
            },setting.speed)
        },setting.speed);
        return this;
    }
    NProgress.set = function(percentage){
        var progress = document.querySelector("[role='progress']");
        var offset = -100+percentage*100;
        if(offset == -100){
            return this.start();
        }
        if(offset == 0){
            return this.done();
        }
        // if(timeoutListeners.length != 0){
        //     timeoutListeners.forEach((listener)=>{
        //         clearTimeout(listener);
        //     })
        // }
        setTimeout(()=>{
            progress.style.transform = `translate3d(${offset}%,0,0)`;
        },0)

        return this;
    }
    NProgress.inc = function(payload){
       setting.incrementAmount = payload;
    }
    function trickle(target){
        timeoutListeners.push(
            setTimeout(function(){
            var regExp = /\(([-|\d]+)%?,/;
            var translate = regExp.exec(target.style.transform);
            if(translate)
            var prevOffset = parseInt(translate[1]);
            if(prevOffset+setting.incrementAmount<0){
                target.style.transform = `translate3d(${prevOffset+setting.incrementAmount}%,0,0)`;
                setTimeout(arguments.callee,setting.speed+300)
            }else return;


        },setting.speed+300)
        )
    }
    return NProgress;
})