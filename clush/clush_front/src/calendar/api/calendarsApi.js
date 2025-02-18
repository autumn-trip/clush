import axiosInstance from "../../common/api/axiosInstance";

// 리스트 조회
export const getCalendarsAll = async () => {
    try {
        const res = await axiosInstance.get(`/calendar/all`);
        return res.data;
    } catch (error) {
        console.error("Error fetching todo by Id:", error);
        throw error;
    }
};

// 캘린더 조회
export const getCalendarById = async (cId) => {
    try {
        const res = await axiosInstance.get(`/calendar/${cId}`);
        return res.data;
    } catch (error) {
        console.error(`Error fetching calendar with ID ${cId}:`, error);
        throw error;
    }
};

// 등록
export const registerCalendar = async (calendarData) => {
    try {
        const res = await axiosInstance.post(`/calendar/`, calendarData);
        return res.data;
    } catch (error) {
        console.error("Error registering calendar event:", error);
        throw error;
    }
};

// 수정
export const updateCalendar = async (cId, updatedData) => {
    try {
        const res = await axiosInstance.put(`/calendar/${cId}`, updatedData);
        return res.data;
    } catch (error) {
        console.error(`Error updating calendar with ID ${cId}:`, error);
        throw error;
    }
};

// 삭제
export const deleteCalendar = async (cId) => {
    try {
        const res = await axiosInstance.delete(`/calendar/${cId}`);
        return res.data;
    } catch (error) {
        console.error(`Error deleting calendar with ID ${cId}:`, error);
        throw error;
    }
};