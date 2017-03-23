package com.kanjihybrid.engine.resource;

import com.kanjihybrid.engine.dto.UserDto;
import com.kanjihybrid.engine.mapper.UserMapper;
import com.kanjihybrid.engine.model.User;
import com.kanjihybrid.engine.repository.UserRepo;
import org.apache.commons.lang3.StringUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

import static com.kanjihybrid.engine.util.UserUtil.getCurrentUser;
import static org.springframework.http.HttpStatus.OK;
import static org.springframework.web.bind.annotation.RequestMethod.*;

/**
 * @author Frank Lloyd Teh
 */
@RestController
@RequestMapping("/user")
@PreAuthorize("hasRole('ROLE_ADMIN')")
public class UserResource {

    @Resource(name = "userRepo")
    private UserRepo userRepo;

    @Resource(name = "userMapper")
    private UserMapper userMapper;

    @RequestMapping(method = GET)
    public List<UserDto> query() {
        return userRepo.findAll().stream().map(userMapper::map).collect(Collectors.toList());
    }

    @RequestMapping(value = "/{id}", method = GET)
    @Transactional
    public UserDto get(@PathVariable Long id) {
        return userMapper.map(userRepo.findOne(id));
    }

    @RequestMapping(value = "/current", method = GET)
    @Transactional
    public UserDto get() {
        return userMapper.map(userRepo.findOne(getCurrentUser().getId()));
    }

    @RequestMapping(method = POST)
    @Transactional
    public UserDto save(@RequestBody UserDto dto) {
        User user = dto.getId() != null ? userRepo.findOne(dto.getId()) : new User();
        userMapper.map(dto, user);
        if (StringUtils.isNotEmpty(dto.getPassword())) {
            user.setPassword(new BCryptPasswordEncoder().encode(dto.getPassword()));
        }
        User save = userRepo.save(user);
        userMapper.map(save, dto);
        return dto;
    }

    @RequestMapping(value = "/{id}", method = DELETE)
    @Transactional
    public ResponseEntity remove(@PathVariable Long id) {
        userRepo.delete(id);
        return new ResponseEntity(OK);
    }

}
