package com.kanjihybrid.engine.dto;

/**
 * @author Frank Lloyd Teh
 */
public class GenericDto<T> {

    private T data;

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }
}
