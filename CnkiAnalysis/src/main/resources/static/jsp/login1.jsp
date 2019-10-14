<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<script type="text/javascript" src="../js/gt.js"></script>
<!-- 注意，验证码本身是不需要 jquery 库，此处使用 jquery 仅为了在 demo 使用，减少代码量 -->  
<script src="http://apps.bdimg.com/libs/jquery/1.9.1/jquery.js"></script>  
<script type="text/javascript">
var handlerPopup = function (captchaObj) {
    // 成功的回调
    captchaObj.onSuccess(function () {
        var validate = captchaObj.getValidate();
        $.ajax({
            url: "gt/validate", // 进行二次验证
            type: "post",
            dataType: "json",
            data: {
                username: $('#username1').val(),
                password: $('#password1').val(),
                geetest_challenge: validate.geetest_challenge,
                geetest_validate: validate.geetest_validate,
                geetest_seccode: validate.geetest_seccode
            },
            success: function (data) {
                if (data && (data.status === "success")) {
                    $(document.body).html('<h1>登录成功</h1>');
                } else {
                    $(document.body).html('<h1>登录失败</h1>');
                }
            }
        });
    });
    $("#popup-submit").click(function () {
        captchaObj.show();
    });
    // 将验证码加到id为captcha的元素里
    captchaObj.appendTo("#popup-captcha");
    // 更多接口参考：http://www.geetest.com/install/sections/idx-client-sdk.html
};
// 验证开始需要向网站主后台获取id，challenge，success（是否启用failback）
$.ajax({
    url: "gt/init?t=" + (new Date()).getTime(), // 加随机数防止缓存
    type: "get",
    dataType: "json",
    success: function (data) {
        // 使用initGeetest接口
        // 参数1：配置参数
        // 参数2：回调，回调的第一个参数验证码对象，之后可以使用它做appendTo之类的事件
        initGeetest({
            gt: data.gt,
            challenge: data.challenge,
            product: "popup", // 产品形式，包括：float，embed，popup。注意只对PC版验证码有效
            offline: !data.success // 表示用户后台检测极验服务器是否宕机，一般不需要关注
            // 更多配置参数请参见：http://www.geetest.com/install/sections/idx-client-sdk.html#config
        }, handlerPopup);
    }
})
</script>

<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>Insert title here</title>
<style>
 body {  
            margin: 50px 0;  
            text-align: center;  
            font-family: "PingFangSC-Regular", "Open Sans", Arial, "Hiragino Sans GB", "Microsoft YaHei", "STHeiti", "WenQuanYi Micro Hei", SimSun, sans-serif;  
        }  
        .inp {  
            border: 1px solid #cccccc;  
            border-radius: 2px;  
            padding: 0 10px;  
            width: 278px;  
            height: 40px;  
            font-size: 18px;  
        }  
        .btn {  
            border: 1px solid #cccccc;  
            border-radius: 2px;  
            width: 100px;  
            height: 40px;  
            font-size: 16px;  
            color: #666;  
            cursor: pointer;  
            background: white linear-gradient(180deg, #ffffff 0%, #f3f3f3 100%);  
        }  
        .btn:hover {  
            background: white linear-gradient(0deg, #ffffff 0%, #f3f3f3 100%)  
        }  
        #captcha1,  
        #captcha2 {  
            width: 300px;  
            display: inline-block;  
        }  
        .show {  
            display: block;  
        }  
        .hide {  
            display: none;  
        }  
        #notice1,  
        #notice2 {  
            color: red;  
        }  
        label {  
            vertical-align: top;  
            display: inline-block;  
            width: 80px;  
            text-align: right;  
        }  
        #wait1, #wait2 {  
            text-align: left;  
            color: #666;  
            margin: 0;  
        }  
    </style>  
</head>

<body>

	<form action="/userLogin/user/checkLogin" method="post">
		
			<div>
				用户名:
				<input class="inp" id="username" name="username" type="text">
			</div><br>
			<div>
				密码:
				<input class="inp" id="password" name="password" type="password">
			</div><br>
			
			  <div>  
        <label>完成验证：</label>  
	        <div id="captcha2">  
	            <p id="wait2" class="show">正在加载验证码......</p>  
	        </div>  
   		</div>  <br>  
    <p id="notice2" class="hide">请先完成验证</p>
			
				<input class="btn" type="submit" value="登录">
				<a href="/userLogin/user/addUser">注册</a> 
		
		
	</form>
</body>
</html>