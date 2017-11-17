//国家下拉框处理
var countryDropdown = document.getElementById('country-down');
var countryInputDiv = document.getElementById('country-input-div');
var countryDiv = document.getElementById('country-div');
countryDropdown.onclick = function(){

    if(getComputedStyle(countryDiv).display == 'none'){
        countryDiv.style.display = 'block';
        countryInputDiv.style.borderLeft= '1px solid #B94A48';
        countryInputDiv.style.borderTop= '1px solid #B94A48';
        countryInputDiv.style.borderRight= '1px solid #B94A48';
    }else{
        countryDiv.style.display = 'none';
        countryInputDiv.style.borderLeft= 'none';
        countryInputDiv.style.borderTop= 'none';
        countryInputDiv.style.borderRight= 'none';
    }
}

//每个li点击响应事件
var countryLi = document.getElementById('country-div').getElementsByTagName('li');
var countryInput = document.getElementById('country-input');
for(var i=0;i<countryLi.length;i++){
    (function(i){
        countryLi[i].onclick = function(){
            countryInput.value = this.innerHTML;
            //隐藏div
            countryDiv.style.display = 'none';
            countryInputDiv.style.borderLeft= 'none';
            countryInputDiv.style.borderTop= 'none';
            countryInputDiv.style.borderRight= 'none';
        }
    })(i);

}

//hover时隐藏下面文字
var activityPicList = document.getElementsByClassName('activity-pic');
for(var i=0;i<activityPicList.length;i++){
    (function(i){
        activityPicList[i].onmouseover = function(){
            var word = this.getElementsByClassName('activity-word')[0];
            word.style.display = 'none';
        }
        activityPicList[i].onmouseout = function(){
            var word = this.getElementsByClassName('activity-word')[0];
            word.style.display = 'block';
        }
    })(i);
}
