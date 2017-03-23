package com.kanjihybrid.engine.repository;

import com.kanjihybrid.engine.model.Cleaning;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QueryDslPredicateExecutor;
import org.springframework.stereotype.Repository;
import org.springframework.cache.annotation.Cacheable;

import java.util.List;

/**
 * Created by Louie Gen on 2/14/17
 */
@Repository
public interface CleaningRepo extends JpaRepository<Cleaning, Long>, QueryDslPredicateExecutor<Cleaning>{

    @Cacheable(cacheNames = "cleaning")
    List<Cleaning> findByCleanedIgnoreCaseStartsWith(String word);


}