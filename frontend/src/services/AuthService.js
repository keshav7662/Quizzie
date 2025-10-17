import api from './api';

export const authRequest = async (endpoint, userData) => {
  try {
    const response = await api.post(`/auth/${endpoint}`, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Registration failed";
  }
};
