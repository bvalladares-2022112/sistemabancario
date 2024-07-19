import { useState } from 'react';
import './Register.css';
import { useRegister } from '../../shared/hooks/useRegister';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [step, setStep] = useState(1);
  const { register, isLoading } = useRegister();

  const [formData, setFormData] = useState({
    name: '',
    nickname: '',
    dpi: '',
    address: '',
    phoneNumber: '',
    email: '',
    password: '',
    workingName: '',
    monthlyIncome: ''
  });

  const nextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Ensure DPI does not exceed 13 digits and phone number does not exceed 8 digits
    if (name === 'dpi' && value.length > 13) return;
    if (name === 'phoneNumber' && value.length > 8) return;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const isFormValid = () => {
    const { name, nickname, dpi, address, phoneNumber, email, password, workingName, monthlyIncome } = formData;
    return (
      name &&
      nickname &&
      dpi.length === 13 &&
      address &&
      phoneNumber.length === 8 &&
      email &&
      password &&
      workingName &&
      parseFloat(monthlyIncome) > 500
    );
  };

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, nickname, dpi: DPI, address, phoneNumber, email, password, workingName, monthlyIncome } = formData;
    await register(name, nickname, [], DPI, address, phoneNumber, email, password, workingName, monthlyIncome);
    navigate('/Innovabank/Principal');
  };

  return (
    <div className="register-container">
      <div className="register-header">
        <a className="logo" href="/Innovabank/Principal">InnovaBank</a>
      </div>
      <div className="register-content">
        <div className="register-form">
          <h2>Register</h2>
          <p className="register-access">Register to access</p>
          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="nickname">Nickname</label>
                    <input type="text" id="nickname" name="nickname" value={formData.nickname} onChange={handleChange} />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="dpi">DPI</label>
                    <input type="text" id="dpi" name="dpi" value={formData.dpi} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} />
                  </div>
                </div>
              </>
            )}
            {step === 2 && (
              <>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input type="text" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="workingName">Working Name</label>
                    <input type="text" id="workingName" name="workingName" value={formData.workingName} onChange={handleChange} />
                  </div>
                </div>
              </>
            )}
            {step === 3 && (
              <>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="monthlyIncome">Monthly Income</label>
                    <input type="text" id="monthlyIncome" name="monthlyIncome" value={formData.monthlyIncome} onChange={handleChange} />
                  </div>
                </div>
              </>
            )}
            <div className="button-row">
              {step > 1 && (
                <button type="button" onClick={prevStep}>
                  Back
                </button>
              )}
              {step < 3 && (
                <button type="button" onClick={nextStep}>
                  Next
                </button>
              )}
              {step === 3 && (
                <button
                  type="submit"
                  className="create-account-btn"
                  disabled={!isFormValid() || isLoading}
                  style={{
                    opacity: !isFormValid() ? 0.5 : 1,
                    cursor: !isFormValid() ? 'not-allowed' : 'pointer'
                  }}
                >
                  {isLoading ? 'Creating...' : 'Create Account'}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
