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
    <title>Infusion WP Theme</title>
    <!-- Bootstrap -->
    <link href='<%=path %>/css/horsey/jquery-ui.css' rel='stylesheet' type='text/css' />
    <link href="<%=path %>/css/plugins/toastr/toastr.min.css" rel="stylesheet">
    <link href="<%=path %>/css/bootstrap.min.css" rel="stylesheet">
    <link href="<%=path %>/css/tipso.min.css" rel="stylesheet">
    <link href="<%=path %>/css/font-awesome.min.css?v=4.4.0" rel="stylesheet">
    <link rel="stylesheet" href="<%=path %>/css/styles.css">
    <link rel="stylesheet" href="<%=path %>/css/queries.css">
<!--     <link href="http://netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css" rel="stylesheet"> -->
    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
      <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
    <!-- H+部分 -->
   <%--  <link href="<%=path %>/css/bootstrap.min.css?v=3.3.5" rel="stylesheet"> --%>
    <link href="<%=path %>/css/font-awesome.min.css?v=4.4.0" rel="stylesheet">
    <link href="<%=path %>/css/plugins/iCheck/custom.css" rel="stylesheet">
    <link href="<%=path %>/css/animate.min.css" rel="stylesheet">
    <link href="<%=path %>/css/style.min.css?v=4.0.0" rel="stylesheet">
    
<style type="text/css">
	.tab_a_class{
	    height: 50px;
	 text-align:  center;
	 line-height: 30px;
	 font-size: 18;
	  
	}
	.loadbtn{
		display:none;
	    margin: auto;
	    text-align: center;
	    position: absolute;
	    top: 40%;
	    left: 40%;
	}
	body{
	 	backgroud-color:#f8f9f9
	}
	
	.index-button{
		display:none;
	    margin: auto;
	    text-align: center;
	    position: absolute;
	    top: 40%;
	    left: 40%;
	}
</style>
</head>
 <body>
	<header class="clearfix" style="
    position:  fixed;
    width: 100%;
    z-index: 9999;">
	    <div class="logo col-md-3">
	    	<h2 class="logo-text">
	 			<i class="fa fa-area-chart"></i>数据可视化分析
	 		</h2>
	    </div>
	    <nav class="clearfix">
            <ul class="clearfix">
                <li><a href="../" class="frist">首页</a></li>
             <!--    <li><a href="index3">历史查询</a></li> -->
                  <li><a href="page/ref">高被引数据</a></li>
                <!-- <li><a href="#" class="last">关于我们</a></li> -->
            </ul>
        </nav>
        <div class="pullcontainer">
        	<a href="#" id="pull"><i class="fa fa-bars fa-2x"></i></a>
        </div> 
         <a id="login" data-toggle="modal" class="btn btn-primary" 
            style="  float: right;
				    margin-top: 18px;
				    margin-right: 20px;"
            href="#modal-form">登录</a>
          	 <a id="after_login" style="width:5%;
          	 height:5%;
          	 float:right;
          	 padding-top:25px;
          	 display:none" data-toggle="dropdown">
                     <i class="fa fa-sign-out"></i> 
                          
                          </a>
          	
            <ul style="left:90%"class="dropdown-menu" role="menu">
		        <li>
		            <a id="history">历史记录</a>
		        </li>
		        <li>
		            <a id="logout">注销</a>
		        </li>
        	</ul>  
	</header>
	<div style="padding-top:65px"></div>
	<div id="top" style="background-image: url('<%=path %>/img/up.png');
	 	 display: none;
	 	 height:100px;
	 	 width:100px;
		 position: fixed;
		 left:93%;
		 z-index:1;
		 bottom: 20px;"></div>
	<div class="text-inter" style="border-top:solid 1px #e3e3e3">
		<div class="container">
			<div class="row">
				<div class="col-md-2"></div>
				<div class="col-md-8">
					
					<div class="input-group">
		               <input type="text" placeholder="输入文献关键词" id="search" name="search" class="form-control input-lg">
		               <div class="input-group-btn">
		                   <button id="searchBtn" class="btn btn-lg btn-primary" type="button">
		                     	 搜索
		                   </button>
		               </div>
		            </div>
				</div>
			</div>
		</div>
	</div>
	<!-- 导航菜单  begin -->
	<div class="text-inter">
		<div class="container">
			<div class="row">
				<ul id="all-tab" class="nav nav-tabs">
				  <li class="active"><a data-toggle="tab" href="#index-data">指数分析</a></li>
				  <li><a href="#caculate-data">计量可视化</a></li>
				  <li><a href="#source-distribute">资源分布</a></li>
<!-- 				  <li><a href="#">VB.Net</a></li>
				  <li><a href="#">Java</a></li>
				  <li><a href="#">PHP</a></li> -->
				</ul>
<!-- 导航菜单 end   -->			
			<div class="tab-content">
					<div id="index-data" class="tab-pane active">
						<div class="panel-body">
							<!-- 指数分析选项卡 begin -->
							<div class="tabs-container" style="
							    padding-left: 15px;
							    margin: auto;
							    width: 1150px;
							    background-color: #F5F5F5;">
								
						       <div class="tabs-left">
						       	<!-- 选项卡菜单 begin -->
						           <ul id="count-tab" class="nav nav-tabs">
						               <li class="active"><a  class="tab_a_class" href="#publish-content"  
							               data-tipso="篇名包含此关键词的文献发文量趋势"
							               aria-expanded="false">学术关注度</a>
						               </li>
						               <li class=""><a class="tab_a_class" href="#user-content" 
							               data-tipso="篇名包含此关键词的文献下载量趋势"
							               aria-expanded="true">用户关注度</a>
						               </li>
						                 <li class=""><a class="tab_a_class" href="#cited-content" 
							                 data-tipso="篇名包含此关键词的文献被引量趋势"
							                 aria-expanded="true">学术传播度</a>
						               </li>
						                 <li class=""><a class="tab_a_class" href="#media-content" 
						                  data-tipso="篇名包含此关键词的报纸文献发文量趋势"
						                 aria-expanded="true">媒体关注度</a>
						               </li>
						           </ul>
						        <!-- 选项卡菜单  end -->
						        <!-- 选项卡面板 begin-->
						           <div id="count-content"class="tab-content">
						               <div id="publish-content" class="tab-pane active">
						                   <div class="panel-body">
						                   	<div class="" id="publishCount" style="height:550px;">
						                   	  	<button class="button extra-color index-button">点击重新加载</button>
						                   	</div>
						                   </div>
						               </div>
						               <div id="user-content" class="tab-pane">
						                   <div class="panel-body">
						                   	<div class="" id="userCount" style="height:550px;">
						                   		<button class="button extra-color index-button">点击重新加载</button>
						                   	</div>
						                   </div>
						               </div>
						                    <div id="cited-content" class="tab-pane">
						                   <div class="panel-body">
						                   	<div class="" id="citedCount" style="height:550px;">
						                   	  	<button class="button extra-color index-button">点击重新加载</button>
						                   	</div>
						                   </div>
						               </div>
						               <div id="media-content" class="tab-pane">
						                   <div class="panel-body">
						                   	<div class="" id="mediaCount" style="height:550px;">
						                   		  	<button class="button extra-color index-button">点击重新加载</button>
						                   	</div>
						                   </div>
						               </div>
						           </div>
						        <!-- 选项卡面板 end  -->
						       </div>
						   	</div>
						    <!-- 关键词共现条形图 关注文献表格 -->
						    <div  style="width:100%;height:50px"></div>
						    <div class="text-inter">
									    <div class="container">
										      <div class="row">
											        <div class="col-md-3" id="wordCount" style="height:450px;border:1px solid #ccc;padding:20px"></div>  
										      		<div class="col-md-9" id="attention_table" 
										      		data-tipso="研究者关注的热点文献"
										      		style="
										      			height:450px;
										      			border:1px solid #ccc;
										      			padding:0 0 0 0;
										      			overflow:auto">
										      		</div>  
										      </div>
								   		</div>
								   		<div  style="width:100%;height:50px"></div>
								   		<div class="container">
								   		   	<div class="row">
											        <div class="col-md-6" id="orgCount" style="height:450px;border:1px solid #ccc;padding:20px">
											        	<a class="button extra-color">点击重新加载</a>
											        </div>  
										      		<div class="col-md-6" id="subjectCount" 
										      		style="
										      			height:450px;
										      			border:1px solid #ccc;
										      			padding:0 0 0 0;
										      			overflow:auto">
										      		</div>  
										      </div>
								   		</div>
						    </div>
						    <!-- 指数分析选项卡 end -->
					    </div>
					</div>
					<!-- 计量分析 begin -->
					<div id="caculate-data" class="tab-pane">
						<div class="panel-body">
							<!-- 个关键词分布和词云图 -->
							<div class="container">
									<div class="row">
									<div class="col-sm-5" id="wordCloud" style="height:450px;border:1px solid #ccc;padding:10px;"></div>
										<div class="col-sm-7" id="wordAllCount" style="height:450px;border:1px solid #ccc;padding:10px;"></div>
										
									</div>
							</div>
							<!-- 年度交叉分析 -->
								<div class="container">
								
								<div class="row">
									<div class="col-sm-12" id="yearCross" style="height:600px;border:1px solid #ccc;padding:10px;"></div>
								</div>
							</div>
							
							<!-- 关系共现网络 -->
							<div class="container">
								<div class="row">
									<div class="col-sm-12" id="matrix" style="height:600px;border:1px solid #ccc;padding:10px;"></div>
								</div>
							</div>
								<!-- <div class="container">
								<div class="row">
									<div class="col-sm-12" id="scatter" style="height:600px;border:1px solid #ccc;padding:10px;"></div>
								</div>
							</div> -->
						</div>
					</div>
					<!-- 计量分析 End -->
					<!-- 资源分布 begin -->
					<div id="source-distribute" class="tab-pane">
						<div class="panel-body">

						<div class="container">
							<div class="row">
								<div class="col-sm-6" id="resource_type" style="height:500px;border:1px solid #ccc;padding:10px;"></div>
								<div class="col-sm-6" id="docu_source" style="height:500px;border:1px solid #ccc;padding:10px;"></div>
							</div>
						</div>
							<div style="height:50px" ></div>
						<div class="container">
							<div class="row">
								<div class="col-sm-6" id="research_level" style="height:500px;border:1px solid #ccc;padding:10px;"></div>
								<div class="col-sm-6" id="sub_distribute" style="height:500px;border:1px solid #ccc;padding:10px;"></div>
								
							</div>
						</div>
						<div style="height:50px" ></div>
						<div class="container">
							<div class="row">
								<div class="col-sm-4" id="org_bar" style="height:600px;border:1px solid #ccc;padding:10px;"></div>
								<div class="col-sm-8" id="org_distribute" style="height:600px;border:1px solid #ccc;padding:10px;">
										 <a style="margin:auto;text-align:center"
										 id="buttonMap" class="button solid-color loadbtn">点击加载机构地图分布</a>
								</div>
							</div>
						</div>
						<div style="height:50px" ></div>
							<div class="text-inter">
								<div class="container">
									<div class="row">
										<div class="col-sm-4" id="fund_bar" style="height:600px;border:1px solid #ccc;padding:10px;"></div>
										<div class="col-sm-8" id="fund_distribute" style="height:600px;border:1px solid #ccc;padding:10px;">
												 <a style="margin:auto;text-align:center"
										 id="fundMap" class="button solid-color loadbtn">点击加载基金地图分布</a>
								
										</div>
								
									</div>
								</div>
							</div>
							
						</div>
					</div>
					
				
				
				</div>
			</div>
		</div>
	    </div>

   
  <div id="modal-form" class="modal fade" aria-hidden="true" style="display: none;
    		position:absolute;
    		top:25%;
    		left:50%
    		transform: translateX(-50%) translateY(-50%);">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-body">
                    <div class="row">
                        <div class="col-sm-6 b-r">
                            <h3 class="m-t-none m-b">登录</h3>

                            <p>欢迎登录本站(⊙o⊙)</p>

                            <form role="form">
                                <div class="form-group">
                                    <label>用户名：</label>
                                    <input id="username" type="text" placeholder="请输入用户名" class="form-control">
                                </div>
                                <div class="form-group">
                                    <label>密码：</label>
                                    <input id="password"type="password" placeholder="请输入密码" class="form-control">
                                </div>
                                <div>
                                    <button id="login_button" class="btn btn-sm btn-primary pull-right m-t-n-xs" type="button"><strong>登录</strong>
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div class="col-sm-6">
                            <h4>还不是会员？</h4>
                            <p>您可以注册一个账户</p>
                            <p class="text-center">
                                <a href="form_basic.html"><i class="fa fa-sign-in big-icon"></i></a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
   </div>
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
    
   
    <script src="<%=path %>/js/jquery-1.10.2.min.js"></script>
    <script src="<%=path %>/js/bootstrap.min.js"></script>
    <script src="<%=path %>/js/scripts.js"></script>
    <script src="<%=path %>/js/unslider.min.js"></script>
    <script src="<%=path %>/js/plugins/dataTables/jquery.dataTables.min.js"></script>

    <script src="<%=path %>/js/plugins/toastr/toastr.js"></script>
    <script src="<%=path %>/js/plugins/tooltip/tipso.min.js"></script>
    <script src="<%=path %>/js/horsey/jquery-ui.min.js"></script>
    <!-- 图表相关 -->
    <script src="<%=path %>/js/echarts/echarts.js"></script>
    <script src="<%=path %>/js/echarts/wonderland.js"></script>
     <script src="<%=path %>/js/echarts/echarts-wordcloud.min.js"></script>
    <script type="text/javascript" src="http://api.map.baidu.com/api?v=3.0&ak=cudRWYxjcLLBjz37p40zRRTn4124YeQw&callback=initialize"></script>
    <script src="<%=path %>/js/echarts/bmap.min.js"></script>
    <script src="<%=path %>/js/plugins/layer/layer.js"></script>
    <!-- 业务相关的逻辑js -->
    <script src="<%=path %>/js/data/util.js"></script>
    <script src="<%=path %>/js/index/get_source_data.js" type="text/javascript"></script>
    <script src="<%=path %>/js/index/get_org_map.js" type="text/javascript"></script>
    <script src="<%=path %>/js/index/show_result.js"></script>
    <script src="<%=path %>/js/index/get_index_data.js"></script>
    <script src="<%=path %>/js/index/load_echarts.js"></script>
    <script src="<%=path %>/js/index/get_caculate_data.js"></script>
    <script src="<%=path %>/js/index/load_index_subject.js"></script>
	<script type="text/javascript"> var ctx = "<%=path%>";
    </script>

</body>
    
</html>