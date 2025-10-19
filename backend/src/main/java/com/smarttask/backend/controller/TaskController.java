package com.smarttask.backend.controller;

import com.smarttask.backend.model.Task;
import com.smarttask.backend.model.User;
import com.smarttask.backend.repository.TaskRepository;
import com.smarttask.backend.repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    private final TaskRepository taskRepo;
    private final UserRepository userRepo;

    public TaskController(TaskRepository taskRepo, UserRepository userRepo) {
        this.taskRepo = taskRepo;
        this.userRepo = userRepo;
    }

    @GetMapping
    public List<Task> getTasks(Authentication auth) {
        String username = auth.getName();
        User user = userRepo.findByUsername(username).orElseThrow();
        return taskRepo.findByUserId(user.getId());
    }

    @PostMapping
    public Task createTask(@RequestBody Task task, Authentication auth) {
        String username = auth.getName();
        User user = userRepo.findByUsername(username).orElseThrow();
        task.setUser(user);
        return taskRepo.save(task);
    }

    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable Long id, Authentication auth) {
        String username = auth.getName();
        User user = userRepo.findByUsername(username).orElseThrow();

        Task task = taskRepo.findById(id).orElseThrow();
        if (task.getUser().getId().equals(user.getId())) {
            taskRepo.delete(task);
        }
    }
}
