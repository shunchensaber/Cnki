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
     * ���캯��
     * @param lang
     */
    public KeywordsAutocomplete(String lang) {
        if (null != lang)
            this.lang = lang;
        tst = new TernarySearchTree();
        suffixMap = Maps.newHashMap();
      /*Logger.info("�����߳�...");
        new KeywordMonitorThread(this).start();*/
    }

    /**
     * ���ƴ��ת��
     * @param text
     * @param tst
     * @throws PinyinException 
     */
    private void suffixAdd(String text, Integer count, TernarySearchTree tst) throws PinyinException {
    	//ֱ�ӷ���һ������Ϊ3������
        List<String> searchTypes = Lists.newArrayListWithCapacity(3);
        //����ԭ�ַ���
        searchTypes.add(text);
        if (lang.equalsIgnoreCase("ch")) {
        	//��������ĸ
            searchTypes.add(PinyinHelper.getShortPinyin(text));
            //����ƴ��
            searchTypes.add(PinyinHelper.convertToPinyinString(text, "", PinyinFormat.WITHOUT_TONE));
        }
        for (String str : searchTypes) {
     /*   	//ɾ��ǰ3���ַ�֮�� ���ƥ��key
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

    //���ļ���ȡ���ݣ�����Ҫȥ�����������
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

    //���شʵ��С
    public int size() {
    	return tst.size();
    }
    
    /**
     * ������������
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
     *  ǰ׺��ѯ
     * @param prefix ǰ׺��(����ȫ��)
     * @return Set
     */
    public Set<DataField> search(String prefix) {
    	//lists.transform ��һ�����͵�listת������һ�����͵�list
    	//��set����� list(������������ƥ���Ԫ��)��ÿ��Ԫ�ص�
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
    
    // �߳�
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
                        Logger.info("ִ��һ��autocomplete����߳�");
                        //ģ��д��...
                        System.out.println("ģ��д���ļ�����...");
                    }  
                }  
            } catch (InterruptedException ex) {  
                ex.printStackTrace();  
            }  
        }  
    } */
}
