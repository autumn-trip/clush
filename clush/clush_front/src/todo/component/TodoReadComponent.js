import React from 'react';
import "../style/TodoReadComponent.scss";
import { useNavigate } from "react-router-dom";
import { removeTodo } from "../api/todoApi";

const getStatusLabel = (status) => {
    switch (status) {
        case "REGISTERED":
            return "대기 중";
        case "IN_PROGRESS":
            return "진행 중";
        case "COMPLETED":
            return "완료";
        default:
            return "로딩 중";
    }
};

const TodoReadComponent = ({ todoData, closeModal }) => {
    const navigate = useNavigate();

    if (!todoData) {
        return <div>데이터를 불러오는 중입니다...</div>;
    }

    // 수정 버튼 클릭 핸들러
    const handleModifyClick = () => {
        console.log("Navigating to modify with todoData:", todoData);

        const fixedTodoData = { ...todoData, tId: todoData.tId || todoData.tid };

        if (!fixedTodoData.tId) {
            alert("수정할 할 일 정보를 찾을 수 없습니다.");
            return;
        }

        navigate(`/todo/modify/${fixedTodoData.tId}`, { state: { todoData: fixedTodoData } });
    };

    // 삭제 버튼 클릭 핸들러
    const handleDeleteClick = async () => {
        if (!todoData.tid) {
            alert("삭제할 할 일 정보를 찾을 수 없습니다.");
            return;
        }

        // 삭제 확인 팝업
        const isConfirmed = window.confirm("정말 삭제하시겠습니까?");
        if (!isConfirmed) return;

        try {
            await removeTodo(todoData.tid);
            alert("삭제되었습니다.");
            closeModal();
            navigate("/todo");
            window.location.reload();
        } catch (error) {
            console.error("Error deleting todo:", error);
            alert("삭제 중 오류가 발생했습니다.");
        }
    };

    return (
        <div className="todo-read-container">
            <h2 className="todo-read-title">제목: {todoData.title}</h2>
            <p className="todo-read-content">내용: {todoData.content}</p>
            <p className="todo-read-author">작성자: {todoData.username}</p>
            <p className="todo-read-start">시작: {todoData.startDate}</p>
            <p className="todo-read-end">마감: {todoData.endDate}</p>
            <p className="todo-read-priority">중요도: {todoData.priority}</p>
            <p className="todo-read-status">진행: {getStatusLabel(todoData.status)}</p>

            <div className="todo-read-button-group">
                <button onClick={handleModifyClick} className="todo-read-modify-button">수정</button>
                <button onClick={handleDeleteClick} className="todo-read-delete-button">삭제</button>
            </div>
        </div>
    );
};

export default TodoReadComponent;