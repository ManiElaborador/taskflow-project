package com.example.taskflow_project.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.example.taskflow_project.nodel.Task;

public interface TaskRepository
        extends JpaRepository<Task, Long> {

}
