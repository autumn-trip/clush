import React, { useEffect, useState } from "react";
import { getCalendarsAll, registerCalendar } from "../api/calendarsApi";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import FullCalendar from "@fullcalendar/react";
import CalendarsReadModal from "./CalendarsReadModal";
import "../style/CalendarsComponent.scss";
import CalendarsRegisterModal from "./CalendarsRegisterModal";

const CalendarsComponent = () => {
    const [calendars, setCalendars] = useState([]);
    const [isReadModalOpen, setIsReadModalOpen] = useState(false);
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
    const [selectedCalendarId, setSelectedCalendarId] = useState(null);

    useEffect(() => {
        fetchCalendars();
    }, []);

    const fetchCalendars = async () => {
        try {
            const data = await getCalendarsAll();
            const formattedCalendars = data.map(calendar => ({
                id: String(calendar.cid),
                title: calendar.title,
                start: calendar.startDate,
                end: calendar.endDate,
                allDay: calendar.isAllDay
            }));
            setCalendars(formattedCalendars);
        } catch (error) {
            console.error("Error fetching calendar:", error);
        }
    };

    const refreshCalendar = () => {
        fetchCalendars();
    };

    const handleEventClick = (info) => {
        setSelectedCalendarId(parseInt(info.event.id, 10));
        setIsReadModalOpen(true);
    };

    const handleRegisterButtonClick = () => {
        setIsRegisterModalOpen(true);
    };

    const handleRegisterEvent = async (eventData) => {
        try {
            await registerCalendar(eventData);
            alert("일정이 등록되었습니다!");
            setIsRegisterModalOpen(false);
            refreshCalendar();
        } catch (error) {
            console.error("Error registering calendar event:", error);
            alert("일정 등록 중 오류가 발생했습니다.");
        }
    };

    return (
        <div className="calendar-container">
            <h2>📅 캘린더 일정</h2>

            <button className="calendar-register-button" onClick={handleRegisterButtonClick}>
                일정 등록
            </button>

            <CalendarsReadModal
                isOpen={isReadModalOpen}
                onClose={() => setIsReadModalOpen(false)}
                calendarId={selectedCalendarId}
                refreshCalendar={refreshCalendar}
            />

            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                events={calendars}
                eventClick={handleEventClick}
            />

            <CalendarsRegisterModal
                isOpen={isRegisterModalOpen}
                onClose={() => setIsRegisterModalOpen(false)}
                onSubmit={handleRegisterEvent}
            />
        </div>
    );
};

export default CalendarsComponent;