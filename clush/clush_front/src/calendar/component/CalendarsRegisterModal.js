import React, { useState } from "react";
import "../style/CalendarsRegisterModal.scss";

const CalendarsRegisterModal = ({ isOpen, onClose, onSubmit }) => {
    const [newEvent, setNewEvent] = useState({
        title: "",
        content: "",
        startDate: "",
        endDate: "",
        location: "",
        priority: 1,
        isAllDay: false
    });

    // 입력 필드 변경 핸들러
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setNewEvent({
            ...newEvent,
            [name]: type === "checkbox" ? checked : value
        });
    };

    // 등록 버튼 클릭 시 실행
    const handleSubmit = () => {
        onSubmit(newEvent); // 부모 컴포넌트에서 처리
        setNewEvent({ // 초기화
            title: "",
            content: "",
            startDate: "",
            endDate: "",
            location: "",
            priority: 1,
            isAllDay: false
        });
        onClose(); // 모달 닫기
    };

    if (!isOpen) return null; // 모달이 닫혀 있으면 렌더링 안 함

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>📅 일정 등록</h3>
                <label>제목:</label>
                <input type="text" name="title" value={newEvent.title} onChange={handleInputChange} />

                <label>내용:</label>
                <textarea name="content" value={newEvent.content} onChange={handleInputChange} />

                <label>시작 날짜:</label>
                <input type="datetime-local" name="startDate" value={newEvent.startDate} onChange={handleInputChange} />

                <label>종료 날짜:</label>
                <input type="datetime-local" name="endDate" value={newEvent.endDate} onChange={handleInputChange} />

                <label>장소:</label>
                <input type="text" name="location" value={newEvent.location} onChange={handleInputChange} />

                <label>중요도:</label>
                <select name="priority" value={newEvent.priority} onChange={handleInputChange}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>

                <label>종일 여부:</label>
                <input type="checkbox" name="isAllDay" checked={newEvent.isAllDay} onChange={handleInputChange} />

                <div className="modal-buttons">
                    <button onClick={handleSubmit}>등록</button>
                    <button onClick={onClose}>취소</button>
                </div>
            </div>
        </div>
    );
};

export default CalendarsRegisterModal;