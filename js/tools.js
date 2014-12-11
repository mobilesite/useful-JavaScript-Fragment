/**
 * Created by wumingliang on 14-12-5.
 */
(function(){
    window.onload = function(){
        var aInp = document.getElementsByTagName('input');
        var aDiv = getByClass(document,'div','popwind');
        var aA = getByClass(document,'a','easyshow');

        var pop1 = new Popup(aDiv[0]);
        aInp[0].onclick = function(){
            pop1.init({
                pos:'center',
                title:'我是标题'
            });
            pop1.topClose();
        };

        var pop2 = new Popup(aDiv[0]);
        aInp[1].onclick = function(){
            pop2.init({
                pos:'center',
                title:'我是标题'
            });
            pop2.topClose();
            pop2.mast();
        };
        aInp[2].onclick = function(){
            pop2.init({
                pos:'center',
                title:'我是标题'
            });
            pop2.topClose();
            pop2.mast();
            pop2.moveIn();
        };
        aInp[3].onclick = function(){
            pop2.init({
                pos:'center',
                title:'我是标题',
                moveIn:true
            });
            pop2.topClose();
            pop2.mast();
            pop2.fixedPos();
            pop2.moveIn();
        };

        var pop3 = new Popup(aDiv[1]);
        aInp[4].onclick = function(){
            pop3.init({
                pos:'center',
                title:'我是标题',
                moveIn:true
            });
            pop3.topClose();
            pop3.mast();
            pop3.fixedPos();
            pop3.moveIn();
            pop3.bigBtn();
        };
        aInp[5].onclick = function(){
            pop3.init({
                pos:'center',
                title:'我是标题',
                moveIn:true
            });
            pop3.topClose();
            pop3.mast();
            pop3.fixedPos();
            pop3.dragbar();
            pop3.moveIn();
        };
        aInp[6].onclick = function(){
            var pop4 = new Popup(aDiv[2]);
            pop4.init({
                pos:'left-center'
            });
            pop4.fixedPos();
            pop4.minimize();
        };
    }
    var PopBig = true;
    var PopMid = true;

    function Popup(obj){
        this.obj = obj;
        this.settings = {
            pos:'center',
            title:'',
            moveIn:true
        };
        this.dragable = true;
        this.obj.tit = true;
    };
    Popup.prototype.init = function(opt){
        extend( this.settings , opt || {} );
        this.obj.style.display = 'block';
        this.setPos();

        var title = this.settings.title || this.obj.title;
        this.obj.title = '';
        if(this.obj.tit){
            var oTitle = document.createElement('h3');
            oTitle.className = 'mytitle';
            oTitle.innerHTML = title;

            this.obj.appendChild(oTitle);
            this.obj.tit = false;
        }
        this.popClose();
    };
    Popup.prototype.topClose = function(){
        var This = this;
        var oClose = document.createElement('span');
        oClose.className = 'tclose';
        oClose.innerHTML = 'x';

        this.obj.appendChild(oClose);
        this.tclose = getByClass(this.obj,'span','tclose')[0];
        oClose.onclick = function(){
            This.fnClose.call(This);
        }
    };
    Popup.prototype.popClose = function(){
        var This = this;
        var closePop =  getByClass(this.obj,'input','popclose');

        for(var i=0;i<closePop.length;i++){
            closePop[i].onclick = function(){
                This.fnClose.call(This);
            }
        }
    };
    Popup.prototype.fnClose = function(){
        var This = this;
        this.obj.removeChild(this.tclose);

        if(this.settings.movein){
            startMove(this.obj,{opacity:0,top:-80},function(){
                This.obj.style.display = 'none';
            });
            setTimeout(function(){
                startMove(This.oMast,{opacity:0},function(){
                    document.body.removeChild(This.oMast);
                });
            },300)
        }else{
            This.obj.style.display = 'none';
            this.oMast && startMove(this.oMast,{opacity:0},function(){
                document.body.removeChild(This.oMast);
            });
        }
    };
    Popup.prototype.setPos = function(){

        if(this.settings.pos == 'center'){
            this.obj.style.position = 'absolute';
            if(veiwWidth()<this.obj.offsetWidth){
                this.obj.style.left ='0px';
            }else if(veiwHeight()<this.obj.offsetHeight){
                this.obj.style.top =0+scrollY()+'px';
            }else{
                this.obj.style.left = (veiwWidth() - this.obj.offsetWidth)/2 + 'px';
                this.obj.style.top = (veiwHeight() - this.obj.offsetHeight)/2 + scrollY() + 'px';
            }
        }else if(this.settings.pos == 'right-bottom'){
            this.obj.style.position = 'absolute';
            this.obj.style.left = veiwWidth() - this.obj.offsetWidth + 'px';
            this.obj.style.top = veiwHeight() - this.obj.offsetHeight + scrollY() + 'px';
        }else if(this.settings.pos == 'left-center'){
            this.obj.style.position = 'absolute';
            this.obj.style.left = 0 + 'px';
            this.obj.style.top = (veiwHeight() - this.obj.offsetHeight)/2 + scrollY() + 'px';
        }
    };
    Popup.prototype.fixedPos = function(){
        var This = this;
        window.onscroll = function(){
            //This.easyState = true;
            This.setPos();
        };
    };
    Popup.prototype.mast = function(){
        var This = this;
        var oDiv = document.createElement('div');
        oDiv.className = 'master';
        oDiv.style.width = veiwWidth() + 'px';
        oDiv.style.height = veiwHeight() + 'px';
        oDiv.style.zIndex = '666';
        this.obj.style.zIndex = '667';
        document.body.appendChild(oDiv);

        this.oMast = getByClass(document,'div','master')[0];
        startMove(this.oMast,{opacity:40});

        if(window.attachEvent){
            window.attachEvent('resize',function(){
                This.oMast.style.width = veiwWidth() + 'px';
                This.oMast.style.height = veiwHeight() + 'px';
            });
            window.attachEvent('scroll',function(){
                This.oMast.style.top = scrollY() + 'px';
            });
        }else{
            window.addEventListener('resize',function(){
                This.oMast.style.width = veiwWidth() + 'px';
                This.oMast.style.height = veiwHeight() + 'px';
            },false);
            window.addEventListener('scroll',function(){
                This.oMast.style.top = scrollY() + 'px';
            },false);
        }
    };
    Popup.prototype.dragbar = function(){
        this.dragBar = getByClass(this.obj,'h3','mytitle')[0];
        var d = new drag(this.dragBar,this.obj);
        d.init();
    };
    Popup.prototype.moveIn = function(){
        this.obj.style.top = '-200px';
        this.obj.style.opacity = '0';
        startMove(this.obj,{top:Math.floor((veiwHeight() - this.obj.offsetHeight)/2),opacity:100})
    };
    Popup.prototype.bigBtn = function(){
        var This = this;
        var big = document.createElement('span');
        big.className = 'bigest';
        if(PopBig){
            this.obj.appendChild(big);
            PopBig = false;
        }
        this.bigBtn = getByClass(this.obj,'span','bigest')[0];

        this.bigBtn.onclick = function(){
            This.changeBig();
        }
        this.W = css(this.obj,'width');
        this.H = css(this.obj,'height');
    };
    Popup.prototype.changeBig = function(){
        this.obj.style.left = '0';
        this.obj.style.top = '0';
        this.obj.style.width = veiwWidth()+'px';
        this.obj.style.height = veiwHeight()-2*parseInt(css(this.obj,'padding'))+'px';
        this.bigBtn.style.display = 'none';
        if(PopMid){
            this.midBtn();
        }
        this.midBtn.style.display = 'block';
    };
    Popup.prototype.midBtn = function(){
        var This = this;
        var mid = document.createElement('span');
        mid.className = 'midBtn';
        if(PopMid){
            this.obj.appendChild(mid);
            PopMid = false;
        }
        this.midBtn = getByClass(this.obj,'span','midBtn')[0];

        this.midBtn.onclick = function(){
            This.changeMid();
        }
    };
    Popup.prototype.changeMid = function(){
        this.obj.style.width = parseInt(this.W) + 'px';
        this.obj.style.height = parseInt(this.H) + 'px';
        this.setPos();

        this.midBtn.style.display = 'none';
        this.bigBtn.style.display = 'block';
    }
    Popup.prototype.minimize = function(){
        this.obj.children[1].style.display = 'block';
        var W = parseInt(css(this.obj,'width'));
        var H = parseInt(css(this.obj,'height'));
        this.obj.children[1].style.display = 'none';
        this.obj.style.display = 'block';
        this.easyshow = getByClass(this.obj,'div','easyshow')[0];

        this.obj.style.width = this.easyshow.offsetWidth + 'px';
        this.obj.style.height = this.easyshow.offsetHeight + 'px';
        this.obj.style.background = 'none';

        var This = this;
        this.easyshow.onclick = function(){
            This.easyshow.style.display = 'none';
            This.obj.children[1].style.display = 'block'
            startMove(This.obj,{width:W,height:H,top:scrollY()+Math.round((veiwHeight()-H)/2)});
            This.minBtn();
            This.oMin.style.display = 'block';
            This.easyState = false;
        };
    };
    Popup.prototype.minBtn = function(){
        var This = this;
        var minBtn = document.createElement('div');
        minBtn.className = 'minBtn';
        minBtn.innerHTML = '<<收起';
        this.obj.appendChild(minBtn);

        this.oMin = getByClass(this.obj,'div','minBtn')[0];
        this.oMin.style.display = 'block';
        this.oMin.onclick = function(){
            This.changeMin();
        };
    };
    Popup.prototype.changeMin = function(){
        var This = this;
        this.obj.removeChild(this.oMin)
        this.easyshow.style.display = 'block';
        this.easyshow.style.opacity = '0';
        this.easyshow.style.filter = 'alpha(opacity = 0)';
        startMove(this.obj,{width:This.easyshow.offsetWidth,height:parseInt(css(this.easyshow,'height')),top:scrollY()+Math.round(((veiwHeight()-parseInt(css(this.easyshow,'width')))/2))},function(){
            This.obj.children[1].style.display = 'none';
            This.easyshow.style.opacity = '1';
            This.easyshow.style.filter = 'alpha(opacity = 100)';
        });
        if(this.easyState){
            this.obj.children[1].style.display = 'none';
            this.easyshow.style.opacity = '1';
            this.easyshow.style.filter = 'alpha(opacity = 100)';
        }
    };

    function getByClass(parent, tagName, className) {
        var aEls = parent.getElementsByTagName(tagName);
        var arr = [];

        var serchC = className.split(' ')
        for (var i=0; i<aEls.length; i++) {
            var aClass = aEls[i].className.split(' ');
            for (var j=0; j<aClass.length; j++) {
                for(var n=0;n<serchC.length;n++){
                    if (aClass[j] == serchC[n]) {
                        arr.push(aEls[i]);
                        break;
                    }
                }
            }
        }
        return arr;
    };
    function css(obj,attr){  //获取样式
        return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj)[attr];
    }
    function veiwWidth(){  //获取可视区宽
        return document.documentElement.clientWidth || document.body.clientHeight;
    };
    function veiwHeight(){  //获取可视区高
        return document.documentElement.clientHeight || document.body.clientHeight;
    };
    function scrollY(){  //滚动条高度
        return document.documentElement.scrollTop || document.body.scrollTop;
    };
    function extend(a,b){  //赋值
        for(var attr in b){
            a[attr] = b[attr];
        }
    };
    function startMove(obj, json, fn) {  //缓冲运动
        clearInterval(obj.iTimer);
        var iSpeed = 0;
        var iCur = 0;
        obj.iTimer = setInterval(function() {
            var iBtn = true;

            for (attr in json) {
                if (attr == 'opacity') {
                    iCur = Math.round(css(obj, attr) * 100);
                } else {
                    iCur = parseInt(css(obj, attr));
                }
                iSpeed = (json[attr] - iCur) / 6;
                iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);

                if (iCur != json[attr]) {
                    iBtn = false;
                    if (attr == 'opacity') {
                        obj.style.opacity = (iCur + iSpeed) / 100;
                        obj.style.filter = 'alpha(opacity='+ (iCur + iSpeed) +')';
                    } else {
                        obj.style[attr] = iCur + iSpeed + 'px';
                    }
                }
            }
            if (iBtn) {
                clearInterval(obj.iTimer);
                fn && fn.call(obj);
            }
        }, 30);
    };
    function drag(obj,moveEle){  //面向对象的拖拽
        this.obj = obj;
        this.moveEle = moveEle || obj;
        this.disX = 0;
        this.disY = 0;
    };
    drag.prototype.init = function(){  //拖拽默认
        var This = this;
        this.obj.onmousedown = function(ev){
            var ev = ev || event;
            This.moveEle.disX = ev.clientX - This.moveEle.offsetLeft;
            This.moveEle.disY = ev.clientY - This.moveEle.offsetTop;

            var _this = This;
            document.onmousemove = function(ev){
                var ev = ev || event;
                var L = ev.clientX - This.moveEle.disX;
                var T =  ev.clientY - This.moveEle.disY;
                if(L<0){
                    L=0;
                }else if(L>veiwWidth()- This.moveEle.offsetWidth){
                    L = veiwWidth() - This.moveEle.offsetWidth;
                }
                if(T<0+scrollY()){
                    T=0+scrollY();
                }else if(T > veiwHeight() - This.moveEle.offsetHeight+scrollY()){
                    T = veiwHeight()-This.moveEle.offsetHeight+scrollY();
                }

                This.moveEle.style.left = L  + 'px';
                This.moveEle.style.top = T + 'px';
            }
            document.onmouseup = function(){
                document.onmousemove = null;
                document.onmouseup = null;
            };
            return false;
        }
    };
    function next(obj){
        return obj.nextElementSibling || nextSibling;
    }
    function prev(obj){
        return obj.previousElementSibling || previousSibling;
    }

})()