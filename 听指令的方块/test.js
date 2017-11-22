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
    //获取input指令
    var v = document.getElementById('input').value;
    if(v == 'GO'){
        //往上方向走
        if(dir == 1){
            var targetSquareX = curX-1;
            var targetSquareY = curY;
            if(targetSquareX>=0){
                //移动玩家
                movePlayer(targetSquareX,targetSquareY);
                //更新位置
                curX--;
            }
        //往右走
        }else if(dir==2){
            var targetSquareX = curX;
            var targetSquareY = curY+1;
            if(targetSquareY<boardLength){
                //移动玩家
                movePlayer(targetSquareX,targetSquareY);
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
                movePlayer(targetSquareX,targetSquareY);
                //更新位置
                curX++;
            }
        //左
        }else{
            var targetSquareX = curX;
            var targetSquareY = curY-1;
            if(targetSquareY>=0){
                //移动玩家
                movePlayer(targetSquareX,targetSquareY);
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

    }else{
        alert('指令非法');
    }
};

function movePlayer(tx,ty){
    //生成新的player
    var targetId = tx+'_'+ty;
    var targetDiv = document.getElementById(targetId);
    var player = document.createElement('div');
    player.setAttribute('class','player');
    targetDiv.appendChild(player);
    player.style.transform = 'rotate('+playerDegree+'deg)';

    //销毁原来的player
    var originDiv = document.getElementById(curX+'_'+curY);
    var originPlayer = originDiv.getElementsByClassName('player')[0];
    originDiv.removeChild(originPlayer);
}