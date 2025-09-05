import React, { useEffect, useState } from "react";
import SubjectsList from "../../components/SubjectList";
import LessonsList from "../../components/LessonList";
import LessonDetails from "../../components/LessonDetails";
import {
  getData,
  addSubject,
  addLesson,
  updateLesson,
  deleteLesson,
} from "../../services/api";

const Question = () => {
  const [data, setData] = useState([]);
  const [subjectFilter, setSubjectFilter] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [newSubject, setNewSubject] = useState("");
  const [newLessonTopic, setNewLessonTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch all lessons
  const fetchData = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await getData();
      setData(Array.isArray(res.data) ? res.data : []);
    } catch (e) {
      console.error(e);
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Add new subject (creates first lesson)
  const handleAddSubject = async () => {
    if (!newSubject.trim()) return;
    try {
      const res = await addSubject({
        subject: newSubject,
        lesson: 1,
        topic: "New Topic",
        fillBlanks: [],
        shortQuestion: [],
        mcq: [],
        trueFalse: [],
        difficulty: "easy",
        createdAt: Date.now(),
      });
      if (res?.data) {
        setNewSubject("");
        fetchData();
      }
    } catch (err) {
      console.error(err);
      alert("Error adding subject");
    }
  };

  // Add new lesson
  const handleAddLesson = async () => {
    if (!newLessonTopic.trim() || !subjectFilter) return;
    const lessonNumber =
      data.filter((i) => i.subject === subjectFilter).length + 1;

    try {
      await addLesson({
        subject: subjectFilter,
        lesson: lessonNumber,
        topic: newLessonTopic,
        fillBlanks: [],
        shortQuestion: [],
        mcq: [],
        trueFalse: [],
        difficulty: "easy",
        createdAt: Date.now(),
      });
      setNewLessonTopic("");
      fetchData();
    } catch (e) {
      console.error(e);
      alert("Error adding lesson");
    }
  };

  // Update lesson
  const handleUpdateLesson = async (id, payload) => {
    try {
      const result = await updateLesson(id, payload);
      if (result.status === 200) fetchData();
    } catch (e) {
      console.error(e);
      alert("Update failed");
    }
  };

  // Delete lesson
  const handleDeleteLesson = async (id) => {
    if (!window.confirm("Are you sure you want to delete this lesson?")) return;
    try {
      await deleteLesson(id);
      setSelectedLesson(null);
      fetchData();
    } catch (e) {
      console.error(e);
      alert("Delete failed");
    }
  };

  const subjects = [...new Set(data.map((item) => item.subject))];
  const lessons = data.filter((item) => item.subject === subjectFilter);

  return (
    <div className="max-w-5xl mx-auto p-6 font-sans">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-2">
        📚 StudySync Practice
      </h1>

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>
      )}
      {loading && <p className="text-gray-500 mb-4">Loading...</p>}

      {!subjectFilter && (
        <SubjectsList
          subjects={subjects}
          onSelect={setSubjectFilter}
          onAdd={handleAddSubject}
          newSubject={newSubject}
          setNewSubject={setNewSubject}
        />
      )}

      {subjectFilter && !selectedLesson && (
        <LessonsList
          lessons={lessons}
          subject={subjectFilter}
          onSelect={setSelectedLesson}
          onBack={() => setSubjectFilter(null)}
          newLessonTopic={newLessonTopic}
          setNewLessonTopic={setNewLessonTopic}
          onAdd={handleAddLesson}
        />
      )}

      {selectedLesson && (
        <LessonDetails
          lesson={selectedLesson}
          onBack={() => setSelectedLesson(null)}
          onDelete={handleDeleteLesson}
          onUpdate={handleUpdateLesson}
        />
      )}
    </div>
  );
};

export default Question;
