package com.kanjihybrid.engine.util;

import com.kanjihybrid.engine.model.User;
import com.kanjihybrid.engine.model.lookup.Role;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

public final class UserUtil {

    public static String getCurrentUsername() {
        User user = getCurrentUser();
        return user != null ? user.getUsername() : null;
    }

    public static Boolean currentUserHasRole(Role role) {
        return getCurrentUser().getRoles().contains(role);
    }

    public static Boolean currentUserHasAnyRole(Role... roles) {
        for (Role role : roles) {
            if (currentUserHasRole(role))
                return true;
        }
        return false;
    }


    public static User getCurrentUser() {
        SecurityContext ctx = SecurityContextHolder.getContext();
        User user = null;
        if (ctx != null && ctx.getAuthentication() != null) {
            if (ctx.getAuthentication().getPrincipal() instanceof User) {
                user = (User) ctx.getAuthentication().getPrincipal();
            }
        }
        return user;
    }

}