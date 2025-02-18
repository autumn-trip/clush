import React, { useEffect, useState } from "react";
import { getCalendarById, updateCalendar, deleteCalendar } from "../api/calendarsApi";
import "../style/CalendarsReadModal.scss";

const CalendarsReadModal = ({ isOpen, onClose, calendarId, refreshCalendar }) => {
    const [calendarData, setCalendarData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [updatedCalendar, setUpdatedCalendar] = useState({
        title: "",
        content: "",
        startDate: "",
        endDate: "",
        location: "",
        priority: 1,
        isAllDay: false,
    });

    useEffect(() => {
        if (isOpen && calendarId) {
            setLoading(true);
            getCalendarById(calendarId)
                .then((data) => {
                    setCalendarData(data);
                    setUpdatedCalendar({
                        title: data.title || "",
                        content: data.content || "",
                        startDate: data.startDate || "",
                        endDate: data.endDate || "",
                        location: data.location || "",
                        priority: data.priority || 1,
                        isAllDay: data.isAllDay || false,
                    });
                    setLoading(false);
                })
                .catch((error) => {
                    console.error("Error fetching calendar details:", error);
                    setLoading(false);
                });
        }
    }, [isOpen, calendarId]);

    // 입력 변경 핸들러
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setUpdatedCalendar({
            ...updatedCalendar,
            [name]: type === "checkbox" ? checked : value
        });
    };

    // 수정 모달 팝업
    const handleUpdateCalendar = async () => {
        try {
            await updateCalendar(calendarId, updatedCalendar);
            alert("일정이 수정되었습니다!");
            setIsEditing(false);
            refreshCalendar();
            onClose(); // 수정 완료 후 모달 닫기
        } catch (error) {
            console.error("Error updating calendar:", error);
        }
    };

    // 삭제
    const handleDeleteCalendar = async () => {
        const confirmDelete = window.confirm("정말 삭제하시겠습니까?");
        if (confirmDelete) {
            try {
                await deleteCalendar(calendarId);
                alert("일정이 삭제되었습니다!");
                onClose();
                refreshCalendar(); // ✅ 캘린더 리스트 다시 불러오기
            } catch (error) {
                console.error("Error deleting calendar:", error);
            }
        }
    };

    if (!isOpen) return null; // 모달이 닫혀있으면 렌더링하지 않음

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>📅 일정 상세 정보</h3>
                {loading ? (
                    <p>로딩 중...</p>
                ) : isEditing ? (
                    <>
                        <label>제목:</label>
                        <input type="text" name="title" value={updatedCalendar.title} onChange={handleInputChange} />

                        <label>내용:</label>
                        <textarea name="content" value={updatedCalendar.content} onChange={handleInputChange} />

                        <label>시작 날짜:</label>
                        <input type="datetime-local" name="startDate" value={updatedCalendar.startDate} onChange={handleInputChange} />

                        <label>종료 날짜:</label>
                        <input type="datetime-local" name="endDate" value={updatedCalendar.endDate} onChange={handleInputChange} />

                        <label>장소:</label>
                        <input type="text" name="location" value={updatedCalendar.location} onChange={handleInputChange} />

                        <label>중요도:</label>
                        <select name="priority" value={updatedCalendar.priority} onChange={handleInputChange}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>

                        <label>종일 여부:</label>
                        <input type="checkbox" name="isAllDay" checked={updatedCalendar.isAllDay} onChange={handleInputChange} />

                        <div className="modal-buttons">
                            <button onClick={handleUpdateCalendar}>수정 완료</button>
                            <button onClick={() => setIsEditing(false)}>취소</button>
                        </div>
                    </>
                ) : (
                    calendarData && (
                        <>
                            <p><strong>제목:</strong> {calendarData.title}</p>
                            <p><strong>내용:</strong> {calendarData.content}</p>
                            <p><strong>시작 날짜:</strong> {calendarData.startDate}</p>
                            <p><strong>종료 날짜:</strong> {calendarData.endDate}</p>
                            <p><strong>장소:</strong> {calendarData.location}</p>
                            <p><strong>중요도:</strong> {calendarData.priority}</p>
                            <p><strong>종일 여부:</strong> {calendarData.isAllDay ? "예" : "아니오"}</p>

                            <div className="modal-buttons">
                                <button onClick={() => setIsEditing(true)}>수정</button>
                                <button onClick={handleDeleteCalendar} className="delete-button">삭제</button>
                            </div>
                        </>
                    )
                )}
                <button className="close-button" onClick={onClose}>닫기</button>
            </div>
        </div>
    );
};

export default CalendarsReadModal;