package com.cnki.njit.crawl.Util;


import com.cnki.njit.crawl.Controller.KeywordController;
import com.google.common.collect.Lists;
import org.junit.Assert;
import org.junit.Test;
import struct.KeywordsAutocomplete;

/**
 * Created by zhangcheng on 15/3/5.
 */
public class KeywordsAutocompleteTest {

    static KeywordsAutocomplete kac;
    private static final String localPath =  KeywordController.class.getClassLoader().getResource("./").getPath();
	

    @Test
    public void testSearch() throws Exception {
        kac = new KeywordsAutocomplete("en");
//        kac.load("");
    
        Assert.assertEquals("abc", Lists.newLinkedList(kac.search("ab")).get(0));

        Assert.assertEquals("中国", Lists.newLinkedList(kac.search("中")).get(0));
        Assert.assertEquals("中国", Lists.newLinkedList(kac.search("中国")).get(0));
        Assert.assertEquals("中国", Lists.newLinkedList(kac.search("zg")).get(0));
        Assert.assertEquals("中国", Lists.newLinkedList(kac.search("zhong")).get(0));

    }
    
    public static void main(String[] args) throws Exception {
    	KeywordsAutocomplete kac = new KeywordsAutocomplete("ch");
    	 System.out.println("加载词典到内存，文件路径 : "+localPath);
		   kac.load(localPath+"\\com\\sy\\controller\\words.txt");
		   //kac.add("中国");
		   System.out.println(kac.showDict());
		   System.out.println(kac.search("zg"));
		   System.out.println(kac.search("x"));
		   System.out.println(kac.search("yuan"));
		   System.out.println(kac.search("j"));
		   System.out.println("size is :" + kac.size());
		   System.out.println("词典加载到内存完毕..");
	}
}
