/**
 * 加载用户关注度图表
 * @param data 计量数据
 * @param userChart 图表div
 * @returns
 */
function loadUserChart(data,userChart){
	debugger;
	//解析成json对象
	var obj = jQuery.parseJSON(data.ret);
	//X轴坐标值 
    var xs=[]; var ys=[];    
    //grow 计算同比增张率数组
    var growY = [];
    if (obj != null && obj != undefined && obj != 'undefined') {

	    	growY.push(0);
	    	xs.push(obj.key[0][0]);
    		ys.push(obj.key[0][1]);
	    	for(var i=1; i<obj.key.length; i++){
	    		xs.push(obj.key[i][0]);
	    		ys.push(obj.key[i][1]);
	    		growY.push( year_to_year(obj.key[i][1],obj.key[i-1][1]) );
	    	}
	    	
	    	userChart.setOption({        //加载数据图表
        	   title: {
        	        text: '相关词文献下载量',
        	        subtext:'篇名包含<'+keyword+">的文献下载量趋势统计"
        	    },
        	   stillShowZeroSum:false,
        	   legend:{
        		   data:["用户下载量","下载量同比增长率"],
        		   	formatter: function (name) {
        		        return echarts.format.truncateText(name, 100, '14px Microsoft Yahei', '…');
        		    },
        		    tooltip: {
        		        show: true
        		    }
        	   },
        	   toolbox: {
        	        show: true,
        	        feature: {
        	            myTool1:{
        	            	show:true,
        	            	title:"更新数据",
        	            	 icon: 'path://M50.104,88.326c-7.857,0-15.78-2.388-22.601-7.349c-8.302-6.039-13.746-14.941-15.33-25.067 c-1.582-10.115,0.879-20.24,6.929-28.51C30.803,11.406,53.225,6.948,70.148,17.252c1.626,0.989,2.142,3.11,1.151,4.737 c-0.99,1.626-3.11,2.143-4.737,1.151c-13.889-8.454-32.292-4.796-41.896,8.33c-4.96,6.781-6.978,15.082-5.681,23.374 c1.299,8.303,5.764,15.604,12.574,20.557c14.053,10.224,33.828,7.143,44.081-6.872c3.094-4.229,5.094-9.188,5.783-14.341 c0.252-1.888,1.983-3.209,3.874-2.96c1.888,0.252,3.213,1.987,2.96,3.874c-0.842,6.291-3.28,12.342-7.053,17.498 C73.69,82.873,61.973,88.326,50.104,88.326z',
        	            	 onclick:function(){
        	            		 //点击更新数据
        	            		 publishChart.showLoading();
        	            		 getIndexData(keyword,'GetAttention','Academic');
        	            	 }
        	            },
        	            magicType: {
        	                type: ['line', 'bar', 'stack', 'tiled']
        	            },
        	            dataView: {readOnly: false},
        	            restore: {},
        	            saveAsImage: {}
        	        }
        	   },
        	   dataZoom : [
        		   {
        	        show : true,
        	        realtime : true,
        	        start : obj.key.length>20?100-Percentage(20,obj.key.length):0,
        	        end : 100
        		   },
        	    {
        	    	type:"inside",
        	    	start :  obj.key.length>20?100-Percentage(20,obj.key.length):0,
           	        end : 100
        	    }
        	   ],
        	    tooltip: {
        	        trigger: 'axis',
        	        axisPointer: {
        	            type: 'shadow'
        	        }/*,
        	        formatter:"{b}年</br>" +
        	        		"{a0}:{c0}篇</br>{a1}:{c1}篇</br>{a2}:{c2}%</br>{a3}:{c3}%"*/
        	    },
               xAxis: {
            	   type:"category",
                   data: xs,
                   //boundaryGap:[]
               },
               yAxis:[{
                   type: 'value',
                   scale: true,
                   name: '文献量(篇)',
                   nameLocation:"center",
   	               nameGap:50,
   	               min: 0.000000001, //如果使用0，会出现你之前的情况，必须大于0的，使用0.000000001无限接近0
   	               axisLabel: {
   	            	   formatter: function(value, index) {
	   	                 if (index === 0) { //因为最小值不是0，重新转化为0
	   	                     value = Math.floor(value);
	   	                 }
	   	                 return value;
   	            	   }
   	               },
   	         
   	             /*  boundaryGap:true*/
                 
               },{
            	   type: 'value',
                   scale: true,
                   position:"right",
                   name: '增长率(%)',
                   nameLocation:"center",
   	               nameGap:60,
	   	           axisLabel: {
	   	                formatter: '{value} %'
	   	            }
               }],
               series: [{
                   // 根据名字对应到相应的系列
                   name: '用户下载量',
                   type: 'bar',
                   yAxisIndex:0,
                   data: ys
               },
               {
            	   name:'下载量同比增长率',
            	   type:'line',
            	   yAxisIndex:1,
            	   data:growY
               }
               ]
           });
	    	userChart.hideLoading();    //隐藏加载动画
    }else{
    	userChart.hideLoading();
		toastr.warning("Failed!");
    	
    }
}

/**
 * 关键词 环图
 * @param data 数据
 * @param name 根据学科code
 * @returns
 */
function loadWordEcharts(data,name){
	debugger;
	wordChart.showLoading();
	var info = "";
	if( name != ""){
		info = "学科-> "+name;
	}
	var obj = jQuery.parseJSON(data.ret);
	var ys = [];
	var xs = [];
	
	for( var i=0; i<obj.key.length; i++){
		xs.push(obj.key[i]);
		var item = {};
		item.name = obj.key[i];
		item.value = obj.cnt[i]
		ys.push(item);
	}
	
	wordChart.setOption( {
	    title: {
	        text: '相关词 Top 5 \n'+info,
	        subtext:'与<'+keyword+'>共现次数最多的关键词 top 5'
	    },
	    tooltip: {
	        trigger: 'item',
	        formatter:'{b}<br/>共现次数：{c}次 （{d}%）'
	        
	    },
	    legend: {
	    	orient: 'horizontal',
	    	x:"center",
	    	bottom:"1",
	        data: xs
	    },
	    series: [
	        {
	        	radius: ['50%', '70%'],
	    	    avoidLabelOverlap: false,
	            label: {
	                normal: {
	                    show: false,
	                    position: 'center'
	                },
	                emphasis: {
	                    show: true,
	                    textStyle: {
	                        fontSize: '30',
	                        fontWeight: 'bold'
	                    }
	                }
	            },
	            labelLine: {
	                normal: {
	                    show: false
	                }
	            },
	            name: '共现次数',
	            type: 'pie',
	            data: ys
	        }
	    ]
	});
	wordChart.hideLoading();
}


/**
 * 加载发文量图表
 * @param data 数据
 * @returns
 */
function loadPublishEcharts(data){
	debugger;
	var obj = jQuery.parseJSON(data.ret);
	//X轴坐标值 
    var xs=[];
    //ys 
    var ys = [];
    var ys2 = [];
    //grow
    var growY = [];
    var growY2 = [];
    var flag = true;
    if( obj.foreign.length == 0 ){
		 	flag = false;
	    }

    if (obj != null && obj != undefined && obj != 'undefined') {
    		//可能为空
    		if( flag ){
	    	 	growY2.push( [ obj.foreign[0][0]+"" , 0 ]);
		    	for( var i=1; i<obj.foreign.length; i++){
		    		xs.push( obj.foreign[i][0] );
		    		var y = [];
		    		y.push( obj.foreign[i][0]+"" );
		    		y.push( obj.foreign[i][1] );
		    		ys2.push(y);
		    		var item = [];
		    		item.push( obj.foreign[i][0]+"" );
		    		item.push( year_to_year(obj.foreign[i][1],obj.foreign[i-1][1]) );
		    		growY2.push( item );
		    	}
    		}
	    	growY.push ( [ obj.key[0][0]+"" , 0 ] );
	    	for(var i=1; i<obj.key.length; i++){
	    		//如果没有外文发文量  就在中文发文量里把X轴的坐标push进数组
	    		if( !flag ){
	    			xs.push( obj.key[i][0] );
	    		}
	    		var y = [];
	    		y.push( obj.key[i][0]+"" );
	    		y.push( obj.key[i][1] );
	    		ys.push(y);
	    		var item = [];
	    		item.push( obj.key[i][0]+"" );
	    		item.push( year_to_year(obj.key[i][1],obj.key[i-1][1]) );
	    		growY.push( item );
	    	}
	    	
	    	/*for(var i=0; i<obj.key.length; i++){
	        	ys.push(obj.key[i][1]);
	        	if(i != 0){
	        		growY.push( year_to_year(ys[i],ys[i-1]) );
	        	}
	        }*/
	    	var publish_series = [];
	    	var publish_legend = [];
	    	debugger;
	    	if( flag ){
	    		publish_legend.push("中文发文量","外文发文量","中文发文同比增长率","外文发文同比增长率");
	    		publish_series.push({
	                   // 根据名字对应到相应的系列
	                   name: '中文发文量',
	                   type: 'bar',
	                   yAxisIndex:0,
	                   data: ys
	               },
	               {
	                   // 根据名字对应到相应的系列
	                   name: '外文发文量',
	                   type: 'bar',
	                   yAxisIndex:0,
	                   data: ys2
	               },
	               {
	            	   name:'中文发文同比增长率',
	            	   type:'line',
	            	   yAxisIndex:1,
	            	   data:growY
	               },
	               {
	            	   name:'外文发文同比增长率',
	            	   type:'line',
	            	   yAxisIndex:1,
	            	   data:growY2
	               }
	               );
	    	}else{
	    		publish_legend.push("中文发文量","中文发文同比增长率");
	    		publish_series.push({
	                   // 根据名字对应到相应的系列
	                   name: '中文发文量',
	                   type: 'bar',
	                   yAxisIndex:0,
	                   data: ys
	               },
	               {
	            	   name:'中文发文同比增长率',
	            	   type:'line',
	            	   yAxisIndex:1,
	            	   data:growY
	               });
	    	}
	    	publishChart.setOption({        //加载数据图表
        	   title: {
        	        text: '相关词文献发文量',
        	        subtext:'篇名包含<'+keyword+">的文献发文量趋势统计"
        	    },
        	    stillShowZeroSum:false,
        	   legend:{
        		   data:publish_legend,
        		   formatter: function (name) {
        		        return echarts.format.truncateText(name, 100, '14px Microsoft Yahei', '…');
        		    },
        		    tooltip: {
        		        show: true
        		    }
        		   
        	   },
        	   toolbox: {
        	        show: true,
        	        feature: {
        	            myTool1:{
        	            	show:true,
        	            	title:"更新数据",
        	            	 icon: 'path://M50.104,88.326c-7.857,0-15.78-2.388-22.601-7.349c-8.302-6.039-13.746-14.941-15.33-25.067 c-1.582-10.115,0.879-20.24,6.929-28.51C30.803,11.406,53.225,6.948,70.148,17.252c1.626,0.989,2.142,3.11,1.151,4.737 c-0.99,1.626-3.11,2.143-4.737,1.151c-13.889-8.454-32.292-4.796-41.896,8.33c-4.96,6.781-6.978,15.082-5.681,23.374 c1.299,8.303,5.764,15.604,12.574,20.557c14.053,10.224,33.828,7.143,44.081-6.872c3.094-4.229,5.094-9.188,5.783-14.341 c0.252-1.888,1.983-3.209,3.874-2.96c1.888,0.252,3.213,1.987,2.96,3.874c-0.842,6.291-3.28,12.342-7.053,17.498 C73.69,82.873,61.973,88.326,50.104,88.326z',
         	            	 onclick:function(){
        	            		 publishChart.showLoading();
        	            		 getIndexData(keyword,'GetAttention','Academic');
        	            	 }
        	            },
        	            magicType: {
        	                type: ['line', 'bar', 'stack', 'tiled']
        	            },
        	            restore:{},
        	            dataView: {readOnly: false},
        	            saveAsImage: {}
        	        }
        	    },
        	   dataZoom : [
        		   {
        	        show : true,
        	        realtime : true,
        	        start : 100-Percentage(13,obj.foreign.length),
        	        end : 100
        		   },
        	    {
        	    	type:"inside",
        	    	start : 100-Percentage(13,obj.foreign.length),
           	        end : 100
        	    }
        	   ],
        	   tooltip: {
        	        trigger: 'axis',
        	        axisPointer: {
        	            type: 'shadow'
        	        }
        	    },
               xAxis: {
            	   type:"category",
                   data: xs,
               },
               yAxis:[
            	   {
	                   type: 'value',
	                   scale: true,
	                   name: '文献量(篇)',
	                   nameLocation:"center",
	   	               nameGap:50,
	   	               min: 0.000000001, //如果使用0，会出现你之前的情况，必须大于0的，使用0.000000001无限接近0
	   	               axisLabel: {
	   	            	   formatter: function(value, index) {
		   	                 if (index === 0) { //因为最小值不是0，重新转化为0
		   	                     value = Math.floor(value);
		   	                 }
		   	                 return value;
	   	            	   }
	   	               }
            	   },
            	   {
	            	   type: 'value',
	                   scale: true,
	                   position:"right",
	                   name: '增长率(%)',
	                   nameLocation:"center",
	   	               nameGap:55,
		   	           axisLabel: {
		   	                formatter: '{value} %'
	   	           }
               }],
               series: publish_series
           });
	    	publishChart.hideLoading();    //隐藏加载动画
    }else{
    	publishChart.hideLoading();
		toastr.warning("Failed!");
    	
    }
}
function loadMediaChart(data,mediaChart){
	debugger;
	var obj = jQuery.parseJSON(data.ret);
	//X轴坐标值 
    var xs=[];
    //ys 
    var ys=[];    
    //grow
    var growY = [];

    if (obj != null && obj != undefined && obj != 'undefined') {

	    	growY.push(0);
	    	xs.push(obj.key[0][0]);
    		ys.push(obj.key[0][1]);
	    	for(var i=1; i<obj.key.length; i++){
	    		xs.push(obj.key[i][0]);
	    		ys.push(obj.key[i][1]);
	    		growY.push( year_to_year(obj.key[i][1],obj.key[i-1][1]) );
	    	}
	    	
	    	mediaChart.setOption({        //加载数据图表
        	   title: {
        	        text: '相关词媒体发文量',
        	        subtext:'篇名包含<'+keyword+">的媒体发文量趋势统计"
        	    },
        	   stillShowZeroSum:false,
        	   legend:{
        		   data:["媒体发文量","媒体发文量同比增长率"],
        		   formatter: function (name) {
        		        return echarts.format.truncateText(name, 100, '14px Microsoft Yahei', '…');
        		    },
        		    tooltip: {
        		        show: true
        		    }
        	   },
        	   toolbox: {
        	        show: true,
        	        feature: {
        	            myTool1:{
        	            	show:true,
        	            	title:"更新数据",
        	            	 icon: 'path://M50.104,88.326c-7.857,0-15.78-2.388-22.601-7.349c-8.302-6.039-13.746-14.941-15.33-25.067 c-1.582-10.115,0.879-20.24,6.929-28.51C30.803,11.406,53.225,6.948,70.148,17.252c1.626,0.989,2.142,3.11,1.151,4.737 c-0.99,1.626-3.11,2.143-4.737,1.151c-13.889-8.454-32.292-4.796-41.896,8.33c-4.96,6.781-6.978,15.082-5.681,23.374 c1.299,8.303,5.764,15.604,12.574,20.557c14.053,10.224,33.828,7.143,44.081-6.872c3.094-4.229,5.094-9.188,5.783-14.341 c0.252-1.888,1.983-3.209,3.874-2.96c1.888,0.252,3.213,1.987,2.96,3.874c-0.842,6.291-3.28,12.342-7.053,17.498 C73.69,82.873,61.973,88.326,50.104,88.326z',
         	            	 onclick:function(){
        	            		 mediaChart.showLoading();
        	            		 getMediaData(mediaChart);
        	            	 }
        	            },
        	            dataView: {readOnly: false},
        	            restore: {},
        	            saveAsImage: {}
        	        
        	        }
        	    },
        	   dataZoom : [
        		   {
        	        show : true,
        	        realtime : true,
        	        start : obj.key.length>20?100-Percentage(20,obj.key.length):0,
        	        end : 100
        		   },
        	    {
        	    	type:"inside",
        	    	start :  obj.key.length>20?100-Percentage(20,obj.key.length):0,
           	        end : 100
        	    }
        	   ],
        	    tooltip: {
        	        trigger: 'axis',
        	        axisPointer: {
        	            type: 'shadow'
        	        }/*,
        	        formatter:"{b}年</br>" +
        	        		"{a0}:{c0}篇</br>{a1}:{c1}篇</br>{a2}:{c2}%</br>{a3}:{c3}%"*/
        	    },
               xAxis: {
            	   type:"category",
                   data: xs,
                   //boundaryGap:[]
               },
               yAxis:[{
                   type: 'value',
                   scale: true,
                   name: '文献量(篇)',
                   nameLocation:"center",
   	               nameGap:50,
   	               min: 0.000000001, //如果使用0，会出现你之前的情况，必须大于0的，使用0.000000001无限接近0
   	               axisLabel: {
   	            	   formatter: function(value, index) {
	   	                 if (index === 0) { //因为最小值不是0，重新转化为0
	   	                     value = Math.floor(value);
	   	                 }
	   	                 return value;
   	            	   }
   	               },
   	         
   	              /* boundaryGap:true*/
                 
               },{
            	   type: 'value',
                   scale: true,
                   position:"right",
                   name: '增长率(%)',
                   nameLocation:"center",
   	               nameGap:60,
	   	           axisLabel: {
	   	                formatter: '{value} %'
	   	            }
               }],
               series: [{
                   // 根据名字对应到相应的系列
                   name: '媒体发文量',
                   type: 'bar',
                   yAxisIndex:0,
                   data: ys
               },
               {
            	   name:'媒体发文量同比增长率',
            	   type:'line',
            	   yAxisIndex:1,
            	   data:growY
               }
               ]
           });
	    	mediaChart.hideLoading();    //隐藏加载动画
    }else{
    	mediaChart.hideLoading(); 
		toastr.warning("MediaChart Failed!");
    	
    }
}
function loadCitedChart(data,citedChart){
	debugger;
	var obj = jQuery.parseJSON(data.ret);
	//X轴坐标值 
    var xs=[];
    //ys 
    var ys=[];    
    //grow
    var growY = [];

    if (obj != null && obj != undefined && obj != 'undefined') {

	    	growY.push(0);
	    	xs.push(obj.key[0][0]);
    		ys.push(obj.key[0][1]);
	    	for(var i=1; i<obj.key.length; i++){
	    		xs.push(obj.key[i][0]);
	    		ys.push(obj.key[i][1]);
	    		growY.push( year_to_year(obj.key[i][1],obj.key[i-1][1]) );
	    	}
	    	
	    	citedChart.setOption({        //加载数据图表
        	   title: {
        	        text: '相关词文献被引量',
        	        subtext:'篇名包含<'+keyword+">的文献被引量趋势统计"
        	    },
        	   stillShowZeroSum:false,
        	   legend:{
        		   data:["文献被引量","被引量同比增长率"],
        		   formatter: function (name) {
        		        return echarts.format.truncateText(name, 100, '14px Microsoft Yahei', '…');
        		    },
        		    tooltip: {
        		        show: true
        		    }
        	   },
        	   toolbox: {
        	        show: true,
        	        feature: {
        	            myTool1:{
        	            	show:true,
        	            	title:"更新数据",
        	            	 icon: 'path://M50.104,88.326c-7.857,0-15.78-2.388-22.601-7.349c-8.302-6.039-13.746-14.941-15.33-25.067 c-1.582-10.115,0.879-20.24,6.929-28.51C30.803,11.406,53.225,6.948,70.148,17.252c1.626,0.989,2.142,3.11,1.151,4.737 c-0.99,1.626-3.11,2.143-4.737,1.151c-13.889-8.454-32.292-4.796-41.896,8.33c-4.96,6.781-6.978,15.082-5.681,23.374 c1.299,8.303,5.764,15.604,12.574,20.557c14.053,10.224,33.828,7.143,44.081-6.872c3.094-4.229,5.094-9.188,5.783-14.341 c0.252-1.888,1.983-3.209,3.874-2.96c1.888,0.252,3.213,1.987,2.96,3.874c-0.842,6.291-3.28,12.342-7.053,17.498 C73.69,82.873,61.973,88.326,50.104,88.326z',
         	            	  onclick:function(){
        	            		 citedChart.showLoading();
        	            		 getCitedData(citedChart);
        	            	 }
        	            },
        	            dataView: {readOnly: false},
        	            restore: {},
        	            saveAsImage: {}
        	        }
        	    },
        	   dataZoom : [
        		   {
        	        show : true,
        	        realtime : true,
        	        start : obj.key.length>20?100-Percentage(20,obj.key.length):0,
        	        end : 100
        		   },
        	    {
        	    	type:"inside",
        	    	start :  obj.key.length>20?100-Percentage(20,obj.key.length):0,
           	        end : 100
        	    }
        	   ],
        	    tooltip: {
        	        trigger: 'axis',
        	        axisPointer: {
        	            type: 'shadow'
        	        }/*,
        	        formatter:"{b}年</br>" +
        	        		"{a0}:{c0}篇</br>{a1}:{c1}篇</br>{a2}:{c2}%</br>{a3}:{c3}%"*/
        	    },
               xAxis: {
            	   type:"category",
                   data: xs,
                   //boundaryGap:[]
               },
               yAxis:[{
                   type: 'value',
                   scale: true,
                   name: '文献量(篇)',
                   nameLocation:"center",
   	               nameGap:50,
   	               min: 0.000000001, //如果使用0，会出现你之前的情况，必须大于0的，使用0.000000001无限接近0
   	               axisLabel: {
   	            	   formatter: function(value, index) {
	   	                 if (index === 0) { //因为最小值不是0，重新转化为0
	   	                     value = Math.floor(value);
	   	                 }
	   	                 return value;
   	            	   }
   	               },
   	         
   	              /* boundaryGap:true*/
                 
               },{
            	   type: 'value',
                   scale: true,
                   position:"right",
                   name: '增长率(%)',
                   nameLocation:"center",
   	               nameGap:60,
	   	           axisLabel: {
	   	                formatter: '{value} %'
	   	            }
               }],
               series: [{
                   // 根据名字对应到相应的系列
                   name: '文献被引量',
                   type: 'bar',
                   yAxisIndex:0,
                   data: ys
               },
               {
            	   name:'被引量同比增长率',
            	   type:'line',
            	   yAxisIndex:1,
            	   data:growY
               }
               ]
           });
	    	citedChart.hideLoading();    //隐藏加载动画
    }else{
    	citedChart.hideLoading(); 
		toastr.warning("Failed!");
    }
}


