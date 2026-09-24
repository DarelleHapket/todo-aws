package com.taskmanager.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.taskmanager.backend.entity.Task;
import com.taskmanager.backend.entity.User;
import java.util.List;  
@Repository

public interface TaskRepository  extends JpaRepository<Task ,Long>{

	
	List<Task> findByUser(User user);
	
	List<Task> findByStatus(String status);
	
	List<Task> findByUserAndStatus(User user, String status);
}
