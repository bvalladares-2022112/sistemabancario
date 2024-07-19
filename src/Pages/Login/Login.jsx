import { useState } from 'react';
import './Login.css';
import { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useLogin } from '../../shared/hooks/useLogin';

function Login() {
  const { login, isLoading } = useLogin();
  const [formData, setFormData] = useState({
    nickname: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { nickname, password } = formData;
    await login(nickname, password);
  };

  const navigate = useNavigate();

  return (
    <div className="login-container">
      <Toaster position="bottom-right" />
      <div className="login-header">
        <div className="bank-logo">InnovaBank</div>
      </div>
      <div className="login-content">
        <div className="login-left">
          <div className="bank-message">
            <p>Innovación financiera, a tu alcance.</p>
          </div>
        </div>
        <div className="login-right">
          <div className="login-form">
            <h2>Login</h2>
            <p className="login-access">Log in to access</p>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="nickname">Nickname</label>
                <input type="text" id="nickname" name="nickname" value={formData.nickname} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} />
              </div>
              <button type="submit" className="create-account-btn" disabled={isLoading}>
                {isLoading ? 'Logging in...' : 'Login'}
              </button>
            </form>
          </div>
          <div className="login-tips">
            <p>TIPS DE SEGURIDAD Y AYUDA</p>
            <p>Ingresa aquí para conocer tips de seguridad y ayuda con tu banca en línea.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
