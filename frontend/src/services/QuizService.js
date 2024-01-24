import axios from 'axios'
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