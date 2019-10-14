
var wordChart = echarts.init(document.getElementById('wordCount'),"vintage");
wordChart.showLoading();
// 显示标题，图例和空的坐标轴
var matrixChart = echarts.init(document.getElementById('matrix'),'vintage');
matrixChart.showLoading();

var cloudChart = echarts.init(document.getElementById('wordCloud'),'vintage');
cloudChart.showLoading();


function getSum(a){
	
	return eval(a.join("+"));
}

function loadMatrix(str){
	debugger;
	var obj = jQuery.parseJSON(str);
	var data = [];
	var links = [];
	var categories = [];
	for(var i=0 ;i<20; i++){
		var row = {};
		row.name = obj.XTitles[i] ;
		row.value = keywordCount[i];
		row.symbolSize = parseInt( Percentage(row.value,getSum(keywordCount)) ) * 10;
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
    	  
	matrixChart.hideLoading();
	option = {
			  
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
		          bottom: 20,
		          data: ['计算机科学与教育软件学院', 
		          '地理科学学院']
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
		      animationEasingUpdate: 'quinticInOut',
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
	debugger;
}



var keywordCount = [];

function loadWordCloud(data){
	debugger;
	var obj = jQuery.parseJSON(data);
	var data = [];
	cloudChart.hideLoading();

	for(var i=0; i<obj.length; i++){
		data.push({name:obj[i].name,value:obj[i].y});
	}
	
	cloudChart.setOption({
	 
		 title:{
		        text:"词云图",
		        link:'https://github.com/ecomfe/echarts-wordcloud',
		        subtext: '数据来自',
		        sublink:'http://data-visual.cn',
		    },
		 tooltip: {},
		series: [{
		        type: 'wordCloud',
		        gridSize: 20,
		        sizeRange: [12, 50],
		        rotationRange: [0, 0],
		        shape: 'smooth',
		        textStyle: {
		            normal: {
		                color: function() {
		                    return 'rgb(' + [
		                        Math.round(Math.random() * 160),
		                        Math.round(Math.random() * 160),
		                        Math.round(Math.random() * 160)
		                    ].join(',') + ')';
		                }
		            },
		            emphasis: {
		                shadowBlur: 10,
		                shadowColor: '#333'
		            }
		        },
		        data:data}]
	});
	
	
	cloudChart.hideLoading();
	
}


function loadWordCount(data){
	var obj = jQuery.parseJSON(data);
	var ys = []; 
	var xs = [];
	wordChart.hideLoading();
	for( var i=0; i<obj.length; i++){
		xs.push(obj[i].name);
		ys.push(obj[i].y);
	}
	keywordCount = ys;
	wordChart.setOption( {
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
	            dataView: {readOnly: false},
	            magicType: {show: true, type: ['line']},
	            restore: {},
	            saveAsImage: {show:true}
	        }
	    },
	    dataZoom: {
	        show: true,
	        realtime:true,
	        start: 0,
	        end: Percentage(10,obj.length)
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
	            data:ys
	        }
	    ]
	});
	
	
	wordChart.hideLoading();
	
}







