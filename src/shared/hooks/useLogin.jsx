// useLogin.jsx
import { useState } from "react";
import toast from 'react-hot-toast';
import { loginRequest } from "../../services/api.js";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const login = async (nickname, password) => {
    setIsLoading(true);
    const credentials = { nickname, password };
    const response = await loginRequest(credentials);
    setIsLoading(false);

    if (response.error) {
      return toast.error(
        response?.e?.response?.data || 'General error when trying to log in. Please try again.'
      );
    }

    localStorage.setItem('token', response.data.token);
    toast.success('Login was successful');
    navigate('/Innovabank/Principal');
  };

  return { login, isLoading };
};
