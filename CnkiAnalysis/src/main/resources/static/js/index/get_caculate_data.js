

var caculate_flag = 0;
var matrixChart;

function getMatrixData(keyword,groupName){
	deal_with_chart(matrixChart);

	matrixChart = echarts.init(document.getElementById("matrix"),"wonderland");
	matrixChart.showLoading();
	$.ajax({
		type:'POST',
		url: ctx+'/data/caculate',
		dataType: 'json',
		data:{"keyword":keyword,
			"groupName":groupName,
			"urlName":"GroupMatrix.ashx"
		},
		success: function(ret){
			debugger;
			if(ret.status === 0 && ret.data != null){
				//%u 解码
				// 显示标题，图例和空的坐标轴
				var str = unescape(ret.data.ret);
				loadMatrix(str);
				
			}else{
				layer.msg("getMatrixData status is -1 will Retry",{icon:3});
				getMatrixData(keyword,"关键词");
			}
		},
		error:function(){
			layer.msg("getMatrixData ajax in error..");
		}
	});
}

var cloudChart;
var wordAllChart;

function getCaculateData(keyword,groupName){
	//加载年度交叉分析
	getYearCrossData();
	deal_with_chart(wordAllChart);
	deal_with_chart(cloudChart);
	//%u 解码
	wordAllChart = echarts.init(document.getElementById('wordAllCount'),"wonderland");
	wordAllChart.showLoading();
	// 显示标题，图例和空的坐标轴
	cloudChart = echarts.init(document.getElementById('wordCloud'),'wonderland');
	cloudChart.showLoading();
	$.ajax({
		type:'POST',
		url: ctx+'/data/caculate',
		dataType: 'json',
		async:true,
		data:{"keyword":keyword,
			"groupName":groupName,
			"urlName":"GroupTrend.aspx"
		},
		success: function(ret){
			debugger;
			console.log("getCaculateData" + ret.data +" " + ret.status);
			if(ret.status === 0 && ret.data != null){
				caculate_flag = 1;
				var str = unescape(ret.data.ret);
				loadWordCount(str,wordAllChart);
				loadWordCloud(str,cloudChart);
			}else{
				layer.msg("计量数据获取失败，重新加载中....");
				getCaculateData(keyword,"关键词");
			}
		},
		error:function(){
			layer.msg("wordAllChart Failed...");
		}
	});
}

//测试数据用
/*$("#cross").bind("click",function(event){
	layer.msg("加载年度交叉分析....");
	getYearCrossData();
})*/

var yearChart;

function getYearCrossData(){
	
	deal_with_chart(yearChart);
	yearChart = echarts.init(document.getElementById('yearCross'),'wonderland');
	yearChart.showLoading();
	
	$.ajax({
		type:"POST",
		url: ctx+'/data/caculate',
		dataType: 'json',
		async:true,
		data:{"keyword":keyword,
			"groupName":"关键词",
			"urlName":"GroupYearCross.ashx"
		},
		success:function( ret ){
			debugger;
			if( ret.status == 0 ){
				var str = unescape(ret.data.ret);
				loadYearChart(str,yearChart);
			}else{
				layer.msg("年度交叉分析出错...",{icon:3});
				//出错重新加载
				getYearCrossData();
			}
		}
		
	});
}


function loadMatrix(str){
	
	var scatter = [];
	scatter[0] = [];
	
	debugger;
	var obj = jQuery.parseJSON(str);
	var data = [];
	var links = [];
	var categories = [];
	for(var i=0 ;i<20; i++){
		var row = {};
		row.name = obj.XTitles[i] ;
		row.value = keywordCount[i];
		var temp = parseInt( Percentage(row.value,getSum(keywordCount)) ) * 3;
		row.symbolSize = temp < 10? temp+25:temp<20?temp+15:temp<50?temp+10:temp+10;
	
	/*	row.tooltip = {};
		row.tooltip.formatter = row.name  + "：" + keywordCount[i];*/
		data.push(row);
	}
	debugger;
	  for(var i=0; i<20; i++){
		  //初始化第一项
		  if(i===0){
			  data[i].category = 0;
			  categories.push(data[i].category);
		  }
		  for(var j=i+1; j<20; j++){
			  if(obj.matrixValue[i][j] === 0)continue;
			  var link = {};
			  if(typeof(data[i].category) == 'undefined'){
				  data[i].category = 0;
				  data[j].category = 1;
			  }else{
				  if(typeof(data[j].category) == 'undefined'){
					  data[j].category = parseInt(data[i].category)+1;
					  categories.push(data[j].category);
				  }
			  }
			  link.source = i;
			  link.target = j;
			  link.value = obj.matrixValue[i][j];
			  links.push(link);
			  scatter[0].push(
				  [obj.XTitles[i],obj.XTitles[j],link.value]
			  );
		  }
	  }
	
	debugger;
	categories.sort(); //先排序
	var res = [categories[0]];
	for(var i = 1; i < categories.length; i++){
		if(links[i] !== res[res.length - 1]){
			res.push(categories[i]);
		}
	}
    console.log(scatter);	  
	var option = {
			 title:{
			        text: "关键词共现网络",
			        subtext: "<数据来自中国知网>",
			        top: "top",
			        left: "center"
			    },
		      tooltip: {
		    	  trigger:'item'
		      },
		      legend: [{
		         
		          formatter: function (name) {
		        return echarts.format.truncateText(name, 40, 
		        '18px Microsoft Yahei', '…');
		          },
			    tooltip: {
			        show: true
			    },
			    selectedMode: 'false',
			    bottom: 20
		      }],
		      toolbox: {
		        show : true,
		        feature : {
		            dataView : {show: true, readOnly: true},
		            restore : {show: true},
		            saveAsImage : {show: true}
		        }
		    },
		      animationDuration: 1500,
		      animationEasingUpdate: 'quinticOut',
		      series: [{
		          name: '关键词共现网络',
		          type: 'graph',
		          layout: 'force',

		          force: {
		              repulsion: 800
		          }, 
		          edgeSymbolSize: [4, 50],
		          edgeLabel: {
	                  normal: {
	                    show: true,
	                    textStyle: {
	                        fontSize: 14
	                    },
	                    formatter: "{c}"
	                 }
		          },
		          data: data,
		          links:  links,
		          categories: categories,
		          focusNodeAdjacency: true,
		          roam: true,
		          label: {
		              normal: {
		                  show: true,
		                  fontSize:14,
		                  position: 'inside',
		                  formatter:'{b}\n{c}'
		              }
		          },
		          lineStyle: {
		              normal: {
		                  color: 'source',
		                  curveness: 0.3,
		                  type: "solid"
		              }
		          }
		      }]
		  };
	matrixChart.setOption(option);
	matrixChart.hideLoading();
	loadMatrixScatter();
}

function loadWordCloud(data,cloudChart){

	var maskImage  = new Image();
	maskImage.src = "/userLogin/img/word_cloud.svg";
	debugger;
	var obj = jQuery.parseJSON(data);
	var data = [];

	for(var i=0; i<obj.length; i++){
		data.push({name:obj[i].name,value:obj[i].y});
	}
	
	var option =  {
		title:{
			text:"词云图",
			link:'https://github.com/ecomfe/echarts-wordcloud',
			subtext: '数据来自 cnki.net',
			sublink:'http://kns.cnki.net',
		},
		tooltip: {},
		series: [{
		        type: 'wordCloud',
		        gridSize: 10,
		        sizeRange: [12, 40],
		        rotationRange: [0,0],
		        shape: 'pentagon',
		        //maskImage:maskImage,
		        textStyle: {
		            normal: {
		                color:function () {
                            var colors =  [
                                "#4ea397","#22c3aa","#7bd9a5", "#d0648a","#f58db2","#f2b3c9",
                                "#2ec7c9","#b6a2de","#5ab1ef","#ffb980","#d87a80", "#8d98b3",
                                "#e5cf0d","#97b552","#95706d","#dc69aa","#07a2a4", "#9a7fd1",
                                "#588dd5", "#f5994e","#c05050", "#59678c", "#c9ab00","#7eb00a",
                                "#6f5553","#c14089"
                            ] 
                            return colors[parseInt(Math.random() * 26)];
                        }
		            },
		            emphasis: {
		                shadowBlur: 10,
		                shadowColor: '#333'
		            }
		        },
		        data:data}]
	};
	//设置图标 隐藏loading
	cloudChart.setOption(option);
	cloudChart.hideLoading();
}

var keywordCount;
function loadWordCount(data,wordAllChart){
	var obj = jQuery.parseJSON(data);
	var ys = []; 
	var xs = [];
	for( var i=0; i<obj.length; i++){
		xs.push(obj[i].name);
		ys.push(obj[i].y);
	}
	keywordCount = ys;
	getMatrixData(keyword,"关键词");
	wordAllChart.setOption( {
	    title: {
	        text: '关键词分布',
	        subtext: '与<'+keyword+'>相关的关键词分布'
	    },
	    tooltip: {
	        trigger: 'axis',
	        axisPointer: {
	            type: 'shadow',
	            label: {
	                backgroundColor: '#283b56'
	            }
	        }
	    },
	    legend: {
	        data:['文献数(篇)']
	    },
	    toolbox: {
	        show: true,
	        feature: {
	       	 	myTool1:{
	             	show:true,
	             	title:"更新数据",
	             	 icon: 'path://M50.104,88.326c-7.857,0-15.78-2.388-22.601-7.349c-8.302-6.039-13.746-14.941-15.33-25.067 c-1.582-10.115,0.879-20.24,6.929-28.51C30.803,11.406,53.225,6.948,70.148,17.252c1.626,0.989,2.142,3.11,1.151,4.737 c-0.99,1.626-3.11,2.143-4.737,1.151c-13.889-8.454-32.292-4.796-41.896,8.33c-4.96,6.781-6.978,15.082-5.681,23.374 c1.299,8.303,5.764,15.604,12.574,20.557c14.053,10.224,33.828,7.143,44.081-6.872c3.094-4.229,5.094-9.188,5.783-14.341 c0.252-1.888,1.983-3.209,3.874-2.96c1.888,0.252,3.213,1.987,2.96,3.874c-0.842,6.291-3.28,12.342-7.053,17.498 C73.69,82.873,61.973,88.326,50.104,88.326z',
	             	 onclick:function(){
	             		 wordAllChart.showLoading();
	             		 keyword = $("#search").val().trim();
	             		 if( str_is_null(keyword) ){
	             			 layer.msg("请先输入关键词再更新数据。",{icon:3});
	             			 return;
	             		 }
	             		 getCaculateData(keyword,"关键词");
	             	 }

	            },
	            magicType: {show: true, type: ['line']},
	            restore: {},
	            dataView: {readOnly: false},
	            saveAsImage: {show:true}
	        }
	    },
	    dataZoom: {
	        show: true,
	        realtime:true,
	        start: 0,
	        end: Percentage(10,obj.length),
	        
	    },
	    xAxis: [
	        {
	            data: xs,
	            axisLabel: {  
	            	   interval:0,  
	            	   rotate:-20  
	            	}  
	        }
	    ],
	    yAxis: [
	        {
	            type: 'value',
	            scale: true,
	            name: '文献数(篇)',
	            nameLocation:"center",
	            nameGap:50
	        }
	    ],
	    series: [
	        {
	            name:'文献数(篇)',
	            type:'bar',
	            data:ys,
	            barCategoryGap:"40%"
	        }
	    ]
	});
	wordAllChart.hideLoading();
}


function loadYearChart(data,yearChart){
	
	var obj = jQuery.parseJSON(data);
	var series = [];
	var length = obj.series.length;
	var legends = [];
	for( var i=0; i<length; i++ ){
		var name = obj.series[i].name;
		legends.push( name );
		series.push(
		  {
	            name: name,
	            type: 'bar',
	            stack: '总量',
	            label: {
	                normal: {
	                    show: true,
	                    position: 'insideRight'
	                }
	            },
	            data:obj.series[i].data
	        }
		);
	}
	option = {
			 title:{
			        text: "年度关键词交叉分析",
			        subtext: "<数据来自中国知网>",
			        top: "top",
			        left: "center"
			    },
		    tooltip : {
		        trigger: 'axis',
		        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
		            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
		        }
		    },
		    legend: {
		        data:legends,
		        left:50,
		        top:50
		    },
		    grid: {
		        left: '5%',
		        right: '5%',
		        bottom: '3%',
		        containLabel: true
		    },
		    toolbox:{
		    	show:true,
		    	feature:{
		    		magicType: {
		    			type: ['line']
		    		},
		    		restore:{},
		    		saveAsImage:{}
		    	},
		    	right:10
		    },
		    
		    xAxis:  {
		         type: 'category',
		        data:obj.categories 
		     
		    },
		    yAxis: {
		          type: 'value'
		    },
		    barCategoryGap:"50%",
		    series: series
		};
	yearChart.setOption(option);
	yearChart.hideLoading();
	
}




