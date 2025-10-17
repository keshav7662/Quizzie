function mapQuestionsForDb(questions) {
  return questions.map(q => {
    let options = [];
    if (q.optionType === 'text-image') {
      options = q.options.map(opt => ({
        text: opt.content.text,
        image: opt.content.image,
        isCorrect: opt.isCorrect
      }));
    } else if (q.optionType === 'text') {
      options = q.options.map(opt => ({
        text: opt.content,
        image: "",
        isCorrect: opt.isCorrect
      }));
    } else if (q.optionType === 'image') {
      options = q.options.map(opt => ({
        text: "",
        image: opt.content,
        isCorrect: opt.isCorrect
      }));
    }
    return {
      questionTitle: q.questionTitle,
      optionType: q.optionType,
      options,
      timer: q.timer || 'off'
    };
  });
}

module.exports = { mapQuestionsForDb };