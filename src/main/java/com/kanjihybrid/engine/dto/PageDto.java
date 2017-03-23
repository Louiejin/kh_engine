package com.kanjihybrid.engine.dto;

import org.springframework.data.domain.Page;

import java.util.List;

public class PageDto<T> {

    private boolean hasNext;

    private long total;

    private List<T> content;

    private int page;

    private int size;

    public long getPage() {
        return page;
    }

    /**
     * ?
     *
     * @param page ?
     * @return ?
     */
    public PageDto<T> setPage(int page) {
        this.page = page;
        return this;
    }

    public int getSize() {
        return size;
    }

    /**
     * ?
     *
     * @param size ?
     * @return ?
     */
    public PageDto<T> setSize(int size) {
        this.size = size;
        return this;
    }


    public boolean isHasNext() {
        return hasNext;
    }

    /**
     * ?
     *
     * @param hasNext ?
     * @return ?
     */
    public PageDto<T> setHasNext(boolean hasNext) {
        this.hasNext = hasNext;
        return this;
    }

    public long getTotal() {
        return total;
    }

    /**
     * ?
     *
     * @param total ?
     * @return ?
     */
    public PageDto<T> setTotal(long total) {
        this.total = total;
        return this;
    }

    public List<T> getContent() {
        return content;
    }

    /**
     * ?
     *
     * @param content ?
     * @return ?
     */
    public PageDto<T> setContent(List<T> content) {
        this.content = content;
        return this;
    }

    /**
     * Creates a PageInfo object.
     *
     * @param paged The Page source
     * @param list  The result list
     * @param <Y>   ?
     * @param <Z>   ?
     * @return ?
     */
    public static <Y, Z> PageDto<Z> create(Page<Y> paged, List<Z> list) {
        return new PageDto<Z>().setContent(list)
                .setPage(paged.getNumber())
                .setTotal(paged.getTotalElements())
                .setHasNext(paged.hasNext())
                .setSize(paged.getSize());

    }
}
