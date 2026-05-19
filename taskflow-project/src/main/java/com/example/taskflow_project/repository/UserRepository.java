package com.example.taskflow_project.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.taskflow_project.nodel.User;

public interface UserRepository extends JpaRepository<User, Long>{
	 User findByEmail(String email);

}
