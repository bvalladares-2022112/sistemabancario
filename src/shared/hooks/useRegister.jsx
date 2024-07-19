import { useState } from 'react';
import toast from 'react-hot-toast';
import { registerRequest } from '../../services/api';
import { useNavigate } from 'react-router-dom';

export const useRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const register = async (name, nickname, accounts, DPI, address, phoneNumber, email, password, workingName, monthlyIncome) => {
    setIsLoading(true);
    const user = { name, nickname, accounts, DPI, address, phoneNumber, email, password, workingName, monthlyIncome };
    const response = await registerRequest(user);
    setIsLoading(false);
    if (response.error) {
      return toast.error(response?.err?.response?.data?.message || 'Error registering data. Try again.');
    }
    toast.success('Register was successfully');
    navigate('/InnovaBank/Login');
  };

  return {
    register,
    isLoading,
  };
};
