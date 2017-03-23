package com.kanjihybrid.engine.repository;

import com.kanjihybrid.engine.model.KanjiHybrid;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QueryDslPredicateExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author Frank Lloyd Teh
 */
@Repository
public interface KanjiHybridRepo extends JpaRepository<KanjiHybrid, Long>, QueryDslPredicateExecutor<KanjiHybrid> {

    @Cacheable(cacheNames = "kanji")
    List<KanjiHybrid> findByEnglishIgnoreCaseOrderByBias(String english);

    @Override
    @CacheEvict(cacheNames = "kanji", key = "#a0.english")
    KanjiHybrid save(KanjiHybrid hybrid);

}
