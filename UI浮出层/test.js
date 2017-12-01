//浮出层,最后一个参数是确定按钮的处理函数
function showModal(title,content,modalWidth,modalMinHeight,confirmFunc){
    //遮罩
    var overlay = document.createElement('div');
    overlay.setAttribute('class','overlay');
    //modal
    var modal = document.createElement('div');
    modal.setAttribute('class','modal');
    overlay.appendChild(modal);
    modal.onclick = function(e){
        e.stopPropagation();
    }
    //设置modal宽度高度
    if(modalMinHeight <=300){
        modalMinHeight=300;
    }
    if(modalWidth<=300){
        modalWidth=300;
    }
    modal.style.width = modalWidth+'px';
    modal.style.height = modalMinHeight+'px';

    //title
    var titleDiv = document.createElement('div');
    titleDiv.setAttribute('class','title');
    var titleTextNode = document.createTextNode(title);
    titleDiv.appendChild(titleTextNode);
    modal.appendChild(titleDiv);
    //content
    var contentDiv = document.createElement('div');
    contentDiv.setAttribute('class','content');
    var contentTextNode = document.createTextNode(content);
    contentDiv.appendChild(contentTextNode);
    modal.appendChild(contentDiv);
    //confirm
    var confirm = document.createElement('div');
    confirm.setAttribute('class','confirm');
    var textNode = document.createTextNode('确定');
    confirm.appendChild(textNode)
    confirm.onclick = function(){
        confirmFunc();
        document.body.removeChild(overlay);
    };
    modal.appendChild(confirm)
    //cancel
    var cancel = document.createElement('div');
    cancel.setAttribute('class','cancel');
    var textNode = document.createTextNode('取消');
    cancel.appendChild(textNode)
    cancel.onclick = function(){
        document.body.removeChild(overlay)
    }
    modal.appendChild(cancel)


    overlay.onclick = function(){
        document.body.removeChild(this);
    };
    document.body.appendChild(overlay);
}

function modalConfirm(){
    alert(1);
}

showModal('sdfdsfdsf','ddddddddddddddddddddddd',600,300,modalConfirm);