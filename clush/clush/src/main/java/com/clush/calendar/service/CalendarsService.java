package com.clush.calendar.service;

import com.clush.calendar.dto.CalendarsDTO;

import java.util.List;

public interface CalendarsService {

    Long register(CalendarsDTO calendarDTO);
    CalendarsDTO get(Long cId);
    void modify(CalendarsDTO calendarDTO);
    void remove(Long cId);
    List<CalendarsDTO> getAll();
}
