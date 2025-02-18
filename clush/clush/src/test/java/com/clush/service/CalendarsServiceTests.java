package com.clush.service;

import com.clush.calendar.dto.CalendarsDTO;
import com.clush.calendar.service.CalendarsService;
import lombok.extern.log4j.Log4j2;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;

@SpringBootTest
@Log4j2
public class CalendarsServiceTests {

    @Autowired
    private CalendarsService calendarsService;

    private CalendarsDTO testCalendarDTO1;
    private CalendarsDTO testCalendarDTO2;

    @BeforeEach
    void setup() {
        // ✅ 캘린더 일정 2개 생성 (오늘 ~ 2일 후)
        testCalendarDTO1 = CalendarsDTO.builder()
                .title("팀 회의")
                .content("팀 회의가 예정되어 있습니다.")
                .startDate(LocalDateTime.now()) // 오늘 날짜
                .endDate(LocalDateTime.now().plusDays(2)) // 2일 후
                .priority(1)
                .isAllDay(true)
                .build();

        testCalendarDTO2 = CalendarsDTO.builder()
                .title("프로젝트 발표")
                .content("프로젝트 발표 일정입니다.")
                .startDate(LocalDateTime.now()) // 오늘 날짜
                .endDate(LocalDateTime.now().plusDays(2)) // 2일 후
                .priority(2)
                .isAllDay(false)
                .build();
    }

    @Test
    void testRegisterCalendars() {
        // ✅ 캘린더 일정 등록 (서비스 메서드 직접 호출)
        Long calendarId1 = calendarsService.register(testCalendarDTO1);
        Long calendarId2 = calendarsService.register(testCalendarDTO2);

        // ✅ 등록된 ID가 null이 아닌지 확인
        log.info("캘린더 ID1이 정상적으로 생성되었는지 확인: {}", calendarId1);
        log.info("캘린더 ID2가 정상적으로 생성되었는지 확인: {}", calendarId2);
    }

    @Test
    void testGetCalendarById() {
        // ✅ 캘린더 일정 등록 후 ID 가져오기
        Long calendarId = calendarsService.register(testCalendarDTO1);

        // ✅ 캘린더 조회 테스트 (서비스 메서드 사용)
        CalendarsDTO retrievedCalendar = calendarsService.get(calendarId);

        log.info("조회된 캘린더가 null이 아닌지 확인: {}", retrievedCalendar);
        log.info("조회된 캘린더 제목이 일치하는지 확인: {}", retrievedCalendar.getTitle());
        log.info("팀 회의가 예정되어 있습니다. 조회된 캘린더 내용이 일치하는지 확인: {}", retrievedCalendar.getContent());
        log.info("시작 날짜가 오늘과 동일한지 확인: {}, {}", LocalDateTime.now().toLocalDate(), retrievedCalendar.getStartDate().toLocalDate());
        log.info("종료 날짜가 2일 후인지 확인: {}, {}", LocalDateTime.now().toLocalDate(), retrievedCalendar.getEndDate().toLocalDate());
    }
}
