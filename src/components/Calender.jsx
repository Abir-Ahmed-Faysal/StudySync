// Calendar.jsx
import React, { useState, useMemo, useRef, useEffect } from "react";
import "../components/calender.css";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import multiMonthPlugin from "@fullcalendar/multimonth";
import interactionPlugin from "@fullcalendar/interaction";
import { Search } from "lucide-react";

const Calendar = () => {
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentView, setCurrentView] = useState("dayGridMonth");
  const [jumpDate, setJumpDate] = useState("");

  const calendarRef = useRef(null);

  const events = [
    { title: "Play", subject: "Math", start: "2025-08-24", end: "2025-08-31" },
    { title: "Play", subject: "Bangla", start: "2025-09-25", end: "2025-10-01" },
    { title: "Exam", subject: "English", start: "2025-09-10" },
  ];

  // Filter events by search
  const filteredEvents = useMemo(() => {
    if (!searchQuery) return events;
    return events.filter(
      (e) =>
        e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (e.subject && e.subject.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [searchQuery, events]);

  // Switch to Schedule view when searching
  useEffect(() => {
    if (searchQuery && calendarRef.current) {
      const api = calendarRef.current.getApi();
      api.changeView("listMonth");
      setCurrentView("listMonth");
      if (filteredEvents.length > 0) api.gotoDate(filteredEvents[0].start);
    }
  }, [searchQuery, filteredEvents]);

  // Event class names (highlight search)
  const eventClassNames = (arg) => {
    const subject = arg.event.extendedProps.subject || "";
    const title = arg.event.title || "";
    let classes = [];
    if (subject === "Math") classes.push("math-event");
    if (subject === "Bangla") classes.push("bangla-event");
    if (
      searchQuery &&
      (title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        subject.toLowerCase().includes(searchQuery.toLowerCase()))
    )
      classes.push("highlight-event");
    return classes;
  };

  // Views
  const views = [
    { key: "dayGridMonth", label: "Month" },
    { key: "dayGridWeek", label: "Week" },
    { key: "dayGridDay", label: "Day" },
    { key: "multiMonthYear", label: "Year" },
    { key: "listMonth", label: "Schedule" },
  ];

  const handleViewChange = (viewKey) => {
    setCurrentView(viewKey);
    if (calendarRef.current) calendarRef.current.getApi().changeView(viewKey);
  };

  const handlePrev = () => calendarRef.current.getApi().prev();
  const handleNext = () => calendarRef.current.getApi().next();
  const handleToday = () => calendarRef.current.getApi().today();
  const handleJump = () => {
    if (jumpDate) calendarRef.current.getApi().gotoDate(jumpDate);
  };

  return (
    <div className="calendar-wrapper">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <div className="flex gap-2 items-center">
          <button onClick={handlePrev} className="px-3 py-1 border rounded hover:bg-gray-100">Prev</button>
          <button onClick={handleToday} className="px-3 py-1 border rounded hover:bg-gray-100">Today</button>
          <button onClick={handleNext} className="px-3 py-1 border rounded hover:bg-gray-100">Next</button>
          <input
            type="date"
            value={jumpDate}
            onChange={(e) => setJumpDate(e.target.value)}
            className="border rounded px-2 py-1 text-sm"
          />
          <button onClick={handleJump} className="px-3 py-1 border rounded hover:bg-gray-100">Go</button>
        </div>

        <div className="flex gap-2 items-center">
          {views.map((v) => (
            <button
              key={v.key}
              onClick={() => handleViewChange(v.key)}
              className={`pb-1 ${
                currentView === v.key
                  ? "border-b-2 border-blue-500 font-semibold"
                  : "text-gray-500 hover:text-black"
              }`}
              disabled={!!searchQuery && v.key !== "listMonth"}
            >
              {v.label}
            </button>
          ))}

          {searchVisible && (
            <input
              type="text"
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border rounded px-2 py-1 text-sm"
              autoFocus
            />
          )}
          <button
            onClick={() => setSearchVisible(!searchVisible)}
            className="p-2 border rounded-full hover:bg-gray-100"
          >
            <Search size={16} />
          </button>
        </div>
      </div>

      {/* Calendar */}
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, listPlugin, multiMonthPlugin, interactionPlugin]}
        initialView={currentView}
        events={filteredEvents}
        headerToolbar={false}
        eventContent={(eventInfo) => (
          <div>
            <b>{eventInfo.event.title}</b>{" "}
            <span className="text-xs text-gray-600">
              ({eventInfo.event.extendedProps.subject || ""})
            </span>
          </div>
        )}
        eventClassNames={eventClassNames}
        dayCellClassNames={(arg) => {
          const today = new Date();
          today.setHours(0, 0, 0, 0);

          const cellDate = new Date(arg.date);
          cellDate.setHours(0, 0, 0, 0);

          const classes = [];

          // Highlight today
          if (cellDate.getTime() === today.getTime()) {
            classes.push("today-cell");
          }

          // Highlight cells with events
          const hasEvent = filteredEvents.some((event) => {
            const start = new Date(event.start);
            let end = event.end ? new Date(event.end) : start;
            start.setHours(0, 0, 0, 0);
            end.setHours(23, 59, 59, 999);
            return cellDate >= start && cellDate <= end;
          });

          if (hasEvent) classes.push("event-day");

          return classes;
        }}
      />

      {/* Footer */}
      <div className="mt-4 p-3 bg-gray-50 rounded-md border">
        {filteredEvents.length > 0 ? (
          <p>
             Showing{" "}
            <span className="text-red-600 font-bold">{filteredEvents.length}</span>{" "}
            event(s){searchQuery ? " (search results)" : ""}.
          </p>
        ) : (
          <p> No events found.</p>
        )}
      </div>
    </div>
  );
};

export default Calendar;
