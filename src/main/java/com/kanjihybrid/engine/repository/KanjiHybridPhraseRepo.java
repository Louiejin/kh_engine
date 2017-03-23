package com.kanjihybrid.engine.repository;

import com.kanjihybrid.engine.model.KanjiHybrid;
import com.kanjihybrid.engine.model.KanjiHybridPhrase;
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
public interface KanjiHybridPhraseRepo extends JpaRepository<KanjiHybridPhrase, Long>, QueryDslPredicateExecutor<KanjiHybridPhrase> {

    @Cacheable(cacheNames = "kanjiPhrase")
    List<KanjiHybridPhrase> findByEnglishIgnoreCaseStartsWith(String word);

}
