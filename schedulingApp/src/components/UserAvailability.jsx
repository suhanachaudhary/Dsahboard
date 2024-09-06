import axios from 'axios';
import { useState } from 'react';
import './app.css';

const UserAvailability = () => {
  const [availability, setAvailability] = useState({ start: '', end: '' });
  const email = localStorage.getItem('userEmail');

  const handleAddAvailability = async () => {
    await axios.post('http://localhost:3000/availability', {
      user: email,
      start: new Date(availability.start),
      end: new Date(availability.end),
    });
    alert('Availability added');
  };

  return (
    <div className='container mt-4 availability'>
      <h2 className='container text-center mt-4'>User Availability</h2>

      <div className="mb-3">
        <label htmlFor="formGroupExampleInput" className="form-label">Enter Start Date</label>
        <input type="datetime-local" className="form-control" id="formGroupExampleInput" value={availability.start} onChange={(e) => setAvailability({ ...availability, start: e.target.value })} required />
      </div>

      <div className="mb-3">
        <label htmlFor="formGroupExampleInput" className="form-label">Enter Ending Date</label>
        <input type="datetime-local" className="form-control" id="formGroupExampleInput" value={availability.end} onChange={(e) => setAvailability({ ...availability, end: e.target.value })} required />
      </div>

      <button type="submit" className='btn btn-primary' style={{fontSize:"1.1rem", fontWeight:"600"}} onClick={handleAddAvailability}>Add Availability</button>

    </div>
  );
};

export default UserAvailability;
