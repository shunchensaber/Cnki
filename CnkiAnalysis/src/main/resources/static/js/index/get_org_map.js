

$("#buttonMap").bind("click",function(){
	//debugger;
	getMap('org_distribute','#buttonMap',orgMap);
});
$("#fundMap").bind("click",function(){
	//debugger;
	getMap('fund_distribute','#fundMap',fundMap);
});


var organChart;
function getOrganData(keyword,groupName){
		deal_with_chart(organChart);
		organChart = echarts.init(document.getElementById('org_bar'),"wonderland");
		organChart.showLoading();
		$.ajax({
			type:'POST',
			url: ctx+'/data/caculate',
			dataType: 'json',
			data:{"keyword":keyword,
				"groupName":groupName,
				"urlName":"GroupTrend.aspx"
			},
			success: function(ret){
				if( ret.status == 0 ){
					var str = unescape(ret.data.ret);
					loadOrganChart(organChart,str)
				}else{
					layer.msg("机构分布Error:" +ret.info);
				}
			},
			error:function(){
			}
		});
	}
	
var fundChart;
function getFundData(keyword,groupName){
	debugger;
		deal_with_chart(fundChart);
		fundChart = echarts.init(document.getElementById('fund_bar'),"wonderland");
		fundChart.showLoading();
		$.ajax({
			type:'POST',
			url: ctx+'/data/caculate',
			dataType: 'json',
			data:{"keyword":keyword,
				"groupName":groupName,
				"urlName":"GroupTrend.aspx"
			},
			success: function(ret){
				if( ret.status == 0 ){
					var str = unescape(ret.data.ret);
					loadFundChart(fundChart,str)
				}else{
					layer.msg("基金分布Error:" +ret.info);
				}
			},
			error:function(){
			}
		});
	}

var orgMap;
var fundMap;


var organ_field;
var organ_fieldValue = [];
function loadOrganChart(organChart,str){
	organChart.showLoading();
	var obj = jQuery.parseJSON(str);
	orgMap = obj.slice(0,35);
	var xs = [];
	var ys = []
	organ_field = obj[0].c_field;

	for( var i=0; i<obj.length; i++ ){
		xs.push(obj[i].name);
		ys.push(obj[i].y);
		organ_fieldValue[obj[i].name] = obj[i].c_fieldValue;
	}
	organChart.setOption({
		 title : {
		        text: '机构分布',
		        x:'left',
		        subtext:"机构的文献发表量分布"
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
    	            	 icon: 'path://M432.45,595.444c0,2.177-4.661,6.82-11.305,6.82c-6.475,0-11.306-4.567-11.306-6.82s4.852-6.812,11.306-6.812C427.841,588.632,432.452,593.191,432.45,595.444L432.45,595.444z M421.155,589.876c-3.009,0-5.448,2.495-5.448,5.572s2.439,5.572,5.448,5.572c3.01,0,5.449-2.495,5.449-5.572C426.604,592.371,424.165,589.876,421.155,589.876L421.155,589.876z M421.146,591.891c-1.916,0-3.47,1.589-3.47,3.549c0,1.959,1.554,3.548,3.47,3.548s3.469-1.589,3.469-3.548C424.614,593.479,423.062,591.891,421.146,591.891L421.146,591.891zM421.146,591.891',
    	            	 onclick:function(){
    	            		 orgChart.showLoading();
    	            		 getOrganData($("#search").val().trim(),"机构");
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
     	        end : Percentage(5,obj.length)
     		   },
	     	   {
	     	    	type:"inside",
	     	    	start : 0,
	        	    end : 4
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
			        data:ys,
			        barCategoryGap:"50%"
			    }]
	});
	organChart.hideLoading();
	$("#buttonMap").css("display","block");
	organChart.on('click',function(params){
		console.log(organ_fieldValue[params.name]);
		console.log(organ_field);
		debugger;
		if( array_contains(legend,params.name) ){
    		return;
    	}
    	//不包含则往里push该信息
    	legend.push(params.name+"年度趋势");
		compareAnalysisLineChart(organ_fieldValue[params.name],
    			organ_field,
    			keyword,
    			"机构",
    			params.name
    	);
});
}

var fundMap;
var fund_field;
var fund_fieldValue = [];
function loadFundChart(fundChart,str){
	
	var obj = jQuery.parseJSON(str);
	fundMap = obj.slice(0,35);
	var xs = [];
	var ys = [];
	fund_field = obj[0].c_field;
	for( var i=0; i<obj.length; i++ ){
		xs.push(obj[i].name);
		ys.push(obj[i].y);
		
		fund_fieldValue[obj[i].name] = obj[i].c_fieldValue;
	}
	fundChart.setOption({
		 title : {
		        text: '基金分布',
		        x:'left',
		        subtext:"各机构的文献发表量分布"
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
    	            	 icon: 'path://M432.45,595.444c0,2.177-4.661,6.82-11.305,6.82c-6.475,0-11.306-4.567-11.306-6.82s4.852-6.812,11.306-6.812C427.841,588.632,432.452,593.191,432.45,595.444L432.45,595.444z M421.155,589.876c-3.009,0-5.448,2.495-5.448,5.572s2.439,5.572,5.448,5.572c3.01,0,5.449-2.495,5.449-5.572C426.604,592.371,424.165,589.876,421.155,589.876L421.155,589.876z M421.146,591.891c-1.916,0-3.47,1.589-3.47,3.549c0,1.959,1.554,3.548,3.47,3.548s3.469-1.589,3.469-3.548C424.614,593.479,423.062,591.891,421.146,591.891L421.146,591.891zM421.146,591.891',
    	            	 onclick:function(){
    	            		 fundChart.showLoading();
    	            		 getFundData($("#search").val().trim(),"基金");
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
     	        end : Percentage(5,obj.length)
     		   },
	     	   {
	     	    	type:"inside",
	     	    	start : 0,
	        	    end : 4
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
			        data:ys,
			        barCategoryGap:"50%"
			    }]
	});
	fundChart.hideLoading();
	$("#fundMap").css("display","block");
	//绑定该面板的点击事件
	fundChart.on('click',function(params){
			console.log(fund_fieldValue[params.name]);
			console.log(fund_field);
			debugger;
			if( array_contains(legend,params.name) ){
	    		return;
	    	}
	    	//不包含则往里push该信息
	    	legend.push(params.name+"年度趋势");
			compareAnalysisLineChart(fund_fieldValue[params.name],
	    			fund_field,
	    			keyword,
	    			"基金",
	    			params.name
	    	);
	});
}
var orgMap;
function getMap(id,button,map){
	var myChart = echarts.init(document.getElementById(id));
	$(button).css("display","none");
	myChart.showLoading();
	var address = [];
	for( var i=0; i<map.length; i++ ){
		address.push(map[i].name)
	}
	var geoCoordMap;
	
	debugger;
	$.ajax({
		type:"GET",
		url:ctx+"/map/location?address="+address.toString(),
		success:function(ret){
			debugger;
			geoCoordMap = jQuery.parseJSON(ret);
			loadOrganMap(map,myChart,geoCoordMap);
		}
	});
}



function loadOrganMap(map,myChart,geoCoordMap){
	
	debugger;
	var temp = parseInt(orgMap[0].y/10);
	var mark= temp > 0 ? (temp+"").length : 0;
	var convertData = function (map) {
		 debugger;
	       var res = [];
	       var count = 0;
	       var length = map.length;
	       while(count<length){
	    	   debugger;
	           var geoCoord = geoCoordMap[map[count].name].split(",");
	           if (geoCoord) {
	               res.push({
	                   name: map[count].name,
	                   value: geoCoord.concat(map[count].y)

	               });
	           }
	           count++;
	       }
	       return res;
	   };
	   debugger;
	   option = {
	       title: {
	           text: '发文机构分布',
	           subtext: 'data from cnki.net',
	           sublink: '../../kns.cnki.net',
	           left: 'center'
	       },
	       tooltip : {
	           trigger: 'item',
	       },
	       bmap: {
	           center: [104.114129, 37.550339],
	           zoom: 5,
	           roam: true,
	           mapStyle: {
	               styleJson: [{
	                   'featureType': 'water',
	                   'elementType': 'all',
	                   'stylers': {
	                       'color': '#d1d1d1'
	                   }
	               }, {
	                   'featureType': 'land',
	                   'elementType': 'all',
	                   'stylers': {
	                       'color': '#f3f3f3'
	                   }
	               }, {
	                   'featureType': 'railway',
	                   'elementType': 'all',
	                   'stylers': {
	                       'visibility': 'off'
	                   }
	               }, {
	                   'featureType': 'highway',
	                   'elementType': 'all',
	                   'stylers': {
	                       'color': '#fdfdfd'
	                   }
	               }, {
	                   'featureType': 'highway',
	                   'elementType': 'labels',
	                   'stylers': {
	                       'visibility': 'off'
	                   }
	               }, {
	                   'featureType': 'arterial',
	                   'elementType': 'geometry',
	                   'stylers': {
	                       'color': '#fefefe'
	                   }
	               }, {
	                   'featureType': 'arterial',
	                   'elementType': 'geometry.fill',
	                   'stylers': {
	                       'color': '#fefefe'
	                   }
	               }, {
	                   'featureType': 'poi',
	                   'elementType': 'all',
	                   'stylers': {
	                       'visibility': 'off'
	                   }
	               }, {
	                   'featureType': 'green',
	                   'elementType': 'all',
	                   'stylers': {
	                       'visibility': 'off'
	                   }
	               }, {
	                   'featureType': 'subway',
	                   'elementType': 'all',
	                   'stylers': {
	                       'visibility': 'off'
	                   }
	               }, {
	                   'featureType': 'manmade',
	                   'elementType': 'all',
	                   'stylers': {
	                       'color': '#d1d1d1'
	                   }
	               }, {
	                   'featureType': 'local',
	                   'elementType': 'all',
	                   'stylers': {
	                       'color': '#d1d1d1'
	                   }
	               }, {
	                   'featureType': 'arterial',
	                   'elementType': 'labels',
	                   'stylers': {
	                       'visibility': 'off'
	                   }
	               }, {
	                   'featureType': 'boundary',
	                   'elementType': 'all',
	                   'stylers': {
	                       'color': '#fefefe'
	                   }
	               }, {
	                   'featureType': 'building',
	                   'elementType': 'all',
	                   'stylers': {
	                       'color': '#d1d1d1'
	                   }
	               }, {
	                   'featureType': 'label',
	                   'elementType': 'labels.text.fill',
	                   'stylers': {
	                       'color': '#999999'
	                   }
	               }]
	           }
	       },
	       series : [
	           {
	               name: '坐标及文献数量',
	               type: 'scatter',
	               coordinateSystem: 'bmap',
	               data: convertData(map),
	               symbolSize: function (val) {
	            	   debugger;
	            	   switch(mark){
	            	   		case 0: return val[2] * 3;
	            	   		case 1:return val[2] / 2;
	            	   		case 2:return val[2] / 10;
	            	   		case 3:return val[2] / 250;
	            	   		case 4:return val[2] / 2500;
	            	   		case 5:return val[2] / 10000;
	            	   		default :
	            	   			return val[2]/20000;
	            	   }
	               },
	               label: {
	                   normal: {
	                       formatter: '{b}',
	                       position: 'right',
	                       show: false
	                   },
	                   emphasis: {
	                       show: true
	                   }
	               },
	               itemStyle: {
	                   normal: {
	                       color: 'rgb(99, 198, 174)'
	                   }
	               }
	           },
	           {
	               name: 'Top 5',
	               type: 'effectScatter',
	               coordinateSystem: 'bmap',
	               data: convertData(map.slice(0, 5)),
	               symbolSize: function (val) {
	            	   debugger;
	            	   switch(mark){
	            	   		case 0: return val[2] * 2;
	            	   		case 1:return val[2] / 2;
	            	   		case 2:return val[2] / 5;
	            	   		case 3:return val[2] / 75;
	            	   		case 4:return val[2] / 500;
	            	   		case 5:return val[2] / 10000;
	            	   		default :
	            	   			return val[2]/20000;
	            	   }
	                   
	               },
	               showEffectOn: 'render',
	               rippleEffect: {
	                   brushType: 'stroke'
	               },
	               hoverAnimation: true,
	               label: {
	                   normal: {
	                       formatter: '{b}',
	                       position: 'right',
	                       show: true
	                   }
	               },
	               itemStyle: {
	                   normal: {
	                       color:'rgb(99, 198, 174)',
	                       shadowBlur: 10,
	                       shadowColor: '#333'
	                   }
	               },
	               zlevel: 1
	           }
	       ]
	   };
	   myChart.hideLoading();
	   myChart.setOption(option);
}

var fundMap;