package com.kanjihybrid.engine.mapper;

import com.kanjihybrid.engine.dto.MorningSunDto;
import com.kanjihybrid.engine.model.MorningSun;

import org.springframework.stereotype.Component;

@Component
public class MorningSunMapper{

    public MorningSunDto map(MorningSun morningSun, MorningSunDto morningSunDto){
        morningSunDto.setCleanedSun(morningSun.getCleaning_sun());
        morningSunDto.setMorningSun(morningSun.getMorning_sun());
        return morningSunDto;
    }

    public MorningSunDto map(MorningSun morningSun){
        return map(morningSun, new MorningSunDto());
    }

    public MorningSun map(MorningSunDto morningSunDto, MorningSun morningSun){
        morningSun.setCleaning_sun(morningSunDto.getCleanedSun());
        morningSun.setMorning_sun(morningSunDto.getMorningSun());
        return morningSun;
    }

    public MorningSun map(MorningSunDto morningSunDto){
        return map(morningSunDto, new MorningSun());
    }


}