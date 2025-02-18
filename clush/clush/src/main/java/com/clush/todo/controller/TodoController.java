package com.clush.todo.controller;

import com.clush.common.dto.PageRequestDTO;
import com.clush.common.dto.PageResponseDTO;
import com.clush.todo.domain.TodoStatus;
import com.clush.todo.dto.TodoDTO;
import com.clush.todo.service.TodoService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@Log4j2
@RequestMapping("/api/todo")
public class TodoController {

    private final TodoService todoService;

    @PostMapping("/register")
    public Map<String, Long> register(@RequestBody TodoDTO todoDTO) {
        log.info("Register Todo: {}", todoDTO);
        Long tId = todoService.register(todoDTO);
        return Map.of("tId", tId);
    }

    @GetMapping("/read/{tId}")
    public TodoDTO get(@PathVariable(name = "tId") Long tId) {
        return todoService.get(tId);
    }

    @PutMapping("/modify/{tId}")
    public Map<String, String> modify(@PathVariable(name = "tId") Long tId,
                                      @RequestBody TodoDTO todoDTO) {

        todoDTO.setTId(tId);
        log.info("Modify Todo: {}", todoDTO);
        todoService.modify(todoDTO);

        return Map.of("RESULT", "SUCCESS");
    }

    @DeleteMapping("/{tId}")
    public Map<String, String> remove(@PathVariable(name = "tId") Long tId) {
        log.info("Remove Todo: {}", tId);
        todoService.remove(tId);

        return Map.of("RESULT", "SUCCESS");
    }

    @GetMapping("/status/{status}")
    public List<TodoDTO> getTodosByStatus(@PathVariable TodoStatus status) {
        log.info("Fetching todos with status: {}", status);
        return todoService.getTodosByStatus(status);
    }

    @PutMapping("/update-status/{tid}")
    public ResponseEntity<Map<String, String>> updateStatus(@PathVariable Long tId,
                                                            @RequestBody Map<String, String> request) {
        try {
            TodoStatus newStatus = TodoStatus.valueOf(request.get("status"));
            log.info("Updating Todo ID {} to status {}", tId, newStatus);

            todoService.updateStatus(tId, newStatus);
            return ResponseEntity.ok(Map.of("RESULT", "SUCCESS"));
        } catch (IllegalArgumentException e) {
            log.error("Invalid status value: {}", request.get("status"));
            return ResponseEntity.badRequest().body(Map.of("ERROR", "Invalid status value"));
        }
    }
}
