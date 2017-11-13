/**
 * Created by Administrator on 2017/11/13.
 */
function checkName(){
    var inputValue = document.getElementById('name-input').value;
    var len = 0;
    //匹配双字节字符,中文和中文字符
    var regExp = /[^\x00-\xff]/;
    for(var i=0;i<inputValue.length;i++){
        var t = inputValue[i];
        if(regExp.test(t)){
            len+=2;
        }else{
            len++;
        }
    }

    var noticeWord = document.getElementById('notice');
    if(len<4 || len>16){
        noticeWord.style.color = 'red';
        if(len == 0){
            noticeWord.innerText = '姓名不能为空'
        }else {
            noticeWord.innerText = '长度小于4或者大于16'
        }
    }else{
        noticeWord.style.color = 'green';
        noticeWord.innerText = '姓名格式正确'
    }
}