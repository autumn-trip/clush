import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {getStatus} from "../api/todoApi";
import TodoReadComponent from "./TodoReadComponent";
import "../style/TodoListComponent.scss";

const statuses = ["REGISTERED", "IN_PROGRESS", "COMPLETED"];

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

const TodoListComponent = () => {
    const [todosByStatus, setTodosByStatus] = useState({});
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [selectedTodo, setSelectedTodo] = useState(null);

    useEffect(() => {
        const fetchTodosByStatus = async () => {
            try {
                const data = {};
                for (const status of statuses) {
                    data[status] = await getStatus(status) || [];
                }
                console.log(data);
                setTodosByStatus(data);
            } catch (err) {
                handleError(err);
            }
        };
        fetchTodosByStatus();
    }, []);

    const handleError = (err) => {
        console.error("Error occurred:", err);
        alert("데이터를 불러오는 중 오류가 발생했습니다.")
    };

    const openModal = (todo) => {
        console.log("openModal 호출:", todo);

        if (!todo) {
            console.error("선택된 할 일이 없습니다.");
            alert("할 일을 찾을 수 없습니다.");
            return;
        }

        setSelectedTodo(todo);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedTodo(null);
    };

    return (
        <div className="todo-list-container">
            <h2>Todo List</h2>
            <button className="todo-list-button" onClick={() => navigate("/todo/register")}>
                등록하기
            </button>
            {/* 등록 페이지 이동 버튼 */}

            <div className="todo-list-wrapper">
                {statuses.map((status) => (
                    <div key={status} className="todo-section">
                        <h2>{getStatusLabel(status)}</h2>
                        <ul>
                            {todosByStatus[status]?.length > 0 ? (
                                todosByStatus[status].map((todo, index) => (
                                    <li key={todo.tId || `todo-${status}-${index}`} onClick={() => openModal(todo)}>
                                        <div>제목: {todo.title}</div>
                                    </li>
                                ))
                            ) : (
                                <p>할 일이 없습니다.</p>
                            )}
                        </ul>
                    </div>
                ))}
            </div>

            {/*    모달*/}
            {showModal && selectedTodo && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button className="close-button" onClick={closeModal}>X</button>
                        <TodoReadComponent todoData={selectedTodo} closeModal={closeModal}/>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TodoListComponent;