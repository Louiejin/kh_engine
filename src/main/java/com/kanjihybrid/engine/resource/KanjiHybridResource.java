package com.kanjihybrid.engine.resource;

import com.kanjihybrid.engine.dto.KanjiHybridDto;
import com.kanjihybrid.engine.dto.PageDto;
import com.kanjihybrid.engine.mapper.KanjiHybridMapper;
import com.kanjihybrid.engine.model.KanjiHybrid;
import com.kanjihybrid.engine.model.QKanjiHybrid;
import com.kanjihybrid.engine.repository.KanjiHybridRepo;
import com.mysema.query.BooleanBuilder;
import com.mysema.query.types.Predicate;
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
 * Created by Reana on 12/5/2016.
 */

@RestController
@RequestMapping("/kanji_hybrid")
@PreAuthorize("hasRole('ROLE_ADMIN')")
public class KanjiHybridResource {

    @Resource(name = "kanjiHybridRepo")
    private KanjiHybridRepo kanjiHybridRepo;

    @Resource(name = "kanjiHybridMapper")
    private KanjiHybridMapper kanjiHybridMapper;

    @RequestMapping(method = GET)
    public PageDto<KanjiHybridDto> query(@RequestParam MultiValueMap<String, String> params, Pageable pageable) {
        Page<KanjiHybrid> page = kanjiHybridRepo.findAll(constructFilter(params), pageable);
        return PageDto.create(page, page.getContent().stream().map(kanjiHybridMapper::map).collect(toList()));
    }

    @RequestMapping(value = "/{id}", method = GET)
    @Transactional
    public KanjiHybridDto get(@PathVariable Long id) {
        return kanjiHybridMapper.map(kanjiHybridRepo.findOne(id));
    }


    @RequestMapping(method = POST)
    @Transactional
    public KanjiHybridDto save(@RequestBody KanjiHybridDto dto) {
        KanjiHybrid kanjiHybrid = dto.getId() != null ? kanjiHybridRepo.findOne(dto.getId()) : new KanjiHybrid();
        kanjiHybridMapper.map(dto, kanjiHybrid);
        kanjiHybrid.setHybrid(dto.getKanji1() + dto.getEnglish().substring(1));
        KanjiHybrid save = kanjiHybridRepo.save(kanjiHybrid);
        kanjiHybridMapper.map(save, dto);
        return dto;
    }

    @RequestMapping(value = "/{id}", method = DELETE)
    @Transactional
    public ResponseEntity remove(@PathVariable Long id) {
        kanjiHybridRepo.delete(id);
        return new ResponseEntity(OK);
    }

    private Predicate constructFilter(MultiValueMap<String, String> params) {

        BooleanBuilder where = new BooleanBuilder();

        if (isNotEmpty(params.getFirst("query"))) {
            String query = params.getFirst("query");
            where.and(QKanjiHybrid.kanjiHybrid.english.eq(query));
        }

        return where.getValue();
    }
}
