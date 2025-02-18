import axiosInstance from "../../common/api/axiosInstance";

// 상세 조회
export const readTodo = async (tId) => {
    try {
        const res = await axiosInstance.get(`/todo/read/${tId}`);
        return res.data;
    } catch (error) {
        console.error("Error fetching todo by Id:", error);
        throw error;
    }
};

// 할 일 등록
export const registerTodo = async (todoDTO) => {
    try {
        const res = await axiosInstance.post(`/todo/register`, todoDTO);
        return res.data;
    } catch (error) {
        console.error("Error fetching registerTodo error::", error);
        throw error;
    }
};

// 수정
export const modifyTodo = async (tId, todoDTO) => {
    try {
        const res = await axiosInstance.put(`/todo/modify/${tId}`, todoDTO);
        return res.data;
    } catch (error) {
        console.error("Error fetching modifyTodo error::", error);
        throw error;
    }
};

// status 수정
export const updateTodoStatus = async (tId, newStatus) => {
    try {
        const res = await axiosInstance.put(`/todo/update-status/${tId}`, { status: newStatus });
        return res.data;
    } catch (error) {
        console.error("Error updating todo status:", error);
        throw error;
    }
};

// 삭제
export const removeTodo = async (tId) => {
    const res = await axiosInstance.delete(`/todo/${tId}`);
    return res.data;
};

// 목록 조회
export const getStatus = async (status) => {

    const res = await axiosInstance.get(`/todo/status/${status}`);
    return res.data;
};