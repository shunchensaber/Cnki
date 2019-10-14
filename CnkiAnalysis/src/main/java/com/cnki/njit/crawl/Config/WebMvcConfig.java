package com.cnki.njit.crawl.Config;



import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ViewResolverRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

/**
 * Created by jack on 2017/3/28.
 *
 * @author jack
 * @date 2017/03/28
 */
@Configuration
public class WebMvcConfig extends WebMvcConfigurerAdapter {

    @Override
    public void configureViewResolvers(ViewResolverRegistry registry) {
        //spring.view.prefix=/WEB-INF/jsp/
        //spring.view.suffix=.jsp
        registry.jsp("/templates",".html");
        //registry.freeMarker();
        //registry.velocity();
        //registry.groovy();
    }

}
