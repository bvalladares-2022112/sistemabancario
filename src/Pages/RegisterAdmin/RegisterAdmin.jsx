import { useState } from 'react';
import './RegisterAdmin.css';
import { useRegisterAdmin } from '../../shared/hooks/useRegisterAdmin.jsx';
import { toast, Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function RegisterAdmin() {
  const { register, isLoading } = useRegisterAdmin();
  const [formData, setFormData] = useState({
    nickname: '',
    password: ''
  });

  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const validateForm = () => {
    const { nickname, password } = formData;

    if (!nickname || !password) {
      toast.error("Please fill in all fields", { position: "bottom-right" });
      return false;
    }

    return true;
  };

  const createAccount = async () => {
    if (validateForm()) {
      await register(formData.nickname, formData.password);
      navigate('/Innovabank/Principal');
    }
  };

  return (
    <div className="register-container">
      <Toaster position="bottom-right" />
      <div className="register-header">
        <a className="logo" href="/Innovabank/Principal">InnovaBank</a>
      </div>
      <div className="register-content">
        <div className="register-form">
          <h2>Admin Register</h2>
          <p className="register-access">Register to access admin panel</p>
          <form className='form-register'>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="nickname">Nickname</label>
                <input type="text" id="nickname" name="nickname" value={formData.nickname} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} />
              </div>
            </div>
            <div className="button-row">
              <button type="button" onClick={createAccount} className="create-account-btn" disabled={isLoading}>
                {isLoading ? 'Creating...' : 'Create Admin Account'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterAdmin;
