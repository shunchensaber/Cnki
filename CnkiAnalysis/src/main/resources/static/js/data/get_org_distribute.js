
var keyword = "";
var groupName = "";

$(function(){
	keyword = getUrlParam("keyword");
	groupName = getUrlParam("groupName");
	getOrgDistributeData(keyword,groupName);
});

function getOrgDistributeData(keyword,groupName){
	
	$.ajax({
	
		type:"POST",
		url:ctx+"/data/caculate",
		dataType:"json",
		data:{
			keyword:keyword,
			groupName:groupName,
			urlName:"GroupTrend.aspx"
			
		},
		success:function(data){
			debugger;
			var obj = jQuery.parseJSON(unescape(data.data.ret));
			var address = [];
			for( var i=0; i<obj.length; i++ ){
				address.push(obj[i].name);
			}
			debugger;
			var array = GaodeAddressDecode(address);
		}
	});
}

function GaodeAddressDecode(address){
	
	var geocoder;
	var addressArray = [];
	AMap.service('AMap.Geocoder',function(){//回调函数
	    //实例化Geocoder
		debugger;
	    geocoder = new AMap.Geocoder({
	       radius:1000
	    });
	    //TODO: 使用geocoder 对象完成相关功能
	    geocoder.getLocation("电子科技大学", function(result) {
	        if (result.info === 'OK') {
	            //TODO:获得了有效经纬度，可以做一些展示工作
	            //比如在获得的经纬度上打上一个Marker
	        }else{
	            //获取经纬度失败
	        }
	    }); 
	})
	
	debugger;
	return addressArray;
}

/*
 * 批量地址解析
 * address: 地址数组
 * */
function BaiduAddressDecode(address){
	debugger;
	//调用API
	//var map = new BMap.map("map");
	var geo = new BMap.Geocoder();
	var addressArray = [];
	
	for(var i=0; i<address.length; i++){
		geo.getPoint(address[i],function(point){
			if(point){
				var add = {};
				add.lng =  point.lng;
				add.lat =  point.lat;
				addressArray.push(add);
			}
		})
		
	}
	debugger;
	return addressArray;
}