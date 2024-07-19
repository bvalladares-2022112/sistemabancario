import { useState } from "react";
import toast from "react-hot-toast";
import { registerAdminRequest } from "../../services/api";
import { useNavigate } from "react-router-dom";

export const useRegisterAdmin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const register = async (nickname, password) => {
    setIsLoading(true);
    const admin = { nickname, password };
    const response = await registerAdminRequest(admin);
    setIsLoading(false);
    if (response.error) {
      return toast.error(response?.err?.response?.data?.message || 'Error registering data. Try again.');
    }
    toast.success('Register was successfully');
    navigate('/Innovabank/Login');
  };

  return {
    register,
    isLoading,
  };
};
