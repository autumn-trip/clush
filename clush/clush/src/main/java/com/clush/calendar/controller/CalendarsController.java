package com.clush.calendar.controller;

import com.clush.calendar.dto.CalendarsDTO;
import com.clush.calendar.service.CalendarsService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@Log4j2
@RequestMapping("/api/calendar")
public class CalendarsController {

    private final CalendarsService calendarService;

    @GetMapping("/all")
    public List<CalendarsDTO> getAll() {
        return calendarService.getAll();
    }

    @PostMapping("/")
    public Map<String, Long> register(@RequestBody CalendarsDTO calendarDTO) {
        log.info("Register Calendar Event: {}", calendarDTO);
        Long cId = calendarService.register(calendarDTO);
        return Map.of("cId", cId);
    }

    @GetMapping("/{cId}")
    public CalendarsDTO get(@PathVariable(name = "cId") Long cId) {
        return calendarService.get(cId);
    }

    @PutMapping("/{cId}")
    public Map<String, String> modify(
            @PathVariable(name = "cId") Long cId,
            @RequestBody CalendarsDTO calendarDTO) {

        calendarDTO.setCId(cId);
        log.info("Modify Calendar Event: {}", calendarDTO);
        calendarService.modify(calendarDTO);

        return Map.of("RESULT", "SUCCESS");
    }

    @DeleteMapping("/{cId}")
    public Map<String, String> remove(@PathVariable(name = "cId") Long cId) {
        log.info("Remove Calendar Event: {}", cId);
        calendarService.remove(cId);

        return Map.of("RESULT", "SUCCESS");
    }
}
