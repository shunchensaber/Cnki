package com.cnki.njit.crawl.Controller;

import com.cnki.njit.Constant.UrlPath;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(UrlPath.Home)
public class PageController {


    @GetMapping(UrlPath.Show)
    public String showdata()
    {
        return "show";
    }

}
