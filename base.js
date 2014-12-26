/**
 * Created by wumingliang on 14-12-25.
 */

var $ = function(args){
    return new Base(args);
}
var Base = function(args){

}

Base.prototype = {
    // 通过id获取节点
    idGet:function(id){
        return document.getElementById(id);
    },
    // 通过标签名获取节点
    tagGet:function(tag){
        return document.getElementsByTagName(tag);
    },
    // 通过class名获取节点
    classGet:function(classname){
        var o = [];

    },
    // 显示元素
    show:function(){
        for(var i=0;i<this.elements.length;i++){
            this.elements[i].style.display = 'block';
        }
    },
    // 隐藏元素
    hide:function(){
        for(var i=0;i<this.elements.length;i++){
            this.elements[i].style.display = 'none';
        }
    },
    // 阻止冒泡
    stopBubble:function(e){
        e?e.stopPropagation() : window.event.cancelBubble = true;
    }
}

