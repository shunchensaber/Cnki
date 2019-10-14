
/*
 * 绑定index界面的 search it a标签跳转
 * */
$("a[class='hero-btn']").on("click",function(){
	//search();
	var keyword = $("#topSearch").val().trim();
	if ( str_is_null(keyword) ){
		debugger;
		layer.msg('输入关键词再进行搜索。', {icon: 3});
		return;
	} 
	window.location.href="data/getData?keyword="+keyword;
	//记录此次搜索关键词
	record_keyword(keyword);
});

/**
 * 绑定滚动事件  当滚动条下拉至没有搜索框时  header处的搜索框出现
 * @returns
 */
$(window).scroll(function(){
	var window = $(this);
	var clientHeight = window.height();
	var contentHeight = $(document).height();
	var scrollTop = window.scrollTop();
	if( scrollTop/(contentHeight-clientHeight) >= 0.25 ){
		$(".search").css("display","block");//显示搜索框
	}else{
		$(".search").css("display","none");//隐藏搜索框
	}
});

/**
 * 绑定headerz中搜索框的escape和enter键
 * @param event
 * @returns
 */
$(".search-input").bind("keyup",function(event){
	//回车
	if( event.keyCode == "13" ){
		var keyword = $(".search-input").val().trim();
		if ( str_is_null(keyword) ){
			layer.msg('输入关键词再进行搜索。', {icon: 3});
			return;
		}
		window.location.href=ctx + "/data/getData?keyword="+keyword;
		//记录此次关键词
		record_keyword(keyword);
		return;
	}
	//esc
	if( event.keyCode == '27' ){
		$(".search-close").click();
	}
	//autocomplete视情况再加....
});

/**
 * 监听键盘输出
 * @returns
 */
$("#topSearch").bind("keyup",function(event){
	//回车执行跳转
	if( event.keyCode == "13" ){
		$("a[class='hero-btn']").click();
		return;
	}
	//输入字符执行搜索
	var timeStamp = new Date().getTime();
	$("#topSearch").autocomplete({
		minLength:0,
		source:function(request,response){
			$.ajax({
				url:ctx+"/search/prefix?prefix="+$("#topSearch").val().trim(),
				type:"GET",
				success:function( data ){
					var array = [];
					
					if(data.length == 2)
						array.push("No results..");
					else
						array = jQuery.parseJSON(data);
					response( $.map( array ,function( item ){
						debugger;
						return {
							value:item.content
						}
					}));//response
				}//success
			});//ajax
		}
	});
	console.log("输入框操作共耗时："+(new Date().getTime()-timeStamp)+"ms");
})
	
	
