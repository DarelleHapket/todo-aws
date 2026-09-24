package com.taskmanager.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.*;

import com.taskmanager.backend.entity.Task;
import com.taskmanager.backend.entity.User;
import com.taskmanager.backend.repository.TaskRepository;
import com.taskmanager.backend.repository.UserRepository;

@CrossOrigin(origins = "http://localhost:5173")  // pour la communication react fera des fetch() vers notre app Spring boot

@RestController
@RequestMapping("/api/tasks")



public class TaskController {
	
	@Autowired
	private TaskRepository taskRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	@GetMapping
	public List<Task> getAllTasks(){
		return taskRepository.findAll();
	}
	
	
	
	 @PostMapping
	    public Task createTask(@RequestBody TaskRequest request) {
	        Optional<User> user = userRepository.findById(request.getUserId());
	        if (user.isPresent()) {
	            Task task = new Task(request.getTitle(), user.get());
	            if (request.getStatus() != null) {
	                task.setStatus(request.getStatus());
	            }
	            return taskRepository.save(task);
	        }
	        throw new RuntimeException("User not found");
	    }
	 
	 
	 @GetMapping("/{id}")
	    public Task getTask(@PathVariable Long id) {
	        return taskRepository.findById(id).orElse(null);
	    }
	 
	 //mettre a jour le titre et le statut de la tache si elle existe
	    
	    @PutMapping("/{id}")
	    public Task updateTask(@PathVariable Long id, @RequestBody TaskRequest request) {
	        Optional<Task> taskOpt = taskRepository.findById(id);
	        if (taskOpt.isPresent()) {
	            Task task = taskOpt.get();
	            if (request.getTitle() != null) {
	                task.setTitle(request.getTitle());
	            }
	            if (request.getStatus() != null) {
	                task.setStatus(request.getStatus());
	            }
	            return taskRepository.save(task);
	        }
	        return null;
	    }
	    
	    
	    
	    @DeleteMapping("/{id}")
	    public String deleteTask(@PathVariable Long id) {
	        taskRepository.deleteById(id);
	        return "Task deleted";
	    }
	    
	    
	    
	    
	    @GetMapping("/user/{userId}")
	    public List<Task> getTasksByUser(@PathVariable Long userId) {
	        Optional<User> user = userRepository.findById(userId);
	        if (user.isPresent()) {
	            return taskRepository.findByUser(user.get());
	        }
	        return List.of();
	    }
	
	
	

}


class TaskRequest {
    private String title;
    private String status;
    private Long userId;
    
    // Getters et setters
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
}
