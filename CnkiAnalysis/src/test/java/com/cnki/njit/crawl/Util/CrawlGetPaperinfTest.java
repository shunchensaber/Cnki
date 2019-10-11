package com.cnki.njit.crawl.Util;


import com.cnki.njit.crawl.Entity.Paper;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.*;

@RunWith(SpringRunner.class)
@SpringBootTest
public class CrawlGetPaperinfTest {

    @Test
    public void crawl()
    {
        CrawlGetPaperinf crawlGetPaperinf = new CrawlGetPaperinf("南京工程学院" );
        crawlGetPaperinf.getFundnums();
        List<Paper> list = crawlGetPaperinf.getByPage();
       // System.out.println(crawlGetPaperinf.getByPage());
        while (list!=null)
        {
            for(Paper re:list)
            {
                System.out.println(re);
            }

                list = crawlGetPaperinf.getNextPage();

        }

    }

    @Test
    public void Test()
    {
        System.out.println("test");
    }


}
