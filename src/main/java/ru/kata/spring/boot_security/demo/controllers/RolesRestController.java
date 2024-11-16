package ru.kata.spring.boot_security.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.kata.spring.boot_security.demo.models.Role;
import ru.kata.spring.boot_security.demo.services.RoleService;

import java.util.List;

@RestController
@RequestMapping("/api/roles")
public class RolesRestController {
    private final RoleService roleService;

    @Autowired
    public RolesRestController(RoleService roleService) {
        this.roleService = roleService;
    }

    @GetMapping("/")
    public List<Role> getRoles() {
//        System.out.println("getRoles");
        return roleService.getAllRoles();
    }

    @GetMapping("/{id}")
    public List<Role> getRolesByUserId(@PathVariable long id) {
        return roleService.getAllRolesByUserId(id);
    }
}
