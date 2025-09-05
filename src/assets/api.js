import axios from "axios";

const API = "http://localhost:5000/ask";

// Data fetching
export const getData = () => axios.get(API);

// Subject
export const addSubject = (payload) => axios.post(API, payload);

// Lesson
export const addLesson = (payload) => axios.post(API, payload);
export const updateLesson = (id, payload) => axios.put(`${API}/${id}`, payload);
export const deleteLesson = (id) => axios.delete(`${API}/${id}`);
