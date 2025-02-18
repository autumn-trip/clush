package com.clush.todo.service;

import com.clush.todo.domain.TodoStatus;
import com.clush.todo.dto.TodoDTO;

import java.util.List;

public interface TodoService {
    Long register(TodoDTO todoDTO);
    TodoDTO get(Long tId);
    void modify(TodoDTO todoDTO);
    void remove(Long tId);
    List<TodoDTO> getTodosByStatus(TodoStatus status);
    void updateStatus(Long tId, TodoStatus status);
}
