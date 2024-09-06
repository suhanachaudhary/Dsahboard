import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [availabilities, setAvailabilities] = useState([]);
  const [sessions, setSessions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAvailabilities = async () => {
      const response = await axios.get('http://localhost:3000/availability');
      setAvailabilities(response.data);
    };

    const fetchSessions = async () => {
      const response = await axios.get('http://localhost:3000/sessions');
      setSessions(response.data);
    };

    fetchAvailabilities();
    fetchSessions();
  }, []);

  // Handle scheduling session
  const handleScheduleSession = async (availability) => {
    try {
      const response = await axios.post('http://localhost:3000/sessions', {
        user: availability.user,
        start: availability.start,
        end: availability.end,
      });

      // Add the new session to the sessions state
      setSessions([...sessions, response.data]);
      alert('Session scheduled');
    } catch (error) {
      console.error("Error scheduling session:", error);
      alert('Failed to schedule session');
    }
  };

  // Handle session deletion
  const handleDeleteSession = async (sessionId) => {
    const token = localStorage.getItem('adminToken');
    try {
      const response=await axios.delete(`http://localhost:3000/sessions/${sessionId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        // Re-fetch sessions to ensure the UI is up-to-date
        const updatedSessions = await axios.get('http://localhost:3000/sessions');
        setSessions(updatedSessions.data);
        alert('Session deleted');
      } else {
        alert('Failed to delete session');
      }

    } catch (e) {
      alert('Only admins can delete sessions or session has expired');
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    alert("Admin logout")
    navigate('/admin/login');
  };

  return (
    <div className='container'>
      <h2 className='container text-center mt-4 mb-4'>Admin Dashboard</h2>
      <button className='btn btn-danger'style={{marginLeft:"1000px"}} onClick={ handleLogout }>Logout</button>

      {/* Available Time Slots */}
      {availabilities.map((availability) => (
        <div key={availability.start}>
          <p style={{ fontSize: '1rem' }}>
            {availability.user}: {new Date(availability.start).toLocaleString()} - {new Date(availability.end).toLocaleString()}
          </p>
          <button className='btn btn-primary' style={{ marginBottom: '20px' }} onClick={() => handleScheduleSession(availability)}>
            Schedule Session
          </button>
        </div>
      ))}

      {/* Sessions List Section */}
      <h2 className='container text-center mt-4 mb-4'>Scheduled Sessions</h2>
      {sessions.map((session) => (
        <div key={session._id}>
          <p>
            {session.user}: {new Date(session.start).toLocaleString()} - {new Date(session.end).toLocaleString()}
          </p>
          <button className='btn btn-primary' onClick={() => handleDeleteSession(session._id)}>
            Delete Session
          </button>
        </div>
      ))}
    </div>
  );
};

export default AdminDashboard;
