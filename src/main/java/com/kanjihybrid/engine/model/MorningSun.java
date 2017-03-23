package com.kanjihybrid.engine.model;

import org.omg.CosNaming.NamingContextExtPackage.StringNameHelper;

import  javax.persistence.*;

/**
 * Created by Louie Gen.
 */
@Entity
@Table(indexes = {@Index(name = "morning_sun_idx", columnList = "morningsun")})
public class MorningSun {

    @Id
    @GeneratedValue
    private String morningsun;
    private String cleanedsun;


    public void setMorning_sun(String morningsun){
        this.morningsun = morningsun;
    }

    public String getMorning_sun(){ return morningsun;}

    public void setCleaning_sun(String cleaningsun){this.cleanedsun = cleaningsun;}

    public String getCleaning_sun(){ return cleanedsun; }

}
