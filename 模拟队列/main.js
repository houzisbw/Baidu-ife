/**
 * Created by Administrator on 2017/8/20.
 */
//检测是否输入的是数字,或者利用正则表达式
function isNumber(value){
   var pattern = /^\d+$/;
   return pattern.test(value);
}

//获取输入框的值
function getInput(){
    var value = document.getElementById("text1").value;
    if(!isNumber(value)){
        alert("请输入整数!");
        return;
    }
    return parseInt(value,10);
}

//左侧入
function leftIn(){
    //获取输入框的值
    var value = getInput();
    if(value === undefined) {
        return;
    }
    //生成li元素
    var li = document.createElement("li");
    li.innerText = value;
    //插入元素
    var ul = document.getElementById("list");
    li.onclick = function(){ul.removeChild(this)};
    if(ul.children.length === 0){
        ul.appendChild(li);
    }
    else{
        var refNode = ul.children[0];
        //在ul上插入节点
        ul.insertBefore(li,refNode);
    }
}

//右侧入
function rightIn(){
    //获取输入框的值
    var value = getInput();
    if(value === undefined) {
        return;
    }
    //生成li元素
    var li = document.createElement("li");
    li.innerText = value;
    //插入元素
    var ul = document.getElementById("list");
    li.onclick = function(){ul.removeChild(this)};
    ul.appendChild(li);
}

//左侧出
function leftOut(){
    //判断空队列
    var ul = document.getElementById("list");
    if(ul.children.length === 0){
        alert("队列为空！");
        return;
    }
    var li = ul.children[0];
    ul.removeChild(li);
    alert(li.innerText);
}

//右侧出
function rightOut(){
    //判断空队列
    var ul = document.getElementById("list");
    if(ul.children.length === 0){
        alert("队列为空！");
        return;
    }

    var li = ul.children[ul.children.length-1];
    ul.removeChild(li);
    alert(li.innerText);
}
