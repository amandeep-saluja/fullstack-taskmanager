package com.smarttask.backend.controller;

import org.springframework.web.bind.annotation.*;
import java.util.List;
import com.smarttask.backend.model.Task;
import com.smarttask.backend.repository.TaskRepository;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {
    private final TaskRepository repo;

    public TaskController(TaskRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<Task> getAll() {
        return repo.findAll();
    }

    @PostMapping
    public Task create(@RequestBody Task task) {
        return repo.save(task);
    }
}
