package com.clush.calendar.service;

import com.clush.calendar.domain.Calendars;
import com.clush.calendar.dto.CalendarsDTO;
import com.clush.calendar.repository.CalendarsRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@Log4j2
@RequiredArgsConstructor
public class CalendarsServiceImpl implements CalendarsService {
    private final CalendarsRepository calendarRepository;

    @Override
    public List<CalendarsDTO> getAll() {
        List<Calendars> calendars = calendarRepository.findAll();

        return calendars.stream()
                .map(this::entityToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public Long register(CalendarsDTO calendarDTO) {
        log.info("Registering Calendar Event: {}", calendarDTO);

        Calendars calendar = dtoToEntity(calendarDTO);

        Calendars savedCalendar = calendarRepository.save(calendar);
        return savedCalendar.getCId();
    }

    @Override
    public CalendarsDTO get(Long cId) {
        Calendars calendar = calendarRepository.findById(cId)
                .orElseThrow(() -> new RuntimeException("Calendar Event not found"));

        return entityToDTO(calendar);
    }

    @Override
    public void modify(CalendarsDTO calendarDTO) {
        Calendars calendar = calendarRepository.findById(calendarDTO.getCId())
                .orElseThrow(() -> new RuntimeException("Calendar Event not found"));

        calendar.setTitle(calendarDTO.getTitle());
        calendar.setContent(calendarDTO.getContent());
        calendar.setStartDate(calendarDTO.getStartDate());
        calendar.setEndDate(calendarDTO.getEndDate());
        calendar.setLocation(calendarDTO.getLocation());
        calendar.setPriority(calendarDTO.getPriority());
        calendar.setAllDay(calendarDTO.isAllDay());

        calendarRepository.save(calendar);
    }

    @Override
    public void remove(Long cId) {
        calendarRepository.deleteById(cId);
    }

    private Calendars dtoToEntity(CalendarsDTO dto) {
        return Calendars.builder()
                .cId(dto.getCId())
                .title(dto.getTitle())
                .content(dto.getContent())
                .startDate(dto.getStartDate())
                .endDate(dto.getEndDate())
                .priority(dto.getPriority())
                .isAllDay(dto.isAllDay())
                .build();
    }

    private CalendarsDTO entityToDTO(Calendars entity) {
        return CalendarsDTO.builder()
                .cId(entity.getCId())
                .title(entity.getTitle())
                .content(entity.getContent())
                .startDate(entity.getStartDate())
                .endDate(entity.getEndDate())
                .priority(entity.getPriority())
                .isAllDay(entity.isAllDay())
                .build();
    }
}
