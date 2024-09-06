
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import AdminDashboard from './components/AdminDashboard';
import AdminLogin from './components/AdminLogin';
import Footer from './components/Footer';
import Login from './components/Login';
import Navbar from './components/Navbar';
import UserAvailability from './components/UserAvailability';

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/availability" element={<UserAvailability />} />
        <Route path="/admin" element={<AdminDashboard />} />
        
        <Route path="/admin/login" element={<AdminLogin />} />

      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
