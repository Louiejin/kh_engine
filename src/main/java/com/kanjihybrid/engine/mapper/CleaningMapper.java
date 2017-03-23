package com.kanjihybrid.engine.mapper;

import com.kanjihybrid.engine.dto.CleaningDto;
import com.kanjihybrid.engine.model.Cleaning;
import org.springframework.stereotype.Component;

@Component
public class CleaningMapper{

    //map cleaningDto to cleaning
    public CleaningDto map(Cleaning cleaning, CleaningDto cleaningDto){
        cleaningDto.setCleaned(cleaning.getCleaned());
        cleaningDto.setCompoundCleaned(cleaning.getCompound_cleaned());
        return cleaningDto;
    }

    public CleaningDto map(Cleaning cleaning){
        return map(cleaning, new CleaningDto());
    }

    //map Cleaning to CleanigDto
    public Cleaning map(CleaningDto cleaningDto, Cleaning cleaning){
        cleaning.setCleaned(cleaningDto.getCleaned());
        cleaning.setCompound_cleaned(cleaningDto.getCompoundCleaned());
        return cleaning;
    }

    public Cleaning map(CleaningDto cleaningDto){
        return map(cleaningDto, new Cleaning());
    }

}