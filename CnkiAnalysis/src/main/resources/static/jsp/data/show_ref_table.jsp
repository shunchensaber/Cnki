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
                <li><a href="../">首页</a></li>
               <!--  <li><a href="index3">历史查询</a></li> -->
                 <li><a href="#" class="active">高被引数据</a></li>
              <!--   <li><a href="#" class="last">关于我们</a></li> -->
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
		<div id="top" style="background-image: url('<%=path %>/img/up.png');
	 	 display: none;
	 	 height:100px;
	 	 width:100px;
		 position: fixed;
		 left:93%;
		 z-index:1;
		 bottom: 20px;"></div>
		<div style="padding-top:40px"></div>
    <div class="banner">
 
</div>

    
    <div  style="width:100%;height:50px"></div>
    
    <div class="container" style="width:92%">
    
      <!-- 被引表格  -->
		<div class="col-md-12">
		<!-- 选项卡 -->
		<div class="tabs-container">
                    <ul id="ref-tab" class="nav nav-tabs">
                        <li class="active"><a data-toggle="tab" href="#tab-auth" aria-expanded="true">高被引作者</a>
                        </li>
                        <li class=""><a data-toggle="tab" href="#tab-qikn" aria-expanded="false">高被引期刊</a>
                        </li>
                        <li><a data-toggle="tab" href="#tab-nuiv" aria-expanded="false">高被引院校</a>
                        </li>
                        <li><a data-toggle="tab" href="#tab-hosp" aria-expanded="false">高被引医院</a>
                        </li>
                        <li><a data-toggle="tab" href="#tab-docu" aria-expanded="false">高被引文献</a>
                        </li>
                        <li><a data-toggle="tab" href="#tab-ztcs" aria-expanded="false">高被引学科</a>
                        </li>
                    </ul>
                    <div class="tab-content">
                    	<!-- 期刊 begin -->
                       <div id="tab-auth" class="tab-pane active">
                            <div class="panel-body">
                                      <table 
                            class="table table-striped table-bordered table-hover dataTables-example dataTable">
                            <thead>
									<tr>
	                                	<th class="nosort" style="width :20%">作者</th>
	                                	<th class="nosort" style="width :10%">选择学科</th>
	                                    <th align="right" style="width :9%">发文量</th>
	                                    <th align="right" style="width :12%"
	                                    data-tipso="核心期刊收录文献量"
	                                    >核心期刊</th>
	                                    <th align="right" style="width :7%"
	                                    data-tipso="SCI(科学引文索引)收录文献量"
	                                    >SCI</th>
	                                    <th align="right" style="width :4%"
	                                    data-tipso="EI(工程索引)收录文献量"
	                                    >EI</th>
	                                    <th align="right" style="width :12%">基金文献</th>
	                                    <th align="right" style="width :6%"
	                                    data-tipso="该作者所发表的文献被其它文献引用次数"
	                                    >被引</th>
	                                    <th align="right" style="width :6%"
	                                    data-tipso="文献被除作者及合作者以外其他人的引用次数"
	                                    >他引</th>
	                                    <th align="right" style="width :8%"
	                                    data-tipso="他引率又叫他引总引比，指某期刊的总被引频次中，被其他期刊引用次数所占的比例。"
	                                    >他引率</th>
	                                    <th align="right" style="width :7%"
	                                    data-tipso="H指数是一种评价学术成就的方法,能够比较准确地反映一个人的学术成就.一个人的h指数越高，则表明他的论文影响力越大"
	                                    >H指数</th>
									</tr>
							</thead>
                            </table>
                            </div>
                        </div>
                        <!-- 作者 End -->
                        <!-- 期刊 begin -->
                        <div id="tab-qikn" class="tab-pane">
                            <div class="panel-body">
                            <table class="table table-striped table-bordered table-hover dataTables-example dataTable">
                            <thead>
									<tr>
	                                	<th class="nosort" style="width :">期刊名称</th>
	                                	<th class="nosort" style="width :22%">学科</th>
	                                    <th align="right" style="width :10%">发文量</th>
	                                    <th align="right" style="width :10%"
	                                    data-tipso="该作者所发表的文献被其它文献引用次数"
	                                    >被引频次</th>
	                                    <th align="right" style="width :10%"
	                                    data-tipso="文献被除作者及合作者以外其他人的引用次数"
	                                    >他引频次</th>
	                                    <th align="right" style="width :10%"
	                                    data-tipso="他引率又叫他引总引比，指某期刊的总被引频次中，被其他期刊引用次数所占的比例。"
	                                    >他引率</th>
	                                    <th align="right" style="width :10%"
	                                    data-tipso="H指数是一种评价学术成就的方法,能够比较准确地反映一个人的学术成就.一个人的h指数越高，则表明他的论文影响力越大"
	                                    >H指数</th>
									</tr>
							</thead>
                            </table>

                            </div>
                        </div>
                        <!-- 期刊 End -->
                        <!-- 院校 begin -->
                        <div id="tab-nuiv" class="tab-pane">
                            <div class="panel-body">
                                      <table 
                            class="table table-striped table-bordered table-hover dataTables-example dataTable">
                            <thead>
									<tr>
	                                	<th class="nosort" style="width :">院校名称</th>
	                                	<th class="nosort" style="width :20%">选择学科</th>
	                                    <th align="right" style="width :7%">发文量</th>
	                                    <th align="right" style="width :8%"
	                                    data-tipso="核心期刊收录文献量"
	                                    >核心期刊</th>
	                                    <th align="right" style="width :6%"
	                                    data-tipso="SCI(科学引文索引)收录文献量"
	                                    >SCI</th>
	                                    <th align="right" style="width :4%"
	                                    data-tipso="EI(工程索引)收录文献量"
	                                    >EI</th>
	                                    <th align="right" style="width :6%"
	                                    data-tipso="该作者所发表的文献被其它文献引用次数"
	                                    >被引频次</th>
	                                    <th align="right" style="width :9%"
	                                    data-tipso="文献被除作者及合作者以外其他人的引用次数"
	                                    >他引频次</th>
	                                    <th align="right" style="width :9%"
	                                    data-tipso="他引率又叫他引总引比，指某期刊的总被引频次中，被其他期刊引用次数所占的比例。"
	                                    >他引率</th>
	                                    <th align="right" style="width :7%"
	                                    data-tipso="H指数是一种评价学术成就的方法,能够比较准确地反映一个人的学术成就.一个人的h指数越高，则表明他的论文影响力越大"
	                                    >H指数</th>
									</tr>
							</thead>
                            </table>
                            </div>
                        </div>
                        <!-- 院校 End -->
                        <!-- 医院 begin -->
                          <div id="tab-hosp" class="tab-pane">
                            <div class="panel-body">
                                      <table 
                            class="table table-striped table-bordered table-hover dataTables-example dataTable">
                            <thead>
									<tr>
	                                	<th class="nosort" style="width :">医院名称</th>
	                                	<th class="nosort" style="width :20%">选择学科</th>
	                                    <th align="right" style="width :7%">发文量</th>
	                                    <th align="right" style="width :8%"
	                                    data-tipso="核心期刊收录文献量"
	                                    >核心期刊</th>
	                                    <th align="right" style="width :6%"
	                                    data-tipso="SCI(科学引文索引)收录文献量"
	                                    >SCI</th>
	                                    <th align="right" style="width :4%"
	                                    data-tipso="EI(工程索引)收录文献量"
	                                    >EI</th>
	                                    <th align="right" style="width :6%"
	                                    data-tipso="该作者所发表的文献被其它文献引用次数"
	                                    >被引频次</th>
	                                    <th align="right" style="width :9%"
	                                    data-tipso="文献被除作者及合作者以外其他人的引用次数"
	                                    >他引频次</th>
	                                    <th align="right" style="width :9%"
	                                    data-tipso="他引率又叫他引总引比，指某期刊的总被引频次中，被其他期刊引用次数所占的比例。"
	                                    >他引率</th>
	                                    <th align="right" style="width :7%"
	                                    data-tipso="H指数是一种评价学术成就的方法,能够比较准确地反映一个人的学术成就.一个人的h指数越高，则表明他的论文影响力越大"
	                                    >H指数</th>
									</tr>
							</thead>
                            </table>
                            </div>
                        </div>
                        
                        <!-- 医院 End -->
                        <!-- 高被引文献 begin -->
                          <div id="tab-docu" class="tab-pane">
                            <div class="panel-body">
                                      <table 
                            class="table table-striped table-bordered table-hover dataTables-example dataTable">
                            <thead>
									<tr>
	                                	<th class="nosort"  style="width :">被引文献题名</th>
	                                	<th class="nosort" style="width :15%">选择学科</th>
	                                    <th align="right" style="width :12%">被引文献作者</th>
	                                    <th align="right" style="width :12%">被引文献来源</th>
	                                    <th align="right" style="width :12%"
	                                    data-tipso="该作者所发表的文献被其它文献引用次数"
	                                    >被引频次</th>
	                                    <th align="right" style="width :12%"
	                                    data-tipso="文献被除作者及合作者以外其他人的引用次数"
	                                    >他引频次</th>
	                                    <th align="right" style="width :12%"
	                                    data-tipso="他引率又叫他引总引比，指某期刊的总被引频次中，被其他期刊引用次数所占的比例。"
	                                    >他引率</th>
									</tr>
							</thead>
                            </table>
                            </div>
                        </div>
                        <!-- 高被引文献 End -->
                        <!-- 高被引学科 begin -->
                           <div id="tab-ztcs" class="tab-pane">
                            <div class="panel-body">
                                      <table 
                            class="table table-striped table-bordered table-hover dataTables-example dataTable">
                            <thead>
									<tr>
	                                	<th  class="nosort" style="width :">学科名称</th>
	                                	<th style="width :15%">发文量</th>
										<th align="right" style="width: 6%"
											data-tipso="该作者所发表的文献被其它文献引用次数">被引频次</th>
										<th align="right" style="width :9%"
	                                    data-tipso="文献被除作者及合作者以外其他人的引用次数"
	                                    >他引频次</th>
	                                    <th align="right" style="width :9%"
	                                    data-tipso="他引率又叫他引总引比，指某期刊的总被引频次中，被其他期刊引用次数所占的比例。"
	                                    >他引率</th>
	                                       <th align="right" style="width :12%"
	                                    data-tipso="H指数是一种评价学术成就的方法,能够比较准确地反映一个人的学术成就.一个人的h指数越高，则表明他的论文影响力越大"
	                                    >H指数</th>
									</tr>
							</thead>
                            </table>
                            
                            </div>
                            
                        </div>
                        <!-- 高被引学科 End -->
                    </div>
                    <div  style="width:100%;height:85px"></div>
                    <div id="loading"><img src="<%=path %>/img/gif/loading.gif"></div>
                </div>
			</div>
      </div>
      <div class="container" style="width:92%"></div>
        
    <div class="shadow"></div>
    <footer>
      <div class="container">
        <div class="row">
          <div class="col-md-2">
            <h2>INFUSION</h2>
          </div>
          <div class="col-md-5">
            <p>Nam mi enim, auctor non ultricies a, fringilla eu risus. Praesent vitae lorem et elit tincidunt accumsan suscipit eu libero. Maecenas diam est, venenatis vitae dui in, vestibulum mollis arcu. Donec eu nibh tincidunt, dapibus sem eu, aliquam dolor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vestibulum consectetur commodo eros, vitae laoreet lectus aliq</p>
          </div>
          <div class="col-md-3">
            <p>aliquam dolor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vestibulum consectetur commodo eros, vitae laoreet lectus aliq</p>
          </div>
          <div class="col-md-2">
            <ul class="footer-links">
              <li><a href="#">List One</a></li>
              <li><a href="#">Page Two</a></li>
              <li><a href="#">Design</a></li>
              <li><a href="#">Work</a></li>
              <li><a href="#">Contact Me</a></li>
            </ul>
          </div>
        </div>
      </div>  
    </footer>
</body>
  	<script src="<%=path %>/js/jquery-1.10.2.min.js"></script>
    <script src="<%=path %>/js/plugins/layer/layer.js"></script>
    <script src="<%=path %>/js/bootstrap.min.js"></script>
    <script src="<%=path %>/js/scripts.js"></script>
    <script src="<%=path %>/js/unslider.min.js"></script>
    <script src="<%=path %>/js/plugins/metisMenu/jquery.metisMenu.js"></script>
    <script src="<%=path %>/js/plugins/slimscroll/jquery.slimscroll.min.js"></script>


    <!-- tipso -->
    <script src="<%=path %>/js/plugins/tooltip/tipso.min.js"></script>
    <!-- dataTables -->
    <script src="<%=path %>/js/plugins/dataTables/jquery.dataTables.min.js"></script>
    <script src="<%=path %>/js/horsey/jquery-ui.min.js"></script>
	<!-- 处理逻辑部分  -->
    <script src="<%=path %>/js/index/get_ref_data.js"></script>
    <script src="<%=path %>/js/index/get_ref_data_all.js"></script>
    <!-- 工具部分 -->
    
    <script src='<%=path %>/js/min/stopExecutionOnTimeout.js?t=1'></script>
	<script src='<%=path %>/js/min/snap.svg-min.js'></script>
     <script src="<%=path %>/js/data/util.js"></script>
	<script type="text/javascript"> var ctx = "<%=path%>";
    </script>
</html>