//侧栏点击显示子栏
//获取一级栏目
$('.top-level').click(function(){
    //还要判断是否在动画中
    //获取下一个相邻元素(子元素),然后点击显示，再点击隐藏
    if($(this).next().is(':hidden')){
        //隐藏所有的一级栏目
        $('.top-level-sub').each(function(index,ele){
            $(ele).slideUp('slow');
        })
        $('.top-level').each(function(index,ele){
            $(ele).removeClass('aside-active');
        });
        //显示当前的二级栏目
        $(this).next().addClass('aside-active');
        $(this).addClass('aside-active');
        $(this).next().slideDown('slow');
    }else{
        $(this).next().slideUp('slow');
        //改变背景颜色
        $(this).removeClass('aside-active');
        $(this).next().removeClass('aside-active');
    }

});

//获取二级栏目
$('.second-level').click(function(){
    var next = $(this).next();
    //获取class名字
    var className = next.attr('class');
    //如果存在子栏
    if(className === 'second-level-sub'){

        if(next.is(':hidden')){
            //修改箭头符号：改为向下,find用于获取子元素,注意这里的参数要带px
            $(this).find('.arrow-left').css('background',"url('./images/arrow.png') 0 -28px no-repeat");
            //修改文件夹
            $(this).find('.folder-close').css('background',"url('./images/folder-white.png') 0 0 no-repeat")
            next.show('slow');
        }else{
            next.hide('slow');
            $(this).find('.arrow-left').css('background',"url('./images/arrow.png') 0 0 no-repeat");
            //修改文件夹
            $(this).find('.folder-close').css('background',"url('./images/folder-grey.png') 0 0 no-repeat")
        }

    }
});


//选项卡点击切换
$('.tabs').find('li').click(function(){
    //切换选项卡区域
    $(this).siblings().removeClass('tab-active');
    $(this).addClass('tab-active');
    //切换内容区域
    //获取点击的tab的index
    var currentTabIndex = $(this).index();
    //找到对应index的div
    $('.tab-1').addClass('tab-hide');
    $('.tab-1').eq(currentTabIndex).show().siblings().hide();


});


