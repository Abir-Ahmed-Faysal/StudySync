// Calendar.jsx
import React, { useRef, useState, useEffect } from "react";
import "../components/calender.css";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";

const CalendarFull = () => {
  const calendarRef = useRef(null);
  const [title, setTitle] = useState("");
  const [currentView, setCurrentView] = useState("dayGridMonth");

  const events = [
    { title: "Play", subject: "Math", start: "2025-08-24", end: "2025-08-31" },
    {
      title: "Play",
      subject: "Bangla",
      start: "2025-09-25",
      end: "2025-10-01",
    },
    { title: "Exam", subject: "English", start: "2025-09-10" },
  ];

  const updateTitle = () => {
    const api = calendarRef.current?.getApi();
    if (api) setTitle(api.view.title);
  };

  useEffect(() => {
    updateTitle();
  }, []);

  const handlePrev = () => {
    const api = calendarRef.current.getApi();
    api.prev();
    updateTitle();
  };

  const handleNext = () => {
    const api = calendarRef.current.getApi();
    api.next();
    updateTitle();
  };

  const handleToday = () => {
    const api = calendarRef.current.getApi();
    api.today();
    updateTitle();
  };

  const handleViewChange = (viewName) => {
    const api = calendarRef.current.getApi();
    api.changeView(viewName);
    setCurrentView(viewName);
    updateTitle();
  };

  return (
    <div className="calendar-wrapper h-screen flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2 px-2">
        {/* Title */}
        <h2 className="text-xl font-semibold">{title}</h2>

        {/* Navigation */}
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            className="px-3 py-1 border rounded hover:bg-gray-100"
          >
            &lt;
          </button>
          <button
            onClick={handleToday}
            className="px-4 py-1 bg-white rounded-md shadow-sm border font-medium"
          >
            Today
          </button>
          <button
            onClick={handleNext}
            className="px-3 py-1 border rounded hover:bg-gray-100"
          >
            &gt;
          </button>
        </div>

        {/* View Switcher */}
        <div className="flex gap-2">
          <button
            onClick={() => handleViewChange("dayGridMonth")}
            className={`px-3 py-1 border rounded ${
              currentView === "dayGridMonth"
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-100"
            }`}
          >
            Month
          </button>
          <button
            onClick={() => handleViewChange("timeGridWeek")}
            className={`px-3 py-1  rounded ${
              currentView === "timeGridWeek"
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-100"
            }`}
          >
            Week
          </button>
          <button
            onClick={() => handleViewChange("timeGridDay")}
            className={`px-3 py-1  rounded ${
              currentView === "timeGridDay"
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-100"
            }`}
          >
            Day
          </button>
        </div>
      </div>

      {/* Calendar */}
      <div className="flex-1">
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView={currentView}
          height="100%"
          contentHeight="100%"
          expandRows={true}
          events={events}
          headerToolbar={false}
          eventContent={(eventInfo) => (
            <div>
              <b>{eventInfo.event.title}</b>{" "}
              <span className="text-xs text-gray-600">
                ({eventInfo.event.extendedProps.subject || ""})
              </span>
            </div>
          )}
        />
      </div>
    </div>
  );
};

export default CalendarFull;
