package com.kanjihybrid.engine.model;

import javax.persistence.*;

/**
 * @author Frank Lloyd Teh
 */
@Entity
@Table(indexes = {@Index(name = "english_idx", columnList = "english")})
public class KanjiHybrid {

    @Id
    @GeneratedValue
    private Long id;
    private String refId;
    private String kanji1;
    private String coreMeanings;
    private String unicodeId;
    private String english;
    private String radical;
    private String kunyomi;
    private String bias;
    private String setting;
    private String chinese;
    private String JLPT;
    private String onyomi;
    private String grammar;
    private String hybrid;

    public String getHybrid() {
        return hybrid;
    }

    public void setHybrid(String hybrid) {
        this.hybrid = hybrid;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRefId() {
        return refId;
    }

    public void setRefId(String refId) {
        this.refId = refId;
    }

    public String getKanji1() {
        return kanji1;
    }

    public void setKanji1(String kanji1) {
        this.kanji1 = kanji1;
    }

    public String getCoreMeanings() {
        return coreMeanings;
    }

    public void setCoreMeanings(String coreMeanings) {
        this.coreMeanings = coreMeanings;
    }

    public String getUnicodeId() {
        return unicodeId;
    }

    public void setUnicodeId(String unicodeId) {
        this.unicodeId = unicodeId;
    }

    public String getEnglish() {
        return english;
    }

    public void setEnglish(String english) {
        this.english = english;
    }

    public String getRadical() {
        return radical;
    }

    public void setRadical(String radical) {
        this.radical = radical;
    }

    public String getKunyomi() {
        return kunyomi;
    }

    public void setKunyomi(String kunyomi) {
        this.kunyomi = kunyomi;
    }

    public String getBias() {
        return bias;
    }

    public void setBias(String bias) {
        this.bias = bias;
    }

    public String getSetting() {
        return setting;
    }

    public void setSetting(String setting) {
        this.setting = setting;
    }

    public String getChinese() {
        return chinese;
    }

    public void setChinese(String chinese) {
        this.chinese = chinese;
    }

    public String getJLPT() {
        return JLPT;
    }

    public void setJLPT(String JLPT) {
        this.JLPT = JLPT;
    }

    public String getOnyomi() {
        return onyomi;
    }

    public void setOnyomi(String onyomi) {
        this.onyomi = onyomi;
    }

    public String getGrammar() {
        return grammar;
    }

    public void setGrammar(String grammar) {
        this.grammar = grammar;
    }
}
