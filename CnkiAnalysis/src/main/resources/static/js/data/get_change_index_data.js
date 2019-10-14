$(function(){
	//搜索框监听
	keyword = getUrlParam('keyword');
	getIndexData(keyword,getUrlParam('type'),getUrlParam('numType'));


});

var cache={};
var keyword = "";


function getIndexData(keyword,type,numType){
	$.ajax({
		type:'GET',
		url: ctx+'/data/getIndexData',
		dataType: 'json',
		data:{"topSearch":keyword,
			"resultType":"GetSubject",
			"numType":""
		},
		success: function(ret){
			debugger;
			if(ret.status === 0 && ret.data != null){
				if(type === 'GetSubject'){
					loadSubject(ret.data);
				}else{
					loadPublishEcharts(ret.data);
					
				}
				getWordCount();
				
				
			}
		},
		error:function(){
			
		}
	});
	
}




/*获取关键词数据*/
function getWordCount(){
	
	if( cache.keyword === keyword ){
		loadWordEcharts(cht.data);
	}else{
		$.ajax({
			type:'GET',
			url: ctx+'/data/getIndexData',
			dataType: 'json',
			data:{"topSearch":keyword,
				"resultType":"GetTotalRelevanceWordsForCht",
				"numType":""
			},
			success: function(ret){
				debugger;
				if(ret.status === 0 && ret.data != null){
					//加载关键词条形图
					cache.keyword = keyword;
					cache.data = ret.data;
					loadWordEcharts(ret.data);
				}
			}
		});
	}
}

function loadSubject(data){
	debugger;
	var obj = jQuery.parseJSON(data.ret);
	publishChart.hideLoading();
	var data = [];
	var legend = [];
	for( var i=0; i<obj.show.length; i++ ){
		var param = {};
		param.name = obj.show[i][0];
		param.value = obj.show[i][1];
		data.push(param);
		legend[i] = data[i].name;
 	}
	debugger;
	publishChart.setOption({
	    title : {
	        text: '南丁格尔玫瑰图',
	        subtext: '篇名包含<'+keyword+'>的文献在不同学科中的分布',
	        x:'center'
	    },
	    tooltip : {
	        trigger: 'item',
	        formatter: "{a} <br/>{b} : {c} ({d}%)"
	    },
	    legend: {
	        x : 'center',
	        y : 'bottom',
	        data:legend
	    },
	    toolbox: {
	        show : true,
	        feature : {
	            mark : {show: true},
	            dataView : {show: true, readOnly: false},
	            magicType : {
	                show: true,
	                type: ['pie', 'funnel']
	            },
	            restore : {show: true},
	            saveAsImage : {show: true}
	        }
	    },
	    calculable : true,
	    series : [
	        {
	            name:'半径模式',
	            type:'pie',
	            radius : [20, 110],
	            center : ['25%', '50%'],
	            roseType : 'radius',
	            label: {
	                normal: {
	                    show: false
	                },
	                emphasis: {
	                    show: true
	                }
	            },
	            lableLine: {
	                normal: {
	                    show: false
	                },
	                emphasis: {
	                    show: true
	                }
	            },
	            data:data
	        },
	        {
	            name:'面积模式',
	            type:'pie',
	            radius : [30, 110],
	            center : ['75%', '50%'],
	            roseType : 'area',
	            data:data
	        }
	    ]
	});
}

