import React, {useState} from 'react';
import {registerTodo} from "../api/todoApi";
import ResultModal from "../../common/hook/ResultModal";
import "../style/TodoRegister.scss";
import {useNavigate} from "react-router-dom";

const initState = {
    title: "",
    content: "",
    username: "",
    startDate: "",
    endDate: "",
    priority: "",
};

const TodoRegisterComponent = () => {
    const [todo, setTodo] = useState(initState);
    const [result, setResult] = useState(null);
    const navigate = useNavigate();

    const handleChangeTodo = (e) => {
        const { name, value, type, checked } = e.target;
        let updatedValue = type === "checkbox" ? checked : value;

        if (name === "priority") {
            updatedValue = parseInt(value, 10); // 🚀 숫자로 변환
        }

        setTodo({ ...todo, [name]: updatedValue });
    };

    const handleClickAdd = () => {
        registerTodo(todo)
            .then((result) => {
                console.log(result);
                setResult(result.TODO); // 결과 데이터 변경
                navigate("/todo")
                setTodo({ ...initState });
            })
            .catch((e) => {
                console.error(e);
            });
    };

    const closeModal = () => {
        setResult(null);
    };

    return (
        <div className="todo-register-container">
            {/* 모달 처리 */}
            {result ? (
                <ResultModal
                    title={"Add Result"}
                    content={`New Post ${result} Added`}
                    callbackFn={closeModal}
                />
            ) : null}

            <h3 className="register-title">새 게시글 작성</h3>

            {/* 작성자 */}
            <div className="form-group">
                <label className="form-label">작성자</label>
                <input
                    className="form-input"
                    name="username"
                    type="text"
                    placeholder="작성자명을 입력하세요"
                    value={todo.username}
                    onChange={handleChangeTodo}
                />
            </div>

            {/* 제목 */}
            <div className="form-group">
                <label className="form-label">제목</label>
                <input
                    className="form-input"
                    name="title"
                    type="text"
                    placeholder="제목을 입력하세요"
                    value={todo.title}
                    onChange={handleChangeTodo}
                />
            </div>

            {/* 내용 */}
            <div className="form-group">
                <label className="form-label">내용</label>
                <textarea
                    className="form-textarea"
                    name="content"
                    placeholder="내용을 입력하세요"
                    value={todo.content}
                    onChange={handleChangeTodo}
                ></textarea>
            </div>

            {/* 시작일 */}
            <div className="form-group">
                <label className="form-label">시작일</label>
                <input
                    className="form-input"
                    name="startDate"
                    type="datetime-local"
                    value={todo.startDate}
                    onChange={handleChangeTodo}
                />
            </div>

            {/* 종료일 */}
            <div className="form-group">
                <label className="form-label">종료일</label>
                <input
                    className="form-input"
                    name="endDate"
                    type="datetime-local"
                    value={todo.endDate}
                    onChange={handleChangeTodo}
                />
            </div>

            {/* 중요도 선택 */}
            <div className="form-group">
                <label className="form-label">중요도</label>
                <p>(숫자가 커짐에 따라 중요함이 증가합니다.)</p>
                <select
                    className="form-select"
                    name="priority"
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

            <div className="button-group">
                <button type="button" className="add-button" onClick={handleClickAdd}>
                    게시글 작성
                </button>
            </div>
        </div>
    );
};

export default TodoRegisterComponent;