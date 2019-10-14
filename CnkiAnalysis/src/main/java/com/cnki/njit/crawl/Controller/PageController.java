package com.cnki.njit.crawl.Controller;

import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;


/**
 * 页面跳转控制器
 * @author LAO
 *
 */
@Controller
@RequestMapping("/page")

public class PageController {

	//private static final HtmlPage page = HttpUtil.getWebFirstPage(webClient);
	private static final org.slf4j.Logger Logger = LoggerFactory.getLogger(PageController.class);

	@RequestMapping("index1")
	public String toIndex()
	{

		return "index";
	}

	@RequestMapping("/index_data")
	public String returnIndexData(String keyword) {
		System.out.println("keyword = "+keyword );
		return "data/index_data";
	}
	
	@RequestMapping("/ref")
	public String returnReferencePage() {
		System.out.println("entring in High Reference Page.");
		return "data/show_ref_table";
	}
	
	
	/**
	 * 跳转到主页
	 * @return
	 */
	@RequestMapping("/index")
	public String JumpToTheIndex() {
		return "data/index";
	}
	@RequestMapping("/mapDistribute")
	public String testMain() {
		return "data/mapDistribute";
	}
	//正常访问文献发表量页面
	@RequestMapping(value = "/docuPublication")
	public String toDocu(String dataType, String keyword){
		System.out.println("请求参数" + dataType);
		System.out.println("请求参数 keyword" +keyword);
		return "data/docuPublication";
	}
	
	//正常访问文献发表量页面
		@RequestMapping(value = "/wordDistribute")
		public String toWord(){

			return "data/wordDistribute";
		}
		
		
		@RequestMapping(value = "/testSearch")
		public String toSearch(){

			return "data/test_search";
		}
		
		@RequestMapping(value = "/register")
		public String toRegister(){

			return "register";
		}
	
}
