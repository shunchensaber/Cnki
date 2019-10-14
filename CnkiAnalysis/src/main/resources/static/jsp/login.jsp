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
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">

    <title>数据分析与可视化 - 登录</title>
    <meta name="keywords" content="Analysis - Login">
    <meta name="description" content="Analysis - Login">
    <link href="<%=path%>/css/bootstrap.min.css" rel="stylesheet">
    <link href="<%=path%>/css/font-awesome.min.css?v=4.4.0" rel="stylesheet">
    <link href="<%=path%>/css/animate.min.css" rel="stylesheet">
    <link href="<%=path%>/css/style.min.css" rel="stylesheet">
    <link href="<%=path%>/css/login.min.css" rel="stylesheet">
    <!--[if lt IE 8]>
    <meta http-equiv="refresh" content="0;ie.html" />
    <![endif]-->
    <script>
        if(window.top!==window.self){window.top.location=window.location};
    </script>

</head>

<body class="signin">
    <div class="signinpanel">
        <div class="row">
            <div class="col-sm-7">
                <div class="signin-info">
                    <div class="logopanel m-b">
                        <h1>[ H+ ]</h1>
                    </div>
                    <div class="m-b"></div>
                    <h4>欢迎使用 <strong>（爱用用，不用滚）</strong></h4>
                    <ul class="m-b">
                        <li><i class="fa fa-arrow-circle-o-right m-r-xs"></i> 优势一 没有</li>
                        <li><i class="fa fa-arrow-circle-o-right m-r-xs"></i> 优势二 别看了没有</li>
                        <li><i class="fa fa-arrow-circle-o-right m-r-xs"></i> 优势三 真没有</li>
                        <li><i class="fa fa-arrow-circle-o-right m-r-xs"></i> 优势四  这就是个毕设</li>
                        <li><i class="fa fa-arrow-circle-o-right m-r-xs"></i> 优势五 去你妈的优势</li>
                    </ul>
                    <strong>还没有账号？ <a href="register">立即注册&raquo;</a></strong>
                </div>
            </div>
            <div class="col-sm-5">
                <form method="post" action="checkLogin">
                    <h4 class="no-margins">登录：</h4>
                    <p class="m-t-md">登录到 数据分析与可视化平台</p>
                    <input type="text" name="username" style="height:40px" class="form-control uname" placeholder="用户名" />
                    <input type="password" name="password" style="height:40px" class="form-control pword m-b" placeholder="密码" />
                    <a href="">忘记密码了？</a>
                    <button class="btn btn-success btn-block">登录</button>
                </form>
            </div>
        </div>
        <div class="signup-footer">
            <div class="pull-left">
                &copy; 2017 All Rights Reserved. Cy
            </div>
        </div>
    </div>
</body>

</html>