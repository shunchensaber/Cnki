<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://"
            + request.getServerName() + ":" + request.getServerPort()
            + path + "/";
%>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">

    <title>Analysis - </title>

    <meta name="keywords" content="H+后台主题,后台bootstrap框架,会员中心主题,后台HTML,响应式后台">
    <meta name="description" content="H+是一个完全响应式，基于Bootstrap3最新版本开发的扁平化主题，她采用了主流的左右两栏式布局，使用了Html5+CSS3等现代技术">
 	 <!-- Data Tables -->
    <link href="<%=path %>/css/plugins/dataTables/dataTables.bootstrap.css" rel="stylesheet">
 	<link href="<%=path %>/css/plugins/toastr/toastr.min.css" rel="stylesheet">
	<link href=" <%=path %>/css/plugins/sweetalert/sweetalert.css" rel="stylesheet">
    <link rel="shortcut icon" href="<%=path %>/img/favicon.ico"> 
    <link href="<%=path %>/css/bootstrap.min.css?v=3.3.5" rel="stylesheet">
    <link href="<%=path %>/css/font-awesome.min.css?v=4.4.0" rel="stylesheet">
    <link href="<%=path %>/css/plugins/iCheck/custom.css" rel="stylesheet">
    <link href="<%=path %>/css/animate.min.css" rel="stylesheet">
    <link href="<%=path %>/css/style.min.css?v=4.0.0" rel="stylesheet">
    <base target="_blank">

	<title>文献发表量</title>
 
</head>
<body>
	<div class="row">
		<div class="col-sm-8" id="publishCount" style="height:450px;border:1px solid #ccc;padding:10px;"></div>
		<div class="col-sm-4" id="wordCount" style="height:450px;border:1px solid #ccc;padding:10px;">
               
            </div>
	</div>
	
	<div class="row">
		<div class="col-sm-4">
		<div class="ibox float-e-margins">
                    <div class="ibox-title">
                        <span class="label label-primary pull-right">截止到今天</span>
                        <h5>文献发表总量</h5>
                    </div>
                    <div class="ibox-content">
                        <h1 id="count" class="no-margins">22 285,400</h1>
                        <div class="stat-percent font-bold text-navy">20% <i class="fa fa-level-up"></i>
                        </div>
                        <small>新订单</small>
                    </div>
                </div><div class="ibox float-e-margins">
                    <div class="ibox-title">
                        <span class="label label-primary pull-right">截止到今天</span>
                        <h5>文献发表总量</h5>
                    </div>
                    <div class="ibox-content">
                        <h1 id="count" class="no-margins">22 285,400</h1>
                        <div class="stat-percent font-bold text-navy">20% <i class="fa fa-level-up"></i>
                        </div>
                        <small>新订单</small>
                    </div>
                </div>
		
		</div>
	   	<div class="col-sm-8" id="yearGrowth" style="height:450px;border:1px solid #ccc;padding:10px;"></div>
	</div>
 
  
</body>
    <script src="<%=path %>/js/jquery.min.js?v=2.1.4"></script>
    <script src="<%=path %>/js/jquery-ui-1.10.4.min.js"></script>
    <script src="<%=path %>/js/bootstrap.min.js?v=3.3.5"></script>
    <script src="<%=path %>/js/content.min.js?v=1.0.0"></script>
    <script src="<%=path %>/js/plugins/iCheck/icheck.min.js"></script>
    <script src="<%=path %>/js/plugins/jvectormap/jquery-jvectormap-1.2.2.min.js"></script>
    <script src="<%=path %>/js/plugins/jvectormap/jquery-jvectormap-world-mill-en.js"></script>
    <script src="<%=path %>/js/plugins/flot/jquery.flot.js"></script>
    <script src="<%=path %>/js/plugins/flot/jquery.flot.tooltip.min.js"></script>
    <script src="<%=path %>/js/plugins/flot/jquery.flot.resize.js"></script>
    <script src="<%=path %>/js/echarts/echarts.js"></script>
    <script src="<%=path %>/js/echarts/vintage.js"></script>
    <script src="<%=path %>/js/echarts/wonderland.js"></script>
    <script src="<%=path %>/js/data/get_change_index_data.js"></script>
     <script src="<%=path %>/js/data/util.js"></script>
     <script src="<%=path %>/js/data/show_echarts.js"></script>
    <script src="<%=path %>/js/plugins/sweetalert/sweetalert.min.js"></script>
        <script src="<%=path %>/js/plugins/dataTables/jquery.dataTables.js"></script>
    <script src="<%=path %>/js/plugins/dataTables/dataTables.bootstrap.js"></script>
       <script src="<%=path %>/js/plugins/toastr/toastr.min.js"></script>
    <script type="text/javascript"> var ctx = "<%=path%>";</script>
    <script type="text/javascript" src="http://tajs.qq.com/stats?sId=9051096" charset="UTF-8"></script>
	<script type="text/javascript">
   
    
    
	</script>
</html>