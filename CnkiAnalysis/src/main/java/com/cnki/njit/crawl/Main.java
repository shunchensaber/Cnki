package com.cnki.njit.crawl;



import com.cnki.njit.crawl.Entity.Paper;
import org.jsoup.Connection;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class Main {

    public static void main(String[] args) throws IOException {

        String path = "http://yuanjian.cnki.net/Search/ListResult";
        String code = null;
        Connection connection = Jsoup.connect(path);
        connection.data("Content","南京");
        connection.data("Page","100");
        Document document  = connection.post();
        //System.out.println(document.toString());
        Elements elements = document.getElementsByClass("list-item");
  //      System.out.println(elements.get(0).toString());
        Element element =  elements.get(0);
////       String title =  element.getElementsByClass("tit clearfix").get(0).select("a").text();
//               String papertitle =  element.select("a").first().text();
//               String about = element.getElementsByClass("nr").text();
//               String key  = element.getElementsByClass("info").get(0).select("p").get(0).text().replace("关键词：","");
//        String yinyongxiazai  = element.getElementsByClass("info").get(0).select("p").get(1).text();
//        String author  = element.getElementsByClass("source").text();
//        System.out.println(author);
//
//
//        System.out.println(papertitle);
//        System.out.println(about);
//        System.out.println(key);
//        System.out.println(yinyongxiazai);
        //System.out.println(toPaper(element));

        System.out.println(elements.size());
        for(Paper re:toPaper(elements))
        {
            System.out.println(re);
        }
    }

    /**
     * 获取一个文章的信息
     * @param url
     * @param content
     * @param page
     * @return
     */
    public static Document getinf(String url,String content,String page)
    {
        Connection connection = Jsoup.connect(url);
        connection.data("Content",content);
        connection.data("Page",page);
        try {
            Document document = connection.post();
            return document;
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

    public static List<Paper> toPaper(Elements elements)
    {
        ArrayList<Paper> list = new ArrayList<>();
        for(Element element:elements)
        {
            list.add(toPaper(element));
        }
        return list;
    }

    /**
     * 将文章信息抽象对象存储
     * @param element
     * @return
     */
    public static Paper toPaper(Element element)
    {
        String papertitle =  element.select("a").first().text();
        String about = element.getElementsByClass("nr").text();
        String key  = element.getElementsByClass("info").get(0).select("p").get(0).text().replace("关键词：","");
        String yinyongxiazai  = element.getElementsByClass("info").get(0).select("p").get(1).text();
        String author  = element.getElementsByClass("source").text();

       Paper paper = new Paper();
       paper.setAbout(about);
       paper.setAuthorinformation(author);
       paper.setKey(key);
       paper.setPapertitle(papertitle);
       int dar[] = getDownRef(yinyongxiazai);
       paper.setDownload(dar[0]);
       paper.setRef(dar[1]);
       return paper;

    }

    /**
     * 对字符串进行分割操作，获取下载数和引用数
     */
    public static int[] getDownRef(String dar)
    {
        String temp[] = dar.split("被");
        int re[]  = new int[2];
        String tmepre  = "";
        for(int i  =0;i<2;i++)
        {
            for(int j = 0;j<temp[i].length();j++)
            {
                char t = temp[i].charAt(j);

                if(t>='0'&&t<='9')
                {
                    tmepre =tmepre+t;
                }
            }
            re[i] = Integer.parseInt(tmepre);
            tmepre  ="";
        }
        return re;
    }



}
