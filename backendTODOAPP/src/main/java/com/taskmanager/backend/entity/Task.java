package com.taskmanager.backend.entity;

import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;


@Entity
@Table(name = "tasks")
public class Task {

	
		@Id
		@GeneratedValue(strategy = GenerationType.IDENTITY)
		
		private Long id;
		
		private String title;
		private String status = "TODO";
		
		
//		plusieurs taches apartiennenet a plusieurs user
		
		
		@ManyToOne
		@JoinColumn(name = "user_id")
		private User user;
		
		
		private LocalDateTime createdAt;
		
		
		public Task() {
	        this.createdAt = LocalDateTime.now();
	    }
	    
	    public Task(String title, User user) {
	        this();
	        this.title = title;
	        this.user = user;
	    }

		public Long getId() {
			return id;
		}

		public void setId(Long id) {
			this.id = id;
		}

		public String getTitle() {
			return title;
		}

		public void setTitle(String title) {
			this.title = title;
		}

		public String getStatus() {
			return status;
		}

		public void setStatus(String status) {
			this.status = status;
		}

		public User getUser() {
			return user;
		}

		public void setUser(User user) {
			this.user = user;
		}

		public LocalDateTime getCreatedAt() {
			return createdAt;
		}

		public void setCreatedAt(LocalDateTime createdAt) {
			this.createdAt = createdAt;
		}
	    
		
		
		
}
