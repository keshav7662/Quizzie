const validateQuestions = (questions,quiz) => {
    const errors = {};

    if ([...quiz.questions, ...questions].length > 5) {
        errors.titleError = 'Maximum Question limit reached!';
    }
    
    for (const [index, question] of questions.entries()) {
        if (!question.title.trim()) {
            errors.titleError = 'Title cannot be empty';
            break;
        }

        if (question.option.length < 2 || question.option.length > 4) {
            errors.optionLengthError = 'Options should be between 2 and 4';
            break;
        }

        if (question.option.some((opt) => !opt || (!opt.text && !opt.image) || (opt.text && !opt.text.trim()) || (opt.image && !opt.image.trim()))) {
            errors.optionError = 'Options cannot be empty';
            break;
        }

        if (!question.answer || !question.answer.trim()) {
            errors.answerError = 'Answer cannot be empty';
            break;
        }

        const validTimers = ['OFF', '5 Sec', '10 Sec'];
        if (!validTimers.includes(question.timer)) {
            errors.timerError = 'Invalid timer value';
            break;
        }
    };

    return errors;
};

module.exports = { validateQuestions };