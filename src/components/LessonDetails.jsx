import React, { useState } from "react";

const LessonDetails = ({ lesson = {}, onBack, onDelete }) => {
  const [answers, setAnswers] = useState({});
  const [marks, setMarks] = useState(null);
  const [showAnswers, setShowAnswers] = useState(false);

  const handleChange = (type, idx, value) => {
    setAnswers((prev) => ({ ...prev, [`${type}_${idx}`]: value }));
  };

  const checkAllAnswers = () => {
    const res = {};

    const checkQuestions = (type, arr) => {
      if (!Array.isArray(arr)) return;
      arr.forEach((q, idx) => {
        const key = `${type}_${idx}`;
        const userAnswer = answers[key];
        let correct = 0;

        if (type === "mcq" || type === "trueFalse") {
          if (Array.isArray(userAnswer) && Array.isArray(q.correctAnswer)) {
            const a = new Set(userAnswer.map((x) => x.toLowerCase()));
            const b = new Set(q.correctAnswer.map((x) => x.toLowerCase()));
            correct =
              a.size === b.size && [...a].every((x) => b.has(x)) ? 1 : 0;
          } else if (
            String(userAnswer).toLowerCase() ===
            String(q.correctAnswer).toLowerCase()
          ) {
            correct = 1;
          }
        } else {
          if (
            String(userAnswer).trim().toLowerCase() ===
            String(q.correctAnswer).trim().toLowerCase()
          ) {
            correct = 1;
          }
        }

        res[key] = correct;
      });
    };

    checkQuestions("fillBlanks", lesson.fillBlanks);
    checkQuestions("shortQuestion", lesson.shortQuestion);
    checkQuestions("mcq", lesson.mcq);
    checkQuestions("trueFalse", lesson.trueFalse);

    setMarks(res);
    setShowAnswers(false);
  };

  const renderInput = (type, questionObj, idx) => {
    const key = `${type}_${idx}`;
    const val = answers[key] || "";

    const isDisabled = marks !== null;
    const isCorrect = marks?.[key] === 1;
    const isWrong = marks?.[key] === 0;

    const bgClass = isDisabled
      ? isCorrect
        ? "bg-green-100"
        : isWrong
        ? "bg-red-100"
        : ""
      : "";

    switch (type) {
      case "fillBlanks":
      case "shortQuestion":
        return (
          <textarea
            className={`border p-2 rounded w-full mb-2 ${bgClass}`}
            rows={type === "shortQuestion" ? 3 : 1}
            value={val}
            onChange={(e) => handleChange(type, idx, e.target.value)}
            disabled={isDisabled}
          />
        );

      case "mcq": {
        const singleAnswer = typeof questionObj.correctAnswer === "string";
        return questionObj.options?.map((opt, i) => {
          if (singleAnswer) {
            return (
              <label key={i} className={`block mb-1 ${bgClass}`}>
                <input
                  type="radio"
                  name={key}
                  value={opt}
                  checked={val === opt}
                  onChange={() => handleChange(type, idx, opt)}
                  disabled={isDisabled}
                />{" "}
                {opt}
              </label>
            );
          } else {
            return (
              <label key={i} className={`block mb-1 ${bgClass}`}>
                <input
                  type="checkbox"
                  checked={Array.isArray(val) && val.includes(opt)}
                  onChange={() => {
                    let arr = Array.isArray(val) ? [...val] : [];
                    if (arr.includes(opt)) arr = arr.filter((x) => x !== opt);
                    else arr.push(opt);
                    handleChange(type, idx, arr);
                  }}
                  disabled={isDisabled}
                />{" "}
                {opt}
              </label>
            );
          }
        });
      }

      case "trueFalse":
        return ["true", "false"].map((v) => (
          <label key={v} className={`mr-4 ${bgClass}`}>
            <input
              type="radio"
              name={key}
              value={v}
              checked={val === v}
              onChange={() => handleChange(type, idx, v)}
              disabled={isDisabled}
            />{" "}
            {v.charAt(0).toUpperCase() + v.slice(1)}
          </label>
        ));

      default:
        return null;
    }
  };

  const renderQuestions = (type, arr) => {
    if (!Array.isArray(arr)) return null;
    return arr.map((q, idx) => {
      const key = `${type}_${idx}`;
      return (
        <div
          key={key}
          className={`mb-4 p-3 border rounded bg-gray-50 ${
            marks ? "" : ""
          }`}
        >
          <p className="mb-2 font-semibold">{q.question}</p>
          {renderInput(type, q, idx)}

          {marks && marks[key] !== undefined && (
            <p className="mt-1 font-bold">
              {marks[key] === 1 ? "✅ Correct (1 mark)" : "❌ Wrong (0 mark)"}
            </p>
          )}

          {showAnswers && (
            <p className="text-sm text-blue-700">
              ✅ Correct Answer:{" "}
              <span className="font-semibold">
                {Array.isArray(q.correctAnswer)
                  ? q.correctAnswer.join(", ")
                  : q.correctAnswer}
              </span>
            </p>
          )}
        </div>
      );
    });
  };

  const totalQuestions =
    (lesson.fillBlanks?.length || 0) +
    (lesson.shortQuestion?.length || 0) +
    (lesson.mcq?.length || 0) +
    (lesson.trueFalse?.length || 0);

  const totalMarks =
    marks && Object.values(marks).reduce((sum, v) => sum + v, 0);

  return (
    <div className="mt-4 p-6 bg-white shadow rounded">
      <button onClick={onBack} className="text-blue-600 hover:underline mb-4">
        ⬅ Back to Lessons
      </button>

      <h2 className="text-xl font-bold mb-4">
        Lesson {lesson.lesson}: {lesson.topic}
      </h2>

      {renderQuestions("fillBlanks", lesson.fillBlanks)}
      {renderQuestions("shortQuestion", lesson.shortQuestion)}
      {renderQuestions("mcq", lesson.mcq)}
      {renderQuestions("trueFalse", lesson.trueFalse)}

      {!marks ? (
        <button
          onClick={checkAllAnswers}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded mt-4"
        >
          Submit All
        </button>
      ) : (
        <div className="mt-4 flex items-center gap-4">
          <p className="font-bold text-lg">
            🎯 Total Score: {totalMarks} / {totalQuestions}
          </p>
          {!showAnswers && (
            <button
              onClick={() => setShowAnswers(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Show Correct Answers
            </button>
          )}
        </div>
      )}

      <div className="mt-6">
        <button
          onClick={() => onDelete(lesson._id)}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
        >
          🗑 Delete Lesson
        </button>
      </div>
    </div>
  );
};

export default LessonDetails;
