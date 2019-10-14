package com.cnki.njit.crawl.Util;

import org.apache.http.HttpHost;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Locale;
import java.util.TimeZone;

public class HttpUtil {

		/**
		 * 拼装代理Ip的请求头
		 * @param orderno userkey
		 * @param secret userksy
		 * @param timestamp 时间戳
		 * @return 代理验证请求头信息
		 */
	   public static String authHeader(String orderno, String secret, int timestamp){
		    //拼装签名字符串
		    String planText = String.format("orderno=%s,secret=%s,timestamp=%d", orderno, secret, timestamp);
		    //计算签名
		    String sign = org.apache.commons.codec.digest.DigestUtils.md5Hex(planText).toUpperCase();
		    //拼装请求头Proxy-Authorization的值
		    String authHeader = String.format("sign=%s&orderno=%s&timestamp=%d", sign, orderno, timestamp);
		    return authHeader;
	    }
	   
	   /**
	    * 对get请求设置请求头
	    * @param httpGet
	    */
		public static void setRequestConfig(HttpGet httpGet) {

		    final String ip = "forward.xdaili.cn";//这里以正式服务器ip地址为准
		    final int port = 80;//这里以正式服务器端口地址为准{
		    int timestamp = (int) (new Date().getTime()/1000);
	        //以下订单号，secret参数 须自行改动
	        final String authHeader = authHeader("ZF20181102280btzMoL", "f36bd1e246344c4ca54ecd20c867c245", timestamp);
			HttpHost proxy=new HttpHost(ip, port);
			httpGet.setHeader("Proxy-Authorization",authHeader);
	        RequestConfig requestConfig= RequestConfig.custom().setProxy(proxy).build();
	        httpGet.setConfig(requestConfig);
		}
		/**
		    * 对post请求设置请求头
		    * @param httpGet
		    */
		public static void setRequestConfig(HttpPost httpGet) {

		    final String ip = "forward.xdaili.cn";//这里以正式服务器ip地址为准
		    final int port = 80;//这里以正式服务器端口地址为准{
		    int timestamp = (int) (new Date().getTime()/1000);
	        //以下订单号，secret参数 须自行改动
	        final String authHeader = authHeader("ZF20181102280btzMoL", "f36bd1e246344c4ca54ecd20c867c245", timestamp);
			HttpHost proxy=new HttpHost(ip, port);
			httpGet.setHeader("Proxy-Authorization",authHeader);
	        RequestConfig requestConfig= RequestConfig.custom().setProxy(proxy).build();
	        httpGet.setConfig(requestConfig);
		}
		
		public static String setGMCTime() {
			Calendar cd = Calendar.getInstance();
			SimpleDateFormat sdf = new SimpleDateFormat("EEE MMM d yyyy HH:mm:ss 'GMT+800 (中国标准时间)'", Locale.US);
			sdf.setTimeZone(TimeZone.getTimeZone("GMT")); // 设置时区为GMT
			return sdf.format(cd.getTime());  
		}
}
