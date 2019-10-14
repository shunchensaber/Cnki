
var resourceChart;
var researchChart;
var subChart;
var sourceChart;
var source_flag = 0;

/**
 * 加载资源分布页面
 * @returns
 */
function initSourcePage(){
	getResourceType(keyword,"资源类型");
	getDocuSource(keyword,"文献来源");
	getSubDistribute(keyword,"学科");
	getResearchLevel(keyword,"研究层次");
	getOrganData(keyword,"机构");
	getFundData(keyword,"基金");
}

/**
 * 获取文献来源数据
 * @param keyword 关键词
 * @param groupName 暂时写死 文献来源
 * @returns
 */
function getDocuSource(keyword,groupName){
	//清空chart
	deal_with_chart(sourceChart);
	sourceChart = echarts.init(document.getElementById('docu_source'),"wonderland");
	sourceChart.showLoading();
	$.ajax({
		type:'POST',
		url: ctx+'/data/caculate',
		dataType: 'json',
		data:{"keyword":keyword,
			"groupName":groupName,
			"urlName":"GroupTrend.aspx"
		},
		success: function(ret){
			if(ret.status == 0){
				var  str = unescape(ret.data.ret);
				loadCharts("文献来源",sourceChart,str);
				source_flag = 1;
				debugger;
			}else{
				console.log(ret.info);
				layer.msg(ret.info+"文献来源",{icon:3});
				//sourceChart.hideLoading();
				//重新加载数据
				getDocuSource(keyword,groupName);
			}
		
		},
		error:function(){
		}
	});
}
/**
 * 获取学科分布数据 
 * @param keyword
 * @param groupName 写死 学科
 * @returns
 */
function getSubDistribute(keyword,groupName){
	deal_with_chart(subChart);
	subChart = echarts.init(document.getElementById('sub_distribute'),"wonderland");
	subChart.showLoading();
	$.ajax({
		type:'POST',
		url: ctx+'/data/caculate',
		dataType: 'json',
		data:{"keyword":keyword,
			"groupName":groupName,
			"urlName":"GroupTrend.aspx"
		},
		success: function(ret){
			if( ret.status == 0 && ret.data.ret.indexOf("HTTP") == -1 ){
				var str = unescape(ret.data.ret);
				loadCharts("学科",subChart,str)
				debugger;
			}else{
				console.log("学科分布"+ret.info);
				layer.msg("学科分布"+ret.info,{icon:3});
				//重新加载数据
				getSubDistribute(keyword,groupName)
			}
		},
		error:function(){
			console.log("学科分布"+ret.info+" 正在重新加载...");
			getSubDistribute(keyword,groupName);
		}
	});
}
/**
 * 获取研究层次数据
 * @param keyword 关键词
 * @param groupName 分组名称
 * @returns
 */
function getResearchLevel(keyword,groupName){
	deal_with_chart(researchChart);
	researchChart = echarts.init(document.getElementById('research_level'),"wonderland");
	researchChart.showLoading();
	$.ajax({
		type:'POST',
		url: ctx+'/data/caculate',
		dataType: 'json',
		data:{"keyword":keyword,
			"groupName":groupName,
			"urlName":"GroupTrend.aspx"
		},
		success: function(ret){
			if(ret.status == 0 && ret.data.ret.indexOf("HTTP") == -1){
				var str = unescape(ret.data.ret);
				loadResearchLevel(researchChart,str)
				debugger;
			}else{
				layer.msg("研究层次"+ret.info,{icon:3});
			}
		},
		error:function(){
			layer.msg("研究层次"+ret.info,{icon:3});
			//重新加载
			 getResearchLevel(keyword,groupName)
		}
	});
	
}

/**
 * 获取来源类型数据
 * @param keyword
 * @param groupName
 * @returns
 */
function getResourceType(keyword,groupName){
	deal_with_chart(resourceChart);
	resourceChart = echarts.init(document.getElementById('resource_type'),"wonderland");
	resourceChart.showLoading();
	$.ajax({
		type:'POST',
		url: ctx+'/data/caculate',
		dataType: 'json',
		data:{"keyword":keyword,
			"groupName":groupName,
			"urlName":"GroupTrend.aspx"
		},
		success: function(ret){
			if(ret.status == 0 && ret.data.ret.indexOf("HTTP") == -1){
				var str = unescape(ret.data.ret);
				loadResourceType(resourceChart,str)
				debugger;
			}else{
				layer.msg("来源类型"+ret.info,{icon:1,time:5000});
				getResourceType(keyword,groupName);
			}
		},
		error:function(){
			layer.msg("来源类型"+ret.info,{icon:1,time:5000});
			getResourceType(keyword,groupName);
		}
	});
}

/**
 * 根据来源类型数据和容器 加载图表
 * @param resourceChart 容器
 * @param str 数据
 * @returns
 */
function loadResourceType(resourceChart,str){
	debugger;
	resourceChart.showLoading();

	var obj = jQuery.parseJSON(str);
	var data = [];
	var xs = [];
	for( var i=0; i<obj.length; i++ ){
		xs.push(obj[i].name);
		data.push({
			name:obj[i].name,
			value:obj[i].y
		});
	}
	resourceChart.setOption({
		  title : {
		        text: '资源类型',
		        x:'left'
		    },
		    tooltip : {
		        trigger: 'item',
		        formatter: "{a} <br/>{b} : {c} ({d}%)"
		    },
		    toolbox:{
    	    	show:true,
    	    	feature:{
	    	    	dataView:{readOnly:false},
	    	    	saveAsImage:{}
    	    	}
    	    },
		    legend: {
	    	    tooltip: {
	    	        show: true
	    	    },
		    	show:true,
		        type: 'plain',
		        orient: 'horizontal',
		        data:xs,
		        //x:'bottom',
		        bottom:"25"
		    },
		    labelLine:{
		    	show:true,
		    	length:"10"
		    },
		    series : [
		        {
		            name: '文献数',
		            type: 'pie',
		            selectedMode:"multiple",
		            selectedOffset:10,
		            //数组形式第一项内半径 第二项外半径
		            radius : '40%',
		            center:["50%","50%"],
		            data: data,
		            itemStyle: {
		                emphasis: {
		                    shadowBlur:10,
		                    shadowOffsetX: 0,
		                    shadowColor: 'rgba(0, 0, 0, 0.5)'
		                }
		            }
		        }
		    ]
	});
	resourceChart.hideLoading();
	resourceChart.on('click',function(params){
		debugger;
	    if( params.data.selected ){
	    	//console.log(params);
	    	console.log("点击");
	    	compareAnalysis(params.data);
	    	//刷新文献数据 关键词数据
	    }else{//未选中
	    	console.log("取消点击");
	    }
	});
}

/**
 * 这么多全局变量，我感觉我要死了已经
 * 其实存在echarts里跟全局没啥区别 都是初始化容器再存进去
 */
var is_iframe_exists = 0;
var compareX = [];
var compareY = [];
var LayerIndex;
/**
 * 加载柱状比较分析页面
 * @param data
 * @returns
 */
function compareAnalysis(data){
	//表明当前页面中没有比较分析的子页面
	if( is_iframe_exists === 0){
		//开启一个子页面
	LayerIndex = layer.open({
			type:1,
			title:"比较分析",
			shade:0,//操作遮罩层
			offset:[0,0],
			resize:false,//不允许拉伸
			maxmin:false,
			scrollbar:false,//不允许滚动条
			area:['1200px','400px'],
			content:"<div id='compare-chart' style='width:1200px;height:350px;padding:10px'></div>",
			end:function(){//销毁该层的回调函数
				//标记成未打开窗口
				is_iframe_exists = 0;
				//清空数据
				compareX = [];
				compareY = [];
			}
			
		});
		//标记成已加载
		is_iframe_exists = 1;
	}

	var compareChart = echarts.init(document.getElementById("compare-chart"),"wonderland");
	//如果数组中已经有了该数据
	if( array_contains(compareX,data.name) ){
		return;
	}
	compareX.push(data.name);
	compareY.push(data.value);
	var option={
			 title : {
			        text: "比较分析",
			        x:'left',
			        subtext:'关键词<'+keyword+'>数据的比对关系'
			    },
			    grid:{
			    	bottom:80
			    },
			    toolbox: {
	    	        show: true,
	    	        feature: {
	    	            magicType: {
	    	                type: ['line']
	    	            },
	    	            restore: {},
	    	            dataView: {readOnly: false},
	    	            saveAsImage: {}
	    	        }
	    	    },
			    dataZoom : [
	     		   {
	     	        show : true,
	     	        realtime : true,
	     	        start :0,
	     	        end : 100
	     		   },
		     	   {
		     	    	type:"inside",
		     	    	start : 0,
		        	        end : 100
		     	   }
	     	   ],
	     	  xAxis: {
	     		  type:"category",
	     		  data:compareX,
	              axisLabel: {  
		           	   interval:0,  
		           	   rotate:-20  
	           	} 
	          },
	          yAxis:[{
	              type: 'value',
	              scale: true,
	              name: '文献量(篇)',
	              nameLocation:"center",
		               nameGap:60,
		               min: 0.000000001, //如果使用0，会出现你之前的情况，必须大于0的，使用0.000000001无限接近0
		               axisLabel: {
		            	   formatter: function(value, index) {
			  	                 if (index === 0) { //因为最小值不是0，重新转化为0
			  	                     value = Math.floor(value);
			  	                 }
			  	                 return value;
		            	   }
		               },
	          }],
	         
	     	    tooltip: {
	     	        trigger: 'axis',
	     	        axisPointer: {
	     	            type: 'shadow'
	     	        }
	     	    },
				    series: [{
				        name: "文献数",
				        type: 'bar',
				        data:compareY,
				        barCategoryGap:"40%"
				    }]
		};
	compareChart.setOption(option);
	debugger;
}

/**
 * 加载研究层次图表
 * @param researchChart  容器
 * @param str 数据
 * @returns
 */
var level_field;
var level_fieldValue = [];
function loadResearchLevel(researchChart,str){
	debugger;
	var obj = jQuery.parseJSON(str);
	var data = [];
	var xs = [];
	level_field = obj[0].c_field;
	for( var i=0; i<obj.length; i++ ){
		xs.push(obj[i].name);
		level_fieldValue[obj[i].name] = obj[i].c_fieldValue;
		data.push({
			name:obj[i].name,
			value:obj[i].y
		})
	}
	
	researchChart.setOption({
		  title : {
		        text: '研究层次',
		        x:'left'
		    },
		    tooltip : {
		        trigger: 'item',
		        formatter: "{a} <br/>{b} : {c} ({d}%)"
		    },
		    legend: {
		    	tooltip:{
		    		show:true
		    	},
	    	 formatter: function (name) {//避免图例过长
	                return echarts.format.truncateText(name, 100, '14px Microsoft Yahei'
	         	           , '…');
	    	    },
		        type: 'scroll',
		        orient: 'horizontal',
		        //x:'bottom',
		        bottom:"25",
		        data: xs,
		        selected: xs
		    },
		/*    labelLine:{
		    	show:true,
		    	length:15
		    },*/
		    series : [
		        {
		            name: '文献数',
		            type: 'pie',
		            radius : '40%',
		            center:["50%","50%"],
		            avoidLabelOverlap: true,
		            selectedMode:"multiple",
		            selectedOffset:"10",
		            data: data,
		            itemStyle: {
		                emphasis: {
		                    shadowBlur: 10,
		                    shadowOffsetX: 0,
		                    shadowColor: 'rgba(0, 0, 0, 0.5)'
		                }
		            }
		        }
		    ]
	});
	researchChart.hideLoading();
	//给图表绑定点击事件  该图标加载比较分析折线图
	researchChart.on('click',function(params){
		if( params.data.selected ){
			console.log(level_fieldValue[params.name]);
			console.log(level_field);
			if( array_contains(legend,params.name) ){
	    		return;
	    	}
	    	//不包含则往里push该信息
	    	legend.push(params.name+"年度趋势");
			compareAnalysisLineChart(level_fieldValue[params.name],
	    			level_field,
	    			keyword,
	    			"研究层次",
	    			params.name
	    	);
		}
	});
}

/**
 * 加载学科分布图表
 * @param discribe 信息
 * @param chart 加载的容器图表
 * @param str 数据
 * @returns
 */
//比较分析时候用到的数据
//学科分布属性数据
var subject_fieldValue = [];
var subject_field;
//文献来源属性数据
var docu_fieldValue = [];
var docu_field;
function loadCharts(discribe,chart,str){
	debugger;
	var obj = jQuery.parseJSON(str);
	var xs = [];
	var ys = [];
	//push 属性名称
	 if(discribe.indexOf("学科") != -1)
		 subject_field = obj[0].c_field;
	 
	 else
		 docu_field = obj[0].c_field;
	
	for( var i=0; i<obj.length; i++ ){
		xs.push(obj[i].name);
		ys.push(obj[i].y);
		//push属性值
		 if(discribe.indexOf("学科") != -1)
			 subject_fieldValue[obj[i].name] = obj[i].c_fieldValue;
		 else
			 docu_fieldValue[obj[i].name] = obj[i].c_fieldValue;
	}
	
	chart.setOption({
		 title : {
		        text: discribe,
		        x:'left',
		        subtext:'关键词<'+keyword+'>的'+discribe
		    },
		    grid:{
		    	bottom:80
		    },
		    toolbox: {
    	        show: true,
    	        feature: {
    	            myTool1:{
    	            	show:true,
    	            	title:"更新数据",
    	            	 icon: 'path://M50.104,88.326c-7.857,0-15.78-2.388-22.601-7.349c-8.302-6.039-13.746-14.941-15.33-25.067 c-1.582-10.115,0.879-20.24,6.929-28.51C30.803,11.406,53.225,6.948,70.148,17.252c1.626,0.989,2.142,3.11,1.151,4.737 c-0.99,1.626-3.11,2.143-4.737,1.151c-13.889-8.454-32.292-4.796-41.896,8.33c-4.96,6.781-6.978,15.082-5.681,23.374 c1.299,8.303,5.764,15.604,12.574,20.557c14.053,10.224,33.828,7.143,44.081-6.872c3.094-4.229,5.094-9.188,5.783-14.341 c0.252-1.888,1.983-3.209,3.874-2.96c1.888,0.252,3.213,1.987,2.96,3.874c-0.842,6.291-3.28,12.342-7.053,17.498 C73.69,82.873,61.973,88.326,50.104,88.326z',
    	            	 onclick:function(){
    	            		 chart.showLoading();
    	            		 keyword = $("#search").val().trim();
    	            		 if(discribe.indexOf("学科") != -1)
    	            			 getSubDistribute(keyword,discribe);
    	            		 else
    	            			 getDocuSource(keyword,discribe);
    	            	 }
    	            },
    	            magicType: {
    	                type: ['line']
    	            },
    	            restore: {},
    	            dataView: {readOnly: false},
    	            saveAsImage: {}
    	        }
    	    },
		    dataZoom : [
     		   {
     	        show : true,
     	        realtime : true,
     	        start :0,
     	        end : Percentage(9,obj.length)
     		   },
	     	   {
	     	    	type:"inside",
	     	    	start : 0,
	        	        end : Percentage(9,obj.length)
	     	   }
     	   ],
     	  xAxis: {
     		  type:"category",
              data: xs,
              axisLabel: {  
	           	   interval:0,  
	           	   rotate:-20  
           	} 
          },
          yAxis:[{
              type: 'value',
              scale: true,
              name: '文献量(篇)',
              nameLocation:"center",
	               nameGap:35,
	               min: 0.000000001, //如果使用0，会出现你之前的情况，必须大于0的，使用0.000000001无限接近0
	               axisLabel: {
	            	   formatter: function(value, index) {
		  	                 if (index === 0) { //因为最小值不是0，重新转化为0
		  	                     value = Math.floor(value);
		  	                 }
		  	                 return value;
	            	   }
	               },
          }],
         
     	    tooltip: {
     	        trigger: 'axis',
     	        axisPointer: {
     	            type: 'shadow'
     	        }
     	    },
			    series: [{
			        name: "文献数",
			        selectedMode:true,
			        selected:"multiple",
			        type: 'bar',
			        data:ys,
			        barCategoryGap:"40%"
			    }]
	});
	chart.hideLoading();
	//绑定点击事件
	 if(discribe.indexOf("学科") != -1)
		 chart.on('click',function(params){
				debugger;
			  //似乎bar图没有取消点击？？
				//直接跳进
				console.log(subject_fieldValue[params.name]);
				console.log(subject_field);
				if( array_contains(legend,params.name) ){
		    		return;
		    	}
		    	//不包含则往里push该信息
		    	legend.push(params.name+"年度趋势");
				compareAnalysisLineChart(docu_fieldValue[params.name],
						subject_field,
		    			keyword,
		    			discribe
		    	);
			});
	 else
		 chart.on('click',function(params){
				debugger;
		    	console.log("响应点击事件 ");
		    	console.log(docu_fieldValue[params.name]);
		    	console.log(docu_field);
		    	//如果已经包含该信息，就不往legend数组里push这个值
		    	//同时也说明该窗口已经加载了这个信息的折线图，return出去 不重复加载数据
		    	//不发送不必要的服务器请求
		    	if( array_contains(legend,params.name) ){
		    		return;
		    	}
		    	//不包含则往里push该信息
		    	legend.push(params.name+"年度趋势");
		    	//加载比较分析的折线图
		    	compareAnalysisLineChart(docu_fieldValue[params.name],
		    			docu_field,
		    			keyword,
		    			discribe,
		    			params.name);
			});
}
/**
 * 加载比较分析的折线图
 * @returns
 */
var fieldValueArray = [];
var is_open_exists = 0;
var compareData = [];
var legend = [];
var xs = [];
function compareAnalysisLineChart(fieldValue,field,keyword,groupName,name){
  	//打开一个窗口
	debugger;
	if( array_contains(fieldValueArray,name) ){
		layer.msg("弹出窗中已经加载了刚才点击的数据",{icon:3,time:2000});
		return;
	}
	if( is_open_exists == 0 ){
		//标记已经打开过窗口 接下来的点击操作不会再打开新的窗口
		is_open_exists = 1;
		//打开比较分析的窗口
		layer.open({
			type:1,
			title:"比较分析 - Line",
			shade:0,//操作遮罩层
			offset:[0,0],
			resize:false,//不允许拉伸
			maxmin:true,
			scrollbar:false,//不允许滚动条
			area:['1000px','350x'],
			content:"<div id='compare-chart2' style='width:1200px;height:350px;padding:10px'></div>",
			end:function(){//销毁该层的回调函数
				//标记成未打开窗口
				is_open_exists = 0;
				//清空数据
				compareData = [];
				legend = [];
			}
		});
	}
	$.ajax({
		type:'POST',
		url: ctx+'/data/detail',
		dataType: 'json',
		data:{"keyword":keyword,
			"groupName":groupName,
			"urlName":"GroupTrendDetail.aspx",
			"field":field,
			"fieldValue":fieldValue
		},
		success: function(ret){
			if(ret.status == 0){
				debugger;
				var obj = jQuery.parseJSON(ret.data.ret);
				var temp = [];
				for( var i=0,length = obj.length; i<length; i++ ){
					temp.push([obj[i].name,obj[i].y]);
					//包含就忽略 不包含该年份就push进数组
					if( ! array_contains(xs,obj[i].name) ){
						xs.push(obj[i].name)
					}
				}
				//年份数字排个序
				xs.sort();
				//将data name push进数组
				fieldValueArray.push(name);
				compareData.push(temp);
				var compareChart = echarts.init(document.getElementById("compare-chart2"),"wonderland");
				compareChart.showLoading();
				loadCompareChart(legend,compareData,xs,compareChart);
			}else{
				layer.msg("读取数据失败，尝试再次获取...",{icon:7,time:3000});
				compareAnalysisLineChart(fieldValue,field,keyword,groupName,name);
			}
		
		},
		error:function(){
			layer.msg("页面错误，详情见控制台");
		}
	});
}
/**
 * 加载比较分析折线图
 * @param legend 类别数组
 * @param compareData
 * @param xs
 * @param chart
 * @returns
 */
function loadCompareChart(legend,compareData,xs,chart){
	debugger;
	//组装series数组
	var series = [];
	for( var i =0,length=compareData.length;i<length;i++ ){
		series.push(  {
            name:legend[i],
            type:'line',
            stack: '总量',
            data:compareData[i]
        });
	}
	option = {
		    title: {
		        text: '折线图堆叠'
		    },
		    tooltip: {
		        trigger: 'axis'
		    },
		    legend: {
		        data:legend
		    },
		    grid: {
		        left: '3%',
		        right: '4%',
		        bottom: '3%',
		        containLabel: true
		    },
		    toolbox: {
		        feature: {
		            saveAsImage: {}
		        }
		    },
		    xAxis: {
		        type: 'category',
		        boundaryGap: false,
		        data: xs
		    },
		    yAxis: {
		        type: 'value'
		    },
		    series: series
		};

	chart.setOption(option);
	//隐藏loading动画
	chart.hideLoading();
	debugger;
}
