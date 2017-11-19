//在校生input事件
var schoolDiv = document.getElementById('school');
var workDiv = document.getElementById('work');
var inSchoolRadio = document.getElementById('in-school');
inSchoolRadio.onclick = function(){
    //显示自己的div，隐藏另一个div
    schoolDiv.style.display = 'block';
    workDiv.style.display = 'none';
}
//就业单位input事件
var workRadio = document.getElementById('out-school');
workRadio.onclick = function(){
    //显示自己的div，隐藏另一个div
    schoolDiv.style.display = 'none';
    workDiv.style.display = 'block';
};

//下拉框对应信息对象
var info = {
    '北京':[
        '北京大学',
        '清华大学',
        '北邮'
    ],
    '上海':[
        '复旦大学',
        '上海外国语学院',
        '同济大学'
    ],
    '成都':[
        '四川大学',
        '电子科大',
        '西南财大'
    ]
};
//city下拉框触发事件
var cityDropdown = document.getElementById('city');
cityDropdown.onchange = function(e){
    //获取下拉框的值
    var v = this.value;
    if(info[v]){
        //清空大学下拉框
        var schoolDropdown = document.getElementById('university');
        while(schoolDropdown.children.length>0){
            schoolDropdown.removeChild(schoolDropdown.children[0]);
        }
        //添加对应的节点
        for(var i=0;i<info[v].length;i++){
            var option = document.createElement('option');
            option.innerText = info[v][i];
            schoolDropdown.appendChild(option);
        }
    }
};

window.onload = function(){
    //初始化下拉框
    var initCity = '北京';
    var schoolDropdown = document.getElementById('university');
    for(var i=0;i<info[initCity].length;i++){
        var option = document.createElement('option');
        option.innerText = info[initCity][i];
        schoolDropdown.appendChild(option);
    }
}