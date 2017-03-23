package com.kanjihybrid.engine;

import com.kanjihybrid.engine.model.User;
import com.kanjihybrid.engine.model.lookup.Role;
import com.kanjihybrid.engine.repository.UserRepo;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
@ComponentScan({
        "com.kanjihybrid.engine.config",
        "com.kanjihybrid.engine.mapper",
        "com.kanjihybrid.engine.repository",
        "com.kanjihybrid.engine.service",
        "com.kanjihybrid.engine.resource"
})
public class Application {

    public static void main(String[] args) throws Throwable {
        SpringApplication.run(Application.class, args);
    }

    @Bean
    public CommandLineRunner init(UserRepo userRepo) {
        return (args) -> {
            createAdmin(userRepo);
        };
    }

    private void createAdmin(UserRepo userRepo) {
        if (!userRepo.findByUsername("admin").isPresent()) {
            User administrator = new User();
            administrator.setUsername("admin");
            administrator.setFirstName("Admin");
            administrator.setLastName("Admin");

            administrator.getRoles().add(Role.ROLE_ADMIN);
            administrator.setPassword(new BCryptPasswordEncoder().encode("123qwe"));
            userRepo.save(administrator);
        }
    }

}
