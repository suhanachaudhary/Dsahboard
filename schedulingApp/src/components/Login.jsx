import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './app.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    localStorage.setItem('userEmail', email);
    navigate('/availability');
  };

  return (
    <div className='home'>

      <h2 className='container text-center mt-4'>Welcome to Event Scheduling System</h2>
      <div className='container loginPage card'>
        
        <h2 className='text-center mb-2'>Login</h2>

          <div className="mb-3">
          <label htmlFor="formGroupExampleInput" className="form-label">Enter user Email</label>
          <input type="email" className="form-control" id="formGroupExampleInput" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
          </div>

          <button type="submit" className="btn btn-primary btnClick" onClick={handleLogin}>Login</button>
          </div>
      </div>
  );
};

export default Login;
