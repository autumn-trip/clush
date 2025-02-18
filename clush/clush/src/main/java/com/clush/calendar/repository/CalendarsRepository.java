package com.clush.calendar.repository;

import com.clush.calendar.domain.Calendars;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.Optional;

public interface CalendarsRepository extends JpaRepository<Calendars, Long> {

    @Query("select c from Calendars c where c.startDate = :startDate and c.endDate = :endDate")
    Optional<Calendars> findByStartDateAndEndDate(@Param("startDate")LocalDateTime startDate, @Param("endDate")LocalDateTime endDate);
}
