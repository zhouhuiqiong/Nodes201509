var main = document.querySelector("#main");
var oLis = document.querySelectorAll("#list>li");
var winW = document.documentElement.clientWidth;
/*设备的宽度*/
var winH = document.documentElement.clientHeight;
/*设备的高度*/
var desW = 640;
/*设计稿宽*/
var desH = 960;
/*设计稿高*/
/*设备的宽/设备的高<设计稿宽/设计稿高 按照高来缩放-->把设计稿的高缩小到设备的高*/
/*第一步实现适配*/
if (winW / winH <= desW / desH) {
    main.style.webkitTransform = "scale(" + winH / desH + ")";  //main虽然缩放了,但是宽高不变还是640和960
} else {
    main.style.webkitTransform = "scale(" + winW / desW + ")";
}

/*第二步实现上下滑动效果*/
[].forEach.call(oLis, function () {
    var oLi = arguments[0];
    oLi.index = arguments[1];
    oLi.addEventListener("touchstart", start, false);
    oLi.addEventListener("touchmove", move, false);
    oLi.addEventListener("touchend", end, false);

})

function start(e) {
    this.startTouch = e.changedTouches[0].pageY;
}
function move(e) {
    this.flag = true//表示是touchmove,不是click;
    var moveTouch = e.changedTouches[0].pageY;
    var pos = moveTouch - this.startTouch;/*移动的距离*/
    var index = this.index;
    [].forEach.call(oLis,function(){
        if(arguments[1]!=index){
            arguments[0].style.display = "none"; //不是当前这张就全部隐藏
        }
        arguments[0].className = "";
        arguments[0].firstElementChild.id="";
    })
    /*当前这一张的索引*/
    if (pos > 0) {/*↓*/
        //获得上一张的索引,并且做过界判断,当前这一张是第一张,上一张就是最后一张
        this.prevSIndex = (index == 0 ? oLis.length - 1 : index - 1);
        var duration = -winH+pos;

    } else if (pos) {/*↑*/
        //获得下一张的索引,并且做过界判断,当前这一张是最后一张,上一张就是第一张
        this.prevSIndex = (index == oLis.length-1 ? 0 : index + 1);
        //var duration = 480+pos;
        var duration = winH+pos;
    }
    oLis[this.prevSIndex].style.display = "block";
    oLis[this.prevSIndex].style.webkitTransform = "translate(0,"+duration+"px)";
    oLis[this.prevSIndex].className="zIndex";
    //缩放的值是按照移动的距离/设备的高度这个比例来缩放(由小到大)var posScale =0.1
    //缩小的值是0-1之间的一个数,从大-小 1-posScale(相当于1-Math.abs(pos)/winH)
    oLis[index].style.webkitTransform = "scale("+(1-Math.abs(pos)/winH*1/2)+") translate(0,"+pos+"px)";
}
function end(e) {
    if(this.flag){//滑动才去执行下面代码
        oLis[this.prevSIndex].style.webkitTransform = "translate(0,0)";
        oLis[this.prevSIndex].style.webkitTransition = "0.7s";
        //transition结束的时会触发webkitTransitionEnd这个事件
        oLis[this.prevSIndex].addEventListener("webkitTransitionEnd", function () {
            //清空transition防止动画积累
            this.style.webkitTransition = "";
            this.firstElementChild.id="a"+this.index;

        }, false)
    }
//css3动画触发时是通过增加类名或者id名来触发动画执行,动画是先调试好了,再通过js来控制什么执行
}

document.addEventListener("touchmove",function(){
})