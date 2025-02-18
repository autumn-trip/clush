package com.clush.todo.domain;

import com.clush.calendar.domain.Calendars;
import com.clush.common.domain.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Todo extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long tId;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String content;
    private String username;

    @Column(nullable = false)
    private LocalDateTime startDate;
    private LocalDateTime endDate;

    private Integer priority; // 중요도

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TodoStatus status = TodoStatus.REGISTERED;

    @ManyToOne
    @JoinColumn(name = "calendars_id")
    private Calendars calendars;
}
