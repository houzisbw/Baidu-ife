var textarea = document.getElementById('text');
var button = document.getElementById('search');
button.onclick = function(){
    var value = textarea.value;
    //利用split的正则用法
    var regex = /[\s,，、]/;
    //使用split获取各个内容,是一个数组
    var result = value.split(regex);
    //获取查询词
    var searchWord = document.getElementById('input').value;
    //查询每一个内容看是否包含查询词
    var ul = document.getElementById('re');
    for(var i=0;i<result.length;i++){
        var t = result[i];
        //该内容中找到查询词
        if(t.indexOf(searchWord)!==-1){
            //标志原来textarea中的相应内容
            var li = document.createElement('li');
            li.innerHTML = t;
            ul.appendChild(li);
        }
    }

}

