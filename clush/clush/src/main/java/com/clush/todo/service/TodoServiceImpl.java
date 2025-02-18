package com.clush.todo.service;

import com.clush.calendar.domain.Calendars;
import com.clush.calendar.repository.CalendarsRepository;
import com.clush.todo.domain.Todo;
import com.clush.todo.domain.TodoStatus;
import com.clush.todo.dto.TodoDTO;
import com.clush.todo.repository.TodoRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
@Log4j2
@RequiredArgsConstructor
public class TodoServiceImpl implements TodoService{

    private final TodoRepository todoRepository;
    private final CalendarsRepository calendarsRepository;

    // 등록
    @Override
    public Long register(TodoDTO todoDTO) {
        log.info("Registering Todo: {}", todoDTO);

        Todo todo = dtoToEntity(todoDTO);

        // 같은 일정이 있는지 확인
        Optional<Calendars> existingCalendar = calendarsRepository.findByStartDateAndEndDate(
                todoDTO.getStartDate(), todoDTO.getEndDate());

        Calendars calendar;
        if (existingCalendar.isPresent()) {
            // 기존 일정이 있으면 그 일정에 추가
            calendar = existingCalendar.get();
        } else {
            // 새로운 일정 생성
            calendar = new Calendars();
            calendar.setTitle(todoDTO.getTitle());
            calendar.setContent(todoDTO.getContent());
            calendar.setStartDate(todoDTO.getStartDate());
            calendar.setEndDate(todoDTO.getEndDate());
            calendar.setPriority(todoDTO.getPriority());
            calendar.setAllDay(false);

            // 새 일정 저장
            calendar = calendarsRepository.save(calendar);
        }

        todo.setCalendars(calendar);
        Todo savedTodo = todoRepository.save(todo);

        return savedTodo.getTId();
    }

    // 상세 조회
    @Override
    public TodoDTO get(Long tId) {
        Todo todo = todoRepository.findById(tId)
                .orElseThrow(() -> new RuntimeException("Todo not found"));

        return entityToDTO(todo);
    }

    // 수정
    @Override
    public void modify(TodoDTO todoDTO) {
        Todo todo = todoRepository.findById(todoDTO.getTId())
                .orElseThrow(() -> new RuntimeException("Todo not found"));

        todo.setTitle(todoDTO.getTitle());
        todo.setContent(todoDTO.getContent());
        todo.setUsername(todoDTO.getUsername());
        todo.setStartDate(todoDTO.getStartDate());
        todo.setEndDate(todoDTO.getEndDate());
        todo.setPriority(todoDTO.getPriority());
        todo.setStatus(todoDTO.getStatus());

        todoRepository.save(todo);
    }

    // 삭제
    @Override
    public void remove(Long tId) {
        todoRepository.deleteById(tId);
    }

    // Status 별 조회
    @Override
    public List<TodoDTO> getTodosByStatus(TodoStatus status) {
        List<Todo> todos = todoRepository.findByStatus(status);

        return todos.stream()
                .map(this::entityToDTO)
                .collect(Collectors.toList());
    }

    // status 업데이트
    @Override
    public void updateStatus(Long tId, TodoStatus status) {
        todoRepository.updateStatus(tId, status);
    }

    private Todo dtoToEntity(TodoDTO dto) {
        return Todo.builder()
                .tId(dto.getTId())
                .title(dto.getTitle())
                .content(dto.getContent())
                .username(dto.getUsername())
                .startDate(dto.getStartDate())
                .endDate(dto.getEndDate())
                .priority(dto.getPriority())
                .status(dto.getStatus())
                .build();
    }

    private TodoDTO entityToDTO(Todo entity) {
        return TodoDTO.builder()
                .tId(entity.getTId())
                .title(entity.getTitle())
                .content(entity.getContent())
                .username(entity.getUsername())
                .startDate(entity.getStartDate())
                .endDate(entity.getEndDate())
                .priority(entity.getPriority())
                .status(entity.getStatus())
                .build();
    }
}
