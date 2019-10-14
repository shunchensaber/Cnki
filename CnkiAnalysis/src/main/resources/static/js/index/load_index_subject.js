var subjectChart = echarts.init(document.getElementById('subjectCount'),"wonderland");
var orgChart = echarts.init(document.getElementById('orgCount'),"wonderland");


function getSubject(){
	deal_with_chart(subjectChart);
	subjectChart = echarts.init(document.getElementById('subjectCount'),"wonderland");
	subjectChart.showLoading();
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
					loadSubject(ret.data);
			}
				
		}
	});
}

function getOrgan(){
	deal_with_chart(orgChart);
	orgChart = echarts.init(document.getElementById('orgCount'),"wonderland");
	orgChart.showLoading();
	$.ajax({
		type:'GET',
		url: ctx+'/data/getIndexData',
		dataType: 'json',
		data:{"topSearch":keyword,
			"resultType":"GetInstitution",
			"numType":""
		},
		success: function(ret){
			debugger;
			if(ret.status === 0 && ret.data != null){
			
				loadOrgan(ret.data);
			}
		}
	});
}

function loadOrgan(data){

	//隐藏加载按钮
	$("#orgCount").find("a").css("display","none");
	debugger;
	var obj = jQuery.parseJSON(data.ret);
	//X轴坐标值 
    var xs=[];
    //ys 
    var ys=[];    
    //grow
    if (obj != null && obj != undefined && obj != 'undefined') {
    		debugger;
	    	for(var i=0; i<obj.key.length; i++){
	    		xs.push(obj.key[i]);
	    		ys.push(obj.cnt[i]);
	    	}
	    	orgChart.setOption({        //加载数据图表
        	   title: {
        	        text: '机构分布',
        	        subtext:'检索词<'+keyword+">在机构中的分布情况"
        	    },
        	   stillShowZeroSum:false,
        	   legend:{
        		   data:["发文数"],
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
         	            		 orgChart.showLoading();
         	            		 getOrgan();
         	            	 }
         	            },
	         	           magicType: {
	       	                type: ['line']
	       	            },
        	            restore:{},
        	            dataView: {readOnly: false},//数据视图
        	            saveAsImage: {}//保存为图片
        	        }
        	    },
        	    tooltip: {
        	        trigger: 'axis',
        	        axisPointer: {
        	            type: 'shadow'
        	        }
        	    },
               xAxis: {
            	   type:"category",
                   data: xs,
                   axisLabel: {  
	            	   interval:0,  
	            	   rotate:-25  
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
               series: [{
                   // 根据名字对应到相应的系列
                   name: '发文数',
                   type: 'bar',
                   yAxisIndex:0,
                   data: ys,
                   barCategoryGap:"40%"
               }
               ]
           });
	    	orgChart.hideLoading();    //隐藏加载动画
    }else{
    	//加载数据失败
    	orgChart.hideLoading();
    	layer.msg("机构分布加载失败！",{icon:2});
    	$("#orgCount").find("a").bind("click",function(event){
    		getOrgan();
    	}).css("display","block");
		toastr.warning("Failed! Retry !");
    }
}

var sub_data = [];
var sub_code;
function loadSubject(data){
	debugger;
	var obj = jQuery.parseJSON(data.ret);
	//var code 
	
	sub_data = [];
	for( var i=0; i<obj.show.length; i++ ){
		var param = {};
		param.name = obj.show[i][0];
		param.value = obj.show[i][1];
		sub_data.push(param);
		//legend[i] = data[i].name;
 	}
	sub_code = obj.code;
	debugger;
	subjectChart.setOption({
	    title : {
	    	top:20,
	        text: '学科分布',
	        subtext: '篇名包含<'+keyword+'>的文献在不同学科中的分布',
	        x:'center'
	    },
	    tooltip : {
	        trigger: 'item',
	        formatter: "{a} <br/>{b} : {c} ({d}%)"
	    },
	 /*   legend: {
	        x : 'center',
	        y : 'bottom',
	        data:legend
	    },*/
	    toolbox: {
	        show : true,
	        top:20,
	        feature : {
	        	 myTool1:{
 	            	show:true,
 	            	title:"更新数据",
 	            	 icon: 'path://M50.104,88.326c-7.857,0-15.78-2.388-22.601-7.349c-8.302-6.039-13.746-14.941-15.33-25.067 c-1.582-10.115,0.879-20.24,6.929-28.51C30.803,11.406,53.225,6.948,70.148,17.252c1.626,0.989,2.142,3.11,1.151,4.737 c-0.99,1.626-3.11,2.143-4.737,1.151c-13.889-8.454-32.292-4.796-41.896,8.33c-4.96,6.781-6.978,15.082-5.681,23.374 c1.299,8.303,5.764,15.604,12.574,20.557c14.053,10.224,33.828,7.143,44.081-6.872c3.094-4.229,5.094-9.188,5.783-14.341 c0.252-1.888,1.983-3.209,3.874-2.96c1.888,0.252,3.213,1.987,2.96,3.874c-0.842,6.291-3.28,12.342-7.053,17.498 C73.69,82.873,61.973,88.326,50.104,88.326z',
 	            	  onclick:function(){
 	            		 subjectChart.showLoading();
 	            		 getSubject();
 	            	 }
 	            },
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
		            name:'学科分布',
		            type:'pie',
		            selectedMode: 'single',
		            selectedOffset: 20,
		            radius : [30, 110],
		            center : ['50%', '50%'],
		            roseType : 'area',
		            data:sub_data
		        }
	     ]
	});
	subjectChart.hideLoading();
	//echarts的绑定时间必须紧跟在setoption方法之后  尤其是在可能有清空图表的操作的情况下
	//这种情况就必须要 每加载一次图表 绑定一次点击事件
	subjectChart.on('click', function (params) {
	    //点击被选中
		debugger;
	    if( params.data.selected ){
	    	//console.log(params);
	    	var name = params.data.name;
	    	//获取对应下标
	    	for( var i=0; i<10; i++){
	    		if( name === sub_data[i].name ) {
	    			console.log(sub_code[i]);
	    			updateChart(sub_code[i],name);
	    			break;
	    		}
	    	}
	    	//刷新文献数据 关键词数据
	    }else{//未选中
	    	loadWordEcharts(back,"");
	    }
	});
}


/**
 * 根据code 和 name 重新加载
 * @param code
 * @param name
 * @returns
 */
function updateChart(code,name){
	wordChart.showLoading();
	$.ajax({
		type:'GET',
		url: ctx+'/data/getIndexData',
		dataType: 'json',
		
		data:{"topSearch":keyword,
			"resultType":"GetTotalRelevanceWordsForCht",
			"numType":code
		},
		async:true,
		success: function(ret){
			debugger;
			if(ret.status === 0 && ret.data != null){
				//加载关键词条形图
				loadWordEcharts(ret.data,name);
			}else{
				wordChart.hideLoading();
				toastr.error("更新wordChart FAILED：" + ret.info);
			}
		}
	});
}