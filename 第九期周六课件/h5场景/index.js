var main = document.querySelector("#main");
var oLis = document.querySelectorAll("#list>li");
var winW = document.documentElement.clientWidth;
/*�豸�Ŀ��*/
var winH = document.documentElement.clientHeight;
/*�豸�ĸ߶�*/
var desW = 640;
/*��Ƹ��*/
var desH = 960;
/*��Ƹ��*/
/*�豸�Ŀ�/�豸�ĸ�<��Ƹ��/��Ƹ�� ���ո�������-->����Ƹ�ĸ���С���豸�ĸ�*/
/*��һ��ʵ������*/
if (winW / winH <= desW / desH) {
    main.style.webkitTransform = "scale(" + winH / desH + ")";  //main��Ȼ������,���ǿ�߲��仹��640��960
} else {
    main.style.webkitTransform = "scale(" + winW / desW + ")";
}

/*�ڶ���ʵ�����»���Ч��*/
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
    this.flag = true//��ʾ��touchmove,����click;
    var moveTouch = e.changedTouches[0].pageY;
    var pos = moveTouch - this.startTouch;/*�ƶ��ľ���*/
    var index = this.index;
    [].forEach.call(oLis,function(){
        if(arguments[1]!=index){
            arguments[0].style.display = "none"; //���ǵ�ǰ���ž�ȫ������
        }
        arguments[0].className = "";
        arguments[0].firstElementChild.id="";
    })
    /*��ǰ��һ�ŵ�����*/
    if (pos > 0) {/*��*/
        //�����һ�ŵ�����,�����������ж�,��ǰ��һ���ǵ�һ��,��һ�ž������һ��
        this.prevSIndex = (index == 0 ? oLis.length - 1 : index - 1);
        var duration = -winH+pos;

    } else if (pos) {/*��*/
        //�����һ�ŵ�����,�����������ж�,��ǰ��һ�������һ��,��һ�ž��ǵ�һ��
        this.prevSIndex = (index == oLis.length-1 ? 0 : index + 1);
        //var duration = 480+pos;
        var duration = winH+pos;
    }
    oLis[this.prevSIndex].style.display = "block";
    oLis[this.prevSIndex].style.webkitTransform = "translate(0,"+duration+"px)";
    oLis[this.prevSIndex].className="zIndex";
    //���ŵ�ֵ�ǰ����ƶ��ľ���/�豸�ĸ߶��������������(��С����)var posScale =0.1
    //��С��ֵ��0-1֮���һ����,�Ӵ�-С 1-posScale(�൱��1-Math.abs(pos)/winH)
    oLis[index].style.webkitTransform = "scale("+(1-Math.abs(pos)/winH*1/2)+") translate(0,"+pos+"px)";
}
function end(e) {
    if(this.flag){//������ȥִ���������
        oLis[this.prevSIndex].style.webkitTransform = "translate(0,0)";
        oLis[this.prevSIndex].style.webkitTransition = "0.7s";
        //transition������ʱ�ᴥ��webkitTransitionEnd����¼�
        oLis[this.prevSIndex].addEventListener("webkitTransitionEnd", function () {
            //���transition��ֹ��������
            this.style.webkitTransition = "";
            this.firstElementChild.id="a"+this.index;

        }, false)
    }
//css3��������ʱ��ͨ��������������id������������ִ��,�������ȵ��Ժ���,��ͨ��js������ʲôִ��
}

document.addEventListener("touchmove",function(){
})