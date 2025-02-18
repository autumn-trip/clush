package com.clush.todo.repository;

import com.clush.todo.domain.Todo;
import com.clush.todo.domain.TodoStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface TodoRepository extends JpaRepository<Todo, Long> {
    List<Todo> findByStatus(TodoStatus status);

    @Transactional
    @Modifying
    @Query("update Todo t set t.status = :status where t.tId = :tId")
    void updateStatus(Long tId, TodoStatus status);
}
