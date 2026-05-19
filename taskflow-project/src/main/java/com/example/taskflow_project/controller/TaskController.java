package com.example.taskflow_project.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.*;

import com.example.taskflow_project.nodel.Task;

import com.example.taskflow_project.repository.TaskRepository;

@RestController
@CrossOrigin("*")
public class TaskController {

    @Autowired
    private TaskRepository taskRepository;

    @PostMapping("/tasks")
    public Task addTask(@RequestBody Task task) {

        return taskRepository.save(task);

    }

    @GetMapping("/tasks")
    public List<Task> getTasks() {

        return taskRepository.findAll();

    }

    @DeleteMapping("/tasks/{id}")
    public String deleteTask(@PathVariable Long id) {

        taskRepository.deleteById(id);

        return "Task Deleted";

    }

}
