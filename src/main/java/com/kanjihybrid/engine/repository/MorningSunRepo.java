package com.kanjihybrid.engine.repository;

import com.kanjihybrid.engine.model.MorningSun;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QueryDslPredicateExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by Louie Gen on 2/14/17.
 */

@Repository
public interface MorningSunRepo extends JpaRepository<MorningSun, Long>, QueryDslPredicateExecutor<MorningSun>{

    @Cacheable(cacheNames = "morningSun")
    List<MorningSun> findByMorningsunIgnoreCase(String Word);

}