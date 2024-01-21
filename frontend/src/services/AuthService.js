import axios from 'axios'
import { toast } from 'react-toastify';
const backendBaseURL = process.env.REACT_APP_BACKEND_BASE_URL;

export const userRegistration = async (userData) => {
    try {
        const response = await axios.post(`${backendBaseURL}/auth/register`, userData);
        console.log(response)
        toast.success(response.data.message, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
        return response.data;
    } catch (error) {
        toast.error(error.response.data.error, {
            position: "top-center",
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

export const userLogin = async (userData) => {
    try {
        const response = await axios.post(`${backendBaseURL}/auth/login`, userData);
        toast.success(response.data.message, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
        return response.data;
    } catch (error) {
        toast.error(error.response.data.error, {
            position: "top-center",
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