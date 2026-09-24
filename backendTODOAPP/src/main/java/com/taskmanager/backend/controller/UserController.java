package com.taskmanager.backend.controller;

import com.taskmanager.backend.entity.User;
import com.taskmanager.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5173")  
@RestController
@RequestMapping("/api/users")
public class UserController {
    
    @Autowired
    private UserRepository userRepository;
    
    @PostMapping("/register")
    public User register(@RequestBody UserRequest request) {
        // Vérifier si l'email existe déjà
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }
        
        User user = new User(request.getEmail(), request.getPassword());
        return userRepository.save(user);
    }
    
    @PostMapping("/login")
    public User login(@RequestBody UserRequest request) {
        Optional<User> user = userRepository.findByEmail(request.getEmail());
        if (user.isPresent() && user.get().getPassword().equals(request.getPassword())) {
            return user.get();
        }
        throw new RuntimeException("Invalid credentials");
    }
    
    @GetMapping("/{id}")
    public User getProfile(@PathVariable Long id) {
        return userRepository.findById(id).orElse(null);
    }
}



//  Reçoit les données DU frontend
class UserRequest {
    private String email;
    private String password;
    
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}