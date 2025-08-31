import React from "react";
import "../components/calender.css";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import multiMonthPlugin from "@fullcalendar/multimonth";
import interactionPlugin from "@fullcalendar/interaction";

const Calendar = () => {
  // Calendar events
  const events = [
    { title: "Play", subject: "Math", start: "2025-08-24", end: "2025-08-31" },
    { title: "Play", subject: "Bangla", start: "2025-09-25", end: "2025-10-01" },
    { title: "Exam", subject: "English", start: "2025-09-10" },
  ];

  // Add custom class for each event type
  const eventClassNames = (arg) => {
    const subject = arg.event.extendedProps.subject || "";
    if (subject === "Math") return ["math-event"];
    if (subject === "Bangla") return ["bangla-event"];
    return [];
  };

  // Highlight cells with events
  const dayCellClassNames = (arg) => {
    const cellDate = new Date(arg.date);
    cellDate.setHours(0, 0, 0, 0);

    const hasEvent = events.some((event) => {
      const start = new Date(event.start);
      const end = event.end ? new Date(event.end) : start;
      start.setHours(0, 0, 0, 0);
      end.setHours(23, 59, 59, 999);
      return cellDate >= start && cellDate <= end;
    });

    return hasEvent ? ["event-day"] : [];
  };

  // Render event content
  const renderEventContent = (eventInfo) => (
    <div className="fc-event-custom-content">
      <b>{eventInfo.event.title}</b>{" "}
      <span className="event-subject">({eventInfo.event.extendedProps.subject || ""})</span>
    </div>
  );

  return (
    <div className="calendar-wrapper">
      <FullCalendar
        plugins={[dayGridPlugin, listPlugin, multiMonthPlugin, interactionPlugin]}
        events={events}
        headerToolbar={false}
        eventContent={renderEventContent}
        eventClassNames={eventClassNames}
        dayCellClassNames={dayCellClassNames}
          height="auto"      
  contentHeight="auto" 
  expandRows={true} 
      />
       {/* Status Section */}
        <div className="space-y-2">
          <p className="text-green-600 font-medium">You have a class today!</p>
          <p className="text-sm text-gray-600">Course duration: 1hr</p>

          <div>
            <p className="text-sm text-gray-700 mb-1">Tasks Completed: 10%</p>
            <progress
              className="progress progress-success w-56"
              value="10"
              max="100"
            ></progress>
          </div>

          <div>
            <p className="text-sm text-gray-700 mb-1">Course Progress: 70%</p>
            <progress
              className="progress progress-info w-56"
              value="70"
              max="100"
            ></progress>
          </div>
        </div>
    </div>
  );
};

export default Calendar;
