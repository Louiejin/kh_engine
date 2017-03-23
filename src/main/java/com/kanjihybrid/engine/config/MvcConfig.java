package com.kanjihybrid.engine.config;

import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@Configuration
@EnableCaching
public class MvcConfig extends WebMvcConfigurerAdapter {

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/").setViewName("forward:/build/index.html");
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/img*").addResourceLocations("classpath:/static/build/img/");
        registry.addResourceHandler("/css*").addResourceLocations("classpath:/static/build/css/");
        registry.addResourceHandler("/js*").addResourceLocations("classpath:/static/build/js/");
        registry.addResourceHandler("/view*").addResourceLocations("classpath:/static/build/view/");
        registry.addResourceHandler("/fonts*").addResourceLocations("classpath:/static/build/fonts/");
    }

}
