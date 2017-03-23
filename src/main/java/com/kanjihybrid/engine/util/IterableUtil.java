package com.kanjihybrid.engine.util;

import java.util.ArrayList;

/**
 * @author Frank Lloyd Teh
 */
public class IterableUtil {

    public static <E> ArrayList<E> toList(Iterable<E> iter) {
        ArrayList<E> list = new ArrayList<E>();
        for (E item : iter) {
            list.add(item);
        }
        return list;
    }

}
