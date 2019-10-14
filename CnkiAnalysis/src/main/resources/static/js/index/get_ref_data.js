$(function(){
	//绑定tooltip
	$("th").each(function(){
		//console.log($(this).attr("data-tipso"));
		if (typeof($(this).attr("data-tipso")) != 'undefined' ){
			$(this).tipso({
				useTitle: false,
				position: 'top',
				width:"200px",
				background:"#63c6ae",
				color:"#ffffff"
			})
		}
	})

	set_search_btn();
	getReferData("AUTH","tab-auth");
	//不是总览页面不执行加载地图操作
	/*if( window.location.href.indexOf( "page/ref" ) === -1 ){
		//loadDistributeMap();
	}*/
	
	
})


$("#ref-tab a").click(function(e){
	//切换选项卡
	e.preventDefault();
	var flag = $(this).parent().attr("class");
	if( typeof(flag) != "undefined" && flag.indexOf("active") != -1 ){
		return;
	}
	var href = $(this).attr("href");
	//debugger;
	$(this).tab("show");
	if( $(href).find("table").find("tbody").length > 0 ) return;
	showLoading();
	var s_href = href.substring(1);
	//初始化
	ref_loading[s_href] = 1;
	
	getReferData(href.split('-')[1].toUpperCase(),s_href);
});

var DataTable;
function getReferData(type,href){
	$.ajax({
		type:"GET",
		url:ctx+"/data/getRef?type="+type,
		success:function(ret){
		//	debugger;
			ret = jQuery.parseJSON(ret);
			if(ret.status === 0 && ret.data != null){
				var str = ret.data.ret;
				console.log("获取被引数据");
				var table = $("#"+href).find("table");
		
				table.prepend(str);
				table.prepend('<tfoot style="align:center"><a href="page/ref">>>>更多</a></tfoot>');
				//获取该实例
				DataTable = table.DataTable({
					//规定排序列
					paging:false,
					searching:false,
					info:false,
					//order:[[7,"desc"]],
					columnDefs:[{
						targets:'nosort',
						orderable:false
					}]
				});
				hideLoading();
				//表示该标签页下的加载完毕 可以出发滚动加载事件了
				//不是总览页面不执行加载地图操作
				if( window.location.href.indexOf( "page/ref" ) != -1 ){
					ref_loading[href] = 0;
				}
			}else{
				//错误信息 ret.info会有。
				layer.msg(href+" 获取失败："+ret.info+" 正在重新加载..");
				getReferData(type,href);
			}
		},
		error:function(){
			//错误信息
			alert("获取高被引表格 咋的出错了呢。"+ret.info);
		}
	});
}

function showLoading(){
	$("#loading").css("display","block");
}
function hideLoading(){
	$("#loading").css("display","none");
}

function showMore(){
	$("#more").css("display","block");
}
function hideMore(){
	$("#more").css("display","none");
}

