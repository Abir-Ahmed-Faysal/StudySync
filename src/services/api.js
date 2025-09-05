import axios from "axios";

const API = "http://localhost:5000/ask"; // Base URL for the API

export const getData = () => axios.get(API);
export const addSubject = (payload) => axios.post(API, payload);
export const addLesson = (payload) => axios.post(API, payload);
export const updateLesson = (id, payload) => axios.patch(`${API}/${id}`, payload);
export const deleteLesson = (id) => axios.delete(`${API}/${id}`);



