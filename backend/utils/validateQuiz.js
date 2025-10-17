function validateQuizPayload({ quizName, quizType, questions }) {
  if (!quizName || !quizType || !Array.isArray(questions) || questions.length === 0) {
    return 'Quiz name, type, and at least one question are required.';
  }

  for (const [qIdx, q] of questions.entries()) {
    if (!q.questionTitle || !q.optionType || !Array.isArray(q.options) || q.options.length < 2) {
      return `Invalid data for question ${qIdx + 1}.`;
    }
    for (const [oIdx, option] of q.options.entries()) {
      if (q.optionType === 'text-image') {
        if (!option.content?.text?.trim() || !option.content?.image?.trim()) {
          return `Both text and image required for option ${oIdx + 1} in question ${qIdx + 1}.`;
        }
      } else {
        if (!option.content?.trim()) {
          return `Option ${oIdx + 1} in question ${qIdx + 1} is required.`;
        }
      }
    }
    if (!q.options.some(opt => opt.isCorrect)) {
      return `Select a correct answer for question ${qIdx + 1}.`;
    }
  }
  return null; // No error
}

module.exports = { validateQuizPayload };