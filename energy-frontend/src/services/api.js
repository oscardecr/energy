import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000';  // Adjust to your Django server URL

export const registerUser = (userData) => {
    return axios.post(`${API_URL}/users/register/`, userData);
};

export const registerAdmin = (adminData) => {
    return axios.post(`${API_URL}/users/register/admin/`, adminData);
};

export const getUsers = () => {
    return axios.get(`${API_URL}/users/admin/users/`);
};

export const getClasses = () => {
    return axios.get(`${API_URL}/classes/`);
};

export const bookClass = (classId, userId) => {
    return axios.post(`${API_URL}/classes/${classId}/book/`, { user_id: userId });
};
