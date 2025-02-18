import axios from "axios";

// 서버 주소
export const API_SERVER_HOST = "http://localhost:8080";
const API_PREFIX = `${API_SERVER_HOST}/api`;

// Axios 인스턴스 생성
const axiosInstance = axios.create({
    baseURL: API_PREFIX,
});

export default axiosInstance;