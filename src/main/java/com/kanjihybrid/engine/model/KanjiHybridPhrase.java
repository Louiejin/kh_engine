package com.kanjihybrid.engine.model;

import javax.persistence.*;

/**
 * @author Frank Lloyd Teh
 */
@Entity
@Table(indexes = {@Index(name = "english_starts_with_idx", columnList = "english")})
public class KanjiHybridPhrase {

    @Id
    @GeneratedValue
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
