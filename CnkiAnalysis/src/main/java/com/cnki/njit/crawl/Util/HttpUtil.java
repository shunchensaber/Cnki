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
		 * ƴװ����Ip������ͷ
		 * @param orderno userkey
		 * @param secret userksy
		 * @param timestamp ʱ���
		 * @return ������֤����ͷ��Ϣ
		 */
	   public static String authHeader(String orderno, String secret, int timestamp){
		    //ƴװǩ���ַ���
		    String planText = String.format("orderno=%s,secret=%s,timestamp=%d", orderno, secret, timestamp);
		    //����ǩ��
		    String sign = org.apache.commons.codec.digest.DigestUtils.md5Hex(planText).toUpperCase();
		    //ƴװ����ͷProxy-Authorization��ֵ
		    String authHeader = String.format("sign=%s&orderno=%s&timestamp=%d", sign, orderno, timestamp);
		    return authHeader;
	    }
	   
	   /**
	    * ��get������������ͷ
	    * @param httpGet
	    */
		public static void setRequestConfig(HttpGet httpGet) {

		    final String ip = "forward.xdaili.cn";//��������ʽ������ip��ַΪ׼
		    final int port = 80;//��������ʽ�������˿ڵ�ַΪ׼{
		    int timestamp = (int) (new Date().getTime()/1000);
	        //���¶����ţ�secret���� �����иĶ�
	        final String authHeader = authHeader("ZF20181102280btzMoL", "f36bd1e246344c4ca54ecd20c867c245", timestamp);
			HttpHost proxy=new HttpHost(ip, port);
			httpGet.setHeader("Proxy-Authorization",authHeader);
	        RequestConfig requestConfig= RequestConfig.custom().setProxy(proxy).build();
	        httpGet.setConfig(requestConfig);
		}
		/**
		    * ��post������������ͷ
		    * @param httpGet
		    */
		public static void setRequestConfig(HttpPost httpGet) {

		    final String ip = "forward.xdaili.cn";//��������ʽ������ip��ַΪ׼
		    final int port = 80;//��������ʽ�������˿ڵ�ַΪ׼{
		    int timestamp = (int) (new Date().getTime()/1000);
	        //���¶����ţ�secret���� �����иĶ�
	        final String authHeader = authHeader("ZF20181102280btzMoL", "f36bd1e246344c4ca54ecd20c867c245", timestamp);
			HttpHost proxy=new HttpHost(ip, port);
			httpGet.setHeader("Proxy-Authorization",authHeader);
	        RequestConfig requestConfig= RequestConfig.custom().setProxy(proxy).build();
	        httpGet.setConfig(requestConfig);
		}
		
		public static String setGMCTime() {
			Calendar cd = Calendar.getInstance();
			SimpleDateFormat sdf = new SimpleDateFormat("EEE MMM d yyyy HH:mm:ss 'GMT+800 (�й���׼ʱ��)'", Locale.US);
			sdf.setTimeZone(TimeZone.getTimeZone("GMT")); // ����ʱ��ΪGMT
			return sdf.format(cd.getTime());  
		}
}
