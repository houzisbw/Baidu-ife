//移动玩家方块的效果处理是复杂版本的：先执行动画，再删除原方块，再在新格子生成玩家方块
//简单版就是直接移动即可

//玩家初始位置
var initX = 5,initY=5;
//玩家现在位置
var curX,curY;
//初始方向:上1 右2 下3 左4
var dir = 1;
//棋盘长度
var boardLength = 10;
//初始角度
var playerDegree = 0;
//是否在动作中
var isInAnimation = false;
//初始化棋盘
function initBoard(){
    var boardDiv = document.getElementsByClassName('wrap')[0];
    for(var i=0;i<boardLength;i++){
        //建立棋盘上横着的一条div
        var horizontalDiv = document.createElement('div');
        horizontalDiv.setAttribute('class','horizontalDiv');
        for(var j=0;j<boardLength;j++){
            //生成一个棋盘方格
            var square = document.createElement('div');
            square.setAttribute('class','square');
            //设置id,方便获取
            square.setAttribute('id',i+"_"+j);
            horizontalDiv.appendChild(square);

        }
        boardDiv.appendChild(horizontalDiv);
    }

    //初始化玩家位置
    var targetDivId = initX +'_'+ initY;
    var targetDiv = document.getElementById(targetDivId);
    var player = document.createElement('div');
    player.setAttribute('class','player');
    targetDiv.appendChild(player);
    curX = initX;
    curY = initY;
}

initBoard();

//按钮执行指令
var button = document.getElementById('do');
button.onclick = function(){
    if(isInAnimation){
        return;
    }
    //获取input指令
    var v = document.getElementById('input').value;
    if(v == 'GO'){
        //往上方向走
        if(dir == 1){
            var targetSquareX = curX-1;
            var targetSquareY = curY;
            if(targetSquareX>=0){
                //移动玩家
                movePlayer(-1,targetSquareX,targetSquareY,false);
                //更新位置
                curX--;
            }
        //往右走
        }else if(dir==2){
            var targetSquareX = curX;
            var targetSquareY = curY+1;
            if(targetSquareY<boardLength){
                //移动玩家
                movePlayer(-1,targetSquareX,targetSquareY,false);
                //更新位置
                curY++;
            }
        }
        //下
        else if(dir==3){
            var targetSquareX = curX+1;
            var targetSquareY = curY;
            if(targetSquareX<boardLength){
                //移动玩家
                movePlayer(-1,targetSquareX,targetSquareY,false);
                //更新位置
                curX++;
            }
        //左
        }else{
            var targetSquareX = curX;
            var targetSquareY = curY-1;
            if(targetSquareY>=0){
                //移动玩家
                movePlayer(-1,targetSquareX,targetSquareY,false);
                //更新位置
                curY--;
            }
        }
    }else if(v =='TUN LEF'){
        //获取玩家
        var player = document.getElementsByClassName('player')[0];
        var newDegree = playerDegree-90;
        playerDegree -= 90;
        player.style.transform = 'rotate('+newDegree+'deg)';
        dir--;
        if(dir<=0){
            dir=4;
        }
    }else if(v =='TUN RIG'){
        //获取玩家
        var player = document.getElementsByClassName('player')[0];
        var newDegree = playerDegree+90;
        playerDegree += 90;
        player.style.transform = 'rotate('+newDegree+'deg)';
        dir++;
        if(dir>4){
            dir=1;
        }
    }else if(v =='TUN BAC'){
        //获取玩家
        var player = document.getElementsByClassName('player')[0];
        var newDegree = playerDegree+180;
        playerDegree += 180;
        player.style.transform = 'rotate('+newDegree+'deg)';
        var dirArray = [-1,3,4,1,2];
        dir = dirArray[dir];

    }else if(v == 'TRA LEF'){
        var targetSquareX = curX;
        var targetSquareY = curY-1;
        if(targetSquareY>=0){
            //移动玩家
            movePlayer(4,targetSquareX,targetSquareY,true);
        }
    }else if(v == 'TRA RIG'){
        var targetSquareX = curX;
        var targetSquareY = curY+1;
        if(targetSquareY<boardLength){
            //移动玩家
            movePlayer(2,targetSquareX,targetSquareY,true);
        }
    }else if(v == 'TRA TOP'){
        var targetSquareX = curX-1;
        var targetSquareY = curY;
        if(targetSquareX>0){
            //移动玩家
            movePlayer(1,targetSquareX,targetSquareY,true);
        }
    }else if(v == 'TRA BOT'){
        var targetSquareX = curX+1;
        var targetSquareY = curY;
        if(targetSquareX<boardLength){
            //移动玩家
            movePlayer(3,targetSquareX,targetSquareY,true);
        }
    }else if(v == 'MOV LEF'){
        var player = document.getElementsByClassName('player')[0];
        player.style.transform = 'rotate(-90deg)';
        playerDegree = -90;
        setTimeout(function(){
            var targetSquareX = curX;
            var targetSquareY = curY-1;
            if(targetSquareY>=0){
                //移动玩家
                movePlayer(4,targetSquareX,targetSquareY,true);
            }
        },1000);
    }else if(v == 'MOV RIG'){
        var player = document.getElementsByClassName('player')[0];
        player.style.transform = 'rotate(90deg)';
        playerDegree = 90;
        setTimeout(function(){
            var targetSquareX = curX;
            var targetSquareY = curY+1;
            if(targetSquareY<boardLength){
                //移动玩家
                movePlayer(4 ,targetSquareX,targetSquareY,true);
            }
        },1000);
    }else if(v == 'MOV TOP'){
        var player = document.getElementsByClassName('player')[0];
        player.style.transform = 'rotate(0deg)';
        playerDegree = 0;
        setTimeout(function(){
            var targetSquareX = curX-1;
            var targetSquareY = curY;
            if(targetSquareX>0){
                //移动玩家
                movePlayer(1 ,targetSquareX,targetSquareY,true);
            }
        },1000);
    }else if(v == 'MOV BOT'){
        var player = document.getElementsByClassName('player')[0];
        player.style.transform = 'rotate(180deg)';
        playerDegree = 180;
        setTimeout(function(){
            var targetSquareX = curX+1;
            var targetSquareY = curY;
            if(targetSquareX<boardLength){
                //移动玩家
                movePlayer(3 ,targetSquareX,targetSquareY,true);
            }
        },1000);
    }

    else{
        alert('指令非法');
    }
};
//移动玩家，dir是方向，isAnimation是是否开启动画
function movePlayer(dir,tx,ty,isAnimation){
    //获取玩家现在的位置
    var originDiv = document.getElementById(curX + '_' + curY);
    var originPlayer = originDiv.getElementsByClassName('player')[0];
    if(!isAnimation) {
        //生成新的player
        var targetId = tx + '_' + ty;
        var targetDiv = document.getElementById(targetId);
        var player = document.createElement('div');
        player.setAttribute('class', 'player');
        targetDiv.appendChild(player);
        player.style.transform = 'rotate(' + playerDegree + 'deg)';
        //销毁原来的player
        originDiv.removeChild(originPlayer);
    }else{
        isInAnimation = true;
        //获取玩家
        var player = document.getElementsByClassName('player')[0];
        //销毁原来的player,先移动
        var cnt=0;
        var id = setInterval(function(){
            cnt++;
            //注意直接使用style只能获得内嵌样式，如果内嵌没写，则获取不到,但是可以赋值，想要获取则不行
            if(dir === 4) {
                originPlayer.style.left = (parseInt(getComputedStyle(originPlayer).left, 10) - 1) + 'px';
            }else if(dir === 1){
                originPlayer.style.top = (parseInt(getComputedStyle(originPlayer).top, 10) - 1) + 'px';
            }else if (dir===2){
                originPlayer.style.left = (parseInt(getComputedStyle(originPlayer).left, 10) + 1) + 'px';
            }else{
                originPlayer.style.top = (parseInt(getComputedStyle(originPlayer).top, 10) + 1) + 'px';
            }
            //移动完成
            if(cnt>50){
                clearInterval(id);
                originDiv.removeChild(originPlayer);
            }
        },20);

        //添加动画效果
        setTimeout(function(){
            //生成新的player
            var targetId = tx+'_'+ty;
            var targetDiv = document.getElementById(targetId);
            var player = document.createElement('div');
            player.setAttribute('class','player');
            targetDiv.appendChild(player);
            player.style.transform = 'rotate('+playerDegree+'deg)';
            isInAnimation = false;
            if(dir===4){
                curY--;
            }else if(dir===3){
                curX++;
            }else if(dir===2){
                curY++;
            }else{
                curX--;
            }
        },1000)
    }
}
