import axios from 'axios'
import {toast} from 'react-toastify'
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
    }
};