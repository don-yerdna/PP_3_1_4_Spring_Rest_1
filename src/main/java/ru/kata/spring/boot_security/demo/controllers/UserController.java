package ru.kata.spring.boot_security.demo.controllers;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Set;
import java.util.stream.Collectors;


@Controller
@RequestMapping("/user")
public class UserController {

    @GetMapping
    public String getUser(Model model) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        model.addAttribute("user", authentication.getPrincipal());
        Set<String> roleSet = authentication.getAuthorities().stream().map(x -> x.getAuthority().replace("ROLE_", "")).collect(Collectors.toSet());
        model.addAttribute("roles", roleSet);
        model.addAttribute("isAdmin", roleSet.contains("ADMIN"));
        return "user";
    }

}
