package ru.kata.spring.boot_security.demo.services;


import ru.kata.spring.boot_security.demo.models.User;

import java.util.List;

public interface UserService {
    List<User> getAllUsers();

    void updateUser(User user);

    void addUser(User user);

    User getUserById(Long id);

    void removeUserById(Long id);
}
