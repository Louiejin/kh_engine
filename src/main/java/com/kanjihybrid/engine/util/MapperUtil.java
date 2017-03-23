package com.kanjihybrid.engine.util;

import java.util.stream.Stream;

/**
 * @author Frank Lloyd Teh
 */
public class MapperUtil {

    public static boolean notExcluded(String[] excludes, String exclude) {
        return Stream.of(excludes).noneMatch(e -> e.equals(exclude));
    }


}
