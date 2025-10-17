import axios from 'axios'
import { toast } from 'react-toastify'
const backendBaseURL = process.env.REACT_APP_BACKEND_BASE_URL;

const refreshToken = () => {
  return localStorage.getItem('token');
}

export async function createQuizApi(quizData) {
  const token = refreshToken();
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
  try {
    const res = await axios.post(`${backendBaseURL}/quiz`, quizData, { headers });
    return res.data;
  } catch (error) {
    console.error('Error creating quiz:', error.message);
    throw error.response?.data?.message || 'Failed to create quiz';
  }
}

export async function getAllQuizApi() {
  const token = refreshToken();
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
  try {
    const res = await axios.get(`${backendBaseURL}/quiz`, { headers });
    return res.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to create quiz';
  }
}

export async function deleteQuizApi(id) {
  const token = refreshToken();
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  }
  try {
    const res = await axios.delete(`${backendBaseURL}/quiz/${id}`, {headers});
    return res.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to delete quiz';
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
      error.response.data.error.timerError ||
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