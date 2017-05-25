/**
 * Created by lenovo on 2017/5/1.
 */
'use strict';
(function () {
   /*
   轮播图
    */
   var silder =  function () {
       var oBanner_box = document.querySelector('#banner_box');
       var bannerbox = document.querySelector('.bannerbox');
       var abannerLi = document.querySelectorAll('#banner_box>li');
       var oBanner_btn_box = document.querySelector('#banner_btn_box');
       var timer = null,num=0,off=true,iNow=0;
       for(var i=0;i<abannerLi.length-1;i++){
           var btnLi = document.createElement('i');
           if(i == 0){
               btnLi.className += 'active';
           }
           oBanner_btn_box.appendChild(btnLi);
       }
       oBanner_box.style.width = abannerLi.length*abannerLi[0].offsetWidth + 'px';

   /*
    banner_btn点击
    */
        var oBarrner_btn= document.querySelectorAll('#banner_btn_box>i');
        for(var i=0;i<oBarrner_btn.length;i++){
            oBarrner_btn[i].index = i;
            oBarrner_btn[i].onclick = function () {
                if(off){
                  // 此处的意思就是下面轮播符号按钮的状态
                    off = false;
                    banner_btn_c(this);
                    playMove(oBanner_box,{'left':abannerLi[0].offsetWidth*-this.index},function () {
                        off = true;
                    });
                    iNow = num= this.index;
                }

            };
        }
       //移入停止
       bindEvent(bannerbox,'mouseenter',function () {
           clearInterval(timer);
       });
       bindEvent(bannerbox,'mouseleave',function () {
           timer= setInterval(show,1500);
       });

        /*自动播放*/
         timer= setInterval(show,1500);
        function show() {
            num ++;
            iNow ++;
            if(num>abannerLi.length-1){
                oBanner_box.style.left = 0;
                num = 1;
            }
            playMove(oBanner_box,{'left':abannerLi[0].offsetWidth*-num},function () {
                off = true;
            });
            if(iNow>oBarrner_btn.length-1){
                iNow = 0;
            }
            banner_btn_c(oBarrner_btn[iNow]);
        };
        /*按钮*/
        function banner_btn_c(obj) {
            for(var j=0;j<oBarrner_btn.length;j++){
                removeClass(oBarrner_btn[j], 'active')
            }
            obj.className = 'active';
        }

   };
    silder();
   /*
    京东秒杀倒计时
     */
   var timedeta = function () {
       var aDiv = document.querySelectorAll('#timedeta>li>div');
       var oDian = document.querySelectorAll('#timedeta>li>img');
       var old  = getTime();
       for(var i=0;i<aDiv.length;i++){
           aDiv[i].getElementsByTagName('img')[0].src  = './images/' +old[i]+'.JPG';
       }
       setInterval(function () {
           for(var i=0;i<oDian.length;i++){
               oDian[i].src = './images/colon.JPG';
           }
           setTimeout(function () {
               for(var i=0;i<oDian.length;i++){
                   oDian[i].src = './images/colon1.jpg';
               }
           },500);
           autoPlay();
       },1000);
       function autoPlay() {
           var time  = getTime();
           for(var i=0;i<time.length;i++){
               if(old[i] != time[i] ){
                   slider(i,time);
               }
           }
           old = time;
           function slider(n,time) {
               var aImg = aDiv[n].getElementsByTagName('img');
               aImg[1].src = './images/' + time[n] + '.JPG';
               timermove(aDiv[n],'top',-37,400,function () {
                   aImg[0].src = './images/' + time[n] + '.JPG';
                   aDiv[n].style.top = '';
               });
           };
       };

   };
    timedeta();
   
    /*
     京东秒杀轮播
     */
   var miaosilder = function () {
        var oUl = document.querySelector('#miaoproductbox>ul');
        var amiaopic = ['./images/miaoproduct1.png','./images/miaoproduct2.png','./images/miaoproduct3.png','./images/miaoproduct4.png'];
        for(var i=0,num=0;i<amiaopic.length;i++){
            var oLi = document.createElement('li');
            var oA = document.createElement('a');

            oLi.style.background = 'url('+amiaopic[i]+') no-repeat center center';
            oLi.style.backgroundSize = '1000px 240px';
            oA.href = '#';
            oLi.appendChild(oA);
            oUl.appendChild(oLi);
        }
        var miaoaLi = document.querySelectorAll('#miaoproductbox>ul>li');
        oUl.style.width =  miaoaLi[0].offsetWidth * amiaopic.length + 'px';


        var miaopre = document.querySelector('#miaopre');
        var miaonext = document.querySelector('#miaonext');
        bindEvent(miaopre,'click',function () {
            num --;
            if(num <0){
                num = 0;
            }
            playMove(oUl,{'left':miaoaLi[0].offsetWidth*-num});

        });
       bindEvent(miaonext,'click',function () {
            num ++;
            if(num >miaoaLi.length-1){
                num = miaoaLi.length-1;
            }
           playMove(oUl,{'left':miaoaLi[0].offsetWidth*-num});

       });

   };
    miaosilder();

    /*
     京东gride轮播
     */
   var grid2_s = function () {
        var grid_pic = ['./images/grid2_s1.png','./images/grid2_s2.png','./images/grid2_s3.png'];
        var aDiv = document.querySelectorAll('#grid2_c_s>div');
        var grid2_next = document.querySelector('#grid2_next');
        var grid2_pre = document.querySelector('#grid2_pre');
        var grid2icon = document.querySelectorAll('#grid2icon>i');
        var num =0,a=1;

        for(var i=0;i<grid_pic.length;i++){
           aDiv[i].style.background = "url("+grid_pic[i]+") no-repeat center center";
            aDiv[i].style.backgroundSize = '370px 369px';
        }

        bindEvent(grid2_next,'click',function () {
            num ++;
            if(num>aDiv.length-1){
                num = 0;
            }
            gridDiv(aDiv[num]);
            gridIcon(grid2icon[num]);

        });
       bindEvent(grid2_pre,'click',function () {
           num --;
           if(num<0){
               num = aDiv.length-1;
           }
           gridDiv(aDiv[num]);
           gridIcon(grid2icon[num]);

       });
       function gridDiv(obj) {
           for(var i=0;i<aDiv.length;i++){
               aDiv[i].className = 'fadeout'
           }
           obj.className = 'fadein';
       };
       function gridIcon(obj) {
           for(var i=0;i<grid2icon.length;i++){
               grid2icon[i].className = '';
           }
           obj.className = 'active';
       };
   };
    grid2_s();

    /*
        京东grid3_c_nav选项卡
     */
    var grid3_nav = function () {
        var grid3_c_nav = document.querySelectorAll('#grid3_c_nav>li');
        var grid3_mask = document.querySelector('#grid3_mask');
        var grid3_c_p = document.querySelectorAll('#grid3_c_p>div');
        var grid3_bg = ['./images/grid3_nav1.png','./images/grid3_nav2.png','./images/grid3_nav3.png','./images/grid3_nav4.png','./images/grid3_nav5.png'];
        for(var i=0;i<grid3_c_p.length;i++){
            grid3_c_p[i].style.background = 'url('+grid3_bg[i]+') no-repeat 0 center';
            grid3_c_p[i].style.backgroundSize = '370px 335px';
        }
        for(var i=0;i<grid3_c_nav.length;i++){
            grid3_c_nav[i].index = i;
            bindEvent(grid3_c_nav[i],'mouseenter',function () {
                animate(grid3_mask,this.offsetLeft+10);
                grid3_c_pshow(grid3_c_p[this.index]);
            });
        }
        function grid3_c_pshow(obj) {
            for(var i=0;i<grid3_c_p.length;i++){
                grid3_c_p[i].className = '';
            }
            obj.className = 'active';
        }

    };
    grid3_nav();

    /* 京东fix效果 */
    var jd_fixed_top = function () {
        var jdfixseatch = document.querySelector('#jdfixseatch');
        var todaybox = document.querySelector('#todaybox');
        var jdfixseatch = document.querySelector('#jdfixseatch');
        var off = true;
        var todaybox_top = getPos(todaybox).top;
        fixdomTop();
        bindEvent(window,'scroll',function () {
            if(off){
                fixdomTop();
            }
            if(!off){
                setTimeout(function () {
                    if(Math.floor(scroll().top)<todaybox_top){
                        jdfixseatch.style.top = '-50px';
                        var a = parseInt(getStyle(jdfixseatch,'top'));
                       if(a === -50){
                           off = true;
                       }
                    }
                },100)
            }
        });

        function fixdomTop() {
            var domTop = Math.floor(scroll().top);
           if(domTop>todaybox_top){
               // timermove(jdfixseatch,'top',0,300);
               playMove(jdfixseatch,{'top':0},function () {
                   off = false;
               })
           }
        }



    };
    jd_fixed_top();

    /*京东flourbar*/
    var flourbar = function () {
        var guanggao = document.querySelector('#guanggao');
        var floubar = document.querySelector('#floubar');
        var floubarLi = document.querySelectorAll('#floubar>ul>li');
        var jd_fix_show = document.querySelectorAll('.jd_fix_show ');
        var leader = 0,off = true,timer,zuo;
        /*楼滚动出现*/
        var guanggao_top = getPos(guanggao).top - 110;
        scrollShow();
        flourbarshow();
        bindEvent(window,'scroll',function () {
            flourbarshow();
            scrollShow();

        });
        /* 点击出现效果 运动 */
        for(var i=0;i<floubarLi.length;i++){
            floubarLi[i].index = i;
           bindEvent(floubarLi[i],'click',function () {
               if(off){
                   off = false;
                   floubarLishow(this);
                   var zou = scrollPlay(jd_fix_show[this.index]);
                   timer = setInterval(function () {
                       leader = leader + Math.floor((zou - leader) / 10);
                       if(Math.abs(zou - leader)<=10){
                           leader = zou;
                           clearInterval(timer);
                       }
                       window.scrollTo(0,leader);
                       if( leader == zou ){
                           off = true;
                       }
                   },30);
               }
           });
        }
        /*楼滚动监听*/
        function scrollShow() {
            for(var i=0;i<jd_fix_show.length;i++){
                var usreTop  = getPos(jd_fix_show[i]).top - 530;
                var demoT = scroll().top;
                if(demoT>usreTop){
                    floubarLishow(floubarLi[i]);

                }
            }
        };
        /*楼点击滚动*/
        function scrollPlay(obj) {
            return getPos(obj).top - 100;
        };
      
        /*滚动出现封装*/
        function flourbarshow() {
            var domeTop = Math.floor(scroll().top);
            if(domeTop >guanggao_top){
                addClass(floubar,'floubarfadein');
            }else if(domeTop <guanggao_top){
                removeClass(floubar,'floubarfadein');
            }
        };
        /*点击封装*/
        function floubarLishow(obj) {
            for(var j=0;j<floubarLi.length;j++){
                floubarLi[j].className = '';
            }
            obj.className = 'active';

        };

    };
    flourbar();


// 完美运动框架
    function playMove(obj,json,endFn){

        clearInterval(obj.timer);

        obj.timer = setInterval(function(){

            var bBtn = true;

            for(var attr in json){

                var iCur = 0;

                if(attr == 'opacity'){
                    if(Math.round(parseFloat(getStyle(obj,attr))*100)==0){
                        iCur = Math.round(parseFloat(getStyle(obj,attr))*100);

                    }
                    else{
                        iCur = Math.round(parseFloat(getStyle(obj,attr))*100) || 100;
                    }
                }
                else{
                    iCur = parseInt(getStyle(obj,attr)) || 0;
                }

                var iSpeed = (json[attr] - iCur)/10;
                iSpeed = iSpeed >0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
                if(iCur!=json[attr]){
                    bBtn = false;
                }

                if(attr == 'opacity'){
                    obj.style.filter = 'alpha(opacity=' +(iCur + iSpeed)+ ')';
                    obj.style.opacity = (iCur + iSpeed)/100;

                }
                else{
                    obj.style[attr] = iCur + iSpeed + 'px';
                }


            }

            if(bBtn){
                clearInterval(obj.timer);
                if(endFn){
                    endFn.call(obj);
                }
            }

        },30);

    };
  // style(document.getElementById(id).style.XXX)只能获取元素的内联样式，
  // 内部样式和外部样式使用style是获取不到的。
  // 一般js获取内部样式和外部样式使用getComputedStyle，以及currentStyle。
  // Js获取元素样式值(getComputedStyle&currentStyle)兼容性解决方案
    function getStyle(obj,attr){
        if(obj.currentStyle){
            return obj.currentStyle[attr];
        }
        else{
            return getComputedStyle(obj,false)[attr];
        }
    };
 //   说明：删除元素class；
	// @obj------->要删除class的元素；
	// @className-------->要删除的class值；

    function removeClass(obj, className) {
       
        if (obj.className != '') {
            var arrClassName = obj.className.split(' ');
            var _index = arrIndexOf(arrClassName, className);
            if ( _index != -1 ) {
                arrClassName.splice(_index, 1);
                obj.className = arrClassName.join(' ');
            }
        }

    };
// 判断目标物的classname如果不为空，然后把obj.className
       // 看成用“ ”（空格）分割的字符串，用split去除空格变成数组，
       // ：为元素添加class
    function addClass(obj, className) {

        if (obj.className == '') {
            obj.className = className;
        } else {
            var arrClassName = obj.className.split(' ');
            if ( arrIndexOf(arrClassName, className) == -1 ) {
                obj.className += ' ' + className;
            }
        }

    };
    // 数组的indexOf()方法，找到数组中的元素，
    // 并返回该元素在数组中的位置
    // @arr---->传入的数组
	// @v------>需在数组中返回位置的元素
    function arrIndexOf(arr, v) {
        for (var i=0; i<arr.length; i++) {
            if (arr[i] == v) {
                return i;
            }
        }
        return -1;
    };
   // ie和非ie的兼容事件函数
 //   	说明：事件绑定的第二种方式，可以让一个元素的一个事件同时触发2个事件函数
	// @obj------>要绑定事件的元素
	// @evname-------->事件名称
	// @fn----------->事件函数
    function bindEvent(obj, evname, fn) {
        if (obj.addEventListener) {
            obj.addEventListener(evname, fn, false);
        } else {
            obj.attachEvent('on' + evname, function() {
                fn.call(obj);
            });
        }
    };
  
    function timermove(obj,attr,target,duration,callback){
        var b = parseFloat(getComputedStyle(obj)[attr]);
        var c = target - b;
        var d = duration;
        var now = new Date().getTime();
        obj[attr] = setInterval(function(){
            var t = new Date().getTime() - now;
            var value = b + c / d * t;
            obj.style[attr] = value+"px";
            if(t >= d){
                clearInterval(obj[attr]);
                obj.style[attr] = target+"px";
                callback&&callback();
            }
        },30)
    };
   	// 说明：传入一个数num，如果该数小于10，返回其前面加0的字符串，如果大于10则返回该数的字符串；
	// @num----->传入的数。
    function addTwo(num) {
        return num<10?'0'+num:''+num;
    };
  
    function getTime(){
        var iTime = new Date();
        var iNewTime = new Date(2017, 5, 4, 24, 0, 0);
        var t = Math.floor((iNewTime - iTime)/1000);
        var str = addTwo(Math.floor(t%86400/3600))+addTwo(Math.floor(t%86400%3600/60))+addTwo(t%60)+'秒';
        return  str;
    };
  // 缓冲运动
    function animate(obj,target){
        clearInterval(obj.timer);
        var speed = obj.offsetLeft < target ? 5 : -5;
        obj.timer = setInterval(function() {
            var result = target - obj.offsetLeft;
            obj.style.left = obj.offsetLeft + speed + "px";
            if(Math.abs(result)<=15)
            {
                clearInterval(obj.timer);
                obj.style.left = target + "px";
            }
        },10)
    };
   // JS DOM之父节点 和   JS DOM之位置尺寸 ）	说明：获取元素的位置
    function getPos(obj) {
        var pos = {left:0, top:0};
        while (obj) {
            pos.left += obj.offsetLeft;
            pos.top += obj.offsetTop;
            obj = obj.offsetParent;
        }
        return pos;
    }
  // 原生JS获取ScrollTop/ScrollLeft  文档滚动对 scrollTop scrollLeft的兼容性封装

    function scroll() {
        if(window.pageYOffset != null)  
        {
            return {
            	// 注： ie9+ 高版本浏览器 火狐谷歌等
                left: window.pageXOffset,
                top: window.pageYOffset
            }
        }
        else if(document.compatMode == "CSS1Compat")  
     
        {
            return {
            	 // 注：经测试  IE 6 及以上版本支持这种写法， 但火狐谷歌不支持。
                left: document.documentElement.scrollLeft,
                top: document.documentElement.scrollTop
            }
        }
        return { // 注：经测试 IE 6789 都不支持这种写法(值为0)，但火狐谷歌支持。
            left: document.body.scrollLeft,
            top: document.body.scrollTop
        }
    }

})();
