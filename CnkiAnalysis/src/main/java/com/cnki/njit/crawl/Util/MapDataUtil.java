package com.cnki.njit.crawl.Util;

import com.google.common.base.Joiner;
import com.google.common.base.Splitter;
import org.slf4j.LoggerFactory;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.Map;

public class MapDataUtil {
	
	private static final String BAIDU_URL= "http://api.map.baidu.com/geocoder/v2/?address=";
	private static final String URL_TAIL = "&output=json&ak=sYVnAXX43USSVPlnPt3CGwsVH4j17Zz4&callback=showLocation";
	private static final org.slf4j.Logger Logger = LoggerFactory.getLogger(MapDataUtil.class);
	
	public static String getLocation(String address) {
	
		
		Iterable<String> addressIter = dealWithAddress(address);
		StringBuilder sb = new StringBuilder();
		Map<String, String> map =new HashMap<String, String>();
		for(String add : addressIter) {
			//清空
			sb.delete(0, sb.length());
			Logger.info("---add is : " + add);
			 
			URL url = null;
			try {
				url = new URL(BAIDU_URL+ URLEncoder.encode(add)+URL_TAIL);
			
				BufferedReader in = null;
				if( url.openStream() != null ) {
					in = new BufferedReader(new InputStreamReader(url.openStream()));
				}
				String temp = "";
				while( (temp = in.readLine()) != null  ) {
					sb.append(temp.trim());
				}
				in.close();
				//将返回结果处理成entry并添加到map
				map.put(add,dealWithCallback(sb.toString())) ;
				
				System.out.println("the "+add+"'s location is "+sb.toString());
			} catch (MalformedURLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		return ConvertUtil.MapToJson(map);
	}
	
	private static Iterable<String> dealWithAddress(String address) {
				//切割后去除前后空格
		return 	Splitter.on(",").trimResults()
				//忽略结果中的空白字符串
				.omitEmptyStrings().split(address);
	}
	
	private static String dealWithCallback(String add) {
		String result = "";
        if( add != null ){
            int lngStart = add.indexOf("lng\":");
            int lngEnd = add.indexOf(",\"lat");
            int latEnd = add.indexOf("},\"precise");
            if( lngStart>0 && lngEnd>0 && latEnd>0 ){
                String lng = add.substring(lngStart+5,lngStart+10);
                String lat = add.substring(lngEnd+7,lngEnd+12);
               result =  Joiner.on(",").skipNulls().join(lng,lat);
            }
        }
        return result;
	}
}
        
	

