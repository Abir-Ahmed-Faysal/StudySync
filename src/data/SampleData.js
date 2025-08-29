export const classesSample = [
  {
    id: 1,
    subject: "Math",
    instructor: "Mr. Rahman",
    day: "Monday",
    start: "10:00",
    end: "11:00",
    color: "#6366f1",
    highlights: [new Date().toISOString()]
  },
  {
    id: 2,
    subject: "Physics",
    instructor: "Dr. Alam",
    day: "Wednesday",
    start: "14:00",
    end: "15:00",
    color: "#06b6d4",
    highlights: []
  },
  {
    id: 3,
    subject: "Chemistry",
    instructor: "Ms. Sultana",
    day: "Friday",
    start: "09:00",
    end: "10:30",
    color: "#f59e0b",
    highlights: []
  },
];

export const budgetSample = {
  incomes: [
    { id: 1, source: "Allowance", amount: 2000 },
    { id: 2, source: "Tutoring", amount: 1500 }
  ],
  expenses: [
    { id: 1, category: "Food", amount: 800 },
    { id: 2, category: "Transport", amount: 300 },
    { id: 3, category: "Books", amount: 600 }
  ]
};

export const tasksSample = [
  { id: 1, subject: "Math", title: "Practice integrals", priority: "High", deadline: "2025-09-03", daySlot: "Monday", timeSlot: "15:00-16:00", done: false },
  { id: 2, subject: "Physics", title: "Lab report", priority: "Medium", deadline: "2025-09-05", daySlot: "Friday", timeSlot: "10:00-11:00", done: false }
];

export const examSample = [
  { id: 1, q: "What is velocity? (Short Answer)" },
  { id: 2, q: "MCQ: Speed of light is approx? (A) 3x10^8 (B) 3x10^6 (C) 3x10^5 (D) 3x10^9" }
];

export const todoSample = [
  { id: 1, text: "Buy notebook", done: false },
  { id: 2, text: "Pay lab fee", done: true }
];
