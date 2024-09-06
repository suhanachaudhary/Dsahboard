import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3000/admin/login', { email, password });
      localStorage.setItem('adminToken', response.data.token);
      navigate('/admin');
    } catch(error) {
      alert('Invalid credentials');
    }
  };

  return (
    <div className='container'>
      <h2 className='text-center mt-4'>Admin Login</h2>

      <div className="mb-3">
          <label htmlFor="formGroupExampleInput" className="form-label">Enter user Email</label>
          <input type="email" className="form-control" id="formGroupExampleInput" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
    </div>

    <div className="mb-3">
          <label htmlFor="formGroupExampleInput" className="form-label">Enter user Password</label>
          <input type="password" className="form-control" id="formGroupExampleInput" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
    </div>

    <button type="submit" className='btn btn-primary' onClick={handleLogin}>Login</button>
      
    </div>
  );
};

export default AdminLogin;
