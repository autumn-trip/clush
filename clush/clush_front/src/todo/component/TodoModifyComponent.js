import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { modifyTodo, readTodo } from "../api/todoApi";
import "../style/TodoModifyComponent.scss";

const initState = {
    tId: 0,
    title: "",
    username: "",
    content: "",
    startDate: "",
    endDate: "",
    priority: 1,
    status: "REGISTERED",
};

const TodoModifyComponent = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const todoData = location.state?.todoData || null;
    const [todo, setTodo] = useState(initState);
    const [isLoading, setIsLoading] = useState(true);

    const formatDateTimeForInput = (dateString) => {
        if (!dateString) return "";
        return dateString.replace("T", " ");
    };

    const formatDateTimeForBackend = (dateString) => {
        if (!dateString) return "";
        return dateString.replace(" ", "T");
    };

    useEffect(() => {
        if (todoData) {
            console.log("받은 todoData:", todoData);
            setTodo({
                ...todoData,
                startDate: formatDateTimeForInput(todoData.startDate),
                endDate: formatDateTimeForInput(todoData.endDate),
            });
            setIsLoading(false);
        } else {
            console.error("todoData가 없음, API 호출");
            setIsLoading(true);
            readTodo(location.pathname.split("/").pop()) // URL에서 ID 가져오기
                .then((data) => {
                    setTodo({
                        ...data,
                        startDate: formatDateTimeForInput(data.startDate),
                        endDate: formatDateTimeForInput(data.endDate),
                    });
                    setIsLoading(false);
                })
                .catch((err) => {
                    console.error("Error fetching todo:", err);
                    setIsLoading(false);
                });
        }
    }, [todoData]);

    // 입력값 변경 핸들러
    const handleChangeTodo = (e) => {
        const { name, value, type } = e.target;
        let updatedValue = type === "number" ? parseInt(value, 10) : value;

        setTodo((prev) => ({ ...prev, [name]: updatedValue }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedTodo = {
            ...todo,
            startDate: formatDateTimeForBackend(todo.startDate),
            endDate: formatDateTimeForBackend(todo.endDate),
        };

        console.log("보낼 데이터:", updatedTodo);

        try {
            await modifyTodo(todo.tId, updatedTodo);
            alert("수정 완료");
            navigate("/todo");
        } catch (error) {
            console.error("Error modifying todo:", error);
        }
    };

    if (isLoading) {
        return <div>로딩 중...</div>;
    }

    return (
        <div className="todo-register-container">
            <h2 className="todo-register-title">할 일 수정</h2>
            <form className="todo-register-form" onSubmit={handleSubmit}>
                {/* 작성자 */}
                <div className="todo-register-form-group">
                    <label className="todo-register-form-label">작성자:</label>
                    <input
                        type="text"
                        name="username"
                        className="todo-register-form-input"
                        value={todo.username || ""}
                        onChange={handleChangeTodo}
                    />
                </div>

                {/* 제목 */}
                <div className="todo-register-form-group">
                    <label className="todo-register-form-label">제목:</label>
                    <input
                        type="text"
                        name="title"
                        className="todo-register-form-input"
                        value={todo.title || ""}
                        onChange={handleChangeTodo}
                    />
                </div>

                {/* 내용 */}
                <div className="todo-register-form-group">
                    <label className="todo-register-form-label">내용:</label>
                    <textarea
                        name="content"
                        className="todo-register-form-textarea"
                        value={todo.content || ""}
                        onChange={handleChangeTodo}
                    />
                </div>

                {/* 시작일 - datetime-local 적용 */}
                <div className="todo-register-form-group">
                    <label className="todo-register-form-label">시작 날짜:</label>
                    <input
                        type="datetime-local"
                        name="startDate"
                        className="todo-register-form-input"
                        value={todo.startDate || ""}
                        onChange={handleChangeTodo}
                    />
                </div>

                {/* 마감일 - datetime-local 적용 */}
                <div className="todo-register-form-group">
                    <label className="todo-register-form-label">마감 날짜:</label>
                    <input
                        type="datetime-local"
                        name="endDate"
                        className="todo-register-form-input"
                        value={todo.endDate || ""}
                        onChange={handleChangeTodo}
                    />
                </div>

                {/* 중요도 선택 */}
                <div className="todo-register-form-group">
                    <label className="todo-register-form-label">중요도:</label>
                    <select
                        name="priority"
                        className="todo-register-form-select"
                        value={todo.priority}
                        onChange={handleChangeTodo}
                    >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>

                {/* 진행 상태 선택 */}
                <div className="todo-register-form-group">
                    <label className="todo-register-form-label">진행 상태:</label>
                    <select
                        name="status"
                        className="todo-register-form-select"
                        value={todo.status || ""}
                        onChange={handleChangeTodo}
                    >
                        <option value="REGISTERED">대기 중</option>
                        <option value="IN_PROGRESS">진행 중</option>
                        <option value="COMPLETED">완료</option>
                    </select>
                </div>

                <div className="todo-register-button-group">
                    <button type="submit" className="todo-register-submit-button">수정 완료</button>
                </div>
            </form>
        </div>
    );
};

export default TodoModifyComponent;