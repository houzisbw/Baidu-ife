//树,二叉搜索数，左小于根，右大于等于根
function BinarySearchTree(){
    //树的节点
    var Node = function(value){
        this.value = value;
        this.right = null;
        this.left = null;
        //节点id，便于html中搜寻特定的节点
        this.id = null;
    }
    //根节点
    var root = null;
    //节点id
    var nodeId = 0;
    //遍历顺序list
    var orderList = [];


    //清空树
    this.clearTree = function(){
        root = null;
        nodeId = 0;
        orderList = [];
    }
    //判断树是否存在
    this.isTreeExist = function(){
        return root;
    }

    //获取遍历后的顺序列表
    this.getOrderList = function(){
        return orderList;
    }
    this.clearOrderList = function(){
        orderList = [];
    }

    //插入一个节点
    this.insert = function(value){
        //辅助函数，递归插入节点
        function insertNode(node,newNode){
            //左子树
            if(newNode.value < node.value){
                if(node.left == null){
                    node.left = newNode;
                    //生成左侧节点
                    var nodeDiv = document.createElement('div');
                    nodeDiv.innerHTML = value;
                    nodeDiv.setAttribute('class','node-basic node-left');
                    //加前缀_node,因为id不能数字开头
                    nodeDiv.setAttribute('id','node_'+newNode.id);
                    //在父节点中插入新的节点,首先获取父节点的id
                    var parentNodeId = node.id;
                    var htmlNode = document.getElementById('node_'+parentNodeId);
                    htmlNode.appendChild(nodeDiv);

                    //画2个节点之间的连线，用div来表示，rotate一定角度即可
                    var line = document.createElement('div');
                    line.setAttribute('class','line-left');
                    nodeDiv.appendChild(line);
                }
                else{
                    insertNode(node.left,newNode);
                }
            }
            else{
                if(node.right == null){
                    node.right = newNode;
                    //生成右侧节点
                    var nodeDiv = document.createElement('div');
                    nodeDiv.innerHTML = value;
                    nodeDiv.setAttribute('class','node-basic node-right');
                    nodeDiv.setAttribute('id','node_'+newNode.id);
                    //在父节点中插入新的节点,首先获取父节点的id
                    var parentNodeId = node.id;
                    var htmlNode = document.getElementById('node_'+parentNodeId);
                    htmlNode.appendChild(nodeDiv);
                    //画2个节点之间的连线，用div来表示，rotate一定角度即可
                    var line = document.createElement('div');
                    line.setAttribute('class','line-right');
                    nodeDiv.appendChild(line);
                }
                else{
                    insertNode(node.right,newNode);
                }
            }
        }


        var newNode = new Node(value);
        //设置该节点id
        newNode.id = nodeId++;
        if(root == null){
            root = newNode;
            //在html中插入根节点,id是0
            var nodeDiv = document.createElement('div');
            nodeDiv.innerHTML = value;
            nodeDiv.setAttribute('class','node-basic node-root');
            nodeDiv.setAttribute('id','node_'+root.id);
            var treeDiv = document.getElementsByClassName('tree')[0];
            treeDiv.appendChild(nodeDiv);
        }
        else{
            insertNode(root,newNode);
        }

    }

    //查找，存在返回true，否则false
    this.search = function(value){
        //辅助函数
        function  searchNode(node,value) {
            if(node === null){
                return false;
            }

            if(node.value === value){
                return true;
            }
            else if(node.value > value){
                return searchNode(node.left,value);
            }
            else{
                return searchNode(node.right,value);
            }
        }
        return searchNode(root,value);
    }

    //中序遍历
    this.inOrderTraverse = function(){
        function inOrderTraverseNode(node){
            if(node === null){
                return;
            }
            else{
                console.log(node.value+ " ");
                orderList.push('node_'+node.id);
                inOrderTraverseNode(node.left);
                inOrderTraverseNode(node.right);
            }
        }
        inOrderTraverseNode(root);
    }

    //先序遍历
    this.preOrderTraverse = function(){
         var self = this;
         function preOrderTraverseNode(node){
            if(node === null){
                return;
            }
            else{
                preOrderTraverseNode(node.left);
                //将顺序放在一个list里面，遍历那个list来改变颜色，而不是在这里写
                console.log(node.value+ " ");
                orderList.push('node_'+node.id);
                //改变当前节点的颜色
                preOrderTraverseNode(node.right);
            }
        }
        preOrderTraverseNode(root);
    }

    //后序遍历
    this.postOrderTraverse = function(){
        function postOrderTraverseNode(node){
            if(node === null){
                return;
            }
            else{
                postOrderTraverseNode(node.left);
                postOrderTraverseNode(node.right);
                orderList.push('node_'+node.id);
                console.log(node.value+ " ");
            }
        }
        postOrderTraverseNode(root);
    }




}

//二叉树实例
var bst = new BinarySearchTree();
var insertButton = document.getElementById('insert');
insertButton.onclick = function(){
    if(isInAnimation){
        alert('正在动画中！');
        return;
    }
    var v = document.getElementById('node-value').value;
    if(isNaN(parseInt(v,10))){
        alert('请输入数字');
        return;
    }
    //这里是parseint，不是v，v的话就是字符串了
    bst.insert(parseInt(v,10));
};

//是否在动画中的标志变量
var isInAnimation = false;
function showAnimation(){
    isInAnimation = true;
    var list = bst.getOrderList();
    var i=0;
    var ret = setInterval(function(){
        if(i == list.length){
            clearInterval(ret);
            isInAnimation = false;
            //恢复最后一个节点的颜色
            var node = document.getElementById(list[list.length-1]);
            node.style.backgroundColor= '#5890AD';
            return;
        }
        //改变当前节点颜色
        var node = document.getElementById(list[i]);
        node.style.backgroundColor= '#B94A48';
        //恢复上一个节点颜色
        if(i>0){
            var prevNode = document.getElementById(list[i-1]);
            prevNode.style.backgroundColor = '#5890AD';
        }
        i++;
    },1000)
}

//先序遍历二叉树
var preButton = document.getElementById('pre');
preButton.onclick = function(){
    if(isInAnimation){
        alert('正在动画中，请稍后');
        return;
    }
    //清空顺序数组
    bst.clearOrderList();
    if(bst.isTreeExist()) {
        bst.preOrderTraverse();
        showAnimation();
    }else{
        alert('树为空!')
    }

};

//中序遍历
var inButton = document.getElementById('in');
inButton.onclick = function(){
    if(isInAnimation){
        alert('正在动画中，请稍后');
        return;
    }
    //清空顺序数组
    bst.clearOrderList();
    if(bst.isTreeExist()) {
        bst.inOrderTraverse();
        showAnimation();
    }else{
        alert('树为空!')
    }
};



//后序遍历
var postButton = document.getElementById('post');
postButton.onclick = function(){
    if(isInAnimation){
        alert('正在动画中，请稍后');
        return;
    }
    //清空顺序数组
    bst.clearOrderList();
    if(bst.isTreeExist()) {
        bst.postOrderTraverse();
        showAnimation();
    }else{
        alert('树为空!')
    }
};

//清空整颗二叉树
var clearButton = document.getElementById('clear');
clearButton.onclick = function(){
    var treeDiv = document.getElementsByClassName('tree')[0];
    while(treeDiv.children.length>0){
        treeDiv.removeChild(treeDiv.children[0]);
    }
    //也要清空二叉树的数据结构
    bst.clearTree();
}
