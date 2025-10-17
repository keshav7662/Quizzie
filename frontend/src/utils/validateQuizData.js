export function validateQuizData({ quizName, quizType, questions }) {
  if (!quizName || !quizType) {
    return "Quiz name and type are required.";
  }
  for (const [qIdx, q] of questions.entries()) {
    if (!q.questionTitle.trim()) {
      return `Question ${qIdx + 1} title is required.`;
    }
    for (const [oIdx, option] of q.options.entries()) {
      if (q.optionType === "text-image") {
        if (!option.content?.text?.trim() || !option.content?.image?.trim()) {
          return `Fill both text and image for option ${oIdx + 1} in question ${qIdx + 1}.`;
        }
      } else {
        if (!option.content?.trim()) {
          return `Fill option ${oIdx + 1} in question ${qIdx + 1}.`;
        }
      }
    }
    if (!q.options.some(opt => opt.isCorrect)) {
      return `Select a correct answer for question ${qIdx + 1}.`;
    }
  }
  return "";
}