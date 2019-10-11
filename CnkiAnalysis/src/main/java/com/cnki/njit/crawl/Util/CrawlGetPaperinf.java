package com.cnki.njit.crawl.Util;

import com.cnki.njit.crawl.Entity.Paper;
import com.cnki.njit.crawl.Entity.PaperImp1;
import org.jsoup.Connection;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

public class CrawlGetPaperinf {
    private String url = "http://yuanjian.cnki.net/Search/ListResult";
    private String content;
    private int page = 0;
    private int maxpage = Integer.MAX_VALUE;
    public int nums = -1;


    public CrawlGetPaperinf() {

    }

    public CrawlGetPaperinf(String content) {
        this();
        this.content = content;
        this.nums = this.getFundnums();

    }

    public CrawlGetPaperinf(String url, String content) {
        this(content);
        this.url = url;

    }


    public CrawlGetPaperinf(String url, String content, int page) {
        this(url,content);

        this.page = page;
    }


    public List<Paper> getByPage() {
        if (page*20< nums) {

            return this.toPaper();
        }
        return null;
    }

    /**
     * 获取下一页
     *
     * @return
     */
    public List<Paper> getNextPage() {
        System.out.println(this.getPage());
        this.page++;
        return getByPage();
    }


    public List<Paper> toPaper() {
        Document document = this.getinf();
        Elements elements = document.getElementsByClass("list-item");

        return this.toPaper(elements);
    }


    public Document getinf() {
        Connection connection = Jsoup.connect(url);
        connection.data("Content", content);
        connection.data("Page", page + "");

        Document document = null;
        try {
            document = connection.post();

        } catch (IOException e) {

            this.maxpage = page;
            e.printStackTrace();
        }
//        System.out.println(document.text());
        return document;
    }

    /**
     * 所有搜索出来的数目
     *
     * @return
     */
    public int getFundnums() {
        String path = "http://yuanjian.cnki.net/Search/Result";

        Connection connection = Jsoup.connect(path);
        //searchType: MulityTermsSearch
        connection.data("searchType", "MulityTermsSearch");
        connection.data("Content", this.content);
        connection.data("Order", "1");
        int re;

        try {
            Document document = connection.post();
            re = Integer.parseInt(document.getElementsByClass("pTotalCount").get(0).attr("value"));
            this.nums = re;
            return re;
        } catch (IOException e) {
            e.printStackTrace();
        }

        return -1;


    }


    public List<Paper> toPaper(Elements elements) {
        ArrayList<Paper> list = new ArrayList<>();
        for (Element element : elements) {
            try {
                list.add(toPaper(element));

            } catch (NullPointerException e) {
                System.out.println("出错一次");
            }
        }
        return list;
    }

    /**
     * 将文章信息抽象对象存储
     *
     * @param element
     * @return
     */
    public Paper toPaper(Element element) {
        String papertitle = element.select("a").first().text();
        String about = element.getElementsByClass("nr").text();
        String key = element.getElementsByClass("info").get(0).select("p").get(0).text().replace("关键词：", "");
        String yinyongxiazai = element.getElementsByClass("info").get(0).select("p").get(1).text();
        String author = element.getElementsByClass("source").text();
        String moreinf = element.select("a").first().attr("href");
        String authormore = element.getElementsByClass("source").get(0).select("p").get(0).select("a").first().attr("href");


        PaperImp1 paper = new PaperImp1();
        paper.setAbout(about);
        paper.setAuthorinformation(author);
        paper.setKey(key);
        paper.setPapertitle(papertitle);
        int dar[] = getDownRef(yinyongxiazai);
        paper.setDownload(dar[0]);
        paper.setRef(dar[1]);
        paper.setAuthorinf(authormore);
        paper.setMoreinfurl(moreinf);

        return paper;

    }

    /**
     * 对字符串进行分割操作，获取下载数和引用数
     */
    public int[] getDownRef(String dar) {
        String temp[] = dar.split("被");
        int re[] = new int[2];
        String tmepre = "";
        for (int i = 0; i < 2; i++) {
            for (int j = 0; j < temp[i].length(); j++) {
                char t = temp[i].charAt(j);

                if (t >= '0' && t <= '9') {
                    tmepre = tmepre + t;
                }
            }
            re[i] = Integer.parseInt(tmepre);
            tmepre = "";
        }
        return re;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public int getPage() {
        return page;
    }

    public void setPage(int page) {
        this.page = page;
    }


    public static void main(String[] args) {
        CrawlGetPaperinf crawlGetPaperinf = new CrawlGetPaperinf("南京工程学院");
        crawlGetPaperinf.getByPage();
    }


}
