package ru.kata.spring.boot_security.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.models.User;
import ru.kata.spring.boot_security.demo.services.UserService;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserRestController {
    private final UserService userService;

    @Autowired
    public UserRestController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUser(@PathVariable long id) {
        return ResponseEntity.ok(userService.getUserById(id));
    }

    @PostMapping("/")
    public List<User> createUser(@ModelAttribute("newuser") User user) {
        userService.addUser(user);
        return userService.getAllUsers();
    }

    @PostMapping("/update")
    public List<User>  updateUser(@ModelAttribute("user") User user) {
        userService.updateUser(user);
        return userService.getAllUsers();
    }

    @DeleteMapping("/{id}")
    public List<User>  deleteUser(@PathVariable long id) {
        userService.removeUserById(id);
        return userService.getAllUsers();
    }
}
