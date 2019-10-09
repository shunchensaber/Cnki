package com.cnki.njit.crawl;



import org.jsoup.Connection;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import java.io.IOException;

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
        System.out.println(elements.get(0).toString());
        Element element =  elements.get(0);
//       String title =  element.getElementsByClass("tit clearfix").get(0).select("a").text();
               String papertitle =  element.select("a").first().text();
               String about = element.getElementsByClass("nr").text();
               String key  = element.getElementsByClass("info").get(0).select("p").get(0).text().replace("关键词：","");
        String yinyongxiazai  = element.getElementsByClass("info").get(0).select("p").get(1).text();
        String author  = element.getElementsByClass("source").text();
        System.out.println(author);


        System.out.println(papertitle);
        System.out.println(about);
        System.out.println(key);
        System.out.println(yinyongxiazai);
    }

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

    public static 
}
