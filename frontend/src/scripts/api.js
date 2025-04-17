import axios from "axios";

export const sendTokenToBackend = async (token) => {
  const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}`, {
    token,
  });
  return response.data;
};
