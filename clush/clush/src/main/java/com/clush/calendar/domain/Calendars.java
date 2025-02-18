package com.clush.calendar.domain;

import com.clush.common.domain.BaseEntity;
import com.clush.todo.domain.Todo;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Calendars extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long cId;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String content;

    @Column(nullable = false)
    private LocalDateTime startDate;
    private LocalDateTime endDate;

    private String location;
    private Integer priority;
    private boolean isAllDay; // 종일 일정 여부

    @OneToMany(mappedBy = "calendars", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Todo> todos;
}
