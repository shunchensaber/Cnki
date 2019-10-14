package com.cnki.njit.crawl.Util;

import com.google.gson.*;

import java.util.Map;

public class ConvertUtil {
	public static String getGroupCode(String groupName) {
		String groupCode = "";
		switch(groupName) {
			case "资源类型":
				groupCode = "RESOURCE_TYPE";break;
			case "关键词":
				groupCode = "KEYWORD";break;
			case "文献来源":
				groupCode = "OTHER";break;
			case "学科":
				groupCode = "SUBJECT";break;
			case "基金":
				groupCode = "FUND";break;
			case "机构":
				groupCode = "ORG";break;
			case "作者":
				groupCode = "OTHER";break;
			case "研究层次":
				groupCode = "OTHER";break;
		}
		return groupCode;
	}
	public static String getIndexAnalysisJson(String jsonString , String resultType) {
		
		String result = "";
		//新建Gson对象
		Gson gson = new GsonBuilder()
				.setPrettyPrinting()//设置格式化输出
				.disableHtmlEscaping()//且解析时不对特殊字符转义
				.create();
		//json解析器
		JsonParser parser = new JsonParser();
		//将字符串解析成Json元素
		System.out.println("---"+jsonString);
		JsonObject responseJson = parser.parse(jsonString).getAsJsonObject();
		//解析
		JsonElement d = responseJson.get("d");
		if(  resultType.contains("GetProgress")) {
			result = d.toString();
		}else if( resultType.equals("GetAttentionArticle") ) {
			result = d.toString();
		}else{
			String dString = d.toString();
			JsonObject json = parser.parse(dString.substring(2, dString.length()-2)).getAsJsonObject();//gson.toJson(responseJson);
			result = json.toString();
		}
		return result;
	}
	
	public static String getRequestBody(String type, String keyword, String numType) {
		
		String result = "";
		switch(type) {
			//stype 要改
			case "GetAttention":
				result = "{'sval': '"+
					ConvertUtil.stringConvertToUTF8(keyword).toString()
					+ "','xkcode': '*','scomp1': '','scomp2': '','scomp3': '','stype': '"+numType+"'}";
				break;
			case "GetSubject": 
			case "GetInstitution":
				result = "{'sval': '"+
					ConvertUtil.stringConvertToUTF8(keyword).toString()
					+"','xkcode': '*'}";
				break;
			case "GetAttentionArticle": result = "{'sval': '"+
					ConvertUtil.stringConvertToUTF8(keyword).toString()
					+"','xkcode': '*','scode':'','stype':'0'}";
					break;
		
			//相关词分布 研究文献
			case "GetTotalRelevanceWordsForCht":
			case "GetProgressClassic":
			case "GetProgressNewest":
			case "GetProgresEarlist":
				result = "{'sval': '"+
					ConvertUtil.stringConvertToUTF8(keyword).toString()
					+"','scode': '"+ (numType.length()>5?"*":numType.length()>0?numType:"*")  +"'}";
				break;
				
			default:result = "";break;
		}
		
		return result;
	}
	
	
	/**
	 * 将搜索的关键字字符串全部转换成UTF-8的编码
	 * @param input 输入的关键词
	 * @return 转换后的字符串
	 */
	public static String stringAllConvertToUTF8(String input){
		
		//建立保存转换后字符的StringBuffer对象
		//(String对象追加操作消耗的内存过多)
		StringBuffer output = new StringBuffer();
        System.out.println("get the string \""+input+ "\"'s utf8 encoding：");
        for (int i = 0; i < input.length(); i++){
        	char c = input.charAt(i);
        		//取得该字符的16进制编码 符合URL的规则，取%做编码起始符号
	            output.append("%u" + Integer.toString(c, 16));
        
	    }        
		System.out.println("the utf-8 convert output is : " + output);
		return output.toString();
	}
	/**
	 * 将搜索的关键字字符串转换成UTF-8的编码 忽略字母数字符号
	 * @param input 输入的关键词
	 * @return 转换后的字符串
	 */
	public static String stringConvertToUTF8(String input){
		
		//建立保存转换后字符的StringBuffer对象
		//(String对象追加操作消耗的内存过多)
		StringBuffer output = new StringBuffer();
        System.out.println("get the string \""+input+ "\"'s utf8 encoding：");
        for (int i = 0; i < input.length(); i++){
        	char c = input.charAt(i);
        	//当前字符是否为汉字字符
        	if( c >= 0x4E00 &&  c <= 0x9FA5) {
        		//汉字字符转换成UTF-8编码后追加
        		//取得该字符的16进制编码 符合URL的规则，取%做编码起始符号
	            output.append("%u" + Integer.toString(c, 16));
        	}else {
        		//字母和数字直接追加
        		output.append(c);
        	}
	    }        
		System.out.println("the utf-8 convert output is : " + output);
		return output.toString();
	}
	
	
	public static String MapToJson(Map map) {
	  return new GsonBuilder().enableComplexMapKeySerialization().create().toJson(map);  
	  
	}  
}
