
var publishChart = echarts.init(document.getElementById('publishCount'),"wonderland");
publishChart.showLoading();

var growthChart = echarts.init(document.getElementById('yearGrowth'),"wonderland");
growthChart.showLoading();

var wordChart = echarts.init(document.getElementById('wordCount'),"wonderland");
wordChart.showLoading();
// 显示标题，图例和空的坐标轴
var keyword = getUrlParam("keyword");
var numType = getUrlParam("numType");




function loadWordEcharts(data){
	debugger;
	var obj = jQuery.parseJSON(data.ret);
	var ys = []; 
	var xs = [];
	wordChart.hideLoading();
	for( var i=0; i<obj.key.length; i++){
		xs.push(obj.key[i]);
		ys.push(obj.cnt[i]);
	}
	
	wordChart.hideLoading();
	wordChart.setOption( {
	    title: {
	        text: '相关词 Top 5',
	        subtext: '与<'+keyword+'>共现次数最多的关键词 top 5'
	    },
	    tooltip: {
	        trigger: 'axis',
	        axisPointer: {
	            type: 'shadow'
	        }
	    },
	    legend: {
	        data: ['共现次数']
	    },
	    grid: {
	        left: '3%',
	        right: '4%',
	        bottom: '3%',
	        containLabel: true
	    },
	    xAxis: {
	        type: 'value',
	        boundaryGap: [0, 0.01]
	    },
	    yAxis: {
	        type: 'category',
	        data:xs
	    },
	    series: [
	        {
	            name: '共现次数',
	            type: 'bar',
	            data: ys
	        }
	    ]
	});
}

function loadPublishEcharts(data){
    debugger;
    var obj = jQuery.parseJSON(data.ret);
    if( numType === 'Academic' ){
    	setPublish(obj);
    }else {
    	setOther(obj);
    }
}

/*其他*/
function setOther(obj){
	//X轴坐标值 
    var xs=[];
    //ys 
    var ys=[]; 
    var growY = [];
    growY.push(100);
    var count = 1;
    var info = {};
    if(numType === 'User'){
    	info.text = "用户关注度";
    	info.legend = "用户下载量";
    	info.tooltip = "文献下载量趋势统计";
    }else if(numType === "Media"){
    	info.text = "媒体关注度";
    	info.legend = "媒体发文量";
    	info.tooltip = "报纸文献发文量趋势统计";
    }else if(numType === "Cited"){
    	info.text = "学术传播度";
    	info.legend = "文献被引量";
    	info.tooltip = "文献被引量趋势统计";
    }
    
    
    if (obj != null && obj != undefined && obj != 'undefined') {
	    	for(var i=0; i<obj.key.length; i++){
	    		xs.push(obj.key[i][0]);
	        	ys.push(obj.key[i][1]);
	        	if(i != 0){
	        		growY.push(Percentage(ys[i]-ys[i-1],ys[i-1]));
	        	}
	        }
	    	growthChart.hideLoading();
	    	publishChart.hideLoading();    //隐藏加载动画
	    	publishChart.setOption({        //加载数据图表
        	   title: {
        	        text: info.text,
        	        subtext:'篇名包含<'+keyword+">的"+info.tooltip
        	    },
        	   legend:{
        		   data:[info.legend]
        		   
        	   },
        	   dataZoom : {
        	        show : true,
        	        realtime : true,
        	        start : 100-Percentage(10,obj.key.length),
        	        end : 100
        	    },
        	    tooltip: {
        	        trigger: 'axis',
        	        axisPointer: {
        	            type: 'cross'
        	        }
        	    },
               xAxis: {
                   data: xs
               },
               yAxis:{
            	    name: '文献数(篇)',
    	            nameLocation:"center",
    	            nameGap:50
               },
               series: [{
                   // 根据名字对应到相应的系列
                   name: info.legend,
                   type: 'line',
                   data: ys
               }
               ]
           });
	    	

	    	growthChart.setOption({        //加载数据图表
	        	   title: {
	        	        text: info.text+"同比增长率",
	        	        subtext:'篇名包含<'+keyword+">的"+info.tooltip
	        	    },
	        	   legend:{
	        		   data:[info.legend+"同比增长率"]
	        		   
	        	   },
	        	   dataZoom : {
	        	        show : true,
	        	        realtime : true,
	        	        start : 100-Percentage(10,obj.key.length),
	        	        end : 100
	        	    },
	        	    tooltip: {
	        	        trigger: 'axis',
	        	        axisPointer: {
	        	            type: 'cross'
	        	        }
	        	    },
	               xAxis: {
	                   data: xs
	               },
	               yAxis:{
	            	   
	               },
	               series: [{
	                   // 根据名字对应到相应的系列
	                   name: info.legend+"同比增长率",
	                   type: 'line',
	                   data: growY
	               }
	               ]
	           });
    }else{
    	myChart.hideLoading(); 
		toastr.warning("Failed!");
    	
    }
    
    return count;
}




/*学术发文量*/
function setPublish(obj){
	//X轴坐标值 
    var xs=[];
    //ys 
    var ys=[];    
    var ys2=[];
    var count = 1;
    
    //grow
    var growY = [];
    growY.push(100);
    var growY2 = [];
    

    if (obj != null && obj != undefined && obj != 'undefined') {
	    	for(var i=0; i<obj.key.length; i++){
	    		xs.push(obj.key[i][0]);
	        	ys.push(obj.key[i][1]);
	        	if(i != 0){
	        		growY.push(Percentage(ys[i]-ys[i-1],ys[i-1]));
	        	}
	        }
	    	for( var i=0; i<obj.foreign.length; i++){
	    		
	    		ys2.push(obj.foreign[i][1]);
	    		if(i != 0){
	    			growY2.push(Percentage(ys2[i]-ys2[i-1],ys2[i-1]));
	    		}
	    	}
	    	publishChart.hideLoading();    //隐藏加载动画
	    	
	    	publishChart.setOption({        //加载数据图表
        	   title: {
        	        text: '相关词文献发文量',
        	        subtext:'篇名包含<'+keyword+">的文献发文量趋势统计"
        	    },
        	   legend:{
        		   data:["中文发文量","外文发文量"]
        		   
        	   },
        	   dataZoom : {
        	        show : true,
        	        realtime : true,
        	        start : 100-Percentage(10,obj.key.length),
        	        end : 100
        	    },
        	    tooltip: {
        	        trigger: 'axis',
        	        axisPointer: {
        	            type: 'cross'
        	        }
        	    },
               xAxis: {
                   data: xs
               },
               yAxis:{
            	   
               },
               series: [{
                   // 根据名字对应到相应的系列
                   name: '中文发文量',
                   type: 'line',
                   data: ys
               },
               {
                   // 根据名字对应到相应的系列
                   name: '外文发文量',
                   type: 'line',
                   data: ys2
               },
               ]
           });
	    	growthChart.hideLoading();
	    	growthChart.setOption({        //加载数据图表
	        	   title: {
	        	        text: '相关词文献发文量同比增长率',
	        	        subtext:'篇名包含<'+keyword+">的文献发文量趋势统计"
	        	    },
	        	   legend:{
	        		   data:["中文发文量同比增长率","外文发文量同比增长率"]
	        		   
	        	   },
	        	   dataZoom : {
	        	        show : true,
	        	        realtime : true,
	        	        start : 100-Percentage(10,obj.key.length),
	        	        end : 100
	        	    },
	        	    tooltip: {
	        	        trigger: 'axis',
	        	        axisPointer: {
	        	            type: 'cross'
	        	        }
	        	    },
	               xAxis: {
	                   data: xs
	               },
	               yAxis:{
	            	   type:"value",
	            	   axisLabel: {
	   	                formatter: '{value} %'
	   	            }
	               },
	               series: [{
	                   // 根据名字对应到相应的系列
	                   name: '中文发文量同比增长率',
	                   type: 'line',
	                   data: growY
	               },
	               {
	                   // 根据名字对应到相应的系列
	                   name: '外文发文量同比增长率',
	                   type: 'line',
	                   data: growY2
	               },
	               ]
	           });
    }else{
    	myChart.hideLoading(); 
		toastr.warning("Failed!");
    	
    }
}





