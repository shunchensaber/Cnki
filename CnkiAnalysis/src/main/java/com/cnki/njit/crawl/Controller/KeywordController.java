package com.cnki.njit.crawl.Controller;

import com.cnki.njit.crawl.Util.AjaxResponse;
import com.cnki.njit.crawl.Util.HeapSort;
import com.google.common.base.Charsets;
import com.google.common.collect.Lists;
import com.google.common.io.Files;
import com.google.gson.Gson;

import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.context.ServletConfigAware;
import struct.DataField;
import struct.KeywordsAutocomplete;

import javax.servlet.ServletConfig;
import java.io.File;
import java.io.IOException;
import java.util.List;

@Controller
@RequestMapping("/page/search")

public class KeywordController implements ServletConfigAware {

	//private static final HtmlPage page = HttpUtil.getWebFirstPage(webClient);
	private static final org.slf4j.Logger Logger = LoggerFactory.getLogger(KeywordController.class);
	//项目路径
	private static final String localPath =  KeywordController.class.getClassLoader().getResource("./").getPath();
	
	KeywordsAutocomplete kac;
		
	
	@RequestMapping(value="/push",produces="text/html;charset=UTF-8")
	@ResponseBody
	public String pushSearchWord(String keyword) {
		AjaxResponse response = null;
		//写入临时文件  分隔符不写，Linux下跑不通
		File tempFile = new File(localPath+"com"+ File.separator+"sy"+ File.separator+"controller"
		+ File.separator+"tempwords.txt");
		try {
			
			List<String> lines = Files.readLines(tempFile, Charsets.UTF_8);
			Logger.info(lines.size()+"");
			StringBuilder builder = new StringBuilder();
			for (String string : lines) {
				builder.append(string+"\t");
			
			}
			Logger.info(builder.toString());
			Files.append(keyword+"\r\n", tempFile, Charsets.UTF_8);
			response = new AjaxResponse(0, "push success.");
		} catch (IOException e) {
			// TODO Auto-generated catch block
			response = new AjaxResponse(-1, "push failed.");
			e.printStackTrace();
		}
		return response.toString();
	}
	
	
	@RequestMapping(value="/prefix",produces="text/html;charset=UTF-8")
	@ResponseBody
	public String getSearch(String prefix) {
		Long start = System.currentTimeMillis();
		List<DataField> result = Lists.newArrayList(kac.search(prefix));
		Logger.info("搜索规模-> 词典大小："+kac.size()
		+ " 搜索结果规模：" + result.size()
		+ " 后台搜索操作耗时：" + (System.currentTimeMillis()-start)+"ms");
		Logger.info("搜索结果："+result);
		
		//排序
		start = System.currentTimeMillis();
		List<DataField> resultSort = HeapSort.sort(result, 5);
		Logger.info("排序规模 top"+5+"："+result.size()+"，排序操作耗时："+(System.currentTimeMillis()-start)+"ms");
		Logger.info("排序结果："+resultSort);
		return new Gson().toJson(resultSort);
	}
	
	@Override
	/**
	 * 启动时加载词典
	 */
	public void setServletConfig(ServletConfig arg0) {
		// TODO Auto-generated method stub
		   try {
			   kac = new KeywordsAutocomplete("ch");
			   Logger.info("加载词典到内存，文件路径 : "+localPath);
			   kac.load(localPath+"com"+ File.separator+"sy"+ File.separator+"controller"+ File.separator+"words.txt");
			   //kac.showDict();
			   System.out.println(kac.search("j"));
			   System.out.println("size is :" + kac.size());
			   Logger.info("词典加载到内存完毕..");
		
		} catch (Exception e) {
			// TODO Auto-generated catch block
			Logger.error(e.getMessage());
		}
	}
}
