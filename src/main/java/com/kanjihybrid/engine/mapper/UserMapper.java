package com.kanjihybrid.engine.mapper;

import com.kanjihybrid.engine.dto.UserDto;
import com.kanjihybrid.engine.model.User;
import com.kanjihybrid.engine.model.lookup.Role;
import org.springframework.stereotype.Component;

import static org.springframework.beans.BeanUtils.copyProperties;

/**
 * @author Frank Lloyd Teh
 */
@Component
public class UserMapper {

    public UserDto map(User user) {
        return map(user, new UserDto());
    }

    public UserDto map(User user, UserDto dto) {
        copyProperties(user, dto, "password");
        dto.setRole(user.getRoles().get(0).name());
        return dto;
    }

    public User map(UserDto dto) {
        return map(dto, new User());
    }

    public User map(UserDto dto, User user) {
        copyProperties(dto, user, "password");
        user.getRoles().clear();
        user.getRoles().add(Role.forValue(dto.getRole()));
        return user;
    }

}

