package com.kanjihybrid.engine.dto;

public class CleaningDto{

	private String cleaned;
	private String compoundcleaned;

	public String getCleaned(){
		return cleaned;
	}

	public void setCleaned(String cleaned){
		this.cleaned = cleaned;
	}

	public String getCompoundCleaned(){
		return compoundcleaned;
	}

	public void setCompoundCleaned(String compound_cleaned){
		this.compoundcleaned = compound_cleaned;
	}


}