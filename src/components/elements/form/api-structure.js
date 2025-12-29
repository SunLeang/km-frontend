const headerConfig = {
  id: crypto.randomUUID(),
  type: "header",
  title: "Personal Information",
  description: "Please fill out your details accurately.",
};

const questionData = {
  id: crypto.randomUUID(),
  type: "multiple-choice", // 'short-answer', 'multiple-choice', 'checkbox'
  title: "",
  options: ["Option 1"], // Only for choice types
  required: false,
};
