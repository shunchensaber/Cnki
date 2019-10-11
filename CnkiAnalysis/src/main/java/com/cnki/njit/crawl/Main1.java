package com.cnki.njit.crawl;

import org.jsoup.Connection;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;

import java.io.IOException;

public class Main1 {
    public static void main(String[] args) {

        String path  ="http://yuanjian.cnki.net/Search/Result";
        String ser = "aa";
        Connection connection = Jsoup.connect(path);
        //searchType: MulityTermsSearch
        connection.data("searchType","MulityTermsSearch");
        connection.data("Content",ser);
        connection.data("Order","1");

        try {
            Document document = connection.post();
           String re =  document.getElementsByClass("pTotalCount").get(0).attr("value");
           System.out.println(re);
        } catch (IOException e) {
            e.printStackTrace();
        }


    }
}
