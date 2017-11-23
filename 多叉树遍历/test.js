//获取根节点
var root = document.getElementsByClassName('root')[0];
//遍历的节点数组
var traverseList = [];
//先序遍历多叉树
function preOrderTraverse(rootDiv){
    var span = rootDiv.getElementsByTagName('span')[0];
    traverseList.push(rootDiv.className);
    //叶子节点
    //获取子节点
    var children = rootDiv.children;
    //获取div子节点
    var divList = [];
    for(var i=0;i<children.length;i++){
        if(children[i].tagName === 'DIV'){
            divList.push(children[i]);
        }
    }

    if(divList.length === 0){
        return;
    }

    for(var i=0;i<divList.length;i++){
        var t = divList[i];
        preOrderTraverse(t);
    }

}

//按层级遍历多叉树
function levelTraverse(rootDiv,stack){
    //节点入队列
    stack.push(rootDiv);
    while(stack.length>0) {
        //获取队列头部元素
        var topEle = stack.pop();
        //访问节点
        var span = topEle.getElementsByTagName('span')[0];
        traverseList.push(topEle.className);
        //将子元素入队尾
        //获取子节点
        var children = topEle.children;
        //获取div子节点
        for (var i = 0; i < children.length; i++) {
            if (children[i].tagName === 'DIV') {
                stack.unshift(children[i]);
            }
        }
    }
}

//动画效果
function animation(traverseList){
    var i = 0;
    var id = setInterval(function(){
        //改变当前节点颜色
        var divNode = document.getElementsByClassName(traverseList[i])[0];
        divNode.style.backgroundColor = '#35A4AD';
        //恢复前一个节点颜色
        if(i>0){
            var prevNode = document.getElementsByClassName(traverseList[i-1])[0];
            prevNode.style.backgroundColor = '#fff';
        }

        i++;
        //清除interval
        if(i>traverseList.length-1){
            clearInterval(id);
        }
    },1000)
}

//先序遍历树
//preOrderTraverse(root);
//animation(traverseList);


//按层级遍历树
//levelTraverse(root,[]);
//animation(traverseList)


