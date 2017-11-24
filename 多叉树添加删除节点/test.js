//获取根节点
var root = document.getElementsByClassName('root')[0];

//初始化点击选中方法
//获取所有div node
var divs = document.getElementsByTagName('div');
//选中的节点
var selectedNode = null;
for(var i=0;i<divs.length;i++){
    divs[i].onclick = function(e){
        //禁止事件冒泡
        e.stopPropagation();
        this.style.backgroundColor = 'red';
        //保存选中节点
        selectedNode = this;
        //其他divs恢复颜色
        for(var j=0;j<divs.length;j++){
            if(divs[j]!==this) {
                divs[j].style.backgroundColor = '#fff';
            }
        }
    }
}
//取消选中节点
document.body.onclick = function(){
    selectedNode = null;
    //其他divs恢复颜色
    for(var j=0;j<divs.length;j++){
        divs[j].style.backgroundColor = '#fff';
    }
}

//删除
var deleteButton  = document.getElementById('remove');
deleteButton.onclick = function(){
    if(selectedNode == null){
        alert('请选中节点')
    }else{
        var parent = selectedNode.parentNode;
        parent.removeChild(selectedNode);
    }
}

//添加节点
var addButton = document.getElementById('addNode');
addButton.onclick = function(e){
    if(!selectedNode){
        alert('请选中一个节点');
        return;
    }

    var v = document.getElementById('add').value;
    if(!v){
        alert('请输入添加节点的内容');
    }else{
        var addDiv = document.createElement('div');
        addDiv.innerText = v;
        addDiv.setAttribute('class','addDiv');
        addDiv.onclick = function(e){
            //禁止事件冒泡
            e.stopPropagation();
            this.style.backgroundColor = 'red';
            //保存选中节点
            selectedNode = this;
            //其他divs恢复颜色
            for(var j=0;j<divs.length;j++){
                if(divs[j]!==this) {
                    divs[j].style.backgroundColor = '#fff';
                }
            }
        }
        selectedNode.appendChild(addDiv)
    }
}


