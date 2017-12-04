/**
 * Created by Administrator on 2017/12/4.
 */
//行成一个局部作用域
;(function($){
    //在jquery的对象方法上扩展
    $.fn.extend({
        "createSortableTable":function(options){
            //保存this
            var innerThis = $(this);
            //使用传递的参数覆盖默认的参数
            options = $.extend({
                tableHead:['姓名','语文','数学','英语','总分'],
                tableRow:[
                    ['小明',80,90,70,240],
                    ['小红',90,60,90,240],
                    ['小亮',60,100,70,230]
                ],
                //序号，从0开始的列序号
                sortableCol:[1,2],
                //排序函数
                sortFunc:{
                    sortUp:function(a,b){
                        return a-b;
                    },
                    sortDown:function(a,b){
                        return b-a;
                    }
                }
            },options);
            //添加行的函数
            function addRow(table){
                //清空数据行
                $('.table tr:gt(0)',innerThis).empty();
                //添加行
                for(var i=0;i<options.tableRow.length;i++){
                    var tr = $('<tr></tr>');
                    var rowData = options.tableRow[i];
                    for(var j=0;j<rowData.length;j++){
                        var td = $('<td></td>');
                        td.text(rowData[j]);
                        td.addClass('table-td');
                        tr.append(td);
                    }
                    table.append(tr);
                }
            }

            //生成表格
            var table = $('<table></table>');
            table.addClass('table');
            //添加表头
            var tr = $('<tr></tr>');
            for(var i=0;i<options.tableHead.length;i++){
                var th = $('<th></th>');
                th.addClass('table-th');
                //写在前面，否则append button的时候会覆盖掉button
                th.text(options.tableHead[i]);
                //判断该列是否要排序
                var isSortable = false;
                for(var j=0;j<options.sortableCol.length;j++){
                    if(options.sortableCol[j] == i){
                        isSortable=true;
                        break;
                    }
                }
                if(isSortable){
                    th.addClass('sortable');
                    //添加按钮
                    var buttonUp = $('<button></button>');
                    buttonUp.addClass('up');
                    buttonUp.click(function(){
                        //获取其所在th的index
                        var thIndex = $(this).parent().index();
                        function sortRow(a,b){
                            return  parseInt(a[thIndex],10)-parseInt(b[thIndex],10);
                        }
                        options.tableRow.sort(sortRow);
                        //清空数据行
                        $('.table tr:gt(0)',innerThis).empty();
                        //添加行
                        addRow(table);
                    });
                    th.append(buttonUp);

                    var buttonDown = $('<button></button>');
                    buttonDown.addClass('down');
                    buttonDown.click(function(){
                        //获取其所在th的index
                        var thIndex = $(this).parent().index();
                        function sortRow(a,b){
                            return  parseInt(b[thIndex],10) - parseInt(a[thIndex],10);
                        }
                        options.tableRow.sort(sortRow);
                        //清空数据行
                        $('.table tr:gt(0)',innerThis).empty();
                        //添加行
                        addRow(table);
                    });
                    th.append(buttonDown);

                }
                tr.append(th);
            }
            table.append(tr);
            //添加行
            addRow(table);
            //添加table到所选中的元素上
            $(this).append(table);
            //链式操作
            return this;
        }
    })
})(jQuery);