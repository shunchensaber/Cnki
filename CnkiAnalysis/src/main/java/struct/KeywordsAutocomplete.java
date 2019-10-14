package struct;


import com.github.stuxuhai.jpinyin.PinyinException;
import com.github.stuxuhai.jpinyin.PinyinFormat;
import com.github.stuxuhai.jpinyin.PinyinHelper;
import com.google.common.base.Charsets;
import com.google.common.base.Function;
import com.google.common.collect.Lists;
import com.google.common.collect.Maps;
import com.google.common.collect.Sets;
import com.google.common.io.Files;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.io.File;
import java.util.List;
import java.util.Map;
import java.util.Set;

/**
 * Created on 18/3/5.
 */
@Component
public class KeywordsAutocomplete {

	private static final org.slf4j.Logger Logger = LoggerFactory.getLogger(KeywordsAutocomplete.class);
    private String lang = "en";
    private TernarySearchTree tst;
    
    private Map<String, DataField> suffixMap;

    /**
     * 构造函数
     * @param lang
     */
    public KeywordsAutocomplete(String lang) {
        if (null != lang)
            this.lang = lang;
        tst = new TernarySearchTree();
        suffixMap = Maps.newHashMap();
      /*Logger.info("启动线程...");
        new KeywordMonitorThread(this).start();*/
    }

    /**
     * 添加拼音转换
     * @param text
     * @param tst
     * @throws PinyinException 
     */
    private void suffixAdd(String text, Integer count, TernarySearchTree tst) throws PinyinException {
    	//直接返回一个长度为3的数组
        List<String> searchTypes = Lists.newArrayListWithCapacity(3);
        //加入原字符串
        searchTypes.add(text);
        if (lang.equalsIgnoreCase("ch")) {
        	//加入首字母
            searchTypes.add(PinyinHelper.getShortPinyin(text));
            //加入拼音
            searchTypes.add(PinyinHelper.convertToPinyinString(text, "", PinyinFormat.WITHOUT_TONE));
        }
        for (String str : searchTypes) {
     /*   	//删除前3个字符之后 后的匹配key
            if (str.length() > 3) {
                for (int i = 0; i < str.length() - 3; ++i) {
                    String key = str.substring(i);
                    tst.add(key);
                    suffixMap.put(key, new DataField(searchTypes.get(0),count));
                }
            } else {*/
            	tst.add(str);
                suffixMap.put(str, new DataField(searchTypes.get(0),count));
           // }
        	
        }
    }

    //从文件读取数据，不需要去额外添加数据
  /*  public void add(String text) throws PinyinException {
        suffixAdd(text,tst);
    }*/

    public void load(String keywordsFile) throws Exception {
        Files.readLines(new File(keywordsFile), Charsets.UTF_8).stream().forEach(t -> {
            try {
            	String keyCount[] =  t.split(",");
            	System.out.println(keyCount[0]+"---"+keyCount[1]);
				suffixAdd(keyCount[0], Integer.parseInt(keyCount[1]),tst);
			} catch (PinyinException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
        });
    }

    //返回词典大小
    public int size() {
    	return tst.size();
    }
    
    /**
     * 返回所有数据
     * @return
     */
    public Set<DataField> showDict(){
    	 return Sets.newHashSet(Lists.transform(Lists.newLinkedList(tst.keys()), 
         		new Function<String, DataField>() {
             @Override
             public DataField apply(String name) {
                 if (suffixMap.containsKey(name)) {
                	 System.out.println("[key-value :"+name+" value:"+ suffixMap.get(name)+"]" );
                     return suffixMap.get(name);
                 }
                 return null;
             }
         }));
    }
    
    /**
     *  前缀查询
     * @param prefix 前缀词(包括全词)
     * @return Set
     */
    public Set<DataField> search(String prefix) {
    	//lists.transform 从一种类型的list转换成另一种类型的list
    	//在set中添加 list(三分树搜索后匹配的元素)中每个元素的
        return Sets.newHashSet(Lists.transform(Lists.newLinkedList(tst.keysWithPrefix(prefix)), 
        		new Function<String, DataField>() {
            @Override
            public DataField apply(String name) {
                if (suffixMap.containsKey(name)) {
                    return suffixMap.get(name);
                }
                return null;
            }
        }));
    }
    
    // 线程
  /*  private static class KeywordMonitorThread extends Thread {  

    	private final KeywordsAutocomplete autocomplete; 
        private volatile boolean shutdown;  

        public KeywordMonitorThread(KeywordsAutocomplete autocomplete) {  
            super();  
            this.autocomplete = autocomplete;  
        }  

        @Override
        public void run() {  
            try {  
                while (!shutdown) {  
                    synchronized (this) {  
                        wait(60000);
                        Logger.info("执行一次autocomplete监控线程");
                        //模拟写入...
                        System.out.println("模拟写入文件操作...");
                    }  
                }  
            } catch (InterruptedException ex) {  
                ex.printStackTrace();  
            }  
        }  
    } */
}
