package com.taskmanager.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;
import com.taskmanager.backend.entity.User;
import com.taskmanager.backend.repository.UserRepository;

@RestController
@RequestMapping("/api/test")
public class TestController {
	
	@Autowired
	private UserRepository userRepository;
	
	@GetMapping("/hello")
	
	public String hello() {
		return "Hello! Spring boot et mysql fonctionne!";
		
	}
	
	
	@PostMapping("/user")
	
	public User createUser(@RequestBody User user) {
		return userRepository.save(user);
	}
	
	
	@GetMapping("/users")
	
	public List<User> getAllUsers(){
		return userRepository.findAll();
	}

}
