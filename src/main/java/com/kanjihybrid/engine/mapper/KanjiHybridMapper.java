package com.kanjihybrid.engine.mapper;

import com.kanjihybrid.engine.dto.KanjiHybridDto;
import com.kanjihybrid.engine.model.KanjiHybrid;
import org.springframework.stereotype.Component;

/**
 * Created by Reana
 */

@Component
public class KanjiHybridMapper {

    public KanjiHybridDto map(KanjiHybrid kanjiHybrid, KanjiHybridDto kanjiHybridDto) {
        kanjiHybridDto.setId(kanjiHybrid.getId());
        kanjiHybridDto.setRefId(kanjiHybrid.getRefId());
        kanjiHybridDto.setKanji1(kanjiHybrid.getKanji1());
        kanjiHybridDto.setCoreMeanings(kanjiHybrid.getCoreMeanings());
        kanjiHybridDto.setUnicodeId(kanjiHybrid.getUnicodeId());
        kanjiHybridDto.setEnglish(kanjiHybrid.getEnglish());
        kanjiHybridDto.setRadical(kanjiHybrid.getRadical());
        kanjiHybridDto.setKunyomi(kanjiHybrid.getKunyomi());
        kanjiHybridDto.setBias(kanjiHybrid.getBias());
        kanjiHybridDto.setSetting(kanjiHybrid.getSetting());
        kanjiHybridDto.setChinese(kanjiHybrid.getChinese());
        kanjiHybridDto.setJLPT(kanjiHybrid.getJLPT());
        kanjiHybridDto.setOnyomi(kanjiHybrid.getOnyomi());
        kanjiHybridDto.setGrammar(kanjiHybrid.getGrammar());
        kanjiHybridDto.setHybrid(kanjiHybrid.getHybrid());
        return kanjiHybridDto;
    }

    public KanjiHybridDto map(KanjiHybrid kanjiHybrid) {
        return map(kanjiHybrid, new KanjiHybridDto());
    }

    public KanjiHybrid map(KanjiHybridDto kanjiHybridDto, KanjiHybrid kanjiHybrid) {
        kanjiHybrid.setId(kanjiHybridDto.getId());
        kanjiHybrid.setRefId(kanjiHybridDto.getRefId());
        kanjiHybrid.setKanji1(kanjiHybridDto.getKanji1());
        kanjiHybrid.setCoreMeanings(kanjiHybridDto.getCoreMeanings());
        kanjiHybrid.setUnicodeId(kanjiHybridDto.getUnicodeId());
        kanjiHybrid.setEnglish(kanjiHybridDto.getEnglish());
        kanjiHybrid.setRadical(kanjiHybridDto.getRadical());
        kanjiHybrid.setKunyomi(kanjiHybridDto.getKunyomi());
        kanjiHybrid.setBias(kanjiHybridDto.getBias());
        kanjiHybrid.setSetting(kanjiHybridDto.getSetting());
        kanjiHybrid.setChinese(kanjiHybridDto.getChinese());
        kanjiHybrid.setJLPT(kanjiHybridDto.getJLPT());
        kanjiHybrid.setOnyomi(kanjiHybridDto.getOnyomi());
        kanjiHybrid.setGrammar(kanjiHybridDto.getGrammar());
        kanjiHybrid.setHybrid(kanjiHybridDto.getHybrid());
        return kanjiHybrid;
    }

    public KanjiHybrid map(KanjiHybridDto kanjiHybridDto) {
        return map(kanjiHybridDto, new KanjiHybrid());
    }
}