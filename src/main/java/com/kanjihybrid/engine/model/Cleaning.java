package com.kanjihybrid.engine.model;

import  javax.persistence.*;

import java.lang.*;

@Entity
@Table(indexes = {@Index(name="cleaned_idx", columnList = "cleaned")})
public class Cleaning{
    @Id
    @GeneratedValue
    private String cleaned;
    private String compoundcleaned;

    public void setCleaned(String cleaned){
        this.cleaned = cleaned;
    }

    public String getCleaned(){
        return cleaned;
    }

    public void setCompound_cleaned(String compoundcleaned){
        this.compoundcleaned = compoundcleaned;
    }

    public String getCompound_cleaned(){
        return compoundcleaned;
    }

}