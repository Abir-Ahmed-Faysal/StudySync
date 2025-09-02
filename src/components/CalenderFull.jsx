// Calendar.jsx
import React, { useRef, useState, useEffect } from "react";
import "../components/calender.css";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { ChevronLeft } from 'lucide-react';
import { ChevronRight } from 'lucide-react';

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
        <div className="flex items-center gap-4">
          {/* Title */}
          <h2 className="text-xl font-semibold">{title}</h2>

          {/* Navigation */}
          <div className="flex gap-4">
            <button
              onClick={handleToday}
              className="px-6 py-2 bg-white rounded-xl shadow-sm font-medium"
            >
              Today
            </button>

            <button
              onClick={handlePrev}
              className="px-3 py-1 text-xl rounded hover:bg-gray-100"
            >
               <ChevronLeft className="font-normal" />
            </button>
            <button
              onClick={handleNext}
              className="px-3 py-1 text-xl rounded hover:bg-gray-100"
            >
           <ChevronRight />
            </button>
          </div>
        </div>

        {/* View Switcher */}
        <div className="flex gap-2">
          <button
            onClick={() => handleViewChange("dayGridMonth")}
            className={`px-3 py-1 rounded ${
              currentView === "dayGridMonth"
                ? "bg-white text-blue-500"
                : "hover:bg-gray-100"
            }`}
          >
            Month
          </button>
          <button
            onClick={() => handleViewChange("timeGridWeek")}
            className={`px-3 py-1 rounded ${
              currentView === "timeGridWeek"
                ? "bg-white text-blue-500"
                : "hover:bg-gray-100"
            }`}
          >
            Week
          </button>
          <button
            onClick={() => handleViewChange("timeGridDay")}
            className={`px-3 py-1 rounded ${
              currentView === "timeGridDay"
                ? "bg-white text-blue-500"
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
          dayHeaderContent={(arg) => {
            const date = arg.date;
            const dayName = date.toLocaleDateString("en-US", {
              weekday: "short",
            });
            const dayNumber = date.getDate();
            return (
              <div className="flex flex-col items-center">
                <span className="font-medium">{dayName}</span>
                <span className="text-sm mt-1">{dayNumber}</span>
              </div>
            );
          }}
          dayHeaderClassNames={(arg) => {
            const today = new Date();
            const isToday =
              arg.date.getFullYear() === today.getFullYear() &&
              arg.date.getMonth() === today.getMonth() &&
              arg.date.getDate() === today.getDate();

            return isToday
              ? "bg-white text-black font-semibold"
              : "bg-gray-300 text-gray-700";
          }}
          eventContent={(eventInfo) => (
            <div className="flex items-center space-x-2">
              <b>{eventInfo.event.title}</b>
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
