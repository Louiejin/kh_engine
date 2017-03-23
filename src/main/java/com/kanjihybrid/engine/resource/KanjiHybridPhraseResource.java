package com.kanjihybrid.engine.resource;

import com.kanjihybrid.engine.dto.KanjiHybridPhraseDto;
import com.kanjihybrid.engine.dto.PageDto;
import com.kanjihybrid.engine.mapper.KanjiHybridPhraseMapper;
import com.kanjihybrid.engine.model.KanjiHybrid;
import com.kanjihybrid.engine.model.KanjiHybridPhrase;
import com.kanjihybrid.engine.model.QKanjiHybridPhrase;
import com.kanjihybrid.engine.repository.KanjiHybridPhraseRepo;
import com.mysema.query.BooleanBuilder;
import com.mysema.query.types.Predicate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.transaction.Transactional;

import static java.util.stream.Collectors.toList;
import static org.apache.commons.lang3.StringUtils.isNotEmpty;
import static org.springframework.http.HttpStatus.OK;
import static org.springframework.web.bind.annotation.RequestMethod.DELETE;
import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

/**
 * Created by Reana on 12/13/2016.
 */
@RestController
@RequestMapping("/kanji_hybrid_phrase")
@PreAuthorize("hasRole('ROLE_ADMIN')")
public class KanjiHybridPhraseResource {

    @Resource(name = "kanjiHybridPhraseRepo")
    private KanjiHybridPhraseRepo kanjiHybridPhraseRepo;

    @Resource(name = "kanjiHybridPhraseMapper")
    private KanjiHybridPhraseMapper kanjiHybridPhraseMapper;

    @Autowired
    private CacheManager cacheManager;

    @RequestMapping(method = GET)
    public PageDto<KanjiHybridPhraseDto> query(@RequestParam MultiValueMap<String, String> params, Pageable pageable) {
        Page<KanjiHybridPhrase> page = kanjiHybridPhraseRepo.findAll(constructFilter(params), pageable);
        return PageDto.create(page, page.getContent().stream().map(kanjiHybridPhraseMapper::map).collect(toList()));
    }

    @RequestMapping(value = "/{id}", method = GET)
    @Transactional
    public KanjiHybridPhraseDto get(@PathVariable Long id) {
        return kanjiHybridPhraseMapper.map(kanjiHybridPhraseRepo.findOne(id));
    }


    @RequestMapping(method = POST)
    @Transactional
    public KanjiHybridPhraseDto save(@RequestBody KanjiHybridPhraseDto dto) {
        KanjiHybridPhrase kanjiHybridPhrase = dto.getId() != null ? kanjiHybridPhraseRepo.findOne(dto.getId()) : new KanjiHybridPhrase();
        kanjiHybridPhraseMapper.map(dto, kanjiHybridPhrase);
        KanjiHybridPhrase save = save(kanjiHybridPhrase);
        kanjiHybridPhraseMapper.map(save, dto);
        return dto;
    }

    @RequestMapping(value = "/{id}", method = DELETE)
    @Transactional
    public ResponseEntity remove(@PathVariable Long id) {
        kanjiHybridPhraseRepo.delete(id);
        return new ResponseEntity(OK);
    }

    public KanjiHybridPhrase save(KanjiHybridPhrase phrase) {
        KanjiHybridPhrase hybridPhrase = kanjiHybridPhraseRepo.save(phrase);
        String[] words = phrase.getEnglish().trim().split("((?<=\\W)|(?=\\W))");
        cacheManager.getCache("kanjiPhrase").evict(words[0]);
        return hybridPhrase;
    }

    private Predicate constructFilter(MultiValueMap<String, String> params) {

        BooleanBuilder where = new BooleanBuilder();

        if (isNotEmpty(params.getFirst("query"))) {
            String query = params.getFirst("query");
            where.and(QKanjiHybridPhrase.kanjiHybridPhrase.english.eq(query));
        }

        return where.getValue();
    }
}

