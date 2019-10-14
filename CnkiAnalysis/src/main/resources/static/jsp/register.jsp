<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://"
            + request.getServerName() + ":" + request.getServerPort()
            + path + "/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    

    <title>Anaylsis - 注册</title>
    <meta name="keywords" content="Anaylsis - Register">
    <meta name="description" content="Anaylsis - Register">

    <link rel="shortcut icon" href="<%=path%>/img/favicon.ico">
  <link href="<%=path %>/css/bootstrap.min.css" rel="stylesheet">
    <link href="<%=path%>/css/font-awesome.min.css?v=4.4.0" rel="stylesheet">
    <link href="<%=path%>/css/animate.min.css" rel="stylesheet">
    <link href="<%=path%>/css/style.min.css?v=4.0.0" rel="stylesheet"><base target="_blank">
    <script>if(window.top !== window.self){ window.top.location = window.location;}</script>

</head>

<body class="gray-bg">

    <div class="middle-box text-center loginscreen   animated fadeInDown">
        <div class="col-sm-16">
          <div style="height:50px"></div>
            <div>

                <h1 class="logo-name">实时数据可视化分析平台</h1>

            </div>
            <div style="height:50px"></div>
            <h3>欢迎注册本平台</h3>
            <p>创建一个新账户</p>
             <form class="m-t" role="form" action="login.html">
                 <div class="form-group">
                    <input type="text" id="register_username" class="form-control" placeholder="请输入用户名" required="">
                </div>
                <div class="form-group">
                    <input type="password" id="register_password" name="password" class="form-control" placeholder="请输入密码" required="">
                	<span id="tip"></span>
                </div>
                <div class="form-group">
                    <input type="password" id="repassword" name="repassword" class="form-control" placeholder="请再次输入密码" required="">
               		<span id="tip"></span>
                </div>
                <button id="registerButton" type="button" class="btn btn-primary block full-width m-b">注 册</button>
                <p class="text-muted text-center"><small>已经有账户了？</small><a data-toggle="modal" href="#modal-form">点此登录</a>
                </p>
                 
            </form> 
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
                                <a href="<%=request.getContextPath() %>/page/register"><i class="fa fa-sign-in big-icon"></i></a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
   </div>
  	<script src="<%=path %>/js/jquery-1.10.2.min.js"></script>
    <script src="<%=path %>/js/bootstrap.min.js"></script>
    <script src="<%=path %>/js/plugins/layer/layer.js"></script>
    <script src="<%=path%>/js/plugins/validate/jquery.validate.min.js"></script>
    <script src="<%=path%>/js/plugins/validate/messages_zh.min.js"></script>
    <script type="text/javascript" src="http://tajs.qq.com/stats?sId=9051096" charset="UTF-8"></script>
	<script>
	 var ctx = "<%=path%>";
	//验证两次密码是否相等
	
	$("register_password").bind("blur",function(){
		if( $("register_password").val().length < 6){
			layer.msg("密码长度小于6，请重新输入。",{icon:2,time:2000});
			return;
		}
	});
	$("#repassword").bind("blur",function(){
		var password = $("#register_password").val();
		if( $("#register_password").val() != $("#repassword").val() ){
			layer.msg("两次密码不相同，请重新输入。",{icon:2,time:2000})
			return;
		}
	});
	
	$("#registerButton").bind("click",function(){
		if( $("#register_password").val() != $("#repassword").val() ){
			layer.msg("两次密码不相同，请重新输入。",{icon:2,time:2000})
			return;
		}
		if( $("register_password").val().length < 6){
			layer.msg("密码长度小于6，请重新输入。",{icon:2,time:2000});
			return;
		}
		$.ajax({
			  type:"POST",
				url: ctx+'/user/register',
				dataType: 'json',
				data:{"username":$("#register_username").val().trim(),
					"password":$("#repassword").val().trim(),
				},
				success: function(ret){
					if( ret.status == 0 ){
						layer.msg(ret.info+"，即将回到主页。",{icon:1,time:1000});
						setTimeout("window.location.href="+ctx,1000);
					}else{
						layer.msg(ret.info,{icon:2,time:2000});
					}
					
				},
				error:function(){
					layer.msg("注册失败，请稍后重试。",{icon:2,time:2000})
				}
		  });
	})
	
	
	</script>

</body>

</html>