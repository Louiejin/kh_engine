package com.kanjihybrid.engine.mapper;

import com.kanjihybrid.engine.dto.KanjiHybridPhraseDto;
import com.kanjihybrid.engine.model.KanjiHybridPhrase;
import org.springframework.stereotype.Component;

/**
 * Created by Reana on 12/13/2016.
 */
@Component
public class KanjiHybridPhraseMapper {

    public KanjiHybridPhraseDto map(KanjiHybridPhrase kanjiHybridPhrase, KanjiHybridPhraseDto kanjiHybridPhraseDto) {
        kanjiHybridPhraseDto.setId(kanjiHybridPhrase.getId());
        kanjiHybridPhraseDto.setEnglish(kanjiHybridPhrase.getEnglish());
        kanjiHybridPhraseDto.setHybrid(kanjiHybridPhrase.getHybrid());
        return kanjiHybridPhraseDto;
    }

    public KanjiHybridPhraseDto map(KanjiHybridPhrase kanjiHybridPhrase) {
        return map(kanjiHybridPhrase, new KanjiHybridPhraseDto());
    }

    public KanjiHybridPhrase map(KanjiHybridPhraseDto kanjiHybridPhraseDto, KanjiHybridPhrase kanjiHybridPhrase) {
        kanjiHybridPhrase.setId(kanjiHybridPhraseDto.getId());
        kanjiHybridPhrase.setEnglish(kanjiHybridPhraseDto.getEnglish());
        kanjiHybridPhrase.setHybrid(kanjiHybridPhraseDto.getHybrid());
        return kanjiHybridPhrase;
    }

    public KanjiHybridPhrase map(KanjiHybridPhraseDto kanjiHybridPhraseDto) {
        return map(kanjiHybridPhraseDto, new KanjiHybridPhrase());
    }
}
