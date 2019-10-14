<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://"
            + request.getServerName() + ":" + request.getServerPort()
            + path + "/";
%>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">  
    <title>index - 中国知网文献数据分析 </title>
    <link href="<%=path %>/css/tipso.min.css" rel="stylesheet">
    <!-- Bootstrap -->
    <link href="<%=path %>/css/plugins/toastr/toastr.min.css" rel="stylesheet">
    <link href="<%=path %>/css/bootstrap.min.css" rel="stylesheet">
    <link href="<%=path %>/css/font-awesome.min.css?v=4.4.0" rel="stylesheet">
    <link href="<%=path %>/css/style.min.css?v=4.0.0" rel="stylesheet">
    <link rel="stylesheet" href="<%=path %>/css/styles.css">
    <link rel="stylesheet" href="<%=path %>/css/queries.css">

	<link href='<%=path %>/css/horsey/jquery-ui.css' rel='stylesheet' type='text/css' />

</head>
    <link href=" <%=path %>/css/plugins/sweetalert/sweetalert.css" rel="stylesheet">
    <link href="http://netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css" rel="stylesheet">
    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
      <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
<style type="text/css">
	td{vertical-align:middle }
	#loading{
		width:40%;
		margin:auto;
		text-align:center;
	}
</style>
</head>
  <body>
		<header class="clearfix" style="
		    position:  fixed;
		    width: 100%;
		    z-index: 9999;">
		    <div class="logo col-md-3"><h2 class="logo-text"><i class="fa fa-area-chart"></i>数据可视化分析</h2></div>
		    <nav class="clearfix">
            <ul class="clearfix">
                <li><a href="#" class="active">首页</a></li>
                <li><a href="index3">历史查询</a></li>
                 <li><a href="page/ref">高被引数据</a></li>
                <li><a href="#" class="last">关于我们</a></li>
            </ul>
        </nav>
        <div class="pullcontainer">
        <a href="#" id="pull"><i class="fa fa-bars fa-2x"></i></a>
        </div>
        		<div class="search">
			  <svg class="search-svg" viewBox="0 0 320 70"
			       data-init="M160,3 L160,3 a27,27 0 0,1 0,54 L160,57 a27,27 0 0,1 0,-54 M197,67 181.21,51.21"
			       data-mid="M160,3 L160,3 a27,27 0 0,1 0,54 L160,57 a27,27 0 0,1 0,-54 M179.5,49.5 179.5,49.5"
			       data-active="M27,3 L293,3 a27,27 0 0,1 0,54 L27,57 a27,27 0 0,1 0,-54 M179.5,49.5 179.5,49.5">
			    <path class="search-svg__path" d="M160,3 L160,3 a27,27 0 0,1 0,54 L160,57 a27,27 0 0,1 0,-54 M197,67 181.21,51.21" />
			  </svg>
			  <input type="text" class="search-input" />
			  <div class="search-close"></div>
			</div> 
		</header>
		<div style="padding-top:40px"></div>
    <div class="banner">
    <ul>
          <li style="background-image: url('<%=path %>/img/02.jpg');">
          <div class="container">
            <div class="row">
              <div class="col-md-6 col-md-offset-3">
                <div class="hero-title">
                  	输入想搜索的文献关键词
                </div>
              <input class="hero-content" name="topSearch" id ="topSearch" value="" 
              autocomplete="off" 
              style="width:500px"/>
              <a href="#" class="hero-btn" >SEARCH IT!</a>
              </div>
            </div>
          </div>
        </li>
     
    </ul>
</div>
    <div class="container">
    	<div class="arrow"></div>
    </div>
    
    <div  style="width:100%;height:85px"></div>
    
    <div class="container" style="width:92%">
    
      <!-- 被引表格  -->
		<div class="col-md-12">
		<!-- 选项卡 -->
		<div class="tabs-container">
                 
                   
                    </div>
                    <div  style="width:100%;height:85px"></div>
                    <div id="loading"><img src="<%=path %>/img/gif/loading.gif"></div>
                    <a href="page/ref">>>>更多</a>
                </div>
			</div>
      </div>
      <div class="container" style="width:92%">
    
      <!-- 院校分布  -->
	  <div class="col-md-12">
	  	<div  id="school_distribute" style="height:600px;"></div>
		
	  </div>
	  </div>
 	
        
    <div class="shadow"></div>
    <footer>
 
    </footer>
</body>
  	<script src="<%=path %>/js/jquery-1.10.2.min.js"></script>
    <script src="<%=path %>/js/plugins/layer/layer.js"></script>
	
    <script src="<%=path %>/js/bootstrap.min.js"></script>
    <script src="<%=path %>/js/scripts.js"></script>
    <script src="<%=path %>/js/unslider.min.js"></script>
    <script src="<%=path %>/js/plugins/metisMenu/jquery.metisMenu.js"></script>
    <script src="<%=path %>/js/plugins/slimscroll/jquery.slimscroll.min.js"></script>
    <script src="<%=path %>/js/hplus.min.js?v=4.0.0"></script>
    <script src="<%=path %>/js/contabs.min.js"></script>
    <script src="<%=path %>/js/plugins/pace/pace.min.js"></script>
    <%-- <script src="<%=path %>/js/plugins/toastr/toastr.min.js"></script> --%>
    <script src="<%=path %>/js/echarts/echarts.js"></script>
    <script src="<%=path %>/js/echarts/bmap.min.js"></script>
     <script type="text/javascript" src="http://api.map.baidu.com/api?v=3.0&ak=cudRWYxjcLLBjz37p40zRRTn4124YeQw&callback=initialize"></script>
  
    
    <!-- tipso -->
    <script src="<%=path %>/js/plugins/tooltip/tipso.min.js"></script>
    <!-- dataTables -->
    <script src="<%=path %>/js/plugins/dataTables/jquery.dataTables.min.js"></script>
   	<!-- Sweet alert -->
    <script src="<%=path %>/js/plugins/sweetalert/sweetalert.min.js"></script>
    <script src="<%=path %>/js/horsey/jquery-ui.min.js"></script>
    <!-- 处理逻辑 -->
    <script src="<%=path %>/js/index/get_school_distribute.js"></script>
    <script src="<%=path %>/js/index/index_operate.js"></script>
     <script src="<%=path %>/js/data/util.js"></script>
     	<script src='<%=path %>/js/min/stopExecutionOnTimeout.js?t=1'></script>
	<script src='<%=path %>/js/min/snap.svg-min.js'></script>
	<script type="text/javascript"> var ctx = "<%=path%>";</script>
		<script>
	$(document).ready(function () {
	    var $search = $('.search'), $input = $('.search-input'), $close = $('.search-close'), $svg = $('.search-svg'), $path = $('.search-svg__path')[0], initD = $svg.data('init'), midD = $svg.data('mid'), finalD = $svg.data('active'), backDelay = 400, midAnim = 200, bigAnim = 400, animating = false;
	    $(document).on('click', '.search:not(.active)', function () {
	        if (animating)
	            return;
	        animating = true;
	        $search.addClass('active');
	        Snap($path).animate({ 'path': midD }, midAnim, mina.backin, function () {
	            Snap($path).animate({ 'path': finalD }, bigAnim, mina.easeinout, function () {
	                $input.addClass('visible');
	                $input.focus();
	                $close.addClass('visible');
	                animating = false;
	            });
	        });
	    });
	    $(document).on('click', '.search-close', function () {
	        if (animating)
	            return;
	        animating = true;
	        $input.removeClass('visible');
	        $close.removeClass('visible');
	        $search.removeClass('active');
	        setTimeout(function () {
	            Snap($path).animate({ 'path': midD }, bigAnim, mina.easeinout, function () {
	                Snap($path).animate({ 'path': initD }, midAnim, mina.easeinout, function () {
	                    animating = false;
	                });
	            });
	        }, backDelay);
	    });
	});
	</script>
</html>