import axios from 'axios'
import { toast } from 'react-toastify'
const backendBaseURL = process.env.REACT_APP_BACKEND_BASE_URL;

export const getAllQuizzes = async () => {
    try {
        const token = localStorage.getItem('token')
        const headers = {
            'Content-Type': 'application/json',
            Authorization: token,
        };
        const response = await axios.get(`${backendBaseURL}/quiz/all-quiz`, { headers })
        return response.data
    } catch (error) {
        console.log(error);
        toast.error(error.response.data.error, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    }
}

export const deleteQuiz = async (id) => {
    try {
        const token = localStorage.getItem("token");
        const headers = {
            "Content-Type": "application/json",
            Authorization: token,
        };
        const response = await axios.delete(`${backendBaseURL}/quiz/delete-quiz/${id}`, { headers });
        if (response) {
            toast.info(response.data.message, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
    } catch (error) {
        console.log(error);
        toast.error(error.response.data.error, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    }
};

export const createQuiz = async (newQuiz) => {
    try {
        const token = localStorage.getItem('token')
        const headers = {
            'Content-Type': 'application/json',
            Authorization: token,
        };
        const response = await axios.post(`${backendBaseURL}/quiz/create-quiz`, newQuiz, { headers })
        if (response) {
            toast.success(response.data.message, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
        return response.data
    } catch (error) {
        console.log(error);
        toast.error(error.response.data.error, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    }
}

export const addQuestion = async (quizId, questionData) => {
    try {
        const token = localStorage.getItem('token')
        const headers = {
            'Content-Type': 'application/json',
            Authorization: token,
        };

        const response = await axios.post(`${backendBaseURL}/quiz/add-question/${quizId}`, questionData, { headers })
        if (response) {
            toast.success(response.data.message, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
        return response.data
    } catch (error) {
        console.log(error);
        toast.error((error.response.data.error.answerError ||
            error.response.data.error.titleErrror ||
            error.response.data.error.optionLengthError ||
            error.response.data.error.optionError ||
            error.response.data.error.timerError||
            error.response.data.error.emptyFields), {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    }
}

export const getQuizById = async (id) => {
    try {
        const token = localStorage.getItem('token')
        const headers = {
            'Content-Type': 'application/json',
            Authorization: token,
        };
        const response = await axios.get(`${backendBaseURL}/quiz/quiz-by-id/${id}`, { headers })
        return response.data;
    } catch (error) {
        toast.error(error.response.data.error, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    }
}

export const UpdateQuizResult = async (quizId, impressions, quizResults) => {
    console.log(quizId);
    console.log({ impressions, quizResults });
    // console.log(quizResults);
    try {
        const token = localStorage.getItem("token");
        const headers = {
            'Content-Type': 'application/json',
            Authorization: token,
        };
        const response = await axios.put(`${backendBaseURL}/quiz/update-quiz-result/${quizId}`, { impressions, quizResults }, { headers })
        if (response) {
            return response.data

        }
    } catch (error) {
        console.log(error);
        toast.error((error.response.data.error), {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    }
}