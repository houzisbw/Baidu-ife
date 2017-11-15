//表单获得焦点时，显示下方提示文字
var inputElements = document.getElementsByTagName('input');
//提示文字
var defaultWord = [
    '必填，长度为4-16个字符，中文字符算2个',
    '必须包含数字和字母，长度至少6个字符',
    '重复上面的密码',
    '请填写自己的邮箱',
    '请填写自己的手机号'
];
var wrongWord = [
    '名称错误',
    '密码错误',
    '2次密码不一致',
    '邮箱格式有误',
    '手机号格式有误'
];
var rightWord = [
    '名称可用',
    '密码可用',
    '密码一致',
    '邮箱正确',
    '手机号正确'
];
var checkType = [
    'name',
    'pwd',
    'pwdAgain',
    'email',
    'phone'
];

function checkIsValid(type,value){
    if(type=='name'){
        var regExp = /[^\x00-\xff]/,
            len=0;
        for(var i=0;i<value.length;i++){
            if(regExp.test(value[i])){
                len+=2;
            }else{
                len++;
            }
        }
        if(len<4 || len>16){
            return false;
        }
        return true;
    }else if(type=='pwd'){
        var regExp = /^[0-9a-zA-Z]{6,}$/;
        if(regExp.test(value)){
            return true;
        }
        return false;
    }else if(type == 'pwdAgain'){
        //获取密码input的值
        var pwdInputValue = document.getElementById('pwd').value;
        if(value == pwdInputValue && pwdInputValue!==''){
            return true;
        }
        return false;
    }
    else if(type == 'email'){
        var regExp = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
        if(regExp.test(value)){
            return true;
        }
        return false;
    }
    else{
        var regExp = /^1[34578]\d{9}$/;
        if(regExp.test(value)){
            return true;
        }
        return false;
    }
}

for(var i=0;i<inputElements.length;i++){
    var input = inputElements[i];
    (function(i,input){
        input.onblur = function(){
            //隐藏文字显示,注意nextSibling会包含text节点，所以要用nextElementSibling取得元素节点
            var prompt = this.parentNode.parentNode.nextElementSibling;
            prompt.style.display = 'none';
            //执行检查函数
            var v = this.value;
            if(checkIsValid(checkType[i],v)){
                //绿色边框
                this.style.border = '1px solid green';
                //显示提示文字
                prompt.style.display = 'block';
                prompt.style.color = 'green';
                prompt.innerHTML = rightWord[i];
            }else{
                //红色边框
                this.style.border = '1px solid red';
                //显示提示文字
                prompt.style.display = 'block';
                prompt.style.color = 'red';
                prompt.innerHTML = wrongWord[i];
            }
        }

    })(i,input);//分号不能少，否则和下面的连起来出错
    (function(i,input){
        input.onfocus = function(){
            //显示文字
            var prompt = this.parentNode.parentNode.nextElementSibling;
            prompt.style.color = '#888888';
            this.style.border = 'none';
            prompt.style.display = 'block';
            prompt.innerHTML = defaultWord[i];
        }
    })(i,input)
}

//点击提交
var submit = document.getElementById('submit');
submit.onclick = function(){
    var result = '';
    for(var i=0;i<inputElements.length;i++) {
        var input = inputElements[i];
        var prompt = input.parentNode.parentNode.nextElementSibling;
        prompt.style.display = 'none';
        //执行检查函数
        var v = input.value;
        if(checkIsValid(checkType[i],v)){
            //绿色边框
            input.style.border = '1px solid green';
            //显示提示文字
            prompt.style.display = 'block';
            prompt.style.color = 'green';
            prompt.innerHTML = rightWord[i];
        }else{
            //红色边框
            input.style.border = '1px solid red';
            //显示提示文字
            prompt.style.display = 'block';
            prompt.style.color = 'red';
            prompt.innerHTML = wrongWord[i];
            result+=wrongWord[i]+' ';
        }
    }
    alert(wrongWord)
}