package com.clush.service;

import com.clush.calendar.domain.Calendars;
import com.clush.calendar.repository.CalendarsRepository;
import com.clush.todo.domain.Todo;
import com.clush.todo.domain.TodoStatus;
import com.clush.todo.dto.TodoDTO;
import com.clush.todo.repository.TodoRepository;
import com.clush.todo.service.TodoService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class TodoServiceTests {

    @Autowired
    private TodoService todoService;

    @Autowired
    private TodoRepository todoRepository;

    @Autowired
    private CalendarsRepository calendarsRepository;

    private TodoDTO testTodoDTO;

    @BeforeEach
    void setup() {

        // REGISTERED 상태 Todo 2개 생성
        for (int i = 1; i <= 2; i++) {
            TodoDTO todoDTO = TodoDTO.builder()
                    .title("REGISTERED 할 일 " + i)
                    .content("REGISTERED 상태의 내용 " + i)
                    .username("user" + i)
                    .startDate(LocalDateTime.now().plusDays(i))
                    .endDate(LocalDateTime.now().plusDays(i + 1))
                    .priority(i % 3 + 1)
                    .status(TodoStatus.REGISTERED)
                    .build();
            todoService.register(todoDTO);
        }

        // IN_PROGRESS 상태 Todo 2개 생성
        for (int i = 3; i <= 4; i++) {
            TodoDTO todoDTO = TodoDTO.builder()
                    .title("IN_PROGRESS 할 일 " + i)
                    .content("IN_PROGRESS 상태의 내용 " + i)
                    .username("user" + i)
                    .startDate(LocalDateTime.now().plusDays(i))
                    .endDate(LocalDateTime.now().plusDays(i + 1))
                    .priority(i % 3 + 1)
                    .status(TodoStatus.IN_PROGRESS)
                    .build();
            todoService.register(todoDTO);
        }

        // COMPLETED 상태 Todo 2개 생성
        for (int i = 5; i <= 6; i++) {
            TodoDTO todoDTO = TodoDTO.builder()
                    .title("COMPLETED 할 일 " + i)
                    .content("COMPLETED 상태의 내용 " + i)
                    .username("user" + i)
                    .startDate(LocalDateTime.now().plusDays(i))
                    .endDate(LocalDateTime.now().plusDays(i + 1))
                    .priority(i % 3 + 1)
                    .status(TodoStatus.COMPLETED)
                    .build();
            todoService.register(todoDTO);
        }
    }

    @Test
    void testRegisterTodo() {
        // Todo 등록
        Long todoId = todoService.register(testTodoDTO);

        // 저장된 데이터 확인
        Optional<Todo> savedTodo = todoRepository.findById(todoId);
        assertTrue(savedTodo.isPresent(), "Todo가 정상적으로 저장되었는지 확인");
        assertEquals("테스트 일정", savedTodo.get().getTitle(), "제목이 일치하는지 확인");

        // Calendar 일정도 같이 생성되었는지 확인
        Optional<Calendars> savedCalendar = calendarsRepository.findById(savedTodo.get().getCalendars().getCId());
        assertTrue(savedCalendar.isPresent(), "캘린더 일정이 생성되었는지 확인");
        assertEquals("테스트 일정", savedCalendar.get().getTitle(), "일정 제목이 일치하는지 확인");
    }

    @Test
    void testGetTodoById() {
        // Todo 등록 후 조회
        Long todoId = todoService.register(testTodoDTO);
        TodoDTO retrievedTodo = todoService.get(todoId);

        assertNotNull(retrievedTodo, "조회된 Todo가 null이 아닌지 확인");
        assertEquals("테스트 일정", retrievedTodo.getTitle(), "조회된 Todo 제목이 일치하는지 확인");
    }
}