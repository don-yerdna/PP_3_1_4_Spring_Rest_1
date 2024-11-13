package ru.kata.spring.boot_security.demo.init;

import org.springframework.stereotype.Component;
import ru.kata.spring.boot_security.demo.models.Role;
import ru.kata.spring.boot_security.demo.models.User;
import ru.kata.spring.boot_security.demo.services.RoleService;
import ru.kata.spring.boot_security.demo.services.UserService;

import javax.annotation.PostConstruct;
import java.util.Set;

@Component
public class InitApp {
    private final RoleService roleService;
    private final UserService userService;

    public InitApp(RoleService roleService, UserService userService) {
        this.roleService = roleService;
        this.userService = userService;
    }

    @PostConstruct
    public void init() {
        Role roleAdmin = new Role();
        roleAdmin.setRole("ROLE_ADMIN");
        Role roleUser = new Role();
        roleUser.setRole("ROLE_USER");

        User admin = new User();
        admin.setUsername("admin");
        admin.setPassword("admin");
        admin.setFirstname("admin");
        admin.setLastname("admin");
        admin.setEmail("admin@admin.com");
        admin.setAge(22);
        admin.setRoles(Set.of(roleAdmin));
        userService.addUser(admin);
        User user = new User();
        user.setUsername("user");
        user.setPassword("password");
        user.setFirstname("user");
        user.setLastname("user");
        user.setEmail("user@user.com");
        user.setAge(22);
        user.setRoles(Set.of(roleUser));
        userService.addUser(user);
    }

}
