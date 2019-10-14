package com.cnki.njit.crawl.Controller;

import java.io.IOException;

import com.cnki.njit.crawl.Crawl.HttpCrawl;
import com.cnki.njit.crawl.Util.AjaxResponse;
import org.apache.http.client.ClientProtocolException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;


@Controller
@RequestMapping("/page/data")

public class DataController {

	//日志常量
	private static final org.slf4j.Logger Logger = LoggerFactory.getLogger(DataController.class);

	@Autowired
	HttpCrawl httpCrawl;

	/**
	 * 获取高被引数据
	 * @param type 分组类型
	 * @return json对象
	 */
	@RequestMapping(value="/getRef",produces="text/html;charset=UTF-8")
	@ResponseBody
	public String getRefHome(String type) {
		
		String result = "";
		AjaxResponse response = null;
		Logger.info("[获取被引数据（首页，无页码）]--->[type:"+type+"]");
		Long start = System.currentTimeMillis();
		try {
			result =  httpCrawl.getReferenceData(type);
			//获取数据出错
			if(result.contains("error")) {
				response = new AjaxResponse(-1, "Failed: "+result);
			}else {
				response = new AjaxResponse(0, "get reference data, type is "+type);
				response.addDataItem("ret", result);
			}
		} catch (ClientProtocolException e) {
			// TODO Auto-generated catch block
			response = new AjaxResponse(-1, "Failed: "+e.getMessage());
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			response = new AjaxResponse(-1, "Failed: "+e.getMessage());
			e.printStackTrace();
		}
		Logger.info("[操作耗时]："+(System.currentTimeMillis()-start)+"ms");
		Logger.info("[操作结果]：" + response.toString());
		return response.toString();
	}


	/**
	 * 获取高被引数据
	 * @param type 分组类型
	 * @return json对象
	 */
	@RequestMapping(value="/getMoreRef",produces="text/html;charset=UTF-8")
	@ResponseBody
	public String getRefHome(String type, int page) {
		
		String result = "";
		AjaxResponse response = null;
		Logger.info("[Get more Reference data] --->[type:"+type+"]"+"[page="+page+"]");
		Long start = System.currentTimeMillis();
		try {
			result =  httpCrawl.getReferenceData(type,page);
			//获取数据出错
			if(result.contains("error")) {
				response = new AjaxResponse(-1, "Failed: "+result);
			}else {
				response = new AjaxResponse(0, "get reference data, type is "+type);
				response.addDataItem("ret", result);
			}
		} catch (ClientProtocolException e) {
			// TODO Auto-generated catch block
			response = new AjaxResponse(-1, "Failed: "+e.getMessage());
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			response = new AjaxResponse(-1, "Failed: "+e.getMessage());
			e.printStackTrace();
		}
		Logger.info("[操作耗时]："+(System.currentTimeMillis()-start)+"ms");
		Logger.info("[操作结果]：" + response.toString());
		return response.toString();
	}
	
	
	
	/**
	 * 获取计量可视化的数据
	 * @param keyword 关键词
	 * @param groupName 分组统计关键词
	 * @param urlName 对应请求名称
	 * @return json对象
	 */
	@RequestMapping("/caculate")
	@ResponseBody
	public String calculate(String keyword, String groupName, String urlName) {
		
		String result = "";
		AjaxResponse response = null;
		Logger.info("[执行计量分析方法] -->[keyword:"+keyword+"] [groupName:"+groupName+"] [urlName:"+urlName+"].");
		Long start = System.currentTimeMillis();
		try {
			result = httpCrawl.getCaculateData(keyword,groupName,urlName);
			if(result != null && result.length()>0) {
				response = new AjaxResponse(0, "成功获取数据");
				response.addDataItem("ret",result);
			}else if(result.contains("error")) {
				response = new AjaxResponse(-1, result);
			}
			else{
				response = new AjaxResponse(-1, "失败：计量数据返回空");
			}
		} catch (Exception e) {
			response = new AjaxResponse(-1, "失败："+e.getMessage());
			
		}
		Logger.info("[操作耗时]："+(System.currentTimeMillis()-start)+"ms");
		Logger.info("[操作结果]：" + response.toString());
		return response.toString();
	}
	

	/**
	 * 获取计量可视化的数据
	 * @param keyword 关键词
	 * @param groupName 分组统计关键词
	 * @param urlName 对应请求名称
	 * @return json对象
	 */
	@RequestMapping("/detail")
	@ResponseBody
	public String detail(String keyword, String groupName, String urlName, String fieldValue,
                         String field) {
		Logger.info("[获取更多细节数据...]");
		String result = "";
		AjaxResponse response = null;
		Long start = System.currentTimeMillis();
		try {
			result = httpCrawl.getDetailData(keyword,groupName,urlName, fieldValue, field);
			if(result != null && result.length()>0 && result.length() != 2) {
				response = new AjaxResponse(0, "成功获取数据");
				response.addDataItem("ret",result);
			}else if(result.contains("error")) {
				response = new AjaxResponse(-1, result);
			}
			else{
				response = new AjaxResponse(-1, "失败：计量数据返回空");
			}
		} catch (Exception e) {
			response = new AjaxResponse(-1, "失败："+e.getMessage());
			
		}
		Logger.info("[操作耗时]："+(System.currentTimeMillis()-start)+"ms");
		Logger.info("[操作结果]：" + response.toString());
		return response.toString();
	}
	
	
	//正常访问文献发表量页面
	@RequestMapping(value = "/getData")
	public String toWord(){
		return "data/show_result";
	}
	
	/**
	 * keyon 才触发
	 * @param topSearch
	 * @return
	 */
	@SuppressWarnings("null")
	@RequestMapping(value = "/getIndexData", method = RequestMethod.GET)
	@ResponseBody
	public String getIndexData(String topSearch, String resultType, String numType) {
		//假设获得的是已经经过验证的关键词 (前端验证非空)
		//创建存放json数据结果的字符串
		AjaxResponse response = null;

		String result = "";
		try {

			Logger.info("getIndexData Method.");
			Logger.info(" [keyword:"+topSearch+"] -=- [resultType:"+resultType+"] -=- [numType:"+numType+"]");
			result = httpCrawl.getIndexData(topSearch, resultType,numType);
			if(result != null && result.length()>0) {
				response = new AjaxResponse(0, "获取数据成功");
				response.addDataItem("ret", result);
				Logger.info("[result:"+result+"]");
			}else if(result.contains("error")) {
				response = new AjaxResponse(-1, result);
			}
			else {
				response = new AjaxResponse(-1," get Cookie failed or data's post failed..");
				
			}
		} catch (Exception e) {
			response = new AjaxResponse(-1, "失败："+e.getMessage());
		}

		return response.toString();
	}
	
	

	@ResponseBody
	@RequestMapping(value = "/getCaculateData", method = RequestMethod.POST)
	public String getCaculateData(String keyword, String groupName) {
	//调用HttpClient 传入用户输入的关键词
		String result = "";
		AjaxResponse response = null;
		//开启线程调用HttpUnit or 最初就开启一个页面等待关键词 获得Cookie后即可关闭
		try {
			result = httpCrawl.getCaculateData(keyword,groupName,"");
			if(result != null && result.length()>0) {
				response = new AjaxResponse(0, "成功获取数据");
				response.addDataItem("ret",result);
			}else if(result.contains("error") ) {
				response = new AjaxResponse(-1, result);
			}
			else {
				response = new AjaxResponse(-1, "失败：计量数据返回空");
			}
		} catch (Exception e) {
			response = new AjaxResponse(-1, "失败："+e.getMessage());
		}
		return response.toString();
	}
}
