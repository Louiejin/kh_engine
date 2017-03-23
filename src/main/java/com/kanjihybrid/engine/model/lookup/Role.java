/*
 * Copyright (c) 2014. Medcurial, Inc.
 * All rights reserved.
 */

package com.kanjihybrid.engine.model.lookup;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

/**
 * @author Frank Lloyd Teh
 */
public enum Role {
    ROLE_ADMIN,
    ROLE_USER;

    @JsonCreator
    public static Role forValue(String value) {
        return Role.valueOf(value);
    }

    @JsonValue
    public String toValue() {
        return this.toString();
    }
}
