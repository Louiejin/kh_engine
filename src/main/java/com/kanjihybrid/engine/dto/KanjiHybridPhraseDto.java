package com.kanjihybrid.engine.dto;

/**
 * Created by Reana on 12/13/2016.
 */
public class KanjiHybridPhraseDto {

    private Long id;
    private String english;
    private String hybrid;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEnglish() {
        return english;
    }

    public void setEnglish(String english) {
        this.english = english;
    }

    public String getHybrid() {
        return hybrid;
    }

    public void setHybrid(String hybrid) {
        this.hybrid = hybrid;
    }
}
