
var publishChart = echarts.init(document.getElementById('publishCount'),"wonderland");
publishChart.showLoading();

var wordChart = echarts.init(document.getElementById('wordCount'),"wonderland");
wordChart.showLoading();



var cache = {};
var keyword = "";

$(function(){
	//绑定
	$("#attention_table").tipso({
		   	useTitle: false,
	        position: 'right',
	        width:"120px",
	        background:"#63c6ae",
	        color:"#ffffff"
	});

	$(".tab_a_class").tipso({
	 	useTitle: false,
	    position: 'left',
	    width:"120px",
	    background:"#63c6ae",
	    color:"#ffffff"
	})
	keyword = getUrlParam('keyword');
	$("#search").val(keyword);
	
	initResultPage();
	
	clock = setInterval("console.log('周期刷新');initIndexPage();initResultPage();initSourcePage(keyword);",50000);
});



function initResultPage(){
	getIndexData(keyword,'GetAttention','Academic');
	getWordCount();
	debugger;
	getAttentionArticle();
	getSubject();
	getOrgan();
	
}


var all_flag = {};
/**
 * 搜索框绑定事件
 * @returns 老子不返回
 */
$("#searchBtn").on("click",function(){

	all_flag = {};
	console.log("本次搜索关键词"+$("#search").val());
	
	//为空直接return 
	if ( str_is_null( $("#search").val().trim() ) ){
		layer.msg('输入关键词再进行搜索。', {icon: 3});
		return;
	} 
	keyword = $("#search").val().trim();
	initIndexPage();
	initResultPage();
	initSourcePage(keyword);
	
});

function initIndexPage(){
	publishChart.showLoading();
	getIndexData(keyword,'GetAttention','Academic');
	wordChart.showLoading();
	getAttentionArticle();
	getWordCount();
	getSubject();
	getOrgan();
}



/**
 * 监听键盘输出
 * @returns
 */
$("#search").bind("keyup",function(event){
	//回车键就执行搜索操作
	if( event.keyCode == "13" ){
		//为空直接return 
		if ( str_is_null( $("#search").val().trim() ) ){
			layer.msg('输入关键词再进行搜索。', {icon: 3});
			return;
		} 
		keyword = $("#search").val().trim();
		$("#searchBtn").click();
		return;
	}
	//输入字符则查找词典
	var timeStamp = new Date().getTime();
	$("#search").autocomplete({
		minLength:0,
		source:function(request,response){
			$.ajax({
				url:ctx+"/search/prefix?prefix="+$("#search").val().trim(),
				type:"GET",
				success:function( data ){
					var array = [];
					if(data.length <= 2)	
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
	console.log("操作共耗时："+(new Date().getTime()-timeStamp)+"ms");
})


$("#all-tab a").click(function(e){
	debugger;
	e.preventDefault();
	if( deal_with_undefined($(this).parent().attr("class")).indexOf("active") != -1 )
		return;
	
	$(this).tab('show');
	var href = $(this).attr('href');
	if( href === "#caculate-data" ){
		if( caculate_flag === 1 && keyword == $("#search").val().trim() ) return;
		getCaculateData(keyword,"关键词");
		//setTimeout('getMatrixData("'+keyword+'","关键词")',3000);
	}else if( href === "#source-distribute"){
		
		if( source_flag === 1 && keyword == $("#search").val().trim() ) return;
		else if( typeof(source_flag) == 'undefined' ) initSourcePage(keyword);
		else initSourcePage(keyword);
	}else if(href === "#index-data"){
		if( all_flag.userflag && keyword == $("#search").val().trim() ) return;
		initResultPage();
	}
});

/**
 * 指数分析选项卡切换--（部分操作） 并显示
 * @param e
 * @returns
 */
$("#count-tab a").click(function(e){
	//切换选项卡
	e.preventDefault();
	if( $(this).parent().attr("class").indexOf("active") != -1 ){
		return;
	}
	var href = $(this).attr("href");
	$(this).tab("show");
	
	//显示数据结果
	debugger;
	if( !all_flag.userflag ||  typeof(all_flag.userflag) == 'undefined' ){
		if( href === '#user-content' ){
			var userChart = echarts.init(document.getElementById('userCount'),"wonderland");
			userChart.showLoading();
			getUserData(userChart);
			all_flag.userflag = true;//图表已加载
		}
	}else if( !all_flag.citedflag ||  typeof(all_flag.citedflag) == 'undefined' ){
		
		if( href === '#cited-content' ){
			var citedChart = echarts.init(document.getElementById('citedCount'),"wonderland");
			citedChart.showLoading();
			getCitedData(citedChart);
			all_flag.citedflag = true;//图表已加载
		}
	}else if( !all_flag.mediaflag ||  typeof(all_flag.mediaflag) == 'undefined' ){
		
		if( href === '#media-content' ){
			var mediaChart = echarts.init(document.getElementById('mediaCount'),"wonderland");
			mediaChart.showLoading();
			getMediaData(mediaChart);
			all_flag.mediaflag = true;//图表已加载
		}
	}else{
		return;
	}
})



