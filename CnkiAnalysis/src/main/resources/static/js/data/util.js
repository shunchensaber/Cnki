function getSum(a){
	return eval(a.join("+"));
}

$(function(){
  //显示搜索框的地方
  $("#top").click(function() {
      $("html,body").animate({scrollTop:0}, 500);
  }); 
  var userInfo = getUser();
  if( userInfo != "no Login" ){
		//隐藏菜单按钮
		$("#after_login").css("display","block").append(userInfo);
		//显示登录按钮
		$("#login").css("display","none");
	
  }else{
		//隐藏菜单按钮
		$("#after_login").css("display","none");
		//显示登录按钮
		$("#login").css("display","block");
	
  }
  window.onscroll=function(){
		  var clientHeight=document.documentElement.clientHeight||document.body.clientHeight;
		  var topH=document.documentElement.scrollTop||document.body.scrollTop;
		  if(topH/clientHeight > 0.30){
			  $("#top").css("display","block");
		  }else{
			  $("#top").css("display","none");
		  }
  }
  //注销按钮绑定代码
  $("#logout").bind("click",function(){
	  $.ajax({
		  type:"GET",
			url: ctx+'/user/outLogin',
			dataType: 'json',
			success: function(ret){
				if( ret.status == 0 ){
					layer.msg("注销成功！",{icon:1,time:2000});
					//隐藏菜单按钮
					$("#after_login").css("display","none");
					//显示登录按钮
					$("#login").css("display","block");
				
				}else{
					layer.msg("注销失败！",{icon:1,time:2000});
				}
				
			},
			error:function(){
				layer.msg("注销失败",{icon:2,time:2000})
			}
		  
	  });
  })
  //登录和注册框绑定事件
  $("#login_button").bind("click",function(){
	  debugger;
	  var password = $("#password").val().trim();
	  if(password.length<6){
		  layer.msg("密码长度小于6，请重新输入",{icon:2,time:2000});
		  return;
	  }
	  
	  $.ajax({
		  type:"POST",
			url: ctx+'/user/login',
			dataType: 'json',
			data:{"username":$("#username").val().trim(),
				"password":$("#password").val().trim(),
			},
			success: function(ret){
				if( ret.status == 0 ){
					//layer.setTop(layer1);
					toastr.success(ret.info);
					$("#modal-form").modal('hide');
					//隐藏登录按钮
					$("#login").css("display","none");
					//显示菜单按钮
					$("#after_login").css("display","block")
				}else{
					layer.msg(ret.info,{icon:2,time:2000});
					toastr.error(ret.info);
				}
				
			},
			error:function(){
				layer.msg("登录失败",{icon:2,time:2000})
			}
		  
	  });
  });
  //历史记录功能绑定代码
  $("#history").bind("click",function(){
	  //打开一个新窗口
	  LayerIndex = layer.open({
			type:1,
			title:"历史记录",
			shade:0,//操作遮罩层
			offset:'auto',
			resize:false,//不允许拉伸
			maxmin:false,
			scrollbar:false,//不允许滚动条
			area:['400px','500px'],
			content:'   <table align="center" id= "dataTable"'+
                'class="table table-striped table-bordered table-hover dataTables-example dataTable">'+
            '<thead>'+
					'<tr>'+
                    	'<th>关键词</th>'+
                    	'<th>上次搜索日期</th>'+
                    	'<th class="nosort">操作</th>'+
					'</tr>'+
			'</thead>'+
			'<tbody id="history_table"></tbody>'+
            '</table>',
            success:function(layero){
            	layer.setTop(layero);
            	 $.ajax({
           		  type:"POST",
           		  url:ctx+'/user/getRecords',
           		  dataType:'json',
           		  data:{username:getUser()},
           		  success:function(ret){
           			  if( ret.status == 0 ){
           				  debugger;
           				  var array = jQuery.parseJSON(ret.data.data);
           				  for( var i=0;i<array.length;i++ ){
           					  var content = array[i].split(",");
           					  $("#history_table").append("<tr><td>"+content[0]+"</td>"+
           							"<td>"+content[1]+"</td>"+
           							"<td><a href='"+ctx+"/data/getData?keyword="+content[0]+"'>点击跳转</a></td>" +
           									"</tr>");
           				  }
           				DataTable = $("#dataTable").DataTable({
        					//规定排序列
        					paging:false,
        					searching:false,
        					info:false,
        					columnDefs:[{
        						targets:'nosort',
        						orderable:false
        					}]
        				});
           				 
           			  }
           		  }
           		  
           	  });
            },
			end:function(){//销毁该层的回调函数
				//标记成未打开窗口
				
			}
			
		});
	 
	  
  })
  
  
})

/*根据name获取当前Url中的参数*/
function getUrlParam(name){

	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
	var r = window.location.search.substr(1).match(reg);  //匹配目标参数

	if (r!=null) return decodeURI(r[2]); return null; //返回参数值
} 

/*返回百分比 以便设置适当的x轴显示个数*/
function Percentage(num, total) {
    return (Math.round(num / total * 10000) / 100.00 );// 小数点后两位百分比
}

/**
 * 计算同比增长率
 * @param now 当前统计周期
 * @param pre 上一个统计周期
 * @returns 百分比数值
 */
function year_to_year(now,pre){
	return (  Math.round( (now / pre -1) * 10000 ) / 100.00 );
}

/**
 * 字符串全文替换
 * @param key 被替换的字符串
 * @param value 替换的字符串
 * @returns
 */
function replaceAll(str,key,value){
	return str.replace( new RegExp(key,'g'),value );
}

/**
 * 处理值可能为undefined 的对象
 * @param obj
 * @returns
 */
function deal_with_undefined(obj){
	return typeof(obj) == 'undefined'?'':obj;
}

/**
 * 检测图表是否需要清空
 * @param chart
 */
function deal_with_chart(chart){
	
	if (chart != null && chart != "" && chart != undefined) {  
        chart.dispose();  
    }  
}

function str_is_null(str){
	return str == ''? true:str == null?true: typeof(str) == 'undefined'?true:false;
	
}

function set_search_btn(){
  var $search = $('.search'), $input = $('.search-input'), $close = $('.search-close'), $svg = $('.search-svg'), $path = $('.search-svg__path')[0], initD = $svg.data('init'), midD = $svg.data('mid'), finalD = $svg.data('active'), backDelay = 400, midAnim = 200, bigAnim = 400, animating = false;
   $(document).on('click', '.search:not(.active)', function () {
        if (animating)
            return;
        animating = true;
        $search.addClass('active');
        Snap($path).animate({ 'path': midD }, midAnim, mina.backin, function () {
            Snap($path).animate({ 'path': finalD }, bigAnim, mina.easeinout, function () {
                $input.addClass('visible');
                $input.focus();
                $close.addClass('visible');
                animating = false;
            });
        });
    });
    $(document).on('click', '.search-close', function () {
        if (animating)
            return;
        animating = true;
        $input.removeClass('visible');
        $close.removeClass('visible');
        $search.removeClass('active');
        setTimeout(function () {
            Snap($path).animate({ 'path': midD }, bigAnim, mina.easeinout, function () {
                Snap($path).animate({ 'path': initD }, midAnim, mina.easeinout, function () {
                    animating = false;
                });
            });
        }, backDelay);
    });
}

function record_keyword(keyword){
	$.ajax({
		url:ctx+"/search/push?keyword="+$("#topSearch").val().trim(),
		type:'GET',
		success:function(ret){
			var obj = jQuery.parseJSON(ret);
			if(obj.status == 0 ){
				console.log(obj.info + ":"+ keyword );
			}
		}
	});
}

$(".search-input").bind("keyup",function(event){
	//回车
	if( event.keyCode == "13" ){
		var keyword = $(".search-input").val().trim();
		if ( str_is_null(keyword) ){
			layer.msg('输入关键词再进行搜索。', {icon: 3});
			return;
		}
		window.location.href=ctx+"/data/getData?keyword="+keyword;
		//记录此次关键词
		record_keyword(keyword);
		return;
	}
	//esc
	if( event.keyCode == '27' ){
		$(".search-close").click();
	}
});

/**
 * 判断array数组中是否存在obj
 * @param array
 * @param obj
 * @returns 存在:true 不存在:false
 */
function array_contains(array,obj){
	for( var i=0; i<array.length; i++ ){//
		//如果要保证数据类型也相同  用恒等号=== 如果要求基本内容相同 ==就可以
		if( array[i] === obj ){
			return true;
		}
	}
	return false;
}

/**
 * 回到顶部
 */

function getUser(){
	$.ajax({
		url:ctx+"/user/getInfo",
		type:'GET',
		success:function(ret){
			var obj = jQuery.parseJSON(ret);
			if(obj.status == 0 ){
				return obj.info;
			}else{
				return "no Login";
			}
		}
	});
}



