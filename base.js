/**
 * Created by wumingliang on 14-12-25.
 */

var $ = function(args){
    return new Base(args);
}
var Base = function(args){
    //创建一个数组，来保存获取的节点和节点数组
    this.elements = [];
    if(typeof args =="string"){
        //css方法
        if(args.indexOf(' ')!=-1){// =-1表示没找到，！=-1就表示在args里面找到了空格
            var elements = args.split(' ');
            var childElements = [];	//存放临时节点对象的数组，解决被覆盖的问题
            var node = [];	//用来存放父节点用的
            for(var i=0;i<elements.length;i++){
                if(node.length==0){
                    node.push( document);
                }
                switch (elements[i].chart(0)) {
                    case '#' :
                        childElements = [];				//清理掉临时节点，以便父节点失效，子节点有效
                        childElements.push(this.getId(elements[i].substring(1)));
                        node = childElements;		//保存父节点，因为childElements要清理，所以需要创建node数组
                        break;
                    case '.' :
                        childElements = [];
                        for (var j = 0; j < node.length; j ++) {
                            var temps = this.getClass( elements[i].substring(1), node[j] );//elements[i].substring(1)为class名
                            for (var k = 0; k < temps.length; k ++) {
                                childElements.push(temps[k]);
                            }
                        }
                        node = childElements;
                        break;
                    default :
                        childElements = [];
                        for (var j = 0; j < node.length; j ++) {
                            var temps = this.getTagName(elements[i], node[j]);
                            for (var k = 0; k < temps.length; k ++) {
                                childElements.push(temps[k]);
                            }
                        }
                        node = childElements;
                }
            }
        }
    }
}

Base.prototype = {
    // 设定父元素
    // 如果父元素没有定义，则将父元素置为document，否则将父元素设置为传入的参数
    setParentNode:function(parentNode){
        if (parentNode != undefined) {
            node = parentNode;
        } else {
            node = document;
        }
    },
    // 通过id获取节点
    getId:function(id){
        return document.getElementById(id);
    },
    // 通过标签名获取节点
    getTagName:function(tag,parentNode){
        var node = null;
        var temps = [];
        this.setParentNode(parentNode);
        var tags = node.getElementsByTagName(tag);
        for (var i = 0; i < tags.length; i ++) {
            temps.push(tags[i]);
        }
        return temps;
    },
    // 通过class名获取节点
    getClassName:function(className,parentNode){
        var node = null;
        var temps = [];
        this.setParentNode(parentNode);
        var all = node.getElementsByTagName('*');
        for (var i = 0; i < all.length; i ++) {
            if ((new RegExp('(\\s|^)' +className +'(\\s|$)')).test(all[i].className)) {
                temps.push(all[i]);
            }
        }
        return temps;
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

