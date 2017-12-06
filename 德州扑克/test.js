//卡牌类
function TexasPoker(){
    var cardType =[
        '皇家同花顺',
        '同花顺',
        '四条',
        '葫芦',
        '同花',
        '顺子',
        '三条',
        '两对',
        '一对',
        '高牌'
    ];
    //卡牌
    //color的1,2,3,4代表红桃，黑桃，梅花，方片
    //value的1-13从小到大代表2,3,4,5,6,7,8,9,10,J,Q,K,A
    var Card = function(color,value){
       this.color = color;
       this.value = value;
    }
    //卡牌池
    var cardPool = [];
    //一整副卡牌
    var allCardPool = [];

    //返回随机一张卡牌
    this.getRandomCard = function(){
       var color = Math.floor(Math.random()*4)+1;
       var value = Math.floor(Math.random()*13)+1;
       return new Card(color,value);
    }
    //初始化一整副卡牌
    this.initAllCardPool = function(){
       //生成52张牌
        for(var i=1;i<=4;i++){
           for(var j=1;j<=13;j++){
              var card = new Card(i,j);
              allCardPool.push(card);
           }
        }
    }
    //初始化卡牌池，随机5-7张牌
    this.initCardPool = function(){
       cardPool = [];
       if(cardPool.length<=7){
           //随机牌数量
           var cardNum = 5 + Math.floor(Math.random()*3);
           //从卡牌池中抽取相应数量的卡牌
           var cnt=0;
           while(1){
              var index = Math.floor(Math.random()*52);
              var card = allCardPool[index];
              var canSelect = true;
              for(var i=0;i<cardPool.length;i++){
                 if(cardPool[i].color === card.color && cardPool[i].value === card.value){
                     canSelect = false;
                     break;
                 }
              }
              if(canSelect){
                 cardPool.push(card);
                 cnt++;
              }
              if(cnt ===cardNum){
                 break;
              }
           }
           // cardPool.push(new Card(1,6))
           // cardPool.push(new Card(2,4))
           // cardPool.push(new Card(3,3))
           // cardPool.push(new Card(4,2))
           // cardPool.push(new Card(1,1))


       }else{
          alert('初始化出错');
       }
    }

    //构建卡牌
    function constructCardHtml(cardObj){
        var cardLi = $('<li></li>');
        var span = $('<span></span>');
        var finalText = cardObj.value;
        if(cardObj.value <=9){
            finalText = cardObj.value+1;
        }else if(cardObj.value === 10){
            finalText = 'J'
        }
        else if(cardObj.value === 11){
            finalText = 'Q'
        }
        else if(cardObj.value === 12){
            finalText = 'K'
        }
        else if(cardObj.value === 13){
            finalText = 'A'
        }
        span.text(finalText);
        cardLi.append(span);
        if(cardObj.color === 1){
            cardLi.css('background','url(./images/heart.png) 20% 20% no-repeat #fff');
            cardLi.css('color','#FF2E21')
        }else if(cardObj.color === 2){
            cardLi.css('background','url(./images/spade.png) 20% 20% no-repeat #fff');

        }
        else if(cardObj.color === 3){
            cardLi.css('background','url(./images/club.png) 20% 20% no-repeat #fff');
        }
        else if(cardObj.color === 4){
            cardLi.css('background','url(./images/diamond.png) 20% 20% no-repeat #fff');
            cardLi.css('color','#FF2E21')
        }
        return cardLi;
    }
    //展示卡牌池
    this.showCard = function(){
       for(var i=0;i<cardPool.length;i++){
           var cardLi = constructCardHtml(cardPool[i]);
           $('.card ul.card-pool').append(cardLi);
       }
    }
    //展示选出的5张牌
    this.showFiveCard = function(cardArr){
        for(var i=0;i<cardArr.length;i++){
            var cardLi = constructCardHtml(cardArr[i]);
            $('.card ul.five-card-ul').append(cardLi);
        }
    };
    //降序排序
    function sortByValue(a,b){
        return b.value - a.value;
    }
    //检测是否存在5张同一花色的牌
    function isSameColorOf5(cardArray){
       var arr = [0,0,0,0];
       for(var i=0;i<cardArray.length;i++){
          var color = cardArray[i].color;
          arr[color-1]++;
          if(arr[color-1] === 5){
             return {
                'isSame':true,
                 'color':color
             };
          }
       }
       return {
           'isSame':false,
           'color':-1
       };
    }
    //是否是4条
    function isFourSameAndOne(cardArray){
       var arr = [0,0,0,0,0,0,0,0,0,0,0,0,0];
       var is = false,fourCardIndex = -1;
       for(var i=0;i<cardArray.length;i++){
          arr[cardArray[i].value-1]++;
          if(arr[cardArray[i].value-1] === 4){
            is = true;
            fourCardIndex = i;
          }
       }
       if(is){
          //找到4个相同的以及剩余最大的一个单牌
           var maxCardValue = -1,maxCardIndex;
           var ret = [];
           for(var i=0;i<cardArray.length;i++){
               if(cardArray[i].value !== cardArray[fourCardIndex].value && cardArray[i].value > maxCardValue){
                   maxCardValue = cardArray[i].value;
                   maxCardIndex = i;
               }
               if(cardArray[i].value === cardArray[fourCardIndex].value){
                  ret.push(cardArray[i]);
               }
           }
           ret.push(cardArray[maxCardIndex]);

           //让cardArray也改变
           cardArray = ret;

           return {
               is:true,
               card:ret
           }
       }else{
          return {
             is:false,
              card:[]
          }
       }
    }
    //是否是3条
    function isThree(cardArray){
        var arr = [0,0,0,0,0,0,0,0,0,0,0,0,0];
        for(var i=0;i<cardArray.length;i++){
            arr[cardArray[i].value-1]++;
        }
        var three = false,threeValue;
        for(var i=0;i<arr.length;i++){
            if(arr[i]===3) {
               threeValue = i+1;
               three= true;
            }
        }
        //选取剩余的最大2个单张
        if(three) {
            var remainCard = [];
            var ret = [];
            for (var i = 0; i < cardArray.length; i++) {
                if (cardArray[i].value !== threeValue) {
                    remainCard.push(cardArray[i]);
                }else{
                   ret.push(cardArray[i]);
                }
            }
            remainCard.sort(sortByValue);
            ret.push(remainCard[0]);
            ret.push(remainCard[1]);

            return {
               is:true,
                card:ret
            }
        }else{
            return {
                is:false,
                card:[]
            }
        }

    }
    //是否是两对
    function isDouble(cardArray){
        var arr = [0,0,0,0,0,0,0,0,0,0,0,0,0];
        var valueArr = [],ret=[];
        for(var i=0;i<cardArray.length;i++){
            arr[cardArray[i].value-1]++;
        }
        var cnt= 0;
        for(var i=0;i<arr.length;i++){
            if(arr[i]===2) {
               cnt++;
               valueArr.push(i+1);
            }
        }
        if(cnt>=2){
            var maxSingleValue = -1;
            //找出最大的对子
            for(var i=0;i<cardArray.length;i++){
               if(cardArray[i].value === valueArr[valueArr.length-1]){
                  ret.push(cardArray[i]);
               }
               //找出最大的单张
               if(cardArray[i].value !== valueArr[valueArr.length-1] && cardArray[i].value !== valueArr[valueArr.length-2]){
                  if(cardArray[i].value >= maxSingleValue){
                     maxSingleValue = cardArray[i].value;
                  }
               }
            }
            //找出次大的对子
            for(var i=0;i<cardArray.length;i++){
                if(cardArray[i].value === valueArr[valueArr.length-2]){
                    ret.push(cardArray[i]);
                }
            }
            //单张
            for(var i=0;i<cardArray.length;i++){
               if(cardArray[i].value === maxSingleValue){
                   ret.push(cardArray[i]);
               }
            }
            return {
               is:true,
                card:ret
            }

        }else{
            return {
                is:false,
                card:[]
            }
        }
    }
    //是否是一对
    function isTwo(cardArray){
        var arr = [0,0,0,0,0,0,0,0,0,0,0,0,0];
        var ret = [];
        for(var i=0;i<cardArray.length;i++){
            arr[cardArray[i].value-1]++;
        }
        var cnt= 0,twoValue;
        for(var i=0;i<arr.length;i++){
            if(arr[i]===2) {
                cnt++;
                twoValue = i+1;
            }
        }
        if(cnt>=1){
            var remainCard = [];
            for(var i=0;i<cardArray.length;i++){
               if(cardArray[i].value === twoValue){
                   ret.push(cardArray[i]);
               }else{
                   remainCard.push(cardArray[i]);
               }
            }
            //找出剩余最大的3张牌
            remainCard.sort(sortByValue);
            ret.push(remainCard[0]);
            ret.push(remainCard[1]);
            ret.push(remainCard[2]);

            return {
               is:true,
                card:ret
            }

        }else{
            return {
                is:false,
                card:[]
            }
        }
    }
    //是否是葫芦：3同张+对子，A-A-A-7-7
    function isHouse(cardArray){
        var arr = [0,0,0,0,0,0,0,0,0,0,0,0,0];
        for(var i=0;i<cardArray.length;i++){
            arr[cardArray[i].value-1]++;
        }
        var three = false,two=false,
            threeValue,twoValue;
        var ret = [];
        var maxTwoValue = -1;
        for(var i=0;i<arr.length;i++){
           if(arr[i]===3) {
              three= true;
              threeValue = i+1;
           }
           if(arr[i]===2) {
               two= true;
               twoValue = i+1;
               if(twoValue>maxTwoValue){
                   maxTwoValue = twoValue;
               }
           }
        }
        if(three && two){
            //先放3个相同的，再放2个相同的
            for(var i=0;i<cardArray.length;i++){
                 if(cardArray[i].value === threeValue){
                    ret.push(cardArray[i]);
                 }
            }
            for(var i=0;i<cardArray.length;i++){
                if(cardArray[i].value === maxTwoValue){
                    ret.push(cardArray[i]);
                }
            }

            return {
               is:true,
                card:ret
            };
        }
        return {
            is:false,
            card:[]
        };

    }
    //是否是顺子
    function isConsecutiveCard(cardArray){
        //判断是否是顺子
        var uniqueCard = [];
        for(var i=0;i<cardArray.length;i++){
            var canInsert = true;
            for(var j=0;j<uniqueCard.length;j++){
                if(uniqueCard[j].value === cardArray[i].value){
                    canInsert=false;
                }
            }
            if(canInsert){
                uniqueCard.push(cardArray[i]);
            }
        }
        if(uniqueCard.length<5){
            return {
                is:false,
                card:[]
            };
        }
        uniqueCard.sort(sortByValue);
        var len = uniqueCard.length;
        //依次检测顺子
        var isConsecutive = false;
        var index = 0,cnt=0;
        for(var j=0;j<=len-5;j++){
            //是顺子
            if(uniqueCard[j].value - uniqueCard[j+4].value === 4){
                isConsecutive = true;
                if(!cnt){
                   index=j;
                }
                cnt++;
            }
        }
        //是顺子
        if(isConsecutive){
            return {
                is:true,
                card:uniqueCard.slice(index,5+index)
            };
        }
        //不是连续
        else{
            //也有可能是顺子，如A-10-8-5-4-3-2,其中A-2-3-4-5组成顺子
            if(uniqueCard[0].value === 13 && (uniqueCard[len-4].value - uniqueCard[len-1].value === 3) && uniqueCard[len-1].value === 2){
                return {
                    is:true,
                    card:[uniqueCard[len-4],uniqueCard[len-3],uniqueCard[len-2],uniqueCard[len-1],uniqueCard[0]]
                };
            }
            return {
               is:false,
               card:[]
            }
        }
    }

    //牌型判定，参数是手牌数组
    function judge(cardArray){
        //检测函数：检测有没有5张同一花色的牌,5-7选5
        var isSameObj = isSameColorOf5(cardArray);
        //可能的牌型：皇家同花顺，同花顺，同花
        if(isSameObj.isSame){
            //找出同花的牌(大于等于5张)
            var sameColorCard = [];
            for(var i=0;i<cardArray.length;i++){
                if(cardArray[i].color === isSameObj.color){
                    sameColorCard.push(cardArray[i]);
                }
            }
            sameColorCard.sort(sortByValue);
            var len = sameColorCard.length;
            //依次检测顺子
            //是否连续
            var isConsecutive = false;
            var cnt = 0,consecutiveIndex = 0;
            for(var j=0;j<=len-5;j++){
                //是顺子
                if(sameColorCard[j].value - sameColorCard[j+4].value === 4){
                    //是皇家同花顺
                    if(j===0 && sameColorCard[j].value === 13){
                        //返回牌型以及具体的牌
                        //排序，重要，否则结果有问题,形参排序会影响实参，因为是数组
                        cardArray.splice(0,cardArray.length);
                        for(var i=0;i<sameColorCard.slice(0,5).length;i++){
                            cardArray.push(sameColorCard.slice(0,5)[i]);
                        }
                        return {
                            cardType:cardType[0],
                            card:sameColorCard.slice(0,5)
                        };
                    }
                    isConsecutive = true;
                    //记录下最大的顺子
                    if(!cnt){
                        consecutiveIndex = j;
                    }
                    cnt++;
                }
            }
            //是顺子，则返回同花顺(最大的)
            if(isConsecutive){
                //排序，重要，否则结果有问题,形参排序会影响实参，因为是数组
                cardArray.splice(0,cardArray.length);
                for(var i=0;i<sameColorCard.slice(consecutiveIndex,5+consecutiveIndex).length;i++){
                    cardArray.push(sameColorCard.slice(consecutiveIndex,5+consecutiveIndex)[i]);
                }
                return {
                    cardType:cardType[1],
                    card:sameColorCard.slice(consecutiveIndex,5+consecutiveIndex)
                };
            }
            else{
                //也有可能是同花顺，如A-10-8-5-4-3-2,其中A-2-3-4-5组成顺子
                if(sameColorCard[0].value === 13 && (sameColorCard[len-4].value - sameColorCard[len-1].value === 3) && sameColorCard[len-1].value === 1){
                    //排序，重要，否则结果有问题,形参排序会影响实参，因为是数组
                    var ret = [sameColorCard[len-4],sameColorCard[len-3],sameColorCard[len-2],sameColorCard[len-1],sameColorCard[0]];
                    cardArray.splice(0,cardArray.length);
                    for(var i=0;i<ret.length;i++){
                        cardArray.push(ret[i]);
                    }
                    return {
                        cardType:cardType[1],
                        card:ret
                    };
                }
                //同花
                //排序，重要，否则结果有问题,形参排序会影响实参，因为是数组
                cardArray.splice(0,cardArray.length);
                for(var i=0;i<sameColorCard.slice(0,5).length;i++){
                    cardArray.push(sameColorCard.slice(0,5)[i]);
                }
                return {
                    cardType:cardType[4],
                    card:sameColorCard.slice(0,5)
                };

            }

            //牌型没有同花了
        }else{
            //是否是一般的顺子
            var isConsec = isConsecutiveCard(cardArray);
            if(isConsec.is){
                //排序，重要，否则结果有问题,形参排序会影响实参，因为是数组
                cardArray.splice(0,cardArray.length);
                for(var i=0;i<isConsec.card.length;i++){
                    cardArray.push(isConsec.card[i]);
                }
                return {
                    cardType:cardType[5],
                    card:isConsec.card
                };
            }
            //是否是4条
            var isFour = isFourSameAndOne(cardArray);
            if(isFour.is){
                //排序，重要，否则结果有问题
                cardArray.splice(0,cardArray.length);
                for(var i=0;i<isFour.card.length;i++){
                    cardArray.push(isFour.card[i]);
                }
                return {
                    cardType:cardType[2],
                    card:isFour.card
                };
            }
            //是否是3-2
            var isHouseCard = isHouse(cardArray);
            if(isHouseCard.is){
                //排序，重要，否则结果有问题
                cardArray.splice(0,cardArray.length);
                for(var i=0;i<isHouseCard.card.length;i++){
                    cardArray.push(isHouseCard.card[i]);
                }
                return {
                    cardType:cardType[3],
                    card:isHouseCard.card
                };
            }
            //是否是3张一样的带2个单
            var isThreeCard = isThree(cardArray);
            if(isThreeCard.is){
                //排序，重要，否则结果有问题
                cardArray.splice(0,cardArray.length);
                for(var i=0;i<isThreeCard.card.length;i++){
                    cardArray.push(isThreeCard.card[i]);
                }
                return {
                    cardType:cardType[6],
                    card:isThreeCard.card
                };
            }
            //是否是2对子一个单张
            var isDoubleCard = isDouble(cardArray);
            if(isDoubleCard.is){
                //排序，重要，否则结果有问题
                cardArray.splice(0,cardArray.length);
                for(var i=0;i<isDoubleCard.card.length;i++){
                    cardArray.push(isDoubleCard.card[i]);
                }
                return {
                    cardType:cardType[7],
                    card:isDoubleCard.card
                };
            }
            //是否是一个对子
            var isTwoCard = isTwo(cardArray);
            if(isTwoCard.is){
                //排序，重要，否则结果有问题
                cardArray.splice(0,cardArray.length);
                for(var i=0;i<isTwoCard.card.length;i++){
                    cardArray.push(isTwoCard.card[i]);
                }
                return {
                    cardType:cardType[8],
                    card:isTwoCard.card
                };
            }
            //高牌,找出最大的五张,由于cardArray是形参数组，直接操作会改变实际的值
            cardArray.sort(sortByValue);
            return {
                cardType:cardType[9],
                card:cardArray.slice(0,5)
            };
        }

    }
    //牌型判定,返回哪一种牌型以及5张具体的牌,这个函数是判定所有牌，内置cardPool的
    this.judgeCardType = function(){
         return judge(cardPool);
    };
    //牌型判定，参数是外部手牌数组,返回对应的值,isValueOrName为true时返回名字，否则返回数字
    this.judgeCardWithParam = function(cardArray,isValueOrName){
        var valueObj = {
            '皇家同花顺':10,
            '同花顺':9,
            '四条':8,
            '葫芦':7,
            '同花':6,
            '顺子':5,
            '三条':4,
            '两对':3,
            '一对':2,
            '高牌':1
        };
        var name = judge(cardArray).cardType;
        var value = valueObj[name];
        if(isValueOrName){
            return name;
        }else{
            return value;
        }

    };
    var that = this;
    //牌面大小判定,参数是一个手牌数组，每个元素是一个5个牌的数组,参数由外部传入
    this.judgeCardPower = function(allCardArray){
         //排序函数,升序排序，从小到大
         function sortCard(cardA,cardB){
              var cardAValue =  that.judgeCardWithParam(cardA,false),
                  cardBValue =  that.judgeCardWithParam(cardB,false);
              //先判定牌型，直接决定大小等级,牌型一样依次比较每张牌大小
              if(cardAValue === cardBValue){
                  for(var i=0;i<5;i++){
                     if(cardA[i].value !== cardB[i].value){
                         return cardA[i].value - cardB[i].value;
                     }
                  }
                  //相等
                  return 0;
              }
              return cardAValue - cardBValue;
         }

         allCardArray.sort(sortCard);
         //
         for(var i=0;i<allCardArray.length;i++){
             that.judgeCardWithParam(allCardArray[i],false);
         }
         return allCardArray;
    }

}


//测试
var tp = new TexasPoker();
tp.initAllCardPool();
tp.initCardPool();
tp.showCard();
var card = tp.judgeCardType();
$('.card-type').text(card.cardType);
//显示5张最佳牌,该牌型里面最大的牌
var cardArray = card.card;
tp.showFiveCard(cardArray);

//生成多副手牌，每副5张
function generateSomeCards(num){
   var ret = [];
   for(var i=0;i<num;i++){
      var temp = [];
      for(var j=0;j<5;j++){
         var card = tp.getRandomCard();
         temp.push(card);
      }
      ret.push(temp);
   }
   return ret;
}

//计算牌面大小，升序排列
// var cards = generateSomeCards(4);
// var ret= tp.judgeCardPower(cards);
// for(var i=0;i<ret.length;i++){
//    console.log(tp.judgeCardWithParam(ret[i],true));
//    console.log(ret[i]);
//    console.log(' ');
// }




//计数器
// var cnt = 0;
// var double = 0;
// var id = setInterval(function(){
//     cnt++;
//     tp.initCardPool();
//     var cardType = tp.judgeCardType();
//     $('.card ul').empty();
//     tp.showCard();
//     $('.card-type').text(cardType);
//     if(cardType === '高牌') double++;
//     if(cardType === '同花顺' || cardType === '皇家同花顺'){
//        clearInterval(id);
//        alert((double/cnt).toFixed(2));
//     }
// },10);

